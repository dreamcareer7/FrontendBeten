<template>
  <router-view />
</template>

<style lang="scss">
// Import Main styles for this application
@import 'styles/style';
 .error_style {
    background-color: red;
    color: white;
    font-size: .9rem;
    margin: .7em .6em;
    border-radius: 5px;
    padding: .5em .3em;
    text-align: center;
 }
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
