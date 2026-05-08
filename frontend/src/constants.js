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
import northernDomain from '@/assets/northernDomain.jpg'
export const domainRegions = [
  {
    name: 'North',
    summary:
      'This domain is characterized by cold-region processes and is uniquely vulnerable to climate warming. The main feature is that it is cold. This strongly affects the hydrological conditions in this domain, emphasizing a need to consider water phase, heat deficits, and how frozen conditions affect water pathways through the landscape. Most of the Northern domain is very sparsely populated and large wildfires are common.',
    pdf: '/pdfs/north.pdf',
    content: [
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
        src: northernDomain,
        caption:
          'Illustration of hydrologic conditions across the northern domain (artist: Kate Olsen)'
      },
      {
        type: 'text',
        text: 'This domain includes 10 provinces, where the main defining feature is the degree to which hydrological conditions are influenced by incoming solar radiation. A major consequence of low energy availability is the extent to which soils tend to freeze and thus control infiltration, ponding, and the vegetation types the landscape can support.'
      },
      {
        type: 'image',
        src: northernDomain,
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
      'In the west the boundary is the most diffuse and the transition from northern mountains (N3, N4) into western mountains (W1, W4) should be seen as a broad transition zone along elevation, temperature and precipitation gradients, rather than a sharp transition from one biome into the next. The manifestation of hydrological conditions is strongly influenced by the water availability boundary that divides the continent between negative and positive P-PET. ',
    image: northernDomain,
    pdf: '/pdfs/west.pdf',
    content: [
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
        src: northernDomain,
        caption:
          'Illustration of hydrologic conditions across the northern domain (artist: Kate Olsen)'
      },
      {
        type: 'text',
        text: 'This domain includes 10 provinces, where the main defining feature is the degree to which hydrological conditions are influenced by incoming solar radiation. A major consequence of low energy availability is the extent to which soils tend to freeze and thus control infiltration, ponding, and the vegetation types the landscape can support.'
      },
      {
        type: 'image',
        src: northernDomain,
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
    name: 'Central',
    summary:
      'In the west the boundary is the most diffuse and the transition from northern mountains (N3, N4) into western mountains (W1, W4) should be seen as a broad transition zone along elevation, temperature and precipitation gradients, rather than a sharp transition from one biome into the next. The manifestation of hydrological conditions is strongly influenced by the water availability boundary that divides the continent between negative and positive P-PET. ',
    image: northernDomain,
    pdf: '/pdfs/west.pdf',
    content: [
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
        src: northernDomain,
        caption:
          'Illustration of hydrologic conditions across the northern domain (artist: Kate Olsen)'
      },
      {
        type: 'text',
        text: 'This domain includes 10 provinces, where the main defining feature is the degree to which hydrological conditions are influenced by incoming solar radiation. A major consequence of low energy availability is the extent to which soils tend to freeze and thus control infiltration, ponding, and the vegetation types the landscape can support.'
      },
      {
        type: 'image',
        src: northernDomain,
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
    name: 'East',
    summary:
      'In the East the boundary is the most diffuse and the transition from northern mountains (N3, N4) into western mountains (W1, W4) should be seen as a broad transition zone along elevation, temperature and precipitation gradients, rather than a sharp transition from one biome into the next. The manifestation of hydrological conditions is strongly influenced by the water availability boundary that divides the continent between negative and positive P-PET. ',
    image: northernDomain,
    pdf: '/pdfs/west.pdf',
    content: [
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
        src: northernDomain,
        caption:
          'Illustration of hydrologic conditions across the northern domain (artist: Kate Olsen)'
      },
      {
        type: 'text',
        text: 'This domain includes 10 provinces, where the main defining feature is the degree to which hydrological conditions are influenced by incoming solar radiation. A major consequence of low energy availability is the extent to which soils tend to freeze and thus control infiltration, ponding, and the vegetation types the landscape can support.'
      },
      {
        type: 'image',
        src: northernDomain,
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
  }
]

export const provinceRegions = [
  {
    province: 'N1',
    name: 'Tundra',
    chacteristics: 'Continuous permafrost and seasonal thaw of upper layers, low vegetation.',
    processes: ['Snow accumulation/melt', 'Overland flow over frozen ground', 'River ice'],
    image: northernDomain,
    pdf: '/pdfs/north.pdf'
  },
  {
    province: 'N2',
    name: 'Alaska Lowlands',
    characteristics:
      'Discontinuous permafrost, seasonal thaw and complex surface-groundwater connections through taliks.',
    processes: ['Wetlands', 'Shallow water tables', 'Lake–river connectivity'],
    image: northernDomain,
    pdf: '/pdfs/west.pdf'
  },
  {
    province: 'N3',
    name: 'Northern High Mountains',
    characteristics: 'Discontinuous permafrost, glaciers and very high precipitation.',
    processes: ['Snow accumulation/melt', 'Glacier melt', 'Rapid runoff'],
    image: northernDomain,
    pdf: '/pdfs/central.pdf'
  },
  {
    province: 'N4',
    name: 'Northern Low Mountains',
    characteristics:
      'Permafrost variability, shallow soils, lower precipitation and taller vegetation than N3.',
    processes: ['Snow accumulation/melt', 'subsurface flow'],
    image: northernDomain,
    pdf: '/pdfs/east.pdf'
  },
  {
    province: 'N5',
    name: 'Mackenzie Plain',
    characteristics:
      'Discontinuous permafrost, large lakes, organic soils, dry due to rain shadow of N4.',
    processes: ['Plateau-wetland systems', 'bogs', 'channel fens'],
    image: northernDomain,
    pdf: '/pdfs/north.pdf'
  },
  {
    province: 'N6',
    name: 'Taiga Shield',
    characteristics: 'Discontinuous permafrost, thin soils with exposed bedrock, wetlands.',
    processes: ['Shallow flow', 'Bedrock control', 'Wetlands', 'Thermokarst', 'Limited Storage'],
    image: northernDomain,
    pdf: '/pdfs/west.pdf'
  },
  {
    province: 'N7',
    name: 'Hudson Plain',
    characteristics: 'Discontinuous permafrost, organic soils, extensive wetlands, low and flat.',
    processes: ['Wetland storage', 'Slow drainage'],
    image: northernDomain,
    pdf: '/pdfs/central.pdf'
  },
  {
    province: 'N8',
    name: 'Boreal Shield',
    characteristics:
      'Sporadic permafrost, thin soils with exposed bedrock, denser vegetation than N6.',
    processes: ['Fill-and-spill lakes (bedrock-lake systems)', 'Lateral flow'],
    image: northernDomain,
    pdf: '/pdfs/east.pdf'
  },
  {
    province: 'N9',
    name: 'Boreal Plain',
    chacteristics:
      'Seasonally frozen ground, lower elevation, deeper soils, dry, some agriculture reliant on surface water.',
    processes: ['Groundwater flow', 'recharge/storage'],
    image: northernDomain,
    pdf: '/pdfs/north.pdf'
  },
  {
    province: 'N10',
    name: 'Great Lakes Forests',
    characteristics:
      'Seasonally frozen ground, dense forest cover, southern edge of transition zone from N6 to N8 to N10.',
    processes: ['Lake-groundwater interaction', 'evapotranspiration']
  }
]
