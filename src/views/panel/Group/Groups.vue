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
                @keyup="filter"
              />
            </CCol>
            <CCol :md="2">
              <input
                type="text"
                class="form-control"
                v-model="search.crew_member"
                placeholder="Search crew member"
                @keyup="filter"
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
                <CTableHeaderCell scope="col">ID #</CTableHeaderCell>
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Crew member</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="group in groups" :key="group.id">
                <CTableHeaderCell scope="row">{{ group.id }}</CTableHeaderCell>
                <CTableDataCell>{{ group.title }}</CTableDataCell>
                <CTableDataCell>{{ group.crew.fullname }}</CTableDataCell>
                <CTableDataCell>
                  <button
                    class="btn btn-sm btn-info text-white mx-1"
                    title="View Details"
                    @click="fetchGroupInfo(group.id)">
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

  <CModal
    size="lg"
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
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableDataCell>{{ group.id }}</CTableDataCell>
              <CTableHeaderCell>Title</CTableHeaderCell>
              <CTableDataCell>{{ group.title }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Crew member</CTableHeaderCell>
              <CTableDataCell>{{ group.crew?.fullname }}</CTableDataCell>
            </CTableRow>
            <CTableRow v-if="group.is_documentable">
              <CTableDataCell colspan="4">
                <Documentable type="group" :id="group.id" />
              </CTableDataCell>
            </CTableRow>
          </CTable>
        </CCol>
      </CRow>
    </CModalBody>
  </CModal>
</template>

<script>
import { debounce } from '@/utils/helper'

export default {
  name: 'Groups',
  data: () => ({
    debounceFn: null,
    groups: [],
    search: {
      title: '',
      crew_member: '',
    },
    loading: false,
    pagination: [],
    is_group_modal_visible: false,
    group: {},
  }),
  methods: {
    getGroups: async function () {
      this.loading = true
      await this.$axios
        .get(`/groups/paginate`, {
          params: this.search,
        })
        .then((response) => {
          this.groups = response.data.data
          this.pagination = response.data.links
          this.loading = false
        })
    },
    filter: async function () {
      await this.debounceFn()
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
          this.$axios
            .post(`/groups/delete/${id}`)
            .then(
              (this.groups = this.groups.filter((group) => group.id !== id)),
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
