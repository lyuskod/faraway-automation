import { CommonPatterns } from "../constants/regexp"
import CreatedCollectionEventFactory from "../factory/createdCollectionEventFactory"
import { Generator } from "../tools/generator"

describe('FA2 - Smoke - Mint NFT', () => {
    let testData = CreatedCollectionEventFactory.getPredefinedCreatedCollectionEventData()
    const tokenId = Generator.DEFAULT_TOKEN_ID
    before(() => {
        cy.openHomePage()
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
                cy.enterTokenId(tokenId)
                cy.clickMintBtnToMintNFT()
                cy.confirmMetamaskTransaction()
                cy.waitUntilTokenMintedEventAppears(collection.address, recipient, tokenId, { timeout: 30000, interval: 2000 })
                cy.getTokenMintedEventByData(collection.address, recipient, tokenId).then(async (event) => {
                    expect(collection.address).to.eq(event.address, 'Collection address of minted nft matches to expected one')
                    expect(recipient).to.eq(event.recipient, 'NFT Token recipient value matches to expected one')
                    expect(tokenId).to.eq(event.tokenId, 'NFT Token id matches to expected one')
                    expect(`${testData.collectionTokenURI}${tokenId}`).to.eq(event.tokenUri, 'Token URI of Minted NFT points to expected uri')

                    cy.getNftForContractBy(collection.address, String(tokenId)).then(async (nft) => {
                        expect(nft).to.not.eq(undefined, 'Minted NFT is found by contract address')
                        expect(nft.contract.address).to.eq(collection.address.toLowerCase(), 'NFT Metadata - Contract address matches to expected one')
                        expect(nft.tokenId).to.eq(String(tokenId), 'NFT Metadata - Token id matches to expected one')
                        expect(nft.metadataError).to.be.eq(undefined, 'No NFT Metadata errors found')
                        expect(nft.rawMetadata?.mintedAt).to.not.eq(undefined, 'NFT Mint date is present')
                    })
                })
            })
        })
    })
})