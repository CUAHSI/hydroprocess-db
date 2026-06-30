<template>
  <v-overlay :model-value="!mapStore.mapLoaded" class="d-flex align-center justify-center">
    <v-progress-circular indeterminate :size="128" />
  </v-overlay>

  <v-container fluid class="pa-0 fill-height position-relative">
    <v-row class="fill-height ma-0">
      <v-col class="map-container pa-0">
        <TheLeafletMap />

        <div class="overlay-opacity-control">
          <div class="overlay-opacity-title">Opacity</div>
          <v-slider
            v-model="overlayOpacity"
            class="overlay-opacity-slider"
            min="0"
            max="100"
            step="1"
            hide-details
            density="compact"
            color="grey-darken-2"
            track-color="grey-lighten-2"
            :thumb-size="12"
            :track-size="2"
          />
        </div>

        <div id="wms-legend"></div>
        <tooltip
          v-if="tooltipRegion"
          :region="tooltipRegion"
          :position="tooltipPosition"
          :LayerType="
            mapStore.leaflet.hasLayer(wmsLayerDomain)
              ? 'Domain'
              : mapStore.leaflet.hasLayer(wmsLayerProvince)
                ? 'Province'
                : null
          "
          @close="tooltipRegion = null"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import TheLeafletMap from '@/components/TheLeafletMap.vue'
import tooltip from './TooltipPopup.vue'
import { useMapStore } from '@/stores/map'
import { domainRegions, provinceRegions } from '../constants'
import L from 'leaflet'
import * as esriLeaflet from 'esri-leaflet'
import 'leaflet-groupedlayercontrol'
import 'leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.css'

const mapStore = useMapStore()
const tooltipRegion = ref(null)
const tooltipPosition = ref(null)
const tooltipLatLng = ref(null)

// Load map store properties as refs for reactivity
const { mapLoaded } = storeToRefs(mapStore)
const overlayOpacity = ref(50)

const mercatorMapServerUrl =
  'https://arcgis.cuahsi.org/arcgis/rest/services/HydroProcess/HydroprocessDB_mercator/MapServer'
const mercatorLegendUrl = `${mercatorMapServerUrl}/legend?f=json`

let highlightLayer = null
let highlightAbortController = null
let highlightRequestId = 0
let activeQueryLayerId = 0

const wmsLayerDomain = esriLeaflet.dynamicMapLayer({
  url: mercatorMapServerUrl,
  layers: [0],
  format: 'png32',
  transparent: true,
  pane: 'overlayPane'
})

const wmsLayerProvince = esriLeaflet.dynamicMapLayer({
  url: mercatorMapServerUrl,
  layers: [1],
  format: 'png32',
  transparent: true,
  pane: 'overlayPane'
})

const legendEntries = {
  domain: [],
  province: []
}

// function getFeatureInfoUrl(layer, latlng) {
//   const map = mapStore.leaflet
//   const point = map.latLngToContainerPoint(latlng)
//   const size = map.getSize()

//   const params = {
//     request: 'GetFeatureInfo',
//     service: 'WMS',
//     srs: 'EPSG:4326',
//     styles: '',
//     transparent: true,
//     version: '1.1.1',
//     format: 'image/png',
//     bbox: map.getBounds().toBBoxString(),
//     height: size.y,
//     width: size.x,
//     layers: layer.wmsParams.layers,
//     query_layers: layer.wmsParams.layers,
//     info_format: 'text/xml'
//   }

//   params.x = Math.round(point.x)
//   params.y = Math.round(point.y)

//   const baseUrl = layer._url
//   return baseUrl + L.Util.getParamString(params, baseUrl, true)
// }

// function getRegionFromXml(xmlText, regions) {
//   const xml = new DOMParser().parseFromString(xmlText, 'text/xml')

