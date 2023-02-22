<template>
<div class="card border-success mb-4">
	<div class="card-header">
		Create Service
	</div>

	<div id="ialert" class="" role="alert"></div>
	<form method="post">
      <div class="card-body">

          <div class="form-floating mb-3">
              <input type="text" class="form-control" id="title" v-model="service.title" name="title" placeholder="Title..." required autofocus autocomplete="off">
              <label for="title">Title</label>
              <div class="invalid-feedback"></div>
          </div>

          <div class="form-floating mb-3">
              <select v-model="service.country_id" name="country_id" id="country_id" class="form-control">
                  <option>Choose Country</option>
                  <template v-for="country in countries" :key="country.code">
                    <option :value="country.id">{{ country.name }}</option>
                  </template>
              </select>
              <label for="country_id">Country</label>
              <div class="invalid-feedback"></div>
          </div>

          <div class="row g-1 mb-1">
          <div class="col">
              <div class="form-floating mb-3">
              <input type="date" class="form-control" id="before_date" v-model="service.before_date" name="before_date" placeholder="Before date...">
              <label for="phone">Before date</label>
              <div class="invalid-feedback"></div>
              </div>

              <div class="form-floating mb-3">
              <input type="date" class="form-control" id="exact_date" v-model="service.exact_date" name="exact_date" placeholder="Exact date...">
              <label for="phone">Exact Date</label>
              <div class="invalid-feedback"></div>
              </div>

              <div class="form-floating mb-3">
              <input type="date" class="form-control" id="after_date" v-model="service.after_date" name="after_date" placeholder="After date...">
              <label for="phone">After date</label>
              <div class="invalid-feedback"></div>
              </div>
          </div>


          </div>


      </div>

	<div class="card-footer text-end">
      <a @click="createService()" class="btn btn-outline-success ajax">Save</a>
	</div>
	</form>
</div>
</template>


<script>
import axios from 'axios'
import countries from '@/store/countries'

export default {
  name: 'create_service',
  data() {
    return {
      service: {
        title: '',
        country_id: '',
        before_date: '',
        exact_date: '',
        after_date: '',
      },
      countries: [],
    }
  },
  mounted() {
    countries.fetchCountries().then((countries) => {
      this.countries = countries
    })
  },
  methods: {
    createService: async function () {
      let service = this.service;
      await axios.post(`/services`, service).then((response) => {
        this.$router.push({ name: 'Services' })
      }).catch(err => console.log(err))
    },
  },
}
</script>
