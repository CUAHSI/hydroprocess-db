<template>
  <v-overlay :model-value="!mapStore.mapLoaded" class="d-flex align-center justify-center">
    <v-progress-circular indeterminate :size="128" />
  </v-overlay>

  <v-container fluid class="pa-0 fill-height position-relative">
    <v-row class="fill-height ma-0">
      <v-col class="map-container pa-0">
        <TheLeafletMap />

        <div id="wms-legend"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import TheLeafletMap from '@/components/TheLeafletMap.vue'
import { useMapStore } from '@/stores/map'
import L from 'leaflet'
import 'leaflet-groupedlayercontrol'
import 'leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.css'

const mapStore = useMapStore()

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
