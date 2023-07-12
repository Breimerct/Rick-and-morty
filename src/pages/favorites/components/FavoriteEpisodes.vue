<template>
  <filter-search
    class="q-mt-lg"
    :filter-by-items="filterByItems"
    @on-search="search"
    @on-update-model="search"
  >
  </filter-search>

  <empty-result v-if="!paginateResult.data.length"/>

  <pagination-content
    v-else
    :pages="paginateResult.totalPage"
    :max-pages="4"
    :page="currentPage"
    @change:page="changePage"
  >
    <section class="row flex-center">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 flex flex-center q-pa-sm"
        v-for="episode in episodesList"
        :key="episode.id"
      >
        <episode-card
          :episode="episode"
          @toggle-favorite="toggleFavorite"
        />
      </div>
    </section>
  </pagination-content>
</template>

<script lang="ts" setup>
import PaginationContent from 'components/PaginationContent.vue'
import EpisodeCard from 'components/episodeCard/EpisodeCard.vue'
import EmptyResult from 'components/EmptyResult.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { paginate } from 'src/helpers/util'
import { IEpisode } from 'stores/interfaces/IEpisode'
import { FavoriteListName, useFavoriteStore } from 'stores/favoriteStore'
import FilterSearch from 'components/filterSearch/FilterSearch.vue'
import { IFilterOptions } from 'components/filterSearch/interfaces/Interfaces'
import { IFilters } from 'src/interfaces/interfaces'

const router = useRouter()
const favoriteStore = useFavoriteStore()

const currentRoute = router.currentRoute
const queryPage = ref<number>(Number(currentRoute.value.query.page))
const pageSize = ref<number>(12)
const currentPage = ref<number>(1)
const searchFilter = ref<IFilters>({})
const filterByItems = ref<IFilterOptions[]>([
  { label: 'Name', value: 'name' }
])

const favoriteEpisodes = computed(() => {
  if (searchFilter.value.name) {
    return favoriteStore.getFavoriteList.episodes.filter(epsd => (
      (epsd.name || '').toLowerCase().includes(searchFilter.value.name?.toLowerCase() || '')
    ))
  }

  return favoriteStore.getFavoriteList.episodes
})

const paginateResult = computed(() => (
  paginate(
    favoriteEpisodes.value,
    currentPage.value,
    pageSize.value
  )
))

const totalPages = computed(() => (
  paginateResult.value.totalPage
))

const episodesList = computed<IEpisode[]>(() => (
  paginateResult.value.data as IEpisode[]
))

watch(totalPages, (newValue) => {
  if (newValue === 1) {
    currentPage.value = 1
  }
})

const search = (filter: IFilters) => {
  if (currentPage.value !== 1) {
    currentPage.value = 1
    router.push({
      query: {
        page: currentPage.value
      }
    })
  }

  searchFilter.value = filter
}

const changePage = (page: number): void => {
  currentPage.value = page

  router.push({
    query: {
      page: currentPage.value
    }
  })
}

const toggleFavorite = (episode: IEpisode): void => {
  favoriteStore.setFavoriteList(
    FavoriteListName.episodes,
    episode
  )
}

onMounted(() => {
  if (queryPage.value) {
    currentPage.value = queryPage.value
  }
})
</script>

<style scoped lang="scss">
</style>
