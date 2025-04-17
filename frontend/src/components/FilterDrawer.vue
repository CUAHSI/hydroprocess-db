<template>
  <v-text-field
    @update:focused="debouncedFilter"
    @keydown.enter.prevent="debouncedFilter"
    @click:clear="debouncedFilter"
    v-model="searchTerm"
    label="Search Data..."
    clearable
    hide-details
  >
    <template #append-inner>
      <v-icon @click="debouncedFilter" class="cursor-pointer" :icon="mdiMagnify" />
    </template>
  </v-text-field>
  <v-sheet class="mx-auto" elevation="8">
    <v-progress-linear v-if="filtering" indeterminate color="primary"></v-progress-linear>
    <h3 class="text-h6 ma-2 text-center">Filter Map</h3>
    <v-divider></v-divider>
    <!-- <v-autocomplete v-model="selectedProcesses" :items="process_taxonomies" item-title="process" item-value="id"
      label="Process Taxonomies" @update:modelValue="filter" clearable chips multiple
      :loading="filtering"></v-autocomplete> -->
    <v-expansion-panels class="mx-0 mb-4" eager>
      <v-expansion-panel class="px-0 py-0" style="max-height: 400px; overflow-y: auto">
        <v-expansion-panel-title>Process Taxonomies</v-expansion-panel-title>
        <v-expansion-panel-text class="pa-0">
          <v-text-field
            v-model="searchTreeText"
            label="Search Process Taxonomies"
            :clear-icon="mdiCloseCircleOutline"
            clearable
            dark
            flat
            hide-details
            solo-inverted
          >
          </v-text-field>
          <v-treeview
            v-if="filteredTreeData.length > 0"
            v-model:selected="selectedTreeItems"
            :items="treeViewData"
            select-strategy="classic"
            item-value="id"
            selectable
            :search="searchTreeText"
            activatable
            @update:modelValue="updateMap"
          >
            <template v-slot:prepend="{ isOpen }">
              <v-icon>
                {{ isOpen ? mdiFolderOpen : mdiFolder }}
              </v-icon>
            </template>
          </v-treeview>
          <p v-else class="text-center text-grey-darken-1">No process taxonomies found</p>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-autocomplete
      v-model="selectedSpatialZones"
      :items="spatialZones"
      item-title="spatial_property"
      item-value="id"
      label="Spatial Zones"
      @update:modelValue="filter"
      clearable
      chips
      multiple
      :loading="filtering"
    ></v-autocomplete>
    <v-autocomplete
      v-model="selectedTemporalZones"
      :items="temporalZones"
      item-title="temporal_property"
      item-value="id"
      label="Temporal Zones"
      @update:modelValue="filter"
      clearable
      chips
      multiple
      :loading="filtering"
    ></v-autocomplete>
  </v-sheet>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePerceptualModelStore } from '@/stores/perceptual_models'
import { useMapStore } from '@/stores/map'
import { mdiFolderOpen, mdiFolder, mdiCloseCircleOutline, mdiMagnify } from '@mdi/js'

const perceptualModelStore = usePerceptualModelStore()
const mapStore = useMapStore()

const {
  currentFilteredData,
  selectedSpatialZones,
  selectedTemporalZones,
  selectedProcesses,
  searchTerm,
  userTouchedFilter,
  selectedFilters
} = storeToRefs(mapStore)

const emit = defineEmits(['selectModel', 'toggle', 'onFilter'])

const filtering = ref()

// query the api for the features
perceptualModelStore.fetchPerceptualModels().then((perceptual_models) => {
  mapStore.modelFeatures = perceptual_models
})

const process_taxonomies = ref([])
const spatialZones = ref([])
const temporalZones = ref([])
const textSearchFields = ref([
  'long_name',
  'citation',
  'textmodel_snipped',
  'processes_taxonomies',
  'temporal_property',
  'spatial_property'
])
const treeViewData = ref([])
const selectedTreeItems = ref([])
const searchTreeText = ref('')
const debouncedSearchTreeText = ref('')
const debounceTimeout = ref(null)

