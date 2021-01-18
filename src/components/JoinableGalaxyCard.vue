<script>
import { JoinableGalaxy } from '../api/JoinableGalaxyModel'
export default {
  components: {
    SafeImage: () => import('./SafeImage.vue'),
    Card: () => import('./Card.vue'),
    CardBody: () => import('./CardBody.vue'),
    CardHeader: () => import('./CardHeader.vue'),
    ExpandableText: () => import('./ExpandableText.vue'),
  },
  props: {
    joinableGalaxy: {
      type: JoinableGalaxy,
      required: true,
    },
  },
  data: () => ({
    isGoodGalaxyImage: true,
  }),
  methods: {
    joinGalaxy() {
      console.log('clicked to join galaxy')
    },
  },
}
</script>

<template>
  <card
    @click="joinGalaxy"
    class-list="primary-outline"
  >
    <card-header>
      <q-item-section>
        <q-item-label>{{ joinableGalaxy.empires_count_joined }}/{{ joinableGalaxy.empires_count_total }} Empires</q-item-label>
        <q-item-label caption>
          {{ joinableGalaxy.families_count }} Families
        </q-item-label>
      </q-item-section>
    </card-header>

    <card-body class="short-card-body-height">
      <template #image>
        <safe-image
          v-if="isGoodGalaxyImage"
          :src="joinableGalaxy.map_image_path"
          :alt="`${joinableGalaxy.name} Galaxy Image`"
          @validated="isGoodGalaxyImage = true"
          @invalidated="isGoodGalaxyImage = false"
          class="full-width"
        />
      </template>
      <template #content>
        <expandable-text
          :unique-ref="`galaxy-${joinableGalaxy.id}description`"
          :content="joinableGalaxy.description"
        />
      </template>
    </card-body>

    <q-separator />

    <q-card-section class="text-uppercase text-weight-medium">
      Join {{ joinableGalaxy.name }}
    </q-card-section>
  </card>
</template>
