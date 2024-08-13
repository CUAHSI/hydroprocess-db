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


const Map = mapStore.mapObject

let modelFeatures = {}

onUpdated(() => {
    Map.leaflet.invalidateSize()
})

onMounted(() => {
    let leaflet = L.map('mapContainer').setView([0, 11], 3);
    let layerGroup = new L.LayerGroup();
    layerGroup.addTo(leaflet);
    Map.layerGroup = layerGroup;
    Map.leaflet = leaflet;

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

    function onEachFeature(feature, layer) {
        let content = `<h3>${feature.properties.citation.citation}</h3><p><ul>`
        for (const [key, value] of Object.entries(feature.properties)) {
            content += `<li>${key}: ${value}</li>`;
        }
        content += '</ul></p>'
        layer.bindPopup(content);
    }
    // query the api for the features
    perceptualModelStore.fetchPerceptualModelsGeojson().then((perceptual_models) => {
        modelFeatures = L.geoJSON(perceptual_models, {
            onEachFeature: onEachFeature
        })
        layerGroup.addLayer(modelFeatures);
        mapStore.modelFeatures.value = modelFeatures;
    })

    // modelFeatures.on("click", function (e) {
    //     featurePopup(e.layer.feature);

    // });

    // layer toggling
    let mixed = {
        // "Models": modelFeatures,
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