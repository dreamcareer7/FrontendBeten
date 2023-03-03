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
                  <svg
                    clip-rule="evenodd"
                    class="button-icon"
                    fill-rule="evenodd"
                    stroke-linejoin="round"
                    stroke-miterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m21 3.998c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-16.5.5h15v15h-15zm6.75 6.752h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
                      fill-rule="nonzero"
                    />
                  </svg>
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
                @change="getCrews"
              />
            </CCol>
            <CCol :md="2" :sm="6">
              <input
                type="text"
                class="form-control mb-3"
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
          <CTable v-if="!loading" responsive hover class="cursor-pointer">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Full Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                <CTableHeaderCell scope="col">ID Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">ID Number</CTableHeaderCell>
                <CTableHeaderCell scope="col">Active</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created</CTableHeaderCell>
                <CTableHeaderCell style="width: 10%" :aria-colspan="2"
                  >Action</CTableHeaderCell
                >
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow
                v-for="crew in crews"
                :key="crew.id"
                @click="viewDetails(crew.id)"
                v-c-tooltip="{ content: 'View Detail.', placement: 'left' }"
              >
                <CTableHeaderCell scope="row">{{ crew.id }}</CTableHeaderCell>
                <CTableDataCell>{{ crew.fullname }}</CTableDataCell>
                <CTableDataCell>{{ crew.country_name }}</CTableDataCell>
                <CTableDataCell>{{ crew.phone }}</CTableDataCell>
                <CTableDataCell>{{ crew.id_type }}</CTableDataCell>
                <CTableDataCell>{{ crew.id_no }}</CTableDataCell>
                <CTableDataCell>
                  <CBadge
                    :color="crew.is_active ? 'success' : 'warning'"
                    shape="rounded-pill"
                    >{{ crew.is_active ? 'Yes' : 'No' }}</CBadge
                  >
                </CTableDataCell>
                <CTableDataCell>{{ crew.created_at }}</CTableDataCell>
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
                    @click="deleteCrew(crew.id)"
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
          <CTableHeaderCell>ID:</CTableHeaderCell>
          <CTableDataCell>{{ crew_member.id }}</CTableDataCell>
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

        <CTableRow class="mt-3">
          <CTableHeaderCell>Contact</CTableHeaderCell>
          <CTableDataCell>{{ crew_member.country_id }}</CTableDataCell>
          <CTableHeaderCell>Date Created:</CTableHeaderCell>
          <CTableDataCell>{{ crew_member.created_at }}</CTableDataCell>
        </CTableRow>

        <CTableRow class="mt-3">
          <CTableHeaderCell>Date Updated:</CTableHeaderCell>
          <CTableDataCell>{{ crew_member.updated_at }}</CTableDataCell>
        </CTableRow>
      </CTable>
      <Contractable type="crew" :id="crew_member.id" />
      <Documentable type="crew" :id="crew_member.id" />
    </CModalBody>
  </CModal>
</template>

<script>
export default {
  name: 'CrewMembers',
  data: () => ({
    crews: {},
    search: {},
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
        .get(`/crews/paginate`, {
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
          this.$axios.post(`/crews/delete/${id}`).then(() => this.getCrews())
          swal('Crew member has been deleted!', {
            icon: 'success',
          })
        }
      })
    },
    viewDetails: async function (id) {
      await this.$axios.get(`/crews/info/${id}`).then((response) => {
        this.crew_member = response.data
        this.visibleLiveDemo = true
      })
    },
  },
  mounted() {
    this.getCrews()
  },
}
</script>
