<script>
import { PlanetView } from 'src/api/PlanetViewModel'
import { isBonusAmountGreen } from 'src/services/math'
export default {
  components: {
    GameStat: () => import('./GameStat.vue'),
    Card: () => import('./Card.vue'),
    CardBody: () => import('./CardBody.vue'),
    CardHeader: () => import('./CardHeader.vue'),
    TextAndLink: () => import('./TextAndLink.vue'),
    SafeImage: () => import('./SafeImage.vue'),
  },
  props: {
    planetDetails: {
      type: PlanetView,
      required: true,
    },
  },
  data: () => ({
    isBonusAmountGreen,
  }),
}
</script>

<template>
  <card
    :material-ripple="false"
    class="full-height no-outline-style"
  >
    <card-header class="bg-grey-9 dimmed text-white">
      <q-item-section>
        <q-item-label
          class="text-h6"
          :class="{'text-center q-pl-none': $q.screen.lt.sm}"
        >
          Planet {{ planetDetails.planet.label }}
        </q-item-label>
      </q-item-section>
    </card-header>

    <card-body class="text-center">
      <template #image>
        <div class="row items-center justify-center q-pt-lg">
          <safe-image
            :src="planetDetails.planet.image"
            :alt="`Planet ${planetDetails.planet.label} Image`"
            class="planet-image col-12"
          />
        </div>
      </template>

      <template #content>
        <game-stat
          v-for="bonus in planetDetails.planet.bonuses"
          :key="bonus.name"
          :icon-url="bonus.icon"
          class="row col-12 justify-center"
        >
          <template #labelValue>
            <div
              class="q-pl-xs"
              :class="{'text-green-5': isBonusAmountGreen(bonus)}"
            >
              +{{ bonus.amount }}%
            </div>
          </template>
          {{ bonus.name }}
        </game-stat>

        <text-and-link
          :text="`Planet #${planetDetails.planet.number} of`"
          :link="`The ${planetDetails.system.name} System ${planetDetails.system.displayCoordinates}`"
          class="q-pt-md"
        />
        <text-and-link
          text="Empire:"
          :link="planetDetails.empire.name"
        />
        <text-and-link
          text="Family:"
          :link="`#${planetDetails.empire.family_id}`"
        />
      </template>
    </card-body>

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
  </card>
</template>

<style lang="sass" scoped>
.planet-image
  width: 6.5rem
  height: 6.5rem
</style>
