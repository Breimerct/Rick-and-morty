<template>
  <q-card class="location-card q-mt-xl">
    <q-avatar class="location-card-icon">
      <img :src="icon" alt="location-img">
    </q-avatar>

    <q-card-section class="column items-center content-center q-pb-none">
      <p class="q-ma-none text-truncate text-center">
        {{ location.name || '' }}
      </p>

      <p class="text-truncate text-center">
        {{ location.type || location.name || '' }}
      </p>
    </q-card-section>

    <q-card-section class="column flex-center items-center q-pt-none">
      <div>
        <q-btn
          rounded
          outline
          :disable="location.id === 0"
          @click="seeMore"
          size="9px"
          label="see more"
          icon="mdi-information"
          color="primary"
        />
      </div>

      <div class="q-mt-sm">
        <q-btn
          round
          dense
          flat
          @click="toggleFavorite"
          :disable="location.id === 0"
          :icon="isFavoriteIcon"
          color="primary"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { ILocation } from 'stores/interfaces/ILocation'
import iconPlanet from 'assets/icons/planet-earth.webp'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const currentRoute = router.currentRoute
const props = withDefaults(defineProps<{
  location: ILocation;
  icon?: string;
}>(), {
  icon: iconPlanet
})

const emit = defineEmits<{
  (e: 'seeMore', locationId: number): void,
  (e: 'toggle-favorite', location: ILocation): void
}>()

const getLocation = computed<ILocation>(() => (props.location))

const isFavoriteIcon = computed<string>(() => (
  props.location?.isFavorite
    ? 'mdi-heart'
    : 'mdi-heart-outline'
))

const seeMore = (): void => {
  const routeQuery = (
    currentRoute.value.hash === '#locationDetail' ||
    currentRoute.value.name === 'locations'
      ? currentRoute.value.query
      : {}
  )

  router.push({
    name: 'locations',
    hash: '#locationDetail',
    query: {
      page: 1,
      ...routeQuery,
      id: getLocation.value.id
    }
  })
}

const toggleFavorite = (): void => {
  getLocation.value.isFavorite = !getLocation.value.isFavorite
  emit('toggle-favorite', getLocation.value)
}
</script>

<style scoped lang="scss">
@import "./style/locationCard.scss";
</style>
