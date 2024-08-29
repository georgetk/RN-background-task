import axios from 'axios';
import {NETWORK_URLS} from '../constants/networkUrls';

export const axiosInstance = axios.create({
  baseURL: NETWORK_URLS.BASE_URL,
});
