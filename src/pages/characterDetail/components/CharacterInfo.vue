<template>
  <div class="row q-mt-md">
    <div class="q-mr-md flex no-wrap items-center">
      <q-icon
        size="24px"
        name="mdi-heart-pulse"
        :color="iconColor"
      />

      <p class="q-mb-none q-ml-sm">
        {{ character?.status || '' }}
      </p>
    </div>

    <div class="q-mr-md flex no-wrap items-center">
      <q-icon
        size="24px"
        name="mdi-alien-outline"
        color="light-green-6"
      />

      <p class="q-mb-none q-ml-sm">
        {{ character?.species || '' }}
      </p>
    </div>

    <div class="q-mr-md flex no-wrap items-center">
      <q-icon
        size="24px"
        :name="genderIcon.icon"
        :color="genderIcon.color"
      />

      <p class="q-mb-none q-ml-sm">
        {{ character?.gender || '' }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getGenderIcon, getIconColor } from 'src/helpers/util'
import { ICharacter } from 'stores/interfaces/ICharacter'
import { Gender, Status } from 'stores/models'
import { computed } from 'vue'

type IGenderIcon = {
  icon: string;
  color: string;
}

const props = defineProps<{
  character: ICharacter
}>()

const genderIcon = computed<IGenderIcon>(() => (
  getGenderIcon(props.character.gender as Gender || '')
))

const iconColor = computed<string>(() => (
  getIconColor(props.character.status as Status || '')
))
</script>

<style scoped>

</style>
