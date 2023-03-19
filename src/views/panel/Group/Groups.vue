<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Groups</strong>&nbsp;
              <ion-icon name="people-outline"></ion-icon>
            </div>
            <div class="col-md-2">
              <router-link :to="{ name: 'Create Group' }">
                <CButton color="primary" class="float-end">
                  Create Group
                  <ion-icon name="create-outline"></ion-icon>
                </CButton>
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
                placeholder="Search title"
                @keyup="filter(search.title)"
              />
            </CCol>
            <CCol :md="4">
              <input
                type="text"
                class="form-control"
                v-model="search.crew_member"
                placeholder="Search crew member"
                @keyup="filter(search.crew_member)"
              />
            </CCol>
          </CRow>
          <hr />
          <CRow v-if="loading" class="mt-4">
            <CCol :md="12" class="text-center">
              <div class="spinner-border text-success" role="status"></div>
            </CCol>
            <CCol :md="12" class="text-center">
              <span class="sr-only">Loading...</span>
            </CCol>
          </CRow>
          <CRow v-if="groups.length === 0 && !loading" class="mt-4">
            <CCol :md="12" class="text-center">
              <span class="sr-only">No results</span>
            </CCol>
          </CRow>
          <CTable v-if="!loading && groups.length > 0">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Crew member</CTableHeaderCell>
                <CTableHeaderCell
                  style="width: 20%"
                  scope="col"
                  :aria-colspan="2"
                >
                  Actions
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="group in groups" :key="group.id">
                <CTableDataCell>{{ group.title }}</CTableDataCell>
                <CTableDataCell>{{ group.crew.fullname }}</CTableDataCell>
                <CTableDataCell>
                  <button
                    class="btn btn-sm btn-info text-white mx-1"
                    title="View Details"
                    @click="fetchGroupInfo(group.id)"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <router-link
                    :to="{
                      name: 'Update Group',
                      params: { id: this.$encrypt(group.id) },
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
                    class="btn btn-sm btn-danger text-white"
                    @click="deleteGroup(group.id)"
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

  <!-- Small modal size unless documents or contracts -->
  <CModal
    :size="!group.is_documentable && !group.is_contractable ? 'sm' : 'lg'"
    :visible="is_group_modal_visible"
    @close="is_group_modal_visible = false"
    class="modal-popup-detail"
    data-backdrop="static"
    data-keyboard="false"
  >
    <CModalHeader>
      <CModalTitle>Group Information</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CRow>
        <CCol :md="12">
          <CTable class="table table-responsive">
            <CTableRow>
              <CTableDataCell>Title: {{ group.title }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>
                Crew member: {{ group.crew?.fullname }}
              </CTableDataCell>
            </CTableRow>
          </CTable>
        </CCol>
      </CRow>
      <CRow>
        <CCol :md="12">
          <h3>Clients</h3>
          <CTable class="table table-responsive">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Fullname</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableRow v-for="client in group.clients" :key="client.id">
              <CTableDataCell>{{ client.fullname }}</CTableDataCell>
            </CTableRow>
          </CTable>
        </CCol>
      </CRow>
      <Documentable v-if="group.is_documentable" type="group" :id="group.id" />
      <Contractable v-if="group.is_contractable" type="group" :id="group.id" />
    </CModalBody>
  </CModal>
</template>

<script>
import { debounce } from '@/utils/helper'

export default {
  name: 'Groups',
  data: () => ({
    debounceFn: null,
    group: {},
    groups: [],
    search: {
      title: '',
      crew_member: '',
    },
    loading: false,
    pagination: [],
    is_group_modal_visible: false,
  }),
  methods: {
    async getGroups() {
      this.loading = true
      await this.$axios
        .get(`/groups`, {
          params: this.search,
        })
        .then((response) => {
          this.groups = response.data.data
          this.pagination = response.data.links
          this.loading = false
        })
    },
    filter: async function (value) {
      if (value.length > 2 || value.length == 3) {
        await this.getGroups()
      }
      if(value.length == 0){
        await this.getGroups()
      }
    },
    fetchGroupInfo: async function (id) {
      await this.$axios.get(`/groups/${id}`).then((response) => {
        this.group = response.data
        this.is_group_modal_visible = true
      })
    },
    gotoPage: async function (url) {
      this.loading = true
      await this.$axios
        .get(url, {
          params: this.search,
        })
        .then((response) => {
          this.groups = response.data.data
          this.pagination = response.data.links
          this.loading = false
        })
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
          this.$axios.delete(`/groups/${id}`).then(
            this.groups.splice(
              this.groups.findIndex((group) => group.id === id),
              1,
            ),
          )
          swal('Group has been deleted!', {
            icon: 'success',
            timer: 3000,
          })
        }
      })
    },
  },
  async mounted() {
    await this.getGroups()
    this.debounceFn = debounce(() => this.getGroups(), 500)
  },
}
</script>
