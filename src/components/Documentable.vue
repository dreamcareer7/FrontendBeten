<template>
  <CForm @submit.prevent="attachDocuments">
<!--    <input type="file" ref="documents" multiple="multiple" />-->
<!--    <button type="submit">Upload</button>-->
    <CRow>
      <CCol xs="12" sm="6" class="p1">
        <CFormInput type="file" ref="documents" multiple="multiple" id="formFileLg" label="Upload Documents" />
      </CCol>
      <CCol xs="12" sm="6" class="mt-4">
        <CButton type="submit" color="primary mt-2" shape="rounded-pill">Upload</CButton>
      </CCol>
    </CRow>
  </CForm>
</template>

<script>
export default {
  name: 'Documentable',
  props: ['endpoint'],
  methods: {
    async attachDocuments() {
      let form_data = new FormData()

      for (let i = 0; i < this.$refs.documents.files.length; i++) {
        let document = this.$refs.documents.files[i]
        form_data.append(`documents[${i}]`, document)
      }

      await this.$axios.post(this.endpoint, form_data).then((response) => {
        swal(response.data.message)
      })
    },
  },
}
</script>
