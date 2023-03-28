<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <CCardTitle>{{ $t("Groups") }}</CCardTitle>
          <router-link
            :to="{ name: 'Create group' }"
            v-if="$can('groups.create')"
          >
            <CButton color="success" class="float-end text-white">
              <ion-icon name="people-outline"></ion-icon>&nbsp;
              {{ $t("Create group") }}
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
                @keyup="filter(search.title, $event)"
              />
            </CCol>
            <CCol :md="4">
              <input
                type="text"
                class="form-control"
                v-model="search.crew_member"
                :placeholder="$t('Search crew member')"
                @keyup="filter(search.crew_member, $event)"
              />
            </CCol>
          </CRow>
          <hr />
          <CRow v-if="loading" class="mt-4">
            <CCol :md="12" class="text-center">
              <div class="spinner-border text-success" role="status"></div>
            </CCol>
            <CCol :md="12" class="text-center">
              <span class="sr-only">{{ $t("Loading...") }}</span>
            </CCol>
          </CRow>
          <CRow v-if="groups.length === 0 && !loading" class="mt-4">
            <CCol :md="12" class="text-center">
              <span class="sr-only">{{ $t("No results") }}</span>
            </CCol>
          </CRow>
          <CTable v-if="!loading && groups.length > 0">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">
                  {{ $t("Title") }}
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  {{ $t("Crew member") }}
                </CTableHeaderCell>
                <CTableHeaderCell
                  style="width: 20%"
                  scope="col"
                  :aria-colspan="2"
                >
                  {{ $t("Actions") }}
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="group in groups" :key="group.id">
                <CTableDataCell>{{ group.title }}</CTableDataCell>
                <CTableDataCell>{{ group.crew.fullname }}</CTableDataCell>
                <CTableDataCell>
                   <router-link
                    :to="{
                      name: 'Group Detail',
                      params: { id: this.$encrypt(group.id) },
                    }"
                    v-if="$can('groups.view')"
                  >
                    <CButton
                      class="btn btn-sm btn-info text-white m-1"
                      :xl="0"
                      :title="$t('Detail')"
                    >
                       <ion-icon name="eye-outline"></ion-icon>
                    </CButton>
                  </router-link>
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

  <!-- Small modal size unless documents or contracts or concurrents -->
  <CModal
    size="lg"
    :visible="is_group_modal_visible"
    @close="is_group_modal_visible = false"
    class="modal-popup-detail"
    data-backdrop="static"
    data-keyboard="false"
  >
    <CModalHeader>
      <CModalTitle>{{ $t("Group Information") }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CRow>
        <CCol :md="12">
          <CTable class="table table-responsive">
            <CTableRow>
              <CTableDataCell>
                {{ $t("Title") }}: {{ group.title }}
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>
                {{ $t("Crew member") }}: {{ group.crew?.fullname }}
              </CTableDataCell>
            </CTableRow>
          </CTable>
        </CCol>
      </CRow>
      <hr />
      <CRow>
        <CCol :md="12" class="text-center">
          <div class="row">
            <div class="col-6">
              <h6>{{ $t("Search Client") }}</h6>
              <input
                type="text"
                v-model="client_query"
                class="form-control"
                @input.prevent="searchClients"
              />
              <div class="row mt-3">
                <div class="row border p-2 mb-2 mx-0" v-for="client in clients">
                  <div class="col-8">
                    <h6>{{ client.fullname }}</h6>
                  </div>
                  <div class="col-4">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="addClientToGroup(client)"
                    >
                      <ion-icon name="arrow-forward-outline"></ion-icon>
                    </button>
                  </div>
                </div>
              </div>
              <CRow v-if="loading_clients" class="mt-3">
                <CCol :md="12" class="text-center">
                  <div class="spinner-border text-success" role="status"></div>
                </CCol>
                <CCol :md="12" class="text-center">
                  <span class="sr-only">{{ $t("Loading...") }}</span>
                </CCol>
              </CRow>
            </div>
            <div class="col-6">
              <h6>{{ $t("Assigned Members to this Group") }}</h6>
              <div class="row border p-2 mb-2 mx-0" v-for="client in group.clients">
                <div class="col-8">
                  <h6>{{ client.fullname }}</h6>
                </div>
                <div class="col-4">
                  <button
                    class="btn btn-primary"
                    type="button"
                    @click="removeClientFromGroup(client)"
                  >
                    <ion-icon name="arrow-back-outline"></ion-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CCol>
        <button class="btn btn-warning text-white" @click="update">
          <ion-icon name="save-outline"></ion-icon>&nbsp;{{ $t("Save") }}
        </button>
      </CRow>
      <Documentable v-if="group.is_documentable" type="group" :id="group.id" />
      <Contractable v-if="group.is_contractable" type="group" :id="group.id" />
      <Concurrable v-if="group.is_concurrable" type="group" :id="group.id" />
    </CModalBody>
  </CModal>
</template>

<script>
import { debounce } from "@/utils/helper";

export default {
  name: "Groups",
  data: () => ({
    debounceFn: null,
    group: {},
    client_query: "",
    clients: [],
    groups: [],
    search: {},
    loading: false,
    loading_clients: false,
    pagination: [],
    is_group_modal_visible: false,
  }),
  methods: {
    update: async function () {
      await swal({
        title: this.$i18n.t("Are you sure?"),
        text: this.$i18n.t(
          "Click confirm to update, this action is irreversible"
        ),
        icon: "warning",
        buttons: [this.$i18n.t("Cancel"), this.$i18n.t("Confirm")],
      }).then((willUpdate) => {
        if (willUpdate) {
          this.group.clients = this.group.clients.map((client) => client.id);
          this.$axios
            .patch(`/groups/${this.group.id}`, this.group)
            .then(() => {
              this.$router.push({ name: "Groups" });
              swal(this.$i18n.t("Updated successfully!"), {
                icon: "success",
                timer: 3000,
              });
              this.clients = [];
              this.client_query = "";
            })
            .catch(
              (error) =>
                (this.error_message =
                  error.response?.data.message || error.message)
            );
        }
      });
    },
    async addClientToGroup(client) {
      // If client is not already added to the group
      if (!this.group.clients.includes(client)) {
        this.group.clients.push(client);
      }
      const index = this.clients.indexOf(client);
      this.clients.splice(index, 1);
    },
    removeClientFromGroup(client) {
      const index = this.group.clients.indexOf(client);
      if (index > -1) {
        // only splice array when item is found
        this.group.clients.splice(index, 1); // 2nd parameter means remove one item only
      }
      if (!this.clients.includes(client)) {
        this.clients.push(client);
      }
    },
    searchClients: async function () {
      if (this.client_query) {
        this.loading_clients = true
        await this.$axios
          .get("/clients", {
            params: { fullname: this.client_query, per_page: 6 },
          })
          .then((response) => {
            this.clients = response.data.data.filter((client) => {
              return !this.group.clients
                .map((client) => client.id)
                .includes(client.id);
            });
            this.loading_clients = false
          });
      } else {
        this.clients = [];
      }
    },
    async getGroups(reset = false) {
      this.loading = true;
      await this.$axios
        .get(`/groups`, {
          params: reset ? {} : this.search,
        })
        .then((response) => {
          this.groups = response.data.data;
          this.pagination = response.data.links;
          this.loading = false;
        });
    },
    filter: async function (value, event) {
      if (
        (event.key == "Backspace" || event.key == "Delete") &&
        value.length <= 2
      ) {
        await this.getGroups(true);
      } else if (value.length > 2) {
        await this.debounceFn();
      }
    },
    fetchGroupInfo: async function (id) {
      await this.$axios.get(`/groups/${id}`).then((response) => {
        this.group = response.data;
        this.is_group_modal_visible = true;
      });
    },
    gotoPage: async function (url) {
      this.loading = true;
      await this.$axios
        .get(url, {
          params: this.search,
        })
        .then((response) => {
          this.groups = response.data.data;
          this.pagination = response.data.links;
          this.loading = false;
        });
    },
    deleteGroup: async function (id) {
      await swal({
        title: this.$i18n.t("Are you sure?"),
        text: this.$i18n.t("Once deleted, you will not be able to recover!"),
        icon: "warning",
        buttons: [this.$i18n.t("Cancel"), this.$i18n.t("Confirm")],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.delete(`/groups/${id}`).then(
            this.groups.splice(
              this.groups.findIndex((group) => group.id === id),
              1
            )
          );
          swal(this.$i18n.t("Group has been deleted!"), {
            icon: "success",
            timer: 3000,
          });
        }
      });
    },
  },
  async mounted() {
    await this.getGroups();
    this.debounceFn = debounce(() => this.getGroups(), 500);
  },
};
</script>
