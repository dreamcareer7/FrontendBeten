<template>
  <div class="card border-warning mb-4">
    <div class="card-header">Update role</div>
    <form @submit.prevent="updaterole">
      <div class="card-body">
        <div class="form-floating mb-3">
          <input
            class="form-control"
            id="fullname"
            type="text"
            autocomplete="off"
            v-model="role.fullname"
            required
            autofocus
          />
          <label for="fullname">Full Name</label>
        </div>

        <div class="form-floating mb-3">
          <select
            class="form-control"
            id="country_id"
            v-model="role.country_id"
            required
          >
            <option>Choose Country</option>
            <option
              :value="country.id"
              v-for="country in countries"
              :key="country.code"
            >
              {{ country.name }}
            </option>
          </select>
          <label for="country_id">Country</label>
        </div>

        <div class="form-floating mb-3">
          <input
            class="form-control"
            id="id_type"
            type="text"
            v-model="role.id_type"
            required
          />
          <label for="id_type">ID Type</label>
        </div>

        <div class="form-floating mb-3">
          <input
            class="form-control"
            id="id_number"
            type="text"
            v-model="role.id_number"
            required
          />
          <label for="id_number">ID Number</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="id_name"
            v-model="role.id_name"
            required
          />
          <label for="id_name">ID Name</label>
        </div>

        <div class="form-floating mb-3">
          <select
            id="gender"
            class="form-control"
            v-model="role.gender"
            required
          >
            <option value="Male">{{ $t('Male') }}</option>
            <option value="Female">{{ $t('Female') }}</option>
          </select>
          <label for="gender">Gender</label>
        </div>

        <div class="border rounded px-1">
          <div class="form-switch">
            <input
              class="form-check-input"
              id="is_handicap"
              type="checkbox"
              :checked="role.is_handicap"
              v-model="role.is_handicap"
            />
            <label class="form-check-label" for="is_handicap">
              &nbsp;is handicapped?
            </label>
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
        <button
          class="btn btn-warning text-white"
          @click.prevent="$router.go(-1)"
        >
          Go back</button
        >&nbsp;
        <button type="submit" class="btn text-white btn-warning">{{ $t('Save') }}</button>
      </div>
    </form>
  </div>
</template>
<script>
import countries from '@/store/countries'

export default {
  name: 'Update role',
  data: () => ({
    error_message: '',
    role: {},
    countries: [],
  }),
  methods: {
    updaterole: async function () {
      await swal({
        title: this.$i18n.t('Are you sure?'),
        text: this.$i18n.t('Click confirm to update, this action is irreversible'),
        icon: 'warning',
        buttons: [this.$i18n.t('Cancel'), this.$i18n.t('Confirm')],
      }).then((willUpdate) => {
        if (willUpdate) {
          this.$axios
            .patch(`/roles/${this.role.id}`, this.role)
            .then(() => {
              this.$router.push({ name: 'roles' })
              swal(this.$i18n.t('Updated successfully!'), {
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
    countries.fetchCountries().then((countries) => (this.countries = countries))
    await this.$axios
      .get(`/roles/${this.$decrypt(this.$route.params.id)}`)
      .then((response) => (this.role = response.data))
  },
}
</script>
