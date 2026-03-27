const BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? `http://${window.location.hostname}:8000` : '/api');

export const API_URL = BASE_URL;

export const WS_URL = BASE_URL.startsWith('http') 
    ? BASE_URL.replace('http', 'ws')
    : (window.location.protocol === 'https:' ? 'wss:' : 'ws:') + '//' + window.location.host + BASE_URL;
