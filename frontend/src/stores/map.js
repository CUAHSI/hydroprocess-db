import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { ENDPOINTS } from '@/constants'
import L from 'leaflet'
import 'leaflet-iconmaterial/dist/leaflet.icon-material'
import 'leaflet.markercluster'
import citationMatchingFileNames from '@/assets/citation_and_images_matching.json'

export const useMapStore = defineStore('map', () => {
  const selectedSpatialZones = ref([])
  const selectedTemporalZones = ref([])
  const selectedProcesses = ref([])
  const searchTerm = ref(null)
  const userTouchedFilter = ref(false)
  const selectedFilters = ref({})
  const leaflet = shallowRef(null)
  const layerGroup = shallowRef(null)
  const allAvailableCoordinates = shallowRef([])
  const modelFeatures = shallowRef({})
  const perceptualModelsGeojson = ref([])
  const mapLoaded = ref(false)
  let currentFilteredData = ref([])
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
      maxWidth: 400,
      maxHeight: 300,
      keepInView: true
    })
    currentFilteredData.value.push(feature)

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
    icon: 'article', // Name of Material icon
    iconColor: 'white', // Material icon color (could be rgba, hex, html name...)
    markerColor: 'grey', // Marker fill color
    outlineColor: 'black', // Marker outline color
    outlineWidth: 1, // Marker outline width
    iconSize: [31, 42] // Width and height of the icon
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
    const response = await fetch(ENDPOINTS.perceptual_models_geojson)
    const geojson = await response.json()
    perceptualModelsGeojson.value = geojson
    modelFeatures.value = L.geoJSON(geojson, {
      onEachFeature: (feature, layer) => {
        onEachFeature(feature, layer)
      },
      pointToLayer: pointToLayer
    })
    markerClusterGroup.addLayer(modelFeatures.value) // Add features to the cluster group
    layerGroup.value.addLayer(markerClusterGroup)
  }

  function filterFeatures(filterFunction) {
    currentFilteredData.value = []
    // TODO enable multiple filters at the same time
    // first remove all layers
    layerGroup.value.clearLayers()
    markerClusterGroup.clearLayers()

    // Filter features
    modelFeatures.value = L.geoJSON(perceptualModelsGeojson.value, {
      filter: (feature) => {
        const include = filterFunction(feature)
        if (include) {
          currentFilteredData.value.push(feature)
        }
        return include
      },
      onEachFeature: (feature, layer) => {
        onEachFeature(feature, layer)
      },
      pointToLayer: pointToLayer
    })
    markerClusterGroup.addLayer(modelFeatures.value)
    layerGroup.value.addLayer(markerClusterGroup)
  }
  function resetFilter() {
    layerGroup.value.removeLayer(modelFeatures.value)
    markerClusterGroup.clearLayers()

    modelFeatures.value = L.geoJSON(perceptualModelsGeojson.value, {
      onEachFeature: (feature, layer) => {
        onEachFeature(feature, layer)
      }
    })
    markerClusterGroup.addLayer(modelFeatures.value)
    layerGroup.value.addLayer(markerClusterGroup)
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
    mapLoaded,
    fetchPerceptualModelsGeojson,
    filterFeatures,
    resetFilter,
    currentFilteredData,
    allAvailableCoordinates,
    selectedSpatialZones,
    selectedTemporalZones,
    selectedProcesses,
    searchTerm,
    userTouchedFilter,
    selectedFilters
  }
})
