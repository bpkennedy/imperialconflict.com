export function uniqueUser ({ name, email, password, confirmPassword } = { name: null, email: null, password: null, confirmPassword: null }) {
  const userName = name ? name : Date.now().toString()
  return {
    name: userName,
    email: email ? email : userName + '@example.com',
    password: password ? password : 'pass1234',
    confirmPassword: confirmPassword ? confirmPassword : 'pass1234',
  }
}
