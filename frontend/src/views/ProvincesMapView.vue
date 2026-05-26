
<script setup>
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import proj4 from 'proj4'
import 'proj4leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-groupedlayercontrol'
import 'leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.css'

const legendCollapsed = ref(false)
const domainOn = ref(true)
const provinceOn = ref(false)

const lambertMapServerUrl =
  'https://arcgis.cuahsi.org/arcgis/rest/services/HydroProcess/hydroprocess_lambert/MapServer'
const lambertWmsUrl =
  'https://arcgis.cuahsi.org/arcgis/services/HydroProcess/hydroprocess_lambert/MapServer/WMSServer'

function getLegendGraphicUrl(layerId) {
  const params = new URLSearchParams({
    service: 'WMS',
    request: 'GetLegendGraphic',
    version: '1.3.0',
    format: 'image/png',
    transparent: 'true',
    style: 'default',
    layer: layerId
  })
  return `${lambertWmsUrl}?${params.toString()}`
}

const legendConfig = {
  domain: {
    title: 'Domains',
    url: getLegendGraphicUrl('0')
  },
  province: {
    title: 'Provinces',
    url: getLegendGraphicUrl('1')
  }
}

onMounted(() => {
  const lambertProj4 =
    '+proj=lcc +lat_0=40 +lon_0=-96 +lat_1=20 +lat_2=60 +x_0=0 +y_0=0 +datum=NAD83 +units=m +no_defs +type=crs'
  proj4.defs('EPSG:102009', lambertProj4)

  const lambertCrs = new L.Proj.CRS('EPSG:102009', lambertProj4, {
    bounds: L.bounds([-9500000, -5000000], [6500000, 5000000]),
    origin: [-9500000, 5000000],
    resolutions: [32768, 16384, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]
  })

  // Adjusted bounds to better center North America
  // Shifted bounds further south for better centering
  // Zoomed in by reducing bounds by ~20%
  const centerX = 556600;
  const minX = -11500000 + centerX;
  const maxX = 11500000 + centerX;
  const minY = -9000000;
  const maxY = 6000000;
  const width = maxX - minX;
  const height = maxY - minY;
  const newWidth = width * 0.8;
  const newHeight = height * 0.8;
  const xPad = (width - newWidth) / 2;
  const yPad = (height - newHeight) / 2;
  const expandedMin = [minX + xPad, minY + yPad];
  const expandedMax = [maxX - xPad, maxY - yPad];
  const lambertExtent = L.bounds(expandedMin, expandedMax)
  const lambertSouthWest = lambertCrs.projection.unproject(lambertExtent.min)
  const lambertNorthEast = lambertCrs.projection.unproject(lambertExtent.max)
  const lambertLatLngBounds = L.latLngBounds(lambertSouthWest, lambertNorthEast)

  const map = L.map('simpleMapContainer', {
    minZoom: 1,
    crs: lambertCrs
  })
  map.fitBounds(lambertLatLngBounds)
  map.setMaxBounds(lambertLatLngBounds.pad(0.2))
  // Center the map after fitting bounds
  const center = lambertLatLngBounds.getCenter();
  map.setView(center, map.getZoom());

  const wmsLayerDomain = L.tileLayer.wms(lambertWmsUrl, {
    layers: '0',
    version: '1.3.0',
    crs: lambertCrs,
    format: 'image/png',
    transparent: true,
    attribution: 'Tiles © Esri'
  })
  wmsLayerDomain.addTo(map)
  const wmsLayerProvince = L.tileLayer.wms(lambertWmsUrl, {
    layers: '1',
    version: '1.3.0',
    crs: lambertCrs,
    format: 'image/png',
    transparent: true,
    attribution: 'Tiles © Esri'
  })

  const groupedOverlays = {
    Regions: {
      Domains: wmsLayerDomain,
      Provinces: wmsLayerProvince
    }
  }
  const options = {
    exclusiveGroups: ['Regions'],
    groupCheckboxes: true
  }
  const layerControl = new L.Control.GroupedLayers(null, groupedOverlays, {
    ...options,
    position: 'topleft',
    collapsed: false
  })
  map.addControl(layerControl)

  map.removeControl(map.zoomControl)
  map.zoomControl = L.control.zoom({ position: 'topright' }).addTo(map)

  function clearHighlight() {
    if (highlightLayer) {
      map.removeLayer(highlightLayer)
      highlightLayer = null
    }
  }

  // --- Highlight and GetFeatureInfo logic ---
  let highlightLayer = null
  let highlightAbortController = null
  let highlightRequestId = 0
  map.on('click', async function (e) {
    const requestId = ++highlightRequestId
    if (highlightAbortController) {
      highlightAbortController.abort()
    }
    highlightAbortController = new AbortController()

    clearHighlight()
    // Determine active layer
    let activeLayerId = null
    if (domainOn.value) activeLayerId = '1'
    else if (provinceOn.value) activeLayerId = '0'
    else return

    // Query using the map CRS projected click coordinate to reduce reprojection drift.
    const projectedPoint = map.options.crs.project(e.latlng)

    const params = new URLSearchParams({
      f: 'geojson',
      geometry: `${projectedPoint.x},${projectedPoint.y}`,
      geometryType: 'esriGeometryPoint',
      inSR: '102009',
      spatialRel: 'esriSpatialRelIntersects',
      outFields: '*',
      returnGeometry: 'true',
      outSR: '4326'
    })
    const url = `${lambertMapServerUrl}/${activeLayerId}/query?${params.toString()}`
    try {
      const resp = await fetch(url, { signal: highlightAbortController.signal })
      if (requestId !== highlightRequestId) return

      const data = await resp.json()
      if (requestId !== highlightRequestId) return

      if (!data?.features?.length) {
        L.popup().setLatLng(e.latlng).setContent('No feature info').openOn(map)
        return
      }

      const feature = data.features[0]

      highlightLayer = L.geoJSON(feature, {
        style: { color: '#ff6600', weight: 3, fillOpacity: 0.2 },
        pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng, { radius: 8, color: '#ff6600' })
      }).addTo(map)
      highlightLayer.bringToFront()

      // Show popup with properties
      const props = feature.properties || {}
      const html = Object.entries(props).map(([k, v]) => `<b>${k}</b>: ${v}`).join('<br>')
      L.popup()
        .setLatLng(e.latlng)
        .setContent(html || 'No data')
        .openOn(map)
    } catch (err) {
      if (err?.name === 'AbortError') return
      L.popup().setLatLng(e.latlng).setContent('No feature info').openOn(map)
    }
  })

  function updateLegendState() {
    domainOn.value = map.hasLayer(wmsLayerDomain)
    provinceOn.value = map.hasLayer(wmsLayerProvince)
  }
  map.on('overlayadd', updateLegendState)
  map.on('overlayremove', updateLegendState)
  updateLegendState()
})
</script>

