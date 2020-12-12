import { uniqueUser } from '../util'

describe('Login', function () {
  beforeEach(() => {
    cy.navigateToWelcome()
  })

  it('should start with new user not logged in', () => {
    cy.contains('LOG IN').click()
    cy.loginFormExists()
    cy.contains('CANCEL').click()
    cy.contains('CREATE AN EMPIRE').click()
    cy.registerFormExists()
    cy.contains('CANCEL').click()
    cy.verifyHomepage()
  })

  it('should redirect unauthenticated users hitting protected routes to welcome page', () => {
    cy.visit('/gate')
    cy.verifyHomepage()
  })

  it('should register, automatically login/get profile, and navigate to Gate page', () => {
    const user = uniqueUser()
    cy.registerUser(user)
    cy.verifyGatePage()
  })

  it('should fail to register with non-matching passwords', () => {
    const user = uniqueUser({ password: 'pass1234', confirmPassword: 'badNonMatchingPassword' })
    cy.registerUser(user)
    cy.contains('Passwords must match!').should('be.visible')
    cy.typeIntoFormField('Password Confirm *', 'pass1234')
    cy.getAriaLabel('Register User Button').click()
    cy.verifyGatePage()
  })

  it('should not allow registration with duplicate email addresses', () => {
    const user = uniqueUser()
    cy.registerUser(user)
    cy.verifyGatePage()
    cy.logout()
    cy.registerUser(user)
    cy.contains('The email has already been taken').should('be.visible')
  })

  it('should show an error if logging in with bad password', () => {
    const user = uniqueUser({ password: 'goodPassword', confirmPassword: 'goodPassword' })
    cy.registerUser(user)
    cy.verifyGatePage()
    cy.logout()
    cy.loginUser({ email: user.email, password: 'wrongPassword' })
    cy.contains('Failed to login with the provided email and password').should('be.visible')
    cy.typeIntoFormField('Password *', 'goodPassword')
    cy.getAriaLabel('Login User Button').click()
    cy.verifyGatePage()
  })

  it('should use localStorage auth token on soft browser refresh', () => {
    const user = uniqueUser()
    cy.registerUser(user)
    cy.logout()
    cy.loginUser({ email: user.email, password: user.password })
    cy.verifyGatePage()
    cy.reload()
    cy.verifyGatePage()
  })
})
