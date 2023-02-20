<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Clients</strong>
            </div>
            <div class="col-md-2">
              <router-link
                :to="{
                  name: 'create_client',
                }"
              >
                <CButton color="primary"> Create Client</CButton>
              </router-link>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol :md="2">
              <select
                type="text"
                class="form-control"
                v-model="search.country"
                 @change="getClients"
              >
              <option value="" selected disabled>Country</option>
                <template v-for="country in countries" :key="country.code">
                  <option :value="country.code">{{ country.name }}</option>
                </template>
              </select>
            </CCol>
            <CCol :md="2">
              <select
                type="text"
                class="form-control"
                v-model="search.gender"
                 @change="getClients"
              >
              <option value="" selected disabled>Gender</option>
              <option value="1">Male</option>
              <option value="0">Female</option>
              </select>
            </CCol>
            <CCol :md="2">
              <input
                type="text"
                class="form-control"
                v-model="search.name"
                placeholder="Name"
                @change="getClients"
              />
            </CCol>
            <CCol :md="2">
              <input
                type="text"
                class="form-control"
                v-model="search.phone"
                placeholder="Phone"
                @change="getClients"
              />
            </CCol>
            <CCol :md="2">
              <input
                type="text"
                class="form-control"
                v-model="search.id_no"
                placeholder="Id Number"
                @change="getClients"
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
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                <CTableHeaderCell scope="col">phone</CTableHeaderCell>
                <CTableHeaderCell scope="col">ID Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">ID No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date Of Birth</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="client in clients" :key="client.id">
                <CTableHeaderCell scope="row">{{ client.id }}</CTableHeaderCell>
                <CTableDataCell>{{ client.fullname }}</CTableDataCell>
                <CTableDataCell>
                  <span v-if="client.gender === 1">Male</span>
                  <span v-if="client.gender === 0">Female</span>
                </CTableDataCell>
                <CTableDataCell>{{ client.country_id }}</CTableDataCell>
                <CTableDataCell>{{ client.phone }}</CTableDataCell>
                <CTableDataCell>{{ client.id_type }}</CTableDataCell>
                <CTableDataCell>{{ client.id_no }}</CTableDataCell>
                <CTableDataCell>{{ client.dob }}</CTableDataCell>
                <CTableDataCell>
                  <router-link
                    :to="{
                      name: 'user_info',
                      params: { id: client.id },
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
                      name: 'update_client',
                      params: { id: client.id },
                    }"
                  >
                    <CButton class="btn btn-success text-white">Update</CButton>
                  </router-link>
                  <button
                    class="btn btn-danger text-white"
                    @click="deleteClient(client.id)"
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
                  <li class="page-item" v-if="current_page > 1">
                    <a class="page-link" href="#" @click.prevent="previousPage"
                      >Previous</a
                    >
                  </li>
                  <li class="page-item" v-for="page in pagination" :key="page">
                    <a
                      @click.prevent="gotoPage(page.url)"
                      class="page-link"
                      href="#"
                      v-html="page.label"
                      v-if="page.url"
                    ></a>
                  </li>
                  <li class="page-item" v-if="last_page > current_page">
                    <a class="page-link" href="#" @click.prevent="nextPage">
                      Next</a
                    >
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
import countries from "@/store/countries";

export default {
  name: 'clients',
  data() {
    return {
      countries,
      clients: {},
      search: {
        gender:'',
        country:''
       },
      current_page: 1,
      last_page: 99,
      selected_user: null,
      loading: false,
      pagination: {},
    }
  },
  mounted() {
    this.getClients()
  },
  methods: {
    nextPage: async function () {
      this.current_page = this.current_page + 1
      this.search.page = this.current_page
      await this.getClients()
    },
    previousPage: async function () {
      this.current_page = this.current_page - 1
      this.search.page = this.current_page
      await this.getClients()
    },
    getClients: async function () {
      this.loading = true
      await axios
        .get(`/clients/paginate`, {
          params: this.search,
        })
        .then((response) => {
          this.clients = response.data.data
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
          this.total_pages = response.data.total / response.data.per_page
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
          this.clients = response.data.data
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
          this.total_pages = response.data.total / response.data.per_page
          this.pagination = response.data.links
        })
      this.loading = false
    },
    deleteClient: async function (id) {
      await axios.post(`/clients/delete/` + id).then((response) => {
        alert(response.data.message)
        this.getVehicles()
      })
    },
  },
}
</script>
