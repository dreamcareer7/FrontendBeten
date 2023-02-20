<template>
  <div class="card border-success mb-4">
    <div class="card-header">
      Create Group
    </div>

    <div id="ialert" class="" role="alert"></div>
    <form method="post">
      <div class="card-body">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="model"
            name="model"
            placeholder="Model..."
            required
            autofocus
            autocomplete="off"
            v-model="vehicle.model"
          />

          <label for="model">Model</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            v-model="vehicle.manufacturer"
            class="form-control"
            id="manufactory"
            name="manufactory"
            placeholder="Manufactory..."
            required
            autocomplete="off"
          />
          <label for="manufactory">Manufactory</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            v-model="vehicle.year"
            id="year"
            name="year"
            placeholder="Manufactory..."
            required
            autocomplete="off"
          />
          <label for="year">Year</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="registration"
            name="registration"
            placeholder="Registration..."
            required
            autocomplete="off"
            v-model="vehicle.registration"
          />
          <label for="registration">Registration</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="badge"
            v-model="vehicle.badge"
            name="badge"
            placeholder="Badge..."
            required
            autocomplete="off"
          />
          <label for="badge">Badge</label>
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
        <a class="btn btn-outline-success ajax" @click="addVehicle">Save</a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'create_vehicle',
  data() {
    return {
      message: '',
      success: false,
      vehicle: {},
      form: {},
      user_id: null,
    }
  },
  mounted() {
    this.user_id = this.$route.params.id
    this.fetchUserInfo(this.user_id)
  },
  methods: {
    addVehicle: async function () {
      await axios
        .post(`/vehicles/add`, this.vehicle)
        .then((response) => {
          this.message = response.data.message
          if (response.data.success) {
            this.success = true
            this.vehicle = {}
          }
          else{
            this.success=  false
          }
        })
        .catch((error) => {
          if (error.response) {
            this.message = error.response.data.message
          } else {
            this.message = error.message
          }
          this.success=  false

        })
    },
  },
}
</script>
