<template>
  <div>
    <v-idle @idle="onidle" style="display: none" :duration="900" />
    <AppSidebar />
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div class="body flex-grow-1 px-3">
        <CContainer fluid>
          <router-view />
        </CContainer>
      </div>
      <AppFooter />
    </div>
  </div>
</template>
<script>
import { CContainer } from '@coreui/vue'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    AppFooter,
    AppHeader,
    AppSidebar,
    CContainer,
  },
  methods: {
    onidle() {
      this.$axios
        .post('token-logout')
        .then(() => {
          localStorage.removeItem('auth')
          localStorage.removeItem('auth_token')
          swal({
            title: this.$i18n.t('You have been logged out due to inactivity.'),
            icon: 'warning',
          })
          this.$router.push({ name: 'Login' })
        })
        .catch(() => {
          swal({
            title: 'Error occured. Please try to login again',
            icon: 'error',
          })
        })
    },
  },
}
</script>
