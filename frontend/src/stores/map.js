import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ENDPOINTS } from '@/constants'
import L from 'leaflet'
import 'leaflet-iconmaterial/dist/leaflet.icon-material'

export const useMapStore = defineStore('map', () => {
  const leaflet = ref(null)
  const layerGroup = ref(null)
  const modelFeatures = ref({})
  const perceptualModelsGeojson = ref([])
  const mapLoaded = ref(false)

  function onEachFeature(feature, layer) {
    let content = `<h3>Perceptual model of <strong>${feature.properties.location.long_name}</strong></h3>`

    if(feature.properties.citation.url) {
      content += '<br>'
      content += '<h4 class="d-inline-block mr-2">URL:</h4>'
      content += `<a href="${feature.properties.citation.url}" target="_blank" class="btn btn-primary">${feature.properties.citation.url}</a>`
    }

    content += `<p>${feature.properties.citation.citation}</p>`
    content += '<hr><br>'
    content += `<h4>${feature.properties.model_type.name}</h4>`


    const props = feature.properties;

    if (props.model_type.name === 'Text model') {
      let sectionInfo = '';
      if(props.textmodel_section_name && props.textmodel_section_name != "N/A"){
        sectionInfo = `<h5>Section ${props.textmodel_section_number != "N/A" ? (props.textmodel_section_number + ',') : ''} ${props.textmodel_page_number != "N/A" ? ("pg " + props.textmodel_page_number) : ''} - ${props.textmodel_section_name}</h5>`
      }

      if(props.citation.attribution == "Open-access"){
        content += `<p>${feature.properties.textmodel_snipped}</p>`
        content += sectionInfo
      }else if(props.citation.attribution == "Not open-access"){
        content += `<a href="${props.citation.url}" target="_blank" class="btn btn-primary">See article for text</a>`
        content += sectionInfo
      }
      
    } else {
      let figureInfo = '';
      if(props.figure_caption && props.figure_caption != "N/A"){
        figureInfo = `<h5>Figure ${props.figure_num != "N/A" ? (props.figure_num + ':') : ''} ${props.figure_caption}</h5>`
      }
      
      if(props.citation.attribution == "Open-access"){
        content += `<img src="${feature.properties.figure_url}" style="width: 100%">`
        content += figureInfo
      }else if(props.citation.attribution == "Not open-access"){
        content += `<a href="${feature.properties.figure_url}" target="_blank" class="btn btn-primary">See article for figure</a>`
        content += figureInfo
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

    layer.bindPopup(content, {
      maxWidth: 400,
      maxHeight: 300,
      keepInView: true
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
    layerGroup.value.addLayer(modelFeatures.value)
  }

  function filterFeatures(filterFunction) {
    // TODO enable multiple filters at the same time
    // first remove all layers
    layerGroup.value.removeLayer(modelFeatures.value)
    // filter features
    modelFeatures.value = L.geoJSON(perceptualModelsGeojson.value, {
      filter: (feature) => {
        return filterFunction(feature)
      },
      onEachFeature: (feature, layer) => {
        onEachFeature(feature, layer)
      },
      pointToLayer: pointToLayer
    })
    // add filtered features
    layerGroup.value.addLayer(modelFeatures.value)
  }

  function resetFilter() {
    layerGroup.value.removeLayer(modelFeatures.value)
    modelFeatures.value = L.geoJSON(perceptualModelsGeojson.value, {
      onEachFeature: (feature, layer) => {
        onEachFeature(feature, layer)
      }
    })
    layerGroup.value.addLayer(modelFeatures.value)
  }

  return {
    leaflet,
    modelFeatures,
    layerGroup,
    mapLoaded,
    fetchPerceptualModelsGeojson,
    filterFeatures,
    resetFilter
  }
})
