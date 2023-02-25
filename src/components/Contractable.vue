<template>
  <CForm @submit.prevent="attachContract">
    <input type="file" ref="contract"/>
    <button type="submit">Upload</button>
  </CForm>
</template>

<script>
export default {
  name: 'Contractable',
  props: ['endpoint'],
  methods: {
    async attachContract() {
      let contract = this.$refs.contract.files[0]
      let form_data = new FormData()
      form_data.append('contract', contract)
      await this.$axios
        .post(this.endpoint, form_data)
        .then((response) => {
          swal(response.data.message)
        })
    },
  },
}
</script>
