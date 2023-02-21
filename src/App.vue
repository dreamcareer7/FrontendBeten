<template>
  <router-view />
</template>

<script>
import axios from 'axios'

export default {
  mounted() {
    let token = localStorage.getItem('betenAuthToken')
    axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  },
}
</script>

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
.button-icon {
  margin-bottom: .3em;
  margin-right: .46em;
  fill: white;
  width: 1.3em;
  height: 1.3em;
}
.clients_chart_bg {
  background-image: url('../src/assets/images/Untitled-1.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
}
img.avatar-img {
  width: 100%;
  height: 100%;
  border: 2px solid rgb(25, 98, 233);
}
</style>
