<template>
  <div class="episode-detail-content column justify-end content-center items-center">
    <div class="episode-detail-content-icon">
      <q-skeleton
        type="QAvatar"
        size="70px"
      />
    </div>

    <div class="episode-detail-content-name flex items-center justify-center gap-10 q-mt-md">
      <div>
        <q-skeleton
          type="text"
          width="300px"
          height="50px"
        />
      </div>

      <div>
        <q-skeleton
          type="QAvatar"
          size="45px"
        />
      </div>
    </div>

    <div class="episode-detail-content-info">
      <div class="flex gap-20 justify-center">
        <div class="flex items-center no-wrap">
          <q-icon size="30px" name="mdi-calendar-range"/>

          <q-skeleton
            type="text"
            width="100px"
            height="40px"
            class="q-ml-md"
          />
        </div>

        <div class="flex items-center no-wrap">
          <q-icon size="30px" name="mdi-playlist-play"/>

          <q-skeleton
            type="text"
            width="100px"
            height="40px"
            class="q-ml-md"
          />
        </div>
      </div>

      <div class="flex items-center no-wrap q-mt-lg justify-center">
        <q-icon size="30px" name="mdi-account-multiple"/>

        <q-skeleton
          type="text"
          width="300px"
          height="40px"
          class="q-ml-md"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>

</style>
