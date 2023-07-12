import { boot } from 'quasar/wrappers'
import { EventBus } from 'quasar'

export type IEventBus = {
  'show-dialog'?: (showDialog: boolean) => void
}

export default boot(({ app }) => {
  const bus = new EventBus<IEventBus>()
  // for Options API
  app.config.globalProperties.$bus = bus

  // for Composition API
  app.provide<EventBus>('bus', bus)
})