//   // LVL1_NAME is used by the Domain WMS; LVL2_NAME by the Province WMS
//   const field = xml.querySelector('FIELDS')
//   if (mapStore.leaflet.hasLayer(wmsLayerDomain)) {
//     const regionName = field?.getAttribute('LVL1_NAME')
//     return regions.find((r) => r.name === regionName) ?? null
//   } else {
//     const provinceName = field?.getAttribute('LVL2_ID')
//     return regions.find((r) => r.province === provinceName) ?? null
//   }
// }

function updateTooltipPosition(latlng) {
  const point = mapStore.leaflet.latLngToContainerPoint(latlng)
  console.log('Tooltip position updated:', point)
  tooltipPosition.value = { x: point.x, y: point.y }
}

function updateLegend() {
  tooltipRegion.value = null //disable tooltip when legend changes
  tooltipLatLng.value = null
  const domainOn = mapStore.leaflet.hasLayer(wmsLayerDomain)
  const provinceOn = mapStore.leaflet.hasLayer(wmsLayerProvince)

  const html = [
    domainOn ? renderLegendSection('Domains', legendEntries.domain) : '',
    provinceOn ? renderLegendSection('Provinces', legendEntries.province) : ''
  ].join('')

  const legendEl = document.getElementById('wms-legend')
  if (legendEl) {
    legendEl.innerHTML = html || '<div class="legend-empty">No active map layer</div>'
  }
}

async function loadLegendEntries() {
  try {
    const response = await fetch(mercatorLegendUrl)
    if (!response.ok) return

    const data = await response.json()
    const layerById = new Map((data.layers || []).map((layer) => [layer.layerId, layer]))
    legendEntries.domain = layerById.get(0)?.legend || []
    legendEntries.province = layerById.get(1)?.legend || []
  } catch (error) {
    console.warn('Failed to load perceptual map legend', error)
  }
}

function clearHighlight() {
  if (highlightLayer) {
    mapStore.leaflet.removeLayer(highlightLayer)
    highlightLayer = null
  }
}

