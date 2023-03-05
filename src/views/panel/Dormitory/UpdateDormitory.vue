<template>
  <div class="card border-warning mb-4">
    <div class="card-header">Update Dormitory</div>
    <form @submit.prevent="update">
      <div class="card-body">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="title"
            autocomplete="off"
            v-model="dormitory.title"
            autofocus
            required
          />
          <label for="title">Title</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="phones"
            v-model="dormitory.phones"
            autocomplete="off"
            required
          />
          <label for="phones">Phones</label>
        </div>

        <div class="form-floating mb-3">
          <select id="city_id" v-model="dormitory.city_id" class="form-control">
            <option>Choose City</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.title }}
            </option>
          </select>
          <label for="city_id">City</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="location"
            v-model="dormitory.location"
            autocomplete="off"
            required
          />
          <label for="location">Location</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="coordinate"
            v-model="dormitory.coordinate"
            autocomplete="off"
          />
          <label for="coordinate">Coordinate</label>
        </div>

        <div class="row g-1 mb-1">
          <div class="col">
            <div class="border rounded px-1">
              <div class="form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :checked="dormitory.is_active"
                  id="is_active"
                  v-model="dormitory.is_active"
                />&nbsp;
                <label class="form-check-label" for="is_active">Active</label>
              </div>
            </div>
          </div>
        </div>
        <CRow v-if="error_message">
          <CCol :md="12">
            <div class="error_style">
              {{ error_message }}
            </div>
          </CCol>
        </CRow>
      </div>
      <div class="card-footer text-end">
        <button class="btn btn-warning text-white" type="submit">
          <ion-icon name="save-outline"></ion-icon>&nbsp; Save Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UpdateDormitory',
  data: () => ({
    error_message: '',
    dormitory: {},
    cities: [],
  }),
  methods: {
    update: async function () {
      await swal({
        title: 'Are you sure?',
        text: 'Click confirm to update, this action is irreversible',
        icon: 'warning',
        buttons: ['Cancel', 'Confirm'],
      }).then((willUpdate) => {
        if (willUpdate) {
          this.$axios
            .patch(`/dormitories/${this.dormitory.id}`, this.dormitory)
            .then(() => {
              this.$router.push({ name: 'Dormitories' })
              swal('Updated successfully!', {
                icon: 'success',
                timer: 3000,
              })
            })
            .catch(
              (error) =>
                (this.error_message =
                  error.response?.data.message || error.message),
            )
        }
      })
    },
  },
  async mounted() {
    this.$axios.get('/cities').then((response) => (this.cities = response.data))
    await this.$axios
      .get(`/dormitories/${this.$decrypt(this.$route.params.id)}`)
      .then((response) => {
        this.dormitory = response.data
      })
  },
}
</script>
