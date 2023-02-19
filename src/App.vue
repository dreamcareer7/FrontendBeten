<template>
  <router-view />
</template>

<style lang="scss">
// Import Main styles for this application
@import 'styles/style';
</style>
<script>
import axios from 'axios'
import config from '@/config'
export default {
  mounted() {
    let token = localStorage.getItem('betenAuthToken')
    axios.defaults.baseURL = config.base_url
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  },
}
</script>
