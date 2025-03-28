<template>
  <v-btn block @click="downloadMapData">Download Map Data</v-btn>
</template>

<script setup>
import {
  useMapStore,
  selectedSpatialZones,
  selectedTemporalZones,
  selectedProcesses,
  searchTerm
} from '@/stores/map'
import Papa from 'papaparse'

const mapStore = useMapStore()
const renameColumnInCSV = {
  'figure num': 'Figure Number',
  'figure caption': 'Figure Caption',
  'figure url': 'Figure Url',
  'textmodel section number': 'Textmodel Section Number',
  'textmodel section name': 'Textmodel Section Name',
  'textmodel page number': 'Textmodel Page Number',
  'textmodel snipped': 'Textmodel Snippet',
  'citation citation': 'Citation',
  'citation url': 'Citation Url',
  'citation attribution': 'Citation Attribution',
  'citation attribution url': 'Citation Attribution Url',
  'location long name': 'Location Name',
  'location country': 'Location Country',
  'location area km2': 'Location Area [km^2]',
  'process taxonomies process': 'Taxonomy Processes',
  'vegetation info': 'Vegetation Info',
  'soil info': 'Soil Info',
  'geol info': 'Geological Info',
  'topo info': 'Topographic Info',
  'uncertainty info': 'Uncertainty Info',
  'other info': 'Other Info',
  'num spatial zones': 'Number of Spatial Zones',
  'spatial zone type spatial property': 'Spatial Zone Type',
  'num temporal zones': 'Number of Temporal Zones',
  'temporal zone type temporal property': 'Temporal Zone Type',
  'model type name': 'Model Type'
}
const csvColumns = Object.values(renameColumnInCSV)

function flattenItem(obj, parentKey = '', result = {}) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      let newKey = parentKey ? `${parentKey} ${key}` : key

      // Convert column names as per requirement
      newKey = renamecsvColumn(newKey)

      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        // Recursive call for nested objects
        flattenItem(obj[key], newKey, result)
      } else if (Array.isArray(obj[key])) {
        if (obj[key].every((item) => typeof item === 'string' || typeof item === 'number')) {
          result[newKey] = obj[key].join(', ')
        } else {
          const arrayValues = {}
          obj[key].forEach((item) => {
            for (const subKey in item) {
              if (Object.prototype.hasOwnProperty.call(item, subKey)) {
                if (!arrayValues[subKey]) {
                  arrayValues[subKey] = []
                }
                arrayValues[subKey].push(item[subKey])
              }
            }
          })

          for (const arrayKey in arrayValues) {
            const renamedValue = renamecsvColumn(`${newKey} ${arrayKey}`)
            if (csvColumns.includes(renamedValue))
              result[renamedValue] = arrayValues[arrayKey].join(', ')
          }
        }
      } else {
        if (csvColumns.includes(newKey)) {
          if (newKey === 'Textmodel Snippet' && obj.citation.attribution == 'Not open-access') {
            result[newKey] = 'N/A'
          } else {
            result[newKey] = obj[key]
          }
        }
      }
    }
  }
  return result
}

function flattenMapDataJSON(data) {
  const result = []
  data.forEach((item) => {
    // As per requirement only include properties, no need of geometry info
    result.push(flattenItem(item.properties))
  })
  return result
}

function downloadMapData() {
  if (typeof window !== 'undefined' && window.heap) {
    window.heap.track('Download', {
      downloadItem: 'Map',
      selectedSpatialZones: selectedSpatialZones.value.join(', '),
      selectedTemporalZones: selectedTemporalZones.value.join(', '),
      selectedProcesses: selectedProcesses.value.join(', '),
      searchTerm: searchTerm.value
    })
  } else {
    console.warn('Heap is not available.')
  }
  const mapData = mapStore.currentFilteredData
  const flattenedMapData = flattenMapDataJSON(mapData)

  const csv = Papa.unparse(flattenedMapData, {
    columns: csvColumns
  })

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })

  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', 'data.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
function renamecsvColumn(name) {
  let newName = name.replaceAll('_', ' ')
  newName = newName.replace(/\b\w/g, (char) => char.toLowerCase())
  if (renameColumnInCSV[newName]) {
    newName = renameColumnInCSV[newName]
  }
  return newName
}
</script>
