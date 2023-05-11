<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <CCardTitle>{{ $t("Roles") }}</CCardTitle>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">{{
                  "Name"
                }}</CTableHeaderCell>
                <CTableHeaderCell scope="col">{{
                  "Actions"
                }}</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="role in roles" :key="role.id">
                <CTableDataCell>{{ role.name }}</CTableDataCell>
                <CTableDataCell :aria-colspan="2">
                  <button
                    class="btn btn-sm btn-info text-white mx-1"
                    :title="$t('View details')"
                    @click="viewDetails(role.id)"
                    v-if="$can('roles.view')"
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <router-link
                    :to="{
                      name: 'Update Role',
                      params: { id: this.$encrypt(role.id) },
                    }"
                    v-if="$can('roles.edit')"
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
                    @click="deleteRole(role.id)"
                    :title="$t('Delete')"
                    v-if="$can('roles.delete')"
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
    size="md"
    :visible="is_role_modal_visible"
    @close="is_role_modal_visible = false"
    class="modal-popup-detail"
    data-backdrop="static"
    data-keyboard="false"
  >
    <CModalHeader>
      <CModalTitle>{{ $t("Role Information") }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CRow>
        <CCol :md="12">
          <CTable class="table table-responsive">
            <CTableRow>
              <CTableHeaderCell>{{ "Name" }}</CTableHeaderCell>
              <CTableDataCell>{{ role.name }}</CTableDataCell>
            </CTableRow>
            <CTableRow class="mt-8" v-if="role.users.length">
              <CTableHeaderCell>{{ "Users" }}</CTableHeaderCell>
              <CTableRow v-for="user in role.users" :key="user">
                {{ user }}
              </CTableRow>
            </CTableRow>
          </CTable>
        </CCol>
      </CRow>
    </CModalBody>
  </CModal>
</template>

<script>
export default {
  name: "Roles",
  data: () => ({
    roles: [],
    loading: false,
    is_role_modal_visible: false,
    role: {}, // Currently shown role
  }),
  methods: {
    viewDetails: async function (id) {
      await this.$axios
        .get(`/roles/${id}`)
        .then((response) => (this.role = response.data));
      this.is_role_modal_visible = true;
    },
    deleteRole: async function (id) {
      await swal({
        title: this.$i18n.t("Are you sure?"),
        text: this.$i18n.t("Once deleted, you will not be able to recover!"),
        icon: "warning",
        buttons: [this.$i18n.t("Cancel"), this.$i18n.t("Confirm")],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios.delete(`/roles/${id}`).then(
            this.roles.splice(
              this.roles.findIndex((role) => role.id === id),
              1
            )
          );
          swal(this.$i18n.t("Role has been deleted!"), {
            icon: "success",
            timer: 3000,
          });
        }
      });
    },
  },
  mounted: async function () {
    this.loading = true;
    await this.$axios.get("/roles").then((response) => {
      this.roles = response.data;
      this.loading = false;
    });
  },
};
</script>
