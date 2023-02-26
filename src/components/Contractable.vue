<template>
  <CForm @submit.prevent="attachContract">
<!--    <input type="file" ref="contract"/>-->
<!--    <button type="submit">Upload</button>-->

    <CRow>
      <CCol xs="12" sm="6" class="p1">
        <CFormInput type="file" ref="contract" id="formFileLg" label="Upload Contract" />
      </CCol>
      <CCol xs="12" sm="6" class="mt-4">
        <CButton type="submit" color="success mt-2" shape="rounded-pill">Upload</CButton>
      </CCol>
    </CRow>
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
