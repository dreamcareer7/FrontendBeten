<template>
  <div class="card border-success mb-4">
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
          <select
            v-model="crew.country_id"
            name="country"
            id="country"
            class="form-control"
          >
            <option>Choose Country</option>
            <template v-for="country in countries" :key="country.code">
              <option :value="country.id">{{ country.name }}</option>
            </template>
          </select>
          <label for="country_id">Country</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <select
            v-model="crew.profession_id"
            name="profession"
            id="profession"
            class="form-control"
          >
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
                <label
                  class="form-check-label"
                  style="margin-left: 0.4em"
                  for="is_handicap"
                  >Is Handicap?</label
                >
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
        <a @click="createCrew()" class="btn btn-success text-white">
          <svg
            clip-rule="evenodd"
            class="button-icon"
            fill-rule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m21 3.998c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-16.5.5h15v15h-15zm6.75 6.752h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
              fill-rule="nonzero"
            />
          </svg>
          <span>Save</span>
        </a>
      </div>
    </form>
  </div>
</template>

<script>
import countries from '@/store/countries'

export default {
  name: 'CreateCrew',
  data() {
    return {
      message: '',
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
          title: 'Developer',
        },
        {
          id: 2,
          title: 'Doctor',
        },
        {
          id: 3,
          title: 'Engineer',
        },
        {
          id: 4,
          title: 'Accountant',
        },
      ],
    }
  },
  methods: {
    createCrew: async function () {
      let crew = this.crew
      await this.$axios
        .post(`/crews/add`, crew)
        .then((response) => {
          this.message = response.data.message
          if (response.data.success) {
            this.$router.push({name: 'crews'})
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
  mounted() {
    countries.fetchCountries().then((countries) => {
      this.countries = countries
    })
  },
}
</script>
