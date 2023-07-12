<template>
  <q-btn-toggle
    rounded
    @update:model-value="changeTheme"
    :options="buttonsOptions"
    toggle-color="primary"
    v-model="commonStore.themeActive"
    size="10px"
  >
    <template v-slot:dark>
      <div class="row items-center no-wrap">
        <q-icon right name="mdi-weather-night"/>
        <div class="text-center q-ml-sm">
          Dark
        </div>
      </div>
    </template>

    <template v-slot:light>
      <div class="row items-center no-wrap">
        <q-icon right name="mdi-white-balance-sunny"/>
        <div class="text-center q-ml-sm">
          Light
        </div>
      </div>
    </template>
  </q-btn-toggle>
</template>

<script lang="ts" setup>
import { useCommonStore } from 'stores/commonStore'
import { computed } from 'vue'

const commonStore = useCommonStore()
const buttonsOptions = computed<{value: boolean, slot: string}[]>(() => [
  { value: true, slot: 'dark' },
  { value: false, slot: 'light' }
])

const changeTheme = (value: boolean): void => {
  commonStore.changeTheme(value)
}
</script>

<style scoped>

</style>
