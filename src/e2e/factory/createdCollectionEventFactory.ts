import { Generator } from "../tools/generator";

export default class CreatedCollectionEventFactory {
    public static getPredefinedCreatedCollectionEventData() {
        const collectioName = Generator.generateCollectionName()
        const collectionSymbol = Generator.generateCollectionSymbol()
        const collectionTokenURI = Generator.DEFAULT_URI
        return { collectioName, collectionSymbol, collectionTokenURI }
    }
}