import { boot } from 'quasar/wrappers'

import { LoadingBar } from 'quasar'

LoadingBar.setDefaults({
  color: 'primary',
  size: '3px',
  position: 'top'
})

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
})
