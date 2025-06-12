<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
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
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

const emit = defineEmits(['onFilter'])

const mapStore = useMapStore()
const {
  mapLoaded,
  userTouchedFilter,
  currentFilteredData,
  selectedSpatialZones,
  selectedTemporalZones,
  selectedProcesses,
  searchTerm
} = storeToRefs(mapStore)

onUpdated(() => {
  mapStore.leaflet.invalidateSize()
})

onMounted(async () => {
  mapStore.leaflet = L.map('mapContainer', { minZoom: 2, maxZoom: 20 }).setView([0, 11], 2)
  mapStore.layerGroup = new L.LayerGroup()
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
  mapStore.drawnItems = drawnItems
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
    edit: false
  })
  mapStore.leaflet.addControl(drawControl)

  L.Control.ClearFilters = L.Control.extend({
    options: {
      position: 'topleft'
    },
    onAdd: function () {
      const container = L.DomUtil.create(
        'div',
        'leaflet-bar leaflet-control leaflet-control-custom'
      )
      container.innerHTML =
        '<a title="Clear All Filters"><i class="material-icons">clear_all</i></a>'
      container.style.backgroundColor = 'white'
      container.style.width = '34px'
      container.style.height = '34px'
      container.style.cursor = 'pointer'
      container.style.display = 'flex'
      container.style.alignItems = 'center'
      container.style.justifyContent = 'center'

      L.DomEvent.on(container, 'click', () => {
        mapStore.clearAllFilters()
        emit('onFilter', {
          selectedSpatialZones,
          selectedTemporalZones,
          selectedProcesses,
          searchTerm,
          filteredFeatures: currentFilteredData.value
        })
      })

      return container
    }
  })
  mapStore.leaflet.addControl(new L.Control.ClearFilters())

  // Handle rectangle creation
  mapStore.leaflet.on(L.Draw.Event.CREATED, function (e) {
    const layer = e.layer
    drawnItems.clearLayers()
    drawnItems.addLayer(layer)

    // Get rectangle bounds
    const bounds = layer.getBounds()

    mapStore.filterFeatures(
      (feature) => {
        if (feature.geometry.type === 'Point') {
          const [lng, lat] = feature.geometry.coordinates
          return bounds.contains([lat, lng])
        }
        return false
      },
      'add',
      'rectangle'
    )

    userTouchedFilter.value = true

    emit('onFilter', {
      selectedSpatialZones,
      selectedTemporalZones,
      selectedProcesses,
      searchTerm,
      filteredFeatures: currentFilteredData.value
    })
  })

  // Handle rectangle deletion
  mapStore.leaflet.on(L.Draw.Event.DELETED, function () {
    drawnItems.clearLayers()
    mapStore.filterFeatures(null, 'clear')
    userTouchedFilter.value = false

    emit('onFilter', {
      selectedSpatialZones,
      selectedTemporalZones,
      selectedProcesses,
      searchTerm,
      filteredFeatures: currentFilteredData.value
    })
  })

  mapStore.leaflet.on('click', function (e) {
    mapClick(e)
  })

  mapLoaded.value = true
})

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
