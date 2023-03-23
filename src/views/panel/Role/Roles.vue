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
              <router-link :to="{ name: 'Create client' }">
                <CButton color="success" class="float-end text-white">
                  <ion-icon name="person-add-outline"></ion-icon>&nbsp;
                  <span>Create Client</span>
                </CButton>
              </router-link>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <!-- Start search filters -->
          <CRow>
            <CCol :md="2">
              <input
                type="text"
                class="form-control mb-3"
                v-model="search.fullname"
                placeholder="Full Name"
                @change="getClients"
              />
            </CCol>
            <CCol :md="2">
              <select
                class="form-control mb-3"
                v-model="search.country"
                @change="getClients"
              >
                <option value="" selected>Any Country</option>
                <template v-for="country in countries" :key="country.code">
                  <option :value="country.id">{{ country.title }}</option>
                </template>
              </select>
            </CCol>
            <CCol :md="2">
              <select
                class="form-control mb-3"
                v-model="search.gender"
                @change="getClients"
              >
                <option value="" selected disabled>Gender</option>
                <option value="Male">{{ $t('Male') }}</option>
                <option value="Female">{{ $t('Female') }}</option>
              </select>
            </CCol>
            <CCol :md="2">
              <input
                type="number"
                class="form-control mb-3"
                v-model="search.phone"
                placeholder="Phone"
                @change="getClients"
              />
            </CCol>
            <CCol :md="2">
              <input
                type="number"
                class="form-control mb-3"
                v-model="search.id_number"
                placeholder="ID Number"
                @change="getClients"
              />
            </CCol>
          </CRow>
          <hr />
          <!-- End filter -->
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
                <CTableHeaderCell scope="col">Full Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                <CTableHeaderCell scope="col">ID Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">ID #</CTableHeaderCell>
                <CTableHeaderCell scope="col">ID Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="client in clients" :key="client.id">
                <CTableDataCell>{{ client.fullname }}</CTableDataCell>
                <CTableDataCell>{{ $t(client.country?.title) }}</CTableDataCell>
                <CTableDataCell>{{ client.id_type }}</CTableDataCell>
                <CTableDataCell>{{ client.id_number }}</CTableDataCell>
                <CTableDataCell>{{ client.id_name }}</CTableDataCell>
                <CTableDataCell>{{ client.gender }}</CTableDataCell>
                <CTableDataCell>
                  <button
                    class="btn btn-sm btn-info text-white mx-1"
                    :title="$t('View details')"
                    @click="viewDetails(client.id)"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <router-link
                    :to="{
                      name: 'Update client',
                      params: { id: this.$encrypt(client.id) },
                    }"
                  >
                    <CButton
                      class="btn btn-sm btn-warning text-white m-1"
                      :title="$t('Edit')"
                    >
                      <ion-icon name="create-outline"></ion-icon>
                    </CButton>
                  </router-link>
                  <button
                    class="btn btn-sm btn-danger text-white m-1"
                    @click="deleteClient(client.id, client.fullname)"
                    :title="$t('Delete')"
                  >
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

  <CModal
    size="lg"
    :visible="visibleLiveDemo"
    @close="visibleLiveDemo = false"
    class="modal-popup-detail"
  >
    <CModalHeader>
      <CModalTitle>Client Information</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CRow>
        <CCol :md="12">
          <CTable class="table table-responsive">
            <CTableRow>
              <CTableHeaderCell>Full Name:</CTableHeaderCell>
              <CTableDataCell>{{ client.fullname }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Gender:</CTableHeaderCell>
              <CTableDataCell>{{ client.gender }}</CTableDataCell>
              <CTableHeaderCell>Country:</CTableHeaderCell>
              <CTableDataCell>{{ client.country_id }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Phone:</CTableHeaderCell>
              <CTableDataCell>
                {{ client.phone }}
              </CTableDataCell>
              <CTableHeaderCell>Is Handicap:</CTableHeaderCell>
              <CTableDataCell>
                <CBadge
                  :color="client.is_handicap ? 'success' : 'warning'"
                  shape="rounded-pill"
                >
                  {{ client.is_handicap ? 'Yes' : 'No' }}
                </CBadge>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>ID No:</CTableHeaderCell>
              <CTableDataCell>{{ client.id_number }}</CTableDataCell>
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
export default {
  name: 'Roles',
  data: () => ({
    roles: [],
    search: {
      gender: '',
      country: '',
    },
    loading: false,
    pagination: [],
  }),
  methods: {
    getClients: async function () {
      this.loading = true
      await this.$axios
        .get(`/clients`, {
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
        text: `Once deleted, you will not be able to recover!`,
        icon: 'warning',
        buttons: [this.$i18n.t('Cancel'), this.$i18n.t('Confirm')],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.delete(`/clients/${id}`).then(() => this.getClients())
          swal(`The client ${name} has been deleted!`, {
            icon: 'success',
          })
        }
      })
    },
    viewDetails: async function (id) {
      await this.$axios.get(`/clients/${id}`).then((response) => {
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
