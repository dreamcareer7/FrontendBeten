<template>
  <form class="card border-success mb-4" @submit.prevent="create">
    <div class="card-header">Create Group</div>
    <div class="card-body">
      <div class="form-floating mb-3">
        <input
          id="title"
          class="form-control"
          type="text"
          v-model="group.title"
          autocomplete="off"
          required
          autofocus
        />
        <label for="title">Title</label>
      </div>

      <div class="form-floating mb-3">
        <select
          class="form-control"
          id="crew_member"
          v-model="group.crew_id"
          required
        >
          <template v-for="crew in crew_members" :key="crew.id">
            <option :value="crew.id">{{ crew.fullname }}</option>
          </template>
        </select>
        <label class="form-label" for="crew_member">Crew member</label>
      </div>
    </div>
    <CRow v-if="error_message">
      <CCol :md="12">
        <div class="error_style">
          {{ error_message }}
        </div>
      </CCol>
    </CRow>
    <div class="card-footer text-end">
      <button
        class="btn btn-success text-white"
        type="submit"
        :disabled="create_button_disabled"
      >
        <ion-icon name="create-outline"></ion-icon>&nbsp;Create
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'CreateGroup',
  data: () => ({
    error_message: '',
    group: {},
    crew_members: [],
  }),
  computed: {
    create_button_disabled() {
      return !this.group.title || !this.group.crew_id
    },
  },
  methods: {
    create: async function () {
      await this.$axios
        .post('/groups', this.group)
        .then(() => this.$router.push({ name: 'Groups' }))
        .catch(
          (error) =>
            (this.error_message =
              error.response?.data.message || error.message),
        )
    },
  },
  mounted: async function () {
    await this.$axios
      .get('/crews', { params: { per_page: 20 } })
      .then((response) => (this.crew_members = response.data.data))
  },
}
</script>
