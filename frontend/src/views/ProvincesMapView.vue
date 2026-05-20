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
  const map = L.map('simpleMapContainer', { minZoom: 2 }).setView([54, -105], 3)
  let highlightLayer = null
  let highlightAbortController = null
  const domainWfsUrl =
    'https://arcgis.cuahsi.org/arcgis/services/HydroProcess/Domain/MapServer/WFSServer'
  const provinceWfsUrl =
    'https://arcgis.cuahsi.org/arcgis/services/HydroProcess/Province/MapServer/WFSServer'
  let domainTypeName = null
  let provinceTypeName = null

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

  loadWfsTypeNames()

  // Set up grouped layer control
  // Add the default base layer to the map before adding the control

  const groupedOverlays = {
    Regions: {
      Domains: wmsLayerDomain,
      Provinces: wmsLayerProvince
    }
  }
  const options = {
    // Make the "Landmarks" group exclusive (use radio inputs)
    exclusiveGroups: ['Regions'],
    // Show a checkbox next to non-exclusive group labels for toggling all
    groupCheckboxes: true
  }
  // Move layer control to the left
  const layerControl = new L.Control.GroupedLayers(null, groupedOverlays, {
    ...options,
    position: 'topleft',
    collapsed: false
  })
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
  updateLegend()

  map.on('click', function (e) {
    if (!activeWmsLayer) return
    highlightFeatureAtClick(activeWmsLayer, e.latlng)
  })

  async function highlightFeatureAtClick(layer, latlng) {
    if (layer === wmsLayerDomain && domainTypeName) {
      await highlightFromWfs(latlng, domainWfsUrl, domainTypeName, 'domain')
      return
    }

    if (layer === wmsLayerProvince && provinceTypeName) {
      await highlightFromWfs(latlng, provinceWfsUrl, provinceTypeName, 'province')
      return
    }
  }

  async function loadWfsTypeNames() {
    domainTypeName = await loadWfsTypeName(domainWfsUrl, 'Domain')
    provinceTypeName = await loadWfsTypeName(provinceWfsUrl, 'Province')
  }

  async function loadWfsTypeName(wfsUrl, label) {
    const params = new URLSearchParams({
      service: 'WFS',
      request: 'GetCapabilities',
      version: '2.0.0'
    })

    try {
      const response = await fetch(`${wfsUrl}?${params.toString()}`)
      const xmlText = await response.text()
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
      const featureTypes = xmlDoc.getElementsByTagNameNS('*', 'FeatureType')

      if (!featureTypes.length) {
        return null
      }

      const firstFeatureType = featureTypes[0]
      const nameNode = firstFeatureType.getElementsByTagNameNS('*', 'Name')[0]
      return nameNode?.textContent?.trim() || null
    } catch (error) {
      console.error(`Failed to load WFS capabilities for ${label} layer`, error)
      return null
    }
  }

  async function highlightFromWfs(latlng, wfsUrl, typeName, label) {
    // Use a tiny pixel buffer around click to keep feature retrieval small.
    const clickPoint = map.latLngToContainerPoint(latlng)
    const minLatLng = map.containerPointToLatLng(L.point(clickPoint.x - 4, clickPoint.y + 4))
    const maxLatLng = map.containerPointToLatLng(L.point(clickPoint.x + 4, clickPoint.y - 4))

    const minX = Math.min(minLatLng.lng, maxLatLng.lng)
    const minY = Math.min(minLatLng.lat, maxLatLng.lat)
    const maxX = Math.max(minLatLng.lng, maxLatLng.lng)
    const maxY = Math.max(minLatLng.lat, maxLatLng.lat)

    const baseParams = {
      service: 'WFS',
      version: '2.0.0',
      request: 'GetFeature',
      typeNames: typeName,
      outputFormat: 'geojson',
      srsName: 'EPSG:4326',
      count: '1',
      maxFeatures: '1',
      maxAllowableOffset: '0.02'
    }

    const bboxLonLat = `${minX},${minY},${maxX},${maxY},EPSG:4326`
    const bboxLatLon = `${minY},${minX},${maxY},${maxX},EPSG:4326`

    try {
      if (highlightAbortController) {
        highlightAbortController.abort()
      }
      highlightAbortController = new AbortController()

      let features = await fetchWfsFeatures(wfsUrl, { ...baseParams, bbox: bboxLonLat })

      // Some WFS implementations expect EPSG:4326 axis order as lat,lon.
      if (!features.length) {
        features = await fetchWfsFeatures(wfsUrl, { ...baseParams, bbox: bboxLatLon })
      }

      clearHighlight()

      if (!features.length) {
        return
      }

      const clickedFeature = features[0]

      highlightLayer = L.geoJSON(clickedFeature, {
        style: {
          color: '#1976d2',
          weight: 3,
          fillColor: '#90caf9',
          fillOpacity: 0.24
        }
      }).addTo(map)

      highlightLayer.bringToFront()

      const popupHtml = buildPopupHtml(clickedFeature.properties)
      L.popup().setLatLng(latlng).setContent(popupHtml).openOn(map)
    } catch (error) {
      if (error?.name === 'AbortError') {
        return
      }
      console.error(`Failed to highlight ${label} feature from WFS`, error)
      clearHighlight()
    }
  }

  async function fetchWfsFeatures(wfsUrl, paramsObj) {
    const params = new URLSearchParams(paramsObj)
    const response = await fetch(`${wfsUrl}?${params.toString()}`, {
      signal: highlightAbortController?.signal
    })
    const geojson = await response.json()
    return geojson?.features || []
  }

  function buildPopupHtml(properties) {
    if (!properties || Object.keys(properties).length === 0) {
      return '<div>No feature attributes found.</div>'
    }

    const rows = Object.entries(properties)
      .filter(([, value]) => value !== null && value !== undefined && value !== '')
      .slice(0, 20)
      .map(
        ([key, value]) =>
          `<tr><th style="text-align:left; padding-right:8px; vertical-align:top;">${escapeHtml(
            key
          )}</th><td>${escapeHtml(String(value))}</td></tr>`
      )
      .join('')

    return rows ? `<table>${rows}</table>` : '<div>No feature attributes found.</div>'
  }

  function escapeHtml(value) {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;')
  }

  function clearHighlight() {
    if (highlightLayer) {
      map.removeLayer(highlightLayer)
      highlightLayer = null
    }
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
  background: white !important;
  box-shadow: none !important;
}
</style>
