<template>
  <div class="card border-success mb-4">
    <div class="card-header">Create Group</div>

    <div class="row mt-4">
      <div class="col-4">
        <form method="post">
          <div class="card-body">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="title" v-model="group.title" name="title" placeholder="Title..."
                required autofocus autocomplete="off" />
              <label for="title">Title</label>
              <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-3">
              <select v-model="group.crew_id" name="crew_id" id="crew_id" class="form-control">
                <option>Choose Crew</option>
                <template v-for="crew in crews" :key="crew.id">
                  <option :value="crew.id">{{ crew.fullname }}</option>
                </template>
              </select>
              <label for="crew_id">Crew</label>
              <div class="invalid-feedback"></div>
            </div>
          </div>

        </form>
      </div>
      <div class="col-8 text-center">
        <h6>Assigned Members to this Group</h6>
        <div class="row">
          <div class="col-4">
            <h6>Search Client</h6>
            <input type="text" v-model="client_search" class="form-control" @change="searchClients" />
            <div class="row mt-3">
              <div class="row border p-2 mb-2" v-for="client in searched_client">
                <div class="col-8">
                  <h6> {{ client.fullname }} </h6>
                  <span> {{ client.id }} </span>
                </div>
                <div class="col-4">
                  <button class="btn btn-primary" @click="addClientToGroup(client)">
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </button>
                </div>

              </div>
            </div>
          </div>
          <div class="col-7">
            <div class="row border p-2 mb-2" v-for="client in group_clients">
              <div class="col-6">
                <h6> {{ client.fullname }} </h6>
                <span> {{ client.id }} </span>
              </div>
              <div class="col-4">
                <button class="btn btn-primary" @click="removeClientFromGroup(client)">
                  <ion-icon name="close-outline"></ion-icon>
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
      <CRow>
        <CCol :md="12">
          <div v-show="message && !success" class="error_style">
            {{ message }}
          </div>
          <div v-show="message && success" class="alert alert-success">
            {{ message }}
          </div>
        </CCol>
      </CRow>
    </div>
    <div class="card-footer text-end">
      <a @click="createGroup()" class="btn btn-outline-success ajax">Save</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'create_group',
  data() {
    return {
      message: '',
      client_search: '',
      searched_client: {},
      success: false,
      group: {
        title: '',
        crew_id: '',
      },
      crews: {},
      group_clients: []
    }
  },
  mounted() {
    this.getCrews()
  },
  methods: {
    async isAdded(client) {
      let added = false
      this.group_clients.forEach((cln) => {
        if (client.id === cln.id) {
          added = true
        }
      })
      return added
    },
    getCrews: async function () {
      await this.$axios.get(`/crews/all`).then((response) => {
        this.crews = response.data
      })
    },
    searchClients: async function () {
      await this.$axios
        .get(`/clients/paginate`, {
          params: { name: this.client_search, per_page: 500 },
        })
        .then((response) => {
          this.searched_client = response.data.data
        })
    },
    addClientToGroup(client) {

      const index = this.searched_client.indexOf(client);
      if (index > -1) { // only splice array when item is found
        this.searched_client.splice(index, 1); // 2nd parameter means remove one item only
      }
      if (!this.group_clients.includes(client)) {
        this.group_clients.push(client)
      }
    },
    removeClientFromGroup(client) {
      const index = this.group_clients.indexOf(client);
      if (index > -1) { // only splice array when item is found
        this.group_clients.splice(index, 1); // 2nd parameter means remove one item only
      }
      if (!this.searched_client.includes(client)) {
        this.searched_client.push(client)
      }
    },
    createGroup: async function () {
      this.group.clients = this.group_clients
      await this.$axios
        .post(`/groups/add`, this.group)
        .then((response) => {
          this.message = response.data.message
          if (response.data.success) {
            this.$router.push({ name: 'groups' })
          }
          else {
            this.success = false
          }
        })
        .catch((error) => {
          if (error.response) {
            this.message = error.response.data.message
          } else {
            this.message = error.message
          }
          this.success = false
        })
    },
  }
}
</script>
