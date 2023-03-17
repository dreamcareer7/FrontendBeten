<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-10">
              <strong>Service Commits</strong>
            </div>
            <div class="col-md-2">
              <router-link to="/services/commits/create">
                <CButton color="primary" class="float-end">
                  Create Commit
                </CButton>
              </router-link>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Service</CTableHeaderCell>
                <CTableHeaderCell scope="col">Badge</CTableHeaderCell>
                <CTableHeaderCell scope="col">Schedule At</CTableHeaderCell>
                <CTableHeaderCell scope="col">Started</CTableHeaderCell>
                <CTableHeaderCell scope="col">From</CTableHeaderCell>
                <CTableHeaderCell scope="col">Supervisor</CTableHeaderCell>
                <CTableHeaderCell scope="col">Phase</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="commit in commits" :key="commit.id">
                <CTableDataCell>{{ commit.service.title }}</CTableDataCell>
                <CTableDataCell>{{ commit.badge }}</CTableDataCell>
                <CTableDataCell>{{ commit.schedule_at }}</CTableDataCell>
                <CTableDataCell>{{ commit.started_at }}</CTableDataCell>
                <CTableDataCell>{{ commit.from_location }}</CTableDataCell>
                <CTableDataCell>{{
                  commit.supervisor.name
                }}</CTableDataCell>
                <CTableDataCell>{{ commit.phase?.title }}</CTableDataCell>
                <CTableDataCell>
                <router-link
                      :to="{
                        name: 'Service Commit details',
                        params: { id: this.$encrypt(commit.id) },
                      }"
                    >
                      <button
                        class="btn btn-sm btn-info text-white mx-1"
                        title="View"
                      >
                        <ion-icon name="eye-outline"></ion-icon>
                      </button>
                    </router-link>
                  <router-link
                    :to="{
                      name: 'Update Service Commit',
                      params: { id: this.$encrypt(commit.id) },
                    }"
                  >
                    <CButton
                      class="btn btn-sm btn-warning text-white mx-1"
                      title="Edit"
                    >
                      <ion-icon name="create-outline"></ion-icon>
                    </CButton>
                  </router-link>
                  <button
                    class="btn btn-sm btn-danger text-white"
                    @click="deleteCommit(commit.id)"
                    title="Delete"
                  >
                    <ion-icon name="trash-bin-outline"></ion-icon>
                  </button>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <CRow>
        <CCol :md="12" class="text-center">
          <nav aria-label="Service commits navigation">
            <ul class="pagination">
              <template v-for="page in pagination" :key="page">
                <li class="page-item" :class="{ active: page.active }">
                  <a @click.prevent="gotoPage(page.url)" class="page-link" :class="{ disabled: !page.url }"
                    v-html="page.label"></a>
                </li>
              </template>
            </ul>
          </nav>
        </CCol>
      </CRow>
</template>

<script>
export default {
  name: 'Commits',
  data: () => ({
    commits: [],
    pagination: [],

  }),
  methods: {
    gotoPage: async function (url) {
      await this.$axios
        .get(url)
        .then((response) => {
          this.commits = response.data.data
          this.pagination = response.data.links
        })
    },
    async deleteCommit(id) {
      await swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this service commit!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios
            .delete(`/service/commits/${id}`)
            .then(
              () =>
                (this.commits = this.commits.filter(
                  (commit) => commit.id !== id,
                )),
            )
            .catch((error) => {
              // TODO: swal the error message
              console.log(error)
            })
          swal('Service commit has been deleted!', {
            icon: 'success',
          })
        }
      })
    },
  },
  async mounted() {
    await this.$axios
      .get('/service_commits')
      .then((response) => {
        this.commits = response.data.data
        this.pagination = response.data.links
      }
        )
      .catch((error) => {
        swal({
          title: error.response.statusText,
          text: error.response.data.message,
          icon: 'error',
        })
      })
  },
}
</script>
