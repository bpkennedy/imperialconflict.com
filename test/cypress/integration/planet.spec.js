describe('Planet', function () {
  beforeEach(() => {
    cy.navigateToPlanet()
  })

  it('should load the planets page', () => {
    cy.title().should('include', 'Planet | Imperial Conflict')
    cy.url().should('include', '/planets/89,8,45,2')

    cy.contains('Planet 89,8,45,2')

    cy.contains('iron')
    cy.contains('food')
    cy.contains('octarine')
    cy.contains('endurium')

    cy.contains('Planet #2')
    cy.contains('Empire:')
    cy.contains('Family:')
  })
})
