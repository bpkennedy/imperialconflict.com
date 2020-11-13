<script>
export default {}
</script>

<template>
  <q-page class="flex flex-center fullscreen column bg-black">
    <h1
      role="heading"
      aria-level="1"
      class="game-title row text-white q-mb-md"
    >
      Imperial Conflict
    </h1>
    <div class="row q-py-sm">
      <q-btn
        unelevated
        rounded
        color="primary"
        class="text-weight-regular"
        padding=".75rem 3rem"
        label="create an empire"
        aria-label="create an empire"
      />
      <q-btn
        unelevated
        rounded
        color="white"
        text-color="black"
        class="q-ml-xs text-weight-regular"
        padding=".75rem 3rem"
        label="log in"
        aria-label="log in"
      />
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
.game-title
  font-size: 2.5rem
  line-height: 2.5rem
</style>
