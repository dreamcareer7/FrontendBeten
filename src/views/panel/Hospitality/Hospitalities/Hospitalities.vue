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
                  Create a hospitality
                </CButton>
              </router-link>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CRow v-if="loading" class="mt-4">
            <CCol :md="12" class="text-center">
              <div class="spinner-border text-success" role="status"></div>
            </CCol>
            <CCol :md="12" class="text-center">
              <span class="sr-only">Loading...</span>
            </CCol>
          </CRow>
          <CTable
            v-if="!loading"
            responsive
            hover
            class="cursor-pointer"
            align="middle"
          >
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                <CTableHeaderCell scope="col">Required</CTableHeaderCell>
                <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                <CTableHeaderCell scope="col">Received by</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow
                v-for="hospitality in hospitalities"
                :key="hospitality.id"
              >
                <CTableDataCell>{{ hospitality.title }}</CTableDataCell>
                <CTableDataCell>{{ hospitality.description }}</CTableDataCell>
                <CTableDataCell>{{ hospitality.required_date }}</CTableDataCell>
                <CTableDataCell>{{ hospitality.quantity }}</CTableDataCell>
                <CTableDataCell>
                  {{ hospitality.receiver?.fullname }}
                </CTableDataCell>
                <CTableDataCell :aria-colspan="2">
                  <button
                    class="btn btn-sm btn-info text-white mx-1"
                    title="View Details"
                    @click="fetchHospitalityInfo(hospitality.id)"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <router-link
                    :to="{
                      name: 'Update Hospitality',
                      params: { id: this.$encrypt(hospitality.id) },
                    }"
                  >
                    <CButton
                      class="btn btn-sm btn-warning text-white m-1"
                      :xl="0"
                      title="Edit"
                    >
                      <ion-icon name="create-outline"></ion-icon>
                    </CButton>
                  </router-link>
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
          <CRow>
            <CCol :md="12" class="text-center">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <template v-for="page in pagination" :key="page">
                    <li class="page-item" :class="{ active: page.active }">
                      <a
                        @click.prevent="gotoPage(page.url)"
                        class="page-link"
                        :class="{ disabled: !page.url }"
                        v-html="page.label"
                      ></a>
                    </li>
                  </template>
                </ul>
              </nav>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>

  <CModal
    size="lg"
    :visible="is_hospitality_modal_visible"
    @close="is_hospitality_modal_visible = false"
    class="modal-popup-detail"
    data-backdrop="static"
    data-keyboard="false"
  >
    <CModalHeader>
      <CModalTitle>Hospitality Information</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CRow>
        <CCol :md="12">
          <CTable class="table table-responsive">
            <CTableRow>
              <CTableHeaderCell>Description</CTableHeaderCell>
              <CTableDataCell>{{ hospitality.description }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Required</CTableHeaderCell>
              <CTableDataCell>{{ hospitality.required_date }}</CTableDataCell>
              <CTableHeaderCell>Quantity</CTableHeaderCell>
              <CTableDataCell>{{ hospitality.quantity }}</CTableDataCell>
              <CTableHeaderCell>Received by</CTableHeaderCell>
              <CTableDataCell>
                {{ hospitality.receiver?.fullname }}
              </CTableDataCell>
            </CTableRow>
          </CTable>
        </CCol>
      </CRow>
    </CModalBody>
  </CModal>
</template>

<script>
export default {
  name: 'Hospitalities',
  data: () => ({
    hospitalities: [],
    loading: false,
    pagination: [],
    is_hospitality_modal_visible: false,
    hospitality: {},
  }),
  methods: {
    fetchHospitalityInfo: async function (id) {
      await this.$axios.get(`/hospitalities/${id}`).then((response) => {
        this.hospitality = response.data
        this.is_hospitality_modal_visible = true
      })
    },
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
    async gotoPage(url) {
      this.loading = true
      await this.$axios.get(url).then((response) => {
        this.hospitalities = response.data.data
        this.pagination = response.data.links
      })
      this.loading = false
    },
  },
  async mounted() {
    this.loading = true
    await this.$axios
      .get('/hospitalities')
      .then((response) => {
        this.hospitalities = response.data.data
        this.pagination = response.data.links
        this.loading = false
      })
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

<style scoped>
.page-item {
  cursor: pointer;
}
a.disabled {
  pointer-events: none;
  cursor: default;
}
</style>
