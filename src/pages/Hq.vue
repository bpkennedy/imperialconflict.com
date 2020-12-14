<script>
import { REQUESTED_CURRENT_EMPIRE_ACTION } from 'src/store'
export default {
  meta: {
    title: 'Headquarters | Imperial Conflict',
    titleTemplate: title => `${title}`,
    meta: {
      description: {
        name: 'description',
        content: 'This is your empire, Commander',
      },
      keywords: {
        name: 'keywords',
        content: '4x,space games,strategy games,persistent browser based games,pbbg,empire building,multiplayer',
      },
    },
  },
  created() {
    this.$store.dispatch(REQUESTED_CURRENT_EMPIRE_ACTION)
  },
}
</script>

<template>
  <div>
    <h2 class="smaller-h1 q-py-md q-my-none">
      HQ
    </h2>
  </div>
</template>
