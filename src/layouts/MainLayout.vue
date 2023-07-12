<template>
  <q-layout view="hHh lpR fff">
    <header-content>
      <presentation />
    </header-content>
    <q-page-container class="flex flex-center">
      <q-page class="main-content q-mb-xl">
        <router-view/>
      </q-page>
    </q-page-container>
    <footer-component/>
  </q-layout>
</template>

<script setup lang="ts">
import FooterComponent from 'components/FooterComponent.vue'
import Presentation from 'layouts/components/presentation/LandingPresentation.vue'
import HeaderContent from 'components/HeaderContent.vue'
</script>

<style scoped lang="scss">
</style>
