<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Services</strong>
            </div>
            <div class="col-md-2">
              <router-link
                to="/services/create"
              >
                <CButton
                  color="primary"
                >
                  Create Service
                </CButton>
              </router-link>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Country ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Before Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Exact Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">After Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="service in services" :key="service.id">
                  <CTableHeaderCell scope="row">{{ service.id }}</CTableHeaderCell>
                  <CTableDataCell>{{ service.title }}</CTableDataCell>
                  <CTableDataCell>{{ service.country_id }}</CTableDataCell>
                  <CTableDataCell>{{ service.before_date }}</CTableDataCell>
                  <CTableDataCell>{{ service.exact_date }}</CTableDataCell>
                  <CTableDataCell>{{ service.after_date }}</CTableDataCell>
                  <CTableDataCell>
                    <button style="margin-right: 1em;" class="btn btn-sm btn-info text-white">View</button>
                    <button style="margin-right: 1em;" class="btn btn-sm btn-success text-white">Update</button>
                    <button @click="deleteService(service.id)" class="btn btn-sm btn-danger text-white">Delete</button>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>


<script>
import axios from 'axios'
export default {
  name: 'services',
  data() {
    return {
      services: [],
      current_page: '',
      selected_user: null,
    }
  },
  mounted() {
    this.getServices()
  },
  methods: {
    getServices: async function () {
      await axios.get(`/services`).then((response) => {
        let allServices = Object.entries(response.data.data.data)[0]
        allServices.forEach((s) => s.id != undefined ? this.services.push(s) : '')
      })
    },
    deleteService: async function (id) {
      await axios.delete(`/services/` + id).then((response) => {
        alert(response.data.message)
      })
    },
    fetchServiceInfo: async function(id) {
      await axios.get(`/services/show/` + id).then((response) => {
        console.log(response.data)
      })
    },
  },
}
</script>
