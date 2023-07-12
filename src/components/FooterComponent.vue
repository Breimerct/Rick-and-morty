<template>
  <q-footer
    class="q-pa-md"
    :elevated="!$q.dark.isActive"
    :class="{
    'bg-dark': $q.dark.isActive,
    'bg-white': !$q.dark.isActive
    }"
  >
    <div class="flex flex-center justify gap-10 full-width">
      <figure class="q-ma-none">
        <q-img src="../assets/icons/Logo.webp" width="164.68px" height="48px" />
      </figure>
      <div
        :class="{
          'text-white': $q.dark.isActive,
          'text-black': !$q.dark.isActive
        }"
      >
        <theme-buttons/>
      </div>
    </div>
    <q-separator size="2px" class="q-my-md"/>
    <div class="flex flex-center justify gap-10 full-width">
      <div>
        <p
          class="q-mb-none"
          :class="{
            'text-white': $q.dark.isActive,
            'text-black': !$q.dark.isActive
          }"
        >
          ©2023
        </p>
      </div>
      <div class="flex no-wrap flex-center">
        <q-icon name="mdi-code-tags" size="23px" color="primary"/>
        <p
          class="q-mb-none q-ml-sm"
          :class="{
            'text-white': $q.dark.isActive,
            'text-black': !$q.dark.isActive
          }"
        >
          Developed by
          <a class="text-primary" href="https://github.com/Breimerct" target="_blank">
            Breimer Correa
          </a>
        </p>
      </div>
    </div>
  </q-footer>
</template>

<script lang="ts" setup>
import ThemeButtons from 'components/ThemeButtons.vue'
</script>

<style scoped>

</style>