function applyOverlayOpacity(value) {
  const opacity = Math.max(0, Math.min(100, Number(value))) / 100
  wmsLayerDomain.setOpacity(opacity)
  wmsLayerProvince.setOpacity(opacity)
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function buildPopupHtml(properties) {
  const entries = Object.entries(properties || {})
  if (!entries.length) return 'No data'

  return entries
    .map(([key, value]) => `<div><strong>${escapeHtml(key)}</strong>: ${escapeHtml(value)}</div>`) //here!!!
    .join('')
}

function renderLegendSection(title, entries) {
  if (!entries.length) return ''

  const items = entries
    .map((entry) => {
      if (!entry?.imageData || !entry?.contentType) return ''
      const label = entry.label
        ? `<span class="legend-item-label">${escapeHtml(entry.label)}</span>`
        : ''
      return `
        <div class="legend-item">
          <img src="data:${entry.contentType};base64,${entry.imageData}" alt="${escapeHtml(title)} legend" />
          ${label}
        </div>
      `
    })
    .join('')

  return `
    <div class="legend-section">
      <div class="legend-section-title">${escapeHtml(title)}</div>
      ${items}
    </div>
  `
}

function handleOverlayChange(event) {
  if (event?.type === 'overlayadd') {
    activeQueryLayerId = event.layer === wmsLayerProvince ? 1 : 0
  }

  highlightRequestId += 1

  if (highlightAbortController) {
    highlightAbortController.abort()
    highlightAbortController = null
  }

  clearHighlight()
  mapStore.leaflet.closePopup()
  updateLegend()
}

function getActiveQueryLayerId() {
  return activeQueryLayerId
}

watch(overlayOpacity, (value) => {
  applyOverlayOpacity(value)
})

watch(
  mapLoaded,
  (loaded) => {
    if (loaded) {
      mapStore.leaflet.invalidateSize(true)
    }
  },
  { flush: 'post' }
)

onMounted(async () => {
  mapStore.leaflet.setMaxBounds(
    L.latLngBounds([
      [5, -170],
      [75, -50]
    ])
  )
  mapStore.leaflet.setMinZoom(3)

  const initialDomainLayerReady = new Promise((resolve) => {
    const resolveReady = () => resolve()
    wmsLayerDomain.once('load', resolveReady)
    wmsLayerDomain.once('error', resolveReady)
  })

  wmsLayerDomain.addTo(mapStore.leaflet)
  applyOverlayOpacity(overlayOpacity.value)

  const groupedOverlays = {
    Regions: {
      Domains: wmsLayerDomain,
      Provinces: wmsLayerProvince
    }
  }

  const layerControl = new L.Control.GroupedLayers(null, groupedOverlays, {
    exclusiveGroups: ['Regions'],
    groupCheckboxes: true,
    position: 'topleft',
    collapsed: false
  })
  mapStore.leaflet.addControl(layerControl)

  const opacityEl = document.querySelector('.overlay-opacity-control')
  const layerControlList = mapStore.leaflet
    .getContainer()
    .querySelector('.leaflet-control-layers-list')
  if (opacityEl && layerControlList) {
    L.DomEvent.disableClickPropagation(opacityEl)
    L.DomEvent.disableScrollPropagation(opacityEl)
    layerControlList.appendChild(opacityEl)
  }

  mapStore.leaflet.removeControl(mapStore.leaflet.zoomControl)
  mapStore.leaflet.zoomControl = L.control.zoom({ position: 'topright' }).addTo(mapStore.leaflet)

  mapStore.leaflet.on('overlayadd', handleOverlayChange)
  mapStore.leaflet.on('overlayremove', handleOverlayChange)

  mapStore.leaflet.on('click', async (event) => {
    const requestId = ++highlightRequestId

    if (highlightAbortController) {
      highlightAbortController.abort()
    }
    highlightAbortController = new AbortController()

    clearHighlight()

    const queryUrl = mercatorMapServerUrl
    const queryLayerId = getActiveQueryLayerId()

    const projectedPoint = mapStore.leaflet.options.crs.project(event.latlng)
    const params = new URLSearchParams({
      f: 'geojson',
      geometry: `${projectedPoint.x},${projectedPoint.y}`,
      geometryType: 'esriGeometryPoint',
      inSR: '3857',
      spatialRel: 'esriSpatialRelIntersects',
      outFields: '*',
      returnGeometry: 'true',
      outSR: '4326'
    })

    try {
      const response = await fetch(`${queryUrl}/${queryLayerId}/query?${params.toString()}`, {
        signal: highlightAbortController.signal
      })
      if (requestId !== highlightRequestId) return

      const data = await response.json()
      if (requestId !== highlightRequestId) return

      const feature = data?.features?.[0]
      if (!feature) {
        return
      }
      console.log('Feature properties:', feature.properties)

      highlightLayer = L.geoJSON(feature, {
        style: {
          color: '#ff6600',
          weight: 3,
          fillColor: '#ff6600',
          fillOpacity: 0.18
        },
        pointToLayer: (_feature, latlng) =>
          L.circleMarker(latlng, {
            radius: 8,
            color: '#ff6600',
            weight: 3,
            fillColor: '#ffb07a',
            fillOpacity: 0.8
          })
      }).addTo(mapStore.leaflet)

      highlightLayer.bringToFront()
      const domainOn = mapStore.leaflet.hasLayer(wmsLayerDomain)
      const provinceOn = mapStore.leaflet.hasLayer(wmsLayerProvince)
      if (domainOn){
        const region = feature.properties?.["LVL1_NAME"]
        tooltipRegion.value = domainRegions.find((r) => r.name === region) ?? null
      } else if (provinceOn){
        const region = feature.properties?.["LVL2_ID"]
        tooltipRegion.value = provinceRegions.find((r) => r.province === region) ?? null
      } else {
        tooltipRegion.value = null
      }
      tooltipLatLng.value = event.latlng
      updateTooltipPosition(event.latlng)


      function getRegionFromXml(xmlText, regions) {
        const xml = new DOMParser().parseFromString(xmlText, 'text/xml')

        // LVL1_NAME is used by the Domain WMS; LVL2_NAME by the Province WMS
        const field = xml.querySelector('FIELDS')
        if (mapStore.leaflet.hasLayer(wmsLayerDomain)) {
          const regionName = field?.getAttribute('LVL1_NAME')
          return regions.find((r) => r.name === regionName) ?? null
        } else {
          const provinceName = field?.getAttribute('LVL2_ID')
          return regions.find((r) => r.province === provinceName) ?? null
        }
}

      // L.popup()
      //   .setLatLng(event.latlng)
      //   .setContent(buildPopupHtml(feature.properties)) //here!!!
      //   .openOn(mapStore.leaflet)
    } catch (error) {
      if (error?.name === 'AbortError') return
    }
    // update tooltip position when the map is moved
    mapStore.leaflet.on('move', () => {
    if (tooltipLatLng.value) {
      updateTooltipPosition(tooltipLatLng.value)
    }
  })
  })

  updateLegend()

  // Add click event listener to the map to fetch region data and show tooltips
  // mapStore.leaflet.on('click', async (e) => {
  //   const domainOn = mapStore.leaflet.hasLayer(wmsLayerDomain)
  //   const provinceOn = mapStore.leaflet.hasLayer(wmsLayerProvince)
  //   const activeLayer = domainOn ? wmsLayerDomain : provinceOn ? wmsLayerProvince : null
  //   if (!activeLayer) return

  //   try {
  //     const url = getFeatureInfoUrl(activeLayer, e.latlng)
  //     const response = await fetch(url)
  //     const text = await response.text()
  //     const region = getRegionFromXml(text, domainOn ? domainRegions : provinceRegions)
  //     if (!region) return
  //     tooltipRegion.value = region
  //     tooltipLatLng.value = e.latlng
  //     updateTooltipPosition(e.latlng)
  //   } catch (error) {
  //     console.error('Error fetching feature info:', error)
  //   }
  // })
  // // update tooltip position when the map is moved
  // mapStore.leaflet.on('move', () => {
  //   if (tooltipLatLng.value) {
  //     updateTooltipPosition(tooltipLatLng.value)
  //   }
  // })

  await initialDomainLayerReady
  // set the mapLoaded flag to true after the map and layers have been initialized
  // this will turn off the loading overlay and allow the map to be displayed
  mapLoaded.value = true
  loadLegendEntries().then(updateLegend)
})



</script>


<style scoped>
#wms-legend {
  z-index: 1001;
  position: absolute;
  overflow: auto;
  border: 2px solid rgba(0, 0, 0, 0.2);
  min-width: 110px;
  max-width: 340px;
  max-height: 190px;
  padding: 5px;
  font-size: 0.92rem;
  border-radius: 6px;
  bottom: 10px;
  left: 10px;
  background: white;
}

.legend-section + .legend-section {
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.legend-section-title {
  margin-bottom: 4px;
  font-weight: 700;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #333;
}

.legend-item {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-bottom: 3px;
  line-height: 1.1;
}

.legend-item img {
  flex-shrink: 0;
  width: auto;
  height: auto;
  max-width: 20px;
  max-height: 20px;
  object-fit: contain;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 3px;
}

.legend-item-label {
  font-size: 0.82rem;
  color: #222;
}

.legend-empty {
  color: #666;
  font-size: 0.82rem;
  padding: 2px 0;
}

:deep(.leaflet-control-layers-group-name) {
  display: none;
}

.overlay-opacity-control {
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  pointer-events: auto;
  cursor: default;
}

.overlay-opacity-title {
  margin-bottom: 0;
  font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.1;
  color: #333;
}

.overlay-opacity-slider {
  margin-top: -8px;
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
