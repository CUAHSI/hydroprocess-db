import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { ENDPOINTS } from '@/constants'
import L from 'leaflet'
import 'leaflet-iconmaterial/dist/leaflet.icon-material'
import 'leaflet.markercluster'
import citationMatchingFileNames from '@/assets/citation_and_images_matching.json'
import { useAlertStore } from '@/stores/alerts'

export const useMapStore = defineStore('map', () => {
  const selectedSpatialZones = ref([])
  const selectedTemporalZones = ref([])
  const selectedProcesses = ref([])
  const selectedTreeItems = ref([])
  const searchTerm = ref(null)
  const userTouchedFilter = ref(false)
  const selectedFilters = ref({})
  const leaflet = shallowRef(null)
  const layerGroup = shallowRef(null)
  const drawnItems = shallowRef(null)
  const allAvailableCoordinates = shallowRef([])
  const modelFeatures = shallowRef({})
  const perceptualModelsGeojson = ref([])
  const mapLoaded = ref(false)
  const currentFilteredData = ref([])
  const activeFilters = ref([])

  const markerClusterGroup = L.markerClusterGroup({
    iconCreateFunction: (cluster) => {
      const childCount = cluster.getChildCount()
      let color = 'blue'
      if (childCount > 10) {
        color = 'red'
      }
      return L.divIcon({
        html: `
          <div style="
            background-color: ${color};
            border-radius: 50%;
            color: white;
            text-align: center;
            line-height: 40px;
            width: 40px;
            height: 40px;
            box-shadow: 0 4px 10px ${color};
          ">
            ${childCount}
          </div>`,
        className: 'custom-cluster-icon',
        iconSize: [40, 40]
      })
    }
  })

  function applyAllFilters(feature) {
    return activeFilters.value.every((fn) => fn(feature))
  }

  function onEachFeature(feature, layer) {
    let content = `<h3>Perceptual model of <strong>${feature.properties.location.long_name}</strong></h3>`
    if (feature.properties.citation.url) {
      content += '<br>'
      content += '<h4 class="d-inline-block mr-2">URL:</h4>'
      content += `<a id="ExternalURL" href="${feature.properties.citation.url}" target="_blank" class="btn btn-primary">${feature.properties.citation.url}</a>`
    }

    content += `<p>${feature.properties.citation.citation}</p>`
    content += '<hr><br>'
    content += `<h4>${feature.properties.model_type.name}</h4>`

    const props = feature.properties
    const note = 'Not open access, see article for '
    if (props.model_type.name === 'Text model') {
      if (props.citation.attribution == 'Not open-access') {
        content += note + 'text'
      } else {
        content += `<p>${feature.properties.textmodel_snipped}</p>`
      }

      if (
        ((props.textmodel_section_name && props.textmodel_section_name != 'N/A') ||
          (props.textmodel_section_number && props.textmodel_section_number != 'N/A')) &&
        props.textmodel_page_number &&
        props.textmodel_page_number != 'N/A'
      ) {
        content += `<p class="mt-1"><b>Section ${
          props.textmodel_section_number != 'N/A'
            ? props.textmodel_section_number + '</b> '
            : '</b>'
        } ${props.textmodel_section_name != 'N/A' ? props.textmodel_section_name + ' ' : ''} ${
          props.textmodel_page_number != 'N/A' ? '(Page ' + props.textmodel_page_number + ')' : ''
        }</p>`
      }
    } else {
      if (props.citation.attribution == 'Not open-access') {
        content += note + 'figure'
      } else {
        if (citationMatchingFileNames[feature.properties.citation.citation]) {
          content += `<img src="${getImagePath(
            citationMatchingFileNames[feature.properties.citation.citation]
          )}" alt="Dynamic Image">`
        } else {
          content += '<h5>No Figure</h5>'
        }
      }

      if (props.figure_caption && props.figure_caption != 'N/A') {
        content += `<p class="mt-1"><b>Figure ${
          props.figure_num != 'N/A' ? props.figure_num + ' :</b> ' : '</b>'
        } ${props.figure_caption}</p>`
      }
    }
    content += '<hr><br>'
    content += '<h4>Processes:</h4>'
    content += '<ul>'
    feature.properties.process_taxonomies.forEach((process_taxonomy) => {
      content += `<li>${process_taxonomy.process} (${process_taxonomy.identifier})</li>`
    })

    if (
      feature.properties.spatial_zone_type?.spatial_property &&
      feature.properties.spatial_zone_type.spatial_property != 'N'
    ) {
      content += '<hr><br>'
      content += '<h4>Spatial zone:</h4>'
      content += `${feature.properties.spatial_zone_type.spatial_property}`
    }

    if (
      feature.properties.temporal_zone_type?.temporal_property &&
      feature.properties.temporal_zone_type.temporal_property != 'N'
    ) {
      content += '<hr><br>'
      content += '<h4>Temporal zone:</h4>'
      content += `${feature.properties.temporal_zone_type.temporal_property}`
    }

    allAvailableCoordinates.value.push(
      adjustLatLon(feature.properties.location.lat, feature.properties.location.lon)
    )

    layer.bindPopup(content, {
      maxWidth: window.innerWidth < 600 ? 260 : 400,
      minWidth: 220,
      maxHeight: 300,
      keepInView: true,
      autoPan: true
    })

    layer.on('click', () => {
      try {
        window.heap.track('Marker Clicked', {
          MarkerLocation: feature.properties.location.long_name
        })
      } catch (e) {
        console.warn('Heap is not available.')
      }
    })
  }

  const pointToLayer = (feature, latlng) => {
    if (feature.properties.model_type.name === 'Text model') {
      return L.marker(latlng, { icon: textIcon })
    }
    return L.marker(latlng, { icon: figureIcon })
  }

  let textIcon = L.IconMaterial.icon({
    icon: 'article',
    iconColor: 'white',
    markerColor: 'grey',
    outlineColor: 'black',
    outlineWidth: 1,
    iconSize: [31, 42]
  })

  let figureIcon = L.IconMaterial.icon({
    icon: 'water_drop',
    iconColor: 'white',
    markerColor: 'blue',
    outlineColor: 'white',
    outlineWidth: 1,
    iconSize: [31, 42]
  })

  const fetchPerceptualModelsGeojson = async () => {
    const alertStore = useAlertStore()
    try {
      const response = await fetch(ENDPOINTS.perceptual_models_geojson)
      if (!response.ok) throw new Error('Failed to fetch GeoJSON')
      const geojson = await response.json()
      perceptualModelsGeojson.value = geojson
      currentFilteredData.value = geojson.features
      modelFeatures.value = L.geoJSON(geojson, {
        onEachFeature,
        pointToLayer
      })
      markerClusterGroup.addLayer(modelFeatures.value)
      layerGroup.value.addLayer(markerClusterGroup)
    } catch (error) {
      console.error('Error fetching GeoJSON:', error)
      alertStore.displayAlert({
        title: 'Error Loading Map Data',
        text: 'We were unable to load the map data. Please try again later.',
        type: 'error',
        closable: true,
        duration: 5
      })
    }
  }

  function filterFeatures(filterFunction, action = 'add', filterType = 'generic') {
    if (filterType === 'modelFilter') {
      activeFilters.value = activeFilters.value.filter((fn) => fn.filterType !== 'modelFilter')
    } else if (filterType === 'rectangle') {
      activeFilters.value = activeFilters.value.filter((fn) => fn.filterType !== 'rectangle')
    }

    if (action === 'add' && filterFunction) {
      filterFunction.filterType = filterType
      activeFilters.value.push(filterFunction)
    } else if (action === 'remove') {
      const index = activeFilters.value.indexOf(filterFunction)
      if (index > -1) activeFilters.value.splice(index, 1)
    } else if (action === 'clear') {
      activeFilters.value = []
    }

    currentFilteredData.value = []
    allAvailableCoordinates.value = []

    layerGroup.value.clearLayers()
    markerClusterGroup.clearLayers()

    modelFeatures.value = L.geoJSON(perceptualModelsGeojson.value, {
      filter: (feature) => {
        const include = applyAllFilters(feature)
        if (include) {
          currentFilteredData.value.push(feature)
          allAvailableCoordinates.value.push(
            adjustLatLon(feature.properties.location.lat, feature.properties.location.lon)
          )
        }
        return include
      },
      onEachFeature,
      pointToLayer
    })

    markerClusterGroup.addLayer(modelFeatures.value)
    layerGroup.value.addLayer(markerClusterGroup)
  }

  function resetFilter() {
    currentFilteredData.value = []
    allAvailableCoordinates.value = []

    layerGroup.value.clearLayers()
    markerClusterGroup.clearLayers()

    modelFeatures.value = L.geoJSON(perceptualModelsGeojson.value, {
      filter: (feature) => {
        const include = applyAllFilters(feature)
        if (include) {
          currentFilteredData.value.push(feature)
          allAvailableCoordinates.value.push(
            adjustLatLon(feature.properties.location.lat, feature.properties.location.lon)
          )
        }
        return include
      },
      onEachFeature,
      pointToLayer
    })

    markerClusterGroup.addLayer(modelFeatures.value)
    layerGroup.value.addLayer(markerClusterGroup)

    if (activeFilters.value.length === 0) {
      perceptualModelsGeojson.value.features.forEach((feature) => {
        allAvailableCoordinates.value.push(
          adjustLatLon(feature.properties.location.lat, feature.properties.location.lon)
        )
      })
    }
  }

  function clearAllFilters() {
    selectedProcesses.value = []
    selectedSpatialZones.value = []
    selectedTemporalZones.value = []
    selectedTreeItems.value = []
    searchTerm.value = null
    userTouchedFilter.value = false
    selectedFilters.value = {}

    const rectangleFilter = activeFilters.value.find((fn) => fn.filterType === 'rectangle')
    activeFilters.value = rectangleFilter ? [rectangleFilter] : []

    resetFilter()
  }

  function adjustLatLon(lat, lon) {
    return [lat < 0 ? lat - 10 : lat + 10, lon < 0 ? lon - 10 : lon + 10]
  }

  function getImagePath(filename) {
    return new URL(`../assets/figure_model_images/${filename}`, import.meta.url).href
  }

  return {
    leaflet,
    modelFeatures,
    layerGroup,
    drawnItems,
    mapLoaded,
    fetchPerceptualModelsGeojson,
    filterFeatures,
    resetFilter,
    clearAllFilters,
    currentFilteredData,
    allAvailableCoordinates,
    selectedSpatialZones,
    selectedTemporalZones,
    selectedProcesses,
    selectedTreeItems,
    searchTerm,
    userTouchedFilter,
    selectedFilters,
    activeFilters
  }
})
