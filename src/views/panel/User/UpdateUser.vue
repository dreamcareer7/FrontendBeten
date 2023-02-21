<template>
  <div class="card border-success mb-4">
    <div class="card-header">UpdateUser</div>

    <div id="ialert" class="" role="alert"></div>
    <form method="post">
      <div class="card-body">
        <div class="form-floating mb-1">
          <input
            type="text"
            class="form-control"
            id="iname"
            name="name"
            placeholder="Name"
            required
            autofocus
            autocomplete="off"
            v-model="user.name"
          />
          <label for="iname">Name</label>
          <div class="invalid-feedback"></div>
        </div>
        <div class="form-floating mb-1">
          <input
            type="text"
            class="form-control"
            id="uname"
            name="username"
            placeholder="Username"
            required
            autofocus
            autocomplete="off"
            v-model="user.username"
          />
          <label for="iname">Username</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="form-floating mb-1">
          <input
            type="email"
            class="form-control"
            id="iemail"
            name="email"
            placeholder="Email Address..."
            required
            autocomplete="off"
            v-model="user.email"
          />
          <label for="iemail">Email Address</label>
          <div class="invalid-feedback"></div>
        </div>
        <div class="form-floating mb-1">
          <input
            type="text"
            class="form-control"
            id="contact"
            name="contact"
            placeholder="contact"
            required
            autocomplete="off"
            v-model="user.contact"
          />
          <label for="iemail">Contact</label>
          <div class="invalid-feedback"></div>
        </div>

        <div class="row g-1 mb-1">
          <div class="col">
            <div class="form-floating mb-1">
              <input
                type="password"
                class="form-control"
                id="ipassword"
                name="password"
                placeholder="Password"
                autocomplete="new-password"
                aria-autocomplete="list"
                v-model="user.password"
              />
              <label for="ipassword">Password</label>
              <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-1">
              <input
                type="password"
                class="form-control"
                id="ipassword_confirmation"
                name="password_confirmation"
                placeholder="Confirm Password"
                autocomplete="new-password"
                aria-autocomplete="list"
                v-model="user.password_confirmation"
              />
              <label for="ipassword_confirmation">Confirm Password</label>
              <div class="invalid-feedback"></div>
            </div>

            <div class="border rounded px-1">
              <div class="form-check form-switch">
                <input type="hidden" value="0" name="is_active" />
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="1"
                  name="is_active"
                  checked
                  id="iis_active"
                  v-model="user.is_active"
                />
                <label class="form-check-label" for="iis_active"
                  >Is Active</label
                >
              </div>
            </div>
          </div>

          <div class="col">
            <label class="form-label roles-select-label">User Roles</label>
            <CFormSelect :html-size="roles_select_options.length + 1" multiple
              aria-label="Roles" v-model="user.roles"
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
        <button
          @click.prevent="updateInfo"
          class="btn btn-outline-success ajax"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'update_user',
  data() {
    return {
      message: '',
      success: false,
      user: {},
      form: {},
      user_id: null,
      roles_select_options: [],
    }
  },
  mounted() {
    this.user_id = this.$route.params.id
    this.fetchUserInfo(this.user_id)
  },
  methods: {
    updateInfo: async function () {
      await axios
        .post(`/users/update/` + this.user_id, this.user)
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
          this.success=  false

        })
    },
    deleteUser: async function () {
      await axios.delete(`/users/` + this.user_id).then((response) => {
        alert(response.data.message)
        this.getUsers()
      })
    },
    fetchUserInfo: async function (id) {
      await axios.get(`/users/info/` + id).then((response) => {
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
  },
}
</script>
