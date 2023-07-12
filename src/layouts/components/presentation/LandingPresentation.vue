<template>
  <q-img
    src="../../../assets/icons/rick-and-morty-fav.webp"
    class="high-light-image"
    v-if="isFavoritePage"
    fit="contain"
  />
  <q-img
    src="../../../assets/icons/HighlightImageDark.webp"
    class="high-light-image"
    v-else-if="$q.dark.isActive"
    fit="contain"
  />
  <q-img
    v-else
    src="../../../assets/icons/HighlightImageLight.webp"
    class="high-light-image"
    fit="contain"
  />
  <div class="principal-info-main">
    <div class="row q-mt-xl">
      <div class="col-12">
        <p class="text-landing" v-if="!isFavoritePage">
          Discover it all <br/> in one
          <span>place.</span>
        </p>

        <p class="text-landing" v-else>
          all your
          <span class="block">
            favorites.
          </span>
        </p>
        <p
          class="info-landing q-my-lg q-mb-xl"
          v-if="!isFavoritePage"
        >
          Characters, locations, episodes and much more.
        </p>
        <div class="button-content q-mt-xl">
          <theme-buttons/>
        </div>
        <p
          class="text-overline text-primary q-mt-md"
          v-if="!isFavoritePage"
        >
          That's right, Porr#@%&*.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ThemeButtons from 'components/ThemeButtons.vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const currentRoute = router.currentRoute

const isFavoritePage = computed<boolean>(() => (
  currentRoute.value.path.includes('favorite')
))
</script>

<style scoped lang="scss">
.high-light-image {
  position: absolute;
  bottom: 0;
  left: 35%;
  width: 874px;
  height: 534px;
  transition: all .5s;
  z-index: 0;

  .q-img__container {
    img {
      object-fit: none !important;
    }
  }
}

.principal-info-main {
  position: relative;
}

.text-landing {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 58px;

  span {
    color: #11B0C8;
  }
}

.info-landing {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
}

@media (max-width: $breakpoint-md-min) {
  .high-light-image {
    position: absolute;
    width: 774px;
    height: 434px;
    bottom: 0;
    left: 50%;
    transform: translate(-30%, 0%);
  }
}

@media (max-width: $breakpoint-sm-min) {
  .high-light-image {
    position: absolute;
    width: 674px;
    height: 334px;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0%);
    opacity: 0.4;
  }
}
</style>
