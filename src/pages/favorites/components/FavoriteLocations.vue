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
        class="col-6 col-xs-6 col-sm-4 col-md-3 col-lg-2 flex flex-center"
        v-for="location in locationsList"
        :key="location.id"
      >
        <location-card
          :location="location"
          @toggle-favorite="toggleFavorite"
        />
      </div>
    </section>
  </pagination-content>
</template>

<script lang="ts" setup>
import PaginationContent from 'components/PaginationContent.vue'
import LocationCard from 'components/locationCard/LocationCard.vue'
import EmptyResult from 'components/EmptyResult.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { paginate } from 'src/helpers/util'
import { ILocation } from 'stores/interfaces/ILocation'
import { FavoriteListName, useFavoriteStore } from 'stores/favoriteStore'
import FilterSearch from 'components/filterSearch/FilterSearch.vue'
import { IFilters } from 'src/interfaces/interfaces'
import { IFilterOptions } from 'components/filterSearch/interfaces/Interfaces'

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

const favoriteLocations = computed(() => {
  if (searchFilter.value.name) {
    return favoriteStore.getFavoriteList.locations.filter(loc => (
      (loc.name || '').toLowerCase().includes(searchFilter.value.name?.toLowerCase() || '')
    ))
  }

  return favoriteStore.getFavoriteList.locations
})

const paginateResult = computed(() => (
  paginate(
    favoriteLocations.value,
    currentPage.value,
    pageSize.value
  )
))

const locationsList = computed<ILocation[]>(() => (
  paginateResult.value.data as ILocation[]
))

const totalPages = computed<number>(() => (
  paginateResult.value.totalPage
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

const toggleFavorite = (location: ILocation): void => {
  favoriteStore.setFavoriteList(
    FavoriteListName.locations,
    location
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
