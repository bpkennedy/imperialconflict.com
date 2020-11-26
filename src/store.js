import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import { asyncRequestWithLoader } from './services/utils'
import auth from './services/auth'
Vue.use(Vuex)

export const USER_REGISTRATION_SUBMIT_ACTION = 'USER_REGISTRATION_SUBMIT_ACTION'
export const USER_LOGIN_SUBMIT_ACTION = 'USER_LOGIN_SUBMIT_ACTION'
export const USER_LOGOUT_PRESS_ACTION = 'USER_LOGOUT_PRESS_ACTION'
export const USER_PROFILE_UPDATED_ACTION = 'USER_PROFILE_UPDATED_ACTION'
export const API_ERROR_OCCURRED_ACTION = 'API_ERROR_OCCURRED_ACTION'
export const CLEAR_API_ERROR_MESSAGE_ACTION = 'CLEAR_API_ERROR_MESSAGE_ACTION'

const SET_USER_MUTATION = 'SET_USER_MUTATION'
const SET_API_ERROR_MUTATION = 'SET_API_ERROR_MUTATION'

const initialState = () => ({
  user: null,
  apiErrorMessage: null,
})

const setValue = key => (state, val) => {
  state[key] = val
}

export default new Vuex.Store({
  state: initialState,
  actions: {
    [USER_PROFILE_UPDATED_ACTION]({ commit }) {
      commit(SET_USER_MUTATION, auth.profile)
    },
    [API_ERROR_OCCURRED_ACTION]({ commit }, apiErrorMessage) {
      commit(SET_API_ERROR_MUTATION, apiErrorMessage)
    },
    [CLEAR_API_ERROR_MESSAGE_ACTION]({ commit }) {
      commit(SET_API_ERROR_MUTATION, null)
    },
    async [USER_REGISTRATION_SUBMIT_ACTION]({ dispatch }, formModels) {
      await asyncRequestWithLoader({
        tryCb: async () => {
          await auth.registerUser(formModels)
          await auth.setProfile()
          dispatch(USER_PROFILE_UPDATED_ACTION)
          router.push('/gate')
        },
      })
    },
    async [USER_LOGIN_SUBMIT_ACTION]({ dispatch }, formModels) {
      await asyncRequestWithLoader({
        tryCb: async () => {
          await auth.login(formModels)
          await auth.setProfile()
          dispatch(USER_PROFILE_UPDATED_ACTION)
          router.push('/gate')
        },
      })
    },
    async [USER_LOGOUT_PRESS_ACTION]({ dispatch }) {
      await asyncRequestWithLoader({
        tryCb: async () => {
          auth.logout()
          dispatch(USER_PROFILE_UPDATED_ACTION)
          await router.push('/')
        },
      })
    },
  },
  mutations: {
    [SET_USER_MUTATION]: setValue('user'),
    [SET_API_ERROR_MUTATION]: setValue('apiErrorMessage'),
  },
  getters: {},
})
