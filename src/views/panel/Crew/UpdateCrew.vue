<template>
  <div class="card border-warning mb-4">
    <div class="card-header">Create Crew</div>

    <div id="ialert" class="" role="alert"></div>
    <form method="post">
      <div class="card-body">
        <div class="form-floating mb-3">
          <input
            v-model="crew.fullname"
            type="text"
            class="form-control"
            id="fname"
            name="fullname"
            placeholder="Full Name..."
            required
            autofocus
            autocomplete="off"
          />
          <label for="fname">Full Name</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <select
            v-model="crew.gender"
            name="gender"
            id="gender"
            class="form-control"
          >
            <option value="1">Male</option>
            <option value="0">Female</option>
          </select>
          <label for="gender">Gender</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
            <select v-model="crew.country_id" name="country" id="country" class="form-control">
                <option>Choose Country</option>
                <template v-for="country in countries" :key="country.code">
                  <option :value="country.id">{{ country.name }}</option>
                </template>
            </select>
            <label for="country_id">Country</label>
            <div class="invalid-feedback"></div>
        </div>


        <div class="form-floating mb-3">
            <select v-model="crew.profession_id" name="profession" id="profession" class="form-control">
                <option>Choose Profession</option>
                <template v-for="profession in professions" :key="profession.id">
                  <option :value="profession.id">{{ profession.title }}</option>
                </template>
            </select>
            <label for="profession_id">Profession</label>
            <div class="invalid-feedback"></div>
        </div>

        <div class="row g-1 mb-1">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                v-model="crew.phone"
                type="text"
                class="form-control"
                id="phone"
                name="phone"
                placeholder="Phone Number..."
              />
              <label for="phone">Phone Number</label>
              <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-3">
              <input
                v-model="crew.id_type"
                type="text"
                class="form-control"
                id="id_type"
                name="id_type"
                placeholder="ID Type..."
              />
              <label for="phone">ID Type</label>
              <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-3">
              <input
                v-model="crew.id_number"
                type="text"
                class="form-control"
                id="id_number"
                name="id_number"
                placeholder="ID Number..."
              />
              <label for="phone">ID Number</label>
              <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-3">
              <input
                v-model="crew.dob"
                type="date"
                class="form-control"
                id="dob"
                name="dob"
                placeholder="Date of Birth..."
              />
              <label for="phone">Date of Birth</label>
              <div class="invalid-feedback"></div>
            </div>

            <div class="border rounded px-1">
              <div class="form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="crew.is_handicap"
                  name="is_handicap"
                  checked
                  id="is_handicap"
                />
                <label class="form-check-label" style="margin-left: .4em;" for="is_handicap">Is Handicap?</label>
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
        <button @click.prevent="updateCrew()" class="btn btn-outline-success ajax">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import countries from '@/store/countries'

export default {
  name: 'create_crew',
  data() {
    return {
      message: '',
      crew_id: null,
      success: false,
      crew: {
        fullname: '',
        gender: '',
        profession_id: '',
        country_id: '',
        phone: '',
        id_type: '',
        id_number: '',
        dob: '',
        is_handicap: false,
      },
      countries: [],
      professions: [
        {
          id: 1,
          title: "Developer"
        },
        {
          id: 2,
          title: "Doctor"
        },
        {
          id: 3,
          title: "Engineer"
        },
        {
          id: 4,
          title: "Accountant"
        },
      ]
    }
  },
  mounted() {
    this.countries = countries;
    this.crew_id = this.$decrypt(this.$route.params.id)
    countries.fetchCountries().then((countries) => {
      this.countries = countries
    })
    this.fetchCrewInfo(this.crew_id)
  },
  methods: {
    updateCrew: async function () {
      let crew = this.crew;
      await this.$axios.post(`/crews/update/`+ this.crew_id, crew)
        .then((response) => {
          this.message = response.data.message
          if (response.data.success) {
            this.$router.push({name: 'crews'})
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
    fetchCrewInfo: async function (id) {
      await this.$axios.get(`/crews/info/` + id).then((response) => {
        this.crew = response.data
      })
    },
  },
}
</script>
