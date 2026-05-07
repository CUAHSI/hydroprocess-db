<template>
  <v-overlay :model-value="!mapStore.mapLoaded" class="d-flex align-center justify-center">
    <v-progress-circular indeterminate :size="128" />
  </v-overlay>

  <v-container fluid class="pa-0 fill-height position-relative">
    <v-row class="fill-height ma-0">
      <v-col class="map-container pa-0">
        <TheLeafletMap />

        <div id="wms-legend"></div>
        <tooltip
          v-if="tooltipRegion"
          :region="tooltipRegion"
          :position="tooltipPosition"
          @close="tooltipRegion = null"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import TheLeafletMap from '@/components/TheLeafletMap.vue'
import tooltip from './TooltipPopup.vue'
import { useMapStore } from '@/stores/map'
import northernDomain from '@/assets/northernDomain.jpg'
import L from 'leaflet'
import 'leaflet-groupedlayercontrol'
import 'leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.css'

const domainRegions = [
  {
    name: 'North Region',
    bounds: [
      [50, -170],
      [75, -50]
    ],
    description:
      'The dominant gradients across this domain are temperature (north to south), elevation (stark contrast between the mountains areas and the large plains) and geologic conditions (Canadian Shield and elsewhere).',
    image: northernDomain,
    pdf: '/pdfs/north.pdf'
  },
  {
    name: 'West Region',
    bounds: [
      [25, -130],
      [55, -100]
    ],
    description:
      'In the west the boundary is the most diffuse and the transition from northern mountains (N3, N4) into western mountains (W1, W4) should be seen as a broad transition zone along elevation, temperature and precipitation gradients, rather than a sharp transition from one biome into the next. The manifestation of hydrological conditions is strongly influenced by the water availability boundary that divides the continent between negative and positive P-PET. ',
    image: northernDomain,
    pdf: '/pdfs/west.pdf'
  },
  {
    name: 'Central Region',
    bounds: [
      [25, -100],
      [55, -80]
    ],
    description:
      'In the center, a transition from forests into agriculture provides a reason to distinguish between the two domains.',
    image: northernDomain,
    pdf: '/pdfs/central.pdf'
  },
  {
    name: 'East Region',
    bounds: [
      [25, -80],
      [50, -60]
    ],
    description:
      'The manifestation of hydrological conditions is strongly influenced by the water availability boundary that divides the continent between negative and positive P-PET. ',
    image: northernDomain,
    pdf: '/pdfs/east.pdf'
  }
]

const provinceRegions = []

const mapStore = useMapStore()
const tooltipRegion = ref(null)
const tooltipPosition = ref(null)

// Load map store properties as refs for reactivity
const { mapLoaded } = storeToRefs(mapStore)

// Define the perceptual models "Domain" WMS layer
const wmsLayerDomain = L.tileLayer.wms(
  'https://arcgis.cuahsi.org/arcgis/services/HydroProcess/Domain/MapServer/WMSServer',
  {
    layers: '0',
    format: 'image/png',
    transparent: true,
    pane: 'overlayPane'
  }
)

// Define the perceptual models "Provinces" WMS layer
const wmsLayerProvince = L.tileLayer.wms(
  'https://arcgis.cuahsi.org/arcgis/services/HydroProcess/Province/MapServer/WMSServer',
  {
    layers: '0',
    format: 'image/png',
    transparent: true,
    pane: 'overlayPane'
  }
)

// Define the Legend URLs
const legendUrls = {
  domain:
    'https://arcgis.cuahsi.org/arcgis/services/HydroProcess/Domain/MapServer/WMSServer?service=WMS&request=GetLegendGraphic&format=image/png&layer=0&version=1.1.1',
  province:
    'https://arcgis.cuahsi.org/arcgis/services/HydroProcess/Province/MapServer/WMSServer?service=WMS&request=GetLegendGraphic&format=image/png&layer=0&version=1.1.1'
}

// async function fetchRegionData(latlng) {
//   const map = mapStore.leaflet
//   const point = map.latLngToContainerPoint(latlng)
//   const size = map.getSize()
//   const bounds = map.getBounds()
//   const sw = bounds.getSouthWest()
//    const ne = bounds.getNorthEast()
//    const bbox = `${sw.lng},${sw.lat},${ne.lng},${ne.lat}`

//   const url = '' //empty for now

//   try {
//     const res = await fetch(url)
//     const text = await res.text()
//     const xml = new DOMParser().parseFromString(text, 'text/xml')

//     const field = xml.querySelector('FIELD[name="NAME"]')
//     const regionName = field?.getAttribute('value')

//     console.log('Clicked region name:', regionName, latlng)
//     console.log('All fields:', xml.querySelectorAll('FIELD'))
//     if (!regionName) return null

//     return domainRegions.find(r => r.name === regionName)
//   } catch (err) {
//     console.error(err)
//     return null
//   }
// }

