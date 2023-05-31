Cypress.Commands.add('openHomePage', (options?) => {
    cy.visit('/', options)
})