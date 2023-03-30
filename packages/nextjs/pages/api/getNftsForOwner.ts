import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { addresses, chain }: { addresses: string[]; chain: number } = JSON.parse(req.body);

  console.log("addresses")
  console.log(addresses)
  
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    const Authorization = `Basic ${btoa(process.env.NEXT_PUBLIC_INFURA_API_KEY + ":" + process.env.INFURA_API_KEY_SECRET)}`;
    console.log("post")
    let nfts = [];
    for (const address of addresses) {
      console.log(address);
      const url = `https://nft.api.infura.io/networks/${chain}/accounts/${address}/assets/nfts`;
      console.log(url, Authorization);
      const response = await axios.get(url, {
        headers: {
          Authorization,
        },
      });

      nfts = [...nfts, ...response.data.assets];
    }
    console.log(nfts);

    const collections = [...new Set<string>(nfts.map(nft => nft.contract))];

    const collectionData: { [key: string]: any } = {};
    for (const collection of collections) {
      const collUrl = `https://nft.api.infura.io/networks/${chain}/nfts/${collection}`;
      const collResponse = await axios.get(collUrl, {
        headers: {
          Authorization,
        },
      });
      collectionData[collection] = {
        ...collResponse.data,
        floor: Math.round(Math.random() * 100) / 10,
      };
      // Mumbai: Error: 400: This endpoint isn't enabled for that chain or network just yet - please contact the Alchemy team for support!
      // (await alchemy.nft.getFloorPrice(address)).openSea.floorPrice || 0;
    }

    const formattedNfts = nfts
      .filter(nft => nft.type === "ERC721" && nft.metadata?.attributes)
      .map(nft => {
        const { contract, tokenId, metadata } = nft;

        return {
          contract: contract,
          collectionName: `${collectionData[contract].name} #${tokenId}`, // metadata.name
          floor: collectionData[contract].floor,
          media: metadata.image
            ? metadata.image.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/")
            : "https://via.placeholder.com/500",
          tokenId,
        };
      })
      .sort((a, b) => b.floor - a.floor);

    res.status(200).json({ nfts: formattedNfts, pageKey: nfts.pageKey });
  } catch (e) {
    console.warn(e);
    res.status(500).send({
      message: "something went wrong, check the log in your terminal",
    });
  }
}
