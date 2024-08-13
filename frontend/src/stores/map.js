import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ENDPOINTS } from '@/constants'
import L from 'leaflet'

export const useMapStore = defineStore('map', () => {
  const leaflet = ref(null)
  const layerGroup = ref(null)
  const modelFeatures = ref({})
  const perceptualModelsGeojson = ref([])

  function onEachFeature(feature, layer) {
    let content = `<h3>${feature.properties.citation.citation}</h3><p><ul>`
    for (const [key, value] of Object.entries(feature.properties)) {
      content += `<li>${key}: ${value}</li>`
    }
    content += '</ul></p>'
    layer.bindPopup(content)
  }

  const fetchPerceptualModelsGeojson = async () => {
    const response = await fetch(ENDPOINTS.perceptual_models_geojson)
    const geojson = await response.json()
    perceptualModelsGeojson.value = geojson
    modelFeatures.value = L.geoJSON(geojson, {
      onEachFeature: (feature, layer) => {
        onEachFeature(feature, layer)
      }
    })
    layerGroup.value.addLayer(modelFeatures.value)
  }

  function filterFeatures(filterFunction) {
    // TODO enable multiple filters at the same time
    // first remove all layers
    layerGroup.value.removeLayer(modelFeatures.value)
    // filter features
    modelFeatures.value = L.geoJSON(perceptualModelsGeojson.value, {
      filter: (feature) => {
        return filterFunction(feature)
      },
      onEachFeature: (feature, layer) => {
        onEachFeature(feature, layer)
      }
    })
    // add filtered features
    layerGroup.value.addLayer(modelFeatures.value)
  }

  function resetFilter() {
    layerGroup.value.removeLayer(modelFeatures.value)
    modelFeatures.value = L.geoJSON(perceptualModelsGeojson.value, {
      onEachFeature: (feature, layer) => {
        onEachFeature(feature, layer)
      }
    })
    layerGroup.value.addLayer(modelFeatures.value)
  }

  return {
    leaflet,
    modelFeatures,
    layerGroup,
    fetchPerceptualModelsGeojson,
    filterFeatures,
    resetFilter
  }
})
