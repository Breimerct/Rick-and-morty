<template>
  <div
    class="col-6 col-xs-6 col-sm-4 col-md-3 col-lg-2 flex flex-center"
    v-for="location in 20"
    :key="location"
  >
    <location-card-loading/>
  </div>
</template>

<script lang="ts" setup>
import LocationCardLoading from 'components/locationCard/components/LocationCardLoading.vue'
</script>

<style scoped>

</style>
