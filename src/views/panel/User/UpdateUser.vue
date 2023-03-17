<template>
  <form class="card border-warning" @submit.prevent="update">
    <div class="card-header">Update User</div>
    <div class="card-body">
      <div class="form-floating mb-2">
        <input
          type="text"
          class="form-control"
          id="name"
          autocomplete="off"
          v-model="user.name"
          autofocus
          required
        />
        <label for="name">Name</label>
      </div>
      <div class="form-floating mb-2">
        <input
          type="email"
          class="form-control"
          id="email"
          autocomplete="off"
          v-model="user.email"
          required
        />
        <label for="email">Email Address</label>
      </div>
      <div class="form-floating mb-2">
        <input
          type="text"
          class="form-control"
          id="contact"
          autocomplete="off"
          v-model="user.contact"
          required
        />
        <label for="iemail">Contact</label>
        <div class="invalid-feedback"></div>
      </div>
      <div class="row g-1 mb-2">
        <div class="col">
          <div class="form-floating mb-2">
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
          <div class="form-floating mb-2">
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
                id="is_active"
                :checked="user.is_active"
                v-model="user.is_active"
              />
              <label class="form-check-label" for="is_active">Active</label>
            </div>
          </div>
        </div>
        <div class="col">
          <label class="form-label roles-select-label">User Roles</label>
          <CFormSelect
            :html-size="roles.length + 1"
            multiple
            aria-label="Roles"
            v-model="user.roles"
            :options="roles"
          >
          </CFormSelect>
        </div>
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
      <button class="btn btn-warning text-white" @click.prevent="$router.go(-1)">
        Go Back
      </button>&nbsp;
      <button type="submit" class="btn btn-warning text-white">
        <ion-icon name="save-outline"></ion-icon>&nbsp;Save
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'UpdateUser',
  data: () => ({
    error_message: '',
    user: {},
    roles: [],
  }),
  methods: {
    update: async function () {
      await swal({
        title: 'Are you sure?',
        text: 'Click confirm to update, this action is irreversible',
        icon: 'warning',
        buttons: ['Cancel', 'Confirm'],
      }).then((willUpdate) => {
        if (willUpdate) {
          this.$axios
            .patch(`/users/${this.user.id}`, this.user)
            .then(() => {
              this.$router.push({ name: 'Users' })
              swal('Updated successfully!', {
                icon: 'success',
                timer: 3000,
              })
            })
            .catch((error) => {
              if (error.response) {
                this.message = error.response.data.message
              } else {
                this.message = error.message
              }
              this.success = false
            })
        }
      })
    },
  },
  mounted: async function () {
    await this.$axios
      .get(`/users/edit/${this.$decrypt(this.$route.params.id)}`)
      .then((response) => {
        this.user = response.data.user
        this.user.id = Number(this.$decrypt(this.$route.params.id))
        this.roles = response.data.roles
        // Populate the roles select element options
        this.roles = response.data.roles.map(
          (role) => {
            return {
              value: role.name,
              label: role.name,
              selected: this.user.roles.some(
                (user_role) => user_role.name === role.name,
              ),
            }
          },
        )
      })
  },
}
</script>
