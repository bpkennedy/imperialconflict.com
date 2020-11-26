export const FAIL_REGISTER_MESSAGE = 'FAIL_REGISTER_MESSAGE'
export const FAIL_LOGIN_MESSAGE = 'FAIL_LOGIN_MESSAGE'
export const INVALID_LOGIN_MESSAGE = 'INVALID_LOGIN_MESSAGE'
export const FAIL_GET_USER_MESSAGE = 'FAIL_GET_USER_MESSAGE'
export const PASSWORD_MUST_MATCH_MESSAGE = 'PASSWORD_MUST_MATCH_MESSAGE'

export const messages = {
  [FAIL_REGISTER_MESSAGE]: message => ({
    message: `${message || 'Whoops! There was an issue trying to register.'}`,
    color: 'negative',
    type: 'negative',
  }),
  [FAIL_LOGIN_MESSAGE]: {
    message: 'Whoops! There was an issue trying to login.',
    color: 'negative',
    type: 'negative',
  },
  [INVALID_LOGIN_MESSAGE]: {
    message: 'Failed to login with the provided email and password.',
    color: 'negative',
    type: 'negative',
  },
  [FAIL_GET_USER_MESSAGE]: {
    message: 'Whoops! There was an issue trying to retrieve your user profile',
    color: 'negative',
    type: 'negative',
  },
  [PASSWORD_MUST_MATCH_MESSAGE]: {
    message: 'Passwords must match!',
    color: 'negative',
    type: 'negative',
  },
}
