<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
          <CCardTitle>{{ $t("Professions") }}</CCardTitle>
          <router-link
            :to="{ name: 'Create Profession' }"
            v-if="$can('professions.create')"
          >
            <CButton color="success" class="float-end text-white">
              <ion-icon name="person-add-outline"></ion-icon>&nbsp;
              {{ $t("Create Profession") }}
            </CButton>
          </router-link>
        </CCardHeader>
        <CCardBody>
          <hr />
          <CRow v-if="loading" class="mt-4">
            <CCol :md="12" class="text-center">
              <div class="spinner-border text-success" role="status"></div>
            </CCol>
            <CCol :md="12" class="text-center">
              <span class="sr-only">{{ $t("Loading...") }}</span>
            </CCol>
          </CRow>
          <!-- No results -->
          <CRow v-if="professions.length === 0 && !loading" class="mt-4">
            <CCol :md="12" class="text-center">
              <span class="sr-only">{{ $t("No results") }}</span>
            </CCol>
          </CRow>
          <!-- End no results -->
          <CTable
            v-if="!loading && professions.length > 0"
            responsive
            hover
            align="middle"
          >
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">{{
                    $t("Title")
                  }}</CTableHeaderCell>
                <CTableHeaderCell scope="col">{{
                    $t("Actions")
                  }}</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="profession in professions" :key="profession.id">
                <CTableDataCell>{{ profession.title }}</CTableDataCell>
                <CTableDataCell :aria-colspan="2">
                  <button
                    class="btn btn-sm btn-info text-white mx-1"
                    :title="$t('View details')"
                    @click="viewDetails(profession.id)"
                    v-if="$can('professions.view')"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <router-link
                    :to="{
                      name: 'Update Profession',
                      params: { id: this.$encrypt(profession.id) },
                    }"
                    v-if="$can('professions.edit')"
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
                    class="btn btn-sm btn-danger text-white m-1"
                    @click="deleteProfession(profession.id)"
                    :title="$t('Delete')"
                    v-if="$can('profession.delete')"
                  >
                    <ion-icon name="trash-bin-outline"></ion-icon>
                  </button>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <CRow>
            <CCol :md="12" class="text-center">
              <nav :aria-label="$t('Professions navigation')">
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
    size="md"
    :visible="is_model_visible"
    @close="is_model_visible = false"
    class="modal-popup-detail"
    data-backdrop="static"
    data-keyboard="false"
  >
    <CModalHeader>
      <CModalTitle>{{ $t("Profession Information") }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CTable class="table table-responsive">
        <CTableRow>
          <CTableHeaderCell>{{ $t("Title") }}</CTableHeaderCell>
           <CTableDataCell>{{ profession.title }}</CTableDataCell>
        </CTableRow>
      </CTable>
    </CModalBody>
  </CModal>


</template>

<script>
import {debounce} from "@/utils/helper";

export default {
  name: "Professions",
  components: {

  },
  data: () => ({
    debounceFn: null,
    professions: [],
    search: {},
    profession: {},
    pagination: [],
    loading: false,
    is_model_visible: false
  }),
  methods: {
    getProfessions: async function (reset = false) {
      this.loading = true;

      const params = reset ? {} : {...this.search};

      await this.$axios
        .get("/professions", {
          params,
        })
        .then((response) => {
          this.professions = response.data.data;
          this.pagination = response.data.links;
          this.loading = false;
        });
    },
    filter: async function (value, event) {
      if (
        (event.key == "Backspace" || event.key == "Delete") &&
        value.length <= 2
      ) {
        await this.getProfessions(true);
      } else if (value && value.length > 2) {
        await this.debounceFn();
      }
    },
    gotoPage: async function (url) {
      this.loading = true;
      await this.$axios
        .get(url, {
          params: {...this.search},
        })
        .then((response) => {
          this.professions = response.data.data;
          this.pagination = response.data.links;
        });
      this.loading = false;
    },
    deleteProfession: async function (id) {
      await swal({
        title: this.$i18n.t("Are you sure?"),
        text: this.$i18n.t("Once deleted, you will not be able to recover!"),
        icon: "warning",
        buttons: [this.$i18n.t("Cancel"), this.$i18n.t("Confirm")],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.delete(`/professions/${id}`).then(() => {
            // Remove the city from the list
            this.professions.splice(
              this.professions.findIndex((evaluation) => evaluation.id === id),
              1
            );
            swal(this.$i18n.t("The profession has been deleted!"), {
              icon: "success",
              timer: 3000,
            });
          });
        }
      });
    },
    viewDetails: async function (id) {
      await this.$axios.get(`/professions/${id}`).then((response) => {
        this.profession = response.data;
        this.is_model_visible = true;
      });
    },
  },
  mounted: async function () {
    this.getProfessions();
    this.debounceFn = debounce(() => this.getProfessions(), 500);
  },
}
</script>

<style scoped>
.page-item {
  cursor: pointer;
}
a.disabled {
  pointer-events: none;
  cursor: default;
}
</style>
