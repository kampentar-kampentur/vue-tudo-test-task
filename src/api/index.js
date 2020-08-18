import axios from 'axios'

// keep application base URL blank for proper work of reverse-proxy (http-proxy-middleware) in vue.config.js
// needed for local development because of CORS restrictions
export const jsonPlaceholderAPI = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL
})

jsonPlaceholderAPI.interceptors.response.use(
  response => response,
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

export default axios
