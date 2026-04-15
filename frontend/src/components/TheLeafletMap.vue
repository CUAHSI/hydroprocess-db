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
import * as esriLeaflet from 'esri-leaflet'
import { onMounted, onUpdated } from 'vue'
import { useMapStore } from '@/stores/map'
import 'leaflet-iconmaterial/dist/leaflet.icon-material.css'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

const mapStore = useMapStore()

onUpdated(() => {
  mapStore.leaflet.invalidateSize()
})

onMounted(() => {
  mapStore.leaflet = L.map('mapContainer', { minZoom: 2 }).setView([0, 11], 2)
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

  L.control.layers(baselayers).addTo(mapStore.leaflet)
})
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
