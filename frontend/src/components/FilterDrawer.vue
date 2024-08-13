<template>
  <v-navigation-drawer location="left" width="auto" :model-value="show" @update:modelValue="$emit('toggle')">
    <v-btn @click="show = !show" color="primary" location="right" order="0" postition="absolute"
      :style="{ bottom: '30%', transform: translate(), position: 'absolute' }"
      :icon="show ? mdiChevronLeft : mdiChevronRight">
    </v-btn>
    <v-sheet class="mx-auto" elevation="8" :width="mdAndDown ? '100vw' : '20vw'">
      <h3 class="ma-2 text-center">Model Filters</h3>
      <v-divider></v-divider>
      <!-- Filter by process name -->
      <v-autocomplete v-model="selectedProcess" :items="process_taxonomies" item-title="process" item-value="id"
        label="Process Taxonomy" @update:modelValue="filterProcess" clearable chips multiple></v-autocomplete>
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
const selectedProcess = ref(null)

perceptualModelStore.fetchProcessTaxonomies().then((pt) => {
  process_taxonomies.value = pt
})


const translate = () => {
  if (show.value) {
    return 'translate(50%, 0)'
  } else {
    return 'translate(150%, 0)'
  }
}

const filterProcess = () => {
  console.log("filtering with ", selectedProcess.value)
  const filterFunction = (feature) => {
    // feature.properties.process_taxonomies is an array of objects, each contains an id
    // filter for the matching id
    // selectedProcess.value is an array of ids
    // we want all of the features that have a process_taxonomy id that is in selectedProcess.value
    return feature.properties.process_taxonomies.some((pt) => selectedProcess.value.includes(pt.id))
  }
  mapStore.filterFeatures(filterFunction)
}
</script>

<style scoped>
.drawer-handle {
  position: absolute;
  bottom: 30%;
  left: 110%;
}
</style>