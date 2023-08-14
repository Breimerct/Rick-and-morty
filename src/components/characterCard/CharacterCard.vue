<template>
  <like-component @on-doble-click="dblclick">
    <q-card class="character-card full-width" v-if="character?.id">
      <q-card-section class="q-pa-none q-pb-md">
        <q-img
          :src="character.image"
          width="100%"
          height="100%"
        >
          <div class="absolute absolute-bottom text-truncate character-name" style="max-height: 30px">
            {{ character.name }}
          </div>
        </q-img>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="flex no-wrap items-center">
          <q-icon
            size="16px"
            name="mdi-heart-pulse"
            :color="iconColor"
          />

          <p class="character-text-info text-truncate">
            {{ character.status }}
          </p>
        </div>
        <div class="flex no-wrap items-center">
          <q-icon
            size="16px"
            name="mdi-alien-outline"
            color="green-7"
          />

          <p class="character-text-info text-truncate">
            {{ character.species }}
          </p>
        </div>
        <div class="flex no-wrap items-center">
          <q-icon
            size="16px"
            name="mdi-map-marker-radius"
            color="deep-orange-8"
          />

          <p class="character-text-info text-truncate">
            {{ character?.location?.name }}
          </p>
        </div>
      </q-card-section>
      <q-card-actions class="q-px-md flex justify-between actions">
        <q-btn
          rounded
          outline
          @click="seeMore"
          color="primary"
          size="9px"
        >
          <div class="flex flex-center no-wrap">
            <q-icon name="mdi-information-outline" class="q-mr-sm"/>
            <p class="q-mb-none">see more</p>
          </div>
        </q-btn>

        <q-btn
          round
          dense
          flat
          @click="toggleFavorite"
          :icon="isFavoriteIcon"
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </like-component>
</template>

<script lang="ts" setup>
import likeComponent from '../likeComponent.vue'
import { ICharacter } from 'stores/interfaces/ICharacter'
import { getIconColor } from 'src/helpers/util'
import { Status } from 'stores/models'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const currentRoute = router.currentRoute.value
const props = defineProps<{
  character: ICharacter
}>()

const emit = defineEmits<{
  (e: 'see-more', id: number): void,
  (e: 'toggle-favorite', character: ICharacter): void
}>()

const characterProp = computed<ICharacter>(() => (props.character))

const isFavoriteIcon = computed<string>(() => (
  characterProp.value.isFavorite
    ? 'mdi-heart'
    : 'mdi-heart-outline'
))

const iconColor = computed<string>(() => (
  getIconColor(characterProp.value.status as Status)
))

const toggleFavorite = (): void => {
  characterProp.value.isFavorite = !characterProp.value.isFavorite
  emit('toggle-favorite', characterProp.value)
}

const dblclick = () => {
  if (!characterProp.value.isFavorite) {
    toggleFavorite()
  }
}

const seeMore = (): void => {
  const routerQuery = (
    currentRoute.name === 'characters' ||
    currentRoute.hash === '#characterDetail'
      ? currentRoute.query
      : {}
  )

  router.push({
    name: 'characters',
    hash: '#characterDetail',
    query: {
      page: 1,
      ...routerQuery,
      id: characterProp.value.id
    }
  })
}
</script>

<style scoped lang="scss">
@import "./style/characterCard.scss";
</style>
