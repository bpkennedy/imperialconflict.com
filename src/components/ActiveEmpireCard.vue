<script>
import { ActiveEmpire } from '../api/ActiveEmpireModel'
import { SELECTED_CURRENT_EMPIRE_ACTION } from '../store'
export default {
  components: {
    SafeImage: () => import('./SafeImage.vue'),
    Card: () => import('./Card.vue'),
    CardBody: () => import('./CardBody.vue'),
    CardHeader: () => import('./CardHeader.vue'),
    ExpandableText: () => import('./ExpandableText.vue'),
  },
  props: {
    activeEmpire: {
      type: ActiveEmpire,
      required: true,
    },
  },
  data: () => ({
    isGoodAvatar: true,
    isGoodEmpireImage: true,
  }),
  methods: {
    selectEmpire() {
      this.$store.dispatch(SELECTED_CURRENT_EMPIRE_ACTION, this.activeEmpire.id)
    },
  },
}
</script>

<template>
  <card
    @click="selectEmpire"
    class-list="primary-outline"
  >
    <card-header>
      <q-item-section
        v-if="activeEmpire.avatar_url && isGoodAvatar"
        avatar
      >
        <safe-image
          :src="activeEmpire.avatar_url"
          :alt="`${activeEmpire.name} Image`"
          @validated="isGoodAvatar = true"
          @invalidated="isGoodAvatar = false"
          class="avatar-image"
        />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ activeEmpire.name }}</q-item-label>
        <q-item-label caption>
          Family #{{ activeEmpire.family_id }}
        </q-item-label>
      </q-item-section>
    </card-header>

    <card-body class="short-card-body-height">
      <template #image>
        <safe-image
          v-if="isGoodEmpireImage"
          :src="activeEmpire.galaxy.map_image_path"
          :alt="`${activeEmpire.name} Galaxy Image`"
          @validated="isGoodEmpireImage = true"
          @invalidated="isGoodEmpireImage = false"
          class="full-width"
        />
      </template>
      <template #content>
        <expandable-text
          :unique-ref="`empire-${activeEmpire.id}description`"
          :content="activeEmpire.galaxy.description"
        />
      </template>
    </card-body>

    <q-separator />

    <q-card-section class="text-uppercase text-weight-medium">
      Enter {{ activeEmpire.galaxy.name }}
    </q-card-section>
  </card>
</template>
