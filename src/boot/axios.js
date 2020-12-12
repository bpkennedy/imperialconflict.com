import axios from 'axios'
import auth from '../api/auth'
import { USER_PROFILE_REFRESH_REQUESTED_ACTION } from '../store'

export default async ({ store, Vue }) => {
  console.log('API Base URL environment variable is: ' + process.env.API_BASE_URL)
  axios.defaults.baseURL = process.env.API_BASE_URL
  Vue.prototype.$axios = axios

  if (auth.loggedIn()) {
    auth.setAxiosAuthHeader()
    await store.dispatch(USER_PROFILE_REFRESH_REQUESTED_ACTION)
  }
}
