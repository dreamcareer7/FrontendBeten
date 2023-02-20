<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Crews</strong>
            </div>
            <div class="col-md-2">
              <router-link to="/crews/create">
                <CButton color="primary"> Create Crew </CButton>
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
                v-model="search.fullname"
                placeholder="Full Name"
                @change="getCrews"
              />
            </CCol>
            <CCol :md="2">
              <input
                type="text"
                class="form-control"
                v-model="search.id_type"
                placeholder="ID Type"
                @change="getCrews"
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
                <CTableHeaderCell scope="col">User</CTableHeaderCell>
                <CTableHeaderCell scope="col">Full Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                <CTableHeaderCell scope="col">Profession</CTableHeaderCell>
                <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                <CTableHeaderCell scope="col">ID Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">ID Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">ID Number</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date of Birth</CTableHeaderCell>
                <CTableHeaderCell scope="col">Is Active</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="crew in crews" :key="crew.id">
                <CTableHeaderCell scope="row">{{ crew.id }}</CTableHeaderCell>
                <CTableDataCell>{{ crew.user_id }}</CTableDataCell>
                <CTableDataCell>{{ crew.fullname }}</CTableDataCell>
                <CTableDataCell>{{ crew.gender }}</CTableDataCell>
                <CTableDataCell>{{ crew.profession }}</CTableDataCell>
                <CTableDataCell>{{ crew.country }}</CTableDataCell>
                <CTableDataCell>{{ crew.phone }}</CTableDataCell>
                <CTableDataCell>{{ crew.id_type }}</CTableDataCell>
                <CTableDataCell>{{ crew.id_name }}</CTableDataCell>
                <CTableDataCell>{{ crew.id_no }}</CTableDataCell>
                <CTableDataCell>{{ crew.dob }}</CTableDataCell>
                <CTableDataCell>{{ crew.is_active }}</CTableDataCell>
                <CTableDataCell>{{ crew.created_at }}</CTableDataCell>
                <CTableDataCell>
                  <router-link
                    :to="{
                      name: 'user_info',
                      params: { id: crew.id },
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
                      name: 'update_crew',
                      params: { id: crew.id },
                    }"
                  >
                    <CButton class="btn btn-success text-white">Update</CButton>
                  </router-link>
                  <button
                    class="btn btn-danger text-white"
                    @click="deleteCrew(crew.id)"
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
export default {
  name: 'users',
  data() {
    return {
      crews: {},
      search: {},
      current_page: 1,
      last_page: 99,
      selected_user: null,
      loading: false,
      pagination:{}
    }
  },
  mounted() {
    this.getCrews()
  },
  methods: {
    nextPage: async function () {
      this.current_page = this.current_page + 1
      this.search.page = this.current_page
      await this.getCrews()
    },
    previousPage: async function () {
      this.current_page = this.current_page - 1
      this.search.page = this.current_page
      await this.getCrews()
    },
    getCrews: async function () {
      this.loading = true
      await axios
        .get(`/crews/paginate`, {
          params: this.search,
        })
        .then((response) => {
          this.crews = response.data.data
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
          let total_pages = response.data.total / response.data.per_page
          this.total_pages = total_pages
          this.pagination = response.data.links ? response.data.links : {};
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
          this.crews = response.data.data
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
          let total_pages = response.data.total / response.data.per_page
          this.total_pages = total_pages
          this.pagination = response.data.links
        })
      this.loading = false
    },
    deleteCrew: async function (id) {
      await axios.post(`/crews/delete/` + id).then((response) => {
        alert(response.data.message)
        this.getCrews()
      })
    },
  },
}
</script>