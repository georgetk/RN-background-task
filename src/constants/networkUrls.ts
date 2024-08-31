import {API_KEY} from './envDataKeys';

// export const NETWORK_URLS = {
//   BASE_URL: 'https://asia-south1-kc-stage-rp.cloudfunctions.net',
//   TESLA_ENDPOINT: `/globalNews?endpoint=everything&q=tesla&from=2024-08-27&sortBy=popularity&apiKey=${API_KEY}`,
//   APPLE_ENDPOINT: `/globalNews?endpoint=everything&q=apple&from=2024-08-26&to=2024-08-26&sortBy=popularity&apiKey=${API_KEY}`,
// };

const BASE_URL = 'https://asia-south1-kc-stage-rp.cloudfunctions.net';

const ENDPOINT = `/globalNews?endpoint=everything&sortBy=popularity&apiKey=${API_KEY}`;

const getTeslaEndpoint = (fromDate: string, toDate: string) =>
  ENDPOINT + `&q=tesla&from=${fromDate}&to=${toDate}`;

const getAppleEndpoint = (fromDate: string, toDate: string) =>
  ENDPOINT + `&q=apple&from=${fromDate}&to=${toDate}`;

export {BASE_URL, getTeslaEndpoint, getAppleEndpoint};
