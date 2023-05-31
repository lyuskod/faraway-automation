import { CommonPatterns } from "../constants/regexp"
import CreatedCollectionEventFactory from "../factory/createdCollectionEventFactory"
import { Generator } from "../tools/generator"

describe('FA2 - Smoke - Mint NFT', () => {
    let testData = CreatedCollectionEventFactory.getPredefinedCreatedCollectionEventData()
    before(() => {
        cy.visit('/')
        cy.acceptMetamaskAccess().should('be.true')
        cy.submitDeployCollectionForm(testData.collectioName, testData.collectionSymbol, testData.collectionTokenURI)
        cy.confirmMetamaskTransaction()
        cy.waitUntilCreatedCollectionEventAppears(testData.collectioName, testData.collectionSymbol, { timeout: 30000, interval: 2000 })
        cy.getCollectionCreatedEventByData(testData.collectioName, testData.collectionSymbol).then(event => {
            expect(testData.collectioName).to.eq(event.name, 'Collection name matches to expected one')
            expect(testData.collectionSymbol).to.eq(event.symbol, 'Collection symbol matches to expected one')
            expect(event.address).to.match(CommonPatterns.WalletAddress, 'Collection address is generated successfully')
            cy.wrap(event).as('CollectionCreatedEvent')
        })
    })
    after(() => cy.disconnectMetamaskWalletFromDapp())
    it('User can mint an NFT', () => {
        cy.get('@CollectionCreatedEvent').then((event) => {
            cy.getMetamaskWalletAddress().then(recipient => {
                const collection = event as unknown as Cypress.CustomTypes.Events.UI.CollectionCreated
                cy.enterCollectionAddress(collection.address)
                cy.enterRecipientAddress(recipient)
                cy.enterTokenId(Generator.DEFAULT_TOKEN_ID)
                cy.clickMintBtnToMintNFT()
                cy.confirmMetamaskTransaction()
                cy.waitUntilTokenMintedEventAppears(collection.address, recipient, Generator.DEFAULT_TOKEN_ID, { timeout: 30000, interval: 2000 })
                cy.getTokenMintedEventByData(collection.address, recipient, Generator.DEFAULT_TOKEN_ID).then(async (event) => {
                    expect(collection.address).to.eq(event.address, 'Collection address of minted nft matches to expected one')
                    expect(recipient).to.eq(event.recipient, 'NFT Token recipient value matches to expected one')
                    expect(Generator.DEFAULT_TOKEN_ID).to.eq(event.tokenId, 'NFT Token id matches to expected one')
                    expect(`${testData.collectionTokenURI}${Generator.DEFAULT_TOKEN_ID}`).to.eq(event.tokenUri, 'Token URI of Minted NFT points to expected uri')

                    cy.getNftForContractBy(collection.address, String(Generator.DEFAULT_TOKEN_ID)).then(async (nft) => {
                        expect(nft).to.not.eq(undefined, 'NFT is found')
                        expect(nft.contract.address).to.eq(collection.address.toLowerCase(), 'NFT Contract address matches to expected one')
                        expect(nft.tokenId).to.eq(String(Generator.DEFAULT_TOKEN_ID), 'NFT Token id matches to expected one')
                        expect(nft.metadataError).to.be.eq(undefined, 'No Metadata errors found')
                        expect(nft.rawMetadata?.mintedAt).to.not.eq(undefined, 'Mint date is present')
                    })
                })
            })
        })
    })
})