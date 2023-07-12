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
    :pages="totalPages"
    :max-pages="4"
    :page="currentPage"
    @change:page="changePage"
  >
    <list-characters
      :hide-title="true"
      :characters="characterList"
    />
  </pagination-content>
</template>

<script lang="ts" setup>
import PaginationContent from 'components/PaginationContent.vue'
import ListCharacters from 'components/ListCharacters.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { paginate } from 'src/helpers/util'
import { ICharacter } from 'stores/interfaces/ICharacter'
import EmptyResult from 'components/EmptyResult.vue'
import { useFavoriteStore } from 'stores/favoriteStore'
import FilterSearch from 'components/filterSearch/FilterSearch.vue'
import { IFilterOptions } from 'components/filterSearch/interfaces/Interfaces'
import { IFilters } from 'src/interfaces/interfaces'

const router = useRouter()
const favoriteStore = useFavoriteStore()

const currentRoute = router.currentRoute
const queryPage = ref<number>(Number(currentRoute.value.query.page))
const pageSize = ref<number>(6)
const currentPage = ref<number>(1)
const searchFilter = ref<IFilters>({})
const filterByItems = ref<IFilterOptions[]>([
  { label: 'Name', value: 'name' }
])

const favoriteCharacters = computed(() => {
  if (searchFilter.value.name) {
    return favoriteStore.getFavoriteList.characters.filter(cht => (
      (cht.name || '').toLowerCase().includes(searchFilter.value.name?.toLowerCase() || '')
    ))
  }

  return favoriteStore.getFavoriteList.characters
})

const paginateResult = computed(() => (
  paginate(
    favoriteCharacters.value,
    currentPage.value,
    pageSize.value
  )
))

const totalPages = computed<number>(() => (
  paginateResult.value.totalPage
))

const characterList = computed<ICharacter[]>(() => (
  paginateResult.value.data as ICharacter[]
))

watch(totalPages, (newValue) => {
  if (newValue === 1) {
    currentPage.value = 1
  }
})

const changePage = (page: number): void => {
  currentPage.value = page

  router.push({
    query: {
      page: currentPage.value
    }
  })
}

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

onMounted(() => {
  if (queryPage.value) {
    currentPage.value = queryPage.value
  }
})
</script>

<style scoped lang="scss">
</style>
