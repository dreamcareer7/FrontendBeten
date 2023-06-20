<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
          <CCardTitle>{{ $t("Service Center") }}</CCardTitle>
          <router-link
            :to="{ name: 'Create service center' }"
            v-if="$can('services-center.create')"
          >
            <CButton color="success" class="float-end text-white">
              <ion-icon name="create-outline"></ion-icon>&nbsp;
              {{ $t("Create service center") }}
            </CButton>
          </router-link>
        </CCardHeader>
        <CCardBody>
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">{{
                    $t("Id")
                  }}</CTableHeaderCell>
                <CTableHeaderCell scope="col">{{
                  $t("Title")
                }}</CTableHeaderCell>
                <CTableHeaderCell scope="col">{{
                  $t("Phone")
                }}</CTableHeaderCell>
<!--                <CTableHeaderCell scope="col">{{
                  $t("Location")
                }}</CTableHeaderCell>-->
                <CTableHeaderCell scope="col">{{
                  $t("Group")
                }}</CTableHeaderCell>
                <CTableHeaderCell scope="col">{{
                    $t("Max Client Count")
                  }}</CTableHeaderCell>
                <CTableHeaderCell scope="col">{{
                    $t("Admin Name")
                  }}</CTableHeaderCell>
                <CTableHeaderCell scope="col">{{
                    $t("Admin Phone")
                  }}</CTableHeaderCell>
                <CTableHeaderCell scope="col">{{
                  $t("Actions")
                }}</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="service in services" :key="service.id">
                <CTableDataCell>{{ service.id }}</CTableDataCell>
                <CTableDataCell>{{ service.title }}</CTableDataCell>
                <CTableDataCell>{{ service.phone }}</CTableDataCell>
<!--                <CTableDataCell>{{ service.location }}</CTableDataCell>-->
                <CTableDataCell>{{ service.group }}</CTableDataCell>
                <CTableDataCell>{{ service.maxClientCount }}</CTableDataCell>
                <CTableDataCell>{{ service.user.name }}</CTableDataCell>
                <CTableDataCell>{{ service.user.contact }}</CTableDataCell>
                <CTableDataCell :aria-colspan="2">
                  <button
                    class="btn btn-sm btn-info text-white"
                    @click.stop="fetchServiceInfo(service.id)"
                    v-if="$can('services-center.view')"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <router-link
                    :to="{
                      name: 'Update service center',
                      params: { id: this.$encrypt(service.id) },
                    }"
                    v-if="$can('services-center.edit')"
                  >
                    <CButton
                      class="btn btn-sm btn-warning text-white m-1"
                      :xl="0"
                      :title="$t('Edit')"
                    >
                      <ion-icon name="create-outline"></ion-icon>
                    </CButton>
                  </router-link>
<!--                  <button
                    class="btn btn-sm btn-danger text-white"
                    @click.stop="deleteService(service.id)"
                    :title="$t('Delete')"
                    v-if="$can('services.delete')"
                  >
                    <ion-icon name="trash-bin-outline"></ion-icon>
                  </button>-->
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>

          <CRow>
            <CCol :md="12" class="text-center">
              <nav aria-label="Services navigation">
                <ul class="pagination">
                  <li
                    class="page-item"
                    :class="{ active: page.active }"
                    v-for="page in pagination"
                    :key="page"
                  >
                    <a
                      @click.prevent="gotoPage(page.url)"
                      class="page-link"
                      v-html="page.label"
                      :class="{ disabled: !page.url }"
                    ></a>
                  </li>
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
    :visible="showServiceDetailModal"
    @close="showServiceDetailModal = false"
    class="modal-popup-detail"
    data-backdrop="static"
    data-keyboard="false"
  >
    <CModalHeader>
      <CModalTitle>Service Center Information</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CRow>
        <CCol :md="12">
          <CTable class="table table-responsive">
            <CTableRow>
              <CTableHeaderCell>Id</CTableHeaderCell>
              <CTableDataCell>{{
                  service.id
              }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Title</CTableHeaderCell>
              <CTableDataCell>{{ service.title }}</CTableDataCell>
              <CTableHeaderCell>Phone:</CTableHeaderCell>
              <CTableDataCell>{{ service.phone }}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>Group:</CTableHeaderCell>
              <CTableDataCell>{{ service.group }}</CTableDataCell>
              <CTableHeaderCell>Max Client Count:</CTableHeaderCell>
              <CTableDataCell>{{ service.maxClientCount }}</CTableDataCell>
            </CTableRow>
          </CTable>
        </CCol>
      </CRow>
      <Concurrable
        v-if="service.is_concurrable"
        type="service"
        :id="service.id"
      />
    </CModalBody>
  </CModal>
</template>

<script>
import cities from "@/store/cities";

export default {
  name: "Services",
  data: () => ({
    services: [],
    current_page: 1,
    pagination: {},
    last_page: 99,
    showServiceDetailModal: false,
    service: {},
    cities: [],
  }),
  methods: {
    deleteService: async function (id) {
      await swal({
        title: this.$i18n.t("Are you sure?"),
        text: this.$i18n.t("Once deleted, you will not be able to recover!"),
        icon: "warning",
        buttons: [this.$i18n.t("Cancel"), this.$i18n.t("Confirm")],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.delete(`/services/${id}`).then(() => {
            this.services.splice(
              this.services.findIndex((service) => service.id === id),
              1
            );
          });
          swal(this.$i18n.t("Service has been deleted!"), {
            icon: "success",
            timer: 3000,
          });
        }
      });
    },
    gotoPage: async function (url) {
      await this.$axios.get(url).then((response) => {
        this.services = response.data.data;
        this.current_page = response.data.current_page;
        this.last_page = response.data.last_page;
        this.pagination = response.data.links;
      });
    },
    fetchServiceInfo: async function (id) {
      await this.$axios.get(`/service-center/${id}`).then((response) => {
        this.service = response.data.data;
        this.showServiceDetailModal = true;
      });
    },
    displayCity(city) {
      return city ? city?.location_url ? `<a href="${city?.location_url}" target="_blank">${city?.title}</a>` : city?.title : '';
    }
  },
  async mounted() {
    await this.$axios.get("/service-center").then((response) => {

      this.services = response.data.data;
      this.current_page = response.data.current_page;
      this.last_page = response.data.last_page;
      this.pagination = response.data.links;
      console.log('dddd',this.services)
    });
    /*cities.fetchCities().then((cities) => {
      this.cities = cities;
    });*/
  },
};
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
