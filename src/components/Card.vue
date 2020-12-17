<script>
export default {
  props: {
    materialRipple: {
      type: Boolean,
      default: true,
    },
    classList: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleSelectCard() {
      this.$emit('click')
    },
  },
}
</script>

<template>
  <q-card
    tabindex="0"
    class="column cursor-pointer"
    :class="classList"
    @click="handleSelectCard"
    @keydown.enter="handleSelectCard"
    v-ripple="materialRipple"
  >
    <slot />
  </q-card>
</template>
