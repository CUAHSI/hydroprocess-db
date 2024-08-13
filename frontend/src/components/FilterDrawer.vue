<template>
  <v-navigation-drawer location="left" width="auto" :model-value="show" @update:modelValue="$emit('toggle')">
    <v-btn @click="show = !show" color="primary" location="right" order="0" postition="absolute"
      :style="{ bottom: '30%', transform: translate(), position: 'absolute' }"
      :icon="show ? mdiChevronLeft : mdiChevronRight">
    </v-btn>
    <v-sheet class="mx-auto" elevation="8" :width="mdAndDown ? '100vw' : '20vw'">
      <h3 class="ma-2 text-center">Model Filters</h3>
      <v-divider></v-divider>
      <v-autocomplete v-model="selectedProcesses" :items="process_taxonomies" item-title="process" item-value="id"
        label="Process Taxonomies" @update:modelValue="filter" clearable chips multiple></v-autocomplete>
      <v-autocomplete v-model="selectedSpatialZones" :items="spatialZones" item-title="spatial_property" item-value="id"
        label="Spatial Zones" @update:modelValue="filter" clearable chips multiple></v-autocomplete>
      <v-autocomplete v-model="selectedTemporalZones" :items="temporalZones" item-title="temporal_property"
        item-value="id" label="Temporal Zones" @update:modelValue="filter" clearable chips multiple></v-autocomplete>
    </v-sheet>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js'
import { usePerceptualModelStore } from "@/stores/perceptual_models";
import { useMapStore } from '@/stores/map';

const perceptualModelStore = usePerceptualModelStore();
const mapStore = useMapStore()

const show = ref(true)
defineEmits(['selectModel', 'toggle'])
const { mdAndDown } = useDisplay()

let modelFeatures = ref({})

// query the api for the features
perceptualModelStore.fetchPerceptualModels().then((perceptual_models) => {
  modelFeatures.value = perceptual_models
})

const process_taxonomies = ref([])
const selectedProcesses = ref([])
const spatialZones = ref([])
const selectedSpatialZones = ref([])
const temporalZones = ref([])
const selectedTemporalZones = ref([])

// Fetch the process taxonomies, spatial zones, and temporal zones
perceptualModelStore.fetchProcessTaxonomies().then((pt) => {
  process_taxonomies.value = pt
})
perceptualModelStore.fetchSpatialZones().then((sz) => {
  spatialZones.value = sz
})
perceptualModelStore.fetchTemporalZones().then((tz) => {
  temporalZones.value = tz
})


const filter = () => {
  const filterFunction = (feature) => {
    const process = selectedProcesses.value.length == 0 || feature.properties.process_taxonomies.some((pt) => selectedProcesses.value.includes(pt.id))
    const spatial = selectedSpatialZones.value.length == 0 || selectedSpatialZones.value.includes(feature.properties.spatialzone_id)
    const temporal = selectedTemporalZones.value.length == 0 || selectedTemporalZones.value.includes(feature.properties.temporalzone_id)
    return process && spatial && temporal
  }
  mapStore.filterFeatures(filterFunction)
}


const translate = () => {
  if (show.value) {
    return 'translate(50%, 0)'
  } else {
    return 'translate(150%, 0)'
  }
}
</script>

<style scoped>
.drawer-handle {
  position: absolute;
  bottom: 30%;
  left: 110%;
}
</style>