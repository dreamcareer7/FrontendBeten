import axios from 'axios'
import router from '@/router';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('betenAuthToken')}`,
    Language: localStorage.getItem('language'),
  }
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status === 401) { // Unauthenticated
    router.push({
        name: 'Login' // Redirect to login
    })
  }
  return Promise.reject(error);
});

export default axiosInstance