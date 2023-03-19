<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
          <CCardTitle>Users</CCardTitle>
          <router-link :to="{ name: 'Create user' }">
            <CButton color="success" class="float-end text-white">
              <ion-icon name="person-add"></ion-icon>&nbsp;Create User
            </CButton>
          </router-link>
        </CCardHeader>
        <CCardBody>
          <!-- Search filters -->
          <CRow>
            <CCol md="4" sm="4" lg="3">
              <input
                type="text"
                class="form-control mb-3"
                v-model="search.name"
                placeholder="Name..."
                @keyup="filter(search.name)"
                autofocus
              />
            </CCol>
            <CCol md="4" sm="4" lg="3">
              <input
                type="text"
                class="form-control mb-3"
                v-model="search.email"
                placeholder="Email..."
                @keyup="filter(search.email)"
              />
            </CCol>
            <CCol md="4" sm="4" lg="3">
              <input
                type="text"
                class="form-control mb-3"
                v-model="search.contact"
                placeholder="Contact..."
                @keyup="filter(search.contact)"
              />
            </CCol>
          </CRow>
          <!-- End search filters -->
          <hr />
          <CRow v-if="loading" class="mt-4">
            <CCol :md="12" class="text-center">
              <div class="spinner-border text-success" role="status"></div>
            </CCol>
            <CCol :md="12" class="text-center">
              <span class="sr-only">Loading...</span>
            </CCol>
          </CRow>
          <!-- No results -->
          <CRow v-if="users.length === 0 && !loading" class="mt-4">
            <CCol :md="12" class="text-center">
              <span class="sr-only">No results</span>
            </CCol>
          </CRow>
          <!-- End no results -->
          <CTable
            v-if="!loading && users.length > 0"
            responsive
            hover
            align="middle"
          >
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">E-mail</CTableHeaderCell>
                <CTableHeaderCell scope="col">Active</CTableHeaderCell>
                <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="user in users" :key="user.id">
                <CTableDataCell>{{ user.name }}</CTableDataCell>
                <CTableDataCell>{{ user.email }}</CTableDataCell>
                <CTableDataCell>
                  <CBadge
                    :color="user.is_active ? 'success' : 'warning'"
                    shape="rounded-pill"
                  >
                    {{ user.is_active ? 'Yes' : 'No' }}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>{{ user.contact }}</CTableDataCell>
                <CTableDataCell :aria-colspan="2">
                  <button
                    class="btn btn-sm btn-info text-white mx-1"
                    title="View Details"
                    @click="viewDetails(user.id)"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <router-link
                    :to="{
                      name: 'Edit user',
                      params: { id: this.$encrypt(user.id) },
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
                    @click="deleteUser(user.id)"
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
              <nav aria-label="Users navigation">
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
    :visible="is_user_modal_visible"
    @close="is_user_modal_visible = false"
    class="modal-popup-detail"
    data-backdrop="static"
    data-keyboard="false"
  >
    <CModalHeader>
      <CModalTitle>User Information</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CTable class="table table-responsive">
        <CTableRow>
          <CTableHeaderCell>Name</CTableHeaderCell>
          <CTableDataCell>{{ user.name }}</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell>Email</CTableHeaderCell>
          <CTableDataCell>{{ user.email }}</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell>Active</CTableHeaderCell>
          <CTableDataCell>
            <CBadge
              :color="user.is_active ? 'success' : 'warning'"
              shape="rounded-pill"
            >
              {{ user.is_active ? 'Yes' : 'No' }}
            </CBadge>
          </CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell>Contact</CTableHeaderCell>
          <CTableDataCell>{{ user.contact }}</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell>Roles</CTableHeaderCell>
          <CTableDataCell>{{ user.roles }}</CTableDataCell>
        </CTableRow>
      </CTable>
      <Documentable v-if="user.is_documentable" type="user" :id="user.id" />
      <Contractable v-if="user.is_contractable" type="user" :id="user.id" />
    </CModalBody>
  </CModal>
</template>

<script>
import { debounce } from '@/utils/helper'

export default {
  name: 'Users',
  data: () => ({
    debounceFn: null,
    users: [],
    search: {},
    user: {},
    pagination: {},
    loading: false,
    is_user_modal_visible: false,
  }),
  methods: {
    getUsers: async function () {
      this.loading = true
      await this.$axios
        .get('/users', {
          params: this.search,
        })
        .then((response) => {
          this.users = response.data.data
          this.pagination = response.data.links
          this.loading = false
        })
    },
    filter: async function (value) {
      if (value.length > 2 || value.length == 3) {
        await this.debounceFn()
      }
      if(value.length == 0){
        await this.debounceFn()
      }
    },
    viewDetails: async function (id) {
      await this.$axios.get(`/users/${id}`).then((response) => {
        this.user = response.data
        this.is_user_modal_visible = true
      })
    },
    gotoPage: async function (url) {
      this.loading = true
      await this.$axios
        .get(url, {
          params: this.search,
        })
        .then((response) => {
          this.users = response.data.data
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
          this.pagination = response.data.links
        })
      this.loading = false
    },
    deleteUser: async function (id) {
      await swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.delete(`/users/${id}`).then(() => {
            // Remove the user from the list
            this.users.splice(
              this.users.findIndex((user) => user.id === id),
              1,
            )
            swal('The user has been deleted!', {
              icon: 'success',
              timer: 3000,
            })
          })
        }
      })
    },
  },
  mounted: async function () {
    this.getUsers()
    this.debounceFn = debounce(() => this.getUsers(), 500)
  },
}
</script>

<style scoped>
/* Align Users title with the Create User button */
.card-title {
  display: inline;
}
.page-item {
  cursor: pointer;
}
a.disabled {
  pointer-events: none;
  cursor: default;
}
</style>
