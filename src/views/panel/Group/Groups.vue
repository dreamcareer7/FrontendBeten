<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Groups</strong>
            </div>
            <div class="col-md-2">
              <router-link
                :to="{
                  name: 'Create Group',
                }"
              >
                <CButton color="primary" class="float-end"> Create Group</CButton>
              </router-link>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol :md="2">
              <select
                v-model="search.crew_id"
                name="crew_id"
                id="crew_id"
                class="form-control"
                @change="getGroups"
              >
                <option>Choose Crew</option>
                <template v-for="crew in crews" :key="crew.id">
                  <option :value="crew.id">{{ crew.fullname }}</option>
                </template>
              </select>
            </CCol>
            <CCol :md="2">
              <input
                type="text"
                class="form-control"
                v-model="search.title"
                placeholder="Group Title"
                @change="getGroups"
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
                <CTableHeaderCell scope="col">Crew</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="group in groups" :key="group.id">
                <CTableHeaderCell scope="row">{{ group.id }}</CTableHeaderCell>
                <CTableDataCell>{{ group.title }}</CTableDataCell>
                <CTableDataCell>{{ group.crew.fullname }}</CTableDataCell>
                <CTableDataCell>

                  <router-link
                    :to="{
                      name: 'update_group',
                      params: { id: group.id },
                    }"
                  >
                    <CButton class="btn btn-success text-white">Update</CButton>
                  </router-link>
                  <button
                    class="btn btn-danger text-white"
                    @click="deleteGroup(group.id)"
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
      groups: {},
      search: {
        crew_id:'',
       },
      current_page: 1,
      last_page: 99,
      selected_user: null,
      loading: false,
      pagination: {},
    }
  },
  mounted() {
    this.getGroups()
    this.getCrews()
  },
  methods: {
    getCrews: async function () {
      await axios.get(`/crews/all`).then((response) => {
        this.crews = response.data
      })
    },
    nextPage: async function () {
      this.current_page = this.current_page + 1
      this.search.page = this.current_page
      await this.getGroups()
    },
    previousPage: async function () {
      this.current_page = this.current_page - 1
      this.search.page = this.current_page
      await this.getGroups()
    },
    getGroups: async function () {
      this.loading = true
      await axios
        .get(`/groups/paginate`, {
          params: this.search,
        })
        .then((response) => {
          this.groups = response.data.data
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
          this.groups = response.data.data
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
          this.total_pages = response.data.total / response.data.per_page
          this.pagination = response.data.links
        })
      this.loading = false
    },
    deleteGroup: async function (id) {
      await swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this group!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.post(`/groups/delete/${id}`).then(() => this.getGroups())
          swal('Group has been deleted!', {
            icon: 'success',
          })
        }
      })
    },
  },
}
</script>
