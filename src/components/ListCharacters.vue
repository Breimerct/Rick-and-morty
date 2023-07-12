<template>
  <div class="row flex-center q-mt-lg full-width">
    <div class="col-12">
      <div class="title flex no-wrap content-center items-center" v-if="!hideTitle">
        <p class="title-text">
          Characters
        </p>
        <q-btn
          rounded
          outline
          color="grey"
          icon="mdi-format-list-bulleted"
          size="10px"
          label="see all"
          :to="{ name: 'characters', query: { page: 1 } }"
        />
      </div>
    </div>
    <list-characters-loading
      v-if="isLoading"
      :items="6"
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
  </div>
</template>

<script lang="ts" setup>
import ListCharactersLoading from 'pages/characters/components/ListCharactersLoading.vue'
import CharacterCard from 'components/characterCard/CharacterCard.vue'
import { ICharacter } from 'stores/interfaces/ICharacter'
import { FavoriteListName, useFavoriteStore } from 'stores/favoriteStore'

const favoriteStore = useFavoriteStore()

withDefaults(defineProps<{
  characters: ICharacter[],
  isLoading?: boolean,
  hideTitle?: boolean
}>(), {
  hideTitle: false
})

const toggleFavorite = (character: ICharacter) => {
  favoriteStore.setFavoriteList(
    FavoriteListName.characters,
    character
  )
}
</script>

<style scoped lang="scss">
</style>
