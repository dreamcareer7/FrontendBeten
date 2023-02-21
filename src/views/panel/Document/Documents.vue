<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Documents</strong>
            </div>
            <div class="col-md-2">
              <router-link
                :to="{
                  name: 'Create Document',
                }"
              >
                <CButton color="primary"> Upload Document </CButton>
              </router-link>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol :md="2">
              <select
                class="form-control"
                v-model="search.model_type"
              >
                <option value="others">others</option>
                <option value="Contract">Contract</option>
                <option value="Crew">Crew</option>
                <option value="User">User</option>
                <option value="Meal">Meal</option>
                <option value="Complaint">Complaint</option>
                <option value="Dormitory">Dormitory</option>

              </select>
            </CCol>
            <CCol :md="2">
              <input
                type="text"
                class="form-control"
                v-model="search.title"
                placeholder="Title"
                @change="getDocuments"
              />
            </CCol>
            <CCol :md="2">
              <input
                type="text"
                class="form-control"
                v-model="search.model_id"
                placeholder="Model Id"
                @change="getDocuments"
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
                <CTableHeaderCell scope="col"> </CTableHeaderCell>
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Model Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Model Id</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="document in documents" :key="document.id">
                <CTableHeaderCell scope="row">{{ document.id }}</CTableHeaderCell>
                <CTableDataCell>{{ document.title }}</CTableDataCell>
                <CTableDataCell>{{ document.title }}</CTableDataCell>
                <CTableDataCell>{{ document.model_type }}</CTableDataCell>
                <CTableDataCell>{{ document.model_id }}</CTableDataCell>
                <CTableDataCell>

                  <router-link
                    :to="{
                      name: 'View Document',
                      params: { id: document.id },
                    }"
                  >
                    <CButton class="btn btn-success text-white m">
                      <ion-icon name="eye-outline"></ion-icon>

                    </CButton>
                  </router-link>
                  <router-link
                    :to="{
                      name: 'update_document',
                      params: { id: document.id },
                    }"
                  >
                    <CButton class="btn btn-success text-white">
                      <ion-icon name="create-outline"></ion-icon>

                    </CButton>
                  </router-link>
                  <button
                    class="btn btn-danger text-white"
                    @click="deleteDocument(document.id)"
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
  <!-- Vertically centered scrollable modal -->
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    ...
  </div>
</template>

<script>
import axios from 'axios'
import countries from "@/store/countries";

export default {
  name: 'clients',
  data() {
    return {
      countries,
      documents: {},
      search: {
        model_type:'',
      },
      current_page: 1,
      last_page: 99,
      selected_user: null,
      loading: false,
      pagination: {},
    }
  },
  mounted() {
    this.getDocuments()
  },
  methods: {
    nextPage: async function () {
      this.current_page = this.current_page + 1
      this.search.page = this.current_page
      await this.getDocuments()
    },
    previousPage: async function () {
      this.current_page = this.current_page - 1
      this.search.page = this.current_page
      await this.getDocuments()
    },
    getDocuments: async function () {
      this.loading = true
      await axios
        .get(`/documents/paginate`, {
          params: this.search,
        })
        .then((response) => {
          this.documents = response.data.data
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
          this.documents = response.data.data
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
          this.total_pages = response.data.total / response.data.per_page
          this.pagination = response.data.links
        })
      this.loading = false
    },
    deleteDocument: async function (id) {
      await axios.post(`/documents/delete/` + id).then((response) => {
        alert(response.data.message)
        this.getDocuments()
      })
    },
  },
}
</script>
