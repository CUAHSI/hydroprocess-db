import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMapStore = defineStore('map', () => {
  const mapObject = ref(new Map())
  const modelFeatures = ref({})

  function filterFeatures() {
    console.log('filtering features')
    mapObject.value.layerGroup.removeLayer(modelFeatures.value)
  }

  return {
    mapObject,
    filterFeatures,
    modelFeatures
  }
})
