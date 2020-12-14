<script>
import { mapState } from 'vuex'
import { USER_PROFILE_REFRESH_REQUESTED_ACTION } from 'src/store'
export default {
  components: {
    ActiveEmpireCard: () => import('../components/ActiveEmpireCard.vue'),
  },
  computed: {
    ...mapState(['user', 'activeEmpires']),
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
  created() {
    this.$store.dispatch(USER_PROFILE_REFRESH_REQUESTED_ACTION)
  },
}
</script>

<template>
  <div>
    <h2 class="smaller-h1 q-pb-md q-my-none">
      Gate
    </h2>
    <div class="row justify-center items-center">
      <active-empire-card
        v-for="empire of activeEmpires"
        :key="empire.id"
        :active-empire="empire"
        class="q-mr-lg q-mb-lg empire-card"
        :class="{'full-width': $q.screen.lt.sm}"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.empire-card
  width: 18rem
  height: auto
</style>