<style scoped>
/* 
  The map container's top offset and height depend on the header height.
  You can configure the header height by changing the --header-height variable below.
*/
:root {
  --header-height: 64px; /* Adjust this value if your header height changes */
}

#simpleMapContainer {
  position: fixed;
  top: var(--header-height, 64px);
  left: 0;
  width: 100vw;
  height: calc(100vh - var(--header-height, 64px));
  z-index: 0;
}
/* Legend panel */
#wms-legend {
  position: fixed;
  top: calc(var(--header-height, 64px) + 10px);
  bottom: 80px;
  left: 10px;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  z-index: 1200;
  pointer-events: none;
}

/* Horizontal tab at the bottom */
.legend-tab {
  pointer-events: all;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 14px;
  width: 220px;
  background: #fff;
  border: 1.5px solid #b0b0b0;
  border-radius: 6px 6px 6px 6px;
  cursor: pointer;
  font-size: 0.95rem;
  color: #333;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  user-select: none;
  writing-mode: horizontal-tb;
}

.legend-tab:hover {
  background: #f0f0f0;
}

.legend-tab-icon {
  font-size: 0.85rem;
  writing-mode: horizontal-tb;
}

.legend-tab-title {
  font-weight: 700;
  font-size: 0.9rem;
  flex: 1;
  text-align: left;
}

/* Expanded panel — opens upward */
.legend-panel {
  pointer-events: all;
  background: #fff;
  border: 1.5px solid #b0b0b0;
  border-radius: 8px 8px 8px 8px;
  box-shadow: 2px 2px 12px rgba(0,0,0,0.10);
  display: flex;
  flex-direction: column;
  width: 240px;
  max-height: 100%;
  overflow: hidden;
  margin-bottom: 6px;
}

#wms-legend.is-collapsed .legend-panel {
  display: none;
}

.legend-panel-header {
  padding: 12px 16px 10px;
  font-size: 1.05rem;
  font-weight: 700;
  color: #222;
  border-bottom: 1px solid #e0e0e0;
  background: #f7f7f7;
  border-radius: 8px 8px 0 0;
  flex-shrink: 0;
}

.legend-panel-body {
  padding: 14px 16px 16px;
  overflow-y: auto;
  flex: 1;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.legend-item:last-child {
  margin-bottom: 0;
}

.legend-empty {
  color: #666;
  font-size: 0.95rem;
}

#wms-legend img {
  max-width: 200px;
  width: 100%;
  height: auto;
  display: block;
  border: none;
  background: transparent;
  padding: 0;
}
</style>
<style>
.leaflet-control-layers,
.leaflet-control-groupedlayers {
  background: white !important;
  box-shadow: none !important;
}
</style>
<template>
  <div>
    <div id="simpleMapContainer"></div>
    <div id="wms-legend" :class="{ 'is-collapsed': legendCollapsed }">
      <button
        type="button"
        class="legend-tab"
        :aria-expanded="!legendCollapsed"
        @click="legendCollapsed = !legendCollapsed"
      >
        <span class="legend-tab-icon">{{ legendCollapsed ? '▸' : '◂' }}</span>
        <span class="legend-tab-title">Legend</span>
      </button>
        <div class="legend-panel">
          <div class="legend-panel-header">Legend</div>
          <div class="legend-panel-body">
            <div v-if="domainOn" class="legend-item">
              <img :src="legendConfig.domain.url" alt="Domain legend" />
            </div>
            <div v-if="provinceOn" class="legend-item">
              <img :src="legendConfig.province.url" alt="Province legend" style="width:auto; max-width:200px;" />
            </div>
            <div v-if="!domainOn && !provinceOn" class="legend-empty">No active map layer</div>
          </div>
        </div>
    </div>
  </div>
</template>
