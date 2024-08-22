<template>
  <v-btn @click="show = !show" color="primary" location="right" order="0" postition="absolute"
    :style="{ bottom: '30%', transform: translate(), position: 'absolute' }"
    :icon="show ? mdiChevronLeft : mdiChevronRight">
  </v-btn>
  <v-sheet class="mx-auto" elevation="8">
    <h3 class="text-h6 ma-2 text-center">Model Filters</h3>
    <v-divider></v-divider>
    <v-autocomplete v-model="selectedProcesses" :items="process_taxonomies" item-title="process" item-value="id"
      label="Process Taxonomies" @update:modelValue="filter" clearable chips multiple
      :loading="filtering"></v-autocomplete>
    <v-autocomplete v-model="selectedSpatialZones" :items="spatialZones" item-title="spatial_property" item-value="id"
      label="Spatial Zones" @update:modelValue="filter" clearable chips multiple :loading="filtering"></v-autocomplete>
    <v-autocomplete v-model="selectedTemporalZones" :items="temporalZones" item-title="temporal_property"
      item-value="id" label="Temporal Zones" @update:modelValue="filter" clearable chips multiple
      :loading="filtering"></v-autocomplete>
    <v-card order="1">
      <v-card-title>Search Text Within:</v-card-title>
      <v-card-text>
        <v-btn-toggle v-model="textSearchFields" @update:modelValue="filter" class="mb-2" multiple outlined
          variant="text" divided>
          <v-btn value="long_name">Name</v-btn>
          <v-btn value="citation">Citation</v-btn>
          <v-btn value="textmodel_snipped">Abstract</v-btn>
        </v-btn-toggle>
        <v-text-field v-show="hasTextSearchFields" @update:focused="filter" @keydown.enter.prevent="filter"
          @click:clear="filter" v-model="searchTerm" label="Search" clearable></v-text-field>
      </v-card-text>
      <v-progress-linear v-if="filtering" indeterminate color="primary"></v-progress-linear>
    </v-card>
  </v-sheet>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js'
import { usePerceptualModelStore } from "@/stores/perceptual_models";
import { useMapStore } from '@/stores/map';

const perceptualModelStore = usePerceptualModelStore();
const mapStore = useMapStore()

const show = ref(true)
defineEmits(['selectModel', 'toggle'])

let modelFeatures = ref({})
const filtering = ref()

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
const searchTerm = ref(null)
const textSearchFields = ref([])

const hasTextSearchFields = computed(() => {
  return textSearchFields.value.length > 0
})

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

const checkSearchTerm = (searchTerm, fieldsToSearch, feature) => {
  if (!searchTerm) {
    return true
  }
  return fieldsToSearch.some(field => {
    const long_name = field === 'long_name' ? feature.properties.location?.long_name.toLowerCase().includes(searchTerm.toLowerCase()) : false
    const citation = field === 'citation' ? feature.properties.citation?.citation.toLowerCase().includes(searchTerm.toLowerCase()) : false
    const textmodel_snipped = field === 'textmodel_snipped' ? feature.properties.textmodel_snipped.toLowerCase().includes(searchTerm.toLowerCase()) : false
    return long_name || citation || textmodel_snipped
  })
}


async function filter() {
  filtering.value = true
  await nextTick()
  // reset search term if no text search fields are selected
  if (textSearchFields.value.length === 0) {
    searchTerm.value = null
  }
  const filterFunction = (feature) => {
    const process = selectedProcesses.value.length == 0 || feature.properties.process_taxonomies.some((pt) => selectedProcesses.value.includes(pt.id))
    const spatial = selectedSpatialZones.value.length == 0 || selectedSpatialZones.value.includes(feature.properties.spatialzone_id)
    const temporal = selectedTemporalZones.value.length == 0 || selectedTemporalZones.value.includes(feature.properties.temporalzone_id)
    const search = checkSearchTerm(searchTerm.value, textSearchFields.value, feature)

    return process && spatial && temporal && search
  }
  mapStore.filterFeatures(filterFunction)
  filtering.value = false
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