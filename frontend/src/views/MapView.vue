<template>
  <v-overlay :model-value="!mapStore.mapLoaded" class="d-flex align-center justify-center">
    <v-progress-circular indeterminate :size="128" />
  </v-overlay>

  <v-container fluid class="pa-0 fill-height position-relative">
    <SearchBar @onSearch="onSearch" />

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
import SearchBar from '@/components/SearchBar.vue'
import { mdiChevronRight, mdiChevronLeft, mdiInformationOutline } from '@mdi/js'
import { useMapStore } from '@/stores/map'
import { useDisplay } from 'vuetify'

const { mdAndDown } = useDisplay()
const mapStore = useMapStore()

const showFilterDrawer = ref(true)
const dataDrawerRef = ref(null)
const showDataDrawer = ref(!mdAndDown.value)

watch(mdAndDown, (val) => {
  showFilterDrawer.value = !val
  showDataDrawer.value = !val
})

onMounted(() => {
  showFilterDrawer.value = !mdAndDown.value
})

const onFilter = (data) => {
  const filters = {
    spatialzone_ids: data.selectedSpatialZones?.length || 0,
    temporalzone_ids: data.selectedTemporalZones?.length || 0,
    process_taxonomy_ids: data.selectedProcesses?.length || 0
  }

  if (data.filteredFeatures) {
    dataDrawerRef.value.updateCounts(data.filteredFeatures)
  } else if (
    !mapStore.searchTerm &&
    (data.selectedSpatialZones?.length || 0) === 0 &&
    (data.selectedTemporalZones?.length || 0) === 0 &&
    (data.selectedProcesses?.length || 0) === 0
  ) {
    dataDrawerRef.value.query(filters)
  }
}

const onSearch = (data) => {
  if (data.filteredFeatures) {
    dataDrawerRef.value.updateCounts(data.filteredFeatures)
  }
}

const toggleFilterDrawer = async () => {
  const center = mapStore.leaflet?.getCenter()
  showFilterDrawer.value = !showFilterDrawer.value
  await nextTick()
  if (mapStore.leaflet) {
    mapStore.leaflet.invalidateSize(true)
    mapStore.leaflet.setView(center)
  }
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
  bottom: 0;
  left: 0;
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

.filter-toggle-btn-inside {
  position: absolute;
  bottom: 30%;
  right: 0px;
  transform: translateY(-30%);
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
