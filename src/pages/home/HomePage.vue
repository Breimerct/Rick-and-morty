<template>
  <section>
    <list-characters
      :is-loading="characterStore.getLoading"
      :characters="characterList"
    />

    <list-episodes
      :is-loading="episodeStore.getLoading"
      :episodes="episodeList"
    />

    <list-location
      :is-loading="locationStore.getLoading"
      :locations="locationList"
    />
  </section>
</template>

<script setup lang="ts">
import ListCharacters from 'components/ListCharacters.vue'
import ListEpisodes from 'components/ListEpisodes.vue'
import ListLocation from 'components/ListLocation.vue'
import { useCharacterStore } from 'stores/characterStore'
import { useLocationStore } from 'stores/locationStore'
import { useEpisodeStore } from 'stores/episodeStore'
import { computed, onMounted } from 'vue'

const episodeStore = useEpisodeStore()
const characterStore = useCharacterStore()
const locationStore = useLocationStore()

const characterList = computed(() => (
  characterStore.getCharacters.slice(0, 6)
))

const episodeList = computed(() => (
  episodeStore.getEpisodes.slice(0, 10)
))

const locationList = computed(() => (
  locationStore.getLocations.slice(0, 10)
))

const initData = () => {
  characterStore.fetchCharacters({})
  episodeStore.fetchEpisodes({})
  locationStore.fetchLocations({})
}

onMounted(() => {
  initData()
})
</script>
