import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {},
    sidebarVisible: '',
    sidebarUnfoldable: false,
  },
  isAdmin: (state) => {
    return state.user ? state.user.isAdmin : false;
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  actions: {},
  modules: {},
})