// Fetch the process taxonomies, spatial zones, and temporal zones
perceptualModelStore.fetchProcessTaxonomies().then((pt) => {
  process_taxonomies.value = pt
  treeViewData.value = buildTree(pt)
})
const processTaxonomiesMap = ref(new Map())
const spatialZonesMap = ref(new Map())
const temporalZonesMap = ref(new Map())

function buildTree(data) {
  const root = {}

  // Helper function to insert item into the correct place in the tree
  const insert = (path, item) => {
    let current = root
    path.forEach((part, index) => {
      // Check if part already exists as a child, if not create it
      if (!current[part]) {
        current[part] = {
          title: part,
          id: index === path.length - 1 ? item.id : `id${part}${index}`,
          children: {}
        }
      }
      // If it's the last part, assign the item values to the node
      if (index === path.length - 1) {
        current[part] = {
          id: item.id,
          title: item.process,
          children: current[part].children || {}
        }
      }
      current = current[part].children
    })
  }

  // Insert each item in data into the tree
  data.forEach((item) => {
    const path = item.identifier.split('.')
    insert(path, item)
  })

  // Convert tree object with nested children into desired array format
  const convertToArray = (node) => {
    return Object.values(node).map((child) => {
      const childrenArray = convertToArray(child.children)
      const nodeObject = {
        id: child.id,
        title: child.title
      }
      if (childrenArray.length > 0) {
        nodeObject.children = childrenArray
      }
      return nodeObject
    })
  }

  return convertToArray(root)
}

// Fetch the process taxonomies, spatial zones, and temporal zones
perceptualModelStore.fetchProcessTaxonomies().then((pt) => {
  process_taxonomies.value = pt
  treeViewData.value = buildTree(pt)
  processTaxonomiesMap.value = new Map(pt.map((item) => [item.id, item.identifier]))
})

perceptualModelStore.fetchSpatialZones().then((sz) => {
  replaceNwithNone(sz, 'spatial_property')
  spatialZones.value = sz
  spatialZonesMap.value = new Map(sz.map((item) => [item.id, item.spatial_property]))
})
perceptualModelStore.fetchTemporalZones().then((tz) => {
  replaceNwithNone(tz, 'temporal_property')
  temporalZones.value = tz
  temporalZonesMap.value = new Map(tz.map((item) => [item.id, item.temporal_property]))
})

const replaceNwithNone = (items, propName) => {
  for (let item of items) {
    if (item[propName] === 'N') {
      item[propName] = 'None'
      break
    }
  }
  return items
}

const checkSearchTerm = (searchTerm, fieldsToSearch, feature) => {
  if (!searchTerm) {
    return true
  }
  return fieldsToSearch.some((field) => {
    const long_name =
      field === 'long_name'
        ? feature.properties.location?.long_name.toLowerCase().includes(searchTerm.toLowerCase())
        : false
    const citation =
      field === 'citation'
        ? feature.properties.citation?.citation.toLowerCase().includes(searchTerm.toLowerCase())
        : false
    const textmodel_snipped =
      field === 'textmodel_snipped'
        ? feature.properties.textmodel_snipped.toLowerCase().includes(searchTerm.toLowerCase())
        : false
    return long_name || citation || textmodel_snipped
  })
}

