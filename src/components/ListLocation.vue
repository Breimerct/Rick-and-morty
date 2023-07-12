<template>
  <div class="row q-mt-md">
    <div class="col-12">
      <div class="col-12">
        <div class="title flex no-wrap content-center items-center">
          <p class="title-text">
            Locations
          </p>
          <q-btn
            rounded
            outline
            color="grey"
            icon="mdi-format-list-bulleted"
            size="10px"
            label="see all"
            :to="{ name: 'locations', query: { page: 1 } }"
          />
        </div>
      </div>
    </div>
    <div class="col-12">
      <horizontal-scroll-content>
        <section v-if="isLoading" class="flex no-wrap gap-20">
          <div
            v-for="location in 10"
            :key="location.id"
            style="max-width: 150px"
          >
            <location-card-loading/>
          </div>
        </section>

        <section v-else class="flex no-wrap gap-20">
          <div
            v-for="location in locations"
            :key="location.id"
            style="max-width: 150px"
          >
            <location-card
              :location="location"
              @toggle-favorite="toggleFavorite"
            />
          </div>
        </section>
      </horizontal-scroll-content>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LocationCardLoading from 'components/locationCard/components/LocationCardLoading.vue'
import HorizontalScrollContent from 'components/HorizontalScrollContent.vue'
import LocationCard from 'components/locationCard/LocationCard.vue'
import { ILocation } from 'stores/interfaces/ILocation'
import { FavoriteListName, useFavoriteStore } from 'stores/favoriteStore'

const favoriteStore = useFavoriteStore()

defineProps<{
  locations: ILocation[],
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-favorite'): void
}>()

const toggleFavorite = (location: ILocation) => {
  favoriteStore.setFavoriteList(FavoriteListName.locations, location)

  emit('toggle-favorite')
}
</script>

<style scoped lang="scss">
</style>
