<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Dormitories</strong>
            </div>
            <div class="col-md-2">
              <router-link
                :to="{
                  name: 'create_dormitory',
                }"
              >
                <CButton color="primary" class="float-end">
                  Create Dormitory</CButton
                >
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
                placeholder="title.."
                @change="getDormitories"
              />
            </CCol>
            <CCol :md="2">
              <input
                type="text"
                class="form-control"
                v-model="search.phone"
                placeholder="Phone.."
                @change="getDormitories"
              />
            </CCol>
            <CCol :md="2">
              <input
                type="text"
                class="form-control"
                v-model="search.country"
                placeholder="Country"
                @change="getDormitories"
              />
            </CCol>
            <CCol :md="2">
              <input
                type="text"
                class="form-control"
                v-model="search.city"
                placeholder="City"
                @change="getDormitories"
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
                <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                <CTableHeaderCell scope="col">City</CTableHeaderCell>
                <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                <CTableHeaderCell scope="col">Coordinate</CTableHeaderCell>
                <CTableHeaderCell scope="col">Is Active</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="dormitory in dormitories" :key="dormitory.id">
                <CTableHeaderCell scope="row">{{
                  dormitory.id
                }}</CTableHeaderCell>
                <CTableDataCell>{{ dormitory.title }}</CTableDataCell>
                <CTableDataCell>{{ dormitory.phone }}</CTableDataCell>
                <CTableDataCell>{{ dormitory.country_name }}</CTableDataCell>
                <CTableDataCell>{{ dormitory.city_id }}</CTableDataCell>
                <CTableDataCell>{{ dormitory.location }}</CTableDataCell>
                <CTableDataCell>{{ dormitory.coordinate }}</CTableDataCell>
                <CTableDataCell>{{ dormitory.is_active }}</CTableDataCell>
                <CTableDataCell>
                  <button
                    class="btn btn-sm btn-info text-white mx-1"
                    title="View details"
                    @click="viewDetails(dormitory.id)"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <router-link
                    :to="{
                      name: 'update_dormitory',
                      params: { id: this.$encrypt(dormitory.id) },
                    }"
                  >
                    <CButton class="btn btn-warning text-white">Update</CButton>
                  </router-link>
                  <button
                    class="btn btn-danger text-white"
                    @click="deleteDormitory(dormitory.id)"
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
  <CModal :visible="visibleLiveDemo" @close="visibleLiveDemo = false">
    <CModalHeader>
      <CModalTitle>Dormitory details</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CTable class="table table-responsive">
        <CTableRow>
          <CTableDataCell>ID</CTableDataCell>
          <CTableDataCell>{{ dormitory.id }}</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>Title</CTableDataCell>
          <CTableDataCell>{{ dormitory.title }}</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>Phone</CTableDataCell>
          <CTableDataCell>
            {{ dormitory.phone }}
          </CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>Country</CTableDataCell>
          <CTableDataCell>{{ dormitory.country }}</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>City</CTableDataCell>
          <CTableDataCell>{{ dormitory.city_id }}</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>Location</CTableDataCell>
          <CTableDataCell>{{ dormitory.location }}</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>Coordinates</CTableDataCell>
          <CTableDataCell>{{ dormitory.coordinate }}</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>Is active?</CTableDataCell>
          <CTableDataCell>{{
            dormitory.is_active ? 'Yes' : 'No'
          }}</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>Date created</CTableDataCell>
          <CTableDataCell>{{ dormitory.created_at }}</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>Date updated</CTableDataCell>
          <CTableDataCell>{{ dormitory.updated_at }}</CTableDataCell>
        </CTableRow>
      </CTable>
    </CModalBody>
    <CModalFooter>
      <Contractable :endpoint="`dormitories/update/${dormitory.id}`" />
      <CButton color="secondary" @click="visibleLiveDemo = false">
        Close
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
export default {
  name: 'dormitories',
  data() {
    return {
      dormitories: {},
      search: {},
      current_page: 1,
      total_pages: 1,
      last_page: 99,
      selected_user: null,
      loading: false,
      pagination: {},
      dormitory: {},
      visibleLiveDemo: false,
    }
  },
  mounted() {
    this.getDormitories()
  },
  methods: {
    viewDetails: async function (id) {
      await this.$axios.get(`/dormitories/info/${id}`).then((response) => {
        this.dormitory = response.data
        this.visibleLiveDemo = true
      })
    },
    nextPage: async function () {
      this.current_page = this.current_page + 1
      this.search.page = this.current_page
      await this.getDormitories()
    },
    previousPage: async function () {
      this.current_page = this.current_page - 1
      this.search.page = this.current_page
      await this.getDormitories()
    },
    getDormitories: async function () {
      this.loading = true
      await this.$axios
        .get(`/dormitories/paginate`, {
          params: this.search,
        })
        .then((response) => {
          this.dormitories = response.data.data
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
          this.total_pages = response.data.total / response.data.per_page
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
          this.dormitories = response.data.data
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
          this.total_pages = response.data.total / response.data.per_page
          this.pagination = response.data.links
        })
      this.loading = false
    },
    deleteDormitory: async function (id) {
      await swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this dormitory!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios
            .post(`/dormitories/delete/${id}`)
            .then(() => this.getDormitories())
          swal('Dormitory has been deleted!', {
            icon: 'success',
          })
        }
      })
    },
  },
}
</script>
