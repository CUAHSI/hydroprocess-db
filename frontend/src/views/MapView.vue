<template>
  <v-overlay :model-value="!mapStore.mapLoaded" class="d-flex align-center justify-center">
    <v-progress-circular indeterminate :size="128" />
  </v-overlay>

  <v-container fluid class="pa-0 fill-height position-relative overflow-hidden">
    <SearchBar @onSearch="onSearch" />

    <!-- Floating Filter Drawer -->
    <transition name="slide-x">
      <div
        v-if="showFilterDrawer"
        ref="filterDrawerRef"
        class="filter-drawer-floating pa-2"
        :class="{ 'drawer-floating-absolute': mdAndDown }"
      >
        <FilterDrawer @onFilter="onFilter" />
        <v-btn
          @click="toggleFilterDrawer"
          icon
          size="small"
          class="filter-toggle-btn-inside"
          color="secondary"
        >
          <v-icon>{{ mdiChevronLeft }}</v-icon>
        </v-btn>
      </div>
    </transition>

    <!-- Floating open button -->
    <v-btn
      v-show="!showFilterDrawer"
      @click="toggleFilterDrawer"
      icon
      size="small"
      class="filter-toggle-btn-outside"
      color="secondary"
    >
      <v-icon>{{ mdiChevronRight }}</v-icon>
    </v-btn>

    <!-- Map + Data Drawer -->
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
.map-container {
  height: 100%;
  position: relative;
}

.filter-drawer-floating {
  position: fixed;
  left: 16px;
  width: 90vw;
  max-width: 420px;
  max-height: 300px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  z-index: 1100;

  transition: all 0.3s ease;
}

.drawer-floating-absolute {
  width: 90vw;
  left: 16px;
  max-width: 420px;
  height: auto;
  border-radius: 10px;
}

.filter-toggle-btn-inside {
  position: absolute;
  top: 40%;
  right: -13px;
  z-index: 1200;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.filter-toggle-btn-outside {
  position: fixed;
  left: 10px;
  z-index: 1200;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  background-color: white;
}

.bottom-right-container {
  position: absolute;
  bottom: 16px;
  right: 16px;
  z-index: 1001;
}

.data-drawer {
  max-width: 90vw;
  width: 100%;
}

@media (max-width: 960px) {
  .filter-drawer-floating {
    width: 90vw;
    left: 5vw;
  }
}
</style>
