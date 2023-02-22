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
                <CTableHeaderCell scope="col">City</CTableHeaderCell>
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
                <CTableDataCell>{{ service.city }}</CTableDataCell>
                <CTableDataCell>{{ service.before_date }}</CTableDataCell>
                <CTableDataCell>{{ service.exact_date }}</CTableDataCell>
                <CTableDataCell>{{ service.after_date }}</CTableDataCell>
                <CTableDataCell :aria-colspan="2">
                  <button
                    class="btn btn-sm btn-danger text-white"
                    @click="deleteService(service.id)"
                    title="Delete"
                  >
                    <ion-icon name="trash-bin-outline"></ion-icon>
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
  }),
  methods: {
    deleteService: async function (id) {
      await swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this service!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.delete(`/services/${id}`).then(() => {
            this.services = this.services.filter((service) => service.id !== id)
          })
          swal('Service has been deleted!', {
            icon: 'success',
          })
        }
      })
    },
  },
  async mounted() {
    await this.$axios.get('/services')
      .then((response) => this.services = response.data)
  },
}
</script>
