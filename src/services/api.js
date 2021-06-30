import axios from 'axios';

import { BASE_URL } from '../config/constants';

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
