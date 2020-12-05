<script>
export default {
  props: {
    url: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <div class="absolute-full flex flex-center bg-grey-7">
    <div class="text-center">
      Cannot load <br>
      <a
        :href="url"
        target="_blank"
        rel="noopener noreferrer"
      >
        image
      </a>
    </div>
  </div>
</template>
