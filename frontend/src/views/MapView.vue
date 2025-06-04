<template>
  <v-overlay :model-value="!mapStore.mapLoaded" class="align-center justify-center">
    <v-progress-circular indeterminate :size="128" />
  </v-overlay>

  <v-container v-if="!mdAndDown" fluid>
    <v-row no-gutters style="position: relative">
      <div
        v-if="showFilterDrawer"
        ref="filterDrawerRef"
        :style="{
          minWidth: `${drawerWidth}px`,
          height: '100%',
          position: 'relative',
          zIndex: 1
        }"
      >
        <FilterDrawer @onFilter="onFilter" />
      </div>
      <v-btn
        @click="toggleFilterDrawer"
        color="secondary"
        :icon="showFilterDrawer ? mdiChevronLeft : mdiChevronRight"
        size="small"
        :style="{
          position: 'absolute',
          top: '50%',
          left: `${showFilterDrawer ? drawerWidth : 10}px`,
          transform: 'translate(-50%, -50%)',
          zIndex: 9999
        }"
      />
      <v-col :style="{ height: '80vh', position: 'relative' }">
        <TheLeafletMap />
        <div style="position: absolute; bottom: 24px; right: 24px; z-index: 1000; max-width: 320px">
          <DataViewDrawer ref="dataDrawerRef" />
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-else fluid>
    <v-row style="height: 90vh; position: relative">
      <TheLeafletMap />
      <v-btn
        @click="toggleFilterDrawer"
        color="secondary"
        :icon="showFilterDrawer ? mdiChevronLeft : mdiChevronRight"
        size="small"
        :style="{
          position: 'absolute',
          left: `${showFilterDrawer ? drawerWidth : 10}px`,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1001
        }"
      />

      <v-btn
        @click="toggleDataDrawer"
        color="secondary"
        :icon="mdiInformationOutline"
        size="small"
        style="position: absolute; right: 8px; bottom: 72px; z-index: 1001"
      >
      </v-btn>

      <div
        v-if="showFilterDrawer"
        :style="{
          position: 'absolute',
          top: '0',
          left: '0',
          minWidth: `${drawerWidth}px`,
          height: '100%',
          background: 'white',
          zIndex: 1000,
          overflowY: 'auto'
        }"
      >
        <FilterDrawer @onFilter="onFilter" />
      </div>

      <div
        v-show="showDataDrawer"
        style="position: absolute; bottom: 120px; right: 8px; z-index: 1000; max-width: 320px"
      >
        <DataViewDrawer ref="dataDrawerRef" />
      </div>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import FilterDrawer from '@/components/FilterDrawer.vue'
import DataViewDrawer from '@/components/DataViewDrawer.vue'
import TheLeafletMap from '@/components/TheLeafletMap.vue'
import { mdiChevronRight, mdiChevronLeft, mdiInformationOutline } from '@mdi/js'
import { useMapStore } from '@/stores/map'
import { useDisplay } from 'vuetify'

const { mdAndDown } = useDisplay()
const mapStore = useMapStore()

const showFilterDrawer = ref(true)
const showDataDrawer = ref(true)
const dataDrawerRef = ref(null)

const drawerWidth = 350

onMounted(() => {
  showFilterDrawer.value = !mdAndDown.value
  showDataDrawer.value = !mdAndDown.value
})

const onFilter = (data) => {
  const filters = {
    spatialzone_ids: data.selectedSpatialZones.value,
    temporalzone_ids: data.selectedTemporalZones.value,
    process_taxonomy_ids: data.selectedProcesses.value
  }

  if (data.filteredFeatures) {
    dataDrawerRef.value.updateCounts(data.filteredFeatures)
  } else if (
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

const toggleDataDrawer = () => {
  showDataDrawer.value = !showDataDrawer.value
}
</script>

<style scoped></style>
