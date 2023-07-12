<template>
  <dialog-detail-content>
    <section class="full-height">
      <episode-detail-loading v-if="isLoading"/>

      <empty-result v-else-if="!isLoading && !episode?.id"/>

      <section v-else class="episode-detail">
        <div class="episode-detail-content column justify-end content-center items-center">
          <div class="episode-detail-content-icon">
            <q-icon size="70px" color="negative" name="mdi-television-play"/>
          </div>

          <div class="episode-detail-content-name flex items-center justify-center gap-10">
            <div>
              <p class="q-mb-none text-center text-h4">
                {{ episode.name }}
              </p>
            </div>

            <div>
              <q-btn
                round
                dense
                flat
                size="25px"
                @click="toggleFavorite"
                :icon="isFavoriteIcon"
                color="primary"
              />
            </div>
          </div>

          <div class="episode-detail-content-info">
            <div class="flex gap-20 justify-center">
              <div class="flex items-center no-wrap">
                <q-icon size="30px" name="mdi-calendar-range"/>

                <p class="q-mb-none q-ml-md text-h5">
                  {{ episode.air_date }}
                </p>
              </div>

              <div class="flex items-center no-wrap">
                <q-icon size="30px" name="mdi-playlist-play"/>

                <p class="q-mb-none q-ml-md text-h5">
                  {{ episode.episode }}
                </p>
              </div>
            </div>

            <div class="flex items-center no-wrap q-mt-lg justify-center">
              <q-icon size="30px" name="mdi-account-multiple"/>

              <p class="q-mb-none q-ml-md text-h5 text-center">
                {{ `${episode.characters.length} ` }}
                <a
                  class="text-primary cursor-pointer"
                  @click="showDetailDialog"
                >
                  characters
                </a>
                <span>appear in this episode</span>
              </p>
            </div>
          </div>
        </div>

        <episodes-and-characters-dialog
          component="CharacterCard"
          :array-items="episode.episodeCharacters"
        />
      </section>
    </section>
  </dialog-detail-content>
</template>

<script lang="ts" setup>
import EpisodeDetailLoading from 'pages/episodeDetail/components/EpisodeDetailLoading.vue'
import EpisodesAndCharactersDialog from 'components/EpisodesAndCharactersDialog.vue'
import DialogDetailContent from 'components/DialogDetailContent.vue'
import { computed, onMounted, watch, inject } from 'vue'
import { IEpisode } from 'stores/interfaces/IEpisode'
import { useEpisodeStore } from 'stores/episodeStore'
import EmptyResult from 'components/EmptyResult.vue'
import { useRouter } from 'vue-router'
import { IEventBus } from 'boot/bus'
import { EventBus } from 'quasar'
import { FavoriteListName, useFavoriteStore } from 'stores/favoriteStore'

const bus = inject<EventBus<IEventBus>>('bus')
const router = useRouter()
const favoriteStore = useFavoriteStore()
const episodeStore = useEpisodeStore()

const currentRoute = router.currentRoute
const episodeId = Number(currentRoute.value.query.id)

const episode = computed<IEpisode>(() => (episodeStore.getEpisode))

const isLoading = computed<boolean>(() => (
  episodeStore.getLoadingDetail
))

const favoriteItems = computed(() => (
  favoriteStore.getFavoriteList.episodes
))

const isFavoriteIcon = computed<string>(() => (
  episode.value.isFavorite
    ? 'mdi-heart'
    : 'mdi-heart-outline'
))

watch(currentRoute, (route, oldRoute) => {
  if (
    route.query.id &&
    route.hash === '#episodeDetail' &&
    route.query.id !== oldRoute.query.id
  ) {
    episodeStore.fetchOneEpisode(Number(route.query.id))
  }
})

watch(favoriteItems, (newValue) => {
  episodeStore.episodes = episodeStore.getEpisodes
    .map(epsd => {
      const isExistInFavorites = newValue
        .some(item => item.id === epsd.id)

      return ({
        ...epsd,
        isFavorite: isExistInFavorites
      })
    })
})

const toggleFavorite = (): void => {
  episode.value.isFavorite = !episode.value.isFavorite

  favoriteStore.setFavoriteList(
    FavoriteListName.episodes,
    episode.value
  )
}

const showDetailDialog = (): void => {
  if (episode.value.characters && episode.value.characters?.length > 0) {
    bus?.emit('show-dialog', true)
  }
}

onMounted((): void => {
  if (episodeId) {
    episodeStore.fetchOneEpisode(episodeId)
  }
})
</script>

<style scoped>

</style>
