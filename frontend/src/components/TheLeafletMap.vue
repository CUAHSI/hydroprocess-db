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
  mapStore.leaflet = L.map('mapContainer', { minZoom: 2, maxZoom: 9 }).setView([0, 11], 2)
  mapStore.layerGroup = new L.LayerGroup()
  mapStore.layerGroup.addTo(mapStore.leaflet)

  const CartoDB_PositronNoLabels = L.tileLayer(
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
  const Esri_Hydro_Reference_Overlay = esriLeaflet.tiledMapLayer({
    url: url,
    layers: 0,
    transparent: true,
    format: 'image/png'
  })

  url =
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
  const Esri_WorldImagery = L.tileLayer(url, {
    variant: 'World_Imagery',
    attribution: 'Esri'
  })

  const baselayers = {
    CartoDB_PositronNoLabels,
    Esri_WorldImagery
  }

  Esri_WorldImagery.addTo(mapStore.leaflet)
  Esri_Hydro_Reference_Overlay.addTo(mapStore.leaflet)

  await mapStore.fetchPerceptualModelsGeojson()
  const bounds = L.latLngBounds(mapStore.allAvailableCoordinates)
  mapStore.leaflet.setMaxBounds(bounds)

  const mixed = {
    'Perceptual Models': mapStore.layerGroup,
    'Esri Hydro Reference Overlay': Esri_Hydro_Reference_Overlay
  }
  L.control.layers(baselayers, mixed).addTo(mapStore.leaflet)

  const drawnItems = new L.FeatureGroup()
  mapStore.drawnItems = drawnItems
  mapStore.leaflet.addLayer(drawnItems)
  drawnItems.setZIndex(1000)

  let currentRectangle = null

  L.Control.RectangleToggle = L.Control.extend({
    options: { position: 'topleft' },
    onAdd: function () {
      const container = L.DomUtil.create(
        'div',
        'leaflet-bar leaflet-control leaflet-control-custom draw-toggle-btn'
      )
      updateDrawButton(container)
      let drawer = null
      L.DomEvent.on(container, 'click', () => {
        if (currentRectangle || drawer) {
          drawnItems.clearLayers()
          currentRectangle = null
          mapStore.filterFeatures(
            (feature) => {
              if (feature.geometry.type === 'Point') {
                const [lng, lat] = feature.geometry.coordinates
                return currentRectangle.getBounds().contains([lat, lng])
              }
              return false
            },
            'remove',
            'rectangle'
          )
          userTouchedFilter.value = false
          emit('onFilter', {
            selectedSpatialZones,
            selectedTemporalZones,
            selectedProcesses,
            searchTerm,
            filteredFeatures: currentFilteredData.value
          })
          updateDrawButton(container)
        } else {
          const drawer = new L.Draw.Rectangle(mapStore.leaflet, {
            shapeOptions: {
              color: '#3388ff',
              weight: 2,
              opacity: 0.8,
              fillOpacity: 0.3
            },
            showArea: false
          })
          drawer.enable()
          currentRectangle = {}
          updateDrawButton(container)

          const drawHandler = (e) => {
            mapStore.leaflet.off(L.Draw.Event.CREATED, drawHandler)
            drawnItems.clearLayers()
            currentRectangle = e.layer
            currentRectangle.feature = {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [
                  currentRectangle.getLatLngs()[0].map((latLng) => [latLng.lng, latLng.lat])
                ]
              },
              properties: {}
            }
            drawnItems.addLayer(currentRectangle)
            mapStore.leaflet.fitBounds(currentRectangle.getBounds())

            mapStore.filterFeatures(
              (feature) => {
                if (feature.geometry.type === 'Point') {
                  const [lng, lat] = feature.geometry.coordinates
                  return currentRectangle.getBounds().contains([lat, lng])
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

            updateDrawButton(container)
          }

          mapStore.leaflet.on(L.Draw.Event.CREATED, drawHandler)
          mapStore.leaflet.once('draw:drawstop', () => {
            // If no rectangle was drawn, reset the toggle state
            if (!drawnItems.getLayers().length) {
              currentRectangle = null
              updateDrawButton(container)
              mapStore.leaflet.off(L.Draw.Event.CREATED, drawHandler)
            }
          })
        }
      })

      return container
    }
  })
  mapStore.leaflet.addControl(new L.Control.RectangleToggle())

  function updateDrawButton(container) {
    if (currentRectangle) {
      container.innerHTML = '<span class="material-icons">close</span>'
      container.style.background = 'white'
      container.title = 'Clear box'
    } else {
      container.style.backgroundImage = "url('/DrawIcon.ico')"
      container.innerHTML = ''
      container.title = 'Draw a box'
    }
    container.style.backgroundRepeat = 'no-repeat'
    container.style.backgroundSize = '60% 60%'
    container.style.backgroundPosition = 'center'
    container.style.borderRadius = '4px'
    container.style.width = '34px'
    container.style.height = '34px'
    container.style.cursor = 'pointer'
    container.style.display = 'flex'
    container.style.alignItems = 'center'
    container.style.justifyContent = 'center'
  }
  L.drawLocal.draw.handlers.rectangle.tooltip.start = 'Click and drag to draw a box'
  L.Control.ClearFilters = L.Control.extend({
    options: { position: 'topleft' },
    onAdd: function () {
      const container = L.DomUtil.create(
        'div',
        'leaflet-bar leaflet-control leaflet-control-custom'
      )
      container.title = 'Reset Filters'

      container.style.backgroundImage = "url('/ClearFilter.ico')"
      container.style.backgroundRepeat = 'no-repeat'
      container.style.backgroundSize = '60% 60%'
      container.style.backgroundColor = 'white'
      container.style.backgroundPosition = 'center'
      container.style.borderRadius = '4px'
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

<style>
.leaflet-draw-toolbar a.leaflet-draw-draw-rectangle {
  background-image: url('/DrawIcon.ico') !important;
  background-repeat: no-repeat !important;
  background-size: 60% 60% !important;
  background-position: center !important;
  border-radius: 4px;
}

.leaflet-control-custom.clear-filters-btn {
  background-image: url('/ClearFilters.png') !important;
  background-repeat: no-repeat !important;
  background-size: 60% 60% !important;
  background-position: center !important;
  background-color: #f44336 !important;
  border-radius: 4px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.draw-toggle-btn {
  background-color: white;
  border-radius: 4px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
