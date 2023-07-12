<template>
  <q-card class="location-card q-mt-xl">
    <q-avatar class="location-card-icon">
      <q-skeleton
        type="QAvatar"
      />
    </q-avatar>

    <q-card-section class="column items-center content-center q-pb-none">
      <q-skeleton
        type="text"
        width="100%"
        height="30px"
      />

      <q-skeleton
        type="text"
        width="100%"
        height="30px"
      />
    </q-card-section>

    <q-card-section class="column flex-center items-center q-pt-none">
      <div>
        <q-skeleton
          type="QChip"
          height="22px"
          width="90px"
        />
      </div>
      <div class="q-mt-sm">
        <q-skeleton
          type="QAvatar"
          size="40px"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
@import "../style/locationCard.scss";
</style>
