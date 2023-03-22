<template>
  <div class="card border-success mb-4">
    <div class="card-header">Create client</div>
    <form @submit.prevent="create">
      <div class="card-body">
        <div class="form-floating mb-3">
          <input
            id="fullname"
            class="form-control"
            type="text"
            v-model="client.fullname"
            autocomplete="off"
            required
            autofocus
          />
          <label for="fullname">Full Name</label>
        </div>

        <div class="form-floating mb-3">
          <select
            id="country"
            class="form-control"
            v-model="client.country_id"
            required
          >
            <option>Choose Country</option>
            <option
              v-for="country in countries"
              :value="country.id"
              :key="country.id"
            >
              {{ country.title }}
            </option>
          </select>
          <label for="country">Country</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="id_type"
            v-model="client.id_type"
            required
          />
          <label for="id_type">ID Type</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="id_number"
            v-model="client.id_number"
          />
          <label for="id_number">ID Number</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="id_name"
            v-model="client.id_name"
          />
          <label for="id_name">ID Name</label>
        </div>

        <div class="form-floating mb-3">
          <select id="gender" class="form-control" v-model="client.gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label for="gender">Gender</label>
        </div>

        <div class="form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="is_handicap"
            v-model="client.is_handicap"
          />
          <label class="form-check-label" for="is_handicap">
            &nbsp;is Handicap?
          </label>
        </div>

        <div class="row" v-if="error_message">
          <div class="col" :md="12">
            <div class="error_style">
              {{ error_message }}
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer text-end">
        <button class="btn text-white btn-success" type="submit">
          <ion-icon name="person-add-outline"></ion-icon>&nbsp;Create
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import countries from '@/store/countries'

export default {
  name: 'Create client',
  data: () => ({
    error_message: '',
    client: {
      is_handicap: false,
    },
    countries: [],
  }),
  methods: {
    create: async function () {
      await this.$axios
        .post('/clients', this.client)
        .then(() => this.$router.push({ name: 'Clients' }))
        .catch(
          (error) =>
            (this.error_message =
              error.response?.data.message || error.message),
        )
    },
  },
  mounted: async function () {
    await countries
      .fetchCountries()
      .then((countries) => (this.countries = countries))
  },
}
</script>
