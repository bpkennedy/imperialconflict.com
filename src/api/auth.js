import Vue from 'vue'
import { LocalStorage } from 'quasar'
import {
  messages,
  FAIL_REGISTER_MESSAGE,
  INVALID_LOGIN_MESSAGE,
  FAIL_LOGIN_MESSAGE,
  FAIL_GET_USER_MESSAGE,
} from '../services/messages'
import store, { API_ERROR_OCCURRED_ACTION } from '../store'
import { errorMessageFromApiResponse } from 'src/api/index'

export const STORAGE_PREFIX = 'imperialConflict'
const AUTH_TOKEN_NAME = STORAGE_PREFIX + 'UserToken'

export default {
  profile: null,
  async registerUser({ name, email, password }) {
    try {
      const response = await Vue.prototype.$axios.post('/register', { name, email, password })
      this.setAxiosAuthHeader(response.data.data.token)
    } catch(error) {
      let errorMessage = errorMessageFromApiResponse(error)
      store.dispatch(API_ERROR_OCCURRED_ACTION, messages[FAIL_REGISTER_MESSAGE](errorMessage))
      throw errorMessage
    }
  },
  async login({ email, password }) {
    try {
      const response = await Vue.prototype.$axios.post('/login', { email, password })
      this.setAxiosAuthHeader(response.data.data.token)
    } catch(error) {
      if (error.response.data && error.response.data.message === 'Unauthorized') {
        store.dispatch(API_ERROR_OCCURRED_ACTION, messages[INVALID_LOGIN_MESSAGE])
      } else {
        store.dispatch(API_ERROR_OCCURRED_ACTION, messages[FAIL_LOGIN_MESSAGE])
      }
      throw error
    }
  },
  logout() {
    this.profile = null
    LocalStorage.remove(AUTH_TOKEN_NAME)
    delete Vue.prototype.$axios.defaults.headers.common['Authorization']
  },
  async getUser() {
    try {
      const response = await Vue.prototype.$axios.get('/user')
      return response.data.data
    } catch(error) {
      store.dispatch(API_ERROR_OCCURRED_ACTION, messages[FAIL_GET_USER_MESSAGE])
      throw error
    }
  },
  async setProfile() {
    if (Vue.prototype.$axios.defaults.headers.common['Authorization']) {
      this.profile = await this.getUser()
    } else {
      this.profile = null
    }
    return this.profile
  },
  setAxiosAuthHeader(token) {
    if (token) {
      LocalStorage.set(AUTH_TOKEN_NAME, token)
    }
    Vue.prototype.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorage.getItem(AUTH_TOKEN_NAME)
  },
  loggedIn() {
    return LocalStorage.has(AUTH_TOKEN_NAME)
  },
}
