import {API_KEY} from './envData';

export const NETWORK_URLS = {
  BASE_URL: 'https://asia-south1-kc-stage-rp.cloudfunctions.net',
  TESLA_ENDPOINT: `/globalNews?endpoint=everything&q=tesla&from=2024-08-27&sortBy=publishedAt&apiKey=${API_KEY}`,
  APPLE_ENDPOINT: `/globalNews?endpoint=everything&q=apple&from=2024-08-26&to=2024-08-26&sortBy=popularity&apiKey=${API_KEY}`,
};
