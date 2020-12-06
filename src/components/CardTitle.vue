<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <q-card-section class="full-width bg-grey-9 dimmed text-white q-pa-sm">
    <div
      :class="{'text-center q-pl-none': $q.screen.lt.sm}"
      class="text-h6 q-pl-sm"
    >
      {{ title }}
    </div>
  </q-card-section>
</template>
