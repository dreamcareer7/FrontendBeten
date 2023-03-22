<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <CCardTitle>Transactions</CCardTitle>
          <router-link
            :to="{ name: 'Create transaction' }"
            v-if="$can('transactions.create')"
          >
            <CButton color="success" class="float-end text-white">
              <ion-icon name="swap-horizontal-outline"></ion-icon>&nbsp; Create
              transaction
            </CButton>
          </router-link>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Hospitality</CTableHeaderCell>
                <CTableHeaderCell scope="col">To Model Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">To Model ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                <CTableHeaderCell scope="col">Extra</CTableHeaderCell>
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
                  <button
                    style="margin-right: 1em"
                    class="btn btn-sm btn-info text-white"
                    title="View Details"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <button
                    style="margin-right: 1em"
                    class="btn btn-sm btn-warning text-white"
                    title="Edit"
                  >
                    <ion-icon name="create-outline"></ion-icon>
                  </button>
                  <button
                    class="btn btn-sm btn-danger text-white"
                    title="Delete"
                  >
                    <ion-icon name="trash-bin-outline"></ion-icon>
                  </button>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">2</CTableHeaderCell>
                <CTableDataCell>Mark</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>
                  <button
                    style="margin-right: 1em"
                    class="btn btn-sm btn-info text-white"
                    title="View Details"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <button
                    style="margin-right: 1em"
                    class="btn btn-sm btn-warning text-white"
                    title="Edit"
                  >
                    <ion-icon name="create-outline"></ion-icon>
                  </button>
                  <button
                    class="btn btn-sm btn-danger text-white"
                    title="Delete"
                  >
                    <ion-icon name="trash-bin-outline"></ion-icon>
                  </button>
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">3</CTableHeaderCell>
                <CTableDataCell>Mark</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>
                  <button
                    style="margin-right: 1em"
                    class="btn btn-sm btn-info text-white"
                    title="View Details"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <button
                    style="margin-right: 1em"
                    class="btn btn-sm btn-warning text-white"
                    title="Edit"
                  >
                    <ion-icon name="create-outline"></ion-icon>
                  </button>
                  <button
                    class="btn btn-sm btn-danger text-white"
                    title="Delete"
                  >
                    <ion-icon name="trash-bin-outline"></ion-icon>
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
export default {
  name: 'Transactions',
}
</script>
