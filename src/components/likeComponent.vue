<template>
  <section class="like full-width" @dblclick="onLike">
    <figure
      class="like-content"
      ref="likeIcon"
      :style="`--top: ${top}`"
    >
      <q-icon
        class="like-content-icon"
        name="mdi-heart"
        :size="props.iconSize"
      />
    </figure>
    <main class="full-width d-block">
      <slot></slot>
    </main>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const likeIcon = ref()
const emit = defineEmits<{
  (e: 'on-doble-click'): void,
}>()

const props = withDefaults(defineProps<{
  iconSize: string
  top: string
}>(), {
  iconSize: '100px',
  top: '30%'
})

const onLike = () => {
  likeIcon.value?.children[0].classList.add('like-active')

  setTimeout(() => {
    likeIcon.value?.children[0].classList.remove('like-active')
  }, 1000)

  emit('on-doble-click')
}

</script>

<style scoped lang="scss">
.like {
  position: relative;

  &-content {
    margin: 0;
    position: absolute;
    z-index: 1;
    top: var(--top);
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    opacity: 1;
    &-icon {
      opacity: 0;
      pointer-events: none;
    }
  }
}

.like-active {
  animation: 1s like ease-in-out;
}

@keyframes like {
  0% {
    opacity: 0;
    scale: 0;
    color: white;
  }
  15% {
    opacity: 1;
    scale: 1.2;
  }
  30% {
    scale: .95;
  }
  45%,
  80% {
    scale: 1;
    color: $primary;
  }
  100% {
    color: $primary;
    opacity: 1;
    scale: 0;
  }
}
</style>
