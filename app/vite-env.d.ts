/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly VITE_API_URL: string;
    readonly VITE_API_TIMEOUT: string;
    readonly VITE_APP_ENV: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_ENABLE_DEBUG: string;
  };
}
