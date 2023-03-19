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
        <CRow v-if="true">
          <CCol :md="12">
            <div v-show="error_message" class="error_style">
              {{ error_message }}
            </div>
          </CCol>
        </CRow>
      </div>
      <div class="card-footer text-end">
        <span class="float-start">* Required fields</span>
        <button class="btn btn-warning text-white" @click.prevent="$router.go(-1)">
        Go Back
      </button>&nbsp;
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
    error_message: '',
    service: {},
    cities: [],
    counter:0,
  }),
  methods: {
    updateService: async function () {
        this.$axios
          .patch(`/services/${this.service.id}`, this.service)
          .then(() => {
            this.$router.push({ name: 'Services' })
            swal('Updated successfully!', {
              icon: 'success',
              timer: 3000,
            })
          })
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
    cities.fetchCities().then((cities) => (this.cities = cities))
    const service_id = this.$decrypt(this.$route.params.id)
    await this.$axios.get(`/services/${service_id}`).then((response) => {
      this.service = response.data
    })
  },
  watch:{
    immediate: true,
    deep: true,
    'service.before_date' :function(newVal , oldVal){
      debugger
        if(this.counter < 3){
          this.counter = this.counter + 1
        }else{
          if((oldVal == null || oldVal == undefined )){
          this.service.before_date  = null
            this.error_message="you are not allow to use new date type"
          }
        }
    },
    'service.exact_date' :function(newVal , oldVal){
      if(this.counter  < 3){
          this.counter = this.counter + 1
      }else{
        if((oldVal == null || oldVal == undefined )){
          this.service.exact_date  = null
          this.error_message="you are not allow to use new date type"
        }
      }
    },
    'service.after_date' :function(newVal , oldVal){
      if(this.counter  < 3){
          this.counter = this.counter + 1
      }else{
        if((oldVal == null || oldVal == undefined )){
          this.service.after_date  = null
          this.error_message="you are not allow to use new date type"
        }
      }
    }
  }
}
</script>
