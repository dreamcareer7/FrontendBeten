import Vidle from 'v-idle-3'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import * as icons from '@coreui/icons'

import App from './App.vue'
import router from './router'
import store from './store'

// Plugins
import axiosInstance from './plugins/axios'
import { encrypt, decrypt } from '@/plugins/crypto'
import can from '@/plugins/gate'

import Contractable from '@/components/Contractable'
import Documentable from '@/components/Documentable'
import Concurrable from '@/components/Concurrable'

const app = createApp(App)

import messages from './locales/messages'

if (!localStorage.getItem('dir')) {
  localStorage.setItem('dir', 'rtl')
}
if (!localStorage.getItem('locale')) {
  localStorage.setItem('locale', 'ar')
}

const i18n = createI18n({
  locale: localStorage.getItem('locale'),
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  missingWarn: false,
  silentFallbackWarn: true,
})

document.title = i18n.global.t('Murafiq')
document.dir = localStorage.getItem('dir')

app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(Vidle)
app.use(i18n)

app.provide('icons', icons)

app.component('CIcon', CIcon)
app.component('Contractable', Contractable)
app.component('Documentable', Documentable)
app.component('Concurrable', Concurrable)

app.config.compilerOptions.isCustomElement = (tag) => tag.includes('ion-icon')

app.config.globalProperties.$axios = axiosInstance
app.config.globalProperties.$encrypt = encrypt
app.config.globalProperties.$decrypt = decrypt
app.config.globalProperties.$can = can

app.mount('#app')
