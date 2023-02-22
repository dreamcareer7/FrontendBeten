<template>
  <div class="card border-success mb-4">
    <div class="card-header">
      Create Client
    </div>

    <div id="ialert" class="" role="alert"></div>
    <form method="post">
      <div class="card-body">

        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="fname" name="fullname" placeholder="Full Name..." required autofocus autocomplete="off"  v-model="client.fullname">
          <label for="fname">Full Name</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <select name="gender" id="gender" class="form-control"  v-model="client.gender">
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>
          <label for="gender">Gender</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <select name="country_id" id="country_id" class="form-control"  v-model="client.country_id">
            <option>Choose Country</option>
            <option :value="c.id" v-for="c in countries" :key="c.code">
              {{ c.name }}
            </option>
          </select>
          <label for="country_id">Country</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="row g-1 mb-1">
          <div class="col">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="phone" name="phone" placeholder="Phone Number..."  v-model="client.phone">
              <label for="phone">Phone Number</label>
              <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="id_type" name="id_type" placeholder="ID Type..."  v-model="client.id_type">
              <label for="phone">ID Type</label>
              <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="id_number" name="id_number" placeholder="ID Number..."  v-model="client.id_no">
              <label for="phone">ID Number</label>
              <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-3">
              <input type="date" class="form-control" id="dob" name="dob" placeholder="Date of Birth..."  v-model="client.dob">
              <label for="phone">Date of Birth</label>
              <div class="invalid-feedback"></div>
            </div>

            <div class="border rounded px-1">
              <div class="form-switch">
                <input type="hidden"  value="0" name="is_handicap">
                <input class="form-check-input" type="checkbox"  value="1" name="is_handicap" checked id="is_handicap" v-model="client.is_handicap">
                <label class="form-check-label"  style="margin-left: .4em;" for="is_handicap">Is Handicap?</label>
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
        <button class="btn text-white btn-success" @click.prevent="addClient">
          <svg class="button-icon" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m20 20h-15.25c-.414 0-.75.336-.75.75s.336.75.75.75h15.75c.53 0 1-.47 1-1v-15.75c0-.414-.336-.75-.75-.75s-.75.336-.75.75zm-1-17c0-.478-.379-1-1-1h-15c-.62 0-1 .519-1 1v15c0 .621.52 1 1 1h15c.478 0 1-.379 1-1zm-15.5.5h14v14h-14zm6.25 6.25h-3c-.414 0-.75.336-.75.75s.336.75.75.75h3v3c0 .414.336.75.75.75s.75-.336.75-.75v-3h3c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3v-3c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg>
          <span>Save</span>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
import countries from '@/store/countries'

export default {
  name: 'create_client',
  data() {
    return {
      message: '',
      success: false,
      client: {},
      form: {},
      user_id: null,
      countries: [],
    }
  },
  mounted() {
    this.user_id = this.$route.params.id
    countries.fetchCountries().then((countries) => {
      this.countries = countries
    })
  },
  methods: {
    addClient: async function () {
      await axios
        .post(`/clients/add`, this.client)
        .then((response) => {
          this.message = response.data.message
          if (response.data.success) {
            this.success = true
            this.client={}
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
        })
    },
  },
}
</script>
