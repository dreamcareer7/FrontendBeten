import axios from 'axios'
import router from '@/router'

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  timeout: 60000,
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    /*
     * Get the token from localStorage
     * and set it as the Authorization header of axios if it exists
     * that is only if there isn't an Authorization header to begin with
     * before request is sent
     */
    let token = localStorage.getItem('auth_token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    /*
     * Any status code that lies within the range of 2xx causes this function
     * to trigger
     * Do something with response data
     */
    return response
  },
  (error) => {
    /*
     * Any status codes that falls outside the range of 2xx causes this function
     * to trigger
     * Do something with response error
     * If error is is Unauthenticated, redirect to login
     */
    switch (error.response?.status) {
      case 401: // Unauthenticated
        router.push({
          name: 'Login', // Redirect to login
        })
        break
      case 422: // Validation error
        // Maybe don't do anything? let the frontend handle the validation??
        break
      default:
        swal({
          title: error.code,
          text: error.message,
          icon: 'error',
        }).then(() => {
          if (!localStorage.getItem('auth_token')) {
            router.push({
              name: 'Login', // Redirect to login
            })
          }
        })
        break
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
