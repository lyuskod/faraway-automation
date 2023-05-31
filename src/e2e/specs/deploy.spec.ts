import { CommonPatterns } from "../constants/regexp"
import CreatedCollectionEventFactory from "../factory/createdCollectionEventFactory"

describe('FA1 - Smoke - Deploy NFT Collection', () => {
    after(() => cy.disconnectMetamaskWalletFromDapp())
    it('User can deploy an NFT collection', () => {
        const testData = CreatedCollectionEventFactory.getPredefinedCreatedCollectionEventData()
        cy.visit('/')
        cy.acceptMetamaskAccess().should('be.true')
        cy.enterCollectionName(testData.collectioName)
        cy.enterCollectionSymbol(testData.collectionSymbol)
        cy.enterCollectionTokenURI(testData.collectionTokenURI)
        cy.clickCreateBtnToDeployCollection()
        cy.confirmMetamaskTransaction()
        cy.waitUntilCreatedCollectionEventAppears(testData.collectioName, testData.collectionSymbol, { timeout: 30000, interval: 2000 })
        cy.getCollectionCreatedEventByData(testData.collectioName, testData.collectionSymbol).then(event => {
            expect(testData.collectioName).to.eq(event.name, 'Collection name matches to expected one')
            expect(testData.collectionSymbol).to.eq(event.symbol, 'Collection symbol matches to expected one')
            expect(event.address).to.match(CommonPatterns.WalletAddress, 'Collection address is generated successfully')
        })
    })
})