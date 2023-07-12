<template>
  <q-item>
    <div>
      <div>
        <p class="text-subtitle1 q-mb-none">
          Gender
        </p>
      </div>

      <q-radio
        v-for="gender in genderOptions"
        :key="gender"
        :val="gender.value"
        :label="gender.label"
        color="primary"
        v-model="genderFilter"
        @update:model-value="changeFilters"
      />
    </div>
  </q-item>

  <q-item>
    <div>
      <div>
        <p class="text-subtitle1 q-mb-none">
          Status
        </p>
      </div>

      <q-radio
        v-for="status in statusOptions"
        :key="status"
        :val="status.value"
        :label="status.label"
        color="primary"
        v-model="statusFilter"
        @update:model-value="changeFilters"
      />
    </div>
  </q-item>
</template>

<script lang="ts" setup>
import { Gender, Status } from 'stores/models'
import { computed, onMounted, ref } from 'vue'
import { IFilterOptions } from 'components/filterSearch/interfaces/Interfaces'
import { IFilters } from 'src/interfaces/interfaces'

const props = withDefaults(
  defineProps<{
    filtersDefault: IFilters
  }>(), {
    filtersDefault: {
      status: '',
      gender: '',
      name: '',
      species: ''
    }
  }
)

const emit = defineEmits<{
  (e: 'change-filters', filter: any): void
}>()

const genderFilter = ref<string>('')
const statusFilter = ref<string>('')

const genderOptions = ref<IFilterOptions[]>([
  { label: 'All', value: '' },
  { label: Gender.Male.toString(), value: Gender.Male.toString() },
  { label: Gender.Female.toString(), value: Gender.Female.toString() },
  { label: Gender.Genderless.toString(), value: Gender.Genderless.toString() },
  { label: Gender.Unknown.toString(), value: Gender.Unknown.toString() }
])
const statusOptions = ref<IFilterOptions[]>([
  { label: 'All', value: '' },
  { label: Status.Alive.toString(), value: Status.Alive.toString() },
  { label: Status.Dead.toString(), value: Status.Dead.toString() },
  { label: Status.Unknown.toString(), value: Status.Unknown.toString() }
])

const filterProps = computed<IFilters>(() => (
  props.filtersDefault
))

const changeFilters = (): void => {
  emit('change-filters', {
    status: statusFilter.value,
    gender: genderFilter.value
  })
}

onMounted(() => {
  genderFilter.value = String(filterProps.value.gender)
  statusFilter.value = String(filterProps.value.status)
})
</script>

<style scoped>

</style>
