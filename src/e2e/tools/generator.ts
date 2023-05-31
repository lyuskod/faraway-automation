export class Generator {
    public static readonly DEFAULT_URI: string = 'https://api.rarible.org/v0.1/items/ETHEREUM:0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D:'
    public static readonly DEFAULT_TOKEN_ID: number = 3102
    public static readonly DEFAULT_COLLECTION_NAME_PREFIX: string = 'NFT BAYC Collection (TEST)'
    private static readonly DEFAULT_STRING_LENGTH: number = 10;
    private static readonly CHARS_SET: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    static generateCollectionName(usePrefix: boolean = true, charsCount: number = 5): string {
        const prefix = usePrefix ? `${this.DEFAULT_COLLECTION_NAME_PREFIX} ` : ''
        const randomName = this.generateString(charsCount)
        return `${prefix}${randomName}`
    }

    static generateCollectionSymbol(symbolsCount: number = 5): string {
        return this.generateString(symbolsCount).toUpperCase()
    }

    static generateNFTTokenId() {
        return Math.floor(Math.random() * 10_000) + 1
    }

    static generateString(length: number = this.DEFAULT_STRING_LENGTH) {
        let result = '';
        const charactersLength = this.CHARS_SET.length;
        for (let i = 0; i < length; i++) {
            result += this.CHARS_SET.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
}