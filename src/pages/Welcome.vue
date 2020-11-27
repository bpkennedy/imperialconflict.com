<script>
export default {
  meta: {
    title: 'Imperial Conflict',
    titleTemplate: title => `${title} | Rule The Galaxy`,
    meta: {
      description: {
        name: 'description',
        content: 'Greetings, Commander. Your Empire awaits',
      },
      keywords: {
        name: 'keywords',
        content: '4x,space games,strategy games,persistent browser based games,pbbg,empire building,multiplayer',
      },
    },
  },
}
</script>

<template>
  <q-page class="flex flex-center column">
    <h1
      role="heading"
      aria-level="1"
      class="game-title row text-white q-mb-md"
    >
      Imperial Conflict
    </h1>
    <div
      class="row q-py-sm"
      :class="{'column': $q.screen.lt.sm}"
    >
      <q-btn
        unelevated
        rounded
        color="primary"
        class="text-weight-regular"
        padding=".75rem 3rem"
        label="CREATE AN EMPIRE"
        aria-label="CREATE AN EMPIRE"
        type="a"
        to="/register"
      />
      <q-btn
        unelevated
        rounded
        color="white"
        text-color="black"
        class="q-ml-xs text-weight-regular"
        :class="{'q-mt-md': $q.screen.lt.sm}"
        padding=".75rem 3rem"
        label="LOG IN"
        aria-label="LOG IN"
        type="a"
        to="/login"
      />
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
.game-title
  font-size: 2.5rem
  line-height: 2.5rem
</style>
