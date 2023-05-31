export const EventDataPatterns = {
    CreatedCollectionEventDataPatterns: {
        collectionName: /name:\s+(\w.+?)and/g,
        collectionSymbol: /symbol:\s+(\w+)/g,
        collectionAddress: /address:\s+(0x\w+)/g
    },
    TokenMintedEventDataPatterns: {
        address: /collection:\s+(0x\w+)/g,
        recipient: /to:\s+(0x\w+)/g,
        tokenId: /token id:\s+(\d+)/g,
        tokenUri: /token URI:\s+((https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}))/g
    }
}

export const CommonPatterns = {
    WalletAddress: /0x\w+/g
}