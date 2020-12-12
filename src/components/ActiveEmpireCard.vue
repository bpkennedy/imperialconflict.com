<script>
import { ActiveEmpire } from '../api/ActiveEmpireModel'
export default {
  components: {
    SafeImage: () => import('./SafeImage.vue'),
  },
  props: {
    activeEmpire: {
      type: ActiveEmpire,
      required: true,
    },
  },
  data: () => ({
    isGoodAvatar: true,
    isGoodEmpireImage: true,
  }),
  methods: {
    // TODO placeholder method for clicking on Active Empire Card
    doSomething() {
      console.log('test')
    },
  },
}
</script>

<template>
  <q-card
    tabindex="0"
    class="column cursor-pointer active-empire no-active-hover"
    @click="doSomething"
    @keydown.enter="doSomething"
    v-ripple
  >
    <q-item>
      <q-item-section
        v-if="activeEmpire.avatar_url && isGoodAvatar"
        avatar
      >
        <safe-image
          :src="activeEmpire.avatar_url"
          :alt="`${activeEmpire.name} Image`"
          @validated="isGoodAvatar = true"
          @invalidated="isGoodAvatar = false"
          class="empire-image"
        />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ activeEmpire.name }}</q-item-label>
        <q-item-label caption>
          Family #{{ activeEmpire.family_id }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <safe-image
      v-if="isGoodEmpireImage"
      :src="activeEmpire.galaxy.map_image_path"
      :alt="`${activeEmpire.name} Galaxy Image`"
      @validated="isGoodEmpireImage = true"
      @invalidated="isGoodEmpireImage = false"
      class="empire-galaxy-image"
    />

    <q-card-section>
      <div class="ellipsis-3-lines line-6-clamp">
        {{ activeEmpire.galaxy.description }}
        <q-tooltip
          :delay="550"
          max-width="18rem"
          transition-show="scale"
          transition-hide="scale"
        >
          {{ activeEmpire.galaxy.description }}
        </q-tooltip>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="text-uppercase text-weight-medium">
      Enter {{ activeEmpire.galaxy.name }}
    </q-card-section>
  </q-card>
</template>

<style lang="sass" scoped>
.empire-image
  width: 2.5rem
  height: 2.5rem
  max-width: 2.5rem
  border: 1px solid $dark
  border-radius: 50%
  overflow: hidden
.empire-galaxy-image
  width: 100%
.active-empire
  &:focus
    outline: 0
  &:focus-visible
    outline: 1px solid $primary
.line-6-clamp
  -webkit-line-clamp: 6
</style>
