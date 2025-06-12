<template>
  <v-sheet class="model-summary rounded-xl" elevation="8">
    <v-card class="rounded-xl">
      <v-card-text class="pa-4">
        <div class="summary-row header">
          <span>Model Type</span>
          <span>Count</span>
        </div>
        <div v-for="(count, modelType) in modelTypeCounts" :key="modelType" class="summary-row">
          <span>{{ modelType }}</span>
          <span>{{ count }}</span>
        </div>
        <div class="summary-row total">
          <strong>Total</strong>
          <strong>{{ totalModels }}</strong>
        </div>

        <div class="download-wrapper mt-2">
          <DownloadMapData />
        </div>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map'
import { ENDPOINTS } from '../constants'
import DownloadMapData from '@/components/DownloadMapData.vue'

const mapStore = useMapStore()
const { currentFilteredData } = storeToRefs(mapStore)

let querying = ref(true)
let modelTypeCounts = ref({})
let totalModels = ref(0)

const query = async (filters = {}) => {
  querying.value = true
  try {
    const response = await fetch(ENDPOINTS.model_type_count, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filters)
    })
    if (!response.ok) throw new Error('Failed to fetch model type counts')
    const counts = await response.json()

    delete counts['Figure model (Hand-drawn)']
    let total = 0
    const cleanedCounts = {}

    for (const [key, value] of Object.entries(counts)) {
      const cleanedKey = key.replace(' model', '')
      cleanedCounts[cleanedKey] = value
      total += value
    }

    totalModels.value = total
    modelTypeCounts.value = cleanedCounts
  } catch (error) {
    console.error('Error fetching model type counts:', error)
  } finally {
    querying.value = false
  }
}

const updateCounts = (filteredFeatures) => {
  querying.value = true
  const counts = {}
  if (Array.isArray(filteredFeatures) && filteredFeatures.length > 0) {
    filteredFeatures.forEach((feature) => {
      const modelType = feature.properties?.model_type?.name.replace(' model', '')
      if (modelType && modelType !== 'Figure (Hand-drawn)') {
        counts[modelType] = (counts[modelType] || 0) + 1
      }
    })
  }
  modelTypeCounts.value = counts
  totalModels.value = Object.values(counts).reduce((acc, count) => acc + count, 0) || 0
  querying.value = false
}

watch(currentFilteredData, (newData) => {
  updateCounts(newData)
})

// Handle onFilter event from parent component
defineExpose({
  query,
  updateCounts,
  onFilter: (data) => {
    updateCounts(data.filteredFeatures)
  }
})

query()
</script>

<style scoped>
#chart {
  height: 20vh;
}

.v-navigation-drawer--mini-variant,
.v-navigation-drawer {
  overflow: visible !important;
}

.model-summary {
  border: 1.5px solid #444;
  max-width: 300px;
  background-color: #f9f7f2;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 4px;
  font-size: 14px;
}

.summary-row.header {
  font-weight: 600;
  border-bottom: 1.4px solid #444;
}

.summary-row.total {
  border-top: 1.4px solid #444;
  margin-top: 4px;
  font-weight: bold;
}

.download-wrapper {
  display: flex;
  justify-content: center;
  padding-top: 8px;
}
</style>
