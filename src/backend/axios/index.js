import axios from 'axios'

const API_URL = 'http://localhost:3000/api/v1'
const BASE_URL = 'http://localhost:3000'

const mainAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})


export {mainAxiosInstance}