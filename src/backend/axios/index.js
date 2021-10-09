import axios from 'axios'
import store from '../../store'

const BASE_URL = 'http://localhost:3000/api/v1'

const mainAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const authAxiosInstance = axios.create({
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

authAxiosInstance.interceptors.response.use(null, error => {
  if (error.response && error.response.config && error.response.status === 401) {
    return mainAxiosInstance.post('/refresh', {}, {
      headers: {
        'Authorization': `Bearer ${store.getters.auth_token}`
      }
    }).then(response => {
        store.commit('set_jwt_auth', response.data.access_token)

        let retry = error.response.config
        retry.headers['Authorization'] = `Bearer ${store.getters.auth_token}`
        return mainAxiosInstance.request(retry)
      }).catch(error => {
        store.commit('clear_auth')
        location.replace('/')
        return Promise.reject(error)
      })
  } else {
    return Promise.reject(error)
  }
})

export { mainAxiosInstance, authAxiosInstance }