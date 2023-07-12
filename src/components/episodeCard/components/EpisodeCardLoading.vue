<template>
  <q-card class="episode-card">
    <q-card-section class="q-pb-none">
      <div class="flex no-wrap content-center items-center">
        <q-icon size="24px" color="negative" name="mdi-television-play"/>

        <q-skeleton
          type="text"
          width="150px"
          height="30px"
          class="q-ml-sm"
        />
      </div>
    </q-card-section>
    <q-card-section class="q-pb-none q-pb-none flex justify-between items-center no-wrap q-pb-sm">
      <div>
        <q-skeleton
          type="QChip"
          width="80px"
          height="20px"
        />
      </div>
      <div>
        <q-skeleton
          type="QAvatar"
          size="30px"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
@import "../style/episodeCard.scss";
</style>
