<template>
    <div v-show="$route.meta.showMap" id="mapContainer"></div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import "leaflet-easybutton/src/easy-button.css";
import L from 'leaflet'
import * as esriLeafletGeocoder from "esri-leaflet-geocoder"
import * as esriLeaflet from "esri-leaflet";
// import * as esriLeafletVector from 'esri-leaflet-vector';
import "leaflet-easybutton/src/easy-button";
import { onMounted, onUpdated, ref } from 'vue'
import { useMapStore } from '@/stores/map'
import { useAlertStore } from '@/stores/alerts'
import { ARCGIS_API_KEY } from "../constants";

const mapStore = useMapStore()
const alertStore = useAlertStore();


const Map = mapStore.mapObject

onUpdated(() => {
    Map.leaflet.invalidateSize()
})

onMounted(() => {
    let leaflet = L.map('mapContainer').setView([0, 11], 3);
    Map.leaflet = leaflet;
    Map.hucbounds = [];
    Map.popups = [];
    Map.buffer = 20;
    Map.huclayers = [];
    Map.reaches = {};
    Map.reachesFeatures = ref({})

    Map.bbox = [99999999,
        99999999,
        -99999999,
        -99999999];

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


    // add lakes features layer to map
    let url = 'https://services1.arcgis.com/SIYkiqjmENweC50g/arcgis/rest/services/alltype_models_v1/FeatureServer/0/'
    const modelFeatures = esriLeaflet.featureLayer({
        url: url,
        // simplifyFactor: 0.35,
        // precision: 5,
        // minZoom: 9,
        // maxZoom: 18,
        // fields: ["FID", "ZIP", "PO_NAME"],
    }).addTo(leaflet);

    function featurePopup(feature) {
        let content = `<h3>${feature.properties.citation}</h3><p><ul>`
        for (const [key, value] of Object.entries(feature.properties)) {
            content += `<li>${key}: ${value}</li>`;
        }
        content += '</ul></p>'
        const leafFeat = modelFeatures.getFeature(feature.id)
        console.log(leafFeat)
        L.popup({
            maxHeight: 300,
            closeOnClick: true,
            keepInView: true
        }).setLatLng(leafFeat.getLatLng()).setContent(content).openOn(leaflet);
    }

    modelFeatures.on("click", function (e) {
        featurePopup(e.layer.feature);

    });

    // layer toggling
    let mixed = {
        "Models": modelFeatures,
    };

    const geoProvider = esriLeafletGeocoder.featureLayerProvider({
        url:
            "https://services1.arcgis.com/SIYkiqjmENweC50g/arcgis/rest/services/alltype_models_v1/FeatureServer/0/",
        searchFields: ["textmodel_snipped", "citation"],
        label: "Perceptual models",
        bufferRadius: 5000,
        formatSuggestion: function (feature) {
            return `${feature.properties.watershed_name} (${feature.properties.model_type}) - ${feature.properties.id}`;
        }
    });

    const addressProvider = esriLeafletGeocoder.arcgisOnlineProvider({
        apikey: ARCGIS_API_KEY,
        nearby: {
            lat: -33.8688,
            lng: 151.2093
        }
    });

    const addressSearchControl = esriLeafletGeocoder.geosearch({
        position: "bottomleft",
        placeholder: "Search for an address",
        useMapBounds: false,
        providers: [
            addressProvider,
        ]
    }).addTo(leaflet);

    const searchControl = esriLeafletGeocoder.geosearch({
        position: "topright",
        placeholder: "Search for a model",
        useMapBounds: false,
        expanded: true,
        title: "Model search",

        providers: [
            geoProvider,
        ]
    }).addTo(leaflet);

    searchControl.on("results", (data) => {

        for (let i = data.results.length - 1; i >= 0; i--) {
            console.log(data.results[i])

            // filter to only show the one selected
            // modelFeatures.setWhere(`id = ${data.results[i].properties.id}`);

            // open the popup of the existing marker
            // const id = data.results[i].properties.id;
            // const feature = modelFeatures.getFeature(id);

            // TODO: this doesn't work yet. Need to figure out how to get the feature from the layer
            const feature = data.results[i].feature;
            console.log(feature)
            if (feature) {
                featurePopup(feature);
            }
        }
    });

    // /*
    //  * LEAFLET BUTTONS
    //  */

    // Erase
    L.easyButton('fa-eraser',
        function () { clearSelection(); },
        'clear selected features').addTo(leaflet);

    // Layer Control
    L.control.layers(baselayers, mixed).addTo(leaflet);

    /*
     * LEAFLET EVENT HANDLERS
     */
    leaflet.on("click", function (e) {
        mapClick(e);
    });


    // validate the map
    validate_bbox_size()
})


