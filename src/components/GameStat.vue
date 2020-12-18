<script>
export default {
  components: {
    SafeImage: () => import('./SafeImage.vue'),
  },
  props: {
    iconUrl: {
      type: String,
      default: '',
    },
    iconAlt: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <div
    class="row col-12"
    :title="iconAlt"
  >
    <safe-image
      v-if="iconUrl"
      :src="iconUrl"
      :title="iconAlt"
      class="icon-image"
    />
    <div
      v-if="$slots.default"
      class="q-pl-xs"
    >
      <slot />
    </div>
    <div
      v-if="$slots.labelValue"
      class="q-pl-xs"
    >
      <slot name="labelValue" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.icon-image
  width: 1rem
  height: 1rem
</style>
