import { Network, Alchemy } from "alchemy-sdk";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    address,
    pageKey,
    pageSize,
    chain,
  }: { address: string; pageKey: string; pageSize: number; chain: keyof typeof Network } = JSON.parse(req.body);
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  console.log(chain);
  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network[chain],
  };
  const alchemy = new Alchemy(settings);

  try {
    const floorPrice = await alchemy.nft.getFloorPrice(address);

    res.status(200).json({
      floorPrice: floorPrice,
    });
    // the rest of your code
  } catch (e) {
    console.warn(e);
    res.status(500).send({
      message: "something went wrong, check the log in your terminal",
    });
  }
}
