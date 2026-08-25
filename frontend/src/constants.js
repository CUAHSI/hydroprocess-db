export const APP_BASE = import.meta.env.VITE_APP_BASE || 'VITE_APP_BASE_PLACEHOLDER'

export const APP_API_URL = import.meta.env.VITE_APP_API_URL || 'VITE_APP_API_URL_PLACEHOLDER'
export const ENDPOINTS = {
  openapi: `${APP_API_URL}/openapi.json`,
  authLogin: `${APP_API_URL}/auth/jwt/login`,
  userInfo: `${APP_API_URL}/users/me`,
  perceptual_models_geojson: `${APP_API_URL}/perceptual_model/geojson`,
  perceptual_models: `${APP_API_URL}/perceptual_model`,
  model_type_count: `${APP_API_URL}/statistics/model_type_count`,
  process_taxonomies: `${APP_API_URL}/filters/process_taxonomies`,
  spatial_zones: `${APP_API_URL}/filters/spatial_zones`,
  temporal_zones: `${APP_API_URL}/filters/temporal_zones`
}

//provinces
import N1 from './assets/Provinces/North/N1.png'
import N2 from './assets/Provinces/North/N2.png'
import N3 from './assets/Provinces/North/N3.png'
import N4 from './assets/Provinces/North/N4.png'
import N5 from './assets/Provinces/North/N5.png'
import N6 from './assets/Provinces/North/N6.png'
import N7 from './assets/Provinces/North/N7.png'
import N8 from './assets/Provinces/North/N8.png'
import N9 from './assets/Provinces/North/N9.png'
import N10 from './assets/Provinces/North/N10.png'

import E1 from './assets/Provinces/East/E1.png'
import E2 from './assets/Provinces/East/E2.png'
import E3 from './assets/Provinces/East/E3.png'
import E4 from './assets/Provinces/East/E4.png'
import E5 from './assets/Provinces/East/E5.png'
import E6 from './assets/Provinces/East/E6.png'
import C1 from './assets/Provinces/Centeral/C1.png'
import C2 from './assets/Provinces/Centeral/C2.png'
import C3 from './assets/Provinces/Centeral/C3.png'
import C4 from './assets/Provinces/Centeral/C4.png'
import C5 from './assets/Provinces/Centeral/C5.png'
import C6 from './assets/Provinces/Centeral/C6.png'
import C7 from './assets/Provinces/Centeral/C7.png'
import C8 from './assets/Provinces/Centeral/C8.png'

import W1 from './assets/Provinces/West/W1.png'
import W2 from './assets/Provinces/West/W2.png'
import W3 from './assets/Provinces/West/W3.png'
import W4 from './assets/Provinces/West/W4.png'
import W5 from './assets/Provinces/West/W5.png'
import W6 from './assets/Provinces/West/W6.png'
import W7 from './assets/Provinces/West/W7.png'
import W8 from './assets/Provinces/West/W8.png'
import W9 from './assets/Provinces/West/W9.png'

import I1 from './assets/Provinces/Islands/I1.png'
import I2 from './assets/Provinces/Islands/I2.png'

//Domains
import NorthernDomain from './assets/Domains/NorthernDomain.png'
import CentralDomain from './assets/Domains/CentralDomain.png'
import EasternDomain from './assets/Domains/EasternDomain.png'
import WesternDomain from './assets/Domains/WesternDomain.png'
import IslandDomain from './assets/Domains/IslandDomain.png'

