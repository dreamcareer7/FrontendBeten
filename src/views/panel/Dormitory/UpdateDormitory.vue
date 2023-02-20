<template>
  <div class="card border-success mb-4">
    <div class="card-header">Update Dormitory</div>

    <div id="ialert" class="" role="alert"></div>
    <form method="post">
      <div class="card-body">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="title"
            name="title"
            placeholder="Title..."
            required
            autofocus
            autocomplete="off"
            v-model="dormitory.title"
          />
          <label for="title">Title</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="phones"
            name="phones"
            placeholder="Phones..."
            v-model="dormitory.phone"
            required
            autocomplete="off"
          />
          <label for="phones">Phones</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <select
            name="city"
            id="city"
            v-model="dormitory.city_id"
            class="form-control"
          >
            <option>Choose City</option>
            <option value="1">City 1</option>
          </select>
          <label for="city">City</label>
          <div class="invalid-feedback"></div>
        </div>
        <div class="form-floating mb-3">
          <select
            name="city"
            id="country"
            v-model="dormitory.country"
            class="form-control"
          >
            <option>Choose Country</option>
            <template v-for="country in countries" :key="country.code">
              <option :value="country.code">{{ country.name }}</option>
            </template>
          </select>
          <label for="city">Country</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="location"
            name="location"
            placeholder="Location..."
            required
            v-model="dormitory.location"
            autocomplete="off"
          />
          <label for="location">Location</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="coordinate"
            name="coordinate"
            placeholder="coordinate..."
            required
            v-model="dormitory.coordinate"
            autocomplete="off"
          />
          <label for="coordinate">Coordinate</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="row g-1 mb-1">
          <div class="col">
            <div class="border rounded px-1">
              <div class="form-switch">
                <input type="hidden" value="0" name="is_active" />
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="1"
                  name="is_active"
                  checked
                  id="is_active"
                  v-model="dormitory.is_active"
                />
                <label class="form-check-label" for="is_active"
                  >Is Active</label
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
        <a class="btn btn-outline-success ajax" @click="updateDormitory">Save Changes</a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import countries from '../../../store/countries'

export default {
  name: 'create_dormitory',
  data() {
    return {
      message: '',
      success: false,
      dormitory: {},
      form: {},
      dormitory_id: null,
      countries,
    }
  },
  mounted() {
    this.dormitory_id = this.$route.params.id
    this.fetchUserInfo(this.dormitory_id)
  },
  methods: {
    updateDormitory: async function () {
      await axios
        .post(`/dormitories/update/` + this.dormitory_id, this.dormitory)
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
    fetchUserInfo: async function (id) {
      await axios.get(`/dormitories/info/` + id).then((response) => {
        this.user = response.data.data
      })
    },
  },
}
</script>

