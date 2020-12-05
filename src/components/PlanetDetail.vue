<script>
import { isBonusAmountGreen } from '../services/math'
import { PlanetView } from 'src/services/models'
export default {
  components: {
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
  <q-card
    class="fit column"
    dark
  >
    <q-card-section class="bg-grey-9 dimmed text-white q-pa-sm">
      <div
        class="text-h6 q-pl-sm"
        :class="{'text-center q-pl-none': $q.screen.lt.sm}"
      >
        Planet {{ planetDetails.planet.label }}
      </div>
    </q-card-section>
    <div class="q-pa-md">
      <q-card-section class="row justify-center items-start">
        <div class="column col-12 justify-center items-center">
          <safe-image
            :src="planetDetails.planet.image"
            :alt="`Planet ${planetDetails.planet.label} Image`"
            class="planet-image"
          />
        </div>
        <div
          v-for="bonus in planetDetails.planet.bonuses"
          :key="bonus.name"
          class="row col-12 justify-center items-center"
        >
          <safe-image
            :src="bonus.icon"
            :alt="bonus.name + ' icon'"
            class="full-height bonus-image"
          />
          <div class="full-height q-pl-xs text-capitalize">
            {{ bonus.name }}
          </div>
          <div
            class="full-height q-pl-xs"
            :class="{'text-green-5': isBonusAmountGreen(bonus)}"
          >
            +{{ bonus.amount }}%
          </div>
        </div>
      </q-card-section>

      <q-space />

      <q-card-section class="row justify-center items-start">
        <div class="column col-12 justify-center items-center">
          <div class="full-height q-pl-xs text-capitalize">
            Planet #{{ planetDetails.planet.number }} of <a
              href=""
              rel="noopener noreferrer"
            >
              The {{ planetDetails.system.name }} System {{ planetDetails.system.displayCoordinates }}
            </a>
          </div>
          <div class="full-height q-pl-xs text-capitalize">
            Empire: <a
              href=""
              rel="noopener noreferrer"
            >
              {{ planetDetails.empire.name }}
            </a>
          </div>
          <div class="full-height q-pl-xs text-capitalize">
            Family: <a
              href=""
              rel="noopener noreferrer"
            >
              #{{ planetDetails.empire.family_id }}
            </a>
          </div>
        </div>
      </q-card-section>

      <q-card-actions
        v-if="$q.screen.lt.sm"
        class="justify-center q-mt-auto"
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
    </div>
  </q-card>
</template>

<style lang="sass" scoped>
.planet-image
  width: 6.5rem
  height: 6.5rem
.bonus-image
  width: 1rem
  height: 1rem
</style>
