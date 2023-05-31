import { Alchemy, Network } from 'alchemy-sdk'
import dotenv from 'dotenv'

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MUMBAI,
}
const alchemy = new Alchemy(settings)

/**
 * Get NFT with exact tokenId for Contract 
 * @param {String} contractAddress 
 * @param {String} tokenId 
 * @returns 
 */
export const getNftForContractBy = async (contractAddress, tokenId) => {
  return await (
    await alchemy.nft.getNftsForContract(contractAddress)
  ).nfts.find((nft) => nft.tokenId === tokenId)
}
