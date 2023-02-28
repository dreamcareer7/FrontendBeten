import { createApp } from 'vue'
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'

import App from './App.vue'
import router from './router'
import store from './store'
import axiosInstance from './plugins/axios'
import swalInstance from './plugins/swal'
import { encrypt, decrypt } from '@/plugins/crypto'

import { iconsSet as icons } from '@/assets/icons'
import DocsExample from '@/components/DocsExample'
import Contractable from '@/components/Contractable'
import Documentable from '@/components/Documentable'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(CoreuiVue)

app.provide('icons', icons)

app.component('CIcon', CIcon)
app.component('DocsExample', DocsExample)
app.component('Contractable', Contractable)
app.component('Documentable', Documentable)

app.config.compilerOptions.isCustomElement = (tag) => tag.includes('ion-icon')

app.config.globalProperties.$swal = swalInstance
app.config.globalProperties.$axios = axiosInstance
app.config.globalProperties.$encrypt = encrypt
app.config.globalProperties.$decrypt = decrypt
app.config.globalProperties.api_url = process.env.VUE_APP_BASE_API_URL

app.mount('#app')
