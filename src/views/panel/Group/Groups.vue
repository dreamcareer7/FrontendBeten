<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <CCardTitle>{{ $t('Groups') }}</CCardTitle>
          <router-link
            :to="{ name: 'Create group' }"
            v-if="$can('groups.create')"
          >
            <CButton color="success" class="float-end text-white">
              <ion-icon name="people-outline"></ion-icon>&nbsp;
              {{ $t('Create group') }}
            </CButton>
          </router-link>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol :md="2">
              <input
                type="text"
                class="form-control"
                v-model="search.title"
                :placeholder="$t('Search title')"
                @keyup="filter(search.title)"
              />
            </CCol>
            <CCol :md="4">
              <input
                type="text"
                class="form-control"
                v-model="search.crew_member"
                :placeholder="$t('Search crew member')"
                @keyup="filter(search.crew_member)"
              />
            </CCol>
          </CRow>
          <hr />
          <CRow v-if="loading" class="mt-4">
            <CCol :md="12" class="text-center">
              <div class="spinner-border text-success" role="status"></div>
            </CCol>
            <CCol :md="12" class="text-center">
              <span class="sr-only">{{ $t('Loading...') }}</span>
            </CCol>
          </CRow>
          <CRow v-if="groups.length === 0 && !loading" class="mt-4">
            <CCol :md="12" class="text-center">
              <span class="sr-only">{{ $t('No results') }}</span>
            </CCol>
          </CRow>
          <CTable v-if="!loading && groups.length > 0">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">{{ $t('Title') }}</CTableHeaderCell>
                <CTableHeaderCell scope="col">{{ $t('Crew member') }}</CTableHeaderCell>
                <CTableHeaderCell
                  style="width: 20%"
                  scope="col"
                  :aria-colspan="2"
                >
                  {{ $t('Actions') }}
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="group in groups" :key="group.id">
                <CTableDataCell>{{ group.title }}</CTableDataCell>
                <CTableDataCell>{{ group.crew.fullname }}</CTableDataCell>
                <CTableDataCell>
                  <button
                    class="btn btn-sm btn-info text-white mx-1"
                    :title="$t('View details')"
                    @click="fetchGroupInfo(group.id)"
                    v-if="$can('groups.view')"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <router-link
                    :to="{
                      name: 'Update Group',
                      params: { id: this.$encrypt(group.id) },
                    }"
                    v-if="$can('groups.edit')"
                  >
                    <CButton
                      class="btn btn-sm btn-warning text-white m-1"
                      :xl="0"
                      :title="$t('Edit')"
                    >
                      <ion-icon name="create-outline"></ion-icon>
                    </CButton>
                  </router-link>
                  <button
                    class="btn btn-sm btn-danger text-white"
                    @click="deleteGroup(group.id)"
                    :title="$t('Delete')"
                    v-if="$can('groups.delete')"
                  >
                    <ion-icon name="trash-bin-outline"></ion-icon>
                  </button>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <CRow>
            <CCol :md="12" class="text-center">
              <nav :aria-label="$t('Groups navigation')">
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

  <!-- Small modal size unless documents or contracts -->
  <CModal
    :size="modalSize"
    :visible="is_group_modal_visible"
    @close="is_group_modal_visible = false"
    class="modal-popup-detail"
    data-backdrop="static"
    data-keyboard="false"
  >
    <CModalHeader>
      <CModalTitle>{{ $t('Group Information') }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CRow>
        <CCol :md="12">
          <CTable class="table table-responsive">
            <CTableRow>
              <CTableDataCell>{{ $t('Title') }}: {{ group.title }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>
                {{ $t('Crew member') }}: {{ group.crew?.fullname }}
              </CTableDataCell>
            </CTableRow>
          </CTable>
        </CCol>
      </CRow>
      <CRow>
        <CCol :md="12">
          <h3>{{ $t('Clients') }}</h3>
          <CTable class="table table-responsive">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">{{ $t('Fullname') }}</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableRow v-for="client in group.clients" :key="client.id">
              <CTableDataCell>{{ client.fullname }}</CTableDataCell>
            </CTableRow>
          </CTable>
        </CCol>
      </CRow>
      <Documentable v-if="group.is_documentable" type="group" :id="group.id" />
      <Contractable v-if="group.is_contractable" type="group" :id="group.id" />
      <Concurrable v-if="group.is_concurrable" type="group" :id="group.id" />
    </CModalBody>
  </CModal>
</template>

<script>
import { debounce } from '@/utils/helper'

export default {
  name: 'Groups',
  data: () => ({
    debounceFn: null,
    group: {},
    groups: [],
    search: {
      title: '',
      crew_member: '',
    },
    loading: false,
    pagination: [],
    is_group_modal_visible: false,
  }),
  computed: {
    modalSize() {
      if (this.group.is_contractable || this.group.is_documentable || this.group.is_concurrable) {
        return 'lg'
      }
      return 'sm'
    }
  },
  methods: {
    async getGroups() {
      this.loading = true
      await this.$axios
        .get(`/groups`, {
          params: this.search,
        })
        .then((response) => {
          this.groups = response.data.data
          this.pagination = response.data.links
          this.loading = false
        })
    },
    filter: async function (value) {
      if (value.length > 2) {
        await this.debounceFn()
      }
    },
    fetchGroupInfo: async function (id) {
      await this.$axios.get(`/groups/${id}`).then((response) => {
        this.group = response.data
        this.is_group_modal_visible = true
      })
    },
    gotoPage: async function (url) {
      this.loading = true
      await this.$axios
        .get(url, {
          params: this.search,
        })
        .then((response) => {
          this.groups = response.data.data
          this.pagination = response.data.links
          this.loading = false
        })
    },
    deleteGroup: async function (id) {
      await swal({
        title: this.$i18n.t('Are you sure?'),
        text: this.$i18n.t('Once deleted, you will not be able to recover!'),
        icon: 'warning',
        buttons: [this.$i18n.t('Cancel'), this.$i18n.t('Confirm')],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.delete(`/groups/${id}`).then(
            this.groups.splice(
              this.groups.findIndex((group) => group.id === id),
              1,
            ),
          )
          swal(this.$i18n.t('Group has been deleted!'), {
            icon: 'success',
            timer: 3000,
          })
        }
      })
    },
  },
  async mounted() {
    await this.getGroups()
    this.debounceFn = debounce(() => this.getGroups(), 500)
  },
}
</script>
