<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <CCardTitle>Vehicle</CCardTitle>
          <router-link
            :to="{ name: 'Create vehicle' }"
            v-if="$can('vehicles.create')"
          >
            <CButton color="success" class="float-end text-white">
              <ion-icon name="car-sport-outline"></ion-icon>&nbsp;Create vehicle
            </CButton>
          </router-link>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol :md="2">
              <input
                type="text"
                class="form-control"
                v-model="search.model"
                placeholder="model"
                @change="getVehicles"
              />
            </CCol>
            <CCol :md="2">
              <input
                type="text"
                class="form-control"
                v-model="search.manufacturer"
                placeholder="Manufacturer"
                @change="getVehicles"
              />
            </CCol>
            <CCol :md="2">
              <input
                type="text"
                class="form-control"
                v-model="search.registration"
                placeholder="Registration"
                @change="getVehicles"
              />
            </CCol>
          </CRow>
          <hr />
          <CRow v-if="loading" class="mt-4">
            <CCol :md="12" class="text-center">
              <div class="spinner-border text-success" role="status"></div>
            </CCol>
            <CCol :md="12" class="text-center">
              <span class="sr-only">Loading...</span>
            </CCol>
          </CRow>
          <CTable v-if="!loading">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Model</CTableHeaderCell>
                <CTableHeaderCell scope="col">Registration</CTableHeaderCell>
                <CTableHeaderCell scope="col">Manufacturer</CTableHeaderCell>
                <CTableHeaderCell scope="col">Year</CTableHeaderCell>
                <CTableHeaderCell scope="col">Badge</CTableHeaderCell>
                <CTableHeaderCell
                  scope="col"
                  style="width: 20%"
                  :aria-colspan="2"
                >
                  Actions
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="vehicle in vehicles" :key="vehicle.id">
                <CTableDataCell>{{ vehicle.model }}</CTableDataCell>
                <CTableDataCell>{{ vehicle.registration }}</CTableDataCell>
                <CTableDataCell>{{ vehicle.manufacturer }}</CTableDataCell>
                <CTableDataCell>{{ vehicle.year }}</CTableDataCell>
                <CTableDataCell>{{ vehicle.badge }}</CTableDataCell>
                <CTableDataCell>
                  <button
                    class="btn btn-sm btn-info text-white mx-1"
                    :title="$t('View details')"
                    @click="viewDetails(vehicle.id)"
                    v-if="$can('vehicles.view')"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <router-link
                    :to="{
                      name: 'Update Vehicle',
                      params: { id: this.$encrypt(vehicle.id) },
                    }"
                    v-if="$can('vehicles.edit')"
                  >
                    <CButton class="btn btn-sm btn-warning text-white m-1"
                      ><ion-icon name="create-outline"></ion-icon
                    ></CButton>
                  </router-link>
                  <button
                    class="btn btn-sm btn-danger text-white m-1"
                    @click="deleteVehicle(vehicle.id)"
                    v-if="$can('vehicles.delete')"
                  >
                    <ion-icon name="trash-bin-outline"></ion-icon>
                  </button>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <CRow>
            <CCol :md="12" class="text-center">
              <nav aria-label="Vehicles navigation">
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
    :visible="is_vehicle_modal_visible"
    @close="is_vehicle_modal_visible = false"
    size="lg"
  >
    <CModalHeader>
      <CModalTitle>Vehicle details</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CTable class="table table-responsive">
        <CTableRow>
          <CTableDataCell>Model</CTableDataCell>
          <CTableDataCell>{{ vehicle.model }}</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>Manufacturer</CTableDataCell>
          <CTableDataCell>
            {{ vehicle.manufacturer }}
          </CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>Year</CTableDataCell>
          <CTableDataCell>{{ vehicle.year }}</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>Registration</CTableDataCell>
          <CTableDataCell>{{ vehicle.registration }}</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>Badge</CTableDataCell>
          <CTableDataCell>{{ vehicle.badge }}</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>Date created</CTableDataCell>
          <CTableDataCell>{{ vehicle.created_at }}</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>Date updated</CTableDataCell>
          <CTableDataCell>{{ vehicle.updated_at }}</CTableDataCell>
        </CTableRow>
      </CTable>
      <Contractable
        v-if="vehicle.is_contractable"
        type="vehicle"
        :id="vehicle.id"
      />
      <Documentable
        v-if="vehicle.is_documentable"
        type="vehicle"
        :id="vehicle.id"
      />
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="is_vehicle_modal_visible = false">
        Close
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
export default {
  name: 'Vehicles',
  data: () => ({
    vehicles: {},
    search: {},
    loading: false,
    pagination: {},
    vehicle: {},
    is_vehicle_modal_visible: false,
  }),
  methods: {
    getVehicles: async function () {
      this.loading = true
      await this.$axios
        .get(`/vehicles/paginate`, {
          params: this.search,
        })
        .then((response) => {
          this.vehicles = response.data.data
          this.pagination = response.data.links
        })
      this.loading = false
    },
    gotoPage: async function (url) {
      this.loading = true
      await this.$axios
        .get(url, {
          params: this.search,
        })
        .then((response) => {
          this.vehicles = response.data.data
          this.pagination = response.data.links
        })
      this.loading = false
    },
    viewDetails: async function (id) {
      await this.$axios.get(`/vehicles/info/${id}`).then((response) => {
        this.vehicle = response.data
        this.is_vehicle_modal_visible = true
      })
    },
    deleteVehicle: async function (id) {
      await swal({
        title: this.$i18n.t('Are you sure?'),
        text: this.$i18n.t('Once deleted, you will not be able to recover!'),
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios
            .post(`/vehicles/delete/${id}`)
            .then(() => this.getVehicles())
          swal('Vehicle has been deleted!', {
            icon: 'success',
            timer: 3000,
          })
        }
      })
    },
  },
  mounted() {
    this.getVehicles()
  },
}
</script>
