import axios from 'axios';
import {BASE_URL} from '../constants/networkUrls';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
