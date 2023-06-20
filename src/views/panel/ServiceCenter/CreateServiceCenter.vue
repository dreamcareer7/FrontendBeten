<template>
  <div class="card border-success mb-4">
    <div class="card-header">{{ $t('Create service center') }}</div>
    <form @submit.prevent="create">
      <div class="card-body">
        <div class="row">
          <div class="col-6">
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
          <div class="col-6">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="service.name"
                required
                autofocus
                autocomplete="off"
              />
              <label for="title">{{ $t('Name') }} *</label>
            </div>

            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="title"
                v-model="service.email"
                required
                autofocus
                autocomplete="off"
              />
              <label for="title">{{ $t('Email') }} *</label>
            </div>

            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="service.contact"
                required
                autofocus
                autocomplete="off"
              />
              <label for="title">{{ $t('Contact') }} *</label>
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
        <button type="submit" class="btn btn-success text-white">{{ $t('Create') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateService',
  data: () => ({
    error_message: '',
    service: {},
    cities: [],
    models:[],
    model_ids:[]
  }),

  methods: {
    create: async function () {
      await this.$axios
        .post('/service-center', this.service)
        .then(() => this.$router.push({ name: 'Service center' }))
        .catch((error) => {
          if (error.response) {
            this.error_message = error.response.data.message
          } else {
            this.error_message = error.message
          }
        })
    },
    getModels: async function(){
     const response = await this.$axios.get('/service/models')
      this.models = response?.data?.data
    }
  },
  mounted() {
    //this.$axios.get('/cities').then((response) => (this.cities = response.data))
    //this.getModels()
  },
}
</script>
