<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Types</strong>
            </div>
            <div class="col-md-2">
              <router-link to="/meals/types/create">
                <CButton color="primary" class="float-end">
                  Create Type
                </CButton>
              </router-link>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                <CTableHeaderCell scope="col">Has Documents</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="meal_type in meal_types" :key="meal_type.id">
                <CTableDataCell>{{ meal_type.title }}</CTableDataCell>
                <CTableDataCell>{{ meal_type.description }}</CTableDataCell>
                <CTableDataCell>
                  <CBadge
                    :color="meal_type.has_documents ? 'success' : 'warning'"
                    shape="rounded-pill"
                    >{{ meal_type.has_documents ? 'Yes' : 'No' }}</CBadge
                  >
                </CTableDataCell>
                <CTableDataCell>
                  <button
                    class="btn btn-sm btn-info text-white"
                    @click.stop="fetchMealTypeInfo(meal_type.id)"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <router-link
                    :to="{
                      name: 'Edit Meal Type',
                      params: { id: this.$encrypt(meal_type.id) },
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
                    @click.stop="deleteMealType(meal_type.id)"
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
              <nav aria-label="Meal types navigation">
                <ul class="pagination">
                  <li
                    class="page-item"
                    v-for="page in pagination"
                    :key="page"
                    :class="{ active: page.active }"
                  >
                    <a
                      @click.prevent="gotoPage(page.url)"
                      class="page-link"
                      v-html="page.label"
                      :class="{ disabled: !page.url }"
                    ></a>
                  </li>
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
    :visible="showMealTypeDetailModal"
    @close="showMealTypeDetailModal = false"
    class="modal-popup-detail"
    data-backdrop="static"
    data-keyboard="false"
  >
    <CModalHeader>
      <CModalTitle>Meal Type Information</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CRow>
        <CCol :md="12">
          <CTable class="table table-responsive">
            <CTableRow>
              <CTableHeaderCell>Title</CTableHeaderCell>
              <CTableDataCell>{{ meal_type.title }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Description</CTableHeaderCell>
              <CTableDataCell>{{ meal_type.description }}</CTableDataCell>
              <CTableHeaderCell>Has Documents:</CTableHeaderCell>
              <CTableDataCell>
                <CBadge
                  :color="meal_type.has_documents ? 'success' : 'warning'"
                  shape="rounded-pill"
                  >{{ meal_type.has_documents ? 'Yes' : 'No' }}</CBadge
                >
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
  name: 'Types',
  data: () => ({
    meal_types: [],
    current_page: 1,
    pagination: {},
    last_page: 99,
    showMealTypeDetailModal: false,
    meal_type: {},
  }),
  methods: {
    gotoPage: async function (url) {
      await this.$axios.get(url).then((response) => {
        this.meal_types = response.data.data
        this.current_page = response.data.current_page
        this.last_page = response.data.last_page
        this.pagination = response.data.links
      })
    },
    fetchMealTypeInfo: async function (id) {
      await this.$axios.get(`/meal_types/${id}`).then((response) => {
        this.meal_type = response.data
        this.showMealTypeDetailModal = true
      })
    },
    deleteMealType: async function (id) {
      await swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this meal type!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.delete(`/meal_types/${id}`).then(() => {
            this.meal_types = this.meal_types.filter(
              (meal_type) => meal_type.id !== id,
            )
          })
          swal('Meal Type has been deleted!', {
            icon: 'success',
          })
        }
      })
    },
  },
  async mounted() {
    await this.$axios.get('/meal_types').then((response) => {
      this.meal_types = response.data.data
      this.current_page = response.data.current_page
      this.last_page = response.data.last_page
      this.pagination = response.data.links
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
