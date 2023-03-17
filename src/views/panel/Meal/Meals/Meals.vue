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
                <CTableDataCell>{{ meal.meal_type_id }}</CTableDataCell>
                <CTableDataCell>{{ meal.quantity }}</CTableDataCell>
                <CTableDataCell>{{ meal.to_model_type }}</CTableDataCell>
                <CTableDataCell>{{ meal.to_model_id }}</CTableDataCell>
                <CTableDataCell>{{ meal.sent_at }}</CTableDataCell>
                <CTableDataCell :aria-colspan="2">
                  <button
                    class="btn btn-sm btn-info text-white mx-1"
                    title="View Details"
                    @click="viewDetails(meal.id)"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <router-link
                    :to="{
                      name: 'Update Meal',
                      params: { id: this.$encrypt(meal.id) },
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
                    class="btn btn-sm btn-danger text-white m-1"
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
    :visible="is_meal_modal_visible"
    @close="is_meal_modal_visible = false"
    class="modal-popup-detail"
    data-backdrop="static"
    data-keyboard="false"
  >
    <CModalHeader>
      <CModalTitle>Meal Information</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CRow>
        <CCol :md="12">
          <CTable class="table table-responsive">
            <CTableRow>
              <CTableHeaderCell>Meal Type ID</CTableHeaderCell>
              <CTableDataCell>{{ meal.meal_type_id }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Quantity</CTableHeaderCell>
              <CTableDataCell>{{ meal.quantity }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>To Model Type</CTableHeaderCell>
              <CTableDataCell>{{ meal.to_model_type }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Sent at</CTableHeaderCell>
              <CTableDataCell>{{ meal.sent_at }}</CTableDataCell>
            </CTableRow>
          </CTable>
        </CCol>
      </CRow>
    </CModalBody>
  </CModal>
</template>

<script>
export default {
  name: 'Meals',
  data: () => ({
    debounceFn: null,
    meals: [],
    loading: false,
    pagination: [],
    is_meal_modal_visible: false,
    meal: {}, // Currently shown meal
  }),
  methods: {
    viewDetails: async function (id) {
      await this.$axios
        .get(`/meals/${id}`)
        .then((response) => (this.meal = response.data))
      this.is_meal_modal_visible = true
    },
    gotoPage: async function (url) {
      this.loading = true
      await this.$axios
        .get(url, {
          params: this.search,
        })
        .then((response) => {
          this.groups = response.data.data
          this.pagination = response.data.links
          this.loading = false
        })
    },
    deleteMeal: async function (id) {
      await swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this meal!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.delete(`/meals/${id}`).then(
            // TODO: remove item from the existing array
            // instead of reassigning
            (this.meals = this.meals.filter((meal) => meal.id !== id)),
          )
          swal('Meal has been deleted!', {
            icon: 'success',
            timer: 3000,
          })
        }
      })
    },
  },
  async mounted() {
    this.loading = true
    await this.$axios
      .get('/meals')
      .then((response) => {
        this.meals = response.data.data
        this.pagination = response.data.links
        this.loading = false
      })
  },
}
</script>
