<template>
    <v-overlay :model-value="!mapStore.mapLoaded" class="align-center justify-center">
        <v-progress-circular indeterminate :size="128"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!mdAndDown" fluid>
        <v-row fill-height style="height: 87vh">
            <v-btn @click="toggleFilterDrawer" color="secondary" location="left" style="z-index: 9999"
                :style="{ transform: translateFilter(), position: 'absolute' }"
                :icon="showFilterDrawer ? mdiChevronLeft : mdiChevronRight" size="x-small">
            </v-btn>
            <v-btn @click="toggleDataDrawer" color="secondary" location="right" style="z-index: 9999"
                :style="{ transform: translateData(), position: 'absolute' }"
                :icon="showDataDrawer ? mdiChevronRight : mdiChevronLeft" size="x-small">
            </v-btn>
            <v-col v-if="showFilterDrawer" :cols="3">
                <v-btn @click="downloadMapData()" class="w-100">Download Filtered Map Data</v-btn>
                <FilterDrawer @onFilter="onFilter"/>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col :cols="getCols">
                <TheLeafletMap />
            </v-col>
            <v-divider vertical></v-divider>
            <v-col v-if="showDataDrawer" cols="2">
                <DataViewDrawer ref="dataDrawerRef"/>
            </v-col>
        </v-row>
    </v-container>
    <v-container v-else>
        <v-row style="height: 40vh">
            <TheLeafletMap />
        </v-row>
        <v-row style="height: 50vh">
            <v-col>
                <FilterDrawer />
            </v-col>
            <v-col>
                <DataViewDrawer />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import FilterDrawer from '@/components/FilterDrawer.vue';
import DataViewDrawer from '@/components/DataViewDrawer.vue';
import TheLeafletMap from '@/components/TheLeafletMap.vue';
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js'
import { useMapStore } from '@/stores/map';
import { useDisplay } from 'vuetify';
import Papa from 'papaparse';

const { mdAndDown } = useDisplay()
const mapStore = useMapStore()

const showFilterDrawer = ref(true)
const showDataDrawer = ref(true)
const dataDrawerRef = ref(null)
const ignoreColumnInCSV = [  'Type', 'Id', 'Location Id', 'Spatialzone Id', 'Temporalzone Id', 'Three D Info',  'Process Taxonomies Identifier', 'Model Type Id', 'Process Taxonomies Process Level',  'Process Taxonomies Function Id', 'Process Taxonomies Id', 'Process Taxonomies Process Alt Name Id',  'Spatial Zone Type Id', 'Temporal Zone Type Id', 'Location Lon', 'Location Name',  'Location Lat', 'Location Pt','process_taxonomies_identifier','process_taxonomies_process_level','process_taxonomies_function_id','process_taxonomies_id','process_taxonomies_process_alt_name_id']

const renameColumnInCSV = {
"figure num": "Figure Number",
"citation citation": "Citation",
"location long name": "Location Name",
"location area km2": "Location Area [km^2]",
"process taxonomies process": "Taxonomy Processes",
"geol info": "Geological Info",
"topo info": "Topographic Info",
"num spatial zones": "Number of Spatial Zones",
"spatial zone type spatial property": "Spatial Zone Type",
"num temporal zones": "Number of Temporal Zones",
"temporal zone type temporal property": "Temporal Zone Type",
"model type name": "Model Type",
}

const onFilter = (data) => {
    const filters = {
        spatialzone_ids: data.selectedSpatialZones.value,
        temporalzone_ids: data.selectedTemporalZones.value,
        process_taxonomy_ids: data.selectedProcesses.value,
    }
    dataDrawerRef.value.query(filters)
}

const toggleFilterDrawer = async () => {
    const center = mapStore.leaflet.getCenter()
    showFilterDrawer.value = !showFilterDrawer.value
    await nextTick()
    mapStore.leaflet.invalidateSize(true)
    mapStore.leaflet.setView(center)
}

const toggleDataDrawer = async () => {
    // get the center of the map before the drawer is toggled
    const center = mapStore.leaflet.getCenter()
    showDataDrawer.value = !showDataDrawer.value
    await nextTick()
    mapStore.leaflet.invalidateSize(true)
    // set the center of the map after the drawer is toggled
    mapStore.leaflet.setView(center)
}

const getCols = computed(() => {
    // if all drawers are open, the map should take up 7 columns
    let cols = 12
    if (showFilterDrawer.value) {
        cols -= 3
    }
    if (showDataDrawer.value) {
        cols -= 2
    }
    return cols
})

const translateFilter = () => {
    if (showFilterDrawer.value) {
        return 'translate(24vw, 0)'
    } else {
        return 'translate(0, 0)'
    }
}

const translateData = () => {
    if (showDataDrawer.value) {
        return 'translate(-16vw, 0)'
    } else {
        return 'translate(0, 0)'
    }
}

function flattenItem(obj, parentKey = '', result = {}) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            let newKey = parentKey ? `${parentKey} ${key}` : key;

            // Convert column names as per requirement
            newKey = renamecsvColumn(newKey);

            // Ignore columns as per requirement
            if (ignoreColumnInCSV.includes(newKey)) {
                continue;
            }

            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                // Recursive call for nested objects
                flattenItem(obj[key], newKey, result);
            } else if (Array.isArray(obj[key])) {
                if (obj[key].every(item => typeof item === 'string' || typeof item === 'number')) {
                    result[newKey] = obj[key].join(', ');
                } else {
                    const arrayValues = {};
                    obj[key].forEach(item => {
                        for (const subKey in item) {
                            // Ignore columns as per requirement
                            if (ignoreColumnInCSV.includes(`${key}_${subKey}`)) {
                                continue;
                            }
                            if (Object.prototype.hasOwnProperty.call(item, subKey)) {
                                if (!arrayValues[subKey]) {
                                    arrayValues[subKey] = [];
                                }
                                arrayValues[subKey].push(item[subKey]);
                            }
                        }
                    });
                    for (const arrayKey in arrayValues) {
                        result[renamecsvColumn(`${newKey} ${arrayKey}`)] = arrayValues[arrayKey].join(', ');
                    }
                }
            } else {
                // Assign values directly
                result[newKey] = obj[key];
            }
        }
    }
    return result;
}

function flattenJSON(data) {
    const result = [];
      data.forEach(item => {
        // As per requirement only include properties, not geometry
        result.push(flattenItem(item.properties));
      });
    return result;
}

const downloadMapData = () => {
    const jsonData = mapStore.currentFilteredData;
    const flattenedData = flattenJSON(jsonData);

    const csv = Papa.unparse(flattenedData, {});

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const renamecsvColumn = (name) => {
    let newName = name.replaceAll("_", " ");
    newName = newName.replace(/\b\w/g, char => char.toLowerCase());
    if (renameColumnInCSV[newName]) {
        newName = renameColumnInCSV[newName];
    } else {
        newName = newName.replace(/\b\w/g, char => char.toUpperCase());
    }
    return newName;
}


</script>

<style scoped></style>