<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <div class="q-pl-xs text-capitalize">
    <span v-html="text" />
    <a
      href=""
      rel="noopener noreferrer"
    >
      {{ link }}
    </a>
  </div>
</template>
