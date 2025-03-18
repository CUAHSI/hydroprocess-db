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
