<script>
import { USER_LOGIN_SCHEMA } from '../services/formSchemas'
import { USER_LOGIN_SUBMIT_ACTION } from '../store'

export default {
  components: {
    DynamicForm: () => import('../components/DynamicForm.vue'),
  },
  data: () => ({
    USER_LOGIN_SCHEMA,
  }),
  methods: {
    handleLoginSubmit(formModels) {
      this.$store.dispatch(USER_LOGIN_SUBMIT_ACTION, formModels)
    },
  },
}
</script>

<template>
  <q-dialog
    :value="true"
    @hide="$router.push({ path: '/' })"
    :maximized="$q.screen.lt.sm"
  >
    <q-card
      class="user-forms-modal"
      :class="{'flex column justify-center align-center': $q.screen.lt.sm}"
    >
      <q-card-section :class="{'column full-width self-end': $q.screen.lt.sm}">
        <div
          class="text-h6"
          :class="{'text-center': $q.screen.lt.sm}"
        >
          Login
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <dynamic-form
          :form-schema="USER_LOGIN_SCHEMA"
          @submit="handleLoginSubmit"
          @cancel="$router.push({ path: '/' })"
          class="col-10"
        >
          <q-btn
            label="CANCEL"
            @click="$router.push({ path: '/' })"
            outline
            unelevated
          />
          <q-btn
            label="RESET"
            outline
            unelevated
            type="reset"
          />
          <q-btn
            color="primary"
            label="LOG IN"
            aria-label="Login User Button"
            unelevated
            type="submit"
          />
        </dynamic-form>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-body1 dense-btn-height inline-block">
          Don't have an account?
        </div>
        <q-btn
          unelevated
          flat
          dense
          class="q-ml-sm vertical-top"
          type="a"
          label="SIGN UP"
          to="/Register"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
