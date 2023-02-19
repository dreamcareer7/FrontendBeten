import axios from 'axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    getUsers(ctx, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/users', { params: payload })
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    },
    addUser(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/users', data)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    },
  },
}
