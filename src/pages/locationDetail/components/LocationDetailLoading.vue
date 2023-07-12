<template>
  <section class="location-detail full-height full-height column items-center">
    <div class="episode-detail-icon">
      <q-skeleton
        type="QAvatar"
        class="location-card-icon"
        size="80px"
      />
    </div>

    <div class="episode-detail-name q-mt-lg">
      <div class="flex justify-center items-center">
        <q-skeleton
          type="text"
          width="200px"
          height="40px"
        />

        <div>
          <q-skeleton
            type="QAvatar"
            size="45px"
            class="q-ml-md"
          />
        </div>
      </div>

      <div class="flex items-center justify-center no-wrap q-mb-sm q-mt-sm">
        <q-icon size="20px" name="mdi-calendar-range" />

        <q-skeleton
          type="text"
          width="250px"
          height="40px"
          class="q-ml-md"
        />
      </div>
    </div>

    <div class="episode-detail-info q-mt-sm">
      <div class="flex gap-20 justify-center">
        <div class="flex items-center no-wrap">
          <q-icon size="40px">
            <img src="../../../assets/icons/planet.webp" alt="location-img">
          </q-icon>

          <q-skeleton
            type="text"
            width="120px"
            height="40px"
            class="q-ml-md"
          />
        </div>

        <div class="flex items-center no-wrap">
          <q-icon size="50px">
            <img src="../../../assets/icons/galaxy.webp" alt="location-img">
          </q-icon>

          <q-skeleton
            type="text"
            width="120px"
            height="40px"
            class="q-ml-md"
          />
        </div>
      </div>

      <div class="flex items-center no-wrap justify-center q-mt-md">
        <q-icon size="30px" name="mdi-account-multiple"/>

        <q-skeleton
          type="text"
          width="220px"
          height="40px"
          class="q-ml-md"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
</script>

<style scoped>

</style>
