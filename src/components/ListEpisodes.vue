<template>
  <div class="row q-mt-md">
    <div class="col-12">
      <div class="title flex no-wrap content-center items-center">
        <p class="title-text">
          Episodes
        </p>
        <q-btn
          rounded
          outline
          color="grey"
          icon="mdi-format-list-bulleted"
          size="10px"
          label="see all"
          :to="{ name: 'episodes', query: { page: 1 } }"
        />
      </div>
    </div>
    <div class="col-12">
      <horizontal-scroll-content>
        <section v-if="isLoading" class="flex no-wrap gap-20">
          <div
            v-for="location in 10"
            :key="location.id"
            style="min-width: 250px"
          >
            <episode-card-loading />
          </div>
        </section>

        <section v-else class="flex no-wrap gap-20">
          <div
            v-for="episode in episodes"
            :key="episode.id"
            style="min-width: 250px"
          >
            <episode-card
              :episode="episode"
              @toggle-favorite="toggleFavorite"
            />
          </div>
        </section>
      </horizontal-scroll-content>
    </div>
  </div>
</template>

<script lang="ts" setup>
import EpisodeCardLoading from 'components/episodeCard/components/EpisodeCardLoading.vue'
import HorizontalScrollContent from 'components/HorizontalScrollContent.vue'
import EpisodeCard from 'components/episodeCard/EpisodeCard.vue'
import { IEpisode } from 'stores/interfaces/IEpisode'
import { FavoriteListName, useFavoriteStore } from 'stores/favoriteStore'

const favoriteStore = useFavoriteStore()

defineProps<{
  episodes: IEpisode[],
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-favorite'): void
}>()

const toggleFavorite = (episode: IEpisode) => {
  favoriteStore.setFavoriteList(FavoriteListName.episodes, episode)

  emit('toggle-favorite')
}
</script>

<style scoped lang="scss">
</style>
