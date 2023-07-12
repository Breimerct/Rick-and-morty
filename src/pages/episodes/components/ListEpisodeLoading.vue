<template>
  <div
    class="col-12 col-sm-6 col-md-4 col-lg-3 flex flex-center q-pa-sm"
    v-for="episode in 20"
    :key="episode.id"
  >
    <episode-card-loading/>
  </div>
</template>

<script lang="ts" setup>
import EpisodeCardLoading from 'components/episodeCard/components/EpisodeCardLoading.vue'
</script>

<style scoped>

</style>