export const domainRegions = [
  {
    name: 'North',
    image: NorthernDomain,
    summary:
      'The Northern Domain is defined by cold-region hydrology, where snow, glaciers, river ice, frozen soils, and permafrost strongly control the storage and movement of water. In mountainous areas, elevation and slope aspect influence snowpack, glacier extent, precipitation, and permafrost conditions, creating contrasting hydrologic responses between sunlit and shaded slopes. Across lower elevations, seasonal thaw determines the depth of the active layer, while taliks provide localized pathways for water through or beneath permafrost. Extensive peatlands, lakes, and ice-affected rivers are common in the lowlands, making the region especially sensitive to warming-driven changes in permafrost, snow, ice, and drainage.',
    pdf: '/pdfs/north.pdf',
    content: [
      //for the expanded panel metadata
      {
        type: 'text',
        text: 'This domain is characterized by cold-region processes and is uniquely vulnerable to climate warming. The main feature is that it is cold. This strongly affects the hydrological conditions in this domain, emphasizing a need to consider water phase, heat deficits, and how frozen conditions affect water pathways through the landscape. Most of the Northern domain is very sparsely populated and large wildfires are common.'
      },
      {
        type: 'text',
        text: 'The transition of the Northern domain into the Western, Central, and Eastern domains is a gradual one. In the East, the Gulf of St Lawrence provides a convenient boundary. In the center, a transition from forests into agriculture provides a boundary between the two domains. In the West, the boundary is the most diffuse and the transition from Northern mountains into Western mountains should be seen as a broad transition zone along elevation, temperature, and precipitation gradients, rather than a sharp transition from one biome to another.'
      },
      {
        type: 'image',
        src: NorthernDomain,
        caption:
          'Illustration of hydrologic conditions across the northern domain (artist: Kate Olsen)'
      },
      {
        type: 'text',
        text: 'This domain includes 10 provinces, where the main defining feature is the degree to which hydrological conditions are influenced by incoming solar radiation. A major consequence of low energy availability is the extent to which soils tend to freeze and thus control infiltration, ponding, and the vegetation types the landscape can support.'
      },
      {
        type: 'image',
        src: NorthernDomain,
        caption:
          'Summary of key differences in drivers of hydrologic behavior across the Northern domain.'
      },
      {
        type: 'text',
        text: 'The dominant gradients across the Northern domain are temperature (north to south), elevation (stark contrast between mountain and the large plains) and geologic conditions (Canadian Shield and elsewhere). A primary consideration is the degree of soil freezing (given in blue). This corresponds to a clear north-south gradient. Consequently, agriculture is only common in the southern parts of the domain. Topography provides a second gradient, with a clear difference between the mountainous regions in the west and the remainder of the domain. Much of the Northern domain has low topographic gradients and lakes and wetlands are very common. Subsurface structure provides an additional gradient. The provinces on the Canadian Shield mainly have very thick soils on top of the bedrock. Beyond the Canadian Shield solid depths vary, with deeper soils being mainly common in Hudson, Mackenzie and Boreal plan provinces.'
      },
      {
        type: 'text',
        text: 'The perceptual models of the Northern Domain provinces have a focus on the many hydrological processes that relate to winter snow dynamics. Key processes in the Northern regions includes:'
      }
      //table data here
    ]
  },
  {
    name: 'West',
    summary:
      'The Western Domain is defined by complex topography and geology, with high mountain ranges, steep elevation gradients, and deep sedimentary basins strongly controlling climate, drainage, and groundwater movement. The Coastal Ranges, Sierra Nevada, and Rocky Mountains intercept incoming moisture, producing high orographic precipitation and extensive seasonal snowpacks at higher elevations. Along the coast, warmer snow and rainfall can generate rapid runoff, while colder, higher-elevation snowpacks store water for longer periods and provide an important seasonal water supply. Atmospheric rivers are a major source of precipitation, and their temperature influences the rain-snow boundary, snowmelt, and runoff generation. Water infiltrating mountain landscapes can recharge adjacent basins through shallow and deep pathways, including flow through fractured rock. In the drier interior and southwestern parts of the domain, internally drained basins contain playas and salt lakes, with deep soils and sedimentary deposits contrasting with the shallow soils of mountain areas. Human activities strongly modify these natural processes through reservoirs, irrigated agriculture, groundwater pumping, urban development, and extensive water conveyance, while wildfire increasingly affects vegetation, soils, and runoff across forested landscapes.',
    image: WesternDomain,
    pdf: '/pdfs/west.pdf',
    content: [
      {
        type: 'text',
        text: 'Coming soon'
      }
    ]
  },
  {
    name: 'Central',
    summary:
      'The Central Domain is defined by broad plains and prairies, gentle topography, and generally deep soils extending between the Rocky Mountain foothills and the Appalachian Mountains. Much of the domain drains through the Mississippi River and its extensive tributary network, while the Great Lakes form an important surface-water feature in the north. Climate varies from cooler conditions in the north to warmer conditions in the south and from drier landscapes in the west to more humid regions in the east. These gradients interact with soils, geology, and the legacy of past glaciation to create distinct hydrologic settings, including prairie potholes that store water in shallow depressions and areas with shallow groundwater that are managed through extensive tile drainage. Hydrology is heavily modified by agriculture, including irrigated farming in the west, rain-fed agriculture in the east, and lowland rice farming near the Mississippi River. Large reservoirs, groundwater pumping, drainage infrastructure, and river regulation further alter the storage and movement of water. Beneath the landscape, mountain-block recharge and regional groundwater flow connect the bordering uplands with the central plains and major river systems.',
    image: CentralDomain,
    pdf: '/pdfs/west.pdf',
    content: [
      {
        type: 'text',
        text: 'Coming Soon'
      }
    ]
  },
  {
    name: 'East',
    summary:
      'The Eastern Domain is a humid, densely vegetated region organized around the Appalachian Mountains, Piedmont, and Coastal Plain. Relatively high, year-round precipitation supports broadleaf and secondary forests, rain-fed agriculture, and extensive stream networks, although seasonal energy and water limitations influence runoff generation in different parts of the domain. The old, tectonically stable landscape has developed deep weathered profiles beneath uplands, with shallower materials in valleys and increasingly thick sediments toward the coast. Water moves through both local hillslope pathways and deeper regional groundwater systems before discharging to rivers, estuaries, wetlands, and coastal waters. The Fall Line marks an important transition between the Piedmont and Coastal Plain and has also helped concentrate major cities and infrastructure along an extensive urban corridor. Hydrologic behavior is strongly shaped by a long history of land-use change, including forest clearing, agriculture, soil erosion, urbanization, dams, and other in-stream barriers. Coastal lowlands are additionally influenced by backwater effects, estuarine processes, and exposure to flooding, storm surge, and sea-level rise, while carbonate aquifers and wetlands create distinct hydrologic settings in parts of the southern domain.',
    image: EasternDomain,
    pdf: '/pdfs/west.pdf',
    content: [
      {
        type: 'text',
        text: 'Coming Soon'
      }
    ]
  },
  {
    name: 'Islands',
    summary:
      'The Island Domain includes Hawaiʻi, Puerto Rico, and the U.S. Virgin Islands, where steep volcanic terrain creates sharp hydrologic contrasts over short distances. Moist oceanic air produces high rainfall, cloud forests, and steep, flashy rivers on windward slopes, while rain-shadow effects create warmer, drier leeward areas with intermittent streams and greater wildfire exposure. Elevation further controls temperature, precipitation, vegetation, and soil development from the coast to the highest peaks. Because these islands are small and surrounded by ocean, groundwater systems are especially important: infiltrating rainfall forms freshwater bodies within the volcanic and weathered subsurface, while coastal pumping and reduced recharge can increase the risk of saltwater intrusion. Surface water and groundwater ultimately discharge to estuaries, nearshore waters, and coral reef ecosystems, closely linking upland hydrology with coastal environments.',
    image: IslandDomain,
    pdf: '/pdfs/west.pdf',
    content: [
      {
        type: 'text',
        text: 'Coming Soon'
      }
    ]
  }
]

