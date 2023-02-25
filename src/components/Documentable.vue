<template>
  <CForm @submit.prevent="attachDocuments">
    <input type="file" ref="documents"/>
    <button type="submit">Upload</button>
  </CForm>
</template>

<script>
export default {
  name: 'Documentable',
  props: ['endpoint'],
  methods: {
    async attachDocuments() {
      let documents = this.$refs.documents.files[0]
      let form_data = new FormData()
      form_data.append('documents', documents)
      await this.$axios
        .post(this.endpoint, form_data)
        .then((response) => {
          swal(response.data.message)
        })
    },
  },
}
</script>
