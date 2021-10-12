import axios from 'axios'
import store from '../../store'

const API_URL = 'http://localhost:3000/api/v1'
const BASE_URL = 'http://localhost:3000'

const mainAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const authAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const authBaseAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

authAxiosInstance.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    'Authorization': `Bearer ${store.getters.auth_token}`
  }
  return config
})

authBaseAxiosInstance.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    'Authorization': `Bearer ${store.getters.auth_token}`
  }
  return config
})

export { mainAxiosInstance, authAxiosInstance, authBaseAxiosInstance }