<template>
  <CForm @submit.prevent="attachDocuments">
    <input type="file" ref="documents" multiple="multiple" />
    <button type="submit">Upload</button>
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
