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
                      v-model="form.email"
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
                  <div v-show="message" class="error_style">{{ message }}</div>
                  <CRow>
                    <CCol :xs="6">
                      <CButton @click="login" color="primary" class="px-4">
                        Login
                      </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <router-link
                        :to="{
                          name: 'reset_password'
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
                <div>
                </div>
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
import ColorTheme from '../../theme/ColorTheme'

export default {
  name: 'Login',
  components: { ColorTheme },
  data() {
    return {
      message:'',
      form: { email: '', password: '' },
    }
  },
  methods: {
    login: async function () {
      return await axios
        .post(`/login`, this.form)
        .then((response) => {
          if (response.data.success) {
            const token = response.data.token
            localStorage.setItem('betenAuthToken', token)
            this.$router.push('/dashboard')
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
