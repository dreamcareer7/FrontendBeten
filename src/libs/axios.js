// axios
import axios from 'axios'
import { createApp } from 'vue'
import App from '@/App.vue'

const app = createApp(App)

let apikey
if (localStorage.getItem('userData')) {
  const user = JSON.parse(localStorage.getItem('userData'))
  apikey = user.apikey
} else {
  apikey = ''
}

axios.interceptors.request.use(
  (config) => {
    const token = apikey
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },

  (error) => Promise.reject(error),
)

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: process.env.BASE_API_URL,
  // timeout: 1000,
  headers: {
    Authorization: `Bearer ${apikey}`,
    Language: localStorage.getItem('language'),
  },
})

app.prototype.$http = axiosIns
export default axiosIns
