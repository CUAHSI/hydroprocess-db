<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw.css" />
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css"
  />
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css"
  />
  <div v-show="$route.meta.showMap" id="mapContainer">
    <div v-if="userTouchedFilter && currentFilteredData.length === 0" class="no-data-overlay">
      <span>No data found</span>
    </div>
  </div>
</template>

<script setup>
import L from 'leaflet'
import 'leaflet-draw'
import 'leaflet.markercluster'
import { storeToRefs } from 'pinia'
import * as esriLeaflet from 'esri-leaflet'
import { onMounted, onUpdated } from 'vue'
import { useMapStore } from '@/stores/map'
import 'leaflet-iconmaterial/dist/leaflet.icon-material.css'

const mapStore = useMapStore()
const { mapLoaded, userTouchedFilter, currentFilteredData } = storeToRefs(mapStore)

onUpdated(() => {
  mapStore.leaflet.invalidateSize()
})

onMounted(async () => {
  mapStore.leaflet = L.map('mapContainer', { minZoom: 2, maxZoom: 20 }).setView([0, 11], 2)
  mapStore.layerGroup = new L.MarkerClusterGroup()
  mapStore.layerGroup.addTo(mapStore.leaflet)

  // Initial OSM tile layer
  let CartoDB_PositronNoLabels = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
    {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }
  )

  let url =
    'https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Esri_Hydro_Reference_Overlay/MapServer'
  let Esri_Hydro_Reference_Overlay = esriLeaflet.tiledMapLayer({
    url: url,
    layers: 0,
    transparent: true,
    format: 'image/png'
  })

  url =
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
  let Esri_WorldImagery = L.tileLayer(url, {
    variant: 'World_Imagery',
    attribution: 'Esri'
  })

  const baselayers = {
    CartoDB_PositronNoLabels,
    Esri_WorldImagery
  }

  Esri_WorldImagery.addTo(mapStore.leaflet)
  Esri_Hydro_Reference_Overlay.addTo(mapStore.leaflet)

  // Query the API for the features
  await mapStore.fetchPerceptualModelsGeojson()

  // Convert to Leaflet LatLngBounds
  const bounds = L.latLngBounds(mapStore.allAvailableCoordinates)
  mapStore.leaflet.setMaxBounds(bounds)

  // Layer toggling
  let mixed = {
    'Perceptual Models': mapStore.layerGroup,
    'Esri Hydro Reference Overlay': Esri_Hydro_Reference_Overlay
  }
  L.control.layers(baselayers, mixed).addTo(mapStore.leaflet)

  // Initialize draw control
  const drawnItems = new L.FeatureGroup()
  mapStore.leaflet.addLayer(drawnItems)
  drawnItems.setZIndex(1000)

  const drawControl = new L.Control.Draw({
    draw: {
      polyline: false,
      polygon: false,
      circle: false,
      marker: false,
      circlemarker: false,
      rectangle: {
        shapeOptions: {
          color: '#3388ff',
          weight: 2,
          opacity: 0.8,
          fillOpacity: 0.3
        },
        showArea: false
      }
    },
    edit: {
      featureGroup: drawnItems,
      remove: true
    }
  })
  mapStore.leaflet.addControl(drawControl)

  // Store original data for resetting
  const originalData = [...currentFilteredData.value]

  // Handle rectangle creation
  mapStore.leaflet.on(L.Draw.Event.CREATED, function (e) {
    const layer = e.layer
    drawnItems.clearLayers()
    drawnItems.addLayer(layer)

    // Get rectangle bounds
    const bounds = layer.getBounds()

    // Filter markers within bounds
    const filteredMarkers = originalData.filter((feature) => {
      if (feature.geometry.type === 'Point') {
        const [lng, lat] = feature.geometry.coordinates
        return bounds.contains([lat, lng])
      }
      return false
    })

    // Update currentFilteredData directly
    currentFilteredData.value = filteredMarkers
    userTouchedFilter.value = true

    // Update the layer group with filtered markers
    updateMarkers(filteredMarkers)
  })

  // Handle rectangle deletion
  mapStore.leaflet.on(L.Draw.Event.DELETED, function () {
    drawnItems.clearLayers()
    // Reset to original data
    currentFilteredData.value = [...originalData]
    userTouchedFilter.value = currentFilteredData.value.length === 0
    updateMarkers(currentFilteredData.value)
  })

  // Initial marker rendering
  updateMarkers(currentFilteredData.value)

  mapStore.leaflet.on('click', function (e) {
    mapClick(e)
  })

  mapLoaded.value = true
})

