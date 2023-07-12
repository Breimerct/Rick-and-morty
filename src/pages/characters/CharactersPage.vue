<template>
  <q-page class="q-mb-md flex content-center column full-width">
    <main class="q-mt-lg full-width">
      <div class="q-mb-lg">
        <filter-search
          :filter-by-items="filterByItems"
          @on-search="search"
        >
          <filter-character
            @change-filters="changeFilters"
            :filters-default="searchFilter"
          />
        </filter-search>
      </div>

      <div
        class="col-12"
        v-if="!characterStore.getLoading && !characters.length"
      >
        <empty-result
        />
      </div>

      <pagination-content
        v-else
        :pages="characterStore.getResponseInfo.pages || 1"
        :max-pages="4"
        :page="currentPage"
        @change:page="changePage"
      >
        <section class="row flex-center">
          <list-characters-loading
            v-if="characterStore.getLoading"
            :items="20"
          />

          <div
            v-else
            class="col-6 col-sm-6 col-md-4 col-lg-3 q-pa-sm"
            v-for="character in characters"
            :key="character.id"
          >
            <character-card
              :character="character"
              @toggle-favorite="toggleFavorite"
            />
          </div>
        </section>
      </pagination-content>
    </main>

    <character-detail />
  </q-page>
</template>

<script lang="ts" setup>
import ListCharactersLoading from 'pages/characters/components/ListCharactersLoading.vue'
import { IFilterOptions } from 'components/filterSearch/interfaces/Interfaces'
import FilterCharacter from 'pages/characters/components/FilterCharacter.vue'
import CharacterCard from 'components/characterCard/CharacterCard.vue'
import FilterSearch from 'components/filterSearch/FilterSearch.vue'
import PaginationContent from 'components/PaginationContent.vue'
import { ICharacter } from 'stores/interfaces/ICharacter'
import { useCharacterStore } from 'stores/characterStore'
import EmptyResult from 'components/EmptyResult.vue'
import { IFilters } from 'src/interfaces/interfaces'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CharacterDetail from 'pages/characterDetail/CharacterDetail.vue'
import { FavoriteListName, useFavoriteStore } from 'stores/favoriteStore'

const router = useRouter()
const characterStore = useCharacterStore()
const favoriteStore = useFavoriteStore()

const currentRoute = router.currentRoute
const page = router.currentRoute.value.query.page as string
const currentPage = ref<number>(1)
const searchFilter = ref<IFilters>({
  status: '',
  gender: '',
  name: '',
  species: ''
})

const filterByItems = ref<IFilterOptions[]>([
  { label: 'Name', value: 'name' },
  { label: 'Species', value: 'species' }
])

const characters = computed<ICharacter[]>(() => (
  characterStore.getCharacters
))

const search = (filter: IFilters) => {
  if (currentPage.value !== 1) {
    currentPage.value = 1
    router.push({
      query: {
        page: currentPage.value
      }
    })
  }

  searchFilter.value = {
    ...searchFilter.value,
    ...filter
  }

  characterStore.fetchCharacters({
    page: currentPage.value,
    params: searchFilter.value
  })
}

const changeFilters = (filter: IFilters) => {
  search(filter)
}

const changePage = (page: number): void => {
  currentPage.value = page

  router.push({
    query: {
      ...currentRoute.value.query,
      page: currentPage.value
    }
  })

  characterStore.fetchCharacters({
    page: currentPage.value,
    params: searchFilter.value
  })
}

const toggleFavorite = (character: ICharacter): void => {
  favoriteStore.setFavoriteList(
    FavoriteListName.characters,
    character
  )
}

onMounted((): void => {
  if (!page) {
    router.push({
      query: {
        page: 1
      }
    })
  }

  characterStore.fetchCharacters({ page: parseInt(page) })
})
</script>

<style scoped>
</style>
