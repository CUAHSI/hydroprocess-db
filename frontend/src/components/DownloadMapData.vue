<template>
    <v-btn block @click="downloadMapData">Download Map Data</v-btn>
</template>

<script setup>
import { useMapStore } from '@/stores/map';
import Papa from 'papaparse';

const mapStore = useMapStore()
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
    "textmodel snipped": "Textmodel Snippet"
}
const csvColumns = ['Figure Number', 'Figure Caption', 'Fgure Url', 'Textmodel Section Number', 'Textmodel Section Name', 'Textmodel Page Number', 'Textmodel Snippet', 'Citation', 'Citation Url', 'Citation Attribution', 'Citation Attribution Url', 'Location Name', 'Location Country', 'Location Area [km^2]', 'Taxonomy Processes', 'Vegetation Info', 'Soil Info', 'Geological Info', 'Topographic Info', 'Uncertainty Info', 'Other Info', 'Number of Spatial Zones', 'Spatial Zone Type', 'Number of Temporal Zones', 'Temporal Zone Type', 'Model Type']

function flattenItem(obj, parentKey = '', result = {}) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            let newKey = parentKey ? `${parentKey} ${key}` : key;

            // Convert column names as per requirement
            newKey = renamecsvColumn(newKey);

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
                            if (Object.prototype.hasOwnProperty.call(item, subKey)) {
                                if (!arrayValues[subKey]) {
                                    arrayValues[subKey] = [];
                                }
                                arrayValues[subKey].push(item[subKey]);
                            }
                        }
                    });

                    for (const arrayKey in arrayValues) {
                        const renamedValue = renamecsvColumn(`${newKey} ${arrayKey}`);
                        if (csvColumns.includes(renamedValue))
                            result[renamedValue] = arrayValues[arrayKey].join(', ');
                    }
                }
            } else {
                if (csvColumns.includes(newKey))
                    result[newKey] = obj[key];
            }
        }
    }
    return result;
}

function flattenMapDataJSON(data) {
    const result = [];
    data.forEach(item => {
        // As per requirement only include properties, no need of geometry info
        result.push(flattenItem(item.properties));
    });
    return result;
}

function downloadMapData() {
    const mapData = mapStore.currentFilteredData;
    const flattenedMapData = flattenMapDataJSON(mapData);

    const csv = Papa.unparse(flattenedMapData, {
        columns: csvColumns
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function renamecsvColumn(name) {
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