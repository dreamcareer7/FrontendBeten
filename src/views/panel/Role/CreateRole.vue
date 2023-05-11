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
        <!-- <CAccordion>
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
                  :checked="role.permissions.find(permission => permission.id === permission_by_entity.id)"
                  @change="(event) => permissionChanged(event.target.checked, permission_by_entity)"
                />
              </div>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion> -->
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
  }),
  methods: {
    async create() {
      await this.$axios
        .post('/roles', this.role)
        .then(() => this.$router.push({ name: 'All roles' }))
        .catch((error) => {
          if (error.response) {
            this.error_message = error.response.data.message
          } else {
            this.error_message = error.message
          }
        })
    },
  },
}
</script>
