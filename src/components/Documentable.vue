<template>
  <CCol class="card bg-light border-top-3 p-0 mt-3">
    <CCardHeader class="font-weight-bold">Documents</CCardHeader>
    <CCard class="mt-1">
      <CAlert color="success" class="m-2" v-show="showMessage"
        >{{ message }}
        <span class="pull-right cursor-pointer" @click="showMessage = false"
          >X</span
        ></CAlert
      >
      <CCardBody class="p-0">
        <CTable responsive hover class="cursor-pointer">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">File name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Download</CTableHeaderCell>
              <CTableHeaderCell scope="col">Created by</CTableHeaderCell>
              <CTableHeaderCell style="width: 20%" scope="col" :aria-colspan="2"
                >Delete</CTableHeaderCell
              >
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="document in documents" :key="document.id">
              <CTableDataCell scope="row">{{ document.id }}</CTableDataCell>
              <CTableDataCell scope="row">
                {{ document.title }}
              </CTableDataCell>
              <CTableDataCell>
                <a
                  class="btn btn-sm btn-info text-white m-1"
                  :href="`${api_url}/${document.path}`"
                  target="_blank"
                  title="Download document"
                >
                  <ion-icon name="cloud-download-outline"></ion-icon>
                </a>
              </CTableDataCell>
              <CTableDataCell scope="row">
                {{ document.created_by }}
              </CTableDataCell>
              <CTableDataCell :aria-colspan="2">
                <button
                  class="btn btn-sm btn-danger text-white m-1"
                  @click="deleteDocument(document.id)"
                  title="Delete Document"
                >
                  <ion-icon name="trash-bin-outline"></ion-icon>
                </button>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
    <CForm class="p-2" ref="uploadForm">
      <CRow class="mt-1">
        <CCol xs="8" sm="9">
          <CFormInput
            type="file"
            ref="fileInput"
            @change="onFilePicked"
            multiple="multiple"
            id="formFileLg"
          />
        </CCol>
        <CCol xs="4" sm="3">
          <CButton
            type="button"
            color="info"
            class="text-white btn-sm"
            click="submitFiles"
            shape="rounded-pill"
            >Upload</CButton
          >
        </CCol>
      </CRow>
    </CForm>
  </CCol>
</template>

<script>
export default {
  name: 'Documentable',
  props: ['type', 'id'],
  data: () => ({
    documents: [],
    showMessage: false,
    message: '',
    files: [],
  }),
  methods: {
    async onFilePicked(event) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.files.push(event.target.files[i])
      }
      event.target.files.value = null
    },
    async deleteDocument(doc_id) {
      await this.$axios.delete(`/documents/${doc_id}`).then(() => {
        this.documents = this.documents.filter((doc) => doc.id !== doc_id)
        this.message = 'Document deleted successfully.'
        this.showMessage = true
        setTimeout(() => {
          this.showMessage = false
        }, 3000)
      })
    },
    getDocuments: async function () {
      await this.$axios
        .get(`/documents/${this.type}/${this.id}`)
        .then((response) => {
          this.documents = response.data
        })
    },
    async submitFiles() {
      /*
        Initialize the form data
      */
      let formData = new FormData()

      /*
        Iteate over any file sent over appending the files
        to the form data.
      */
      for (let i = 0; i < this.files.length; i++) {
        let file = this.files[i]
        formData.append(`documents[${i}]`, file)
      }

      /*
        Make the request to the POST /select-files URL
      */
      await this.$axios
        .post(`/documents/${this.type}/${this.id}`, formData)
        .then(() => {
          this.getDocuments()
          this.message = 'Document uploaded successfully.'
          this.showMessage = true
          this.$refs.inputFile.reset()
        })
        .catch(function () {
          console.log('FAILURE!!')
        })
    },
  },
  mounted() {
    this.getDocuments()
  },
}
</script>
