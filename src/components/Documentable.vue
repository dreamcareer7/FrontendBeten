<template>
  <CCol class="card bg-light border-top-3 p-0 mt-3">
    <CCardHeader class="font-weight-bold">Documents</CCardHeader>
    <CCard class="mt-1">
      <CAlert color="success" class="m-2" v-show="showMessage">
        {{ message }}
        <span class="pull-right cursor-pointer" @click="showMessage = false">
          X
        </span>
      </CAlert>
      <CCardBody class="p-0">
        <CTable responsive hover class="cursor-pointer mb-0">
          <CTableBody>
            <CTableRow
              v-if="documents.length === 0"
              class="text-center d-block p-3"
            >
              No documents
            </CTableRow>
            <CTableRow v-for="document in documents" :key="document.id">
              <CTableDataCell scope="row">{{ document.id }}</CTableDataCell>
              <CTableDataCell scope="row">
                {{ document.title }}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {{ document.created_by }}
              </CTableDataCell>
              <CTableDataCell>
                <a
                  class="btn btn-sm btn-info text-white m-1"
                  :href="document.path"
                  title="Download document"
                  :download="document.title"
                  target="_blank"
                >
                  <ion-icon name="cloud-download-outline"></ion-icon>
                </a>
              </CTableDataCell>
              <CTableDataCell>
                <a
                  class="btn btn-sm btn-info text-white m-1"
                  :href="document.path"
                  title="View document"
                  target="_blank"
                >
                  <ion-icon name="eye-outline"></ion-icon>
                </a>
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
    <CForm class="p-2" @submit.prevent="upload" ref="uploadForm">
      <CRow class="mt-1">
        <CCol xs="5" sm="5">
          <input
            type="text"
            class="form-control sm"
            placeholder="Title"
            v-model="title"
            required
          />
        </CCol>
        <CCol xs="5" sm="5">
          <input type="file" class="form-control sm" ref="docs" multiple />
        </CCol>
        <CCol xs="2" sm="2">
          <CButton
            type="submit"
            color="info"
            class="mt-1 text-white btn-sm"
            shape="rounded-pill"
            >
            Upload
          </CButton>
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
    title: '',
  }),
  methods: {
    async upload() {
      /*
        Initialize the form data
      */
      let form_data = new FormData()
      form_data.append('title', this.title)

      /*
        Iteate over any file sent over appending the files
        to the form data.
      */
      for (let i = 0; i < this.$refs.docs.files.length; i++) {
        form_data.append(`documents[${i}]`, this.$refs.docs.files[i])
      }

      /*
        Make the request to the POST /select-files URL
      */
      await this.$axios
        .post(`/documents/${this.type}/${this.id}`, form_data)
        .then(() => {
          this.getDocuments()
          this.message = 'Document uploaded successfully.'
          this.showMessage = true
          this.$refs.uploadForm.$el.reset()
        })
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
    async getDocuments() {
      await this.$axios
        .get(`/documents/${this.type}/${this.id}`)
        .then((response) => {
          this.documents = response.data
        })
    },
  },
  mounted() {
    this.getDocuments()
  },
}
</script>
