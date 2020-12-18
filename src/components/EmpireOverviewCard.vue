<script>
import { mapState } from 'vuex'
export default {
  components: {
    GameStat: () => import('./GameStat.vue'),
    TextAndLink: () => import('./TextAndLink.vue'),
    Card: () => import('./Card.vue'),
    CardBody: () => import('./CardBody.vue'),
    CardHeader: () => import('./CardHeader.vue'),
  },
    computed: {
    ...mapState(['currentEmpire']),
  },
}
</script>

<template>
  <card
    v-if="currentEmpire"
    :material-ripple="false"
    class="no-outline-style"
  >
    <card-header class="bg-grey-8">
      <q-item-section>
        <q-item-label>
          {{ currentEmpire.leader }} of {{ currentEmpire.name }}
        </q-item-label>
      </q-item-section>
    </card-header>

    <card-body>
      <template #content>
        <game-stat
          v-for="resource of currentEmpire.resources"
          :key="resource.name"
          :icon-url="resource.icon"
          :icon-alt="resource.name"
        >
          <template #labelValue>
            <span :class="resource.colorClass">
              {{ resource.amount }}
            </span>
          </template>
        </game-stat>
        <game-stat
          icon-url="https://imperialconflict.com/images/morale.png"
          class="q-pt-md"
        >
          Morale:
          <template #labelValue>
            {{ currentEmpire.morale }}
          </template>
        </game-stat>
        <game-stat
          icon-url="https://imperialconflict.com/images/Status/networth.png"
        >
          Networth:
          <template #labelValue>
            {{ currentEmpire.networth }}
          </template>
        </game-stat>
        <game-stat>
          &#9679; Planets:
          <template #labelValue>
            {{ currentEmpire.planets_count }}
          </template>
        </game-stat>
        <game-stat>
          &#9679; Population:
          <template #labelValue>
            {{ currentEmpire.population }}
          </template>
        </game-stat>
        <text-and-link
          text="&#9679; Race:"
          :link="currentEmpire.race_name"
        />
      </template>
    </card-body>
  </card>
</template>