function updateMarkers(features) {
  mapStore.layerGroup.clearLayers()
  features.forEach((feature) => {
    if (feature.geometry.type === 'Point') {
      const [lng, lat] = feature.geometry.coordinates
      // Log properties to debug field names
      console.log('Feature properties:', feature.properties)

      // Create citation-style popup content
      let popupContent =
        '<div style="max-width: 200px; max-height: 300px; overflow-y: auto; padding: 10px; font-size: 12px;">'

      if (feature.properties) {
        const props = feature.properties
        let hasCitationFields = false

        // Title (try common alternatives)
        const title = props.title || props.name || props.study_title
        if (title) {
          popupContent += `<p><strong>${title}</strong></p>`
          hasCitationFields = true
        }

        // URL/DOI
        const url = props.doi || props.url || props.link
        if (url) {
          popupContent += `<p><a href="${url}" target="_blank">URL: ${url}</a></p>`
          hasCitationFields = true
        }

        // Authors and publication details
        let citation = ''
        const authors = props.authors || props.author || props.contributors
        if (authors) {
          citation += authors
        }
        const articleTitle = props.article_title || props.paper_title || props.title
        if (articleTitle && articleTitle !== title) {
          citation += ` "${articleTitle}"`
        }
        const journal = props.journal || props.publication || props.source
        if (journal) {
          citation += ` <em>${journal}</em>`
        }
        const volume = props.volume || props.vol
        if (volume) {
          citation += ` ${volume}`
        }
        const issue = props.issue || props.no
        if (issue) {
          citation += `, no. ${issue}`
        }
        const year = props.year || props.publication_year || props.date
        if (year) {
          citation += ` (${year})`
        }
        const pages = props.pages || props.page_range || props.pagination
        if (pages) {
          citation += `: ${pages}`
        }
        if (citation) {
          popupContent += `<p>${citation}.</p>`
          hasCitationFields = true
        }

        // Section
        const section = props.section || props.section_title || props.chapter
        if (section) {
          popupContent += `<p><strong>Section ${section}</strong></p>`
          hasCitationFields = true
        }

        // Page
        const page = props.page || props.specific_page || props.page_number
        if (page) {
          popupContent += `<p>(Page ${page})</p>`
          hasCitationFields = true
        }

        // Fallback: if no citation fields are found, display all properties
        if (!hasCitationFields && Object.keys(props).length > 0) {
          popupContent += '<ul style="margin: 0; padding: 0; list-style: none;">'
          for (const [key, value] of Object.entries(props)) {
            if (value !== null && value !== undefined && typeof value !== 'object') {
              popupContent += `<li><strong>${key}:</strong> ${value}</li>`
            }
          }
          popupContent += '</ul>'
        } else if (!hasCitationFields) {
          popupContent += '<p>No details available</p>'
        }
      } else {
        popupContent += '<p>No details available</p>'
      }

      popupContent += '</div>'
      const marker = L.marker([lat, lng]).bindPopup(popupContent)
      mapStore.layerGroup.addLayer(marker)
    }
  })
}

async function mapClick() {
  return
}
</script>

<style scoped>
#mapContainer {
  width: 100%;
  height: 100%;
  position: relative;
}

.no-data-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.no-data-overlay span {
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
