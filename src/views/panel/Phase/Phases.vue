<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Phases</strong>
            </div>
            <div class="col-md-2">
              <router-link :to="{ name: 'Create Phase' }">
                <CButton color="success" class="float-end text-white">
                  <ion-icon name="create-outline"></ion-icon>&nbsp;
                  Create Phase
                </CButton>
              </router-link>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol :md="2">
              <input
                type="text"
                class="form-control"
                v-model="search.title"
                placeholder="Search title"
                @keyup="filter"
              />
            </CCol>
          </CRow>
          <hr />
          <CRow v-if="loading" class="mt-4">
            <CCol :md="12" class="text-center">
              <div class="spinner-border text-success" role="status"></div>
            </CCol>
            <CCol :md="12" class="text-center">
              <span class="sr-only">Loading...</span>
            </CCol>
          </CRow>
          <CRow v-if="phases.length === 0 && !loading" class="mt-4">
            <CCol :md="12" class="text-center">
              <span class="sr-only">No results</span>
            </CCol>
          </CRow>
          <CTable v-if="!loading && phases.length > 0">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">ID #</CTableHeaderCell>
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Required</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Actions
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="phase in phases" :key="phase.id">
                <CTableHeaderCell scope="row">{{ phase.id }}</CTableHeaderCell>
                <CTableDataCell>{{ phase.title }}</CTableDataCell>
                <CTableDataCell>
                  <CBadge
                    :color="phase.is_required ? 'success' : 'warning'"
                    shape="rounded-pill"
                  >
                    {{ phase.is_required ? 'Yes' : 'No' }}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <button
                    class="btn btn-sm btn-info text-white mx-1"
                    title="View Details"
                    @click="viewDetails(phase.id)"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <router-link
                    :to="{
                      name: 'Update Phase',
                      params: { id: this.$encrypt(phase.id) },
                    }"
                  >
                    <CButton
                      class="btn btn-sm btn-warning text-white m-1"
                      :xl="0"
                      title="Edit"
                    >
                      <ion-icon name="create-outline"></ion-icon>
                    </CButton>
                  </router-link>
                  <button
                    class="btn btn-sm btn-danger text-white"
                    @click="deletePhase(phase.id)"
                  >
                    <ion-icon name="trash-bin-outline"></ion-icon>
                  </button>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <CRow>
            <CCol :md="12" class="text-center">
              <nav aria-label="Users navigation">
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
        </CCardBody>
      </CCard>
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
      <CModalTitle>Phase Information</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CTable class="table table-responsive">
        <CTableRow>
          <CTableHeaderCell>ID</CTableHeaderCell>
          <CTableDataCell>{{ phase.id }}</CTableDataCell>
          <CTableHeaderCell>Title</CTableHeaderCell>
          <CTableDataCell>{{ phase.title }}</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell>Required</CTableHeaderCell>
          <CTableDataCell>
            <CBadge
              :color="phase.is_required ? 'success' : 'warning'"
              shape="rounded-pill"
            >
              {{ phase.is_required ? 'Yes' : 'No' }}
            </CBadge>
          </CTableDataCell>
        </CTableRow>
      </CTable>
      <Contractable v-if="phase.is_contractable" type="phase" :id="phase.id" />
      <Documentable v-if="phase.is_documentable" type="phase" :id="phase.id" />
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
</template>

<script>
import { debounce } from '@/utils/helper'

export default {
  name: 'Phases',
  data: () => ({
    debounceFn: null,
    phases: [],
    search: {
      title: '',
    },
    loading: false,
    pagination: [],
    is_phase_modal_visible: false,
    phase: {},
  }),
  methods: {
    getPhases: async function () {
      this.loading = true
      await this.$axios
        .get('/phases', {
          params: this.search,
        })
        .then((response) => {
          this.phases = response.data.data
          this.pagination = response.data.links
          this.loading = false
        })
    },
    filter: async function () {
      await this.debounceFn()
    },
    viewDetails: async function (id) {
      await this.$axios.get(`/phases/${id}`).then((response) => {
        this.phase = response.data
        this.is_phase_modal_visible = true
      })
    },
    gotoPage: async function (url) {
      this.loading = true
      await this.$axios
        .get(url, {
          params: this.search,
        })
        .then((response) => {
          this.phases = response.data.data
          this.pagination = response.data.links
          this.loading = false
        })
    },
    deletePhase: async function (id) {
      await swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this phase!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.delete(`/phases/${id}`).then(() => {
            // TODO: remove item from the existing array
            // instead of reassigning
            this.phases = this.phases.filter((phase) => phase.id !== id)
          })
          swal('Phase has been deleted!', {
            icon: 'success',
            timer: 3000,
          })
        }
      })
    },
  },
  mounted: async function () {
    await this.getPhases()
    this.debounceFn = debounce(() => this.getPhases(), 500)
  },
}
</script>
