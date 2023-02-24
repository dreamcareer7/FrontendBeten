<template>
  <div class="card border-success mb-4">
    <div class="card-header">Create User</div>
    <form @submit.prevent="addUser">
      <div class="card-body">
        <div class="form-floating mb-2">
          <select
            class="form-select"
            id="crew_member"
            v-model="user.crew_member_id"
          >
            <option
              v-for="crew_member in crew_members"
              :value="crew_member.id"
              :key="crew_member.id"
            >{{ crew_member.fullname }}</option>
          </select>
          <label for="crew_member">Crew member</label>
        </div>
        <div class="form-floating mb-2">
          <input
            type="text"
            class="form-control"
            id="name"
            required
            autofocus
            autocomplete="off"
            v-model="user.name"
          />
          <label for="name">Name</label>
        </div>
        <div class="form-floating mb-2">
          <input
            type="text"
            class="form-control"
            id="username"
            required
            autocomplete="off"
            v-model="user.username"
          />
          <label for="username">Username</label>
        </div>

        <div class="form-floating mb-2">
          <input
            type="email"
            class="form-control"
            id="email"
            required
            autocomplete="off"
            v-model="user.email"
          />
          <label for="email">Email Address</label>
        </div>
        <div class="form-floating mb-2">
          <input
            type="text"
            class="form-control"
            id="contact"
            required
            autocomplete="off"
            v-model="user.contact"
          />
          <label for="contact">Contact</label>
        </div>

        <div class="row g-1 mb-2">
          <div class="col">
            <div class="form-floating mb-2">
              <input
                type="password"
                class="form-control"
                id="password"
                autocomplete="new-password"
                aria-autocomplete="list"
                v-model="user.password"
              />
              <label for="password">Password</label>
            </div>

            <div class="form-floating mb-2">
              <input
                type="password"
                class="form-control"
                id="password_confirmation"
                v-model="user.password_confirmation"
              />
              <label for="password_confirmation">Confirm Password</label>
            </div>

            <div class="border rounded px-1">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="1"
                  checked
                  id="is_active"
                  v-model="user.is_active"
                />
                <label class="form-check-label" for="is_active"
                  >is active?</label
                >
              </div>
            </div>
          </div>

          <div class="col">
            <label class="form-label roles-select-label">User Roles</label>
            <CFormSelect
              :html-size="6"
              multiple
              aria-label="Roles"
              v-model="user.roles"
              :options="roles_select_options"
            >
            </CFormSelect>
          </div>
        </div>
        <CRow>
          <CCol :md="12">
            <div v-show="message && !success" class="error_style">
              {{ message }}
            </div>
            <div v-show="message && success" class="alert alert-success">
              {{ message }}
            </div>
          </CCol>
        </CRow>
      </div>

      <div class="card-footer text-end">
        <button type="submit" class="btn text-white btn-success">
          <span>Create user</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateUser',
  data: () => ({
    message: '',
    success: false,
    user: {},
    roles_select_options: [],
    crew_members: [],
  }),
  methods: {
    async addUser() {
      await this.$axios
        .post('/users/add', this.user)
        .then((response) => {
          this.message = response.data.message
          if (response.data.success) {
            this.success = true
            this.user = {}
          } else {
            this.success = false
          }
        })
        .catch((error) => {
          if (error.response) {
            this.message = error.response.data.message
          } else {
            this.message = error.message
          }
          this.success = false
        })
    },
  },
  async mounted() {
    await this.$axios
      .get('/populate-create-user-dropdowns')
      .then((response) => {
        // Populate the roles select element options
        this.roles_select_options = response.data.roles.map((role) => {
          return {
            value: role,
            label: role,
          }
        })
        // Populate the crew member select element options
        this.crew_members = response.data.crew_members
      })
  },
}
</script>
