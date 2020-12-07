describe('Welcome', function () {
  beforeEach(() => {
    cy.navigateToWelcome()
  })

  it('should load the welcome page', () => {
    cy.title().should('include', 'Imperial Conflict | Rule The Galaxy')
    cy.contains('Imperial Conflict')
    cy.contains('CREATE AN EMPIRE')
    cy.contains('LOG IN')
  })
})
