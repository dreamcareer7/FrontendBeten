<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center login_bg">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1 class="text-center">Login</h1>
                  <p class="text-medium-emphasis text-center">
                    Sign In to your account
                  </p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      v-model="form.email"
                      autocomplete="email"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      v-model="form.password"
                      placeholder="Password"
                      autocomplete="current-password"
                      @keyup.enter="login"
                    />
                  </CInputGroup>
                  <div v-show="message" class="error_style">{{ message }}</div>
                  <CRow>
                    <CCol :xs="8">
                      <CButton @click="login" color="primary" class="px-4">
                        Login
                      </CButton>
                    </CCol>
                    <CCol :xs="4" class="text-right">
                      <router-link
                        :to="{
                          name: 'reset_password',
                        }"
                      >
                        <CButton color="link" class="px-0">
                          Forgot password?
                        </CButton>
                      </router-link>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import ColorTheme from '../../theme/ColorTheme'

export default {
  name: 'Login',
  components: { ColorTheme },
  data: () => ({
    message: '',
    form: { email: '', password: '' },
  }),
  methods: {
    login: async function () {
      return await this.$axios
        .post(`/login`, this.form)
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem('betenAuthToken', response.data.token)
            this.$router.push({
              name: 'Dashboard',
            })
          } else {
            this.message = response.data.message
          }
        })
        .catch((error) => {
          if (error.response) {
            this.message = error.response.data.message
          } else {
            this.message = error
          }
        })
    },
  },
}
</script>

<style scoped>
div.login_bg {
  background-image: url('/src/assets/images/login_bg.jpeg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>
