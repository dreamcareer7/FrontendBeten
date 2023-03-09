<template>
  <div class="card border-info mb-4">
    <div class="card-header">Service Commit Information</div>
    <CRow class="mt-3 ms-3">
      <CCol :md="6">
        <CTable class="table table-responsive">
          <CTableRow>
            <CTableDataCell>Service title</CTableDataCell>
            <CTableDataCell>{{ service_commit.service?.title }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Service city ID</CTableDataCell>
            <CTableDataCell>{{
              service_commit.service?.city_id
            }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Service before date</CTableDataCell>
            <CTableDataCell>{{
              service_commit.service?.before_date
            }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Service exact date</CTableDataCell>
            <CTableDataCell>{{
              service_commit.service?.exact_date
            }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Service after date</CTableDataCell>
            <CTableDataCell>{{
              service_commit.service?.after_date
            }}</CTableDataCell>
          </CTableRow>
          <hr />
          <CTableRow>
            <CTableDataCell>Badge</CTableDataCell>
            <CTableDataCell>{{ service_commit.badge }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Scheduled at</CTableDataCell>
            <CTableDataCell>{{ service_commit.schedule_at }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>Started at</CTableDataCell>
            <CTableDataCell>{{ service_commit.started_at }}</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell>From location</CTableDataCell>
            <CTableDataCell>{{ service_commit.from_location }}</CTableDataCell>
          </CTableRow>
        </CTable>
        <CTable v-if="service_commit.service_commit_log?.length">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Model type</CTableHeaderCell>
              <CTableHeaderCell scope="col">Model id</CTableHeaderCell>
              <CTableHeaderCell scope="col">Role</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="log in service_commit.service_commit_log">
              <CTableHeaderCell scope="row">{{ log.id }}</CTableHeaderCell>
              <CTableDataCell>{{ log.model_type }}</CTableDataCell>
              <CTableDataCell>{{ log.model_type }}</CTableDataCell>
              <CTableDataCell>{{ log.role }}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
        <button class="btn btn-primary" @click="show_add_log_form = true">
          Add logs
        </button>
        <button class="btn btn-primary" v-if="service_commit.service_commit_log?.length" @click="initialize">
          Initialize
        </button>
        <CreateLog
          v-if="show_add_log_form"
          :service_commit_id="service_commit.id"
          @created="getCommit"
        >
        </CreateLog>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import CreateLog from '../Logs/CreateLog.vue'
export default {
  name: 'ServiceCommitInfo',
  components: {
    CreateLog,
  },
  data: () => ({
    service_commit: {},
    show_add_log_form: false,
  }),
  methods: {
    getCommit() {
      this.$axios
        .get(`/service_commits/${this.$decrypt(this.$route.params.id)}`)
        .then((response) => {
          this.service_commit = response.data
        })
    },
    initialize() {
      this.$axios.get(`/service_commits/initialize/${this.service_commit.id}`)
        .then(() => this.getCommit())
    }
  },
  mounted() {
    this.getCommit()
  },
}
</script>
