<template>
  <div class="card border-warning mb-4">
    <div class="card-header">{{ $t('UpdateCrew') }}</div>
    <form @submit.prevent="update">
      <div class="card-body">
        <div class="form-floating mb-3">
          <select v-model="crew.user_id" id="user" class="form-control">
            <option>Choose user</option>
            <template v-for="user in users" :key="user.id">
              <option :value="user.id">{{ user.name }}</option>
            </template>
          </select>
          <label for="user">{{ $t('User') }}</label>
        </div>

        <div class="form-floating mb-3">
          <input
            v-model="crew.fullname"
            type="text"
            class="form-control"
            id="fullname"
            autocomplete="off"
            required
            autofocus
          />
          <label for="fullname">{{ $t('FullName') }} *</label>
        </div>

        <div class="form-floating mb-3">
          <select
            v-model="crew.gender"
            id="gender"
            class="form-control"
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label for="gender">{{ $t('Gender') }} *</label>
        </div>

        <div class="form-floating mb-3">
          <select
            v-model="crew.profession_id"
            id="profession"
            class="form-control"
          >
            <option>Choose Profession</option>
            <template v-for="profession in professions" :key="profession.id">
              <option :value="profession.id">{{ profession.title }}</option>
            </template>
          </select>
          <label for="profession">{{ $t('Profession') }}</label>
        </div>

        <div class="form-floating mb-3">
          <select
            v-model="crew.country_id"
            id="country"
            class="form-control"
            required
          >
            <option>Choose Country</option>
            <template v-for="country in countries" :key="country.id">
              <option :value="country.id">{{ country.title }}</option>
            </template>
          </select>
          <label for="country">{{ $t('Country') }} *</label>
        </div>

        <div class="form-floating mb-3">
          <input
            v-model="crew.phone"
            type="text"
            class="form-control"
            id="phone"
            required
          />
          <label for="phone">{{ $t('Phone') }} *</label>
        </div>

        <div class="form-floating mb-3">
          <input
            v-model="crew.id_type"
            type="text"
            class="form-control"
            id="id_type"
            required
          />
          <label for="id_type">{{ $t('IdType') }} *</label>
        </div>

        <div class="form-floating mb-3">
          <input
            v-model="crew.id_name"
            type="text"
            class="form-control"
            id="id_name"
            required
          />
          <label for="id_name">{{ $t('IdName') }} *</label>
        </div>

        <div class="form-floating mb-3">
          <input
            v-model="crew.id_number"
            type="text"
            class="form-control"
            id="id_number"
            required
          />
          <label for="is_number">{{ $t('IdNumber') }} *</label>
        </div>

        <div class="form-floating mb-3">
          <input
            v-model="crew.dob"
            type="date"
            class="form-control"
            id="dob"
            required
          />
          <label for="dob">{{ $t('DateOfBirth') }} *</label>
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
            &nbsp;{{ $t('IsActive') }}?
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
        <span class="float-start">* {{ $t('RequiredFields') }}</span>
        <button
          class="btn btn-warning text-white"
          @click.prevent="$router.go(-1)"
        >
          {{ $t('GoBack') }}</button
        >&nbsp;
        <button type="submit" class="btn text-white btn-warning">
          <ion-icon name="save-outline"></ion-icon>&nbsp;{{ $t('Save') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UpdateCrew',
  data: () => ({
    error_message: '',
    crew: {},
    users: [],
    professions: [],
    countries: [],
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
            .patch(`/crews/${this.crew.id}`, this.crew)
            .then(() => {
              this.$router.push({ name: 'Crews' })
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
  mounted: async function () {
    await this.$axios
      .get(`crews/${this.$decrypt(this.$route.params.id)}/edit`)
      .then((response) => {
        this.crew = response.data.crew
        this.users = response.data.users
        this.professions = response.data.professions
        this.countries = response.data.countries
      })
  },
}
</script>
