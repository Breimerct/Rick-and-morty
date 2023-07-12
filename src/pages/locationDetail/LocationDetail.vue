<template>
  <dialog-detail-content>
    <section class="location-detail full-height full-height">
      <location-detail-loading v-if="isLoading"/>

      <empty-result v-else-if="!isLoading && !location.id"/>

      <section v-else class="column items-center">
        <div class="episode-detail-icon">
          <q-avatar class="location-card-icon" size="80px">
            <img src="../../assets/icons/planet-earth.webp" alt="location-img">
          </q-avatar>
        </div>

        <div class="episode-detail-name q-mt-lg">
          <div class="flex justify-center items-center">
            <p class="q-mb-none q-mr-md text-center text-h4">
              {{ location.name }}
            </p>

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

          <div class="flex items-center justify-center no-wrap q-mb-sm">
            <q-icon size="20px" name="mdi-calendar-range" />

            <p class="q-mb-none q-ml-sm text-h6">
              <span class="text-bold">created at: </span>
              <span>{{ $filters.formatDate(String(location.created)) }}</span>
            </p>
          </div>
        </div>

        <div class="episode-detail-info">
          <div class="flex gap-20 justify-center">
            <div class="flex items-center no-wrap">
              <q-icon size="40px">
                <img src="../../assets/icons/planet.webp" alt="location-img">
              </q-icon>

              <p class="q-mb-none q-ml-sm text-h5">
                {{ location.type }}
              </p>
            </div>

            <div class="flex items-center no-wrap">
              <q-icon size="45px">
                <img src="../../assets/icons/galaxy.webp" alt="location-img">
              </q-icon>
              <p class="q-mb-none q-ml-sm text-h5">
                {{ location.dimension || 'unknown' }}
              </p>
            </div>
          </div>

          <div class="flex items-center no-wrap justify-center q-mt-md">
            <q-icon size="30px" name="mdi-account-multiple"/>
            <p class="q-mb-none q-ml-md text-h5 text-center">
              {{ `${location.residents.length} ` }}
              <a
                class="text-primary cursor-pointer"
                @click="showDetailDialog"
              >
                characters
              </a>
              <span>in this location</span>
            </p>
          </div>
        </div>

        <episodes-and-characters-dialog
          component="CharacterCard"
          :array-items="location.locationResidents"
        />
      </section>
    </section>
  </dialog-detail-content>
</template>

<script lang="ts" setup>
import LocationDetailLoading from 'pages/locationDetail/components/LocationDetailLoading.vue'
import DialogDetailContent from 'components/DialogDetailContent.vue'
import EpisodesAndCharactersDialog from 'components/EpisodesAndCharactersDialog.vue'
import { computed, onMounted, watch, inject } from 'vue'
import { useLocationStore } from 'stores/locationStore'
import { ILocation } from 'stores/interfaces/ILocation'
import EmptyResult from 'components/EmptyResult.vue'
import { useRouter } from 'vue-router'
import { IEventBus } from 'boot/bus'
import { EventBus } from 'quasar'
import { FavoriteListName, useFavoriteStore } from 'stores/favoriteStore'

const bus = inject<EventBus<IEventBus>>('bus')
const router = useRouter()
const locationStore = useLocationStore()
const favoriteStore = useFavoriteStore()

const currentRoute = router.currentRoute
const locationId = Number(currentRoute.value.query.id)

const isLoading = computed<boolean>(() => (
  locationStore.getLoadingDetail
))

const location = computed<ILocation>(() => (
  locationStore.getLocation
))

const favoriteItems = computed(() => (
  favoriteStore.getFavoriteList.locations
))

const isFavoriteIcon = computed<string>(() => (
  location.value.isFavorite
    ? 'mdi-heart'
    : 'mdi-heart-outline'
))

watch(currentRoute, (route, oldRoute): void => {
  if (route.query.id && route.query.id !== oldRoute.query.id) {
    locationStore.fetchOneLocation(Number(route.query.id))
  }
})

watch(favoriteItems, (newValue) => {
  locationStore.locations = locationStore.getLocations
    .map(lct => {
      const isExistInFavorites = newValue
        .some(item => item.id === lct.id)

      return ({
        ...lct,
        isFavorite: isExistInFavorites
      })
    })
})

const toggleFavorite = (): void => {
  location.value.isFavorite = !location.value.isFavorite

  favoriteStore.setFavoriteList(FavoriteListName.locations, location.value)
}

const showDetailDialog = (): void => {
  if (location.value.residents && location.value.residents?.length > 0) {
    bus?.emit('show-dialog', true)
  }
}

onMounted(async (): Promise<void> => {
  if (locationId) {
    await locationStore.fetchOneLocation(locationId)
  }
})
</script>

<style scoped>

</style>
