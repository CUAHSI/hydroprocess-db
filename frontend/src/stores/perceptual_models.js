import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ENDPOINTS } from '@/constants'

export const usePerceptualModelStore = defineStore('perceptual_model', () => {
  const perceptualModels = ref([])
  const processTaxonomies = ref([])
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

  const fetchProcessTaxonomies = async () => {
    const response = await fetch(ENDPOINTS.process_taxonomies)
    const process_taxonomies = await response.json()
    processTaxonomies.value = process_taxonomies
    return process_taxonomies
  }

  const fetchSpatialZones = async () => {
    const response = await fetch(ENDPOINTS.spatial_zones)
    const spatial_zones = await response.json()
    return spatial_zones
  }

  return {
    perceptualModels,
    selectedPerceptualModel,
    setPerceptualModels,
    setSelectedPerceptualModel,
    fetchPerceptualModels,
    fetchProcessTaxonomies,
    fetchSpatialZones
  }
})
