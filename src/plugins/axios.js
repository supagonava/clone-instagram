import axios from 'axios'
import { API_URL } from '../config';
import Cookies from 'js-cookie';

const service = axios.create({
  baseURL: API_URL,
  timeout: 30000,
})

const RequestInterceptor = {
  _config: (config) => {
    config.headers['Authorization'] = `Bearer ${Cookies.get('token') ?? localStorage.getItem('token') ?? null}`;
    return config;
  },
  _error: (error) => {
    Promise.reject(error);
  },
};

const ResponseInterceptor = {
  _response: (response) => {
    const { data } = response
    return data;
  },
  _error: (error) => {
    return Promise.reject(error.response.data);
  },
};

// API Request interceptor
service.interceptors.request.use(
  (config) => RequestInterceptor._config(config),
  (error) => RequestInterceptor._error(error)
);

service.interceptors.response.use(
  (response) => ResponseInterceptor._response(response),
  (error) => ResponseInterceptor._error(error)
);

export default service