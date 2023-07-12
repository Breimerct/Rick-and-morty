<template>
  <router-view/>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useCommonStore } from 'stores/commonStore'

const $q = useQuasar()
const commonStore = useCommonStore()
const systemTheme = computed<boolean>(() => (
  window.matchMedia('(prefers-color-scheme: dark)').matches
))

onMounted(async () => {
  commonStore.themeActive = systemTheme.value
  $q.dark.set(systemTheme.value)
})
</script>
