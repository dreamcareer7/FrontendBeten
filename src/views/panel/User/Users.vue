<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-8 col-sm-4 col-xs-4">
              <h3 class="mt-1">Users</h3>
            </div>
            <div class="col-md-4 col-sm-8 col-xs-8">
              <router-link to="/users/create">
                <CButton color="success" class="float-end text-white">
                  <svg
                    class="button-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19.5 15c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-7.18 4h-14.815l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 6.751 0 7.506 7.595 3.64 13.679-1.292 2.031-2.64 3.63-2.64 5.821 0 1.747.696 3.331 1.82 4.5z"
                    />
                  </svg>
                  <span>Create User</span>
                </CButton>
              </router-link>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol :md="2" :sm="4">
              <input
                type="text"
                class="form-control mb-3"
                v-model="search.name"
                placeholder="Name"
                @change="getUsers"
              />
            </CCol>
            <CCol :md="2" :sm="4">
              <input
                type="text"
                class="form-control mb-3"
                v-model="search.email"
                placeholder="Email"
                @change="getUsers"
              />
            </CCol>
            <CCol :md="2" :sm="4">
              <input
                type="text"
                class="form-control mb-3"
                v-model="search.contact"
                placeholder="Contact"
                @change="getUsers"
              />
            </CCol>
          </CRow>
          <CRow v-if="loading" class="mt-4">
            <CCol :md="12" class="text-center">
              <div class="spinner-border text-success" role="status"></div>
            </CCol>
            <CCol :md="12" class="text-center">
              <span class="sr-only">Loading...</span>
            </CCol>
          </CRow>
          <CTable v-if="!loading" responsive hover class="cursor-pointer" align="middle">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                <CTableHeaderCell scope="col">E-mail</CTableHeaderCell>
                <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                <CTableHeaderCell scope="col">Active</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date created</CTableHeaderCell>
                <CTableHeaderCell
                  style="width: 15%"
                  scope="col"
                  :aria-colspan="2"
                >
                  Actions
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="user in users" :key="user.id">
                <CTableHeaderCell scope="row">{{ user.id }}</CTableHeaderCell>
                <CTableDataCell>{{ user.name }}</CTableDataCell>
                <CTableDataCell>{{ user.username }}</CTableDataCell>
                <CTableDataCell>{{ user.email }}</CTableDataCell>
                <CTableDataCell>{{ user.contact }}</CTableDataCell>
                <CTableDataCell><CBadge :color="user.is_active ? 'success' : 'warning'" shape="rounded-pill">{{ user.is_active ? 'Yes' : 'No'}}</CBadge></CTableDataCell>
                <CTableDataCell>{{ user.created_at }}</CTableDataCell>
                <CTableDataCell :aria-colspan="2">
                  <button
                    class="btn btn-sm btn-info text-white mx-1"
                    v-c-tooltip="{content: 'View Detail', placement: 'top'}"
                    @click="fetchUserInfo(this.$encrypt(user.id))"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <router-link :to="{
                    name: 'Edit user',
                    params: { id: this.$encrypt(user.id) },
                  }">
                    <CButton class="btn btn-sm btn-warning text-white m-1"  v-c-tooltip="{content: 'Edit', placement: 'top'}" :xl="0" title="Edit">
                      <ion-icon name="create-outline"></ion-icon>
                    </CButton>
                  </router-link>
                  <button class="btn btn-sm btn-danger text-white m-1" v-c-tooltip="{content: 'Delete', placement: 'top'}" @click="deleteUser(user.id, user.name)" title="Delete">
                    <ion-icon name="trash-bin-outline"></ion-icon>
                  </button>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <CRow>
            <CCol :md="12" class="text-center">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <template v-for="page in pagination" :key="page">
                    <li class="page-item">
                      <a
                        @click.prevent="gotoPage(page.url)"
                        class="page-link"
                        href="#"
                        v-html="page.label"
                        v-if="page.url"
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

    <!-- Table Detail Modal -->
    <CModal
      :visible="showUserDetailModal"
      @close="showUserDetailModal = false"
      size="lg"
    >
      <CModalHeader>
        <CModalTitle>User Info</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CTable responsive>
          <CTableRow class="mt-3">
            <CTableHeaderCell>ID:</CTableHeaderCell>
            <CTableDataCell>{{ currentUser.id }}</CTableDataCell>
            <CTableHeaderCell>Full Name:</CTableHeaderCell>
            <CTableDataCell>{{ currentUser.name }}</CTableDataCell>
          </CTableRow>

          <CTableRow class="mt-3">
            <CTableHeaderCell>Username:</CTableHeaderCell>
            <CTableDataCell>{{ currentUser.username }}</CTableDataCell>
            <CTableHeaderCell>Email:</CTableHeaderCell>
            <CTableDataCell>{{ currentUser.email }}</CTableDataCell>
          </CTableRow>

          <CTableRow class="mt-3">
            <CTableHeaderCell>Is Active?:</CTableHeaderCell>
            <CTableDataCell>
              {{currentUser.is_active ? 'Yes' : 'No'}}
            </CTableDataCell>
            <CTableHeaderCell>Contact:</CTableHeaderCell>
            <CTableDataCell>{{ currentUser.contact }}</CTableDataCell>
          </CTableRow>

          <CTableRow class="mt-3">
            <CTableHeaderCell>Date Created:</CTableHeaderCell>
            <CTableDataCell>{{ currentUser.created_at }}</CTableDataCell>
            <CTableHeaderCell>Date Updated:</CTableHeaderCell>
            <CTableDataCell>{{ currentUser.updated_at }}</CTableDataCell>
          </CTableRow>
        </CTable>
        <CRow class="mb-1 mt-4">
          <CFormLabel class="col-sm-4 col-form-label" style="font-weight: 600">
            Contract
          </CFormLabel>
          <div class="col-sm-8">
            <CInputGroup class="mb-3">
              <CFormInput type="file" ref="uploadfile" class="me-2" @change="filesChange('contract', $event.target.files);" />
              <CButton type="button" color="success text-white" @click="uploadFiles('contract')">Upload</CButton>
            </CInputGroup>
          </div>
          <div class="px-4">
            <CTable responsive bordered small align="middle">
              <CTableBody>
                <CTableRow
                  v-for="(contract, index) in contracts"
                  :key="index"
                >
                  <CTableDataCell class="ps-2">
                    <a :href="`http://localhost:8081/files/${contract.name}`" target="_blank">
                      {{ contract.name }}
                    </a>
                  </CTableDataCell>
                  <CTableDataCell class="col-sm-2">
                    <button
                      class="btn btn-sm btn-info text-white m-1"
                      title="View details"
                    >
                      <ion-icon name="eye-outline"></ion-icon>
                    </button>
                    <button
                      class="btn btn-sm btn-danger text-white m-1"
                      title="Delete"
                      @click="deleteFile('contract', index)"
                    >
                      <ion-icon name="trash-bin-outline"></ion-icon>
                    </button>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </div>
        </CRow>
        <CRow class="mb-1">
          <CFormLabel
            for="documents"
            class="col-sm-4 col-form-label"
            style="font-weight: 600"
          >
            Documents
          </CFormLabel>
          <div class="col-sm-8">
            <CInputGroup class="mb-3">
              <CFormInput type="file" class="me-2" multiple @change="filesChange('documents', $event.target.files);" />
              <CButton type="button" color="primary text-white" @click="uploadFiles('document')">Upload</CButton>
            </CInputGroup>
          </div>
          <div class="px-4">
            <CTable responsive bordered small align="middle">
              <CTableBody>
                <CTableRow
                  v-for="(document, index) in documents"
                  :key="index"
                >
                  <CTableDataCell>
                    <a :href="`http://localhost:8081/files/${document.name}`" target="_blank">
                      {{ document.name }}
                    </a>
                  </CTableDataCell>
                  <CTableDataCell class="col-sm-2">
                    <button
                      class="btn btn-sm btn-info text-white m-1"
                      title="View details"
                    >
                      <ion-icon name="eye-outline"></ion-icon>
                    </button>
                    <button
                      class="btn btn-sm btn-danger text-white m-1"
                      title="Delete"
                      @click="deleteFile('document', index)"
                    >
                      <ion-icon name="trash-bin-outline"></ion-icon>
                    </button>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </div>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          class="text-white"
          @click="() => showUserDetailModal = false"
        >
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  </CRow>

  <CModal size="lg" :visible="visibleLiveDemo" @close="visibleLiveDemo = false" class="modal-popup-detail" data-backdrop="static" data-keyboard="false">
    <CModalHeader>
      <CModalTitle>User Information</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CRow>
        <CCol :md="12">
          <CTable class="table table-responsive">
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableDataCell>{{ user.id }}</CTableDataCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableDataCell>{{ user.name }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Username</CTableHeaderCell>
              <CTableDataCell>{{ user.username }}</CTableDataCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableDataCell>{{ user.email }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Is active:</CTableHeaderCell>
              <CTableDataCell>
                <CBadge :color="user.is_active ? 'success' : 'warning'" shape="rounded-pill">{{ user.is_active ? 'Yes' : 'No'}}</CBadge>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Contact</CTableHeaderCell>
              <CTableDataCell>{{ user.contact }}</CTableDataCell>
              <CTableHeaderCell>Date created</CTableHeaderCell>
              <CTableDataCell>{{ user.created_at }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Date updated</CTableHeaderCell>
              <CTableDataCell>{{ user.updated_at }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell colspan="4">
                <Documentable :endpoint="`/users/update/${user.id}`" type="user" :id="user.id" />
              </CTableDataCell>
            </CTableRow>
          </CTable>
        </CCol>
      </CRow>
    </CModalBody>
  </CModal>
</template>

<script>
export default {
  name: 'users',
  data: () => ({
    users: '',
    search: {},
    pagination: {},
    current_page: 1,
    last_page: 99,
    selected_user: null,
    loading: false,
    showUserDetailModal: false,
    currentUser: {},
    contracts: [],
    contractFile: [],
    documents: [],
    documentFiles: [],
    user: {},
    visibleLiveDemo: false,
  }),
  methods: {
    nextPage: async function () {
      this.current_page = this.current_page + 1
      this.search.page = this.current_page
      this.getUsers()
    },
    previousPage: async function () {
      this.current_page = this.current_page - 1
      this.search.page = this.current_page
      this.getUsers()
    },
    getUsers: async function () {
      this.loading = true
      await this.$axios
        .get(`/users/paginate`, {
          params: this.search,
        })
        .then((response) => {
          this.users = response.data.data
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
          this.pagination = response.data.links
        })
      this.loading = false
    },
    gotoPage: async function (url) {
      this.loading = true
      await this.$axios
        .get(url, {
          params: this.search,
        })
        .then((response) => {
          this.users = response.data.data
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
          this.pagination = response.data.links
        })
      this.loading = false
    },
    deleteUser: async function (id, name) {
      await swal({
        title: `Are you sure?`,
        text: `Once deleted, you will not be able to recover ${name}!`,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.post(`/users/delete/${id}`).then(() => {
            this.getUsers()
          })
          swal(`The user ${name} has been deleted!`, {
            icon: 'success',
          })
        }
      })
    },
    fetchUserInfo: async function (id) {
      await this.$axios
        .get(`/users/info/${this.$decrypt(id)}`)
        .then((response) => {
          this.user = response.data.data
          this.visibleLiveDemo = true
        })
    },
    async viewDetails(id) {
      await this.$axios
        .get(`/users/info/${this.$decrypt(id)}}`)
        .then((response) => (this.currentUser = response.data.data))
      this.showUserDetailModal = true
    },
    filesChange(fileType, fileList) {
      if(fileType === 'contract') {
        this.contractFile = fileList
      } else {
        this.documentFiles = fileList
      }
    },
    uploadFiles(fileType) {
      if (fileType === 'contract' && this.contractFile.length > 0) {
        this.contracts.push(this.contractFile[0])
        this.contractFile = [];
        this.$refs.uploadfile.value = null;
      }

      if (fileType === 'document' && this.documentFiles.length > 0) {
        this.documents.push(...this.documentFiles)
        this.documentFiles = [];
      }
    },
    deleteFile(fileType, index) {
      if (fileType === 'contract') {
        this.contracts.splice(index, 1)
      } else {
        this.documents.splice(index, 1)
      }
    }
  },
  mounted() {
    this.getUsers()
  },
}
</script>
