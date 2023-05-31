import { HomePageLocators } from "../locators/homepage"
import { getNftForContractBy } from "../scripts/alchemy"
const mintNFTForm = HomePageLocators.MintNFTForm

Cypress.Commands.add('enterCollectionAddress', (address, options?, typeOptions?) => {
    cy.get(mintNFTForm.collectionAddressInput, options).type(address, typeOptions)
})

Cypress.Commands.add('enterRecipientAddress', (recipient, options?, typeOptions?) => {
    cy.get(mintNFTForm.recipientAddressInput, options).type(recipient, typeOptions)
})

Cypress.Commands.add('enterTokenId', (tokenId, options?, typeOptions?) => {
    cy.get(mintNFTForm.tokenIdInput, options).type(String(tokenId), typeOptions)
})

Cypress.Commands.add('clickMintBtnToMintNFT', (options?, clickOptions?) => {
    cy.get(mintNFTForm.mintBtn, options).click(clickOptions)
})

Cypress.Commands.add('getNftForContractBy', (contractAddress, tokenId) => {
    return cy.wrap(getNftForContractBy(contractAddress, tokenId))
})