<template>
  <form class="card border-warning mb-4" @submit.prevent="update">
    <div class="card-header">Update Group</div>
    <div class="row mt-4">
      <div class="col-4">
        <div class="card-body">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="group.title"
              autocomplete="off"
              required
              autofocus
            />
            <label for="title">Title</label>
          </div>

          <div class="form-floating mb-3">
            <select v-model="group.crew_id" id="crew_id" class="form-control">
              <option>Choose Crew</option>
              <template v-for="crew in crews" :key="crew.id">
                <option :value="crew.id">{{ crew.fullname }}</option>
              </template>
            </select>
            <label for="crew_id">Crew</label>
          </div>
        </div>
      </div>
      <div class="col-8 text-center">
        <h6>Assigned Members to this Group</h6>
        <div class="row">
          <div class="col-4">
            <h6>Search Client</h6>
            <input
              type="text"
              v-model="client_query"
              class="form-control"
              @change="searchClients"
            />
            <div class="row mt-3">
              <div
                class="row border p-2 mb-2"
                v-for="client in searched_client"
              >
                <div class="col-8">
                  <h6>{{ client.fullname }}</h6>
                  <span> {{ client.id }} </span>
                </div>
                <div class="col-4">
                  <button
                    class="btn btn-primary"
                    @click="addClientToGroup(client)"
                  >
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-7">
            <div class="row border p-2 mb-2" v-for="client in group.clients">
              <div class="col-8">
                <h6>{{ client.fullname }}</h6>
              </div>
              <div class="col-2">
                <button
                  class="btn btn-primary"
                  @click="removeClientFromGroup(client)"
                >
                  <ion-icon name="arrow-back-outline"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CRow>
        <CCol v-if="error_message" :md="12">
          <div class="error_style">
            {{ error_message }}
          </div>
        </CCol>
      </CRow>
    </div>
    <div class="card-footer text-end">
      <button type="submit" class="btn btn-warning text-white">
        <ion-icon name="save-outline"></ion-icon>&nbsp;Save
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'UpdateGroup',
  data: () => ({
    error_message: '',
    client_query: '',
    searched_client: [],
    group: {},
    crews: [],
    group_clients: [],
  }),
  methods: {
    getCrews: async function () {
      await this.$axios.get('/crews')
        .then((response) => this.crews = response.data.data)
    },
    searchClients: async function () {
      await this.$axios
        .get(`/clients`, {
          params: { fullname: this.client_query, per_page: 10 },
        })
        .then((response) => {
          this.searched_client = response.data.data
        })
    },
    async isAdded(client) {
      let added = false
      this.group_clients.forEach((cln) => {
        if (client.id === cln.id) {
          added = true
        }
      })
      return added
    },
    async addClientToGroup(client) {
      if (!(await this.isAdded(client))) {
        if (!this.group_clients.includes(client)) {
          this.group_clients.push(client)
        }
      }
      const index = this.searched_client.indexOf(client)
      if (index > -1) {
        // only splice array when item is found
        this.searched_client.splice(index, 1) // 2nd parameter means remove one item only
      }
    },
    removeClientFromGroup(client) {
      const index = this.group_clients.indexOf(client)
      if (index > -1) {
        // only splice array when item is found
        this.group_clients.splice(index, 1) // 2nd parameter means remove one item only
      }
      if (!this.searched_client.includes(client)) {
        this.searched_client.push(client)
      }
    },
    update: async function () {
      await this.$axios
        .patch(`/groups/${this.group.id}`, this.group)
        .then(() => this.$router.push({ name: 'Groups' }))
        .catch((error) => {
          if (error.response) {
            this.error_message = error.response.data.message
          } else {
            this.error_message = error.message
          }
        })
    },
    assignClients: async function () {
      this.group.clients = this.group_clients
      await this.$axios
        .post(`/groups/assign_clients/${this.group.id}`, {
          clients: this.group_clients,
        })
        .then(() => this.$router.push({ name: 'groups' }))
        .catch((error) => {
          if (error.response) {
            this.error_message = error.response.data.message
          } else {
            this.error_message = error.message
          }
        })
    },
  },
  async mounted() {
    this.getCrews()
    await this.$axios
      .get(`/groups/${this.$decrypt(this.$route.params.id)}`)
      .then((response) => {
        this.group = response.data
      })
  },
}
</script>
