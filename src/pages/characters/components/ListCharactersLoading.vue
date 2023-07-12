<template>
  <div
    class="col-6 col-sm-6 col-md-4 col-lg-3 q-pa-sm"
    v-for="item in items"
    :key="item"
  >
    <character-card-loading/>
  </div>
</template>

<script lang="ts" setup>
import CharacterCardLoading from 'components/characterCard/components/CharacterCardLoading.vue'

withDefaults(defineProps<{
  items: number
}>(), {
  items: 20
})
</script>

<style scoped>

</style>
