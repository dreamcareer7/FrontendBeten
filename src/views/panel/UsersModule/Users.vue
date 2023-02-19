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
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="row">1</CTableHeaderCell>
                <CTableDataCell>Mark</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>
                  <button class="btn btn-danger text-white">Delete</button>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">2</CTableHeaderCell>
                <CTableDataCell>Jacob</CTableDataCell>
                <CTableDataCell>Thornton</CTableDataCell>
                <CTableDataCell>Thornton</CTableDataCell>
                <CTableDataCell>Thornton</CTableDataCell>
                <CTableDataCell>
                  <button class="btn btn-danger text-white">Delete</button>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">3</CTableHeaderCell>
                <CTableDataCell>twitter</CTableDataCell>
                <CTableDataCell>twitter</CTableDataCell>
                <CTableDataCell>twitter</CTableDataCell>
                <CTableDataCell>twitter</CTableDataCell>
                <CTableDataCell>
                  <button class="btn btn-danger text-white">Delete</button>
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
import store from '@/store'
import { ref } from '@vue/composition-api'
import UsersModule from '@/views/panel/UsersModule/UsersModule'

export default {
  setup() {
    const USER_APP_STORE_MODULE_NAME = 'app-users'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(USER_APP_STORE_MODULE_NAME, UsersModule)
    const data = ref(null)
    const fetchUsers = () => {
      store.dispatch('app-users/getUsers').then((response) => {
        data.value = response.data.data
      })
    }

    fetchUsers()
    return { data, fetchUsers }
  },
}
</script>
