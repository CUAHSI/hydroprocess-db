<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
  <div v-show="$route.meta.showMap" id="mapContainer">
    <div
      v-if="userTouchedFilter && mapStore.currentFilteredData.length === 0"
      class="no-data-overlay"
    >
      <span>No data found</span>
    </div>
  </div>
</template>

<script setup>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { storeToRefs } from 'pinia'
import * as esriLeaflet from 'esri-leaflet'
import { onMounted, onUpdated } from 'vue'
import { useMapStore } from '@/stores/map'
import 'leaflet-iconmaterial/dist/leaflet.icon-material.css'

const mapStore = useMapStore()
const { mapLoaded, userTouchedFilter } = storeToRefs(mapStore)

onUpdated(() => {
  mapStore.leaflet.invalidateSize()
})

onMounted(async () => {
  mapStore.leaflet = L.map('mapContainer', { minZoom: 2 }).setView([0, 11], 2)
  mapStore.layerGroup = new L.LayerGroup()
  mapStore.layerGroup.addTo(mapStore.leaflet)

  // Initial OSM tile layer
  let CartoDB_PositronNoLabels = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }
  )

  let url =
    'https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Esri_Hydro_Reference_Overlay/MapServer'
  // url = 'https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Esri_Hydro_Reference_Labels/MapServer'

  let Esri_Hydro_Reference_Overlay = esriLeaflet.tiledMapLayer({
    url: url,
    layers: 0,
    transparent: 'true',
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

  // query the api for the features
  await mapStore.fetchPerceptualModelsGeojson()

  // Convert to Leaflet LatLngBounds
  const bounds = L.latLngBounds(mapStore.allAvailableCoordinates)

  // Restrict panning to within bounds
  mapStore.leaflet.setMaxBounds(bounds)

  // layer toggling
  let mixed = {
    'Perceptual Models': mapStore.layerGroup,
    'Esri Hydro Reference Overlay': Esri_Hydro_Reference_Overlay
  }

  // /*
  //  * LEAFLET BUTTONS
  //  */

  // Layer Control
  L.control.layers(baselayers, mixed).addTo(mapStore.leaflet)

  /*
   * LEAFLET EVENT HANDLERS
   */
  mapStore.leaflet.on('click', function (e) {
    mapClick(e)
  })

  mapLoaded.value = true
})

/**
 * Handles the click event on the map.
 *
 * @param {MouseEvent} e - The click event object.
 * @returns {Promise<void>} - A promise that resolves when the click event is handled.
 */
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
