declare namespace Cypress {
    type CyTypeOptions = Partial<Cypress.TypeOptions>
    type CyClickOptions = Partial<Cypress.ClickOptions>
    type CyGetOptions = Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>
    namespace CustomTypes {
        namespace Events {
            namespace UI {
                type CollectionCreated = {
                    address: string,
                    name: string,
                    symbol: string
                }
                type TokenMinted = {
                    address: string,
                    recipient: string,
                    tokenId: number,
                    tokenUri: string
                }
            }
        }
    }
    interface Chainable<Subject = any> {
        connectWalletToDApp(): Chainable<void>
        submitDeployCollectionForm(collectionName: string, collectionSymbol: string, collectionTokenUri: string, options?: CyGetOptions, typeOptions?: CyTypeOptions, clickOptions?: ClickOptions): Chainable<void>
        enterCollectionName(name: string, options?: CyGetOptions, typeOptions?: CyTypeOptions): Chainable<void>
        enterCollectionSymbol(symbol: string, options?: CyGetOptions, typeOptions?: CyTypeOptions): Chainable<void>
        enterCollectionTokenURI(tokenURI: string, options?: CyGetOptions, typeOptions?: CyTypeOptions): Chainable<void>

        enterCollectionAddress(address: string, options?: CyGetOptions, typeOptions?: CyTypeOptions): Chainable<void>
        enterRecipientAddress(recipient: string, options?: CyGetOptions, typeOptions?: CyTypeOptions): Chainable<void>
        enterTokenId(tokenId: string | number, options?: CyGetOptions, typeOptions?: CyTypeOptions): Chainable<void>
        clickMintBtnToMintNFT(options?: CyGetOptions, clickOptions?: CyClickOptions): Chainable<void>

        clickCreateBtnToDeployCollection(options?: CyGetOptions, clickOptions?: CyClickOptions): Chainable<void>
        getCollectionCreatedEvents(options?: CyGetOptions): Chainable<CustomTypes.Events.UI.CollectionCreated[]>
        getTokenMintedEvents(options?: CyGetOptions): Chainable<CustomTypes.Events.UI.TokenMinted[]>
        getCollectionCreatedEventByData(collectionName: string, collectionSymbol: string, options?: CyGetOptions): Chainable<CustomTypes.Events.UI.CollectionCreated>
        getTokenMintedEventByData(collectionAddress: string, recipientAddress: string, tokenId: number, options?: CyGetOptions): Chainable<CustomTypes.Events.UI.TokenMinted>
        waitUntilCreatedCollectionEventAppears(collectioName: string, collectionTokenURI: string, options?: WaitUntilOptions): Chainable<void>
        waitUntilTokenMintedEventAppears(collectionAddress: string, recipientAddress: string, tokenId: number, options?: WaitUntilOptions): Chainable<void>
        getNftForContractBy(contractAddress: string, tokenId: string): Chainable<any>
    }
}