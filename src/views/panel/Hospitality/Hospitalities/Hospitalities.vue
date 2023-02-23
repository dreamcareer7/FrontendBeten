<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Hospitalities</strong>
            </div>
            <div class="col-md-2">
              <router-link to="/hospitalities/create">
                <CButton color="primary" class="float-end">
                  Create Hospitality
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
                <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                <CTableHeaderCell scope="col">Required date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                <CTableHeaderCell scope="col">Received by</CTableHeaderCell>
                <CTableHeaderCell scope="col">Extra</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow
                v-for="hospitality in hospitalities"
                :key="hospitality.id"
              >
                <CTableHeaderCell scope="row">
                  {{ hospitality.id }}
                </CTableHeaderCell>
                <CTableDataCell>{{ hospitality.title }}</CTableDataCell>
                <CTableDataCell>{{ hospitality.description }}</CTableDataCell>
                <CTableDataCell>{{ hospitality.required_date }}</CTableDataCell>
                <CTableDataCell>{{ hospitality.quantity }}</CTableDataCell>
                <CTableDataCell>
                  {{ hospitality.receiver.fullname }}
                </CTableDataCell>
                <CTableDataCell>{{ hospitality.extra }}</CTableDataCell>
                <CTableDataCell :aria-colspan="2">
                  <button
                    class="btn btn-sm btn-danger text-white"
                    @click="deleteHospitality(hospitality.id)"
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
  name: 'Hospitalities',
  data: () => ({
    hospitalities: [],
  }),
  methods: {
    async deleteHospitality(id) {
      await this.$axios
        .delete(`/hospitalities/${id}`)
        .then(() => {
          this.hospitalities = this.hospitalities.filter(
            (hospitality) => hospitality.id !== id,
          )
        })
        .catch((error) => {
          swal({
            title: error.response.statusText,
            text: error.response.data.message,
            icon: 'error',
          })
        })
    },
  },
  async mounted() {
    await this.$axios
      .get('/hospitalities')
      .then((response) => (this.hospitalities = response.data))
      .catch((error) => {
        swal({
          title: error.response.statusText,
          text: error.response.data.message,
          icon: 'error',
        })
      })
  },
}
</script>
