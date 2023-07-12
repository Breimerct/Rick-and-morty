<template>
  <q-card class="character-card">
    <q-card-section class="q-pa-none q-pb-md">
      <q-skeleton
        square
        class="skeleton-img"
        width="100%"
        height="220px"
      />
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="flex no-wrap items-center">
        <q-skeleton
          type="QAvatar"
          size="20px"
        />

        <q-skeleton
          class="q-ml-sm"
          type="text"
          width="60px"
        />
      </div>
      <div class="flex no-wrap items-center q-mt-sm">
        <q-skeleton
          type="QAvatar"
          size="20px"
        />

        <q-skeleton
          class="q-ml-sm"
          type="text"
          width="60px"
        />
      </div>
      <div class="flex no-wrap items-center q-mt-sm">
        <q-skeleton
          type="QAvatar"
          size="20px"
        />

        <q-skeleton
          class="q-ml-sm"
          type="text"
          width="60px"
        />
      </div>
    </q-card-section>
    <q-card-actions align="between" class="q-px-md flex justify-between">
      <q-skeleton
        type="QChip"
        width="75px"
        height="25px"
      />

      <q-skeleton
        type="QAvatar"
        size="27px"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
@import "../style/characterCard.scss";
</style>
