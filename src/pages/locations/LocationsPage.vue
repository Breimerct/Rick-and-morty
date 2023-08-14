<template>
  <q-page class="q-mb-md flex content-center column full-width">
    <section class="q-mt-lg full-width">
      <div class="q-mb-lg">
        <filter-search
          :filter-by-items="filterByItems"
          @on-search="search"
        />
      </div>

      <div
        class="col-12"
        v-if="!isLoading && !locations.length"
      >
        <empty-result
        />
      </div>

      <pagination-content
        v-else
        :pages="responseInfo.pages || 1"
        :max-pages="4"
        :page="currentPage"
        @change:page="changePage"
      >
        <section class="row flex-center q-gutter-md">
          <list-location-loading
            v-if="isLoading"
          />

          <div
            v-else
            class="col-6 col-xs-6 col-sm-4 col-md-2 col-lg-2 flex flex-center"
            v-for="location in locations"
            :key="location.id"
          >
            <location-card
              :location="location"
              @toggle-favorite="toggleFavorite"
            />
          </div>
        </section>
      </pagination-content>
    </section>

    <location-detail/>
  </q-page>
</template>

<script lang="ts" setup>
import ListLocationLoading from 'pages/locations/components/ListLocationLoading.vue'
import { IFilterOptions } from 'components/filterSearch/interfaces/Interfaces'
import LocationDetail from 'pages/locationDetail/LocationDetail.vue'
import FilterSearch from 'components/filterSearch/FilterSearch.vue'
import LocationCard from 'components/locationCard/LocationCard.vue'
import PaginationContent from 'components/PaginationContent.vue'
import { useLocationStore } from 'stores/locationStore'
import { ILocation } from 'stores/interfaces/ILocation'
import EmptyResult from 'components/EmptyResult.vue'
import { IFilters } from 'src/interfaces/interfaces'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { FavoriteListName, useFavoriteStore } from 'stores/favoriteStore'

const router = useRouter()
const locationStore = useLocationStore()
const favoriteStore = useFavoriteStore()

const currentRoute = router.currentRoute
const page = currentRoute.value.query.page as string
const currentPage = ref<number>(1)
const searchFilter = ref<IFilters>({})
const filterByItems = ref<IFilterOptions[]>([
  { label: 'Name', value: 'name' },
  { label: 'Dimension', value: 'dimension' }
])

const isLoading = computed<boolean>(() => (
  locationStore.getLoading
))

const responseInfo = computed(() => (
  locationStore.getResponseInfo
))

const locations = computed<ILocation[]>(() => (
  locationStore.getLocations
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

  searchFilter.value = filter

  locationStore.fetchLocations({
    page: currentPage.value,
    params: searchFilter.value
  })
}

const changePage = (page: number): void => {
  currentPage.value = page

  router.push({
    query: {
      page
    }
  })

  locationStore.fetchLocations({
    page: currentPage.value,
    params: searchFilter.value
  })
}

const toggleFavorite = (location: ILocation): void => {
  favoriteStore.setFavoriteList(FavoriteListName.locations, location)
}

onMounted((): void => {
  if (!page) {
    router.push({
      query: {
        page: 1
      }
    })
  }

  locationStore.fetchLocations({ page: parseInt(page) })
})
</script>

<style scoped>

</style>
