<template>
  <v-navigation-drawer v-if="!querying" location="right" width="auto" v-model="show" order="1">
    <v-container>
      <v-btn @click="show = !show" color="primary" location="left" order="0" postition="absolute"
        :style="{ bottom: '30%', transform: translate(), position: 'absolute' }"
        :icon="show ? mdiChevronRight : mdiChevronLeft">
      </v-btn>
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
    </v-container>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js'
import { ENDPOINTS } from '../constants';

let show = ref(true)

const translate = () => {
  if (show.value) {
    return 'translate(-50%, 0)'
  } else {
    return 'translate(-140%, 0)'
  }
}

let querying = ref(true)

let modelTypeCounts = ref({})
let totalModels = ref(0)

const query = async () => {
  querying.value = true
  const response = await fetch(ENDPOINTS.model_type_count)
  const counts = await response.json()
  modelTypeCounts.value = counts
  totalModels.value = Object.values(counts).reduce((acc, count) => acc + count, 0)
  querying.value = false
}

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
