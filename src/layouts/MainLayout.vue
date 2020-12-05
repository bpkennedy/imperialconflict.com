<script>
import { USER_LOGOUT_PRESS_ACTION } from '../store'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      left: false,
      right: false,
      USER_LOGOUT_PRESS_ACTION,
    }
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header
      elevated
      class="bg-primary text-white"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="left = !left"
        />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>

        <q-btn
          v-if="user"
          dense
          flat
          outline
          label="LOG OUT"
          aria-label="LOG OUT"
          type="a"
          @click="$store.dispatch(USER_LOGOUT_PRESS_ACTION)"
        />
        <q-btn
          v-else
          dense
          flat
          outline
          label="LOG IN"
          aria-label="LOG IN"
          type="a"
          text-color="white"
          to="/Login"
        />
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="right = !right"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="left"
      side="left"
      bordered
    >
      <!-- drawer content -->
    </q-drawer>

    <q-drawer
      v-model="right"
      side="right"
      bordered
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
