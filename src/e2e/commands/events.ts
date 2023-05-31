import { HomePageLocators } from "../locators/homepage"
import Parser from "../tools/parser"

Cypress.Commands.add('getCollectionCreatedEventByData', (collectionName, collectionSymbol) => {
    return cy.getCollectionCreatedEvents().then(events => events.find(event => event.name === collectionName && event.symbol === collectionSymbol))
})

Cypress.Commands.add('getTokenMintedEventByData', (collectionAddress, recipientAddress, tokenId) => {
    return cy.getTokenMintedEvents().then(events => events.find(event => event.address === collectionAddress && event.recipient === recipientAddress && event.tokenId === tokenId))
})

Cypress.Commands.add('getCollectionCreatedEvents', (options?) => {
    return cy.get(HomePageLocators.EventsForm.eventsList, options).then($events => {
        const $filtered = Cypress._.filter($events, $event => $event.textContent.includes('Collection Created'))
        return Cypress._.map($filtered, $event => Parser.parseCreatedCollectionDataFromElementTextContent($event.textContent) as Cypress.CustomTypes.Events.UI.CollectionCreated)
    })
})

Cypress.Commands.add('getTokenMintedEvents', (options?) => {
    return cy.get(HomePageLocators.EventsForm.eventsList, options).then($events => {
        const $filtered = Cypress._.filter($events, $event => $event.textContent.includes('NFT minted for collection'))
        return Cypress._.map($filtered, $events => Parser.parseTokenMintedDataFromElementTextContent($events.textContent) as Cypress.CustomTypes.Events.UI.TokenMinted)
    })
})

Cypress.Commands.add('waitUntilCreatedCollectionEventAppears', (collectionName, collectionSymbol, options?) => {
    cy.waitUntil(() => cy.getCollectionCreatedEventByData(collectionName, collectionSymbol).then(event => event?.name === collectionName && event?.symbol === collectionSymbol), options)
})

Cypress.Commands.add('waitUntilTokenMintedEventAppears', (collectionAddress, recipientAddress, tokenId, options?) => {
    cy.waitUntil(() => cy.getTokenMintedEventByData(collectionAddress, recipientAddress, tokenId).then(event => event.address === collectionAddress && event.recipient === recipientAddress && event.tokenId === tokenId), options)
})
