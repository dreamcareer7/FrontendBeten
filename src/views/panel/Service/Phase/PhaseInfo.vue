<template>
  <div class="card border-info mb-4">
    <div class="card-header">Phase Information</div>
    <div class="row mt-3">
      <div class="col-12 text-center">
        <h5>{{ phase.title }}</h5>
      </div>
    </div>
    <CRow style="margin-left: 4px">
      <CCol :md="12">
        <h3>Assigned services</h3>
        <CTable class="table table-responsive">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">title</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableRow v-for="client in phase.services" :key="client.id">
            <CTableDataCell>{{ client.title }}</CTableDataCell>
            <CTableDataCell>
              <CButton color="info" @click="createCommit(client.id)">
                Commit Service
              </CButton>
            </CTableDataCell>
          </CTableRow>
        </CTable>
      </CCol>
    </CRow>
    <CModal
      size="lg"
      :visible="is_phase_modal_visible"
      @close="is_phase_modal_visible = false"
      class="modal-popup-detail"
      data-backdrop="static"
      data-keyboard="false"
    >
      <CModalHeader>
        <CModalTitle>Create commit</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CreateCommit :service="service" />
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          class="text-white"
          @click="is_phase_modal_visible = false"
        >
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>

<script>
import CreateCommit from '../Commits/CreateCommit.vue'

export default {
  name: 'PhaseDetails',
  data() {
    return {
      message: '',
      success: false,
      phase: {},
      phase_services: {},
      phase_id: null,
      is_phase_modal_visible: false,
      service: null,
    }
  },
  mounted() {
    this.phase_id = this.$decrypt(this.$route.params.id)
    this.fetchInfo(this.phase_id)
  },
  methods: {
    fetchInfo: async function (id) {
      await this.$axios.get(`/phases/` + id).then((response) => {
        this.phase = response.data
      })
    },
    createCommit(id) {
      this.service = id
      this.is_phase_modal_visible = true
    },
  },
  components: { CreateCommit },
}
</script>
