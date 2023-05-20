<template>
  <div class="card border-success mb-4">
    <div class="card-header">{{ $t('Create service') }}</div>
    <form @submit.prevent="create">
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
            :aria-label="$t('Choose city')"
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
      if(this.service.before_date > this.service.after_date){
        alert('Before date cannot be greater than after date')
        return;
      }
      this.service.model_ids = this.model_ids
      await this.$axios
        .post('/services', this.service)
        .then(() => this.$router.push({ name: 'Services' }))
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
      //console.log('response',response?.data)
    }
  },
  mounted() {
    this.$axios.get('/cities').then((response) => (this.cities = response.data))
    this.getModels()
  },
}
</script>
