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
    title: 'Northern Domain',
    color: '#2E5189',
    image: NorthernDomain,
    summary:
      'The Northern Domain is defined by cold-region hydrology, where snow, glaciers, river ice, frozen soils, and permafrost strongly control the storage and movement of water. In mountainous areas, elevation and slope aspect influence snowpack, glacier extent, precipitation, and permafrost conditions, creating contrasting hydrologic responses between sunlit and shaded slopes. Across lower elevations, seasonal thaw determines the depth of the active layer, while taliks provide localized pathways for water through or beneath permafrost. Extensive peatlands, lakes, and ice-affected rivers are common in the lowlands, making the region especially sensitive to warming-driven changes in permafrost, snow, ice, and drainage.',
    pdf: '/pdfs/north.pdf',
    //for the expanded panel metadata
    content:
      'The Northern Domain comprises ten hydrologic provinces defined by cold climate and limited energy availability. Snow, glaciers, river ice, frozen soils, and permafrost strongly influence how water is stored, transported, and released across the mountainous terrain, broad lowlands, lakes, and wetlands.'
  },
  {
    name: 'West',
    title: 'Western Domain',
    color: '#be1414',
    summary:
      'The Western Domain is defined by complex topography and geology, with high mountain ranges, steep elevation gradients, and deep sedimentary basins strongly controlling climate, drainage, and groundwater movement. The Coastal Ranges, Sierra Nevada, and Rocky Mountains intercept incoming moisture, producing high orographic precipitation and extensive seasonal snowpacks at higher elevations. Along the coast, warmer snow and rainfall can generate rapid runoff, while colder, higher-elevation snowpacks store water for longer periods and provide an important seasonal water supply. Atmospheric rivers are a major source of precipitation, and their temperature influences the rain-snow boundary, snowmelt, and runoff generation. Water infiltrating mountain landscapes can recharge adjacent basins through shallow and deep pathways, including flow through fractured rock. In the drier interior and southwestern parts of the domain, internally drained basins contain playas and salt lakes, with deep soils and sedimentary deposits contrasting with the shallow soils of mountain areas. Human activities strongly modify these natural processes through reservoirs, irrigated agriculture, groundwater pumping, urban development, and extensive water conveyance, while wildfire increasingly affects vegetation, soils, and runoff across forested landscapes.',
    image: WesternDomain,
    pdf: '/pdfs/west.pdf',
    content:
      'The Western Domain comprises nine hydrologic provinces defined by complex topography, geology, and strong elevation and precipitation gradients. High mountain ranges, seasonal snowpacks, fractured rock, deep sedimentary basins, and arid interior landscapes strongly control drainage, groundwater recharge, and seasonal water availability.'
  },
  {
    name: 'Central',
    title: 'Central Domain',
    color: '#dcb018',
    summary:
      'The Central Domain is defined by broad plains and prairies, gentle topography, and generally deep soils extending between the Rocky Mountain foothills and the Appalachian Mountains. Much of the domain drains through the Mississippi River and its extensive tributary network, while the Great Lakes form an important surface-water feature in the north. Climate varies from cooler conditions in the north to warmer conditions in the south and from drier landscapes in the west to more humid regions in the east. These gradients interact with soils, geology, and the legacy of past glaciation to create distinct hydrologic settings, including prairie potholes that store water in shallow depressions and areas with shallow groundwater that are managed through extensive tile drainage. Hydrology is heavily modified by agriculture, including irrigated farming in the west, rain-fed agriculture in the east, and lowland rice farming near the Mississippi River. Large reservoirs, groundwater pumping, drainage infrastructure, and river regulation further alter the storage and movement of water. Beneath the landscape, mountain-block recharge and regional groundwater flow connect the bordering uplands with the central plains and major river systems.',
    image: CentralDomain,
    pdf: '/pdfs/west.pdf',
    content:
      'The Central Domain comprises eight hydrologic provinces defined by broad plains and prairies, gentle topography, generally deep soils, and  extensive agriculture land use. North-south temperature and west-east precipitation gradients interact with glacial landscapes, shallow groundwater, prairie potholes, the Great Lakes, and the Mississippi River system to shape regional hydrology.'
  },
  {
    name: 'East',
    title: 'Eastern Domain',
    color: '#12743F',
    summary:
      'The Eastern Domain is a humid, densely vegetated region organized around the Appalachian Mountains, Piedmont, and Coastal Plain. Relatively high, year-round precipitation supports broadleaf and secondary forests, rain-fed agriculture, and extensive stream networks, although seasonal energy and water limitations influence runoff generation in different parts of the domain. The old, tectonically stable landscape has developed deep weathered profiles beneath uplands, with shallower materials in valleys and increasingly thick sediments toward the coast. Water moves through both local hillslope pathways and deeper regional groundwater systems before discharging to rivers, estuaries, wetlands, and coastal waters. The Fall Line marks an important transition between the Piedmont and Coastal Plain and has also helped concentrate major cities and infrastructure along an extensive urban corridor. Hydrologic behavior is strongly shaped by a long history of land-use change, including forest clearing, agriculture, soil erosion, urbanization, dams, and other in-stream barriers. Coastal lowlands are additionally influenced by backwater effects, estuarine processes, and exposure to flooding, storm surge, and sea-level rise, while carbonate aquifers and wetlands create distinct hydrologic settings in parts of the southern domain.',
    image: EasternDomain,
    pdf: '/pdfs/west.pdf',
    content:
      'The Eastern Domain comprises six hydrologic provinces defined by a humid climate, relatively consistent precipitation, and an old landscape organized around the Appalachian Mountains, Piedmont, and Coastal Plain. Deep weathering, thick coastal sediments, extensive stream networks, wetlands, estuaries, and local and regional groundwater pathways control water movement across the region.'
  },
  {
    name: 'Islands',
    title: 'Island Domain',
    color: '#ae0f90',
    summary:
      'The Island Domain includes Hawaiʻi, Puerto Rico, and the U.S. Virgin Islands, where steep volcanic terrain creates sharp hydrologic contrasts over short distances. Moist oceanic air produces high rainfall, cloud forests, and steep, flashy rivers on windward slopes, while rain-shadow effects create warmer, drier leeward areas with intermittent streams and greater wildfire exposure. Elevation further controls temperature, precipitation, vegetation, and soil development from the coast to the highest peaks. Because these islands are small and surrounded by ocean, groundwater systems are especially important: infiltrating rainfall forms freshwater bodies within the volcanic and weathered subsurface, while coastal pumping and reduced recharge can increase the risk of saltwater intrusion. Surface water and groundwater ultimately discharge to estuaries, nearshore waters, and coral reef ecosystems, closely linking upland hydrology with coastal environments.',
    image: IslandDomain,
    pdf: '/pdfs/west.pdf',
    content:
      'The Island Domain comprises two hydrologic provinces defined by steep volcanic terrain and rapid changes in climate, elevation, and land cover over short distances. Strong windward-leeward contrasts, flashy rivers, thin soils, volcanic aquifers, and freshwater-saltwater interactions closely connect upland hydrology with coastal waters and coral reef ecosystems.'
  }
]

