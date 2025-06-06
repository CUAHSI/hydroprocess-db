<template>
  <v-overlay :model-value="!mapStore.mapLoaded" class="d-flex align-center justify-center">
    <v-progress-circular indeterminate :size="128" />
  </v-overlay>

  <v-container fluid class="pa-0 fill-height position-relative">
    <div
      v-show="showFilterDrawer"
      ref="filterDrawerRef"
      class="filter-drawer-overlay pa-2"
      :class="{ 'drawer-overlay-absolute': mdAndDown }"
    >
      <FilterDrawer @onFilter="onFilter" />
      <v-btn
        @click="toggleFilterDrawer"
        color="secondary"
        :icon="mdiChevronLeft"
        size="small"
        class="filter-toggle-btn-inside"
      />
    </div>

    <v-btn
      v-show="!showFilterDrawer"
      @click="toggleFilterDrawer"
      color="secondary"
      :icon="mdiChevronRight"
      size="small"
      class="filter-toggle-btn-outside"
    />

    <v-row class="fill-height ma-0">
      <v-col class="map-container pa-0">
        <TheLeafletMap />

        <div class="bottom-right-container d-flex flex-column align-end ga-2">
          <v-btn
            v-if="mdAndDown"
            @click="toggleDataDrawer"
            color="secondary"
            :icon="mdiInformationOutline"
            size="small"
          />

          <div v-show="!mdAndDown || showDataDrawer" class="data-drawer">
            <DataViewDrawer ref="dataDrawerRef" />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, nextTick, onMounted, watch } from 'vue'
import FilterDrawer from '@/components/FilterDrawer.vue'
import DataViewDrawer from '@/components/DataViewDrawer.vue'
import TheLeafletMap from '@/components/TheLeafletMap.vue'
import { mdiChevronRight, mdiChevronLeft, mdiInformationOutline } from '@mdi/js'
import { useMapStore } from '@/stores/map'
import { useDisplay } from 'vuetify'

const { mdAndDown } = useDisplay()
const mapStore = useMapStore()

const showFilterDrawer = ref(true)
const dataDrawerRef = ref(null)
const showDataDrawer = ref(!mdAndDown.value)

watch(mdAndDown, (val) => {
  showFilterDrawer.value = !val ? true : false
  showDataDrawer.value = !val
})

onMounted(() => {
  showFilterDrawer.value = !mdAndDown.value
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

<style scoped>
:root {
  --drawer-width: 25vw;
  --drawer-min-width: 100%;
  --drawer-max-width: 420px;
}

.map-container {
  height: 100%;
  position: relative;
}

.filter-drawer-overlay {
  top: 0;
  left: 0;
  height: 100%;
  background-color: white;
  z-index: 1000;
  overflow-y: auto;
  transition: transform 0.3s ease;
}

.drawer-overlay-absolute {
  position: absolute;
  width: 100vw;
  max-width: none;
  z-index: 1001;
}

@media (min-width: 960px) {
  .filter-drawer-overlay {
    position: relative;
    /* width: 25%; */
    min-width: 25%;
    max-width: var(--drawer-max-width);
  }
}

.filter-toggle-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1001;
  transition: transform 0.3s ease;
}

.bottom-right-container {
  position: absolute;
  bottom: 16px;
  right: 16px;
  z-index: 1001;
  display: flex !important;
  flex-direction: column-reverse !important;
  align-items: flex-end;
  gap: 12px;
}

.data-drawer {
  max-width: 90vw;
  width: 100%;
}

.info-icon {
  flex-shrink: 0;
}

.filter-toggle-btn-inside {
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
  z-index: 1002;
  transition: right 0.3s ease;
}

.filter-toggle-btn-outside {
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  z-index: 1002;
}
</style>
