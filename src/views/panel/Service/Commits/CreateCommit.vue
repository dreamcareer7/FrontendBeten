<template>
  <div class="card border-success mb-4">
    <div class="card-header">Create commit</div>
    <form @submit.prevent="create">
      <div class="card-body">
        <div class="form-floating mb-3">
          <select
            id="service_id"
            class="form-control"
            v-model="commit.service_id"
            autofocus
            required
          >
            <option>Choose Service</option>
            <option v-for="service in services" :value="service.id">
              {{ service.title }}
            </option>
          </select>
          <label for="service_id">Service</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="badge"
            autocomplete="off"
            v-model="commit.badge"
            required
          />
          <label for="badge">Badge</label>
        </div>

        <div class="row g-1 mb-1">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                type="datetime-local"
                step="1"
                class="form-control"
                id="scheduled_at"
                v-model="commit.schedule_at"
              />
              <label for="scheduled_at">Scheduled At</label>
            </div>
          </div>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="from_location"
            autocomplete="off"
            v-model="commit.from_location"
            required
          />
          <label for="from_location">From Location</label>
        </div>

        <div class="form-floating mb-3">
          <select
            id="supervisor_id"
            class="form-control"
            v-model="commit.supervisor_id"
          >
            <option>Choose a supervisor</option>
            <option v-for="user in users" :value="user.id">
              {{ user.name }}
            </option>
          </select>
          <label for="supervisor_id">Supervisor</label>
        </div>
      </div>

      <CRow v-if="error_message">
        <CCol :md="12">
          <div class="error_style">
            {{ error_message }}
          </div>
        </CCol>
      </CRow>

      <div class="card-footer text-end">
        <button type="submit" class="btn text-white btn-success" :disabled="disabled">
          <ion-icon name="create"></ion-icon>&nbsp;
          <span>Create</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ['service'],
  name: 'CreateCommit',
  data: () => ({
    error_message: '',
    services: [],
    // A key/value pair of crew member name/id to select the supervisor
    users: [],
    commit: {},
  }),
  computed: {
    disabled() {
      return this.users.length === 0
    }
  },
  methods: {
    async create() {
      // Send the service commit object to the API for creation
      this.commit.schedule_at = this.commit.schedule_at.replace('T', ' ')
      await this.$axios
        .post('/service_commits', this.commit)
        .then(() => this.$router.push({ name: 'Service Commits' }))
        .catch((error) => {
          if (error.response) {
            this.error_message = error.response?.data.message || error.message
          }
        })
    },
  },
  mounted() {
    this.$axios
      .get('service/list')
      .then((response) => (this.services = response.data))
    this.$axios
      .get('/users')
      .then((response) => (this.users = response.data.data))
    if (this.$props.service) {
      this.commit.service_id = this.service
      this.commit.phase_id = this.$decrypt(this.$route.params.id)
    }
  },
}
</script>
