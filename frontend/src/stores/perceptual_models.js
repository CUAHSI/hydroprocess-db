import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ENDPOINTS } from '@/constants'

export const usePerceptualModelStore = defineStore('perceptual_model', () => {
  const perceptualModels = ref([])
  const perceptualModelsGeojson = ref([])
  const selectedPerceptualModel = ref(null)

  const setPerceptualModels = (models) => {
    perceptualModels.value = models
  }

  const setSelectedPerceptualModel = (model) => {
    selectedPerceptualModel.value = model
  }

  const fetchPerceptualModels = async () => {
    const response = await fetch(ENDPOINTS.perceptual_models)
    const data = await response.json()
    setPerceptualModels(data)
    return data
  }

  const fetchPerceptualModelsGeojson = async () => {
    const response = await fetch(ENDPOINTS.perceptual_models_geojson)
    const data = await response.json()
    perceptualModelsGeojson.value = data
    return data
  }

  return {
    perceptualModels,
    selectedPerceptualModel,
    setPerceptualModels,
    setSelectedPerceptualModel,
    fetchPerceptualModels,
    fetchPerceptualModelsGeojson
  }
})
