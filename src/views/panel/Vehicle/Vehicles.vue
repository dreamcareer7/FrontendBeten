<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Vehicles</strong>
            </div>
            <div class="col-md-2">
              <router-link
                :to="{
                  name: 'create_vehicle'
                }"
              >
                <CButton color="primary"> Create Vehicle</CButton>
              </router-link>
            </div>
          </div>
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
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Model</CTableHeaderCell>
                <CTableHeaderCell scope="col">Registration</CTableHeaderCell>
                <CTableHeaderCell scope="col">Manufacturer</CTableHeaderCell>
                <CTableHeaderCell scope="col">Year</CTableHeaderCell>
                <CTableHeaderCell scope="col">Badge</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="vehicle in vehicles" :key="vehicle.id">
                <CTableHeaderCell scope="row">{{ vehicle.id }}</CTableHeaderCell>
                <CTableDataCell>{{ vehicle.model }}</CTableDataCell>
                <CTableDataCell>{{ vehicle.registration }}</CTableDataCell>
                <CTableDataCell>{{ vehicle.manufacturer }}</CTableDataCell>
                <CTableDataCell>{{ vehicle.year }}</CTableDataCell>
                <CTableDataCell>{{ vehicle.badge }}</CTableDataCell>
                <CTableDataCell>
                  <router-link
                    :to="{
                      name: 'user_info',
                      params: { id: vehicle.id },
                    }"
                  >
                    <button
                      style="margin-right: 1em"
                      class="btn btn-sm btn-info text-white"
                    >
                      View
                    </button>
                  </router-link>
                  <router-link
                    :to="{
                      name: 'update_vehicle',
                      params: { id: vehicle.id },
                    }"
                  >
                    <CButton class="btn btn-success text-white">Update</CButton>
                  </router-link>
                  <button
                    class="btn btn-danger text-white"
                    @click="deleteVehicle(vehicle.id)"
                  >
                    Delete
                  </button>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <CRow>
            <CCol :md="12" class="text-center">
              <nav aria-label="Page navigation example">
                <ul class="pagination">

                  <li class="page-item" v-for="page in pagination" :key="page">
                    <a
                      @click.prevent="gotoPage(page.url)"
                      class="page-link"
                      href="#"
                      v-html="page.label"
                      v-if="page.url"
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
</template>

<script>
import axios from 'axios'
export default {
  name: 'users',
  data() {
    return {
      vehicles: {},
      search: {},
      current_page: 1,
      last_page: 99,
      selected_user: null,
      loading: false,
      pagination:{}
    }
  },
  mounted() {
    this.getVehicles()
  },
  methods: {
    nextPage: async function () {
      this.current_page = this.current_page + 1
      this.search.page = this.current_page
      await this.getVehicles()
    },
    previousPage: async function () {
      this.current_page = this.current_page - 1
      this.search.page = this.current_page
      await this.getVehicles()
    },
    getVehicles: async function () {
      this.loading = true
      await axios
        .get(`/vehicles/paginate`, {
          params: this.search,
        })
        .then((response) => {
          this.vehicles = response.data.data
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
          let total_pages = response.data.total / response.data.per_page
          this.total_pages = total_pages
          this.pagination = response.data.links
        })
      this.loading = false
    },
    gotoPage: async function (url) {
      this.loading = true
      await axios
        .get(url, {
          params: this.search,
        })
        .then((response) => {
          this.vehicles = response.data.data
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
          let total_pages = response.data.total / response.data.per_page
          this.total_pages = total_pages
          this.pagination = response.data.links
        })
      this.loading = false
    },
    deleteVehicle: async function (id) {
      await axios.post(`/vehicles/delete/` + id).then((response) => {
        alert(response.data.message)
        this.getVehicles()
      })
    },
  },
}
</script>
