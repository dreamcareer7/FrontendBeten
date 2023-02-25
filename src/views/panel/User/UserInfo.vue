<template>
  <div class="card border-info mb-4">
    <div class="card-header">User Information</div>
    <CRow class="mt-3 ms-3">
      <CCol :md="6">
        <CTable class="table table-responsive">
          <CTableRow>
            <CTableDataCell>ID</CTableDataCell>
            <CTableDataCell>{{ user.id }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Name</CTableDataCell>
            <CTableDataCell>{{ user.name }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Username</CTableDataCell>
            <CTableDataCell>{{ user.username }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Email</CTableDataCell>
            <CTableDataCell>{{ user.email }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Is active?</CTableDataCell>
            <CTableDataCell>{{ user.is_active ? 'Yes' : 'No' }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Contact</CTableDataCell>
            <CTableDataCell>{{ user.contact }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Date created</CTableDataCell>
            <CTableDataCell>{{ user.created_at }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Date updated</CTableDataCell>
            <CTableDataCell>{{ user.updated_at }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell colspan="2">
              <Documentable :endpoint="`/users/update/${user.id}`" />
            </CTableDataCell>
          </CTableRow>
        </CTable>
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data: () => ({
    user: {},
  }),
  async mounted() {
    await this.$axios
      .get(`/users/info/${this.$decrypt(this.$route.params.id)}`)
      .then((response) => (this.user = response.data.data))
  },
}
</script>
