<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Service Commits</strong>
            </div>
            <div class="col-md-2">
              <router-link
                to="/services/commits/create"
              >
                <CButton
                  color="primary"
                >
                  Create Commit
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
                  <CTableHeaderCell scope="col">Service</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Badge</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Schedule At</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Started At</CTableHeaderCell>
                  <CTableHeaderCell scope="col">From Location</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Supervisor ID</CTableHeaderCell>
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
                    <button style="margin-right: 1em;" class="btn btn-sm btn-info text-white">View</button>
<button style="margin-right: 1em;" class="btn btn-sm btn-success text-white">Update</button>
                    <button class="btn btn-sm btn-danger text-white">Delete</button>
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
export default {
  name: 'services',
}
</script>
