<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-8 col-sm-4">
              <h3 class="mt-1">Clients</h3>
            </div>
            <div class="col-md-4 col-sm-8">
              <router-link
                :to="{
                  name: 'Create client',
                }"
              >
                <CButton color="success" class="float-end text-white">
                  <svg
                    class="button-icon"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    stroke-linejoin="round"
                    stroke-miterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m20 20h-15.25c-.414 0-.75.336-.75.75s.336.75.75.75h15.75c.53 0 1-.47 1-1v-15.75c0-.414-.336-.75-.75-.75s-.75.336-.75.75zm-1-17c0-.478-.379-1-1-1h-15c-.62 0-1 .519-1 1v15c0 .621.52 1 1 1h15c.478 0 1-.379 1-1zm-15.5.5h14v14h-14zm6.25 6.25h-3c-.414 0-.75.336-.75.75s.336.75.75.75h3v3c0 .414.336.75.75.75s.75-.336.75-.75v-3h3c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3v-3c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
                      fill-rule="nonzero"
                    />
                  </svg>
                  <span>Create Client</span>
                </CButton>
              </router-link>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol :md="2">
              <select
                type="text"
                class="form-control mb-3"
                v-model="search.country"
                @change="getClients"
              >
                <option value="" selected disabled>Country</option>
                <template v-for="country in countries" :key="country.code">
                  <option :value="country.id">{{ country.name }}</option>
                </template>
              </select>
            </CCol>
            <CCol :md="2">
              <select
                type="text"
                class="form-control mb-3"
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
                class="form-control mb-3"
                v-model="search.name"
                placeholder="Name"
                @change="getClients"
              />
            </CCol>
            <CCol :md="2">
              <input
                type="text"
                class="form-control mb-3"
                v-model="search.phone"
                placeholder="Phone"
                @change="getClients"
              />
            </CCol>
            <CCol :md="2">
              <input
                type="text"
                class="form-control mb-3"
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
          <CTable v-if="!loading" responsive>
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
                <CTableDataCell>{{ client.country_name }}</CTableDataCell>
                <CTableDataCell>{{ client.phone }}</CTableDataCell>
                <CTableDataCell>{{ client.id_type }}</CTableDataCell>
                <CTableDataCell>{{ client.id_no }}</CTableDataCell>
                <CTableDataCell>{{ client.dob }}</CTableDataCell>
                <CTableDataCell>
                  <button
                    class="btn btn-sm btn-info text-white mx-1"
                    title="View details"
                    @click="viewDetails(client.id)"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <router-link
                    :to="{
                      name: 'update_client',
                      params: { id: this.$encrypt(client.id) },
                    }">
                    <CButton
                      class="btn btn-sm btn-warning text-white m-1"
                      title="Edit"
                    >
                      <ion-icon name="create-outline"></ion-icon>
                    </CButton>
                  </router-link>
                  <button
                    class="btn btn-sm btn-danger text-white m-1"
                    @click="deleteClient(client.id, client.fullname)"
                    title="Delete">
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

    <CModal
      size="lg"
      :visible="visibleLiveDemo"
      @close="visibleLiveDemo = false"
    >
      <CModalHeader>
        <CModalTitle>Client Details</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CTable class="table table-responsive">
          <CTableRow class="mt-3">
            <CTableHeaderCell>ID:</CTableHeaderCell>
            <CTableDataCell>{{ current_client.id }}</CTableDataCell>
            <CTableHeaderCell>Full Name:</CTableHeaderCell>
            <CTableDataCell>{{ current_client.fullname }}</CTableDataCell>
          </CTableRow>

          <CTableRow class="mt-3">
            <CTableHeaderCell>Gender:</CTableHeaderCell>
            <CTableDataCell>
              {{ current_client.gender === 1 ? 'Male' : 'Female' }}
            </CTableDataCell>
            <CTableHeaderCell>Country:</CTableHeaderCell>
            <CTableDataCell>{{ current_client.country_id }}</CTableDataCell>
          </CTableRow>

          <CTableRow class="mt-3">
            <CTableHeaderCell>Phone Number:</CTableHeaderCell>
            <CTableDataCell>{{ current_client.phone }}</CTableDataCell>
            <CTableHeaderCell>ID Type:</CTableHeaderCell>
            <CTableDataCell>{{ current_client.id_type }}</CTableDataCell>
          </CTableRow>

          <CTableRow class="mt-3">
            <CTableHeaderCell>ID Number:</CTableHeaderCell>
            <CTableDataCell>{{ current_client.id_no }}</CTableDataCell>
            <CTableHeaderCell>Date of Birth:</CTableHeaderCell>
            <CTableDataCell>{{ current_client.dob }}</CTableDataCell>
          </CTableRow>

          <CTableRow class="mt-3">
            <CTableHeaderCell>Is Handicap?:</CTableHeaderCell>
            <CTableDataCell>{{ current_client.is_handicap ? 'Yes' : 'No' }}</CTableDataCell>
          </CTableRow>
        </CTable>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="visibleLiveDemo = false">
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  </CRow>

  <CModal size="lg" :visible="visibleLiveDemo" @close="visibleLiveDemo = false" class="modal-popup-detail">
    <CModalHeader>
      <CModalTitle>Client Information</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CRow>
        <CCol :md="12">
          <CTable class="table table-responsive">
            <CTableRow>
              <CTableHeaderCell>ID:</CTableHeaderCell>
              <CTableDataCell>{{ client.id }}</CTableDataCell>
              <CTableHeaderCell>Full Name:</CTableHeaderCell>
              <CTableDataCell>{{ client.fullname }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Gender:</CTableHeaderCell>
              <CTableDataCell>{{ client.gender == 1 ? 'Male' : 'Female' }}</CTableDataCell>
              <CTableHeaderCell>Country:</CTableHeaderCell>
              <CTableDataCell>{{ client.country_id }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Phone:</CTableHeaderCell>
              <CTableDataCell>
                {{ client.phone}}
              </CTableDataCell>
              <CTableHeaderCell>Is Handicap:</CTableHeaderCell>
              <CTableDataCell>
                <CBadge :color="client.is_handicap === 1 ? 'success' : 'warning'" shape="rounded-pill">{{ client.is_handicap === 1 ? 'Yes' : 'No'}}</CBadge>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>ID No:</CTableHeaderCell>
              <CTableDataCell>{{ client.id_no }}</CTableDataCell>
              <CTableHeaderCell>ID Type</CTableHeaderCell>
              <CTableDataCell>{{ client.id_type }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Date Of Birth:</CTableHeaderCell>
              <CTableDataCell>{{ client.dob }}</CTableDataCell>
            </CTableRow>
          </CTable>
        </CCol>
      </CRow>
    </CModalBody>
  </CModal>
</template>

<script>
import countries from '@/store/countries'

export default {
  name: 'Client',
  data: () => ({
    countries: [],
    clients: {},
    search: {
      gender: '',
      country: '',
    },
    current_page: 1,
    last_page: 99,
    selected_user: null,
    loading: false,
    pagination: {},
    client:{},
    visibleLiveDemo: false,
  }),
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
      await this.$axios
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
      await this.$axios
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
    deleteClient: async function (id, name) {
      await swal({
        title: `Are you sure?`,
        text: `Once deleted, you will not be able to recover the client ${name}!`,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios
            .post(`/clients/delete/` + id)
            .then(() => this.getClients())
          swal(`The client ${name} has been deleted!`, {
            icon: 'success',
          })
        }
      })
    },
    viewDetails: async function (id) {
      await this.$axios.get(`/clients/info/${id}`).then((response) => {
        this.client = response.data
        this.visibleLiveDemo = true
      })
    },
  },
  mounted() {
    this.getClients()
    countries.fetchCountries().then((countries) => {
      this.countries = countries
    })
  },
}
</script>
