<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Groups</strong>
            </div>
            <div class="col-md-2">
              <router-link
                to="/groups/create"
              >
                <CButton
                  color="primary"
                >
                  Create Group
                </CButton>
              </router-link>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Crew</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>

                <CTableRow v-for="group in groups" :key="group.id">
                  <CTableHeaderCell scope="row">{{ group.id }}</CTableHeaderCell>
                  <CTableDataCell>{{ group.title }}</CTableDataCell>
                  <CTableDataCell>{{ group.crew_id }}</CTableDataCell>
                  <CTableDataCell>
                    <button style="margin-right: 1em;" class="btn btn-sm btn-info text-white">View</button>
                    <button style="margin-right: 1em;" class="btn btn-sm btn-success text-white">Update</button>
                    <button @click="deleteGroup(group.id)" class="btn btn-sm btn-danger text-white">Delete</button>
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
  name: 'Groups',
  data() {
    return {
      groups: '',
      current_page: '',
      selected_user: null,
    }
  },
  mounted() {
    this.getGroups()
  },
  methods: {
    getGroups: async function () {
      await axios.get(`/groups`).then((response) => {
        this.groups = response.data.data
        console.log(this.users)
      })
    },
    deleteGroup: async function (id) {
      await axios.delete(`/groups/` + id).then((response) => {
        alert(response.data.message)
      })
    },
    fetchServiceInfo: async function(id) {
      await axios.get(`/groups/show/` + id).then((response) => {
        console.log(response.data)
      })
    },
  },
}
</script>
