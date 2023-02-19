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
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Username</CTableHeaderCell>
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
                <CTableDataCell>{{ user.contact }}</CTableDataCell>
                <CTableDataCell>{{ user.is_active }}</CTableDataCell>
                <CTableDataCell>{{ user.created_at }}</CTableDataCell>
                <CTableDataCell>
                  <button
                    style="margin-right: 1em"
                    class="btn btn-sm btn-info text-white"
                  >
                    View
                  </button>
                  <button
                    style="margin-right: 1em"
                    class="btn btn-sm btn-success text-white"
                  >
                    Update
                  </button>
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
      current_page: '',
      selected_user: null,
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers: async function () {
      await axios.get(`/users/paginate`).then((response) => {
        this.users = response.data.data
        console.log(this.users)
      })
    },
    deleteUser: async function (id) {
      await axios.delete(`/users/` + id).then((response) => {
        alert(response.data.message)
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
