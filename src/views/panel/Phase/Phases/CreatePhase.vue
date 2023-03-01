<template>
  <div class="card border-success mb-4">
    <div class="card-header">Create Phase</div>
    <div class="row mt-4">
      <div class="col-12" v-if="!success">
        <form @submit.prevent="createPhase">
          <div class="card-body">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="phase.title"
                name="title"
                placeholder="Title..."
                required
                autofocus
                autocomplete="off"
              />
              <label for="title">Title</label>
              <div class="invalid-feedback"></div>
            </div>
          </div>
        </form>
      </div>
      <div v-if="!success" class="col-12 text-center">
        <h6>Assigned Services to this Phase</h6>
        <div class="row ms-0 p-4" v-if="searched_services">
          <div class="col-6 p-3">
            <div
              class="row mt-3 no-bars ms-0 border-dark"
              style="height: 300px; overflow: scroll"
            >
              <div
                class="row border p-2 mb-2 ms-0"
                v-for="service in searched_services"
                :key="service.id"
              >
                <div class="col-8">
                  <h6>{{ service.title }}</h6>
                  <span> {{ service.id }} </span>
                </div>
                <div class="col-4">
                  <button
                    class="btn btn-primary"
                    @click="addServiceToPhase(service)"
                  >
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-6 p-3 no-bars"
            v-if="phase_services"
            style="height: 300px; overflow: scroll"
          >
            <div
              class="row mt-3 border p-2 mb-2"
              v-for="service in phase_services"
              :key="service.id"
            >
              <div class="col-6">
                <h6>{{ service.title }}</h6>
                <span> {{ service.id }} </span>
              </div>
              <div class="col-4">
                <button
                  class="btn btn-primary"
                  @click="removeServiceFromPhase(service)"
                >
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
      <button
        @click="createPhase"
        :disabled="phase_services.length === 0"
        class="btn btn-success text-white"
        v-if="!success"
      >
        Create phase
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreatePhase',
  data: () => ({
    message: '',
    service_search: '',
    searched_services: [],
    success: false,
    phase: {
      title: '',
    },
    phase_services: [],
  }),
  methods: {
    async isAdded(service) {
      let added = false
      this.phase_services.forEach((cln) => {
        if (service.id === cln.id) {
          added = true
        }
      })
      return added
    },
    async addServiceToPhase(service) {
      if (!(await this.isAdded(service))) {
        const index = this.searched_services.indexOf(service)
        if (index > -1) {
          // only splice array when item is found
          // 2nd parameter means remove one item only
          this.searched_services.splice(index, 1)
        }
        if (!this.phase_services.includes(service)) {
          this.phase_services.push(service)
        }
      }
    },
    removeServiceFromPhase(client) {
      const index = this.phase_services.indexOf(client)
      if (index > -1) {
        /* only splice array when item is found
         2nd parameter means remove one item only */
        this.phase_services.splice(index, 1)
      }
      if (!this.searched_services.includes(client)) {
        this.searched_services.push(client)
      }
    },
    async createPhase() {
      this.phase.services = this.phase_services
      await this.$axios
        .post('/phases/add', this.phase)
        .then((response) => {
          this.message = response.data.message
          if (response.data.success) {
            this.$router.push({ name: 'All Phases' })
          } else {
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
  },
  async mounted() {
    await this.$axios
      .get('/services?per_page=1000')
      .then((response) => (this.searched_services = response.data))
  },
}
</script>

<style scoped="scoped">
.no-bars {
  overflow-y: scroll;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
}

.no-bars::-webkit-scrollbar {
  /* WebKit */
  width: 0;
  height: 0;
}
</style>
