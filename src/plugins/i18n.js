import { createI18n } from 'vue-i18n'
import messages from '../locales/messages'

const i18n = createI18n({
  locale: localStorage.getItem('locale'),
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  missingWarn: false,
  silentFallbackWarn: true,
  silentTranslationWarn: true,
  formatFallbackMessages: true,
})

export default i18n