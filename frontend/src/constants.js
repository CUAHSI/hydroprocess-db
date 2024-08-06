export const APP_BASE = import.meta.env.VITE_APP_BASE || "VITE_APP_BASE_PLACEHOLDER";

let APP_FULL_URL_IN = import.meta.env.VITE_APP_FULL_URL || "VITE_APP_FULL_URL_PLACEHOLDER";
export const APP_FULL_URL = APP_FULL_URL_IN.endsWith("/") ? APP_FULL_URL_IN : `${APP_FULL_URL_IN}/`

export const APP_API_URL = import.meta.env.VITE_APP_API_URL || "VITE_APP_API_URL_PLACEHOLDER";
export const ENDPOINTS = {
  openapi: `${APP_API_URL}/openapi.json`,
  authLogin: `${APP_API_URL}/auth/jwt/login`,
  userInfo: `${APP_API_URL}/users/me`,
  perceptual_models_recursive: `${APP_API_URL}/perceptual_model/recursive`,
};
