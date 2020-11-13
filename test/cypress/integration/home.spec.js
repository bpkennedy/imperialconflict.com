describe('Home', function () {
  beforeEach(() => {
    cy.loadHomeRoute()
  })

  it('should load up the homepage', () => {
    cy.title().should('include', 'Imperial Conflict')
  })
})
