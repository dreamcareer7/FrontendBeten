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
                <CTableHeaderCell scope="col">E-mail</CTableHeaderCell>
                <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                <CTableHeaderCell scope="col">Active</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date created</CTableHeaderCell>
                <CTableHeaderCell scope="col"  :aria-colspan="2">Actions</CTableHeaderCell>
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
                <CTableDataCell :aria-colspan="2">
                  <router-link
                    :to="{
                      name: 'user_info',
                      params: { id: user.id },
                    }"
                  >
                    <button
                      class="btn btn-sm btn-info text-white mx-1"
                    >
                      <ion-icon name="eye-outline"></ion-icon>
                    </button>
                  </router-link>
                  <router-link
                    :to="{
                      name: 'edit_user',
                      params: { id: user.id },
                    }"
                  >
                    <CButton class="btn btn-sm btn-success text-white mx-1">
                      <ion-icon name="create-outline"></ion-icon>
                    </CButton>
                  </router-link>
                  <button
                    class="btn btn-sm btn-danger text-white"
                    @click="deleteUser(user.id)"
                  >
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

                  <template  v-for="page in pagination" :key="page">
                    <li class="page-item">
                      <a
                        @click.prevent="gotoPage(page.url)"
                        class="page-link"
                        href="#"
                        v-html="page.label"
                        v-if="page.url"
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
</template>

<script>
export default {
  name: 'users',
  data() {
    return {
      users: '',
      search: {},
      pagination: {},
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
      await this.$axios
        .get(`/users/paginate`, {
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
      await this.$axios.post(`/users/delete/` + id).then((response) => {
        alert(response.data.message)
        this.getUsers()
      })
    },
    fetchUserInfo: async function (id) {
      await this.$axios.get(`/users/show/` + id).then((response) => {
        console.log(response.data)
      })
    },
  },
}
</script>
