<script>
export default {}
</script>

<template>
  <q-page class="row justify-center items-start">
    <div
      class="column col-12 q-pa-md self-stretch"
      :class="{'q-px-xs': $q.screen.lt.sm}"
    >
      <slot />
    </div>
  </q-page>
</template>
