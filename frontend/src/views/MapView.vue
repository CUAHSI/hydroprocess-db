<template>
  <v-overlay :model-value="!mapStore.mapLoaded" class="d-flex align-center justify-center">
    <v-progress-circular indeterminate :size="128" />
  </v-overlay>

  <v-container fluid class="pa-0 fill-height position-relative">
    <!-- Filter Drawer -->
    <div
      v-if="showFilterDrawer"
      ref="filterDrawerRef"
      class="filter-drawer-overlay"
      :class="{ 'drawer-overlay-absolute': mdAndDown }"
    >
      <FilterDrawer @onFilter="onFilter" />
    </div>

    <!-- Filter Drawer Toggle Button -->
    <v-btn
      @click="toggleFilterDrawer"
      color="secondary"
      :icon="showFilterDrawer ? mdiChevronLeft : mdiChevronRight"
      size="small"
      class="filter-toggle-btn"
      :style="mdAndDown ? {} : { left: showFilterDrawer ? 'var(--drawer-width)' : '8px' }"
    />

    <!-- Map & Drawers -->
    <v-row class="fill-height ma-0">
      <v-col class="map-container pa-0">
        <TheLeafletMap />

        <!-- Info Button: only on medium and down -->
        <div class="bottom-right-container d-flex flex-column align-end ga-2">
          <!-- Info icon: only on small/medium screens -->
          <v-btn
            v-if="mdAndDown"
            @click="toggleDataDrawer"
            color="secondary"
            :icon="mdiInformationOutline"
            size="small"
          />

          <!-- Data Drawer: always visible on large, toggled on smaller -->
          <div v-if="showDataDrawer || !mdAndDown" class="data-drawer">
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
const showDataDrawer = ref(true)
const dataDrawerRef = ref(null)

onMounted(() => {
  showFilterDrawer.value = true
  showDataDrawer.value = !mdAndDown.value
})

watch(mdAndDown, (val) => {
  showDataDrawer.value = !val // if on large screen, show by default
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
  --drawer-width: 24vw;
  --drawer-min-width: 220px;
  --drawer-max-width: 360px;
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
}

@media (min-width: 960px) {
  .filter-drawer-overlay {
    position: relative;
    width: var(--drawer-width);
    min-width: var(--drawer-min-width);
    max-width: var(--drawer-max-width);
  }
}

.filter-toggle-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1001;
  transition: left 0.3s ease;
}

.bottom-right-container {
  position: absolute;
  bottom: 16px;
  right: 16px;
  z-index: 1001;

  display: flex !important; /* 🛠 force apply */
  flex-direction: column-reverse !important; /* 🛠 critical for order */
  align-items: flex-end;
  gap: 12px;
}

.data-drawer {
  max-width: 90vw;
  width: 100%;
}

.info-icon {
  flex-shrink: 0; /* prevent icon from resizing or being pushed */
}
</style>
