<script>
import { PlanetView } from 'src/api/PlanetViewModel'
export default {
  components: {
    CardTitle: () => import('./CardTitle.vue'),
    TextAndLink: () => import('./TextAndLink.vue'),
    PlanetBonus: () => import('./PlanetBonus.vue'),
    SafeImage: () => import('./SafeImage.vue'),
  },
  props: {
    planetDetails: {
      type: PlanetView,
      required: true,
    },
  },
}
</script>

<template>
  <q-card class="full-height column items-center">
    <card-title :title="`Planet ${planetDetails.planet.label}`" />
    <q-card-section>
      <safe-image
        :src="planetDetails.planet.image"
        :alt="`Planet ${planetDetails.planet.label} Image`"
        class="planet-image"
      />
      <planet-bonus
        v-for="bonus in planetDetails.planet.bonuses"
        :key="bonus.name"
        :bonus="bonus"
      />
    </q-card-section>

    <q-card-section class="text-center">
      <text-and-link
        :text="`Planet #${planetDetails.planet.number} of`"
        :link="`The ${planetDetails.system.name} System ${planetDetails.system.displayCoordinates}`"
      />
      <text-and-link
        text="Empire:"
        :link="planetDetails.empire.name"
      />
      <text-and-link
        text="Family:"
        :link="`#${planetDetails.empire.family_id}`"
      />
    </q-card-section>

    <q-card-actions
      v-if="$q.screen.lt.sm"
      class="justify-center"
    >
      <q-btn
        label="SYSTEM"
        outline
        unelevated
      />
      <q-btn
        label="MAP"
        outline
        unelevated
      />
    </q-card-actions>
  </q-card>
</template>

<style lang="sass" scoped>
.planet-image
  width: 6.5rem
  height: 6.5rem
</style>
