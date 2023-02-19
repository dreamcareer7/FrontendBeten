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
              <template v-if="crew">
                <CTableRow v-for="(item, index) in crew" :key="index">
                  <CTableHeaderCell scope="row">{{ item.id }}</CTableHeaderCell>
                  <CTableDataCell>{{ item }}</CTableDataCell>
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
              </template>
              <template v-else>
                <CTableRow>
                  <CTableHeaderCell scope="row">1</CTableHeaderCell>
                  <CTableDataCell>no Data</CTableDataCell>
                </CTableRow>
              </template>

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
import axios from 'axios'

export default {
  name: 'crews',
  setup() {
    const USER_APP_STORE_MODULE_NAME = 'app-crews'
    const crew = ref(null)
    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(USER_APP_STORE_MODULE_NAME, CrewsModule)
    const fetchCrews = () => {
      axios.get(`/crew`).then((response) => {
        crew.value = response.data.data
        console.log(this.users)
      })
    }

    fetchCrews()
    return { crew, fetchCrews }
  },
}
</script>
