<script>
import { isBonusAmountGreen } from '../services/math'
import { PlanetBonus } from '../services/models'
export default {
  components: {
    SafeImage: () => import('./SafeImage.vue'),
  },
  props: {
    bonus: {
      type: PlanetBonus,
      required: true,
    },
  },
  data: () => ({
    isBonusAmountGreen,
  }),
}
</script>

<template>
  <div class="row col-12 justify-center">
    <safe-image
      :src="bonus.icon"
      :alt="bonus.name + ' icon'"
      class="bonus-image"
    />
    <div class="q-pl-xs text-capitalize">
      {{ bonus.name }}
    </div>
    <div
      class="q-pl-xs"
      :class="{'text-green-5': isBonusAmountGreen(bonus)}"
    >
      +{{ bonus.amount }}%
    </div>
  </div>
</template>

<style lang="sass" scoped>
.bonus-image
  width: 1rem
  height: 1rem
</style>
