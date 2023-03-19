<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <CRow>
            <CCol :md="8" :sm="4">
              <h3 class="mt-1">Crew members</h3>
            </CCol>
            <CCol :md="4" :sm="8">
              <router-link :to="{ name: 'Create crew' }">
                <CButton color="success" class="float-end text-white">
                  <ion-icon name="create-outline"></ion-icon>&nbsp;
                  <span>Create Crew</span>
                </CButton>
              </router-link>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol :md="2" :sm="6">
              <input
                type="text"
                class="form-control mb-3"
                v-model="search.fullname"
                placeholder="Full Name"
                @keyup="filter(search.fullname)"
              />
            </CCol>
            <CCol :md="2">
              <select
                class="form-control mb-3"
                v-model="search.country"
                @change="filter('¯\_(ツ)_/¯')"
              >
                <option value="" selected>Any Country</option>
                <template v-for="country in countries" :key="country.code">
                  <option :value="country.id">{{ country.title }}</option>
                </template>
              </select>
            </CCol>
            <CCol :md="2" :sm="6">
              <input
                type="text"
                class="form-control mb-3"
                v-model="search.phone"
                placeholder="Phone number"
                @keyup="filter(search.phone)"
              />
            </CCol>
            <CCol :md="2" :sm="6">
              <input
                type="text"
                class="form-control mb-3"
                v-model="search.id_number"
                placeholder="ID Number"
                @keyup="filter(search.id_number)"
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
          <CTable v-if="!loading" responsive hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Full Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                <CTableHeaderCell scope="col">ID Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">ID Number</CTableHeaderCell>
                <CTableHeaderCell scope="col">Active</CTableHeaderCell>
                <CTableHeaderCell style="width: 10%" :aria-colspan="2"
                  >Action</CTableHeaderCell
                >
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="crew in crews" :key="crew.id">
                <CTableDataCell>{{ crew.fullname }}</CTableDataCell>
                <CTableDataCell>{{ crew.country?.title }}</CTableDataCell>
                <CTableDataCell>{{ crew.phone }}</CTableDataCell>
                <CTableDataCell>{{ crew.id_type }}</CTableDataCell>
                <CTableDataCell>{{ crew.id_number }}</CTableDataCell>
                <CTableDataCell>
                  <CBadge
                    :color="crew.is_active ? 'success' : 'warning'"
                    shape="rounded-pill"
                    >{{ crew.is_active ? 'Yes' : 'No' }}</CBadge
                  >
                </CTableDataCell>
                <CTableDataCell>
                  <button
                    class="btn btn-sm btn-info text-white mx-1"
                    title="View details"
                    @click="viewDetails(crew.id)"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <router-link
                    :to="{
                      name: 'Update crew',
                      params: { id: this.$encrypt(crew.id) },
                    }"
                  >
                    <CButton
                      class="btn btn-sm btn-warning text-white m-1"
                      :xl="0"
                      title="Edit"
                    >
                      <ion-icon name="create-outline"></ion-icon>
                    </CButton>
                  </router-link>
                  <button
                    class="btn btn-sm btn-danger text-white m-1"
                    @click.stop="deleteCrew(crew.id)"
                    title="Delete"
                  >
                    <ion-icon name="trash-bin-outline"></ion-icon>
                  </button>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <CRow>
            <CCol :md="12" class="text-center">
              <nav aria-label="Groups navigation">
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
      <CModalTitle>Crew Member Details</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CTable class="table table-responsive">
        <CTableRow class="mt-3">
          <CTableHeaderCell>Full Name:</CTableHeaderCell>
          <CTableDataCell>{{ crew_member.fullname }}</CTableDataCell>
        </CTableRow>

        <CTableRow class="mt-3">
          <CTableHeaderCell>Gender:</CTableHeaderCell>
          <CTableDataCell>
            {{ crew_member.gender === 1 ? 'Male' : 'Female' }}
          </CTableDataCell>
          <CTableHeaderCell>Profession:</CTableHeaderCell>
          <CTableDataCell>{{ crew_member.profession_id }}</CTableDataCell>
        </CTableRow>

        <CTableRow class="mt-3">
          <CTableHeaderCell>Country:</CTableHeaderCell>
          <CTableDataCell>{{ crew_member.country_id }}</CTableDataCell>
          <CTableHeaderCell>Phone:</CTableHeaderCell>
          <CTableDataCell>{{ crew_member.phone }}</CTableDataCell>
        </CTableRow>

        <CTableRow class="mt-3">
          <CTableHeaderCell>ID Type:</CTableHeaderCell>
          <CTableDataCell>{{ crew_member.id_type }}</CTableDataCell>
          <CTableHeaderCell>Active:</CTableHeaderCell>
          <CTableDataCell>
            <CBadge
              :color="crew_member.is_active ? 'success' : 'warning'"
              shape="rounded-pill"
              >{{ crew_member.is_active ? 'Yes' : 'No' }}</CBadge
            >
          </CTableDataCell>
        </CTableRow>
      </CTable>
      <Contractable type="crew" :id="crew_member.id" />
      <Documentable type="crew" :id="crew_member.id" />
    </CModalBody>
  </CModal>
</template>

<script>
import { debounce } from '@/utils/helper'
import countries from '@/store/countries'

export default {
  name: 'CrewMembers',
  data: () => ({
    debounceFn: null,
    countries: [],
    crews: {},
    search: {
      fullname: '',
      country: '',
      phone: '',
      id_number: ''
    },
    selected_user: null,
    loading: false,
    pagination: [],
    crew_member: {},
    visibleLiveDemo: false,
  }),
  methods: {
    getCrews: async function () {
      this.loading = true
      await this.$axios
        .get(`/crews`, {
          params: this.search,
        })
        .then((response) => {
          this.crews = response.data.data
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
          let total_pages = response.data.total / response.data.per_page
          this.total_pages = total_pages
          this.pagination = response.data.links ? response.data.links : {}
        })
      this.loading = false
    },
    filter: async function (value) {
      if (value.length > 2) {
        await this.debounceFn()
      }
    },
    gotoPage: async function (url) {
      this.loading = true
      await this.$axios
        .get(url, {
          params: this.search,
        })
        .then((response) => {
          this.crews = response.data.data
          this.pagination = response.data.links
          this.loading = false
        })
    },
    deleteCrew: async function (id) {
      await swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this crew member!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.delete(`/crews/${id}`).then(() => this.getCrews())
          swal('Crew member has been deleted!', {
            icon: 'success',
          })
        }
      })
    },
    viewDetails: async function (id) {
      await this.$axios.get(`/crews/${id}`).then((response) => {
        this.crew_member = response.data
        this.visibleLiveDemo = true
      })
    },
  },
  mounted: async function () {
    await this.getCrews()
    this.debounceFn = debounce(() => this.getCrews(), 500)
    countries.fetchCountries().then((countries) => {
      this.countries = countries
    })
  },
}
</script>
