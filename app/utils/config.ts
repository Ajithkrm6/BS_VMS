// API configuration
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
};

// Feature flags
export const FEATURES = {
  enableDebug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  appName: import.meta.env.VITE_APP_NAME || 'BS-VMS',
};

// Environment
export const ENV = {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,
};
