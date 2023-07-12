<template>
  <q-page class="q-mb-md flex content-center column full-width full-height">
    <section class="q-mt-lg full-width">
      <div class="q-mb-lg">
        <filter-search
          :filter-by-items="filterByItems"
          @on-search="search"
        />
      </div>

      <div
        class="col-12"
        v-if="!isLoading && !episodes.length"
      >
        <empty-result
        />
      </div>

      <pagination-content
        v-else
        :pages="episodeStore.responseInfo.pages || 1"
        :max-pages="4"
        :page="currentPage"
        @change:page="changePage"
      >
        <section class="row flex-center">
          <list-episode-loading
            v-if="isLoading"
          />

          <div
            v-else
            class="col-12 col-sm-6 col-md-4 col-lg-3 flex flex-center q-pa-sm"
            v-for="episode in episodes"
            :key="episode.id"
          >
            <episode-card
              :episode="episode"
              @toggle-favorite="toggleFavorite"
            />
          </div>
        </section>
      </pagination-content>
    </section>

    <episode-detail/>
  </q-page>
</template>

<script lang="ts" setup>
import ListEpisodeLoading from 'pages/episodes/components/ListEpisodeLoading.vue'
import { IFilterOptions } from 'components/filterSearch/interfaces/Interfaces'
import FilterSearch from 'components/filterSearch/FilterSearch.vue'
import PaginationContent from 'components/PaginationContent.vue'
import EpisodeCard from 'components/episodeCard/EpisodeCard.vue'
import { IEpisode } from 'stores/interfaces/IEpisode'
import { useEpisodeStore } from 'stores/episodeStore'
import EmptyResult from 'components/EmptyResult.vue'
import { IFilters } from 'src/interfaces/interfaces'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import EpisodeDetail from 'pages/episodeDetail/EpisodeDetail.vue'
import { FavoriteListName, useFavoriteStore } from 'stores/favoriteStore'

const router = useRouter()
const favoriteStore = useFavoriteStore()
const episodeStore = useEpisodeStore()

const page = router.currentRoute.value.query.page as string
const currentPage = ref<number>(1)
const searchFilter = ref<IFilters>({})
const filterByItems = ref<IFilterOptions[]>([
  { label: 'Name', value: 'name' },
  { label: 'Episode', value: 'episode' }
])

const isLoading = computed<boolean>(() => (
  episodeStore.getLoading
))

const episodes = computed<IEpisode[]>(() => (
  episodeStore.getEpisodes
))

const search = (filter: IFilters): void => {
  if (currentPage.value !== 1) {
    currentPage.value = 1
    router.push({
      query: {
        page: currentPage.value
      }
    })
  }

  searchFilter.value = filter

  episodeStore.fetchEpisodes({
    page: currentPage.value,
    params: filter
  })
}

const changePage = (page: number): void => {
  currentPage.value = page

  router.push({
    query: {
      page
    }
  })

  episodeStore.fetchEpisodes({
    page,
    params: searchFilter.value
  })
}

const toggleFavorite = (episode: IEpisode): void => {
  favoriteStore.setFavoriteList(FavoriteListName.episodes, episode)
}

onMounted(() => {
  if (!page) {
    router.push({
      query: {
        page: 1
      }
    })
  }

  episodeStore.fetchEpisodes({ page: parseInt(page) })
})
</script>

<style scoped>

</style>
