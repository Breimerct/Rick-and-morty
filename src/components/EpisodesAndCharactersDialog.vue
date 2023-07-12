<template>
  <q-dialog v-model="showDialogPaginate">
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="row justify-between items-center">
          <div>
            <p class="text-h4 q-mb-none">
              {{ getTitle }}
            </p>
          </div>
          <div>
            <q-btn
              round
              flat
              icon="mdi-close"
              @click="closeDialog"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section style="max-height: 60vh" class="scroll">
        <pagination-content
          :pages="paginateResult.totalPage"
          :max-pages="4"
          @change:page="changePage"
        >
          <section
            class="row flex-center"
          >
            <div
              :class="{
                'col-12 col-md-6 col-lg-6 q-pa-md': component === 'EpisodeCard',
                'col-xs-12 col-sm-4 col-md-4 col-lg-4 q-pa-sm': component === 'CharacterCard'
              }"
              v-for="item in paginateResult.data"
              :key="item.id"
            >
              <character-card
                v-if="component === 'CharacterCard'"
                @toggle-favorite="toggleFavorite($event, FavoriteListName.characters)"
                :character="item"
              />
              <episode-card
                v-if="component === 'EpisodeCard'"
                @toggle-favorite="toggleFavorite($event, FavoriteListName.episodes)"
                :episode="item"
              />
            </div>
          </section>
        </pagination-content>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import CharacterCard from 'components/characterCard/CharacterCard.vue'
import EpisodeCard from 'components/episodeCard/EpisodeCard.vue'
import { paginate } from 'src/helpers/util'
import { ICharacter } from 'stores/interfaces/ICharacter'
import PaginationContent from './PaginationContent.vue'
import { ILocation } from 'stores/interfaces/ILocation'
import { computed, inject, onMounted, ref } from 'vue'
import { IEpisode } from 'stores/interfaces/IEpisode'
import { IEventBus } from 'boot/bus'
import { EventBus } from 'quasar'
import { FavoriteListName, useFavoriteStore } from 'stores/favoriteStore'

const favoriteStore = useFavoriteStore()

const props = defineProps<{
  component: string;
  arrayItems: ICharacter[] | ILocation[] | IEpisode[]
}>()

const bus = inject<EventBus<IEventBus>>('bus')
const showDialogPaginate = ref<boolean>(false)
const pageNumber = ref<number>(1)
const pageSize = ref<number>(6)

const arrayItemsProp = computed<ICharacter[] | ILocation[] | IEpisode[]>(() => (
  props.arrayItems
))

const paginateResult = computed(() => (
  paginate(arrayItemsProp.value, pageNumber.value, pageSize.value)
))

const getTitle = computed<string>(() => (
  props.component === 'CharacterCard'
    ? 'Characters'
    : 'Episodes'
))

const changePage = (page: number): void => {
  pageNumber.value = page
}

const closeDialog = (): void => {
  showDialogPaginate.value = false
}

const toggleFavorite = (item: IEpisode | ICharacter, favoriteListName: FavoriteListName): void => {
  favoriteStore.setFavoriteList(favoriteListName, item)
}

onMounted((): void => {
  bus?.on('show-dialog', (showDialog: boolean) => {
    showDialogPaginate.value = showDialog
  })
})
</script>

<style scoped lang="scss">
</style>
