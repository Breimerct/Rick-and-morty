<template>
  <section class="navigation full-width">
    <q-tabs
      :class="customClass"
      :align="align"
      :dense="dense"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
    >
      <q-route-tab
        v-for="(route, index) in routes"
        :key="index"
        :icon="route.icon"
        :label="route.title"
        :to="{ name: route.nameUrl, query: route.query }"
      />
    </q-tabs>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RouteProp } from 'components/navigationLinks/routeProp.model'
import { AlignProp } from 'components/navigationLinks/alignProp.enum'

const props = withDefaults(
  defineProps<{
    routesLinks: RouteProp[]
    align?: AlignProp,
    dense?: boolean,
    customClass?: string
  }>(),
  {
    align: AlignProp.center,
    dense: false
  }
)

const routes = computed(() => (
  props.routesLinks
))
</script>

<style scoped lang="scss">
.route-tabs {
  width: 100%;
}
</style>
