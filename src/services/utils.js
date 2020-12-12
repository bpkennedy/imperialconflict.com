export const validAlphaNumericString = value => {
  const universalCharSupportedAlphaNumRegex = /^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/
  return !!value.trim().match(universalCharSupportedAlphaNumRegex)
}

export const validEmailString = value => {
  const validBasicEmailRegex = /\S+@\S+\.\S+/
  return !!value.trim().match(validBasicEmailRegex)
}

export const isMatchingPasswords = (pass1, pass2) => {
  return pass1.trim() === pass2.trim()
}
