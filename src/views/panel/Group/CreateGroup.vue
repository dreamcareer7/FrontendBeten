<template>
  <div class="card border-success mb-4">
    <div class="card-header">Create Group</div>

    <div class="row mt-4">
      <div class="col-4">
        <form method="post">
          <div class="card-body">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="group.title"
                name="title"
                placeholder="Title..."
                required
                autofocus
                autocomplete="off"
              />
              <label for="title">Title</label>
              <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-3">
              <select
                v-model="group.crew_id"
                name="crew_id"
                id="crew_id"
                class="form-control"
              >
                <option>Choose Crew</option>
                <template v-for="crew in crews" :key="crew.id">
                  <option value="{{ crew.id }}">{{ crew.fullname }}</option>
                </template>
              </select>
              <label for="crew_id">Crew</label>
              <div class="invalid-feedback"></div>
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
        </form>
      </div>
      <div class="col-8 text-center">
        <h6>Assign Members to this Group</h6>
        <div class="row">
          <div class="col-4">
            <h6>Search</h6>
            <input type="text" v-model="client_search" class="form-control" @change="searchClients" />
            <div class="row mt-3">
              <div class="col-12 card" v-for="client in searched_client" @click="addClientToGroup(client)">
               <h6>  {{ client.fullname }} </h6>
                <span> {{ client.country_id}} </span>
              </div>
            </div>
          </div>
          <div class="col-8"></div>
        </div>
      </div>
    </div>
    <div class="card-footer text-end">
      <a @click="createGroup()" class="btn btn-outline-success ajax">Save</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
    }
  },
  mounted() {
    this.getCrews()
  },
  methods: {
    getCrews: async function () {
      await axios.get(`/crews/all`).then((response) => {
        this.crews = response.data
      })
    },
    searchClients: async function () {
      await axios
        .get(`/clients/paginate`, {
          params: { name: this.client_search, per_page: 500 },
        })
        .then((response) => {
          this.searched_client = response.data.data
        })
    },
    addClientToGroup(client) {
      console.log(client)
    },
    createGroup: async function () {
      await axios
        .post(`/groups/add`, this.group)
        .then((response) => {
          this.message = response.data.message
          if (response.data.success) {
            this.success = true
          }
        })
        .catch((error) => {
          if (error.response) {
            this.message = error.response.data.message
          } else {
            this.message = error.message
          }
        })
    },
  },
}
</script>
