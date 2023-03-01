<template>
  <div class="card border-warning mb-4">
    <div class="card-header">Update Dormitory</div>
    <form @submit.prevent="update">
      <div class="card-body">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="title"
            required
            autofocus
            autocomplete="off"
            v-model="dormitory.title"
          />
          <label for="title">Title</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="phones"
            v-model="dormitory.phones"
            required
            autocomplete="off"
          />
          <label for="phones">Phones</label>
        </div>

        <div class="form-floating mb-3">
          <select
            name="city"
            id="city"
            v-model="dormitory.city_id"
            class="form-control"
          >
            <option>Choose City</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.title }}
            </option>
          </select>
          <label for="city">City</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="location"
            required
            v-model="dormitory.location"
            autocomplete="off"
          />
          <label for="location">Location</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="coordinate"
            v-model="dormitory.coordinate"
            autocomplete="off"
          />
          <label for="coordinate">Coordinate</label>
        </div>

        <div class="row g-1 mb-1">
          <div class="col">
            <div class="border rounded px-1">
              <div class="form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="1"
                  name="is_active"
                  :checked="dormitory.is_active"
                  id="is_active"
                  v-model="dormitory.is_active"
                />
                <label class="form-check-label" for="is_active">
                  Active
                </label>
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
        <button class="btn btn-warning text-white" type="submit">
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UpdateDormitory',
  data: () => ({
    message: '',
    success: false,
    dormitory: {},
    cities: [],
  }),
  methods: {
    update: async function () {
      await this.$axios
        .patch(`/dormitories/${this.dormitory.id}`, this.dormitory)
        .then((response) => {
          this.message = response.data.message
          if (response.data.success) {
            this.$router.push({ name: 'dormitories' })
          } else {
            this.success = false
          }
        }).catch((error) => {
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
    this.$axios.get('/cities').then((response) => this.cities = response.data)
    await this.$axios
      .get(`/dormitories/${this.$decrypt(this.$route.params.id)}`)
      .then((response) => {
        this.dormitory = response.data
      })
  },
}
</script>
