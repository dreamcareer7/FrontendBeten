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
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Service</CTableHeaderCell>
                <CTableHeaderCell scope="col">Badge</CTableHeaderCell>
                <CTableHeaderCell scope="col">Schedule At</CTableHeaderCell>
                <CTableHeaderCell scope="col">Started At</CTableHeaderCell>
                <CTableHeaderCell scope="col">From Location</CTableHeaderCell>
                <CTableHeaderCell scope="col">Supervisor ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="commit in commits" :key="commit.id">
                <CTableHeaderCell scope="row">{{ commit.id }}</CTableHeaderCell>
                <CTableDataCell>{{ commit.service.title }}</CTableDataCell>
                <CTableDataCell>{{ commit.badge }}</CTableDataCell>
                <CTableDataCell>{{ commit.scheduled_at }}</CTableDataCell>
                <CTableDataCell>{{ commit.started_at }}</CTableDataCell>
                <CTableDataCell>{{ commit.location }}</CTableDataCell>
                <CTableDataCell>{{ commit.supervisor?.name }}</CTableDataCell>
                <CTableDataCell>
                  <router-link :to="{
                    name: 'service_commit_info',
                    params: { id: commit.id },
                  }">
                    <button class="btn btn-sm btn-info text-white mx-1" title="View">
                      <ion-icon name="eye-outline"></ion-icon>
                    </button>
                  </router-link>
                  <router-link :to="{
                    name: 'Update Service Commit',
                    params: { id: commit.id },
                  }">
                    <CButton class="btn btn-sm btn-warning text-white mx-1" title="Edit">
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
</template>

<script>
export default {
  name: "service_commit",
  data: () => ({
      commits: [],
  }),
  methods: {
    async deleteCommit(id) {
      await swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this service commit!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.delete(`/service/commits/${id}`).then(() =>
            this.commits = this.commits.filter((commit) => commit.id !== id)
          ).catch((error) => {
            // TODO: swal the error message
            console.log(error)
          })
          swal('Service commit has been deleted!', {
            icon: 'success',
          });
        }
      });
    },
  },
  mounted() {
      this.$axios.get("/service/commits")
          .then((response) => this.commits = response.data);
  },
}
</script>
