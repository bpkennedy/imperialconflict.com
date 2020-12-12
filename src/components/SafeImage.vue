<script>
export default {
  props: {
    src: {
      type: String,
      default: '',
    },
    timeout: {
      type: Number,
      default: 6000,
    },
    title: {
      type: String,
      default: '',
    },
  },
  components: {
    CannotLoadImage: () => import('./CannotLoadImage.vue'),
  },
  data: () => ({
    isValidUrl: true,
    timer: null,
  }),
  methods: {
    testImageUrl() {
      const imageElement = new window.Image()
      imageElement.src = this.src
      this.timer = setTimeout(() => {
        if (!imageElement.complete || !imageElement.naturalWidth) {
          this.invalidate()
        }
      }, this.timeout)
    },
    invalidate() {
      this.$emit('invalidated')
      this.isValidUrl = false
    },
    validate() {
      this.$emit('validated')
      this.isValidUrl = true
    },
    initialize() {
      window.clearTimeout(this.timer)
      this.validate()
      this.timer = null
      this.testImageUrl()
    },
  },
  watch: {
    src: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.initialize()
        }
      },
    },
  },
  beforeDestroy: function() {
    window.clearTimeout(this.timer)
  },
}
</script>

<template>
  <div>
    <q-img
      :src="src"
      :alt="title"
      @error="invalidate"
      native-context-menu
      class="full-width full-height"
    >
      <template #error>
        <cannot-load-image :url="src" />
      </template>

      <cannot-load-image
        v-if="!isValidUrl"
        :url="src"
      />

      <template #loading>
        <q-spinner
          color="primary"
          size="1em"
        />
      </template>
    </q-img>
  </div>
</template>
