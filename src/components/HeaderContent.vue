<template>
  <header class="header flex justify-start items-center column full-width" :class="backgroundColor">
    <section class="header-nav main-content">
      <nav class="flex items-center justify header-nav full-width">
        <router-link  to="/">
          <q-img src="../assets/icons/Logo.webp" width="219.57px" height="64px"/>
        </router-link>
        <div>
          <q-btn
            outline
            rounded
            icon="mdi-heart"
            color="primary"
            to="/favorites"
          >
            <span class="q-ml-sm">Favorites list</span>
          </q-btn>
        </div>
      </nav>
    </section>
    <section class="flex flex-center full-width">
      <div class="main-content full-height">
        <slot></slot>
      </div>
    </section>
  </header>
  <div class="q-my-lg flex flex-center full-width">
    <div class="main-content">
      <navigation-links :routes-links="routes"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavigationLinks from 'components/navigationLinks/NavigationLinks.vue'
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'
import { RouteProp } from 'components/navigationLinks/routeProp.model'

const $q = useQuasar()
const backgroundColor = computed<string>(() => (
  $q.dark.isActive
    ? 'bg-black'
    : 'bg-white'
))

const routes = ref<RouteProp[]>([
  { nameUrl: 'home', title: 'Home' },
  { nameUrl: 'characters', title: 'Characters' },
  { nameUrl: 'episodes', title: 'Episodes' },
  { nameUrl: 'locations', title: 'Locations' },
  { nameUrl: 'favoritePage', title: 'Favorite' }
])
</script>

<style scoped lang="scss">
.header {
  min-height: 580px;
  width: 100%;
  background-color: #000000;
  padding: 60px 0 0 0;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #11B0C8;

  &-nav {
    position: relative;

    nav {
      width: 100%;
      z-index: 2;
    }
  }
}

.full-height {
  min-height: 419px;
}
</style>
