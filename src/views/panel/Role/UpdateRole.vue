<template>
  <div class="card border-warning mb-4">
    <div class="card-header">Update Role</div>
    <form @submit.prevent="update">
      <div class="card-body">
        <div class="form-floating mb-3">
          <CTableRow class="form-control">
            <CTableHeaderCell>{{ role.name }}</CTableHeaderCell>
          </CTableRow>
        </div>

        <div class="form-floating mb-3">
          <CAccordion>
            <CAccordionItem>
              <CAccordionHeader>
                Permissions
              </CAccordionHeader>
              <CAccordionBody>
                <div class="d-flex flex-wrap">
                  <CFormCheck 
                    v-for="a_permission in role.available_permissions"
                    class="permission-item"
                    :id="a_permission.id"
                    :label="a_permission.name"
                    :checked="role.permissions.find(permission => permission.id === a_permission.id)"
                    @change="(event) => permissionChanged(event.target.checked, a_permission)"
                  />
                </div>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </div>

        <CRow v-if="error_message">
          <CCol :md="12">
            <div class="error_style">
              {{ error_message }}
            </div>
          </CCol>
        </CRow>
      </div>

      <div class="card-footer text-end">
        <button
          class="btn btn-secondary text-white"
          @click.prevent="$router.go(-1)"
        >
          Go back</button
        >&nbsp;
        <button type="submit" class="btn btn-warning text-white">
          Save
          <ion-icon name="save"></ion-icon>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UpdateRole',
  data: () => ({
    role: {},
    permissions: [],
    error_message: '',
  }),
  methods: {
    update: async function () {
      await swal({
        title: this.$i18n.t('Are you sure?'),
        text: this.$i18n.t('Click confirm to update, this action is irreversible'),
        icon: 'warning',
        buttons: [this.$i18n.t('Cancel'), this.$i18n.t('Confirm')],
      }).then((willUpdate) => {
        if (willUpdate) {
          this.$axios
            .patch(`/roles/${this.role.id}`, { permissions: this.permissions })
            .then(() => {
              this.$router.push({ name: 'All roles' })
              swal(this.$i18n.t('Updated successfully!'), {
                icon: 'success',
                timer: 3000,
              })
            })
            .catch((error) => {
              if (error.response) {
                this.error_message = error.response.data.message
              } else {
                this.error_message = error.message
              }
            })
        }
      })
    },
    permissionChanged: function (checked, permission) {
      if (checked)
        this.permissions.push(permission.id);
      else {
        const index = this.permissions.indexOf(permission.id);
        this.permissions.splice(index, 1);
      }
    },
  },
  async mounted() {
    await this.$axios
      .get(`/roles/${this.$decrypt(this.$route.params.id)}/edit`)
      .then((response) => (this.role = response.data))
    this.permissions = this.role.permissions.map(permission => permission.id);
  },
}
</script>

<style scoped>
.permission-item {
  margin-left: 20px;
}
</style>
