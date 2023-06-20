<template>
  <div class="card border-success mb-4">
    <div class="card-header">{{ $t('Update service center') }}</div>
    <form @submit.prevent="update">
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="service.title"
                required
                autofocus
                autocomplete="off"
              />
              <label for="title">{{ $t('Title') }} *</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="service.phone"
                required
                autofocus
                autocomplete="off"
              />
              <label for="title">{{ $t('Phone') }} *</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="service.location"
                required
                autofocus
                autocomplete="off"
              />
              <label for="title">{{ $t('Location') }} *</label>
            </div>

            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="service.group"
                required
                autofocus
                autocomplete="off"
              />
              <label for="title">{{ $t('Group') }} *</label>
            </div>

            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control"
                id="title"
                v-model="service.maxClientCount"
                required
                autofocus
                autocomplete="off"
              />
              <label for="title">{{ $t('Max Client Count') }} *</label>
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
        <span class="float-start">* {{ $t('Required fields') }}</span>
        <button
          class="btn btn-secondary text-white"
          @click.prevent="$router.go(-1)"
        >
          {{ $t('Go back') }}
        </button>&nbsp;
        <button class="btn btn-warning text-white" type="submit">
          <ion-icon name="save-outline"></ion-icon>&nbsp;
          {{ $t('Save') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import cities from '@/store/cities'

export default {
  name: 'UpdateService',
  data: () => ({
    error_message: '',
    service: {},
    cities: [],
    models:[],
    model_ids:[]
  }),
  methods: {
    update: async function () {
      await swal({
        title: this.$i18n.t('Are you sure?'),
        text: this.$i18n.t('Click confirm to update, this action is irreversible'),
        icon: 'warning',
        buttons: [this.$i18n.t('Cancel'), this.$i18n.t('Confirm')],
      }).then((willUpdate) => {
        if (willUpdate) {
          this.$axios
            .patch(`/service-center/${this.service.id}`, this.service)
            .then(() => {
              this.$router.push({ name: 'Service center' })
              swal(this.$i18n.t('Updated successfully!'), {
                icon: 'success',
                timer: 3000,
              })
            })
            .catch((error) => {
              if (error.response) {
                this.error_message = error.response.data.message
              } else {
                this.error_message = error.message
              }
            })
        }
      })
    },
  },
  async mounted() {
    const service_id = this.$decrypt(this.$route.params.id)
    await this.$axios.get(`/service-center/${service_id}`).then((response) => {
      this.service = response.data.data
    })
  },
}
</script>
