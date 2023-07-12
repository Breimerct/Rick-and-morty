import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Dark } from 'quasar'

export const useCommonStore = defineStore('common', {
  state: () => ({
    themeActive: ref<boolean>(false)
  }),

  getters: {},

  actions: {
    changeTheme (payload: boolean) {
      Dark.set(payload)
    }
  }
})
