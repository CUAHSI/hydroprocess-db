<template>
    <div v-show="$route.meta.showMap" id="mapContainer"></div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import L from 'leaflet'
import { onMounted, onUpdated } from 'vue'
import { useMapStore } from '@/stores/map'
import { usePerceptualModelStore } from "@/stores/perceptual_models";

const mapStore = useMapStore()
const perceptualModelStore = usePerceptualModelStore();

let modelFeatures = {}

onUpdated(() => {
    mapStore.leaflet.invalidateSize()
})

onMounted(() => {
    let leaflet = L.map('mapContainer').setView([0, 11], 3);
    mapStore.leaflet = leaflet;
    let layerGroup = new L.LayerGroup();
    mapStore.layerGroup = layerGroup;
    layerGroup.addTo(leaflet);

    // Initial OSM tile layer
    var CartoDB_PositronNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    });

    const baselayers = {
        CartoDB_PositronNoLabels,
    };

    CartoDB_PositronNoLabels.addTo(leaflet);

    // query the api for the features
    mapStore.fetchPerceptualModelsGeojson()

    // modelFeatures.on("click", function (e) {
    //     featurePopup(e.layer.feature);

    // });

    // layer toggling
    let mixed = {
        "Perceptual Models": layerGroup,
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