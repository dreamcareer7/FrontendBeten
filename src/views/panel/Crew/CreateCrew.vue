<template>
  <div class="card border-success mb-4">
    <div class="card-header">Create crew</div>
    <form @submit.prevent="create">
      <div class="card-body">
        <div class="form-floating mb-3">
          <select v-model="crew.user_id" id="user" class="form-control">
            <option>Choose user</option>
            <template v-for="user in data.users" :key="user.id">
              <option :value="user.id">{{ user.name }}</option>
            </template>
          </select>
          <label for="user">User</label>
        </div>

        <div class="form-floating mb-3">
          <input
            v-model="crew.fullname"
            type="text"
            class="form-control"
            id="fullname"
            autocomplete="off"
            autofocus
            required
          />
          <label for="fullname">Fullname *</label>
        </div>

        <div class="form-floating mb-3">
          <select
            class="form-control"
            id="gender"
            v-model="crew.gender"
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label for="gender">Gender *</label>
        </div>

        <div class="form-floating mb-3">
          <select
            v-model="crew.profession_id"
            id="profession"
            class="form-control"
          >
            <option>Choose profession</option>
            <template
              v-for="profession in data.professions"
              :key="profession.id"
            >
              <option :value="profession.id">{{ profession.title }}</option>
            </template>
          </select>
          <label for="profession">Profession</label>
        </div>

        <div class="form-floating mb-3">
          <select
            v-model="crew.country_id"
            id="country"
            class="form-control"
            required
          >
            <option>Choose Country</option>
            <template v-for="country in data.countries" :key="country.id">
              <option :value="country.id">{{ country.title }}</option>
            </template>
          </select>
          <label for="country">Country *</label>
        </div>

        <div class="form-floating mb-3">
          <input
            v-model="crew.phone"
            type="text"
            class="form-control"
            id="phone"
            required
          />
          <label for="phone">Phone number *</label>
        </div>

        <div class="form-floating mb-3">
          <input
            v-model="crew.id_type"
            type="text"
            class="form-control"
            id="id_type"
            required
          />
          <label for="id_type">ID type *</label>
        </div>

        <div class="form-floating mb-3">
          <input
            v-model="crew.id_name"
            type="text"
            class="form-control"
            id="id_name"
            required
          />
          <label for="id_name">ID name *</label>
        </div>

        <div class="form-floating mb-3">
          <input
            v-model="crew.id_number"
            type="text"
            class="form-control"
            id="id_number"
            required
          />
          <label for="id_number">ID number</label>
        </div>

        <div class="form-floating mb-3">
          <input
            v-model="crew.dob"
            type="date"
            class="form-control"
            id="dob"
            required
          />
          <label for="dob">Date of birth *</label>
        </div>

        <div class="form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="is_active"
            v-model="crew.is_active"
            required
          />
          <label class="form-check-label" for="is_active">
            &nbsp;is active?
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
export default {
  name: 'CreateCrew',
  data: () => ({
    error_message: '',
    crew: {
      is_active: false,
    },
    data: [],
  }),
  methods: {
    create: async function () {
      await this.$axios
        .post('/crews', this.crew)
        .then(() => this.$router.push({ name: 'Crews' }))
        .catch(
          (error) =>
            (this.error_message =
              error.response?.data.message || error.message),
        )
    },
  },
  mounted: async function () {
    await this.$axios
      .get('crews/create')
      .then((response) => (this.data = response.data))
  },
}
</script>
