<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center login_bg">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <button type="button" @click="removeOTP" class="btn-close pull-right" aria-label="Close"></button>
                <CForm @submit.prevent="verifyOTP" autofocus>
                  <h1 class="text-center">{{ $t('OTP') }}</h1>
                  <p class="text-medium-emphasis text-center">
                    {{ $t('An SMS has been sent to your phone') }}
                  </p>
                  <CInputGroup class="mb-3">
                    <CFormInput
                      ref="myInput"
                      id="otp"
                      autofocus
                      type="text"
                      :placeholder="$t('Please enter your verification code')"
                      v-model="form.otp"
                      autocomplete="otp"
                      style="direction: inherit;"
                    />
                  </CInputGroup>

                  <div v-show="error_message" class="error_style">
                    {{ error_message }}
                  </div>
                  <CRow>
                    <CCol :xs="8">
                      <CButton @click="verifyOTP" color="primary" class="px-4">
                        {{ $t('Verify') }}
                      </CButton>
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
export default {
  name: 'Login',
  data: () => ({
    error_message: '',
    form: {},
  }),
  mounted() {
   // document.getElementById('otp').focus()

    //this.$refs.myInput[0].focus();
  },
  methods: {
    verifyOTP: async function(){
      this.form.user_id = localStorage.getItem('auth_user_id')
      this.error_message = "";
      await this.$axios.
            post('/verify/otp', this.form)
            .then((response) => {
              console.log('test',this.form,response)
              localStorage.setItem('auth_token', response.data.token)
              localStorage.setItem('user', JSON.stringify(response.data.user))
              localStorage.setItem(
                'permissions',
                JSON.stringify(response.data.permissions),
              )
              localStorage.removeItem('auth_user_id')
              window.location.href = '/dashboard'
            })
            .catch((error) =>{
              console.log('error',this.form,error)
              this.error_message = error.response?.data.message || error.message
            })

    },
    removeOTP: function (){
      localStorage.removeItem('auth_user_id')
      //this.$router.push({name: 'Login'});
      window.location.href = '/panel/login'
    }
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
