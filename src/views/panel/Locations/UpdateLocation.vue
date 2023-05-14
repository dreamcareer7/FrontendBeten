<template>
  <div class="card border-success">
    <div class="card-header">{{ $t('Update location') }}</div>
    <form @submit.prevent="update">
      <div class="card-body">
        <div class="form-floating mb-2">
          <input
            id="title"
            type="text"
            class="form-control"
            autocomplete="title"
            v-model="city.title"
            autofocus
            required
          />
          <label for="title">{{ $t('Title') }}</label>
        </div>

        <div class="form-floating mb-2">
          <input
            id="location_url"
            type="url"
            class="form-control"
            autocomplete="url"
            v-model="city.location_url"
            required
          />
          <label for="location_url">{{ $t('Location Url') }}</label>
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
        <button class="btn btn-success text-white" type="submit">
          <ion-icon name="create-outline"></ion-icon>&nbsp;{{ $t('Update location') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "UpdateLocation",
  data: () => ({
    error_message: '',
    success: false,
    city: {
    },
  }),
  methods: {
    update: async function () {
      await this.$axios
        .patch(`/cities/${this.city.id}`, this.city)
        .then(() => {
          swal(this.$i18n.t("Location has been updated successfully"), {
            icon: "success",
            timer: 3000,
          });
          this.$router.push({ name: 'Locations' })
        })
        .catch(
          (error) =>
            (this.error_message =
              error.response?.data.message || error.message),
        )
    },
  },
  mounted: async function () {
    await this.$axios
      .get(`/cities/${this.$decrypt(this.$route.params.id)}/edit`)
      .then((response) => {
        this.city = response.data.city;
        this.city.id = Number(this.$decrypt(this.$route.params.id));
      });
  },
}
</script>
