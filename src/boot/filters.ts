import { boot } from 'quasar/wrappers'
import moment from 'moment'

moment.updateLocale('en', {})
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: {
      formatDate: (value: string) => string
    };
  }
}

export default boot(async ({ app }) => {
  app.config.globalProperties.$filters = {
    formatDate (value: string) {
      return moment(value || null).locale('es').format('DD/MM/YYYY')
    }
  }
})
