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
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
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
                <CTableHeaderCell scope="row">
                  {{ hospitality.id }}
                </CTableHeaderCell>
                <CTableDataCell>{{ hospitality.title }}</CTableDataCell>
                <CTableDataCell>{{ hospitality.description }}</CTableDataCell>
                <CTableDataCell>{{ hospitality.required_date }}</CTableDataCell>
                <CTableDataCell>{{ hospitality.quantity }}</CTableDataCell>
                <CTableDataCell>
                  {{ hospitality.receiver?.fullname }}
                </CTableDataCell>
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
          <CRow>
            <CCol :md="12" class="text-center">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <template v-for="page in pagination" :key="page">
                    <li class="page-item" :class="{active: page.active}">
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
</template>

<script>
export default {
  name: 'Hospitalities',
  data: () => ({
    hospitalities: [],
    pagination: {},
    current_page: 1,
    last_page: 99,
    loading: false,
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
    async gotoPage(url) {
      this.loading = true
      await this.$axios.get(url).then((response) => {
        this.hospitalities = response.data.data
        this.current_page = response.data.current_page
        this.last_page = response.data.last_page
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
        this.current_page = response.data.current_page
        this.last_page = response.data.last_page
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