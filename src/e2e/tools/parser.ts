import { EventDataPatterns } from "../constants/regexp"
const ccEventDataPatterns = EventDataPatterns.CreatedCollectionEventDataPatterns
const tmEventDataPatterns = EventDataPatterns.TokenMintedEventDataPatterns

export default class Parser {
    public static parseCreatedCollectionDataFromElementTextContent(textContent: string) {
        const address = this.parseValueByRegexp(ccEventDataPatterns.collectionAddress, textContent, 1)
        const name = this.parseValueByRegexp(ccEventDataPatterns.collectionName, textContent, 1)
        const symbol = this.parseValueByRegexp(ccEventDataPatterns.collectionSymbol, textContent, 1)
        return { address, name, symbol }
    }

    public static parseTokenMintedDataFromElementTextContent(textContent: string) {
        const address = this.parseValueByRegexp(tmEventDataPatterns.address, textContent, 1)
        const recipient = this.parseValueByRegexp(tmEventDataPatterns.recipient, textContent, 1)
        const tokenId = +this.parseValueByRegexp(tmEventDataPatterns.tokenId, textContent, 1)
        const tokenUri = this.parseValueByRegexp(tmEventDataPatterns.tokenUri, textContent, 1)
        return { address, recipient, tokenId, tokenUri }
    }

    private static parseValueByRegexp(regexp: RegExp, text: string, group?: number) {
        const result = new RegExp(regexp).exec(text)
        return group ? result[group].trim() : result
    }
}