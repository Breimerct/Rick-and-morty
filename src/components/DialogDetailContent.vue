<template>
  <q-dialog
    persistent
    square
    full-width
    v-model="showDialog"
    position="bottom"
  >
    <q-card class="dialog-content q-pa-md">
      <q-btn
      dense
      rounded
      @click="closeDialog"
      class="absolute absolute-top-right q-ma-md z-top"
      icon="mdi-close"
    />

      <slot/>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentRoute = router.currentRoute
const showDialog = ref<boolean>(false)

watch(currentRoute, (newValue, oldValue) => {
  if (
    !oldValue.hash &&
    newValue.hash !== oldValue.hash &&
    (newValue.hash === '#characterDetail' ||
    newValue.hash === '#locationDetail' ||
    newValue.hash === '#episodeDetail')
  ) {
    showDialog.value = true
  }
})

const closeDialog = () => {
  showDialog.value = false

  router.push({
    query: {
      page: currentRoute.value.query.page || 1
    }
  })
}

onMounted(() => {
  if (
    currentRoute.value.hash === '#characterDetail' ||
    currentRoute.value.hash === '#locationDetail' ||
    currentRoute.value.hash === '#episodeDetail'
  ) {
    showDialog.value = true
  }
})
</script>

<style scoped lang="scss">
</style>
