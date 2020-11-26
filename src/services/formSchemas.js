export const USER_LOGIN_SCHEMA = 'userLogin'
export const USER_REGISTER_SCHEMA = 'userRegister'

const userLogin = {
  email: {},
  password: {},
}

const userRegister = {
  name: {},
  email: {},
  password: {},
  confirmPassword: {},
}

const formSchemas = {
  [USER_LOGIN_SCHEMA]: userLogin,
  [USER_REGISTER_SCHEMA]: userRegister,
}

export const schema = schemaName => {
  return formSchemas[schemaName] ? formSchemas[schemaName] : throw new Error(`Form Schema ${schemaName} is not defined`)
}
