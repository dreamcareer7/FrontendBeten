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
        <div v-if="service_commit_logs?.length">
          <CRow>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Model type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Model id</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="log in service_commit_logs">
                  <CTableDataCell>{{ log.model_type }}</CTableDataCell>
                  <CTableDataCell>{{ log.model_type }}</CTableDataCell>
                  <CTableDataCell>{{ log.role }}</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CRow>
          <CRow>
            <CCol :md="12" class="text-center">
              <nav aria-label="Service commits navigation">
                <ul class="pagination">
                  <template v-for="page in pagination" :key="page">
                    <li class="page-item" :class="{ active: page.active }">
                      <a
                        @click.prevent="gotoPage(page.url)"
                        class="page-link"
                        :class="{ disabled: !page.url }"
                        v-html="page.label"
                      ></a>
                    </li>
                  </template>
                </ul>
              </nav>
            </CCol>
          </CRow>
        </div>

        <button class="btn btn-primary" @click="show_add_log_form = true">
          Add logs
        </button>
        <button
          class="btn btn-primary"
          v-if="service_commit.service_commit_log?.length"
          @click="initialize"
        >
          Initialize
        </button>
        <CModal
          size="sm"
          :visible="show_add_log_form"
          @close="show_add_log_form = false"
          class="modal-popup-detail"
          data-backdrop="static"
          data-keyboard="false"
        >
          <CModalHeader>
            <CModalTitle>Add log</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CreateLog
              :service_commit_id="service_commit.id"
              @created="getCommit"
            />
          </CModalBody>
        </CModal>
      </CCol>
    </CRow>
  </div>
  <Concurrable
    v-if="service_commit.is_concurrable"
    type="ServiceCommit"
    :id="service_commit.id"
  />
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
    service_commit_logs: [],
    pagination: [],
  }),
  methods: {
    gotoPage: async function (url) {
      await this.$axios.get(url).then((response) => {
        this.service_commit_logs = response.data.logs.data
        this.pagination = response.data.logs.links
      })
    },
    getCommit() {
      this.$axios
        .get(`/service_commits/${this.$decrypt(this.$route.params.id)}`)
        .then((response) => {
          this.service_commit = response.data.commit
          this.service_commit_logs = response.data.logs.data
          this.pagination = response.data.logs.links
        })
    },
    initialize() {
      this.$axios
        .get(`/service_commits/initialize/${this.service_commit.id}`)
        .then(() => this.getCommit())
    },
  },
  mounted() {
    this.getCommit()
  },
}
</script>
