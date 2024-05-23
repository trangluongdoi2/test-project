export const DOMAIN_SERVER = 'https://api.vandvietnam.com';

export const API_URL = import.meta.env.PROD ? DOMAIN_SERVER : (import.meta.env.VITE_VUE_APP_API_URL as string)