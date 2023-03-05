import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {},
  },
  actions: {
    setUser (state, user) {
      state.user = user
    }
  },
  isAdmin: (state) => {
    return state.user ? state.user.isAdmin : false;
  },
  canIndexVehicles: (state) => {
    return state.user ? state.user.canIndexVehicles : false;
  },
})
