Cypress.Commands.add('connectWalletToDApp', () => {
    cy.switchToMetamaskWindow()
    cy.acceptMetamaskAccess().should('be.true')
    cy.switchToCypressWindow()
})