<script>
import { mapState } from 'vuex'
import { PLANET_DETAILS_REQUESTED_ACTION } from 'src/store'
export default {
  components: {
    PlanetDetail: () => import('../components/PlanetDetail.vue'),
  },
  computed: {
    ...mapState(['loadedPlanetDetails']),
  },
  meta: {
    title: 'Planet | Imperial Conflict',
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
    this.$store.dispatch(PLANET_DETAILS_REQUESTED_ACTION, this.$route.params.planetId)
  },
}
</script>

<template>
  <div>
    <planet-detail
      v-if="loadedPlanetDetails"
      :planet-details="loadedPlanetDetails"
    />
  </div>
</template>
