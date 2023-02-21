<template>
  <div class="card border-success mb-4">
    <div class="card-header">Phase Information</div>
    <div class="row mt-3">
      <div class="col-12 text-center">
        <h5>{{ phase.title }}</h5>

      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12 text-center">
        <h5>Services</h5>
      </div>
      <div class="col-12">
        <CRow class="mt-3 ms-3">
          <CCol class="col-5 border rounded p-2 m-3" v-for="service in phase_services" :key="service.id">
            <CTable class="table table-responsive table-bordered">
              <CTableRow >
                <CTableDataCell>Title</CTableDataCell>
                <CTableDataCell>{{ service.title }}</CTableDataCell>
              </CTableRow>
              <CTableRow >
                <CTableDataCell>Country</CTableDataCell>
                <CTableDataCell>{{ service.country_id }}</CTableDataCell>
              </CTableRow>
              <CTableRow >
                <CTableDataCell>Exact Date</CTableDataCell>
                <CTableDataCell>{{ service.exact_date }}</CTableDataCell>
              </CTableRow>
              <CTableRow >
                <CTableDataCell>Before Date</CTableDataCell>
                <CTableDataCell>{{ service.before_date }}</CTableDataCell>
              </CTableRow>
              <CTableRow >
                <CTableDataCell>After Date</CTableDataCell>
                <CTableDataCell>{{ service.after_date }}</CTableDataCell>
              </CTableRow>
            </CTable>
          </CCol>
        </CRow>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'update_user',
  data() {
    return {
      message: '',
      success: false,
      phase: {},
      phase_services: {},
      phase_id: null,
    }
  },
  mounted() {
    this.phase_id = this.$route.params.id
    this.fetchInfo(this.phase_id)
  },
  methods: {
    fetchInfo: async function (id) {
      await axios.get(`/phases/info/` + id).then((response) => {
        this.phase = response.data.phase
        this.phase_services = response.data.services


      })
    },
  },
}
</script>
