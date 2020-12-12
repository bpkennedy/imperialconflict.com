Cypress.Commands.add('navigateToWelcome', () => {
  cy.visit('/')
})

Cypress.Commands.add('navigateToPlanet', () => {
  cy.visit('/planets/89,8,45,2')
})

Cypress.Commands.add('goLogin', () => {
  cy.contains('LOG IN').click()
  cy.verifyNotHomepage()
  cy.loginFormExists()
})

Cypress.Commands.add('loginFormExists', () => {
  cy.contains('Email *').should('be.visible')
  cy.contains('Password *').should('be.visible')
})

Cypress.Commands.add('registerFormExists', () => {
  cy.contains('Name *').should('be.visible')
  cy.contains('Email *').should('be.visible')
  cy.contains('Password *').should('be.visible')
  cy.contains('Password Confirm *').should('be.visible')
})

Cypress.Commands.add('verifyHomepage', () => {
  cy.contains('Imperial Conflict').should('be.visible')
})

Cypress.Commands.add('verifyNotHomepage', () => {
  cy.contains('Imperial Conflict').should('not.be.visible')
})

Cypress.Commands.add('verifyGatePage', () => {
  cy.contains('Gate').should('be.visible')
})

Cypress.Commands.add('registerUser', ({ name, email, password, confirmPassword }) => {
  cy.contains('CREATE AN EMPIRE').click()
  cy.typeIntoFormField('Name *', name)
  cy.typeIntoFormField('Email *', email)
  cy.typeIntoFormField('Password *', password)
  cy.typeIntoFormField('Password Confirm *', confirmPassword)
  cy.getAriaLabel('Register User Button').click()
})

Cypress.Commands.add('loginUser', ({ email, password }) => {
  cy.contains('LOG IN').click()
  cy.typeIntoFormField('Email *', email)
  cy.typeIntoFormField('Password *', password)
  cy.getAriaLabel('Login User Button').click()
})

Cypress.Commands.add('logout', () => {
  cy.contains('LOG OUT').click()
})

Cypress.Commands.add('goGate', () => {
  cy.visit('/gate')
  cy.verifyNotHomepage()
  cy.verifyGatePage()  // must be logged in or will redirect to login
})

Cypress.Commands.add('getAriaLabel',  {prevSubject: 'optional'}, (subject, label) => {
  if (subject) {
    return cy.wrap(subject).find(`*[aria-label="${label}"]`)
  } else {
    return cy.get(`*[aria-label="${label}"]`)
  }
})

Cypress.Commands.add('typeIntoFormField', (labelText, text) => {
  cy.get('label:contains("' + labelText + '")').click()
  cy.focused().clear().type(text)
})

Cypress.Commands.add('expectHTML5ValidationMessage', (inputType, message) => {
  cy.get(`[type="${inputType}"]`).then(($input) => {
    expect($input[0].validationMessage).to.eq(message)
  })
})
