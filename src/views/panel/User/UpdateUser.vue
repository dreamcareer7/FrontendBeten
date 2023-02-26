<template>
  <div class="card border-warning mb-4">
    <div class="card-header">Update User</div>
    <form method="post">
      <div class="card-body">
        <div class="form-floating mb-1">
          <input type="text" class="form-control" id="iname" name="name" placeholder="Name" required autofocus
            autocomplete="off" v-model="user.name" />
          <label for="iname">Name</label>
          <div class="invalid-feedback"></div>
        </div>
        <div class="form-floating mb-1">
          <input type="text" class="form-control" id="uname" name="username" placeholder="Username" required
            autocomplete="off" v-model="user.username" />
          <label for="iname">Username</label>
          <div class="invalid-feedback"></div>
        </div>
        <div class="form-floating mb-1">
          <input type="email" class="form-control" id="iemail" name="email" placeholder="Email Address..." required
            autocomplete="off" v-model="user.email" />
          <label for="iemail">Email Address</label>
          <div class="invalid-feedback"></div>
        </div>
        <div class="form-floating mb-1">
          <input type="text" class="form-control" id="contact" name="contact" placeholder="contact" required
            autocomplete="off" v-model="user.contact" />
          <label for="iemail">Contact</label>
          <div class="invalid-feedback"></div>
        </div>
        <div class="row g-1 mb-1">
          <div class="col">
            <div class="form-floating mb-1">
              <input type="password" class="form-control" id="ipassword" name="password" placeholder="Password"
                autocomplete="new-password" aria-autocomplete="list" v-model="user.password" />
              <label for="ipassword">Password</label>
              <div class="invalid-feedback"></div>
            </div>
            <div class="form-floating mb-1">
              <input type="password" class="form-control" id="ipassword_confirmation" name="password_confirmation"
                placeholder="Confirm Password" autocomplete="new-password" aria-autocomplete="list"
                v-model="user.password_confirmation" />
              <label for="ipassword_confirmation">Confirm Password</label>
              <div class="invalid-feedback"></div>
            </div>
            <div class="border rounded px-1">
              <div class="form-check form-switch">
                <input type="hidden" value="0" name="is_active" />
                <input class="form-check-input" type="checkbox" name="is_active" id="iis_active"
                  :checked="Boolean(user.is_active)" v-model="user.is_active" />
                <label class="form-check-label" for="iis_active">Is Active</label>
              </div>
            </div>
          </div>
          <div class="col">
            <label class="form-label roles-select-label">User Roles</label>
            <CFormSelect :html-size="roles_select_options.length + 1" multiple aria-label="Roles" v-model="user.roles"
              :options="roles_select_options">
            </CFormSelect>
          </div>
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
      <div class="card-footer text-end">
        <button @click.prevent="updateInfo" class="btn btn-success ajax text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="button-icon" viewBox="0 0 24 24">
            <path d="M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z" />
          </svg>
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'update_user',
  data: () => ({
    message: '',
    success: false,
    user: {},
    roles_select_options: [],
  }),
  methods: {
    updateInfo: async function () {
      await this.$axios
        .post(`/users/update/${this.$decrypt(this.$route.params.id)}`, this.user)
        .then((response) => {
          this.message = response.data.message
          if (response.data.success) {
            this.success = true
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
    await this.$axios.get(`/users/info/${this.$decrypt(this.$route.params.id)}`)
      .then((response) => {
        this.user = response.data.data
        this.user.roles = response.data.data.roles.map((role) => role.name)
        // Populate the roles select element options
        this.roles_select_options = response.data.available_roles.map((role) => {
          return {
            value: role.name,
            label: role.name,
            selected: this.user.roles.some(user_role => user_role.name === role.name)
          }
        })
      })
  },
}
</script>
