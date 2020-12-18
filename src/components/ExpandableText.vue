<script>
export default {
  props: {
    uniqueRef: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    minimumLines: {
      type: Number,
      default: 6,
    },
  },
  data: () => ({
    timeout: null,
    descriptionIsOverflowing: false,
    expanded: false,
  }),
  methods: {
    checkIfOverflowing() {
      if(this.$refs[this.uniqueRef].clientHeight < this.$refs[this.uniqueRef].scrollHeight) {
        this.descriptionIsOverflowing = true
      }
    },
  },
  mounted() {
    this.timeout = setTimeout(() => {  // the dom will sometimes update faster than vue has time to check dom heights
      this.checkIfOverflowing()
    }, 100)
  },
  beforeDestroy() {
    if (this.timeout) {
      window.clearTimeout(this.timer)
    }
  },
}
</script>

<template>
  <div>
    <div
      :ref="uniqueRef"
      class="q-mb-md ellipsis-3-lines"
      :class="{'no-ellipsis': expanded }"
      :style="{'-webkit-line-clamp': minimumLines}"
    >
      {{ content }}
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
  </div>
</template>

<style lang="sass" scoped>
.no-ellipsis
  -webkit-line-clamp: initial
  -webkit-box-orient: initial
</style>
