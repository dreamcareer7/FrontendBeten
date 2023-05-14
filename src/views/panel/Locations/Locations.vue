<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
          <CCardTitle>{{ $t("Locations") }}</CCardTitle>
          <router-link
            :to="{ name: 'Create Location' }"
            v-if="$can('cities.create')"
          >
            <CButton color="success" class="float-end text-white">
              <ion-icon name="person-add-outline"></ion-icon>&nbsp;
              {{ $t("Create location") }}
            </CButton>
          </router-link>
        </CCardHeader>
        <CCardBody>
          <!-- Search filters -->
          <CRow>
            <CCol md="4" sm="4" lg="3">
              <input
                type="text"
                class="form-control mb-3"
                v-model="search.title"
                :placeholder="$t('Name...')"
                @keyup="filter(search.title, $event)"
                autofocus
              />
            </CCol>
          </CRow>
          <!-- End search filters -->
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
          <CRow v-if="cities.length === 0 && !loading" class="mt-4">
            <CCol :md="12" class="text-center">
              <span class="sr-only">{{ $t("No results") }}</span>
            </CCol>
          </CRow>
          <!-- End no results -->
          <CTable
            v-if="!loading && cities.length > 0"
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
                    $t("Location Url")
                  }}</CTableHeaderCell>
                <CTableHeaderCell scope="col">{{
                    $t("Actions")
                  }}</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="city in cities" :key="city.id">
                <CTableDataCell>{{ city.title }}</CTableDataCell>
                <CTableDataCell v-html="getLocationUrl(city)"></CTableDataCell>
                <CTableDataCell :aria-colspan="2">
                  <router-link
                    :to="{
                      name: 'Update Location',
                      params: { id: this.$encrypt(city.id) },
                    }"
                    v-if="$can('cities.edit')"
                    :title="$t('Edit')"
                  >
                    <CButton
                      class="btn btn-sm btn-warning text-white m-1"
                      :xl="0"
                    >
                      <ion-icon name="create-outline"></ion-icon>
                    </CButton>
                  </router-link>
                  <button
                    class="btn btn-sm btn-danger text-white m-1"
                    @click="deleteCity(city.id)"
                    :title="$t('Delete')"
                    v-if="$can('cities.delete')"
                  >
                    <ion-icon name="trash-bin-outline"></ion-icon>
                  </button>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <CRow>
            <CCol :md="12" class="text-center">
              <nav :aria-label="$t('Locations navigation')">
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


</template>

<script>
import {debounce} from "@/utils/helper";

export default {
name: "Locations",
  data: () => ({
    debounceFn: null,
    cities: [],
    search: {},
    city: {},
    pagination: [],
    loading: false
  }),
  methods: {
    getCities: async function (reset = false) {
      this.loading = true;

      const params = reset ? {withPaging: 1} : {...this.search, withPaging: 1};

      await this.$axios
        .get("/cities", {
          params,
        })
        .then((response) => {
          this.cities = response.data.data;
          this.pagination = response.data.links;
          this.loading = false;
        });
    },
    filter: async function (value, event) {
      if (
        (event.key == "Backspace" || event.key == "Delete") &&
        value.length <= 2
      ) {
        await this.getCities(true);
      } else if (value && value.length > 2) {
        await this.debounceFn();
      }
    },
    gotoPage: async function (url) {
      this.loading = true;
      await this.$axios
        .get(url, {
          params: {...this.search, withPaging: 1},
        })
        .then((response) => {
          this.cities = response.data.data;
          this.pagination = response.data.links;
        });
      this.loading = false;
    },
    deleteCity: async function (id) {
      await swal({
        title: this.$i18n.t("Are you sure?"),
        text: this.$i18n.t("Once deleted, you will not be able to recover!"),
        icon: "warning",
        buttons: [this.$i18n.t("Cancel"), this.$i18n.t("Confirm")],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.delete(`/cities/${id}`).then(() => {
            // Remove the city from the list
            this.cities.splice(
              this.cities.findIndex((city) => city.id === id),
              1
            );
            swal(this.$i18n.t("The location has been deleted!"), {
              icon: "success",
              timer: 3000,
            });
          });
        }
      });
    },
    getLocationUrl(city) {
      return city.location_url? (city.location_url.length >100 ? `<a href="${city.location_url}" target="_blank">${city.location_url.substring(0, 100)+'...'}</a>` : `<a href="${city.location_url}" target="_blank">${city.location_url}</a>`) : ''
    }
  },
  mounted: async function () {
    this.getCities();
    this.debounceFn = debounce(() => this.getCities(), 500);
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
