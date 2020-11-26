<script>
import { USER_REGISTER_SCHEMA } from '../services/formSchemas'
import { API_ERROR_OCCURRED_ACTION, USER_REGISTRATION_SUBMIT_ACTION } from '../store'
import { isMatchingPasswords } from '../services/utils'
import { messages, PASSWORD_MUST_MATCH_MESSAGE } from '../services/messages'

export default {
  components: {
    DynamicForm: () => import('../components/DynamicForm.vue'),
  },
  data: () => ({
    USER_REGISTER_SCHEMA,
  }),
  methods: {
    handleRegisterSubmit(formModels) {
      if (isMatchingPasswords(formModels.password, formModels.confirmPassword)) {
        this.$store.dispatch(USER_REGISTRATION_SUBMIT_ACTION, formModels)
      } else {
        this.$store.dispatch(API_ERROR_OCCURRED_ACTION, messages[PASSWORD_MUST_MATCH_MESSAGE])
      }
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
          Register
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <dynamic-form
          :form-schema="USER_REGISTER_SCHEMA"
          @submit="handleRegisterSubmit"
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
            label="REGISTER"
            aria-label="Register User Button"
            unelevated
            type="submit"
          />
        </dynamic-form>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-body1 dense-btn-height inline-block">
          Already have an account?
        </div>
        <q-btn
          unelevated
          flat
          dense
          class="q-ml-sm vertical-top"
          type="a"
          label="LOG IN"
          to="/Login"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="sass" scoped>
.mobile-heading
  max-height: 2rem
</style>
