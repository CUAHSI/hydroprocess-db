<template>
  <v-sheet class="mx-auto" elevation="8">
    <v-card>
      <v-card-title>Model Type Counts</v-card-title>
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                Model Type
              </th>
              <th class="text-left">
                Count
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- modelTypeCounds is an object -->
            <tr v-for="(count, modelType) in modelTypeCounts" :key="modelType">
              <td>{{ modelType }}</td>
              <td>{{ count }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>Total Perceptual Models</v-card-title>
      <v-card-text>
        <p>{{ totalModels }}</p>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue'
import { ENDPOINTS } from '../constants';

let querying = ref(true)

let modelTypeCounts = ref({})
let totalModels = ref(0)

const query = async (filters = {}) => {
  querying.value = true
  const response = await fetch(ENDPOINTS.model_type_count, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(filters)
  });
  const counts = await response.json()

  // Delete the 'Figure model (Hand-drawn)' key
  delete counts['Figure model (Hand-drawn)']

  modelTypeCounts.value = counts
  totalModels.value = Object.values(counts).reduce((acc, count) => acc + count, 0)
  querying.value = false
}

defineExpose({
  query
})

query()

</script>

<style scoped>
#chart {
  height: 40vh;
}

.v-navigation-drawer--mini-variant,
.v-navigation-drawer {
  overflow: visible !important;
}
</style>
