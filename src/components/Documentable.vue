<template>

  <CCol class="card bg-light border-top-3 border-top-dark p-0 mt-3">
    <CCardHeader class="font-weight-bold">Upload Documents</CCardHeader>
    <CForm class="p-2">
      <CRow class="mt-3">
        <CCol xs="8" sm="9">
          <CFormInput type="file" ref="fileInput" @change="onFilePicked" multiple="multiple" id="formFileLg"/>
        </CCol>
        <CCol xs="4" sm="3">
          <CButton type="button" color="info text-white" @click="onPickFile" shape="rounded-pill">Upload</CButton>
        </CCol>
      </CRow>
    </CForm>
    <CCard class="mt-3">
       <CCardBody>
         <CTable responsive hover class="cursor-pointer">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">FileName</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date created</CTableHeaderCell>
                <CTableHeaderCell style="width: 15%;" scope="col" :aria-colspan="2">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>First Document</CTableDataCell>
            <CTableDataCell>2023-02-25 18:02:12</CTableDataCell>
            <CTableDataCell :aria-colspan="2">
              <button
                class="btn btn-sm btn-info text-white mx-1"
                v-c-tooltip="{content: 'View Document', placement: 'top'}">
                <ion-icon name="eye-outline"></ion-icon>
              </button>
              <button class="btn btn-sm btn-danger text-white m-1" v-c-tooltip="{content: 'Delete Document', placement: 'top'}">
                <ion-icon name="trash-bin-outline"></ion-icon>
              </button>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">2</CTableHeaderCell>
            <CTableDataCell>Second Document</CTableDataCell>
            <CTableDataCell>2023-02-25 18:02:12</CTableDataCell>
            <CTableDataCell :aria-colspan="2">
              <button
                class="btn btn-sm btn-info text-white mx-1"
                v-c-tooltip="{content: 'View Document', placement: 'top'}">
                <ion-icon name="eye-outline"></ion-icon>
              </button>
              <button class="btn btn-sm btn-danger text-white m-1" v-c-tooltip="{content: 'Delete Document', placement: 'top'}">
                <ion-icon name="trash-bin-outline"></ion-icon>
              </button>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
          </CTable>
       </CCardBody>
    </CCard>
  </CCol>
</template>

<script>
export default {
  name: 'Documentable',
  props: ['endpoint'],
  methods: {
    onPickFile() {
      this.$refs.fileInput.click()
    },
    async onFilePicked(event) {
      let form_data = new FormData()
      for (let i = 0; i < event.target.files.length; i++) {
        let document = event.target.files[i]
        form_data.append(`documents[${i}]`, document)
      }
      await this.$axios.post(this.endpoint, form_data)
        .then((response) => {
        swal(response.data.message)
      })
    },
  },
}
</script>
