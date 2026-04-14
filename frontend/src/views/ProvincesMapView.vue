<template>
  <div>
    <div id="simpleMapContainer"></div>
    <div
      id="wms-legend"
      style="
        position: absolute;
        bottom: 80px;
        left: 10px;
        background: white;
        z-index: 1001;
        padding: 8px;
        border-radius: 4px;
        min-width: 40px;
        min-height: 40px;
      "
    ></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-groupedlayercontrol'
import 'leaflet-groupedlayercontrol/dist/leaflet.groupedlayercontrol.min.css'

onMounted(() => {
  const map = L.map('simpleMapContainer', { minZoom: 2 }).setView([0, 0], 2)

  // Define base and overlay layers
  const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  })
  osmLayer.addTo(map)
  const wmsLayerDomain = L.tileLayer.wms(
    'https://arcgis.cuahsi.org/arcgis/services/HydroProcess/Domain/MapServer/WMSServer',
    {
      layers: '0', // Layer ID or name, adjust as needed
      format: 'image/png',
      transparent: true,
      attribution: 'Tiles © Esri'
    }
  )
  wmsLayerDomain.addTo(map)
  const wmsLayerProvince = L.tileLayer.wms(
    'https://arcgis.cuahsi.org/arcgis/services/HydroProcess/Province/MapServer/WMSServer',
    {
      layers: '0', // Layer ID or name, adjust as needed
      format: 'image/png',
      transparent: true,
      attribution: 'Tiles © Esri'
    }
  )

  // Set up grouped layer control
  // Add the default base layer to the map before adding the control

  const baseLayers = {
    OpenStreetMap: osmLayer
  }
  const groupedOverlays = {
    Regions: {
      'Domains': wmsLayerDomain,
      'Provinces': wmsLayerProvince
    }
  }
  const options = {
    // Make the "Landmarks" group exclusive (use radio inputs)
    exclusiveGroups: ['Regions'],
    // Show a checkbox next to non-exclusive group labels for toggling all
    groupCheckboxes: true
  }
  // Move layer control to the left
  const layerControl = new L.Control.GroupedLayers(null, groupedOverlays, { ...options, position: 'topleft', collapsed: false })
  map.addControl(layerControl)

  // Move zoom control to the right
  map.removeControl(map.zoomControl)
  map.zoomControl = L.control.zoom({ position: 'topright' }).addTo(map)

  // Track which WMS layer is currently active
  let activeWmsLayer = null

  // Legend URLs
  const legendUrls = {
    domain:
      'https://arcgis.cuahsi.org/arcgis/services/HydroProcess/Domain/MapServer/WMSServer?service=WMS&request=GetLegendGraphic&format=image/png&layer=0&version=1.1.1',
    province:
      'https://arcgis.cuahsi.org/arcgis/services/HydroProcess/Province/MapServer/WMSServer?service=WMS&request=GetLegendGraphic&format=image/png&layer=0&version=1.1.1'
  }

  function updateLegend() {
    const domainOn = map.hasLayer(wmsLayerDomain)
    const provinceOn = map.hasLayer(wmsLayerProvince)
    let html = ''
    if (domainOn) {
      html += `<img src="${legendUrls.domain}" alt="Domain Legend" style="margin-bottom:8px;" />`
    }
    if (provinceOn) {
      html += `<img src="${legendUrls.province}" alt="Province Legend" />`
    }
    document.getElementById('wms-legend').innerHTML = html

    // Set activeWmsLayer to the one that is currently on (for exclusive group)
    if (domainOn) {
      activeWmsLayer = wmsLayerDomain
    } else if (provinceOn) {
      activeWmsLayer = wmsLayerProvince
    } else {
      activeWmsLayer = null
    }
  }
  map.on('overlayadd', updateLegend)
  map.on('overlayremove', updateLegend)

  map.on('click', function (e) {
    if (!activeWmsLayer) return
    const url = getFeatureInfoUrl(map, activeWmsLayer, e.latlng)
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        L.popup().setLatLng(e.latlng).setContent(data).openOn(map)
      })
  })

  function getFeatureInfoUrl(map, layer, latlng) {
    const point = map.latLngToContainerPoint(latlng, map.getZoom())
    const size = map.getSize()
    const params = {
      request: 'GetFeatureInfo',
      service: 'WMS',
      srs: 'EPSG:4326',
      styles: '',
      transparent: true,
      version: '1.1.1',
      format: 'image/png',
      bbox: map.getBounds().toBBoxString(),
      height: size.y,
      width: size.x,
      layers: layer.wmsParams.layers,
      query_layers: layer.wmsParams.layers,
      info_format: 'text/html'
    }
    params[params.version === '1.3.0' ? 'i' : 'x'] = Math.round(point.x)
    params[params.version === '1.3.0' ? 'j' : 'y'] = Math.round(point.y)
    const baseUrl = layer._url
    return baseUrl + L.Util.getParamString(params, baseUrl, true)
  }
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
/* Legend styles */
#wms-legend {
  min-width: 120px;
  min-height: 120px;
  max-width: 350px;
  max-height: 300px;
  overflow: auto;
  padding: 16px;
  font-size: 1.2em;
  box-sizing: border-box;
}

@media (max-width: 600px) {
  #wms-legend {
    min-width: 80px;
    min-height: 80px;
    max-width: 90vw;
    max-height: 120px;
    padding: 8px;
    font-size: 1em;
    left: 4px !important;
    right: 4px !important;
  }
}
#wms-legend img {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
<style>
.leaflet-control-layers,
.leaflet-control-groupedlayers {
  background: transparent !important;
  box-shadow: none !important;
}
</style>
