<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Crews</strong>
            </div>
            <div class="col-md-2">
              <router-link to="/crews/create">
                <CButton color="primary"> Create Crew </CButton>
              </router-link>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Full Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                <CTableHeaderCell scope="col">Phone No</CTableHeaderCell>
                <CTableHeaderCell scope="col">ID Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">ID Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date of Birth</CTableHeaderCell>
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
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>
                  <button
                    style="margin-right: 1em"
                    class="btn btn-sm btn-info text-white"
                  >
                    View
                  </button>
                  <button class="btn btn-sm btn-danger text-white">
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
import store from '@/store'
import { ref } from 'vue'
import CrewsModule from '@/views/panel/Crew/CrewsModule'

export default {
  name: 'crews',
  setup() {
    const USER_APP_STORE_MODULE_NAME = 'app-crews'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(USER_APP_STORE_MODULE_NAME, CrewsModule)
    const data = ref(null)
    const fetchCrews = () => {
      store.dispatch('app-crews/getUsers').then((response) => {
        data.value = response.data.data
      })
    }

    fetchCrews()
    return { data, fetchCrews }
  },
}
</script>
