<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Dormitories</strong>
            </div>
            <div class="col-md-2">
              <router-link
                to="/dormitories/create"
              >
                <CButton
                  color="primary"
                >
                  Create Dormitory
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
                  <CTableHeaderCell scope="col">Phones</CTableHeaderCell>
                  <CTableHeaderCell scope="col">City</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Coordinate</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Is Active</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
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
  name: 'Dormitories',
}
</script>
