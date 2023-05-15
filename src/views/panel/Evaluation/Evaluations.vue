<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
          <CCardTitle>{{ $t("Evaluations") }}</CCardTitle>
          <router-link
            :to="{ name: 'Create Evaluation' }"
            v-if="$can('evaluations.create')"
          >
            <CButton color="success" class="float-end text-white">
              <ion-icon name="person-add-outline"></ion-icon>&nbsp;
              {{ $t("Create Evaluation") }}
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
          <CRow v-if="evaluations.length === 0 && !loading" class="mt-4">
            <CCol :md="12" class="text-center">
              <span class="sr-only">{{ $t("No results") }}</span>
            </CCol>
          </CRow>
          <!-- End no results -->
          <CTable
            v-if="!loading && evaluations.length > 0"
            responsive
            hover
            align="middle"
          >
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">{{
                    $t("To Model Provider Type")
                  }}</CTableHeaderCell>
                <CTableHeaderCell scope="col">{{
                    $t("To Model Provider ID")
                  }}</CTableHeaderCell>
                <CTableHeaderCell scope="col">{{
                    $t("Vote")
                  }}</CTableHeaderCell>
                <CTableHeaderCell scope="col">{{
                    $t("Actions")
                  }}</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="evaluation in evaluations" :key="evaluation.id">
                <CTableDataCell>{{ evaluation.provider_model_type }}</CTableDataCell>
                <CTableDataCell>{{ evaluation.provider_model_id }}</CTableDataCell>
                <CTableDataCell>{{ evaluation.vote }}</CTableDataCell>
                <CTableDataCell :aria-colspan="2">
                  <button
                    class="btn btn-sm btn-info text-white mx-1"
                    :title="$t('View details')"
                    @click="viewDetails(evaluation.id)"
                    v-if="$can('evaluations.view')"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <button
                    class="btn btn-sm btn-danger text-white m-1"
                    @click="deleteEvaluation(evaluation.id)"
                    :title="$t('Delete')"
                    v-if="$can('evaluation.delete')"
                  >
                    <ion-icon name="trash-bin-outline"></ion-icon>
                  </button>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <CRow>
            <CCol :md="12" class="text-center">
              <nav :aria-label="$t('Evaluations navigation')">
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
      <CModalTitle>{{ $t("Evaluation Information") }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CTable class="table table-responsive">
        <CTableRow>
          <CTableHeaderCell>{{ $t("Vote") }}</CTableHeaderCell>
<!--          <CTableDataCell>{{ evaluation.vote }}</CTableDataCell>-->
          <CTableDataCell>
            <star-rating :rating="evaluation.vote" :increment="0.5" :max-rating="5" :read-only="true" star-size="20"	 />
          </CTableDataCell>
        </CTableRow>
        <CTableRow v-if="evaluation.note">
          <CTableHeaderCell>{{ $t("Notes") }}</CTableHeaderCell>
          <CTableDataCell>{{ evaluation.note }}</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell>{{ $t("To Model Provider Type") }}</CTableHeaderCell>
          <CTableDataCell>{{ evaluation.provider_model_type }}</CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell>{{ $t("To Model Provider ID") }}</CTableHeaderCell>
          <CTableDataCell>{{ evaluation.provider_model_id }}</CTableDataCell>
        </CTableRow>
      </CTable>
    </CModalBody>
  </CModal>


</template>

<script>
import StarRating from 'vue-star-rating'
import {debounce} from "@/utils/helper";

export default {
  name: "Locations",
  components: {
    StarRating
  },
  data: () => ({
    debounceFn: null,
    evaluations: [],
    search: {},
    evaluation: {},
    pagination: [],
    loading: false,
    is_model_visible: false
  }),
  methods: {
    getEvaluations: async function (reset = false) {
      this.loading = true;

      const params = reset ? {} : {...this.search};

      await this.$axios
        .get("/evaluations", {
          params,
        })
        .then((response) => {
          this.evaluations = response.data.data;
          this.pagination = response.data.links;
          this.loading = false;
        });
    },
    filter: async function (value, event) {
      if (
        (event.key == "Backspace" || event.key == "Delete") &&
        value.length <= 2
      ) {
        await this.getEvaluations(true);
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
          this.evaluations = response.data.data;
          this.pagination = response.data.links;
        });
      this.loading = false;
    },
    deleteEvaluation: async function (id) {
      await swal({
        title: this.$i18n.t("Are you sure?"),
        text: this.$i18n.t("Once deleted, you will not be able to recover!"),
        icon: "warning",
        buttons: [this.$i18n.t("Cancel"), this.$i18n.t("Confirm")],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.delete(`/evaluations/${id}`).then(() => {
            // Remove the city from the list
            this.evaluations.splice(
              this.evaluations.findIndex((evaluation) => evaluation.id === id),
              1
            );
            swal(this.$i18n.t("The evaluation has been deleted!"), {
              icon: "success",
              timer: 3000,
            });
          });
        }
      });
    },
    viewDetails: async function (id) {
      await this.$axios.get(`/evaluations/${id}`).then((response) => {
        this.evaluation = response.data;
        this.is_model_visible = true;
      });
    },
  },
  mounted: async function () {
    this.getEvaluations();
    this.debounceFn = debounce(() => this.getEvaluations(), 500);
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
