import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Link from "next/link";
import { useAccount, useChainId, useSigner } from "wagmi";
import { Box } from "@chakra-ui/react";
import RainbowKitCustomConnectButton from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";

export default function Profile() {
  const [nfts, setNfts] = useState();
  const [isLoading, setIsloading] = useState(false);
  const { isDisconnected, address } = useAccount();
  const chain = useChainId();

  const totalFloor = nfts && nfts.reduce((a, b) => a + (b.floor || 0), 0).toFixed(3);

  const getNftsForOwner = async () => {
    setIsloading(true);
    console.log("address")
    console.log(address)

    if (address) {
      try {
        const res = await fetch("/api/getNftsForOwner", {
          method: "POST",
          body: JSON.stringify({
            addresses: [address],
            chain: chain,
          }),
        }).then(res => res.json());

        console.log("res ", res);
        setNfts(res.nfts);
      } catch (e) {
        console.log(e);
      }
    }

    setIsloading(false);
  };

  useEffect(() => {
    getNftsForOwner();
  }, [address]);

  async function createSafe() {}

  return (
    <div className="">
      <RainbowKitCustomConnectButton />
      {isDisconnected && <Box>Connect wallet to see NFTs</Box>}
      {!isDisconnected && (
        <div className="">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">My wallet's total value</div>
              <div className="stat-value">{totalFloor} ETH</div>
              <div className="stat-desc">Address: {address}</div>
            </div>
          </div>
          <div>
            <table className="table w-full">
              <tbody>
                {isLoading ? (
                  <p>Loading...</p>
                ) : nfts?.length ? (
                  nfts.map(nft => {
                    return (
                      <tr className="hover" key={nft.tokenId}>
                        <td>
                          <img width="50" height="50" src={nft.media}></img>
                        </td>
                        <td>
                          {nft.collectionName.length > 20
                            ? `${nft.collectionName.slice(0, 20)}...`
                            : nft.collectionName}
                        </td>
                        <td>{nft.floor} ETH</td>
                        <td>{nft.tokenId.length > 6 ? `${nft.tokenId.slice(0, 6)}...` : nft.tokenId}</td>
                        <td>
                          <Link href={{ pathname: "/form-offer" }}>
                            <button onClick={createSafe} className="btn">
                              Create Safe
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <p>No NFTs found for the selected address</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