/**
 * Handles the click event on the map.
 *
 * @param {MouseEvent} e - The click event object.
 * @returns {Promise<void>} - A promise that resolves when the click event is handled.
 */
async function mapClick(e) {
    return

    // exit early if not zoomed in enough.
    // this ensures that objects are not clicked until zoomed in
    let zoom = e.target.getZoom();
    if (zoom < Map.selectable_zoom) {
        return
    }


    // check if gage was clicked
    let gage = await getGageInfo(e);

    // if a gage was selected, create a pop up and exit early.
    // we don't want to toggle HUC selection if a gage was clicked
    if (Object.keys(gage).length > 0) {
        // create map info object here

        // close all popups
        if (Map.popups.length > 0) {
            Map.leaflet.closePopup();
        }

        // create new popup containing gage info
        L.popup().setLatLng([gage.y, gage.x])
            .setContent('<b>ID:</b> ' + gage.num + '<br>'
                + '<b>Name</b>: ' + gage.name + '<br>')
            //		             + '<b>Select</b>: <a onClick=traceUpstream("'+gage.num+'")>upstream</a>')
            .openOn(Map.leaflet);

        // exit function without toggling HUC
        return;
    }
}


function clearSelection() {
    // TODO: update clear selection function
    // Clears the selected features on the map

    for (let key in Map.hucbounds) {

        // clear the huc boundary list
        delete Map.hucbounds[key];

        // clear the polygon overlays
        Map.huclayers[key].clearLayers();
        delete Map.huclayers[key];

        // clear the hucs in the html template

    }

    // update the map
    updateMapBBox();


    // clear and update the HUC textbox
    // document.querySelector('.mdl-textfield').MaterialTextfield.change('');
    alertStore.displayAlert({
        title: 'Cleared',
        text: 'Your map selection was cleared',
        type: 'info',
        closable: true,
        duration: 1
    })
}


/**
* Calculates and draws the bounding box on the map.
*/
function updateMapBBox() {

    // calculate global boundary
    let xmin = 9999999;
    let ymin = 9999999;
    let xmax = -9999999;
    let ymax = -9999999;
    for (let key in Map.hucbounds) {
        let bounds = Map.hucbounds[key].getBounds();
        if (bounds.getWest() < xmin) {
            xmin = bounds.getWest();
        }
        if (bounds.getSouth() < ymin) {
            ymin = bounds.getSouth();
        }
        if (bounds.getEast() > xmax) {
            xmax = bounds.getEast();
        }
        if (bounds.getNorth() > ymax) {
            ymax = bounds.getNorth();
        }
    }

    // save the map bbox
    Map.bbox = [xmin, ymin, xmax, ymax];


    removeBbox()

    // redraw the bbox layer with new coordinates
    let coords = [[[xmin, ymin],
    [xmin, ymax],
    [xmax, ymax],
    [xmax, ymin],
    [xmin, ymin]]];
    let polygon = [{
        "type": "Polygon",
        "coordinates": coords
    }];

    // todo: add function to validate bbox and return back styling
    // check bbox area bounds
    let bbox = validate_bbox_size();

    let json_polygon = L.geoJSON(polygon, { style: bbox.style });

    // save the layer
    Map.huclayers['BBOX'] = json_polygon;


    return bbox.is_valid
}

function removeBbox() {
    // remove the bbox layer if it exists
    if ('BBOX' in Map.huclayers) {
        // remove the polygon overlay 
        Map.huclayers['BBOX'].clearLayers();
        delete Map.huclayers['BBOX'];
    }
}


/**
* Validates that size constraints for the subset bounding box
* @returns {object} - bounding box style and is_valid flag
*/
function validate_bbox_size() {

    // todo: turn the bounding box red and deactivate the submit button.
    let bbox = Map.bbox;

    let londiff = Math.abs(bbox[2] - bbox[0]);
    let latdiff = Math.abs(bbox[3] - bbox[1]);

    let sqr_deg = londiff * latdiff;


    let valid = true;
    if ((bbox.includes(99999999) || bbox.includes(-99999999))) {
        valid = false;
    }

    let style = {}
    if (sqr_deg < 4 && valid) {
        style = {
            fillColor: 'black',
            weight: 2,
            opacity: 1,
            color: 'green',
            fillOpacity: 0.01,
            lineJoin: 'round'
        };

    } else {

        style = {
            fillColor: 'black',
            weight: 2,
            opacity: 1,
            color: 'red',
            fillOpacity: 0.01,
            lineJoin: 'round'
        };
        valid = false;
    }
    mapStore.boxIsValid = valid;
    return { style: style, is_valid: valid }
}

</script>
<style scoped>
#mapContainer {
    width: 100%;
    height: 100%;
}
</style>