export const provinceRegions = [
  {
    province: 'N01',
    type: 'North Domain',
    name: 'Tundra',
    characteristics:
      'Continuous permafrost with flow in seasonally thawed upper layers. Snow accumulation and melt. Low vegetation.',
    processes: [
      'Canopy interception and sublimation/ET',
      'Snowmelt energy balance',
      'Seasonal subsurface freeze-thaw controls flows, drainage',
      'River ice processes',
      'Blowing snow redistribution and sublimation',
      'Overland/shallow perched flow in active layer over permafrost',
      'Themokarst and taliks',
      'Shrubification/vegetation shifts'
    ],
    image: N1,
    pdf: '/pdfs/north.pdf',
    content:
      'The Tundra province is a cold-region landscape where continuous permafrost strongly controls how water is stored, routed, and released. Much of the annual precipitation is stored as snow, with blowing snow redistribution, sublimation, and snowmelt energy balance shaping the timing and amount of water available for runoff. During winter, frozen soils restrict subsurface movement, while in summer, thawing of the shallow active layer allows water to move laterally above the permafrost surface as subsurface stormflow (SSSF), and saturation-excess overland flow (SEOF). Low vegetation, including grasses, wetlands, and shrubs, influences canopy interception, evapotranspiration, and snow accumulation patterns. Lakes, wetlands, thermokarst features, taliks, and river ice further affect storage and drainage, making this province highly sensitive to warming, permafrost thaw, and vegetation shifts such as shrubification.'
  },
  {
    province: 'N02',
    type: 'North Domain',
    name: 'Alaska Lowlands',
    characteristics:
      'Discontinuous permafrost and taliks, lakes and wetlands with complex connectivity of lakes-rivers-groundwater.',
    processes: [
      'Canopy interception and sublimation/ET',
      'Snowmelt energy balance',
      'Seasonal subsurface freeze-thaw controls flows, drainage',
      'River ice processes',
      'Blowing snow redistribution and sublimation',
      'Overland/shallow perched flow in active layer over permafrost',
      'bogs and fens, wetland complexes',
      'Themokarst and taliks',
      'Surface water-groundwater interactions'
    ],
    image: N2,
    pdf: '/pdfs/west.pdf',
    content:
      'The Alaska Lowlands province is a cold-region landscape shaped by discontinuous permafrost, taliks, wetlands, lakes, and complex surface water-groundwater connectivity. Snow accumulation and melt strongly influence seasonal water availability, while blowing snow redistribution and sublimation affect where and how much water enters the system. During winter, frozen soils and river ice limit drainage and storage pathways. During warmer periods, thawing of the active layer allows water to move laterally above permafrost as shallow perched flow, subsurface stormflow (SSSF), and saturation-excess overland flow (SEOF). Wetland complexes, including bogs and fens, store and slowly release water, while lakes, taliks, and thaw features create important connections between surface water and groundwater. Vegetation such as shrubs and open forest contributes to canopy interception, evapotranspiration, and snow redistribution. Overall, this province is highly sensitive to permafrost thaw, wildfire, and changing wetland-lake-river connectivity under warming conditions.\n' +
      '\n' +
      'Please note that the lake symbol is not displayed in the illustration because lakes do not exceed the 5% land-area threshold used for inclusion in these perceptual model illustrations. See the paper for more information on the thresholds and classification criteria.\n'
  },
  {
    province: 'N03',
    type: 'North Domain',
    name: 'Northern High Mountains',
    characteristics:
      'Discontinuous permafrost, glaciers and very high precipitation (rain and flow) with rapid runoff during the warm season.',
    processes: [
      'Canopy interception and sublimation/ET',
      'Snowmelt energy balance',
      'Seasonal subsurface freeze-thaw controls flows, drainage',
      'River ice processes',
      'Blowing snow redistribution and sublimation',
      'Overland/shallow perched flow in active layer over permafrost',
      'Aspect controls discontinuous permafrost',
      'Slow groundwater flow pathway below permafrost',
      'Glacier processes'
    ],
    image: N3,
    pdf: '/pdfs/central.pdf',
    content:
      'The Northern High Mountains province is a steep, cold-region landscape shaped by glaciers, seasonal snow, discontinuous permafrost, shallow soils, and exposed bedrock. High precipitation falls as both snow and rain, with snow accumulation, blowing snow, sublimation, and glacier melt providing important sources of water during the warm season. Because steep terrain, frozen ground, and shallow subsurface layers limit infiltration and storage, runoff can respond rapidly through infiltration-excess overland flow (IEOF) and shallow subsurface stormflow (SSSF) above or along permafrost and bedrock surfaces. Seasonal freeze-thaw controls the timing and connectivity of flow pathways, while aspect and elevation influence where permafrost persists and where snow and ice are stored. A deeper, slower groundwater pathway may also develop beneath or around permafrost and connect to fluvial gravel near valley bottoms. Overall, this province is highly sensitive to warming because changes in glacier extent, snowpack persistence, permafrost conditions, and rainfall intensity can strongly alter runoff timing, flow pathways, and warm-season water availability.'
  },
  {
    province: 'N04',
    type: 'North Domain',
    name: 'Northern Low Mountains',
    characteristics:
      'Variable permafrost with aspect creating subsurface flow paths, shallow soils, lower precipitation and taller vegetation than N03.',
    processes: [
      'Canopy interception and sublimation/ET',
      'Snowmelt energy balance',
      'Seasonal subsurface freeze-thaw controls flows, drainage',
      'River ice processes',
      'Blowing snow redistribution and sublimation',
      'Overland/shallow perched flow in active layer over permafrost',
      'Aspect controls discontinuous permafrost',
      'Slow groundwater flow pathway below permafrost'
    ],
    image: N4,
    pdf: '/pdfs/east.pdf',
    content:
      'The Northern Low Mountains province is a cold-region landscape with variable/discontinuous permafrost, shallow soils, open forest vegetation, and lower precipitation than the Northern High Mountains. Snow remains an important control on seasonal water availability, with snow accumulation, blowing snow, sublimation, and snowmelt shaping the timing of runoff. Aspect and terrain position influence permafrost distribution, creating different shallow and deeper subsurface flow pathways across the hillslope. During frozen periods, permafrost and seasonally frozen ground restrict infiltration and drainage. During thawed periods, water can move laterally through the active layer as shallow perched flow and subsurface stormflow (SSSF) above permafrost, saprolite/till, and bedrock. In steeper or less permeable areas, rapid runoff may also occur as infiltration-excess overland flow (IEOF). Taller vegetation and open forest contribute to canopy interception, evapotranspiration, and snow redistribution, while slow groundwater flow beneath or around permafrost may connect to fluvial gravel and river ice zones near valley bottoms. Overall, this province reflects a transition from high mountain cryospheric controls toward more forested, lower-relief cold-region hydrology, where warming-driven changes in snow, permafrost, and vegetation can alter flow pathways and runoff timing.'
  },
  {
    province: 'N05',
    type: 'North Domain',
    name: 'Mackenzie Plain',
    characteristics:
      'Discontinuous permafrost. Large lakes, wetland systems, bogs and channel fens on organic soils.',
    processes: [
      'Canopy interception and sublimation/ET',
      'Snowmelt energy balance',
      'Seasonal subsurface freeze-thaw controls flows, drainage',
      'River ice processes',
      'Blowing snow redistribution and sublimation',
      'Overland/shallow perched flow in active layer over permafrost',
      'bogs and fens, wetland complexes',
      'Themokarst and taliks',
      'Fill-and-spill lake systems'
    ],
    image: N5,
    pdf: '/pdfs/north.pdf',
    content:
      'The Mackenzie Plain province is a low-relief cold-region landscape shaped by discontinuous permafrost, organic soils, large lakes, wetlands, bogs, and channel fens. Snow accumulation and melt strongly influence seasonal water availability, while blowing snow redistribution and sublimation affect how water is stored across the landscape before spring runoff. During frozen periods, permafrost and seasonally frozen ground limit infiltration and drainage. During thawed periods, water moves through the shallow active layer as perched flow, subsurface stormflow (SSSF), and saturation-excess overland flow (SEOF). Wetlands and lakes play a central role in water storage, creating fill-and-spill connections that control when and how water moves between depressions, channels, and downstream systems. Open forest and wetland vegetation contribute to interception, evapotranspiration, and snow redistribution. Thermokarst features and taliks can further alter drainage pathways by changing the connection between surface water, shallow groundwater, and deeper subsurface flow. Overall, this province is highly sensitive to warming because permafrost thaw, changing lake and wetland connectivity, and shifts in snow and vegetation can substantially modify runoff timing, water storage, and drainage pathways.'
  },
  {
    province: 'N06',
    type: 'North Domain',
    name: 'Taiga Shield',
    characteristics:
      'Discontinuous permafrost, shallow flow over thin soils and exposed bedrock, lakes.',
    processes: [
      'Canopy interception and sublimation/ET',
      'Snowmelt energy balance',
      'Seasonal subsurface freeze-thaw controls flows, drainage',
      'River ice processes',
      'Blowing snow redistribution and sublimation',
      'Overland/shallow perched flow in active layer over permafrost',
      'Themokarst and taliks',
      'Fill-and-spill lake systems'
    ],
    image: N6,
    pdf: '/pdfs/west.pdf',
    content:
      'The Taiga Shield province is a cold-region landscape shaped by discontinuous permafrost, thin soils, exposed bedrock, lakes, wetlands, and shallow subsurface flow pathways. Snow accumulation, blowing snow redistribution, sublimation, and snowmelt strongly control seasonal water availability and runoff timing. Because soils are thin and bedrock is often close to the surface, water is commonly routed through the active layer as shallow subsurface stormflow (SSSF), and saturation-excess overland flow (SEOF) above permafrost or bedrock. Seasonal freeze-thaw processes control drainage by restricting flow during frozen periods and reconnecting shallow pathways during thawed periods. River ice processes further influence winter storage, channel connectivity, and the timing of water release during spring melt. Lakes and wetlands provide important storage and create fill-and-spill connections that influence when water moves through the landscape and into river systems. Open forest and shrub vegetation affect canopy interception, evapotranspiration, and snow distribution, while thermokarst features and taliks can further alter local drainage pathways as permafrost thaws. Overall, this province is sensitive to warming-driven changes in snowpack, permafrost extent, lake connectivity, and runoff timing.'
  },
  {
    province: 'N07',
    type: 'North Domain',
    name: 'Hudson Plain',
    characteristics:
      'Discontinuous permafrost and taliks. Low and flat with deep organic soils. Extensive slow-draining wetlands store water.',
    processes: [
      'Canopy interception and sublimation/ET',
      'Snowmelt energy balance',
      'Seasonal subsurface freeze-thaw controls flows, drainage',
      'River ice processes',
      'Blowing snow redistribution and sublimation',
      'Overland/shallow perched flow in active layer over permafrost',
      'bogs and fens, wetland complexes',
      'Themokarst and taliks'
    ],
    image: N7,
    pdf: '/pdfs/central.pdf',
    content:
      'The Hudson Plain province is a low, flat cold-region landscape characterized by discontinuous permafrost, taliks, deep organic soils, and extensive slow-draining wetlands. Snow accumulation, blowing snow redistribution, sublimation, and snowmelt strongly influence seasonal water availability and runoff timing. During frozen periods, permafrost and seasonally frozen soils restrict infiltration and drainage; as the active layer thaws, water moves through shallow perched pathways as subsurface stormflow (SSSF) and saturation-excess overland flow (SEOF). The flat terrain and organic soils promote prolonged water storage in bogs, fens, and other wetland complexes, while open forest vegetation influences canopy interception, evapotranspiration, and snow distribution. Taliks and thermokarst features can create localized connections between surface water and deeper subsurface pathways, altering drainage across the landscape. River ice also affects channel storage and the timing of water release during spring breakup. Overall, hydrologic behavior in this province is strongly controlled by seasonal freeze–thaw, wetland storage, and the evolving distribution of permafrost.'
  },
  {
    province: 'N08',
    type: 'North Domain',
    name: 'Boreal Shield',
    characteristics:
      'Sporadic permafrost, lateral flow over thin soils and exposed bedrock, wetlands and lakes. Denser vegetation than N06.',
    processes: [
      'Canopy interception and sublimation/ET',
      'Snowmelt energy balance',
      'Seasonal subsurface freeze-thaw controls flows, drainage',
      'River ice processes',
      'Blowing snow redistribution and sublimation',
      'bogs and fens, wetland complexes',
      'Fill-and-spill lake systems'
    ],
    image: N8,
    pdf: '/pdfs/east.pdf',
    content:
      'The Boreal Shield province is a forested cold-region landscape characterized by sporadic permafrost, thin soils over exposed or shallow bedrock, and abundant lakes and wetlands. Snow accumulation, blowing snow, sublimation, and spring snowmelt strongly influence seasonal water availability, while the relatively dense open forest affects canopy interception, evapotranspiration, and snow distribution. Because the shallow soils and bedrock limit the depth of subsurface pathways, water is commonly routed laterally as subsurface stormflow (SSSF) toward low-lying wetlands, lakes, and channels. Saturation-excess overland flow (SEOF) can occur where soils and depressions become waterlogged. Lakes and wetlands provide important storage and may become hydrologically connected through fill-and-spill behavior as water levels rise. Deeper groundwater remains present below the shallow bedrock-controlled system and may contribute more slowly to downstream flow. River ice further influences channel storage and the timing of water release during spring breakup.'
  },
  {
    province: 'N09',
    type: 'North Domain',
    name: 'Boreal Plain',
    characteristics:
      'Seasonally frozen ground supports groundwater flow and recharge. Lower elevation, deeper soils, dry, some agriculture.',
    processes: [
      'Canopy interception and sublimation/ET',
      'Snowmelt energy balance',
      'Seasonal subsurface freeze-thaw controls flows, drainage',
      'River ice processes',
      'Blowing snow redistribution and sublimation',
      'bogs and fens, wetland complexes',
      'Fill-and-spill lake systems'
    ],
    image: N9,
    pdf: '/pdfs/north.pdf',
    content:
      'The Boreal Plain province is a relatively dry, low-elevation landscape characterized by seasonally frozen ground, deeper soils, open needleleaf forest, wetlands, and lakes. Snow accumulation, redistribution by wind, sublimation, and spring melt remain important seasonal controls on water availability, while canopy interception and evapotranspiration influence the amount of water reaching the ground. Seasonally frozen ground and relatively deep soils support groundwater recharge and subsurface storage, while water also moves laterally through the soil as subsurface stormflow (SSSF) and, where soils become saturated, as saturation-excess overland flow (SEOF) toward wetlands, lakes, and streams. Wetlands and lakes provide surface storage and may connect through fill-and-spill behavior as water levels rise, while deeper groundwater contributes to relatively stable subsurface storage. Some agricultural land use occurs within the province, particularly where climate and soils are suitable.'
  },
  {
    province: 'N10',
    type: 'North Domain',
    name: 'Great Lakes Forests',
    characteristics: 'Seasonally frozen ground, dense forest cover, lake-groundwater interaction.',
    processes: [
      'Canopy interception and sublimation/ET',
      'Snowmelt energy balance',
      'Seasonal subsurface freeze-thaw controls flows, drainage',
      'River ice processes',
      'bogs and fens',
      'wetland complexes',
      'Fill-and-spill lake systems',
      'Surface water-groundwater interactions'
    ],
    image: N10,
    content:
      'The Great Lakes Forests province is a humid, densely forested landscape characterized by seasonally frozen ground and a patchwork of numerous small lakes, wetlands, and forests. Broadleaf, needleleaf, and mixed forests influence canopy interception and evapotranspiration, while seasonal snow accumulation and melt contribute to the timing of water availability and runoff. Freeze-thaw processes regulate infiltration and shallow drainage during colder periods, and water commonly moves laterally through soils and weathered material as subsurface stormflow (SSSF) toward wetlands, lakes, and streams. The hydrologic behavior of lakes varies with their position in the landscape: higher-elevation lakes tend to rely more on precipitation and surface-water inputs and can experience larger water-level fluctuations during drought, whereas lower lakes are more strongly connected to groundwater and generally have more stable water levels. Groundwater also supports forest evapotranspiration and tree growth where the water table is relatively shallow. River ice further influences winter storage and the seasonal timing of flow release. Overall, the province is characterized by strong interactions among forest cover, seasonal freezing, lake and wetland storage, and surface water-groundwater connectivity.'
  },
  {
    province: 'W01',
    type: ' West Domain',
    name: 'British Columbia Coastal Mountains',
    characteristics:
      'Icy peaks and steep, forested valleys. Very high precipitation drives shallow groundwater and flow systems, bogs, seeps.',
    processes: [
      'Forest evapotranspiration and vegetation-snow interactions',
      'Seasonal snow dynamics',
      'Canopy interception and sublimation of snow',
      'Rain-on-snow; Glaciers',
      'Rainfed very near-surface groundwater and shallow flows'
    ],
    image: W1,
    content:
      'The British Columbia Coastal Mountains province is a steep, high-precipitation landscape characterized by icy peaks, glaciers, seasonal snow, and densely forested valleys. Orographic precipitation is high, and snow contributes more than 30% of long-term precipitation, making snow accumulation, canopy interception, sublimation, rain-on-snow events, and seasonal melt important controls on runoff. Although snow sublimation and redistribution by wind may occur, they are less prominent in this wet, cloudy maritime environment and are therefore not explicitly shown as major flow pathways in the illustration. In the steep terrain, abundant water supports shallow, rain-fed groundwater systems and rapid lateral movement through soils and weathered material, including subsurface stormflow (SSSF) through macropores and preferential pathways. Where soils become saturated, saturation-excess overland flow (SEOF), seeps, rills, and small areas of depression storage further route water downslope toward streams. Glacier melt provides an additional source of water from the highest elevations, while needleleaf forests strongly influence evapotranspiration and interactions between vegetation and snow. Overall, the province is characterized by close coupling among heavy precipitation, snow and glacier storage, shallow groundwater, forest processes, and rapid hillslope drainage.'
  },
  {
    province: 'W02',
    type: ' West Domain',
    name: 'Pacific Forests',
    characteristics:
      'Extensive forest, seasonally very high precipitation feeds groundwater and subsurface flows in weathered bedrock.',
    processes: [
      'Forest evapotranspiration and vegetation-snow interactions',
      'Seasonal snow dynamics',
      'Rain-on-snow',
      'Seasonal fill and release of groundwater in saprolite'
    ],
    image: W2,
    content:
      'The Pacific Forests province is a wet, densely forested landscape where seasonally high precipitation supports strong interactions among forests, shallow groundwater, and the weathered subsurface. Needleleaf forests and cloud forests influence canopy interception and evapotranspiration, while seasonal snow and rain-on-snow events contribute to the timing and magnitude of water inputs. Water infiltrates through the soil and saprolite into a weathered and fractured bedrock zone, where seasonal groundwater storage develops and is released through saturated lateral flow, springs, and deeper groundwater pathways. Weathered and fractured bedrock can provide substantial subsurface storage and connectivity compared with the less-fractured rock below. Groundwater emerging from this zone supports springs and contributes sustained baseflow (BF) to streams. Overall, the province is characterized by the seasonal filling and drainage of shallow subsurface and fractured-bedrock storage under a wet forest climate.'
  },
  {
    province: 'W03',
    type: ' West Domain',
    name: 'Western Interior Plateaus',
    characteristics:
      'Drier. Groundwater storage in major volcanic/sedimentary aquifers supports sustained flows and irrigation.',
    processes: [
      'Forest evapotranspiration and vegetation-snow interactions',
      'Seasonal snow dynamics',
      'Canopy interception and sublimation of snow',
      'Snowmelt feeds groundwater',
      'Deep groundwater flow-mountain block recharge'
    ],
    image: W3,
    content:
      'The Western Interior Plateaus province is a landscape where seasonal snow and deep groundwater storage play important roles in sustaining streamflow and water supply. Snow accumulation, canopy interception, sublimation, and spring melt influence the timing of recharge, while open forest and grassland vegetation affect evapotranspiration and snow redistribution. During rainfall or snowmelt events, infiltration-excess overland flow (IEOF) can occur where water inputs exceed the infiltration capacity of the soil, producing rapid downslope runoff. Water that infiltrates can recharge groundwater moving through fractures within the main bedrock mass, rather than through a distinct weathered and fractured layer like that emphasized in W02 and W05. These deeper fracture pathways support mountain-block recharge and sustained groundwater contributions to streams as baseflow (BF). In some areas, transmissivity feedback (TF) can further concentrate subsurface flow as the water table rises into more permeable portions of the fractured bedrock system. Groundwater stored in major volcanic and sedimentary aquifers also supports irrigation and helps maintain streamflow through dry periods.'
  },
  {
    province: 'W04',
    type: ' West Domain',
    name: 'Western Mountains',
    characteristics:
      'High elevation, cold, seasonal snow. Snow accumulation and melt recharges groundwater. Rapid runoff.',
    processes: [
      'Forest evapotranspiration and vegetation-snow interactions',
      'Seasonal snow dynamics',
      'Canopy interception and sublimation of snow',
      'Snowmelt feeds groundwater',
      'Glaciers',
      'Deep groundwater flow-mountain block recharge'
    ],
    image: W4,
    content:
      'The Western Mountains province is a cold, high-elevation landscape where seasonal snow strongly controls water storage, groundwater recharge, and runoff timing. Snow contributes more than 30% of long-term precipitation, and snow accumulation, canopy interception, sublimation, and spring melt are important components of the seasonal water balance; glaciers provide additional high-elevation storage in some areas. Forest and grassland vegetation influence evapotranspiration and snow redistribution across the steep terrain. During melt and rainfall events, water can move rapidly downslope as infiltration-excess (IEOF) and saturation-excess overland flow (SEOF), while shallow subsurface stormflow (SSSF) develops through soils and weathered material. A portion of snowmelt also infiltrates more deeply and contributes to mountain-block recharge, providing a connection between high-elevation water inputs and deeper groundwater systems. Springs can return subsurface water to the surface along hillslopes and valley margins. Overall, the province combines rapid mountain runoff with deeper groundwater recharge, making seasonal snowmelt a key control on both streamflow and subsurface water supply.'
  },
  {
    province: 'W05',
    type: ' West Domain',
    name: 'Pacific Mountains',
    characteristics:
      'Forested mountains. Snowmelt drives flow, subsurface storage, groundwater flow and mountain block recharge.',
    processes: [
      'Forest evapotranspiration and vegetation-snow interactions',
      'Seasonal snow dynamics',
      'Canopy interception and sublimation of snow',
      'Snowmelt feeds groundwater',
      'Rain-on-snow',
      'Seasonal fill and release of groundwater in saprolite',
      'Deep groundwater flow-mountain block recharge'
    ],
    image: W5,
    content:
      'The Pacific Mountains province is a forested mountain landscape where seasonal snow and abundant precipitation strongly influence runoff, groundwater recharge, and subsurface storage. Snow accumulation, canopy interception, sublimation, rain-on-snow events, and seasonal melt control the timing and magnitude of water inputs, while forest vegetation contributes substantial evapotranspiration. Water infiltrates through soils and saprolite and can be stored seasonally within the weathered and fractured subsurface before moving downslope as saturated flow and subsurface stormflow (SSSF). Deeper groundwater pathways through fractured bedrock contribute to mountain-block recharge, while springs return subsurface water to the surface and groundwater discharge sustains baseflow (BF) to streams. Wildfire can further alter vegetation, soil properties, and runoff pathways. Overall, the province is characterized by strong coupling among snowmelt, seasonal subsurface storage, fractured-rock groundwater flow, springs, and sustained streamflow.'
  },
  {
    province: 'W06',
    type: ' West Domain',
    name: 'Basin and Range',
    characteristics:
      'Dry. Internal-draining basins. Mountain block recharge supports groundwater flow and pumping.',
    processes: [
      'Forest evapotranspiration and vegetation-snow interactions',
      'Seasonal snow dynamics',
      'Canopy interception and sublimation of snow',
      'Snowmelt feeds groundwater',
      'Deep groundwater flow-mountain block recharge',
      'Channel losses'
    ],
    image: W6,
    content:
      'The Basin and Range province is a dry landscape of mountain blocks and internally drained basins, with long-term average precipitation below 400 mm. Although seasonal snow occurs in the mountains, much of the region’s water supply depends on infiltration and groundwater recharge rather than sustained surface runoff. Snowmelt and precipitation infiltrate through mountain soils and fractures within the bedrock, contributing to mountain-block recharge and deeper groundwater flow toward adjacent basins. Groundwater stored in these basin systems can sustain baseflow (BF) where it intersects streams or low-lying areas, while streamflow may also be reduced by channel losses as water infiltrates into dry basin sediments. Groundwater pumping is an important human influence and draws on the same regional groundwater system that is replenished by mountain recharge. Overall, the province is characterized by limited precipitation, internally draining basins, fractured-bedrock recharge from surrounding mountains, and strong dependence on groundwater storage and movement.'
  },
  {
    province: 'W07',
    type: ' West Domain',
    name: 'California Coast',
    characteristics:
      'Mediterranean climate. Some groundwater baseflow and some surface flows. Large cities. Wildfire impacts.',
    processes: ['Local mountain-front recharge and basin flows'],
    image: W7,
    content:
      'The California Coast province is a relatively dry, Mediterranean-climate landscape characterized by high sunshine, grassland vegetation, shallow to moderately deep soils, and extensive urban development. Precipitation is comparatively limited and strongly seasonal, so water availability depends on both episodic surface runoff and groundwater storage. Rainfall infiltrating along uplands and mountain fronts contributes to local groundwater recharge and basin-scale subsurface flow, while groundwater discharge can sustain baseflow (BF) in streams during drier periods. During wetter events, infiltration-excess (IEOF) and saturation-excess overland flow (SEOF) can generate rapid surface runoff, particularly where soils become saturated or infiltration is limited. Wildfire is an important disturbance that can alter vegetation, soil properties, infiltration, and runoff response, while urban development further modifies natural drainage and recharge pathways.'
  },
  {
    province: 'W08',
    type: ' West Domain',
    name: 'Southern Deserts',
    characteristics:
      'Arid climate with little runoff. Deep groundwater recharge in isolated mountains. Infiltration-excess flow, channel losses.',
    processes: [
      'Local mountain-front recharge and basin flows',
      'Infiltration-excess flow',
      'Channel losses'
    ],
    image: W8,
    content:
      'The Southern Deserts province is an arid, high-sunshine landscape with sparse shrub and grass cover, low annual precipitation, and generally limited surface runoff. Water inputs are concentrated in upland and mountain areas, where precipitation can infiltrate and generate localized recharge to a groundwater system, while a deeper regional groundwater system receives slower mountain-block recharge and transports water toward lower basin areas. Intense rainfall can produce infiltration-excess overland flow (IEOF), but much of this runoff is short-lived and commonly lost as it enters dry channels and basin-floor sediments. Channel loss is therefore a critical hydrologic process in this province, allowing surface water to infiltrate into the subsurface rather than continuing as streamflow. In some lower areas, groundwater may contribute limited baseflow (BF), but overall the province is strongly water-limited and depends heavily on localized recharge, subsurface storage, and mountain-derived groundwater flow.'
  },
  {
    province: 'W09',
    type: 'West Domain',
    name: 'Colorado Plateau',
    characteristics:
      'Semi-arid plateau with some winter snow. Flow derives from mountain recharge and some surface flows.',
    processes: [
      'Seasonal snow dynamics',
      'Deep groundwater flow-montain block recharge',
      'Local mountain-front recharge and basin flows',
      'Infiltration-excess flow',
      'Channel losses'
    ],
    image: W9,
    content:
      'The Colorado Plateau province is a semi-arid, high-elevation landscape with low annual precipitation, high sunshine, some seasonal winter snow, and sparse shrub and grass cover. Water inputs generate both surface and subsurface flow pathways, with runoff commonly beginning as infiltration-excess overland flow (IEOF) on upland slopes where rainfall exceeds infiltration capacity. As water moves downslope and accumulates in lower areas, saturation-excess overland flow (SEOF) can also occur where soils become locally saturated. A portion of infiltrating water recharges groundwater and contributes to baseflow (BF), linking mountain and plateau recharge areas with downstream flow. Channel loss is an especially important process in this province, as water moving through channels can infiltrate into dry sediments and be lost from surface flow. Overall, streamflow in the Colorado Plateau reflects a combination of episodic surface runoff, limited groundwater contributions, and substantial transmission losses through channels and basin sediments.'
  },
  {
    province: 'C01',
    type: 'Central Domain',
    name: 'Northern Prairies',
    characteristics:
      'Surface depressions fill with snowmelt, then connect and spill to generate river flows. Many areas were drained for agriculture.',
    processes: [
      'Dominant vertical processes (ET, recharge) in flat terrain',
      'Recharge controlled by clay content',
      'Drainage network controlled by glacial limits',
      'Snow accumulation, redistribution, and melt',
      'Depression storage and release'
    ],
    image: C1,
    content:
      'The Northern Prairies is a relatively flat, cool grassland landscape shaped by glacial deposits, seasonal snow, and numerous shallow surface depressions known as prairie potholes. Uneven till deposited during past glaciation created these depressions. Snow accumulation, redistribution by wind, sublimation, and spring melt provide an important seasonal source of water, while seasonally frozen soils and low-permeability till (clay-rich soils) can restrict infiltration and promote shallow subsurface stormflow and infiltration-excess overland flow (IEOF). The potholes provide substantial surface-water storage. As these depressions fill, they can become connected through fill-and-spill behavior, eventually transferring water downstream and contributing to river flow. Water also moves laterally through shallow soils as subsurface stormflow (SSSF), while evapotranspiration and recharge remain important vertical components of the water balance. Many natural depressions and wetlands have been drained or modified for cropland, altering surface storage, drainage connectivity, and the timing of runoff across the province. \n' +
      'Please note that the long-term average snow contribution is below the 30% threshold used for displaying the snowfall symbol in the perceptual model illustration; see the paper for details.\n'
  },
  {
    province: 'C02',
    type: 'Central Domain',
    name: 'Northern Great Plains',
    characteristics:
      'Dry and cold, thin soils with low vegetation, largely rangeland. Deep water tables and minor infiltration excess runoff.',
    processes: [
      'Dominant vertical processes (ET, recharge) in flat terrain',
      'Recharge controlled by clay content',
      'Snow accumulation, redistribution, and melt'
    ],
    image: C2,
    content:
      'The Northern Great Plains is a dry, cold, and low-relief province and is characterized by low precipitation, thin soils, grassland vegetation, and deep groundwater. Snow accumulation, redistribution by wind, sublimation, and seasonal melt influence the timing and spatial distribution of available water. Hydrologic movement is dominated by vertical processes: much of the incoming water returns to the atmosphere through evapotranspiration or infiltrates downward to recharge the groundwater system. Recharge varies with soil and clay content, which controls how readily water can pass through the soil and underlying saprolite or till. Although most precipitation infiltrates, minor infiltration-excess overland flow (IEOF) may occur when rainfall or snowmelt exceeds the infiltration capacity of the surface. Groundwater moves slowly through deeper pathways and provides baseflow (BF) to streams, creating a delayed connection between recharge and river flow.\n' +
      'Please note that we have snow effects in this province, but the long-term average snow contribution is below the 30% threshold used for displaying the snowfall symbol in the perceptual model illustration; see the paper for details. C2 is considered dry as its long-term precipitation average is below 400 mm. \n'
  },
  {
    province: 'C03',
    type: 'Central Domain',
    name: 'High Plains Aquifer',
    characteristics:
      'Groundwater pumping for agriculture lowers storage and baseflow. Recharge low due to vegetation, some occurs in playas.',
    processes: [
      'Dominant vertical processes (ET, recharge) in flat terrain',
      'Recharge controlled by clay content',
      'Groundwater pumping for irrigation'
    ],
    image: C3,
    content:
      'The High Plains Aquifer province is a relatively dry, flat landscape dominated by grassland and irrigated croplands, where evapotranspiration and groundwater recharge are more important than lateral surface flow. Recharge is generally limited by low precipitation and vegetarian ware use, and its rate depends strongly on soil and clay content. Some focused recharge occurs beneath playas and other surface depressions, where water temporarily collects and infiltrates toward the deep water table. Minor infiltration-excess overland flow (IEOF) may occur when rainfall exceeds the infiltration capacity of the soil, but most streamflow is supported by slower groundwater discharge as baseflow (BF). Extensive groundwater pumping for agricultural irrigation lowers the water table and reduces aquifer storage, potentially weakening groundwater contributions to streams and lakes. Overall, the province’s hydrology is strongly influenced by the balance among recharge, evapotranspiration, pumping, and groundwater-supported baseflow.'
  },
  {
    province: 'C04',
    type: 'Central Domain',
    name: 'Southern Great Plains',
    characteristics:
      'Grasslands and some agriculture with groundwater pumping. Groundwater flows through karst geology.',
    processes: [
      'Dominant vertical processes (ET, recharge) in flat terrain',
      'Recharge controlled by clay content',
      'Groundwater pumping for irrigation'
    ],
    image: C4,
    content:
      'The Southern Great Plains province is a relatively dry, low-relief landscape dominated by grasslands with areas of agriculture. Hydrologic movement is strongly influenced by vertical exchanges, particularly evapotranspiration and groundwater recharge, although recharge rates vary with soil and clay content. Minor infiltration-excess overland flow (IEOF) may occur when rainfall exceeds the infiltration capacity of the soil. Water that infiltrates can move through the underlying soil and saprolite or till before entering carbonate bedrock. Groundwater discharge provides baseflow (BF) to streams, linking deeper subsurface storage with surface water. Agricultural groundwater pumping can lower the water table, reduce aquifer storage, and weaken groundwater contributions to streamflow. Overall, the province’s hydrology reflects interactions among limited precipitation, evapotranspiration, soil-controlled recharge, karst groundwater flow, agricultural water use, and baseflow.'
  },
  {
    province: 'C05',
    type: 'Central Domain',
    name: 'Southern Coastal Plains',
    characteristics:
      'Deep groundwater, local agriculture and irrigation. Near the coast, clay-rich soils can generate infiltration excess.',
    processes: [
      'Dominant vertical processes (ET, recharge) in flat terrain',
      'Recharge controlled by clay content',
      'Groundwater pumping for irrigation',
      'Infiltration excess'
    ],
    image: C5,
    content:
      'The Southern Coastal Plain province is a flat, relatively dry landscape with grasslands, croplands, and deep groundwater. Evapotranspiration and groundwater recharge are important vertical processes, although recharge varies with soil texture and clay content. Clay-rich soils may develop cracks during dry periods, creating infiltration pathways, while intense rainfall can exceed the infiltration capacity of the soil and generate infiltration-excess overland flow (IEOF), particularly in coastal areas. Wetlands provide local surface-water storage and receive weather from surrounding grasslands and croplands. Water that infiltrates moves slowly through the soil and underlying deposits toward the deep water table, while groundwater discharge provides baseflow (BF) to streams and surface-water bodies. Agricultural irrigation and associated groundwater withdrawals can alter aquifer storage and groundwater-supported flow. Overall, the province’s hydrology reflects interactions among evapotranspiration, soil-controlled recharge, infiltration-excess runoff, deep groundwater flow, baseflow, and agricultural water use.'
  },
  {
    province: 'C06',
    type: 'Central Domain',
    name: 'Mississippi Plain',
    characteristics:
      'Very humid. Shallow groundwater pumped for flood irrigation of row-crop agriculture. Surface and subsurface storm flows.',
    processes: [
      'Dominant vertical processes (ET, recharge) in flat terrain',
      'Recharge controlled by clay content',
      'Groundwater pumping for irrigation',
      'Shallow water tables',
      'Flood irrigation'
    ],
    image: C6,
    content:
      'The Mississippi Plain is a very humid, flat agricultural landscape characterized by croplands, wetlands, and a shallow water table. Rainfall is partitioned among evapotranspiration, soil-water storage, groundwater recharge, and runoff. A relatively low-permeability clay layer restricts downward drainage in parts of the soil profile, promoting lateral subsurface stormflow (SSSF) above the layer during wet conditions. Infiltration-excess overland flow (IEOF) may also occur when rainfall intensity exceeds the soil’s infiltration capacity. Wetlands provide temporary surface-water storage, and shallow groundwater contributes baseflow (BF) to streams and downstream channels. Groundwater is also pumped to support flood irrigation of row crops, which can alter the water table, groundwater storage, and groundwater contributions to wetlands and streamflow.'
  },
  {
    province: 'C07',
    type: 'Central Domain',
    name: 'Unglaciated Central Lowlands',
    characteristics:
      'Rain-fed agriculture. Shallow water table lowered by extensive tile drains. Deep soils. Driftless area hillslope recharge/erosion.',
    processes: [
      'Dominant vertical processes (ET, recharge) in flat terrain',
      'Recharge controlled by clay content',
      'Shallow water tables',
      'Tile drainage; Infiltration excess',
      'Drainage network controlled by glacial limits'
    ],
    image: C7,
    content:
      'The Unglaciated Central Lowlands province is a predominantly rain-fed agricultural landscape with deep soils, shallow groundwater, and gently rolling to sloping terrain, particularly in the Driftless Area. Precipitation is partitioned among evapotranspiration, soil-water storage, recharge, and runoff. A relatively low-permeability clay layer restricts downward drainage and redirect water laterally as subsurface stormflow (SSSF), while infiltration-excess overland flow (IEOF) may occur when rainfall exceeds the soil’s infiltration capacity. Extensive tile-drain systems intercept shallow soil water and groundwater, lowering the water table and rapidly conveying water from croplands toward streams. Water that reaches deeper subsurface pathways contributes more slowly to streamflow as baseflow (BF). Overall, hydrologic behavior reflects the combined influence of deep soils, clay-controlled flow pathways, agricultural drainage, hillslope recharge and erosion, and drainage patterns associated with the region’s glacial boundaries.'
  },
  {
    province: 'C08',
    type: 'Central Domain',
    name: 'Glaciated Central Lowlands',
    characteristics:
      'Rain-fed agriculture. Shallow water table lowered by extensive tile drains. Thin soil, hummocky plains, internal-drained basins.',
    processes: [
      'Dominant vertical processes (ET, recharge) in flat terrain',
      'Recharge controlled by clay content',
      'Shallow water tables',
      'Tile drainage',
      'Infiltration excess',
      'Drainage network controlled by glacial limits.'
    ],
    image: C8,
    content:
      'The Glaciated Central Lowlands province is a humid, low-relief landscape characterized by rain-fed cropland, thin soils over glacial deposits, shallow groundwater, lakes, internally drained depressions, and some urban development. Evapotranspiration and groundwater recharge are important vertical processes, while soil and clay content regulate how readily water moves into the subsurface. The hummocky, glacially formed terrain creates local depressions that store water and influences the organization of the natural drainage network. Extensive tile drains intercept shallow soil water and groundwater, lower the water table beneath agricultural fields, and rapidly convey water toward lakes, streams, and downstream channels. Where rainfall exceeds the soil’s infiltration capacity, infiltration-excess overland flow (IEOF) may also occur. Groundwater moving through the soil and underlying glacial deposits contributes more slowly to streamflow as baseflow (BF), while urban areas can further alter infiltration, runoff, and drainage pathways.'
  },
  {
    province: 'E01',
    type: 'Eastern Domain',
    name: 'North Atlantic Coast',
    characteristics:
      'High winter water tables drive surface/subsurface stormflow. Snow and soil freezing. Summer baseflow and perched flows.',
    processes: [
      'High soil and groundwater storage, deep weathered zone',
      'Steady flows in perennial streams',
      'Variable source area generates saturation excess',
      'Perched flows over clay layers',
      'Snow accumulation and melt, soil freezing and river ice',
      'Human impacts through land history, urbanization, dams.'
    ],
    image: E1,
    content:
      'The North Atlantic Coast province is a humid, previously glaciated landscape where snow accumulation, soil freezing, and spring snowmelt strongly influence the annual streamflow cycle. Across much of the region, soils are underlain by thick glacial till that provides substantial subsurface storage but has relatively low permeability, limiting deeper drainage and reducing the direct influence of bedrock on hydrologic flow. On rocky hillslopes where the till is thin or absent, soils are comparatively shallow. During wetter winter and spring conditions, rising groundwater expands saturated source areas and promotes saturation-excess overland flow (SEOF) and subsurface stormflow (SSSF), while intense water inputs can also generate infiltration-excess overland flow (IEOF). Clay-rich layers within the soil can restrict vertical drainage and create perched lateral flow pathways. As the water table rises into more transmissive near-surface materials, transmissivity feedback (TF) can further increase lateral subsurface flow toward streams. During drier periods, deeper soil and groundwater storage release water more gradually as baseflow (BF), helping sustain perennial streams. Wetlands and mixed deciduous-evergreen forests further influence storage, evapotranspiration, and hydrologic connectivity, while a long history of land use, urbanization, and dams has modified natural flow pathways across parts of the province.'
  },
  {
    province: 'E02',
    type: 'Eastern Domain',
    name: 'Appalachian Mountains and Plateaus',
    characteristics:
      'Lateral flows through bedrock fractures and along fresh bedrock surface. Springflows.',
    processes: [
      'High soil and groundwater storage, deep weathered zone',
      'Steady flows in perennial streams',
      'Variable source area generates saturation excess',
      'Perched flows over clay layers.'
    ],
    image: E2,
    content:
      'The Appalachian Mountains and Plateaus province is a humid, forested landscape with substantial soil and groundwater storage and a deep weathered subsurface. High precipitation infiltrates through soils and weathered material, while differences in subsurface permeability redirect much of the water laterally through fractures in shale and along the interface with less-weathered bedrock. These pathways generate shallow and intermediate subsurface stormflow (SSSF), while deeper groundwater moves more slowly and contributes sustained baseflow (BF) to perennial streams. Where fractured or perched groundwater intersects the land surface, water is released through springs, providing an additional connection between subsurface storage and streamflow. During wet periods, rising groundwater and expanding saturated areas can also promote saturation-excess runoff. Overall, hydrology in this province is strongly controlled by the interaction of deep weathering, fractured bedrock, lateral subsurface flow, springs, and groundwater-supported baseflow.'
  },
  {
    province: 'E03',
    type: 'Eastern Domain',
    name: 'Applachian Piedmont',
    characteristics:
      'Winter recharge drives groundwater flow to wide, wet valleys. Summer perched flows.',
    processes: [
      'High soil and groundwater storage, deep weathered zone',
      'Variable source area generates saturation excess',
      'Perched flows over clay layers',
      'Wide, wet valley bottoms generate fast flow',
      'Human impacts through land history, urbanization, dams.'
    ],
    image: E3,
    content:
      'The Appalachian Piedmont province is a humid, forested landscape with deep weathered soils, substantial groundwater storage, and broad, wet valley bottoms. Winter precipitation provides important groundwater recharge, with infiltrating water moving through the deep soil and saprolite and into fractures within the underlying bedrock. During wetter periods, shallow groundwater and perched water above less-permeable clay layers promote lateral subsurface stormflow (SSSF), while broad, wet valley bottoms generate rapid runoff, contributing to the relatively flashy stream response characteristic of Piedmont watersheds. During drier summer conditions, perched flow pathways may persist locally, while deeper fractured-rock groundwater releases water more slowly as baseflow (BF) and helps sustain streamflow. Broadleaf and open forests influence evapotranspiration and soil-water storage, while a long history of land-use change and urbanization has altered infiltration, drainage, and runoff pathways across parts of the province.'
  },
  {
    province: 'E04',
    type: 'Eastern Domain',
    name: 'Eastern Coastal Plain',
    characteristics:
      'Layered aquifers interact with rivers and wetlands. Groundwater flows between basins and discharges to the ocean.',
    processes: [
      'High soil and groundwater storage, deep weathered zone',
      'Steady flows in perennial streams',
      'Groundwater flow through karst geology',
      'Surface water-aquifer connections',
      'Submarine groundwater discharge',
      'backwater effects',
      'Human impacts through land history, urbanization, dams.'
    ],
    image: E4,
    content:
      'The Eastern Coastal Plain province is a humid, low-relief landscape characterized by deep soils and weathered sediments, layered groundwater systems, wetlands, and strong connections between surface water and aquifers. Layering within the subsurface, including lower-permeability clay-rich horizons, can restrict vertical drainage and promote lateral subsurface stormflow (SSSF). During wet periods, rising water tables increase connections among wetlands, streams, and shallow groundwater, while saturated areas can generate saturation-excess overland flow (SEOF). Wetlands provide important surface-water storage and can become connected to the drainage network as water levels rise. Deeper groundwater moves through regional aquifers, including karst carbonate formations in some areas, and can cross surface-watershed boundaries before discharging to rivers, coastal waters, or directly to the ocean as submarine groundwater discharge. These groundwater contributions help sustain perennial streamflow, while backwater and coastal-water effects can influence drainage near the coast. Urbanization, dams, and a long history of land-use change further modify natural storage, flow pathways, and surface water-groundwater connectivity across the province.'
  },
  {
    province: 'E05',
    type: 'Eastern Domain',
    name: 'Everglades',
    characteristics:
      'Low and very flat. Extensive surface lakes and wetlands interact with karst groundwater and ocean backwater effects.',
    processes: [
      'Steady flows in perennial streams',
      'Groundwater flow through karst geology',
      'Surface water-aquifer connections',
      'Submarine groundwater discharge',
      'backwater effects',
      'Human impacts through land history, urbanization, dams.'
    ],
    image: E5,
    content:
      'The Everglades province is a very flat, low-lying landscape dominated by extensive wetlands, surface-water bodies, and a shallow water table over highly permeable karst carbonate geology. Warm, wet conditions and frequent tropical storms can deliver large volumes of water over short periods, while the extremely flat and low-lying terrain promotes widespread flooding and slow drainage. High precipitation supports broad surface-water storage, and because relief is minimal, water moves slowly across the landscape and readily exchanges with the underlying aquifer. When the water table rises to or near the surface, saturation-excess overland flow (SEOF) expands across wetlands and helps connect lakes, marshes, canals, and downstream coastal waters. Groundwater moves through the highly connected karst pathways, including large conduit-like flows that can cross surface-watershed boundaries and ultimately contribute substantial submarine groundwater discharge. Coastal backwater effects can further influence drainage and water levels in this low-gradient system. Urban development, groundwater pumping, wildfire, and extensive water-management infrastructure have substantially altered natural storage, flow paths, and surface water-groundwater interactions across the province.'
  },
  {
    province: 'E06',
    type: 'Eastern Domain',
    name: 'Eastern Plateaus',
    characteristics:
      'Secondary mixed forests over karst aquifers with high baseflows and complex groundwater flows.',
    processes: ['Groundwater flow through karst geology'],
    image: E6,
    content:
      'The Eastern Plateaus province is a humid, forested landscape underlain by extensive karst carbonate geology, where groundwater movement strongly controls streamflow. Rainfall infiltrates through soils and weathered material and can move rapidly into fractures, conduits, and other karst pathways, creating complex exchanges between surface water and deeper groundwater. Shallow subsurface stormflow (SSSF) also routes water laterally toward streams, while groundwater moving through the karst system can emerge at springs and provide substantial baseflow (BF) that helps sustain perennial flow. Streams may either lose water to or gain water from the deeper groundwater system depending on local hydraulic conditions and their connection to karst conduits. Overall, the province is characterized by strong surface water-groundwater connectivity, spring discharge, high baseflow contributions, and complex groundwater pathways through the karst landscape.'
  },
  {
    province: 'I01',
    type: 'Islands',
    name: 'Hawaiian Islands',
    characteristics:
      'Short, steep, flashy watersheds. Groundwater impounded by vertical dykes. Wind-/leeward contrast. Coastal urbanization.',
    processes: [
      'Cloud water and rainfall interception by cloud forests',
      'Subsurface groundwater discharge',
      'Subsurface stormflow though preferential flow paths',
      'Hydrophobic soils and flashy streams',
      'Groundwater influenced by vertical dykes, lava tubes and local release',
      'Caprock overlays groundwater, some springs.'
    ],
    image: I1,
    content:
      'The Hawaiian Islands province is a steep, tropical volcanic landscape with strong windward-leeward contrasts and short, flashy watersheds. High rainfall and cloud-water interception in upland cloud forests provide important inputs to soils and groundwater, while intense storms and locally hydrophobic soils can generate rapid infiltration-excess overland flow (IEOF). Water that infiltrates commonly moves laterally through preferential subsurface pathways, including macropores and pipe-like flow paths, producing subsurface stormflow (SSSF) and rapidly transferring water downslope. Deeper groundwater movement is strongly influenced by volcanic features, particularly vertical dikes that can impound groundwater at higher elevations and release it through seepage and springs. Other groundwater moves toward deeper coastal aquifers and may ultimately discharge offshore as submarine groundwater flow. Overall, the province combines rapid surface and shallow subsurface responses with substantial deeper groundwater storage and discharge, creating strong connections between cloud-forest inputs, volcanic geology, streams, springs, and coastal waters.'
  },
  {
    province: 'I02',
    type: 'Islands',
    name: 'Puerto Rico',
    characteristics:
      'Steep terrain, intense rock weathering. Shallow saturated flow and deep baseflow. Coastal aquifers.',
    processes: [
      'Cloud water and rainfall interception by cloud forests',
      'Subsurface groundwater discharge',
      'Subsurface stormflow though preferential flow paths',
      'Saturation excess and shallow saturated flows',
      'Slow baseflow through deep soils',
      'Volcaniclastic and karst aquifers.'
    ],
    image: I2,
    content:
      'The Puerto Rico province is a steep, humid tropical landscape characterized by intense weathering, deep soils, cloud forests, shallow stormflow, and important coastal aquifers. High rainfall and cloud-water interception maintain wet soils, while hydraulic conductivity decreases strongly with depth, promoting perched saturation and rapid lateral movement through macropores in the upper soil profile. This produces subsurface stormflow (SSSF), return flow, and saturation-excess overland flow (SEOF) in convergent areas during wet conditions. At the same time, deeper portions of the weathered profile store and slowly release water, sustaining baseflow (BF) over much longer timescales. Groundwater behavior varies with geology: volcaniclastic deposits support deep groundwater flow, while carbonate rocks form productive karst aquifers that receive recharge and transmit water toward the coast. Wetlands, urban development, and coastal groundwater systems further influence drainage, and part of the groundwater ultimately leaves the island through submarine groundwater discharge.'
  }
]
