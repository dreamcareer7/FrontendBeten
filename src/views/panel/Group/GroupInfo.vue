<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <div class="row">
            <div class="col-md-12 col-sm-12">
              <h3 class="mt-1">
                {{ group.title }}
                <CButton
                  @click="
                    is_client_add_modal_visible = true;
                    (clientList = []), (selectedClients = []);
                  "
                  color="success"
                  class="float-end text-white"
                  v-if="$can('groups.clients.add')"
                >
                  <ion-icon name="people-outline"></ion-icon>&nbsp;
                  {{ $t("Add clients to group") }}
                </CButton>
              </h3>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <span class="fs-5"
            ><strong>{{ $t("Crew member") }}:</strong>
            {{ group.crew?.fullname }}</span
          >
          <!-- Start search filters -->
          <CRow class="mt-3">
            <CCol :md="2">
              <input
                type="text"
                class="form-control mb-3"
                v-model="search.fullname"
                :placeholder="$t('Fullname')"
                @keyup="filter(search.fullname, $event)"
              />
            </CCol>
            <CCol :md="2">
              <select
                class="form-control mb-3"
                v-model="search.country"
                @change="getClients()"
              >
                <option value="" selected>{{ $t("Any country") }}</option>
                <template v-for="country in countries" :key="country.id">
                  <option :value="country.id">{{ $t(country.title) }}</option>
                </template>
              </select>
            </CCol>
            <CCol :md="2">
              <select
                class="form-control mb-3"
                v-model="search.gender"
                @change="getClients()"
              >
                <option value="" selected>{{ $t("Any gender") }}</option>
                <option value="Male">{{ $t("Male") }}</option>
                <option value="Female">{{ $t("Female") }}</option>
              </select>
            </CCol>
            <CCol :md="2">
              <input
                type="number"
                class="form-control mb-3"
                v-model="search.id_number"
                :placeholder="$t('ID number')"
                @keyup="filter(String(search.id_number), $event)"
              />
            </CCol>
          </CRow>
          <hr />
          <!-- End filter -->
          <CRow v-if="loading" class="mt-4">
            <CCol :md="12" class="text-center">
              <div class="spinner-border text-success" role="status"></div>
            </CCol>
            <CCol :md="12" class="text-center">
              <span class="sr-only">{{ $t('Loading...') }}</span>
            </CCol>
          </CRow>
          <CTable v-if="!loading" responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">
                  {{ $t("Fullname") }}
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  {{ $t("Country") }}
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  {{ $t("ID type") }}
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  {{ $t("ID number") }}
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  {{ $t("ID name") }}
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  {{ $t("Gender") }}
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  {{ $t("Date of birth") }}
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  {{ $t("Phone") }}
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  {{ $t("Actions") }}
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="client in group.clients" :key="client.id">
                <CTableDataCell>{{ client.fullname }}</CTableDataCell>
                <CTableDataCell>{{ client.country }}</CTableDataCell>
                <CTableDataCell>{{ client.id_type }}</CTableDataCell>
                <CTableDataCell>{{ client.id_number }}</CTableDataCell>
                <CTableDataCell>{{ client.id_name }}</CTableDataCell>
                <CTableDataCell>{{ $t(client.gender) }}</CTableDataCell>
                <CTableDataCell>{{ client.dob }}</CTableDataCell>
                <CTableDataCell>{{ client.phone }}</CTableDataCell>
                <CTableDataCell>
                  <button
                    class="btn btn-sm btn-info text-white mx-1"
                    :title="$t('View details')"
                    @click="viewDetails(client.id)"
                    v-if="$can('clients.view')"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <button
                    class="btn btn-sm btn-danger text-white m-1"
                    @click="removeClientFromGroup(index)"
                    :title="$t('Remove')"
                    v-if="$can('groups.clients.remove')"
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

  <CModal
    :visible="is_client_modal_visible"
    @close="is_client_modal_visible = false"
    class="modal-popup-detail"
  >
    <CModalHeader>
      <CModalTitle>{{ $t("Client Information") }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CRow>
        <CCol :md="12">
          <CTable class="table table-responsive">
            <CTableRow>
              <CTableHeaderCell>{{ $t("Fullname") }}:</CTableHeaderCell>
              <CTableDataCell>{{ client.fullname }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>{{ $t("Gender") }}:</CTableHeaderCell>
              <CTableDataCell>{{ $t(client.gender) }}</CTableDataCell>
              <CTableHeaderCell>{{ $t("Country") }}:</CTableHeaderCell>
              <CTableDataCell>{{ client.country }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>{{ $t("ID number") }}:</CTableHeaderCell>
              <CTableDataCell>
                {{ client.id_number }}
              </CTableDataCell>
              <CTableHeaderCell>{{ $t("is handicap") }}:</CTableHeaderCell>
              <CTableDataCell>
                <CBadge
                  :color="client.is_handicap ? 'success' : 'warning'"
                  shape="rounded-pill"
                >
                  {{ client.is_handicap ? $t("Yes") : $t("No") }}
                </CBadge>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>{{ $t("ID number") }}:</CTableHeaderCell>
              <CTableDataCell>{{ client.id_number }}</CTableDataCell>
              <CTableHeaderCell>{{ $t("ID type") }}</CTableHeaderCell>
              <CTableDataCell>{{ client.id_type }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>{{ $t("Date of birth") }}:</CTableHeaderCell>
              <CTableDataCell>{{ client.dob }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>{{ $t("Phone") }}:</CTableHeaderCell>
              <CTableDataCell>{{ client.phone }}</CTableDataCell>
            </CTableRow>
          </CTable>
          <Documentable
            v-if="client.is_documentable"
            type="client"
            :id="client.id"
          />
          <Contractable
            v-if="client.is_contractable"
            type="client"
            :id="client.id"
          />
          <Concurrable
            v-if="client.is_concurrable"
            type="client"
            :id="client.id"
          />
        </CCol>
      </CRow>
    </CModalBody>
  </CModal>

  <CModal
    :visible="is_client_add_modal_visible"
    @close="is_client_add_modal_visible = false"
    class="modal-popup-detail"
  >
    <CModalHeader>
      <CModalTitle>{{ $t("Add clients to group") }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CRow>
        <CCol :sm="12" class="mb-3">
          <input
            type="text"
            class="form-control mb-3"
            v-model="queryClient"
            :placeholder="$t('Fullname')"
            @keyup="searchClients(queryClient, $event)"
          />

          <CCol :md="12" v-if="clientListLoading" class="text-center">
            <div class="spinner-border text-success" role="status"></div>
          </CCol>
          <CCol :md="12" v-if="clientListLoading" class="text-center">
            <span class="sr-only">Loading...</span>
          </CCol>
          <CListGroup v-if="!clientListLoading">
            <CListGroupItem v-for="client in clientList" :key="client.id">
              <label class="form-check">
                <input
                  class="form-check-input me-2"
                  v-model="selectedClients"
                  :value="client"
                  type="checkbox"
                  value="1"
                />{{ client.fullname }}
              </label>
            </CListGroupItem>
          </CListGroup>
        </CCol>
        <CCol :sm="12" class="center">
          <CButton
            @click="addClientsToGroup()"
            color="info"
            class="float-end text-white"
          >
            <ion-icon name="people-outline"></ion-icon>&nbsp;
            {{ $t("Save") }}
          </CButton>
        </CCol>
      </CRow>
    </CModalBody>
  </CModal>
</template>

<script>
import countries from "@/store/countries";
import { debounce } from "@/utils/helper";

export default {
  name: "GroupInfo",
  components: { multiselect: window.VueBootstrapMultiselect },
  data: () => ({
    debounceFn: null,
    countries: [],
    clients: [],
    search: {
      country: "",
      gender: "",
      id_number: "",
    },
    loading: false,
    group: {},
    client: {},
    is_client_modal_visible: false,
    is_client_add_modal_visible: false,
    clientList: [],
    clientListLoading: false,
    queryClient: "",
    selectedClients: [],
  }),
  methods: {
    async addClientsToGroup() {
      this.selectedClients.map((client) => {
        this.group.clients.push(client);
        this.clients.push(client);
      });
      this.is_client_add_modal_visible = false;
    },
    removeClientFromGroup(index) {
      this.clients.splice(this.clients.indexOf(index), 1);
    },
    searchClients: async function (query, event) {
      if (
        (event.key == "Backspace" || event.key == "Delete") &&
        query.length <= 0
      ) {
        this.clientList = [];
        this.clientListLoading = false;
      } else {
        this.clientListLoading = true;
        await this.$axios
          .get("/clients", {
            params: { fullname: query, per_page: 10 },
          })
          .then((response) => {
            this.clientList = response.data.data.filter((client) => {
              return !this.group.clients
                .map((client) => client.id)
                .includes(client.id);
            });
            this.clientListLoading = false;
          });
      }
    },
    getClients: async function (reset = false) {
      this.loading = true;
      await this.$axios
        .get("/clients", {
          params: reset ? {group: this.group.id} : this.search,
        })
        .then((response) => {
          this.clients = response.data.data
          this.loading = false;
        });
    },
    filter: async function (value, event) {
      if (
        (event.key == "Backspace" || event.key == "Delete") &&
        value.length <= 2
      ) {
        await this.getClients(true);
      } else if (value.length > 2) {
        await this.debounceFn();
      }
    },
    viewDetails: async function (id) {
      await this.$axios.get(`/clients/${id}`).then((response) => {
        this.client = response.data;
        let country_index = this.countries.findIndex(
          (country) => country.id === this.client.country_id
        );
        this.client.country = this.countries[country_index].title;
        this.is_client_modal_visible = true;
      });
    },
  },
  mounted: async function () {
    this.debounceFn = debounce(() => this.getClients(), 500);
    countries.fetchCountries().then((countries) => {
      this.countries = countries;
    });

    await this.$axios
      .get(`/groups/${this.$decrypt(this.$route.params.id)}`)
      .then((response) => {
        this.group = response.data;
      });
  },
};
</script>
