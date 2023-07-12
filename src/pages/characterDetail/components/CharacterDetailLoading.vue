<template>
  <section class="character-detail row content-center full-height q-mt-lg">
    <div class="col-12 col-sm-4 col-md-4 q-pa-md flex justify-center">
      <q-skeleton
        width="400px"
        height="100%"
        style="min-height: 380px"
        square
      />
    </div>

    <div class="character-detail-info col-12 col-sm-8 col-md-8 q-pa-md">
      <div class="flex items-center justify-text">
        <div class="character-name flex no-wrap items-center">
          <q-skeleton type="text" width="250px" height="50px" />

          <q-skeleton type="QAvatar" class="q-ml-md" />
        </div>
      </div>

      <div class="flex no-wrap items-center">
        <q-icon size="20px" name="mdi-calendar-range" />

        <q-skeleton
          class="q-ml-sm"
          type="text"
          width="200px"
          height="50px"
        />
      </div>

      <div class="flex no-wrap items-center">
        <q-icon size="24px" color="negative" name="mdi-television-play"/>

        <q-skeleton
          class="q-ml-sm"
          type="text"
          width="200px"
          height="50px"
        />
      </div>

      <div class="row ">
        <div class="q-mr-md flex no-wrap items-center">
          <q-skeleton
            type="QAvatar"
            size="26px"
          />

          <q-skeleton
            class="q-ml-sm"
            type="text"
            width="50px"
            height="35px"
          />
        </div>

        <div class="q-mr-md flex no-wrap items-center">
          <q-skeleton
            type="QAvatar"
            size="26px"
          />

          <q-skeleton
            class="q-ml-sm"
            type="text"
            width="50px"
            height="35px"
          />
        </div>

        <div class="q-mr-md flex no-wrap items-center">
          <q-skeleton
            type="QAvatar"
            size="26px"
          />

          <q-skeleton
            class="q-ml-sm"
            type="text"
            width="50px"
            height="35px"
          />
        </div>
      </div>

      <div class="character-detail-info-locations row no-wrap gap-20">
        <div>
          <location-card-loading/>
        </div>
        <div>
          <location-card-loading/>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import LocationCardLoading from 'components/locationCard/components/LocationCardLoading.vue'
</script>

<style scoped lang="scss">
@import "../style/characterDetail.scss";
</style>
