<template>
  <v-navigation-drawer location="left" width="auto" :model-value="show" temporary @update:modelValue="$emit('toggle')">
    <v-btn @click="show = !show" color="primary" location="right" order="0" postition="absolute"
      :style="{ bottom: '30%', transform: translate(), position: 'absolute' }"
      :icon="show ? mdiChevronLeft : mdiChevronRight">
    </v-btn>
    <v-sheet class="mx-auto" elevation="8" :width="mdAndDown ? '100vw' : '20vw'">
      <h3 class="ma-2 text-center">Filter</h3>
      <v-btn @click="filter">filter</v-btn>
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

const translate = () => {
  if (show.value) {
    return 'translate(50%, 0)'
  } else {
    return 'translate(150%, 0)'
  }
}

const filter = () => {
  mapStore.filterFeatures()
}
</script>

<style scoped>
.drawer-handle {
  position: absolute;
  bottom: 30%;
  left: 110%;
}
</style>