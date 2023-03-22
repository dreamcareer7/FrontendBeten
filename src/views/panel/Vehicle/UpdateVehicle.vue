<template>
  <div class="card border-warning mb-4">
    <div class="card-header">Update Vehicle</div>

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
          <label for="manufactory">Manufacturer</label>
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
        <button
          class="btn btn-warning text-white"
          @click.prevent="$router.go(-1)"
        >
          Go Back</button
        >&nbsp;
        <a class="btn btn-warning ajax text-white" @click="updateVehicle"
          >Save Changes</a
        >
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'create_vehicle',
  data() {
    return {
      message: '',
      success: false,
      vehicle: {},
      form: {},
      vehicle_id: null,
    }
  },
  mounted() {
    this.vehicle_id = this.$decrypt(this.$route.params.id)
    this.fetchInfo(this.vehicle_id)
  },
  methods: {
    updateVehicle: async function () {
      await swal({
        title: 'Are you sure?',
        text: 'Click confirm to update, this action is irreversible',
        icon: 'warning',
        buttons: ['Cancel', 'Confirm'],
      }).then((willUpdate) => {
        if (willUpdate) {
          this.$axios
            .post(`/vehicles/update/` + this.vehicle_id, this.vehicle)
            .then((response) => {
              this.message = response.data.message
              if (response.data.success) {
                this.$router.push({ name: 'Vehicles' })
                swal('Updated successfully!', {
                  icon: 'success',
                  timer: 3000,
                })
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
        }
      })
    },
    fetchInfo: async function (id) {
      await this.$axios.get(`/vehicles/info/` + id).then((response) => {
        this.vehicle = response.data
      })
    },
  },
}
</script>
