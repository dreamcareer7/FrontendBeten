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
              <router-link
                to="/users/create"
              >
                <CButton
                  color="primary"
                >
                  Create User
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
                  <CTableDataCell>@mdo</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">2</CTableHeaderCell>
                  <CTableDataCell>Jacob</CTableDataCell>
                  <CTableDataCell>Thornton</CTableDataCell>
                  <CTableDataCell>Thornton</CTableDataCell>
                  <CTableDataCell>Thornton</CTableDataCell>
                  <CTableDataCell>@fat</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">3</CTableHeaderCell>
                  <CTableDataCell colspan="2">Larry the Bird</CTableDataCell>
                  <CTableDataCell>@twitter</CTableDataCell>
                  <CTableDataCell>@twitter</CTableDataCell>
                  <CTableDataCell>@twitter</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
export default {
  name: 'users',
}
</script>
