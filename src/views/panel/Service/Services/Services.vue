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
              <router-link to="/services/create">
                <CButton color="primary" class="float-end">
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
                <CTableHeaderCell scope="row">
                  {{ service.id }}
                </CTableHeaderCell>
                <CTableDataCell>{{ service.title }}</CTableDataCell>
                <CTableDataCell>{{ service.country_name }}</CTableDataCell>
                <CTableDataCell>{{ service.before_date }}</CTableDataCell>
                <CTableDataCell>{{ service.exact_date }}</CTableDataCell>
                <CTableDataCell>{{ service.after_date }}</CTableDataCell>
                <CTableDataCell>
                  <button
                    style="margin-right: 1em"
                    class="btn btn-sm btn-info text-white"
                  >
                    View
                  </button>
                  <button
                    style="margin-right: 1em"
                    class="btn btn-sm btn-warning text-white"
                  >
                    Update
                  </button>
                  <button
                    @click="deleteService(service.id)"
                    class="btn btn-sm btn-danger text-white"
                  >
                    Delete
                  </button>
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
export default {
  name: 'Services',
  data: () => ({
    services: [],
    current_page: '',
    selected_user: null,
  }),
  methods: {
    getServices: async function () {
      await this.$axios.get(`/services`).then((response) => {
        let allServices = Object.entries(response.data.data.data)
        allServices.forEach((s) => this.services.push(s[1]))
      })
    },
    deleteService: async function (id) {
      await swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this service!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.delete(`/services/${id}`).then(() => this.getServices())
          swal('Service has been deleted!', {
            icon: 'success',
          })
        }
      })
    },
    fetchServiceInfo: async function (id) {
      await this.$axios.get(`/services/show/` + id).then((response) => {
        console.log(response.data)
      })
    },
  },
  mounted() {
    this.getServices()
  },
}
</script>
