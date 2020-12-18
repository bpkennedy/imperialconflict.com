describe('Headquarters', function () {
  beforeEach(() => {
    cy.navigateToWelcome()
  })

  it('user can view current empire details on headquarters view', () => {

    cy.loginUser({
      email: 'foo@bar.baz',
      password: 'foobarbaz',
    })
    cy.verifyGatePage()

    cy.contains('Enter Virgo 2').click()
    cy.contains('Ilikepie of FoohonPie').should('be.visible')
    cy.contains('2,432,389').should('be.visible')
    cy.contains('Morale:').should('be.visible')
    cy.contains('110%').should('be.visible')
    cy.contains('Networth:').should('be.visible')
    cy.contains('Planets:').should('be.visible')
    cy.contains('Population:').should('be.visible')
    cy.contains('Race:').should('be.visible')
    cy.contains('Knockout Foohons').should('be.visible')

    cy.go('back')
    cy.contains('Enter Manthano 3').click()
    cy.contains('391,030').should('be.visible')
    cy.contains('6,060').should('be.visible')
    cy.contains('Peaceful Foohons').should('be.visible')
  })
})
