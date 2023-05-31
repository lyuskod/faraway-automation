export const HomePageLocators = {
    DeployCollectionForm: {
        collectionNameInput: 'form:nth-child(3) > div:nth-child(1) > input',
        collectionSymbolInput: 'form:nth-child(3) > div:nth-child(2) > input',
        collectionTokenUriInput: 'form:nth-child(3) > div:nth-child(3) > input',
        createBtn: 'form:nth-child(3) > button'
    },
    MintNFTForm: {
        collectionAddressInput: 'form:nth-child(6) > div:nth-child(1) > input',
        recipientAddressInput: 'form:nth-child(6) > div:nth-child(2) > input',
        tokenIdInput: 'form:nth-child(6) > div:nth-child(3) > input',
        mintBtn: 'form:nth-child(6) > button',
    },
    EventsForm: {
        eventsList: '.list-group > .list-group-item'
    }
}