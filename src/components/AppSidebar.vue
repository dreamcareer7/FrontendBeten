<template>
  <CSidebar
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
  >
    <CSidebarBrand>
      <router-link to="/">{{ sidebarUnfoldable ? 'M' : 'Murafiq' }}</router-link>
    </CSidebarBrand>
    <AppSidebarNav />
    <CSidebarToggler
      class="d-none d-lg-flex"
      @click="$store.commit('toggleUnfoldable')"
    />
  </CSidebar>
</template>

<script>
import store from '../store'
import { computed } from 'vue'
import { AppSidebarNav } from './AppSidebarNav'

export default {
  name: 'AppSidebar',
  components: {
    AppSidebarNav,
  },
  setup() {
    return {
      sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
      sidebarVisible: computed(() => store.state.sidebarVisible),
    }
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
  font-family: Scripto;
  font-size: 2rem;
  color: white;
}
</style>
