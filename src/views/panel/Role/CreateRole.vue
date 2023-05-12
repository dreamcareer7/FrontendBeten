<template>
  <div class="card border-success mb-4">
    <div class="card-header">{{ $t('Create Role') }}</div>
    <form @submit.prevent="create">
      <div class="card-body">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="name"
            required
            autocomplete="off"
            v-model="role.name"
          />
          <label for="name">{{ $t('Name') }}</label>
        </div>

      <div class="form-floating mb-3">
        <CTableRow class="form-control">
          <CTableHeaderCell>{{ $t("Permissions") }}</CTableHeaderCell>
        </CTableRow>
        <CAccordion>
          <CAccordionItem v-for="entity in entities">
            <CAccordionHeader>
              {{ $t(entity) }}
            </CAccordionHeader>
            <CAccordionBody>
              <div class="d-flex flex-wrap">
                <CFormCheck 
                  v-for="permission_by_entity in permissions_by_entity[entity]"
                  class="permission-item"
                  :id="`permission_${permission_by_entity.id}`"
                  :label="permission_by_entity.name.split('.').map(item => $t(item)).join('.')"
                  @change="(event) => permissionChanged(event.target.checked, permission_by_entity)"
                />
              </div>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </div>

        <CRow v-if="error_message">
          <CCol :md="12">
            <div class="error_style">
              {{ $t(error_message) }}
            </div>
          </CCol>
        </CRow>
      </div>

      <div class="card-footer text-end">
        <button type="submit" class="btn btn-outline-success">{{ $t('Save') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateRole',
  data: () => ({
    error_message: '',
    role: {},
    entities: [],
    permissions_by_entity: {},
    checked_permissions: [],
  }),
  methods: {
    async create() {
      await this.$axios
        .post('/roles', {
          name: this.role.name,
          permissions: this.checked_permissions,
        })
        .then(() => this.$router.push({ name: 'All roles' }))
        .catch((error) => {
          if (error.response) {
            this.error_message = error.response.data.message
          } else {
            this.error_message = error.message
          }
        })
    },
    permissionChanged: function (checked, permission) {
      if (checked)
        this.checked_permissions.push(permission.id);
      else {
        const index = this.checked_permissions.indexOf(permission.id);
        this.checked_permissions.splice(index, 1);
      }
    },
  },
  async mounted() {
    await this.$axios
      .get('/roles/permissions/all')
      .then((response) => (this.role = response.data));
    let entities = this.role.permissions.map(element => element.name.split(".")[0]);
    entities = new Set(entities);
    this.entities = entities;
    entities.forEach(entity => {
      this.permissions_by_entity[entity] = this.role.permissions.filter(item => item.name.startsWith(entity));
    });
  },
}
</script>

<style scoped>
.permission-item {
  margin-left: 20px;
  min-width: 250px;
}
*[dir=rtl] .accordion-item >>> .accordion-button::after {
  margin-left: 0 !important;
  margin-right: auto !important;
}
</style>
