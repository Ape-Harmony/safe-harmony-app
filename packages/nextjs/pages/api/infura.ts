import { NextApiRequest, NextApiResponse } from "next";
import { SDK, Auth, TEMPLATES, Metadata } from "@infura/sdk";

const auth = new Auth({
  projectId: process.env.NEXT_PUBLIC_INFURA_API_KEY,
  secretId: process.env.INFURA_API_KEY_SECRET,
  privateKey: process.env.WALLET_PRIVATE_KEY,
  chainId: 11155111,
});
const sdk = new SDK(auth);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // See https://docs.api.infura.io/nft/
  // const newContract = await sdk.deploy({
  //   template: TEMPLATES.ERC721Mintable,
  //   params: {
  //     name: "SampleNFT contract",
  //     symbol: "CNSYS",
  //     contractURI: "https://gateway.pinata.cloud/ipfs/QmeyKQVR9AFG75qUTDLmst8vzgvhZBdob2HLWRCarctDoM",
  //   },
  // });
  // console.log(`Contract address is: ${newContract.contractAddress}`);
  const myNFTs = await sdk.getNFTs({
    publicAddress: process.env.WALLET_PUBLIC_ADDRESS,
    includeMetadata: true,
  });
  console.log("My NFTs: \n", myNFTs);
}
