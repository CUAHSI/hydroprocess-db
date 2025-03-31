<template>
  <v-overlay :model-value="!mapStore.mapLoaded" class="align-center justify-center">
    <v-progress-circular indeterminate :size="128"></v-progress-circular>
  </v-overlay>
  <v-container v-if="!mdAndDown" fluid>
    <v-row fill-height style="height: 87vh">
      <v-btn
        @click="toggleFilterDrawer"
        color="secondary"
        location="left"
        style="z-index: 9999"
        :style="{ transform: translateFilter(), position: 'absolute' }"
        :icon="showFilterDrawer ? mdiChevronLeft : mdiChevronRight"
        size="x-small"
      >
      </v-btn>
      <v-btn
        @click="toggleDataDrawer"
        color="secondary"
        location="right"
        style="z-index: 9999"
        :style="{ transform: translateData(), position: 'absolute' }"
        :icon="showDataDrawer ? mdiChevronRight : mdiChevronLeft"
        size="x-small"
      >
      </v-btn>
      <v-col v-if="showFilterDrawer" :cols="3">
        <FilterDrawer @onFilter="onFilter" />
      </v-col>
      <v-divider vertical></v-divider>
      <v-col :cols="getCols">
        <TheLeafletMap />
      </v-col>
      <v-divider vertical></v-divider>
      <v-col v-if="showDataDrawer" cols="2">
        <DataViewDrawer ref="dataDrawerRef" />
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row style="height: 40vh">
      <TheLeafletMap />
    </v-row>
    <v-row style="height: 50vh">
      <v-col>
        <FilterDrawer @onFilter="onFilter" />
      </v-col>
      <v-col>
        <DataViewDrawer ref="dataDrawerRef" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import FilterDrawer from '@/components/FilterDrawer.vue'
import DataViewDrawer from '@/components/DataViewDrawer.vue'
import TheLeafletMap from '@/components/TheLeafletMap.vue'
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js'
import { useMapStore } from '@/stores/map'
import { useDisplay } from 'vuetify'

const { mdAndDown } = useDisplay()
const mapStore = useMapStore()

const showFilterDrawer = ref(true)
const showDataDrawer = ref(true)
const dataDrawerRef = ref(null)

const onFilter = (data) => {
  const filters = {
    spatialzone_ids: data.selectedSpatialZones.value,
    temporalzone_ids: data.selectedTemporalZones.value,
    process_taxonomy_ids: data.selectedProcesses.value
  }

  // Update counts with filtered features if provided
  if (data.filteredFeatures) {
    dataDrawerRef.value.updateCounts(data.filteredFeatures)
  } 
  // Call query only if no filtered features and no filters are applied (initial state)
  else if (
    !data.searchTerm?.value &&
    data.selectedSpatialZones.value.length === 0 &&
    data.selectedTemporalZones.value.length === 0 &&
    data.selectedProcesses.value.length === 0
  ) {
    dataDrawerRef.value.query(filters)
  }
}

const toggleFilterDrawer = async () => {
  const center = mapStore.leaflet.getCenter()
  showFilterDrawer.value = !showFilterDrawer.value
  await nextTick()
  mapStore.leaflet.invalidateSize(true)
  mapStore.leaflet.setView(center)
}

const toggleDataDrawer = async () => {
  // get the center of the map before the drawer is toggled
  const center = mapStore.leaflet.getCenter()
  showDataDrawer.value = !showDataDrawer.value
  await nextTick()
  mapStore.leaflet.invalidateSize(true)
  // set the center of the map after the drawer is toggled
  mapStore.leaflet.setView(center)
}

const getCols = computed(() => {
  // if all drawers are open, the map should take up 7 columns
  let cols = 12
  if (showFilterDrawer.value) {
    cols -= 3
  }
  if (showDataDrawer.value) {
    cols -= 2
  }
  return cols
})

const translateFilter = () => {
  if (showFilterDrawer.value) {
    return 'translate(24vw, 0)'
  } else {
    return 'translate(0, 0)'
  }
}

const translateData = () => {
  if (showDataDrawer.value) {
    return 'translate(-16vw, 0)'
  } else {
    return 'translate(0, 0)'
  }
}
</script>

<style scoped></style>
