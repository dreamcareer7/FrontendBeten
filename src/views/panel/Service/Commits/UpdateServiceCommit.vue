<template>
  <div class="card border-warning mb-4">
    <div class="card-header">Update Service Commit</div>
    <div id="ialert" class="" role="alert"></div>
    <form method="post">
      <div class="card-body">
        <div class="form-floating mb-3">
          <select
            name="service_id"
            id="service_id"
            class="form-control"
            v-model="service_commit.service_id"
            autofocus
            required
          >
            <option :value="null">Choose Service</option>
            <option v-for="service in services" :value="service.id">
              {{ service.title }}
            </option>
          </select>
          <label for="service_id">Service</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="badge"
            name="badge"
            placeholder="Badge..."
            required
            autocomplete="off"
            v-model="service_commit.badge"
          />
          <label for="badge">Badge</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="row g-1 mb-1">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                type="datetime-local"
                class="form-control"
                id="before_date"
                name="before_date"
                placeholder="Before date..."
                v-model="service_commit.schedule_at"
              />
              <label for="phone">Scheduled At</label>
              <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-3">
              <input
                type="datetime-local"
                class="form-control"
                id="exact_date"
                name="exact_date"
                placeholder="Exact date..."
                v-model="service_commit.started_at"
              />
              <label for="phone">Started At</label>
              <div class="invalid-feedback"></div>
            </div>
          </div>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="from_location"
            name="from_location"
            placeholder="From Location..."
            required
            autocomplete="off"
            v-model="service_commit.from_location"
          />
          <label for="from_location">From Location</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <select
            name="supervisor_id"
            id="supervisor_id"
            class="form-control"
            v-model="service_commit.supervisor_id"
          >
            <option :value="null">Choose a supervisor</option>
            <option v-for="user in users" :value="user.id">
              {{ user.name }}
            </option>
          </select>
          <label for="supervisor_id">Supervisor</label>
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

      <div class="card-footer text-end">
        <button
          class="btn btn-warning text-white"
          @click.prevent="$router.go(-1)"
        >
          Go back</button
        >&nbsp;
        <button @click.prevent="update" class="btn btn-success ajax text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="button-icon"
            viewBox="0 0 24 24"
          >
            <path
              d="M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z"
            />
          </svg>
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'update_service_commit',
  data: () => ({
    message: '',
    success: false,
    services: [],
    users: [], // A key/value pair of users name/id to select the supervisor
    service_commit: {},
  }),
  methods: {
    async update() {
      await swal({
        title: this.$i18n.t('Are you sure?'),
        text: this.$i18n.t('Click confirm to update, this action is irreversible'),
        icon: 'warning',
        buttons: [this.$i18n.t('Cancel'), this.$i18n.t('Confirm')],
      }).then((willUpdate) => {
        if (willUpdate) {
          this.$axios
            .patch(
              `service_commits/${this.$decrypt(this.$route.params.id)}`,
              this.service_commit,
            )
            .then((response) => {
              // Feedback to the client
              if (response.status == 204) {
                // If updated
                this.$router.push({ name: 'Service Commits' })
                swal('Updated successfully!', {
                  icon: 'success',
                  timer: 3000,
                })
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
        }
      })
    },
  },
  mounted() {
    this.$axios
      .get('service/list')
      .then((response) => (this.services = response.data))
    this.$axios
      .get('users')
      .then((response) => (this.users = response.data.data))
    this.$axios
      .get(`/service_commits/${this.$decrypt(this.$route.params.id)}`)
      .then((response) => {
        this.service_commit = response.data
      })
  },
}
</script>
