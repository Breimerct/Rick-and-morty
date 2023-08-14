<template>
  <like-component
    @on-doble-click="dblclick"
    icon-size="50px"
    top="50%"
  >
    <q-card class="episode-card">
      <q-card-section class="q-pb-none">
        <div class="flex no-wrap content-center items-center">
          <q-icon size="24px" color="negative" name="mdi-television-play"/>
          <p class="q-ma-none q-ml-sm text-truncate">
            {{ getEpisode.name }} | {{ getEpisode.episode }}
          </p>
        </div>
      </q-card-section>
      <q-card-section class="q-pb-none q-pb-none flex justify-between no-wrap">
        <div>
          <q-btn
            rounded
            outline
            @click="seeMore"
            size="9px"
            label="see more"
            icon="mdi-information"
            color="primary"
          />
        </div>
        <div>
          <q-btn
            round
            dense
            flat
            @click="toggleFavorite"
            :icon="isFavoriteIcon"
            color="primary"
          />
        </div>
      </q-card-section>
    </q-card>
  </like-component>
</template>

<script lang="ts" setup>
import { IEpisode } from 'stores/interfaces/IEpisode'
import likeComponent from '../likeComponent.vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const currentRoute = router.currentRoute
const props = defineProps<{
  episode: IEpisode
}>()

const emit = defineEmits<{
  (e: 'seeMore', episodeId: number): void,
  (e: 'toggle-favorite', episode: IEpisode): void
}>()

const isFavoriteIcon = computed<string>(() => (
  props.episode.isFavorite
    ? 'mdi-heart'
    : 'mdi-heart-outline'
))

const getEpisode = computed<IEpisode>(() => (props.episode))

const seeMore = (): void => {
  const routeQuery = (
    currentRoute.value.name === 'episodes' ||
    currentRoute.value.name === 'episodeDetail'
      ? currentRoute.value.query
      : {}
  )

  router.push({
    name: 'episodes',
    hash: '#episodeDetail',
    query: {
      page: 1,
      ...routeQuery,
      id: getEpisode.value.id
    }
  })
}

const toggleFavorite = (): void => {
  getEpisode.value.isFavorite = !props.episode.isFavorite
  emit('toggle-favorite', getEpisode.value)
}

const dblclick = () => {
  if (!props.episode.isFavorite) {
    toggleFavorite()
  }
}
</script>

<style scoped lang="scss">
@import "./style/episodeCard.scss";
</style>
