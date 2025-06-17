<template>
  <div class="search-bar-container">
    <v-text-field
      @update:focused="debouncedFilter"
      @keydown.enter.prevent="debouncedFilter"
      @click:clear="debouncedFilter"
      v-model="searchTerm"
      label="Search Data..."
      clearable
      hide-details
      class="search-bar"
    >
      <!-- <template #append-inner>
                  <v-icon @click="debouncedFilter" class="cursor-pointer" :icon="mdiMagnify" />
              </template> -->
    </v-text-field>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useMapStore } from '@/stores/map'
// import { mdiMagnify } from '@mdi/js'
import { storeToRefs } from 'pinia'

const mapStore = useMapStore()
const { searchTerm } = storeToRefs(mapStore) // Use storeToRefs to ensure reactivity
const debounceTimeout = ref(null)
const textSearchFields = ref(['long_name', 'citation', 'textmodel_snipped'])

const emit = defineEmits(['onSearch'])

const checkSearchTerm = (searchTermValue, fieldsToSearch, feature) => {
  if (!searchTermValue) {
    return true
  }
  return fieldsToSearch.some((field) => {
    const long_name =
      field === 'long_name'
        ? feature.properties.location?.long_name
            ?.toLowerCase()
            ?.includes(searchTermValue.toLowerCase())
        : false
    const citation =
      field === 'citation'
        ? feature.properties.citation?.citation
            ?.toLowerCase()
            ?.includes(searchTermValue.toLowerCase())
        : false
    const textmodel_snipped =
      field === 'textmodel_snipped'
        ? feature.properties.textmodel_snipped
            ?.toLowerCase()
            ?.includes(searchTermValue.toLowerCase())
        : false
    return long_name || citation || textmodel_snipped
  })
}

const debouncedFilter = () => {
  clearTimeout(debounceTimeout.value)
  debounceTimeout.value = setTimeout(() => {
    const filterFunction = (feature) => {
      const process =
        (mapStore.selectedProcesses.length || 0) === 0 ||
        feature.properties.process_taxonomies?.some((pt) =>
          mapStore.selectedProcesses.includes(pt.id)
        )
      const spatial =
        (mapStore.selectedSpatialZones.length || 0) === 0 ||
        mapStore.selectedSpatialZones.includes(feature.properties.spatialzone_id)
      const temporal =
        (mapStore.selectedTemporalZones.length || 0) === 0 ||
        mapStore.selectedTemporalZones.includes(feature.properties.temporalzone_id)
      const search = checkSearchTerm(searchTerm.value, textSearchFields.value, feature)
      return process && spatial && temporal && search
    }
    mapStore.filterFeatures(filterFunction)
    emit('onSearch', {
      searchTerm: searchTerm.value,
      filteredFeatures: mapStore.currentFilteredData
    })
  }, 300)
}

// Watch searchTerm.value to trigger filtering on change
watch(
  () => searchTerm.value,
  () => {
    debouncedFilter()
  }
)
</script>

<style scoped>
.search-bar-container {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1002;
  width: 100%;
  max-width: 300px;
}

.search-bar {
  background-color: white;
  border-radius: 4px;
  border: 2px solid black;
}

@media (max-width: 600px) {
  .search-bar-container {
    max-width: 200px;
  }
}
</style>
