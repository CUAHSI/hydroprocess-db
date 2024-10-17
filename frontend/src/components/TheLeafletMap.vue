<template>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <div v-show="$route.meta.showMap" id="mapContainer"></div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import L from 'leaflet'
import * as esriLeaflet from 'esri-leaflet'
import { onMounted, onUpdated } from 'vue'
import { useMapStore } from '@/stores/map'
import 'leaflet-iconmaterial/dist/leaflet.icon-material.css'

const mapStore = useMapStore()

onUpdated(() => {
    mapStore.leaflet.invalidateSize()
})

onMounted(async () => {
    let leaflet = L.map('mapContainer').setView([0, 11], 2);
    mapStore.leaflet = leaflet;
    let layerGroup = new L.LayerGroup();
    mapStore.layerGroup = layerGroup;
    layerGroup.addTo(leaflet);

    // Initial OSM tile layer
    let CartoDB_PositronNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    });

    let url =
        'https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Esri_Hydro_Reference_Overlay/MapServer'
    // url = 'https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Esri_Hydro_Reference_Labels/MapServer'

    let Esri_Hydro_Reference_Overlay = esriLeaflet.tiledMapLayer({
        url: url,
        layers: 0,
        transparent: 'true',
        format: 'image/png'
    })

    url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
    let Esri_WorldImagery = L.tileLayer(url, {
        variant: 'World_Imagery',
        attribution: 'Esri'
    })

    const baselayers = {
        CartoDB_PositronNoLabels,
        Esri_WorldImagery
    };

    Esri_WorldImagery.addTo(leaflet);
    Esri_Hydro_Reference_Overlay.addTo(leaflet);

    // query the api for the features
    await mapStore.fetchPerceptualModelsGeojson()

    // layer toggling
    let mixed = {
        "Perceptual Models": layerGroup,
        "Esri Hydro Reference Overlay": Esri_Hydro_Reference_Overlay
    };

    // /*
    //  * LEAFLET BUTTONS
    //  */

    // Layer Control
    L.control.layers(baselayers, mixed).addTo(leaflet);

    /*
     * LEAFLET EVENT HANDLERS
     */
    leaflet.on("click", function (e) {
        mapClick(e);
    });

    mapStore.mapLoaded = true;
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
}
</style>