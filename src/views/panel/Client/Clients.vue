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
                    @click="viewDetails(this.$encrypt(client.id))"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <router-link
                    :to="{
                      name: 'Update Client',
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
              <nav aria-label="Clients navigation">
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

  <CModal size="md" :visible="visibleLiveDemo" @close="visibleLiveDemo = false" class="modal-popup-detail">
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

            <CTableRow class="mt-3" v-if="client.is_contractable ?? false">
              <CTableDataCell colspan="4">
                <Contractable type="client" :id="client.id" />
              </CTableDataCell>
            </CTableRow>

            <CTableRow class="mt-0" v-if="client.is_documentable ?? false">
              <CTableDataCell colspan="4">
                <Documentable type="client" :id="client.id" />
              </CTableDataCell>
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
    selected_user: null,
    loading: false,
    pagination: [],
    client:{},
    visibleLiveDemo: false,
  }),
  methods: {
    getClients: async function () {
      this.loading = true
      await this.$axios
        .get(`/clients/paginate`, {
          params: this.search,
        })
        .then((response) => {
          this.clients = response.data.data
          this.pagination = response.data.links
          this.loading = false
        })
    },
    gotoPage: async function (url) {
      this.loading = true
      await this.$axios
        .get(url, {
          params: this.search,
        })
        .then((response) => {
          this.clients = response.data.data
          this.pagination = response.data.links
          this.loading = false
        })
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
      await this.$axios.get(`/clients/info/${this.$decrypt(id)}`).then((response) => {
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
