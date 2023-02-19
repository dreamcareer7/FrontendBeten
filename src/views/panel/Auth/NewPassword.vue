<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>New Password</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
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
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="********"
                      v-model="form.password"
                      autocomplete="password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton @click="resetPwd" color="primary" class="px-4">
                        Reset
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <p>
                    {{ message }}
                  </p>
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
import config from '@/config'
const API_URL = config.base_url

export default {
  name: 'Login',
  data() {
    return {
      form: { email: '', token: '', password: '' },
      message: '',
    }
  },
  methods: {
    resetPwd: async function () {
      return await axios
        .post(`${API_URL}/password/reset`, this.form)
        .then((response) => {
          this.message = response.data.message
        })
        .catch((error) => {
          this.message = error.message
        })
    },
  },
}
</script>