function findRegion(latlng) {
  console.log('searching for regions...')
  const domainOn = mapStore.leaflet.hasLayer(wmsLayerDomain)
  const provinceOn = mapStore.leaflet.hasLayer(wmsLayerProvince)
  if (domainOn) {
    return domainRegions.find((region) => {
      const bounds = L.latLngBounds(region.bounds)
      return bounds.contains(latlng)
    })
  }

  if (provinceOn) {
    console.log('in here')
    return provinceRegions.find((region) => {
      return L.latLngBounds(region.bounds).contains(latlng)
    })
  }
}

// function createTooltip(region) {
//   return `
//     <div style="max-width: 250px;">
//       <h3>${region.name}</h3>

//       <p style="font-size: 0.9em; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
//         ${region.description}
//       </p>

//       <img
//         src="${region.image}"
//         style="width:50%; height:50%; border-radius:4px; margin:6px 0;"
//       />

//       <a href="${region.pdf}" download target="_blank">
//         <br>Download Fact Sheet (PDF)
//       </a>
//     </div>
//   `
// }
function updateTooltipPosition(latlng) {
  const point = mapStore.leaflet.latLngToContainerPoint(latlng)
  tooltipPosition.value = { x: point.x, y: point.y }
}

onMounted(async () => {
  // set the map bounds so that only North America is visible
  // also set the minimum zoom level to prevent users from zooming
  // out too far and seeing the entire world.
  mapStore.leaflet.setMaxBounds(
    L.latLngBounds([
      [5, -170], // SW coordinate of bbox
      [75, -50] // NE coordinate of bbox
    ])
  )
  mapStore.leaflet.setMinZoom(3)

  // Add the perceptual models "Domain" layer to the map
  // Only adding the "Domain" layer by default to
  // control which layer is initially active.
  wmsLayerDomain.addTo(mapStore.leaflet)

  // Set up grouped layer control
  // Add the default base layer to the map before adding the control
  const groupedOverlays = {
    Regions: {
      Domains: wmsLayerDomain,
      Provinces: wmsLayerProvince
    }
  }

  // Move layer control to the left
  const layerControl = new L.Control.GroupedLayers(null, groupedOverlays, {
    exclusiveGroups: ['Regions'],
    groupCheckboxes: true,
    position: 'topleft',
    collapsed: false
  })
  mapStore.leaflet.addControl(layerControl)

  // Move zoom control to the right
  mapStore.leaflet.removeControl(mapStore.leaflet.zoomControl)
  mapStore.leaflet.zoomControl = L.control.zoom({ position: 'topright' }).addTo(mapStore.leaflet)

  // add hooks to update the legend when layers are added or removed.
  // Then call the updateLegend function manually. This is necessary
  // because the overlayadd isn't called when initially adding the
  // layers to the map.
  mapStore.leaflet.on('overlayadd', updateLegend)
  mapStore.leaflet.on('overlayremove', updateLegend)
  updateLegend()

  // Add click event listener to the map to fetch region data and show tooltips
  mapStore.leaflet.on('click', (e) => {
    const region = findRegion(e.latlng)
    if (!region) return
    console.log('Clicked region:', region.name, e.latlng)
    tooltipRegion.value = region
    updateTooltipPosition(e.latlng)
  })

  // set the mapLoaded flag to true after the map and layers have been initialized
  // this will turn off the loading overlay and allow the map to be displayed
  mapLoaded.value = true
})

function updateLegend() {
  const domainOn = mapStore.leaflet.hasLayer(wmsLayerDomain)
  const provinceOn = mapStore.leaflet.hasLayer(wmsLayerProvince)
  let html = ''
  if (domainOn) {
    html += `<img src="${legendUrls.domain}" alt="Domain Legend" />`
  }
  if (provinceOn) {
    html += `<img src="${legendUrls.province}" alt="Province Legend" />`
  }
  document.getElementById('wms-legend').innerHTML = html
}
</script>

<style scoped>
div {
  line-height: 0;
}

/* Legend styles */
#wms-legend {
  z-index: 1001;
  position: absolute;
  overflow: auto;
  border: 2px solid rgba(0, 0, 0, 0.2);
  min-width: 90px;
  max-width: 350px;
  max-height: 300px;
  padding: 6px;
  font-size: 1em;
  border-radius: 6px;
  bottom: 10px;
  left: 10px;
  background: white;
}

@media (max-width: 600px) {
  #wms-legend {
    z-index: 1001;
    position: absolute;
    overflow: auto;
    border: 2px solid rgba(0, 0, 0, 0.2);
    min-width: 90px;
    max-width: 350px;
    max-height: 120px;
    padding: 6px;
    font-size: 1em;
    border-radius: 6px;
    bottom: 4px;
    left: 4px;
    background: white;
  }
}
</style>
