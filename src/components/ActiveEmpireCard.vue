<script>
import { ActiveEmpire } from '../api/ActiveEmpireModel'
import { SELECTED_CURRENT_EMPIRE_ACTION } from '../store'
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
    descriptionIsOverflowing: false,
    expanded: false,
  }),
  methods: {
    selectEmpire() {
      this.$store.dispatch(SELECTED_CURRENT_EMPIRE_ACTION, this.activeEmpire.id)
    },
    checkIfOverflowing() {
      if(this.$refs[this.descriptionRef].clientHeight < this.$refs[this.descriptionRef].scrollHeight) {
        this.descriptionIsOverflowing = true
      }
    },
  },
  computed: {
    descriptionRef() {
      return `empire-${this.activeEmpire.id}description`
    },
  },
  mounted() {
    setTimeout(() => {  // the dom will sometimes update faster than vue has time to check dom heights
      this.checkIfOverflowing()
    }, 100)
  },
}
</script>

<template>
  <q-card
    tabindex="0"
    class="column cursor-pointer active-empire no-active-hover"
    @click="selectEmpire"
    @keydown.enter="selectEmpire"
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
      <div
        :ref="`empire-${activeEmpire.id}description`"
        class="q-mb-md ellipsis-3-lines line-6-clamp"
        :class="{'no-ellipsis': expanded }"
      >
        {{ activeEmpire.galaxy.description }}
      </div>
      <q-btn
        v-if="descriptionIsOverflowing"
        color="white"
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click.stop="expanded = !expanded"
        :label="expanded ? 'COLLAPSE' : 'EXPAND'"
        class="absolute-bottom full-width no-ripple text-body2"
      />
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
.no-ellipsis
  -webkit-line-clamp: initial
  -webkit-box-orient: initial
</style>
