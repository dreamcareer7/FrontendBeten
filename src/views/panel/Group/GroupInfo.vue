<template>
  <div class="card border-info mb-4">
    <div class="card-header">User Information</div>

    <div id="ialert" class="" role="alert"></div>
    <CRow class="mt-3 ms-3">
      <CCol :md="6">
        <CTable class="table table-responsive">
          <CTableRow>
            <CTableDataCell>Name</CTableDataCell>
            <CTableDataCell>{{ user.name }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Email</CTableDataCell>
            <CTableDataCell>{{ user.email }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Contact</CTableDataCell>
            <CTableDataCell>{{ user.contact }}</CTableDataCell>
          </CTableRow>
        </CTable>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'update_user',
  data() {
    return {
      message: '',
      success: false,
      user: {},
      form: {},
      user_id: null,
    }
  },
  mounted() {
    this.user_id = this.$route.params.id
    this.fetchUserInfo(this.user_id)
  },
  methods: {
    updateInfo: async function () {
      await axios
        .post(`/users/update/` + this.user_id, this.user)
        .then((response) => {
          this.message = response.data.message
          if (response.data.success) {
            this.success = true
          }
        })
        .catch((error) => {
          if (error.response) {
            this.message = error.response.data.message
          } else {
            this.message = error.message
          }
        })
    },
    deleteUser: async function () {
      await axios.delete(`/users/` + this.user_id).then((response) => {
        alert(response.data.message)
        this.getUsers()
      })
    },
    fetchUserInfo: async function (id) {
      await axios.get(`/users/info/` + id).then((response) => {
        this.user = response.data.data
      })
    },
  },
}
</script>
