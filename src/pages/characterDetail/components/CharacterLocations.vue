<template>
  <div>
    <location-card
      @toggle-favorite="toggleLocationFavorite"
      :location="character?.locationCharacter"
      :icon="locationIcon"
    />
  </div>
  <div>
    <location-card
      @toggle-favorite="toggleLocationFavorite"
      :location="character?.originCharacter"
    />
  </div>
</template>

<script lang="ts" setup>
import locationIcon from '../../../assets/icons/location-icon.webp'
import { ICharacter } from 'stores/interfaces/ICharacter'
import { ILocation } from 'stores/interfaces/ILocation'
import LocationCard from 'components/locationCard/LocationCard.vue'
import { FavoriteListName, useFavoriteStore } from 'stores/favoriteStore'

const favoriteStore = useFavoriteStore()

defineProps<{
  character: ICharacter
}>()

const toggleLocationFavorite = (location: ILocation): void => {
  favoriteStore.setFavoriteList(FavoriteListName.locations, location)
}
</script>

<style scoped>

</style>
