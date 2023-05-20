<template>
  <div class="card border-warning mb-4">
    <div class="card-header">{{ $t('Update service') }}</div>
    <form @submit.prevent="update">
      <div class="card-body">
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
          <select
            class="form-select"
            id="city"
            aria-label="Choose city"
            v-model="service.city_id"
            required
          >
            <option>{{ $t('Choose city') }}</option>
            <option v-for="city in cities" :value="city.id" :key="city.id">
              {{ city.title }}
            </option>
          </select>
          <label for="city">{{ $t('City') }} *</label>
        </div>
        <div class="form-floating mb-3">
          <div v-if="models" v-for="(m,index) in models" class="form-check form-check-inline">
            <input class="form-check-input" :checked="false" :value="m.id" v-model="model_ids"  type="checkbox">
            <label class="form-label form-check-label">{{$t(m.name)}}</label>
          </div>
        </div>
        <div class="form-floating mb-3">
          <input
            required
            type="date"
            class="form-control"
            id="before_date"
            v-model="service.before_date"
          />
          <label for="before_date">{{ $t('Before date') }}</label>
        </div>
        <div class="form-floating mb-3 d-none">
          <input
            type="date"
            class="form-control"
            id="exact_date"
            v-model="service.exact_date"
          />
          <label for="exact_date">{{ $t('Exact date') }}</label>
        </div>
        <div class="form-floating mb-3">
          <input
            required
            type="date"
            class="form-control"
            id="after_date"
            v-model="service.after_date"
          />
          <label for="after_date">{{ $t('After date') }}</label>
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
      if(this.service.before_date > this.service.after_date){
        alert('Before date cannot be greater than after date')
        return;
      }
      await swal({
        title: this.$i18n.t('Are you sure?'),
        text: this.$i18n.t('Click confirm to update, this action is irreversible'),
        icon: 'warning',
        buttons: [this.$i18n.t('Cancel'), this.$i18n.t('Confirm')],
      }).then((willUpdate) => {
        if (willUpdate) {
          this.service.model_ids = this.model_ids
          this.$axios
            .patch(`/services/${this.service.id}`, this.service)
            .then(() => {
              this.$router.push({ name: 'Services' })
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
    cities.fetchCities().then((cities) => (this.cities = cities))
    const service_id = this.$decrypt(this.$route.params.id)
    await this.$axios.get(`/services/${service_id}`).then((response) => {
      this.service = response.data
      const service_models = response.data?.service_models;
      const models = response.data?.models;

      this.models = models;
      this.model_ids = service_models;

      //console.log('response.data',response.data?.service_models)
    })
  },
}
</script>
