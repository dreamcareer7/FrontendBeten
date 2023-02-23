<template>
  <div class="card border-success mb-4">
    <div class="card-header">Create User</div>

    <div id="ialert" class="" role="alert"></div>
    <form method="post">
      <div class="card-body">
        <div class="form-floating mb-1">
          <input type="text" class="form-control" id="iname" name="name" placeholder="Name" required autofocus
            autocomplete="off" v-model="user.name" />
          <label for="iname">Name</label>
          <div class="invalid-feedback"></div>
        </div>
        <div class="form-floating mb-1">
          <input type="text" class="form-control" id="uname" name="username" placeholder="Username" required autofocus
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
                <input class="form-check-input" type="checkbox" value="1" name="is_active" checked id="iis_active"
                  v-model="user.is_active" />
                <label class="form-check-label" for="iis_active">Is Active</label>
              </div>
            </div>
          </div>

          <div class="col">
            <label class="form-label roles-select-label">User Roles</label>
            <CFormSelect :html-size="6" multiple aria-label="Roles" v-model="user.roles" :options="roles_select_options">
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
        <button @click.prevent="addUser" class="btn text-white btn-success">
          <span>Create user</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'create_user',
  data: () => ({
    message: '',
    success: false,
    user: {
      name: '',
      roles: [],
    },
    form: {},
    user_id: null,
    roles_select_options: [],
  }),
  methods: {
    async addUser() {
      await this.$axios
        .post(`/users/add`, this.user)
        .then((response) => {
          this.message = response.data.message
          if (response.data.success) {
            this.success = true
            this.user = {}
          }
          else {
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
  mounted() {
    this.$axios.get('/roles').then((response) => {
      // Populate the roles select element options
      this.roles_select_options = response.data.map((role) => {
        return {
          value: role,
          label: role,
        }
      })
    })
  },
}
</script>
