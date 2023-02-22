<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Phases</strong>
            </div>
            <div class="col-md-2">
              <router-link
                :to="{
                  name: 'Create Phase',
                }"
              >
                <CButton color="primary" class="float-end"> Create Phase</CButton>
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
                v-model="search.title"
                placeholder="Title"
                @change="getPhases"
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
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col" class="float-end">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="phase in phases" :key="phase.id">
                <CTableHeaderCell scope="row">{{ phase.id }}</CTableHeaderCell>
                <CTableDataCell>{{ phase.title }}</CTableDataCell>
                <CTableDataCell class="float-end">
                  <router-link
                    :to="{
                      name: 'phase_info',
                      params: { id: phase.id },
                    }"
                  >
                    <button
                      class="btn btn-sm btn-info text-white mx-1"
                    >
                      View
                    </button>
                  </router-link>
                  <router-link
                    :to="{
                      name: 'update_phase',
                      params: { id: phase.id },
                    }"
                  >
                    <CButton class="btn btn-sm btn-success text-white mx-1">Update</CButton>
                  </router-link>
                  <button
                    class="btn btn-sm btn-danger text-white mx-1"
                    @click="deletePhase(phase.id)"
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
  name: 'clients',
  data() {
    return {
      phases: {},
      search: {
        title:'',
       },
      current_page: 1,
      last_page: 99,
      selected_user: null,
      loading: false,
      pagination: {},
    }
  },
  mounted() {
    this.getPhases()
  },
  methods: {
    nextPage: async function () {
      this.current_page = this.current_page + 1
      this.search.page = this.current_page
      await this.getPhases()
    },
    previousPage: async function () {
      this.current_page = this.current_page - 1
      this.search.page = this.current_page
      await this.getPhases()
    },
    getPhases: async function () {
      this.loading = true
      await axios
        .get(`/phases/paginate`, {
          params: this.search,
        })
        .then((response) => {
          this.phases = response.data.data
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
          this.phases = response.data.data
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
          this.total_pages = response.data.total / response.data.per_page
          this.pagination = response.data.links
        })
      this.loading = false
    },
    deletePhase: async function (id) {
      await axios.post(`/phases/delete/` + id).then((response) => {
        alert(response.data.message)
        this.getPhases()
      })
    },
  },
}
</script>
