import { HomePageLocators } from "../locators/homepage"
const deployCollectionLocators = HomePageLocators.DeployCollectionForm

Cypress.Commands.add('submitDeployCollectionForm', (collectionName, collectionSymbol, collectionTokenUri, options?, typeOptions?, clickOptions?) => {
    cy.enterCollectionName(collectionName, options, typeOptions)
    cy.enterCollectionSymbol(collectionSymbol, options, typeOptions)
    cy.enterCollectionTokenURI(collectionTokenUri, options, typeOptions)
    cy.clickCreateBtnToDeployCollection(options, clickOptions)
})

Cypress.Commands.add('enterCollectionName', (name, options?, typeOptions?) => {
    cy.get(deployCollectionLocators.collectionNameInput, options).type(name, typeOptions)
})

Cypress.Commands.add('enterCollectionSymbol', (symbol, options?, typeOptions?) => {
    cy.get(deployCollectionLocators.collectionSymbolInput, options).type(symbol, typeOptions)
})

Cypress.Commands.add('enterCollectionTokenURI', (tokenURI, options?, typeOptions?) => {
    cy.get(deployCollectionLocators.collectionTokenUriInput, options).type(tokenURI, typeOptions)
})

Cypress.Commands.add('clickCreateBtnToDeployCollection', (options?, clickOptions?) => {
    cy.get(deployCollectionLocators.createBtn, options).click(clickOptions)
})