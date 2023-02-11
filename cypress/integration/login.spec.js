it('successfully logs in', () => {
    cy.intercept('GET', '**/notes').as('getNotes')
    cy.login()
    cy.wait('@getNotes', {timeout: 90000})
    cy.contains('h1', 'Your Notes').should('be.visible')

})