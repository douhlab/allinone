describe('Default page', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Application \'allinone\' is running')
  })
})
