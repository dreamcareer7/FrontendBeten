<template>
  <div class="card border-success">
    <div class="card-header">{{ $t('Update Profession') }}</div>
    <form @submit.prevent="update">
      <div class="card-body">
        <div class="form-floating mb-3">
          <input
            v-model="profession.title"
            type="text"
            class="form-control"
            id="title"
            autocomplete="off"
            autofocus
            required
          />
          <label for="title">{{ $t('Title') }} *</label>
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
          <ion-icon name="create-outline"></ion-icon>&nbsp;{{ $t('Save') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: "UpdateProfession",
  components: {
  },
  data: () => ({
    error_message: '',
    success: false,
    profession: {
    }
  }),
  methods: {
    update: async function () {
      await this.$axios
        .patch(`/professions/${this.profession.id}`, this.profession)
        .then(() => {
          swal(this.$i18n.t("Profession has been updated successfully"), {
            icon: "success",
            timer: 3000,
          });
          this.$router.push({ name: 'Professions' })
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
      .get(`professions/${this.$decrypt(this.$route.params.id)}/edit`)
      .then((response) => {
        this.profession = response.data.profession
      })
  },
}
</script>
