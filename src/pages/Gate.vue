<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user']),
  },
  meta: {
    title: 'Gate | Imperial Conflict',
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
}
</script>

<template>
  <q-page class="row justify-center items-start">
    <div class="column col-12 col-sm-10 col-md-8 q-pa-md">
      <h1 class="smaller-h1 q-py-md q-my-none">
        Gate
      </h1>
      <p>{{ user }}</p>
    </div>
  </q-page>
</template>
