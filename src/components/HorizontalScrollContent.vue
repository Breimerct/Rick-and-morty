<template>
  <section class="relative-position">
    <div class="row scroll-content no-wrap q-py-md gap-20 q-px-sm" @scroll="contentScroll" ref="scrollContent">
      <slot></slot>
    </div>

    <div
      :style="classButtons.left"
      v-if="scrollPosition !== 0"
      class="absolute absolute-left column justify-center btn-content-left flex flex-center"
    >
      <q-btn
        dense
        flat
        fab
        round
        size="40px"
        class="btn-left-scroll"
        icon="mdi-chevron-left"
        @click="scrollBack(scrollContent)"
      />
    </div>

    <div
      :style="classButtons.right"
      v-if="scrollPosition !== scrollWidth"
      class="absolute absolute-right column justify-center btn-content-right flex flex-center"
    >
      <q-btn
        dense
        flat
        fab
        round
        size="40px"
        class="btn-right-scroll"
        icon="mdi-chevron-right"
        @click="scrollForward(scrollContent)"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const scrollPosition = ref<number>(0)
const scrollWidth = ref<number>(-1)
const scrollContent = ref<HTMLElement>()

const scrollForward = (el: HTMLElement): void => {
  el.scrollLeft += 300
}

const scrollBack = (el: HTMLElement): void => {
  el.scrollLeft -= 300
}

const classButtons = computed<{left: string, right: string}>(() => ({
  left: $q.dark.isActive
    ? 'background: linear-gradient(90deg, rgba(18, 18, 18, 1) 20%, rgba(18, 18, 18, 0.8281687675070029) 50%, rgba(0, 0, 0, 0) 100%);'
    : 'background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.758140756302521) 45%, rgba(255,255,255,0)',
  right: $q.dark.isActive
    ? 'background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(18, 18, 18, 0.8281687675070029) 45%, rgba(18, 18, 18, 1) 74%);'
    : 'background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.758140756302521) 45%, rgba(255,255,255,1)'
}))

const contentScroll = ({ target }: { target: HTMLElement }): void => {
  scrollPosition.value = Math.floor(target.scrollLeft)
  scrollWidth.value = target.scrollWidth - target.offsetWidth
}
</script>

<style scoped lang="scss">
.scroll-content {
  scroll-behavior: smooth;
  overflow-x: auto;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    display: none;
  }
}

.btn-content-left {
  width: 47px;
  left: -16px;
  background: linear-gradient(90deg, rgba(18,18,18,1) 0%, rgba(18,18,18,0.758140756302521) 45%, rgba(18,18,18,0) 74%);

  .q-btn--dense.q-btn--round {
    padding: 0;
    max-height: 2.4em;
    max-width: 2.4em;
  }
}

.btn-content-right {
  width: 47px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(18, 18, 18, 0.8281687675070029) 45%, rgba(18, 18, 18, 1) 74%);

  .q-btn--dense.q-btn--round {
    padding: 0;
    max-height: 2.4em;
    max-width: 2.4em;
  }
}
</style>
