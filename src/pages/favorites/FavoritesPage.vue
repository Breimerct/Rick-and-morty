<template>
  <section class="full-height">
    <nav>
      <navigation-links :align="AlignProp.left" :routes-links="routes" />
    </nav>
    <router-view/>
  </section>
</template>

<script lang="ts" setup>
import NavigationLinks from 'components/navigationLinks/NavigationLinks.vue'
import { ref } from 'vue'
import { RouteProp } from 'components/navigationLinks/routeProp.model'
import { AlignProp } from 'src/components/navigationLinks/alignProp.enum'

const routes = ref<RouteProp[]>([
  { nameUrl: 'favoriteCharacters', title: 'Characters', icon: 'mdi-account-group-outline' },
  { nameUrl: 'favoriteEpisodes', title: 'Episodes', icon: 'mdi-format-list-bulleted-square' },
  { nameUrl: 'favoriteLocations', title: 'Locations', icon: 'mdi-map-marker' }
])
</script>

<style scoped lang="scss">
</style>
