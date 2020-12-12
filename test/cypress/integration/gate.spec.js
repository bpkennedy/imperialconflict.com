describe('Gate', function () {
  beforeEach(() => {
    cy.navigateToWelcome()
  })

  it('user with active empires should see theirs on the Gate page', () => {
    cy.loginUser({
      email: 'foo@bar.baz',
      password: 'foobarbaz',
    })
    cy.verifyGatePage()
    cy.contains('#7143').should('be.visible')
    cy.contains('Enter Virgo 2').should('be.visible')
    cy.contains('#7567').should('be.visible')
    cy.contains('Enter Manthano 3').should('be.visible')
    cy.contains('FoohonPie').should('be.visible')
  })

  it('user can only see their own active empires on the Gate page', () => {
    cy.loginUser({
      email: 'foo@bar.baz',
      password: 'foobarbaz',
    })
    cy.verifyGatePage()
    cy.contains('#7143').should('be.visible')
    cy.contains('Enter Virgo 2').should('be.visible')
    cy.contains('#7567').should('be.visible')
    cy.contains('Enter Manthano 3').should('be.visible')
    cy.contains('FoohonPie').should('be.visible')
    cy.contains('Bar2').should('not.exist')

    cy.logout()
    cy.loginUser({
      email: 'foo2@bar.baz',
      password: 'foobarbaz',
    })
    cy.verifyGatePage()

    cy.contains('#7143').should('be.visible')
    cy.contains('Enter Virgo 2').should('be.visible')
    cy.contains('Bar2').should('be.visible')

    // Bar2 should not be able to see FoohonPie's active empires
    cy.contains('#7567').should('not.exist')
    cy.contains('Enter Manthano 3').should('not.exist')
    cy.contains('FoohonPie').should('not.exist')

  })
})
