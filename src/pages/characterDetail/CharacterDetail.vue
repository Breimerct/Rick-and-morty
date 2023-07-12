<template>
  <dialog-detail-content>
    <section class="full-height">
      <character-detail-loading v-if="isLoading" />

      <empty-result v-else-if="!isLoading && !character?.id" />

      <section v-else class="character-detail row content-center">
        <div class="col-12 col-sm-4 col-md-4 q-pa-md flex justify-center">
          <q-img
            class="rounded-borders"
            :src="character?.image"
            :alt="character?.name"
            style="max-width: 369px"
          />
        </div>

        <div class="character-detail-info col-12 col-sm-8 col-md-8 q-pa-md">
          <div class="flex items-center justify-text q-mb-sm">
            <div class="character-name flex items-center">
              <p class="q-mb-none text-center text-h4 q-mr-sm">
                {{ character?.name || '' }}
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
          </div>

          <div class="flex no-wrap items-center">
            <q-icon size="20px" name="mdi-calendar-range" />

            <p class="q-mb-none q-ml-sm">
              <span class="text-bold">created at: </span>
              <span>{{ $filters.formatDate(String(character?.created || new Date())) }}</span>
            </p>
          </div>

          <div class="flex no-wrap items-center q-mt-md">
            <q-icon size="24px" color="negative" name="mdi-television-play"/>

            <p class="q-mb-none q-ml-sm">
              {{ `has participated in ${character?.episodes.length || 0} ` }}
              <a
                class="text-primary cursor-pointer"
                @click="showDetailDialog"
              >
                episodes
              </a>
            </p>
          </div>

          <character-info :character="character"/>

          <div class="character-detail-info-locations row no-wrap gap-20">
            <character-locations :character="character" />
          </div>
        </div>

        <episodes-and-characters-dialog
          component="EpisodeCard"
          :array-items="character?.episodes"
        />
      </section>
    </section>
  </dialog-detail-content>
</template>

<script lang="ts" setup>
import CharacterDetailLoading from 'pages/characterDetail/components/CharacterDetailLoading.vue'
import CharacterLocations from 'pages/characterDetail/components/CharacterLocations.vue'
import CharacterInfo from 'pages/characterDetail/components/CharacterInfo.vue'
import EpisodesAndCharactersDialog from 'components/EpisodesAndCharactersDialog.vue'
import { ICharacter } from 'stores/interfaces/ICharacter'
import { useCharacterStore } from 'stores/characterStore'
import { computed, inject, onMounted, watch } from 'vue'
import EmptyResult from 'components/EmptyResult.vue'
import { useRouter } from 'vue-router'
import { IEventBus } from 'boot/bus'
import { EventBus } from 'quasar'
import DialogDetailContent from 'components/DialogDetailContent.vue'
import { FavoriteListName, useFavoriteStore } from 'stores/favoriteStore'

const bus = inject<EventBus<IEventBus>>('bus')
const router = useRouter()
const characterStore = useCharacterStore()
const favoriteStore = useFavoriteStore()

const currentRoute = router.currentRoute
const characterId = Number(currentRoute.value.query.id)

const isLoading = computed<boolean>(() => (
  characterStore.loadingDetail
))

const character = computed<ICharacter>(() => (
  characterStore.getCharacter
))

const favoriteItems = computed(() => (
  favoriteStore.getFavoriteList.characters
))

const isFavoriteIcon = computed<string>(() => (
  character.value.isFavorite
    ? 'mdi-heart'
    : 'mdi-heart-outline'
))

watch(currentRoute, (route, oldRoute) => {
  if (
    route.query.id &&
    route.hash === '#characterDetail' &&
    route.query.id !== oldRoute.query.id
  ) {
    characterStore.fetchOneCharacter(Number(route.query.id))
  }
})

watch(favoriteItems, (newValue) => {
  characterStore.characters = characterStore.getCharacters
    .map(cht => {
      const isExistInFavorites = newValue
        .some(item => item.id === cht.id)

      return ({
        ...cht,
        isFavorite: isExistInFavorites
      })
    })
})

const toggleFavorite = (): void => {
  character.value.isFavorite = !character.value.isFavorite

  /*
  toggleFavorites(
    characterStore.getCharacters || [],
    LocalStoreNames.characters,
    character.value
  )
  */

  favoriteStore.setFavoriteList(
    FavoriteListName.characters,
    character.value
  )
}

const showDetailDialog = (): void => {
  if (character.value.episodes && character.value.episodes?.length > 0) {
    bus?.emit('show-dialog', true)
  }
}

onMounted(async (): Promise<void> => {
  if (characterId) {
    await characterStore.fetchOneCharacter(characterId)
  }
})
</script>

<style scoped lang="scss">
@import "./style/characterDetail.scss";
</style>