const logIdentifiers = async () => {
  const selectedIdentifiers = {
    selectedProcesses: '',
    selectedSpatialZones: '',
    selectedTemporalZones: ''
  }

  const collectIdentifiersAsString = async (ids, map, category) => {
    const identifiers = []
    for (let id of ids) {
      const selectedItem = map.get(id)
      if (selectedItem) {
        identifiers.push(selectedItem)
      } else {
        console.log(`${category} not found for ID:`, id)
      }
    }
    selectedIdentifiers[category] = identifiers.join('|') // Join as a string
  }
  selectedIdentifiers['searchTerm'] = searchTerm.value
  // Collect identifiers for all categories as strings
  await collectIdentifiersAsString(
    selectedProcesses.value,
    processTaxonomiesMap.value,
    'selectedProcesses'
  )
  await collectIdentifiersAsString(
    selectedSpatialZones.value,
    spatialZonesMap.value,
    'selectedSpatialZones'
  )
  await collectIdentifiersAsString(
    selectedTemporalZones.value,
    temporalZonesMap.value,
    'selectedTemporalZones'
  )

  try {
    if (selectedIdentifiers.selectedProcesses) {
      window.heap.track('selectedProcesses', {
        processes: selectedIdentifiers.selectedProcesses
      })
    }
    if (selectedIdentifiers.selectedSpatialZones) {
      window.heap.track('selectedSpatialZones', {
        spatialZones: selectedIdentifiers.selectedSpatialZones
      })
    }
    if (selectedIdentifiers.selectedTemporalZones) {
      window.heap.track('selectedTemporalZones', {
        temporalZones: selectedIdentifiers.selectedTemporalZones
      })
    }
    if (selectedIdentifiers.searchTerm) {
      window.heap.track('Search', {
        textSearched: selectedIdentifiers.searchTerm
      })
    }
  } catch (e) {
    console.warn('Heap is not available.')
  }
  selectedFilters.value = selectedIdentifiers
}

async function filter() {
  filtering.value = true
  userTouchedFilter.value = true
  if (textSearchFields.value.length === 0) {
    searchTerm.value = null
  }
  const filterFunction = (feature) => {
    const process =
      selectedProcesses.value.length == 0 ||
      feature.properties.process_taxonomies.some((pt) => selectedProcesses.value.includes(pt.id))
    const spatial =
      selectedSpatialZones.value.length == 0 ||
      selectedSpatialZones.value.includes(feature.properties.spatialzone_id)
    const temporal =
      selectedTemporalZones.value.length == 0 ||
      selectedTemporalZones.value.includes(feature.properties.temporalzone_id)
    const search = checkSearchTerm(searchTerm.value, textSearchFields.value, feature)
    return process && spatial && temporal && search
  }
  mapStore.filterFeatures(filterFunction)
  const filteredFeatures = currentFilteredData.value
  emit('onFilter', {
    selectedSpatialZones,
    selectedTemporalZones,
    selectedProcesses,
    searchTerm,
    filteredFeatures
  })
  logIdentifiers()
  filtering.value = false
}

const updateMap = async () => {
  selectedProcesses.value = []
  selectedTreeItems.value.forEach((item) => {
    selectedProcesses.value.push(item)
  })
  filter()
}
const debouncedFilter = () => {
  clearTimeout(debounceTimeout.value)
  debounceTimeout.value = setTimeout(() => {
    filter()
  }, 300)
}
const filteredTreeData = computed(() => {
  if (!searchTreeText.value || !treeViewData.value.length) {
    return treeViewData.value
  }

  const searchLower = searchTreeText.value.toLowerCase()
  const hasMatchingItems = (items) => {
    return items.some((item) => {
      const matchesTitle = item.title.toLowerCase().includes(searchLower)
      const matchesChildren = item.children?.length ? hasMatchingItems(item.children) : false
      return matchesTitle || matchesChildren
    })
  }

  return hasMatchingItems(treeViewData.value) ? treeViewData.value : []
})

const debounceSearch = (query) => {
  clearTimeout(debounceTimeout.value)
  debounceTimeout.value = setTimeout(() => {
    debouncedSearchTreeText.value = query
  }, 300)
}

watch(
  () => searchTreeText.value,
  (newQuery) => {
    debounceSearch(newQuery)
  }
)
</script>

<style scoped>
.drawer-handle {
  position: absolute;
  bottom: 30%;
  left: 110%;
}

:deep(.v-expansion-panel-text__wrapper) {
  padding: 0 !important;
}
</style>
