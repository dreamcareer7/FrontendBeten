<template>
  <div class="card border-success mb-4">
    <div class="card-header">Update Service</div>
    <form>
      <div class="card-body">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="service.title"
            placeholder="Title..."
            required
            autofocus
            autocomplete="off"
          />
          <label for="title">Title *</label>
        </div>
        <div class="form-floating mb-3">
          <select
            class="form-select"
            id="city"
            aria-label="Choose city"
            v-model="service.city_id"
            required
          >
            <option>Choose city</option>
            <option v-for="city in cities" :value="city.id" :key="city.id">
              {{ city.title }}
            </option>
          </select>
          <label for="city">City *</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="date"
            class="form-control"
            id="before_date"
            v-model="service.before_date"
            name="before_date"
            placeholder="Before date..."
          />
          <label for="phone">Before date</label>
          <div class="invalid-feedback"></div>
        </div>
        <div class="form-floating mb-3">
          <input
            type="date"
            class="form-control"
            id="exact_date"
            v-model="service.exact_date"
            name="exact_date"
            placeholder="Exact date..."
          />
          <label for="phone">Exact Date</label>
          <div class="invalid-feedback"></div>
        </div>
        <div class="form-floating mb-3">
          <input
            type="date"
            class="form-control"
            id="after_date"
            v-model="service.after_date"
            name="after_date"
            placeholder="After date..."
          />
          <label for="phone">After date</label>
          <div class="invalid-feedback"></div>
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
        <span class="float-start">* Required fields</span>
        <button @click.prevent="updateService()" class="btn btn-success text-white">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import cities from '@/store/cities'

export default {
  name: 'UpdateService',
  data: () => ({
    message: '',
    success: false,
    service: {},
    service_id: null,
    cities: [],
  }),
  methods: {
    updateService: async function () {
      let service = this.service;
      await this.$axios.put(`/services/`+ this.service_id, service)
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
    fetchServiceInfo: async function (id) {
      await this.$axios.get(`/services/` + id).then((response) => {
        this.service = {
          ...response.data.data,
          before_date: response.data.data.before_date?.substring(0, 10),
          exact_date: response.data.data.exact_date?.substring(0, 10),
          after_date: response.data.data.after_date?.substring(0, 10)
        }
      })
    },
  },
  mounted() {
    cities.fetchCities().then((cities) => {
      this.cities = cities
    })
    this.service_id = this.$decrypt(this.$route.params.id)
    this.fetchServiceInfo(this.service_id)
  },
}
</script>
