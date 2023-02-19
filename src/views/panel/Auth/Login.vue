<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      v-model="form.username"
                      autocomplete="username"
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
                    />
                  </CInputGroup>
                  <CRow>
                    {{ message }}
                  </CRow>
                  <CRow>
                    <CCol :xs="6">
                      <CButton @click="login" color="primary" class="px-4">
                        Login
                      </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
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
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div></div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      message: '',
      form: { username: '', password: '' },
    }
  },
  methods: {
    login: async function () {
      return await axios
        .post(`v2/sign_in`, this.form)
        .then((response) => {
          if (response.data.status) {
            const token = response.data.response
            localStorage.setItem('betenAuthToken', token)
            this.$router.push({ name: 'Dashboard' })
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
