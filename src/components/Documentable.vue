<template>

  <CCol class="card bg-light border-top-3 border-top-dark p-0 mt-3">
    <CCardHeader class="font-weight-bold">Upload Documents</CCardHeader>
    <CForm class="p-2">
      <CRow class="mt-3">
        <CCol xs="8" sm="9">
          <CFormInput type="file" ref="fileInput" @change="onFilePicked" multiple="multiple" id="formFileLg"/>
        </CCol>
        <CCol xs="4" sm="3">
          <CButton type="button" color="info text-white" @click="submitFiles" shape="rounded-pill">Upload</CButton>
        </CCol>
      </CRow>
    </CForm>
    <CCard class="mt-3">
      <CAlert color="success" class="m-2" v-show="showMessage">{{ message }} <span class="pull-right cursor-pointer" @click="showMessage=false">X</span></CAlert>
       <CCardBody>
         <CTable responsive hover class="cursor-pointer">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Path</CTableHeaderCell>
                <CTableHeaderCell style="width: 20%;" scope="col" :aria-colspan="2">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="(document, index) in documents">
                <CTableHeaderCell scope="row">{{index + 1}}</CTableHeaderCell>
                <CTableDataCell><a v-c-tooltip="{content: 'View Document', placement: 'top'}" target="_blank"  :href="document.path">Open File</a></CTableDataCell>
                <CTableDataCell :aria-colspan="2">
                  <button class="btn btn-sm btn-danger text-white m-1" @click="deleteFile(document.id, index)" v-c-tooltip="{content: 'Delete Document', placement: 'top'}">
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
  props: ['endpoint', 'type', 'id'],
  data: () => ({
    documents: [],
    showMessage: false,
    message: '',
    files: [],
  }),
  methods: {
    async onFilePicked(event) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.files.push( event.target.files[i] );
      }
      event.target.files.value = null
    },
    async deleteFile(documentID, rowIndex) {
      await this.$axios.delete(`/documents/${documentID}`)
        .then((response) => {
        this.documents.splice(this.documents.indexOf(rowIndex), 1)
        this.message = 'File deleted successfully.'
          this.showMessage = true
        })
    },
    getDocuments: async function () {
      await this.$axios.get(`/documents/${this.type}/${this.id}`)
        .then((response) => {
          this.documents = response.data
        })
    },
    async submitFiles(){
      /*
        Initialize the form data
      */
      let formData = new FormData();

      /*
        Iteate over any file sent over appending the files
        to the form data.
      */
      for( let i = 0; i < this.files.length; i++ ){
        let file = this.files[i];
        formData.append(`documents[${i}]`, file)
      }

      /*
        Make the request to the POST /select-files URL
      */
      await this.$axios.post(this.endpoint, formData)
        .then(() => {
          this.getDocuments()
          this.message = 'Document uploaded successfully.'
          this.showMessage = true
          this.$refs.inputFile.reset()
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
    },
  },
  mounted() {
    this.getDocuments()
  },
}
</script>
