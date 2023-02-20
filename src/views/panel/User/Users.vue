<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Users</strong>
            </div>
            <div class="col-md-2">
              <router-link to="/users/create">
                <CButton color="primary"> Create User</CButton>
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
                v-model="search.name"
                placeholder="name"
                @change="getUsers"
              />
            </CCol>
            <CCol :md="2">
              <input
                type="text"
                class="form-control"
                v-model="search.email"
                placeholder="Email"
                @change="getUsers"
              />
            </CCol>
            <CCol :md="2">
              <input
                type="text"
                class="form-control"
                v-model="search.contact"
                placeholder="Contact"
                @change="getUsers"
              />
            </CCol>
          </CRow>
          <CRow v-if="loading" class="mt-4">
            <CCol :md="12" class="text-center">
              <div class="spinner-border text-success" role="status">
              </div>
            </CCol>
            <CCol :md="12" class="text-center">
              <span class="sr-only">Loading...</span>
            </CCol>
          </CRow>
          <CTable v-if="!loading">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                <CTableHeaderCell scope="col">email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                <CTableHeaderCell scope="col">Is Active</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created at</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="user in users" :key="user.id">
                <CTableHeaderCell scope="row">{{ user.id }}</CTableHeaderCell>
                <CTableDataCell>{{ user.name }}</CTableDataCell>
                <CTableDataCell>{{ user.username }}</CTableDataCell>
                <CTableDataCell>{{ user.email }}</CTableDataCell>
                <CTableDataCell>{{ user.contact }}</CTableDataCell>
                <CTableDataCell>{{ user.is_active }}</CTableDataCell>
                <CTableDataCell>{{ user.created_at }}</CTableDataCell>
                <CTableDataCell>
                  <router-link
                    :to="{
                      name: 'user_info',
                      params: { id: user.id },
                    }"
                  >
                    <button
                      style="margin-right: 1em"
                      class="btn btn-sm btn-info text-white"
                    >
                      View
                    </button>
                  </router-link>
                  <router-link
                    :to="{
                      name: 'edit_user',
                      params: { id: user.id },
                    }"
                  >
                    <CButton class="btn btn-success text-white">Update</CButton>
                  </router-link>
                  <button
                    class="btn btn-danger text-white"
                    @click="deleteUser(user.id)"
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
                  <li class="page-item" v-if="current_page>1"><a class="page-link" href="#"  @click.prevent="previousPage">Previous</a></li>
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item" v-if="last_page>current_page"><a class="page-link" href="#"   @click.prevent="nextPage"> Next</a></li>
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
export default {
  name: 'users',
  data() {
    return {
      users: '',
      search: {},
      current_page: 1,
      last_page: 99,
      selected_user: null,
      loading:false
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    nextPage: async function () {
      this.current_page = this.current_page + 1
      this.search.page = this.current_page
      this.getUsers()
    },
    previousPage: async function () {
      this.current_page = this.current_page - 1
      this.search.page = this.current_page
      this.getUsers()
    },
    getUsers: async function () {
      this.loading = true
      await axios
        .get(`/users/paginate`, {
          params: this.search,
        })
        .then((response) => {
          this.users = response.data.data
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
        })
      this.loading = false
    },
    deleteUser: async function (id) {
      await axios.post(`/users/delete/` + id).then((response) => {
        alert(response.data.message)
        this.getUsers()
      })
    },
    fetchUserInfo: async function (id) {
      await axios.get(`/users/show/` + id).then((response) => {
        console.log(response.data)
      })
    },
  },
}
</script>
