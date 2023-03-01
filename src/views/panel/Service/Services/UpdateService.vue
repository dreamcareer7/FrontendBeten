<template>
  <div class="card border-success mb-4">
    <div class="card-header">Update Service</div>
    <form @submit.prevent="updateService">
      <div class="card-body">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="service.title"
            label="Title..."
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
            for="before_date"
            v-model="service.before_date"
            label="Before date..."
          />
          <label for="phone">Before date</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="date"
            class="form-control"
            for="exact_date"
            v-model="service.exact_date"
            label="Exact date..."
          />
          <label for="phone">Exact Date</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="date"
            class="form-control"
            for="after_date"
            v-model="service.after_date"
            label="After date..."
          />
          <label for="phone">After date</label>
        </div>
        <CRow>
          <CCol :md="12">
            <div v-show="message" class="error_style">
              {{ message }}
            </div>
            <div v-show="message" class="alert alert-success">
              {{ message }}
            </div>
          </CCol>
        </CRow>
      </div>
      <div class="card-footer text-end">
        <span class="float-start">* Required fields</span>
        <button class="btn btn-success text-white" type="submit">Save</button>
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
    service: {},
    cities: [],
  }),
  methods: {
    updateService: async function () {
      await this.$axios
        .put(`/services/${this.service.id}`, this.service)
        .then(() => this.$router.push({ name: 'Services' }))
    },
    fetchServiceInfo: async function (id) {
      await this.$axios.get(`/services/` + id).then((response) => {
        this.service = {
          ...response.data.data,
          before_date: response.data.data.before_date?.substring(0, 10),
          exact_date: response.data.data.exact_date?.substring(0, 10),
          after_date: response.data.data.after_date?.substring(0, 10),
        }
      })
    },
  },
  async mounted() {
    cities.fetchCities().then((cities) => this.cities = cities)
    const service_id = this.$decrypt(this.$route.params.id)
    await this.$axios.get(`/services/${service_id}`).then((response) => {
        this.service = {
          ...response.data.data,
          before_date: response.data.data.before_date?.substring(0, 10),
          exact_date: response.data.data.exact_date?.substring(0, 10),
          after_date: response.data.data.after_date?.substring(0, 10),
        }
      })
  },
}
</script>
