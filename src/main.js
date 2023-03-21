import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'

import App from './App.vue'
import router from './router'
import store from './store'
import axiosInstance from './plugins/axios'
import swalInstance from './plugins/swal'
import { encrypt, decrypt } from '@/plugins/crypto'
import can from '@/plugins/gate'

import { iconsSet as icons } from '@/assets/icons'
import DocsExample from '@/components/DocsExample'
import Contractable from '@/components/Contractable'
import Documentable from '@/components/Documentable'
import Concurrable from '@/components/Concurrable'

import Vidle from 'v-idle-3'

const app = createApp(App)

import messages from './locales/messages'

const i18n = createI18n({
  locale: 'ar',
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  missingWarn: false,
  silentFallbackWarn: true
})

app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(Vidle)
app.use(i18n)

app.provide('icons', icons)

app.component('CIcon', CIcon)
app.component('DocsExample', DocsExample)
app.component('Contractable', Contractable)
app.component('Documentable', Documentable)
app.component('Concurrable', Concurrable)

app.config.compilerOptions.isCustomElement = (tag) => tag.includes('ion-icon')

app.config.globalProperties.$swal = swalInstance
app.config.globalProperties.$axios = axiosInstance
app.config.globalProperties.$encrypt = encrypt
app.config.globalProperties.$decrypt = decrypt
app.config.globalProperties.$can = can
app.config.globalProperties.api_url = process.env.VUE_APP_BASE_API_URL

app.mount('#app')
