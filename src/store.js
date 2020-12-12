import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import { getActiveEmpires } from './api/ActiveEmpireModel'
import auth from './api/auth'
import { getPlanetView } from 'src/api/PlanetViewModel'
import { asyncRequestWithLoader } from 'src/api'
Vue.use(Vuex)

export const USER_REGISTRATION_SUBMIT_ACTION = 'USER_REGISTRATION_SUBMIT_ACTION'
export const USER_LOGIN_SUBMIT_ACTION = 'USER_LOGIN_SUBMIT_ACTION'
export const USER_LOGOUT_PRESS_ACTION = 'USER_LOGOUT_PRESS_ACTION'
export const USER_PROFILE_REFRESH_REQUESTED_ACTION = 'USER_PROFILE_REFRESH_REQUESTED_ACTION'
export const API_ERROR_OCCURRED_ACTION = 'API_ERROR_OCCURRED_ACTION'
export const CLEAR_API_ERROR_MESSAGE_ACTION = 'CLEAR_API_ERROR_MESSAGE_ACTION'
export const PLANET_DETAILS_REQUESTED_ACTION = 'PLANET_DETAILS_REQUESTED_ACTION'

const SET_USER_MUTATION = 'SET_USER_MUTATION'
const SET_API_ERROR_MUTATION = 'SET_API_ERROR_MUTATION'
const SET_LOADED_PLANET_VIEW_MUTATION = 'SET_LOADED_PLANET_VIEW_MUTATION'
const SET_ACTIVE_EMPIRES_MUTATION = 'SET_ACTIVE_EMPIRES_MUTATION'
const RESET_MODULE_MUTATION = 'RESET_MODULE_MUTATION'

const initialState = () => ({
  apiErrorMessage: null,
  loadedPlanetDetails: null,
  activeEmpires: [],
  user: null,
})

const setValue = key => (state, val) => {
  state[key] = val
}

export default new Vuex.Store({
  state: initialState,
  actions: {
    async [USER_PROFILE_REFRESH_REQUESTED_ACTION]({ commit, state }) {
      await asyncRequestWithLoader({
        tryCb: async () => {
          await auth.setProfile()
          commit(SET_USER_MUTATION, auth.profile)
          commit(SET_ACTIVE_EMPIRES_MUTATION, getActiveEmpires(state) || [])
        },
      })
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
          dispatch(USER_PROFILE_REFRESH_REQUESTED_ACTION)
          router.push('/gate')
        },
      })
    },
    async [USER_LOGIN_SUBMIT_ACTION]({ dispatch }, formModels) {
      await asyncRequestWithLoader({
        tryCb: async () => {
          await auth.login(formModels)
          dispatch(USER_PROFILE_REFRESH_REQUESTED_ACTION)
          router.push('/gate')
        },
      })
    },
    async [USER_LOGOUT_PRESS_ACTION]({ commit }) {
      await asyncRequestWithLoader({
        tryCb: async () => {
          auth.logout()
          commit(RESET_MODULE_MUTATION)
          await router.push('/')
        },
      })
    },
    async [PLANET_DETAILS_REQUESTED_ACTION]({ commit }, planetId) {
      await asyncRequestWithLoader({
        tryCb: async () => {
          commit(SET_LOADED_PLANET_VIEW_MUTATION, await getPlanetView(planetId))
        },
      })
    },
  },
  mutations: {
    [SET_USER_MUTATION]: setValue('user'),
    [SET_API_ERROR_MUTATION]: setValue('apiErrorMessage'),
    [SET_LOADED_PLANET_VIEW_MUTATION]: setValue('loadedPlanetDetails'),
    [SET_ACTIVE_EMPIRES_MUTATION]: setValue('activeEmpires'),
    [RESET_MODULE_MUTATION](state) {
      Object.assign(state, initialState())
    },
  },
  getters: {},
})
