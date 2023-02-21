import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {},
  },
  isAdmin: (state) => {
    return state.user ? state.user.isAdmin : false;
  },
  canIndexVehicles: (state) => {
    return state.user ? state.user.canIndexVehicles : false;
  },
})
