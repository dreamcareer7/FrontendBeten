<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Meals</strong>
            </div>
            <div class="col-md-2">
              <router-link to="/meals/create">
                <CButton color="primary" class="float-end">
                  Create Meal
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
                <CTableHeaderCell scope="col">Meal Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                <CTableHeaderCell scope="col">To Model Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">To Model ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Sent At</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="meal in meals" :key="meal.id">
                <CTableHeaderCell scope="row">{{ meal.id }}</CTableHeaderCell>
                <CTableDataCell>{{ meal.meal_type_id }}</CTableDataCell>
                <CTableDataCell>{{ meal.quntity }}</CTableDataCell>
                <CTableDataCell>{{ meal.to_model_type }}</CTableDataCell>
                <CTableDataCell>{{ meal.to_model_id }}</CTableDataCell>
                <CTableDataCell>{{ meal.sent_at }}</CTableDataCell>
                <CTableDataCell :aria-colspan="2">
                  <button
                    class="btn btn-sm btn-info text-white mx-1"
                    v-c-tooltip="{ content: 'View Detail', placement: 'top' }"
                    @click="viewDetails(this.$encrypt(meal.id))"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <button
                    class="btn btn-sm btn-danger text-white m-1"
                    v-c-tooltip="{ content: 'Delete', placement: 'top' }"
                    @click="deleteMeal(meal.id)"
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

  <CModal
    size="lg"
    :visible="detailsModalVisible"
    @close="detailsModalVisible = false"
    class="modal-popup-detail"
    data-backdrop="static"
    data-keyboard="false"
  >
    <CModalHeader>
      <CModalTitle>Meal details</CModalTitle>
    </CModalHeader>
  </CModal>
</template>

<script>
export default {
  name: 'Meals',
  data: () => ({
    meals: [],
    meal: {}, // Currently shown meal
    detailsModalVisible: false,
  }),
  methods: {
    async viewDetails(id) {
      await this.$axios
        .get(`/meals/${this.$decrypt(id)}`)
        .then((response) => (this.meal = response.data))
      this.detailsModalVisible = true
    },
  },
  async mounted() {
    await this.$axios
      .get('/meals')
      .then((response) => (this.meals = response.data))
  },
}
</script>