export const provinceRegions = [
  {
    province: 'N01',
    type: 'North Domain',
    name: 'Tundra',
    characteristics: 'Continuous permafrost and seasonal thaw of upper layers, low vegetation.',
    processes: ['Snow accumulation/melt', 'Overland flow over frozen ground', 'River ice'],
    image: N1,
    pdf: '/pdfs/north.pdf'
  },
  {
    province: 'N02',
    type: 'North Domain',
    name: 'Alaska Lowlands',
    characteristics:
      'Discontinuous permafrost, seasonal thaw and complex surface-groundwater connections through taliks.',
    processes: ['Wetlands', 'Shallow water tables', 'Lake–river connectivity'],
    image: N2,
    pdf: '/pdfs/west.pdf'
  },
  {
    province: 'N03',
    type: 'North Domain',
    name: 'Northern High Mountains',
    characteristics: 'Discontinuous permafrost, glaciers and very high precipitation.',
    processes: ['Snow accumulation/melt', 'Glacier melt', 'Rapid runoff'],
    image: N3,
    pdf: '/pdfs/central.pdf'
  },
  {
    province: 'N04',
    type: 'North Domain',
    name: 'Northern Low Mountains',
    characteristics:
      'Permafrost variability, shallow soils, lower precipitation and taller vegetation than N3.',
    processes: ['Snow accumulation/melt', 'subsurface flow'],
    image: N4,
    pdf: '/pdfs/east.pdf'
  },
  {
    province: 'N05',
    type: 'North Domain',
    name: 'Mackenzie Plain',
    characteristics:
      'Discontinuous permafrost, large lakes, organic soils, dry due to rain shadow of N4.',
    processes: ['Plateau-wetland systems', 'bogs', 'channel fens'],
    image: N5,
    pdf: '/pdfs/north.pdf'
  },
  {
    province: 'N06',
    type: 'North Domain',
    name: 'Taiga Shield',
    characteristics: 'Discontinuous permafrost, thin soils with exposed bedrock, wetlands.',
    processes: ['Shallow flow', 'Bedrock control', 'Wetlands', 'Thermokarst', 'Limited Storage'],
    image: N6,
    pdf: '/pdfs/west.pdf'
  },
  {
    province: 'N07',
    type: 'North Domain',
    name: 'Hudson Plain',
    characteristics: 'Discontinuous permafrost, organic soils, extensive wetlands, low and flat.',
    processes: ['Wetland storage', 'Slow drainage'],
    image: N7,
    pdf: '/pdfs/central.pdf'
  },
  {
    province: 'N08',
    type: 'North Domain',
    name: 'Boreal Shield',
    characteristics:
      'Sporadic permafrost, thin soils with exposed bedrock, denser vegetation than N6.',
    processes: ['Fill-and-spill lakes (bedrock-lake systems)', 'Lateral flow'],
    image: N8,
    pdf: '/pdfs/east.pdf'
  },
  {
    province: 'N09',
    type: 'North Domain',
    name: 'Boreal Plain',
    characteristics:
      'Seasonally frozen ground, lower elevation, deeper soils, dry, some agriculture reliant on surface water.',
    processes: ['Groundwater flow', 'recharge/storage'],
    image: N9,
    pdf: '/pdfs/north.pdf'
  },
  {
    province: 'N10',
    type: 'North Domain',
    name: 'Great Lakes Forests',
    characteristics:
      'Seasonally frozen ground, dense forest cover, southern edge of transition zone from N6 to N8 to N10.',
    processes: ['Lake-groundwater interaction', 'evapotranspiration'],
    image: N10
  },
  {
    province: 'W01',
    type: ' West Domain',
    name: 'British Columbia Coastal Mountains',
    characteristics:
      'Very high precipitation, extensive ice cover on peaks, classic mountain environment (bare peaks, forested slopes and valleys)',
    processes: ['Rain-fed near-surface groundwater', 'shallow flow paths', 'surface storage'],
    image: W1
  },
  {
    province: 'W02',
    type: ' West Domain',
    name: 'Pacific Forests',
    characteristics:
      'Very high precipitation, densely forested with relatively high population density compared to most other provinces in this domain. Deep soils.',
    processes: ['Seasonal rain feeds groundwater', 'evapotranspiration', 'subsurface flow'],
    image: W2
  },
  {
    province: 'W03',
    type: ' West Domain',
    name: 'Northern Intermontane Plateaus',
    characteristics:
      'Intermediate elevation, volcanic and sedimentary formations, major aquifers. Dry due to rain shadows of W1 and W5, variable land cover and subsurface along three main plateaus.',
    processes: ['Groundwater storage in bedrock/regolith', 'delayed flow', 'irrigation support'],
    image: W3
  },
  {
    province: 'W04',
    type: ' West Domain',
    name: 'Western Mountains',
    characteristics:
      'High elevation, cold, seasonal snow. Inland mountain ranges are much drier than W1 & W5, classic mountain environments (bare peaks, forested slopes and valleys)',
    processes: ['Snow accumulation/melt', 'sublimation', 'rapid runoff'],
    image: W4
  },
  {
    province: 'W05',
    type: ' West Domain',
    name: 'Pacific Mountains',
    characteristics:
      'Southern continuation of W1, becoming warmer and wetter. Extensive forest cover with very limited permanent snow/ice.<br>Strong elevation gradients, mixed lithology, high snow accumulation.',
    processes: ['Snowmelt-driven flow', 'subsurface storage', 'mountain block recharge'],
    image: W5
  },
  {
    province: 'W06',
    type: ' West Domain',
    name: 'Basin and Range',
    characteristics:
      'Arid to semi-arid basins with internal drainage. Very dry with large local heterogeneity due to topographic relief, mostly internal draining, limited tall vegetation.',
    processes: ['Local flows from mountains', 'groundwater recharge in basins'],
    image: W6
  },
  {
    province: 'W07',
    type: ' West Domain',
    name: 'California Coast',
    characteristics:
      'Mediterranean climate, strong seasonality, complex subsurface. Dry and warm, locally very densely populated, extensive irrigated agriculture in the Central Valley.',
    processes: [
      'Surface-dominated flow',
      'shallow soils',
      'infiltration and saturation excess runoff'
    ],
    image: W7
  },
  {
    province: 'W08',
    type: ' West Domain',
    name: 'Southern Deserts',
    characteristics:
      'Arid climate, deep groundwater, low runoff efficiency. Very dry and warm with predominantly low vegetation. A number of large settlements heavily reliant on upstream water sources.',
    processes: ['Infiltration excess flow', 'channel losses', 'deep groundwater recharge'],
    image: W8
  },
  {
    province: 'W09',
    type: 'West Domain',
    name: 'Colorado Plateau',
    characteristics:
      'Semi-arid plateau, monsoon influence, limited runoff efficiency. Dry and warm, predominantly low vegetation but with strong local heterogeneity.',
    processes: ['Local flows', 'infiltration excess', 'limited runoff generation'],
    image: W9
  },
  {
    province: 'C01',
    type: 'Central Domain',
    name: 'Northern Prairies',
    characteristics: 'Coming soon',
    processes: ['Coming soon'],
    image: C1
  },
  {
    province: 'C02',
    type: 'Central Domain',
    name: 'Northern Great Plains',
    characteristics: 'Coming soon',
    processes: ['Coming soon'],
    image: C2
  },
  {
    province: 'C03',
    type: 'Central Domain',
    name: 'High Plains Aquifer',
    characteristics: 'Coming soon',
    processes: ['Coming soon'],
    image: C3
  },
  {
    province: 'C04',
    type: 'Central Domain',
    name: 'Southern Great Plains',
    characteristics: 'Coming soon',
    processes: ['Coming soon'],
    image: C4
  },
  {
    province: 'C05',
    type: 'Central Domain',
    name: 'Southern Coastal Plains',
    characteristics: 'Coming soon',
    processes: ['Coming soon'],
    image: C5
  },
  {
    province: 'C06',
    type: 'Central Domain',
    name: 'Mississippi Plain',
    characteristics: 'Coming soon',
    processes: ['Coming soon'],
    image: C6
  },
  {
    province: 'C07',
    type: 'Central Domain',
    name: 'Unglaciated Central Lowlands',
    characteristics: 'Coming soon',
    processes: ['Coming soon'],
    image: C7
  },
  {
    province: 'C08',
    type: 'Central Domain',
    name: 'Glaciated Central Lowlands',
    characteristics: 'Coming soon',
    processes: ['Coming soon'],
    image: C8
  },
  {
    province: 'E01',
    type: 'Eastern Domain',
    name: 'North Atlantic Coast',
    characteristics: 'Coming soon',
    processes: ['Coming soon'],
    image: E1
  },
  {
    province: 'E02',
    type: 'Eastern Domain',
    name: 'Appalachian Mountains and Plateaus',
    characteristics: 'Coming soon',
    processes: ['Coming soon'],
    image: E2
  },
  {
    province: 'E03',
    type: 'Eastern Domain',
    name: 'Applachian Piedmont',
    characteristics: 'Coming soon',
    processes: ['Coming soon'],
    image: E3
  },
  {
    province: 'E04',
    type: 'Eastern Domain',
    name: 'Eastern Coastal Plain',
    characteristics: 'Coming soon',
    processes: ['Coming soon'],
    image: E4
  },
  {
    province: 'E05',
    type: 'Eastern Domain',
    name: 'Everglades',
    characteristics: 'Coming soon',
    processes: ['Coming soon'],
    image: E5
  },
  {
    province: 'E06',
    type: 'Eastern Domain',
    name: 'Eastern Plateaus',
    characteristics: 'Coming soon',
    processes: ['Coming soon'],
    image: E6
  },
  {
    province: 'I01',
    type: 'Islands',
    name: 'Hawaiian Islands',
    characteristics: 'Coming soon',
    processes: ['Coming soon'],
    image: I1
  },
  {
    province: 'I02',
    type: 'Islands',
    name: 'Puerto Rico',
    characteristics: 'Coming soon',
    processes: ['Coming soon'],
    image: I2
  }
]
