<template>
  <div class="card border-info mb-4">
    <div class="card-header">Service Commit Information</div>
    <CRow class="mt-3 ms-3">
      <CCol :md="6">
        <CTable class="table table-responsive">
          <CTableRow>
            <CTableDataCell>Service</CTableDataCell>
            <CTableDataCell>{{ service_commit.service.title }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Badge</CTableDataCell>
            <CTableDataCell>{{ service_commit.badge }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Scheduled at</CTableDataCell>
            <CTableDataCell>{{ service_commit.scheduled_at }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Started at</CTableDataCell>
            <CTableDataCell>{{ service_commit.started_at }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>From location</CTableDataCell>
            <CTableDataCell>{{ service_commit.location }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Supervisor</CTableDataCell>
            <CTableDataCell>{{ service_commit.supervisor?.name }}</CTableDataCell>
          </CTableRow>
        </CTable>
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  name: 'service_commit_info',
  data: () => ({
    service_commit: {
      service: {title: ''},
      badge: '',
      scheduled_at: '',
      started_at: '',
      location: '',
      supervisor: {name: ''}
    },
  }),
  async mounted() {
    await this.$axios.get(`/service/commits/${this.$route.params.id}`)
      .then((response) => {
        this.service_commit = response.data
      })
  },
}
</script>
