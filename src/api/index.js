import { Loading } from 'quasar'

export const asyncRequestWithLoader = async ({
  loadingMessage,
  tryCb,
  catchCb,
  finallyCb,
} = {
  loadingMessage: null,
  tryCb: null,
  catchCb: null,
  finallyCb: null,
}) => {
  loadingMessage ? Loading.show({ message: loadingMessage }) : null
  try {
    await tryCb()
  } catch (error) {
    catchCb ? await catchCb(error) : null
  } finally {
    finallyCb ? await finallyCb() : null
    loadingMessage ? Loading.hide() : null
  }
}

export const errorMessageFromApiResponse = error => {
  let errorBody = error.response.data.message ? [error.response.data.message] : ['There was an error.']
  if (error.response.data.errors) {
    for (let value of Object.values(error.response.data.errors)) {
      errorBody.push(value)
    }
  }
  return errorBody.join(' ')
}
