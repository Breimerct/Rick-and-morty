<template>
  <section class="row no-wrap justify-center items-center gap-10">
    <div class="col-1 flex justify-center items-center">
      <q-btn
        outline
        round
        v-if="filterByItems.length > 1"
        size="10px"
        icon="mdi-filter-variant"
        color="primary"
      >
        <q-menu
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-list style="min-width: 150px">
            <q-item class="column">
              <q-item-label class="text-subtitle1">
                Filters
              </q-item-label>
              <q-checkbox
                keep-color
                v-for="(filter, index) in filterByItems"
                :key="index"
                :label="filter.label"
                :val="filter.value"
                type="checkbox"
                color="primary"
                v-model="filterBy"
              />
            </q-item>
            <slot></slot>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div
      class="col-6 flex flex-center no-wrap gap-20"
      :class="{
        'col-10' : filterBy.length > 1
      }"
    >
      <q-input
        outlined
        clear-icon="mdi-close"
        clearable
        dense
        class="full-width"
        v-for="(filter, index) in filterBy"
        :key="index"
        v-model="search[filter]"
        @clear="searchFilter"
        @keypress.enter="searchFilter"
        @update:model-value="updateModel"
        color="primary"
        :label="filter">
      </q-input>
    </div>

    <div class="col-1 flex justify-center items-center">
      <q-btn
        dense
        outline
        rounded
        size="16px"
        color="primary"
        icon="mdi-magnify"
        @click="searchFilter"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { IFilterOptions } from 'components/filterSearch/interfaces/Interfaces'
import { IFilters } from 'src/interfaces/interfaces'
import { computed, ref, watch } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const props = defineProps<{
  filterByItems: IFilterOptions[]
}>()

const emit = defineEmits<{
  (e: 'on-search', filterObject: any): void,
  (e: 'on-update-model', filterObject: any): void
}>()

const filterBy = ref<string[]>([
  props.filterByItems[0].value
])

const filterInputs = computed<IFilters>(() => (
  filterBy.value.reduce((acc, el) => ({
    ...acc,
    [el]: ''
  }), {})
))

const search = ref(filterInputs.value)

watch(filterBy, (newFilterBy, oldFilterBy) => {
  if (!newFilterBy.length) {
    filterBy.value = oldFilterBy
    $q.notify({
      type: 'warning',
      message: 'must have at least one filter selected',
      position: 'top',
      progress: true,
      timeout: 4000
    })
  }
})

const updateModel = () => {
  emit('on-update-model', search.value)
}

const searchFilter = (): void => {
  emit('on-search', search.value)
}
</script>

<style scoped>

</style>
