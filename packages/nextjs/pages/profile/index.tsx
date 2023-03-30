import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useAccount, useChainId } from "wagmi";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  Button,
  Box,
  Stack,
  Spacer,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";

import RainbowKitCustomConnectButton from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";
import SafeModal from "~~/components/SafeModal";

export default function Profile() {
  const [nfts, setNfts] = useState<any[]>();
  const [isLoading, setIsloading] = useState(false);
  const { isDisconnected, address } = useAccount();
  const chain = useChainId();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const totalFloor = nfts && nfts.reduce((a, b) => a + (b.floor || 0), 0).toFixed(3);

  const getNftsForOwner = async () => {
    setIsloading(true);

    if (address) {
      try {
        const res = await fetch("/api/getNftsForOwner", {
          method: "POST",
          body: JSON.stringify({
            addresses: [address],
            chain: chain,
          }),
        }).then(res => res.json());

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

  const renderNfts = (
    <SimpleGrid columns={1} spacingX="10px" spacingY="10px">
      {isLoading ? (
        <p>Loading...</p>
      ) : nfts?.length ? (
        nfts.map(nft => {
          return (
            <HStack alignItems="center" spacing="24px" key={nft.tokenId} height="80px">
              <Image width="50" height="50" loader={props => props.src} src={nft.media} alt="nft" />
              <div>{nft.collectionName.length > 20 ? `${nft.collectionName.slice(0, 20)}...` : nft.collectionName}</div>
              <div>{nft.floor} ETH</div>
              <div>{nft.tokenId.length > 6 ? `${nft.tokenId.slice(0, 6)}...` : nft.tokenId}</div>
              <Spacer />
              <Button size="xs" onClick={onOpen} className="btn" color="gray.300">
                Create Safe
              </Button>
              <SafeModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
            </HStack>
          );
        })
      ) : (
        <p>No NFTs found for the selected address</p>
      )}
    </SimpleGrid>
  );

  const renderSafes = (
    <SimpleGrid columns={1} spacingX="10px" spacingY="10px">
      Render Safes
    </SimpleGrid>
  );

  return (
    <Stack bgColor="#253033" minHeight="100vh" padding="30px">
      <RainbowKitCustomConnectButton />
      {isDisconnected && <Box>Connect wallet to see NFTs</Box>}
      {!isDisconnected && (
        <div>
          <div className="stats shadow">
            <Box bg="#ceac777a" p={6} mb={6}>
              <div className="stat-title">Total value</div>
              <div className="stat-value">{totalFloor} ETH</div>
              <div className="stat-desc">Address: {address}</div>
            </Box>
          </div>
          <Tabs mt={10} variant="enclosed">
            <TabList>
              <Tab>NFTs</Tab>
              <Tab>Safes</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>{renderNfts}</TabPanel>
              <TabPanel>{renderSafes}</TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      )}
    </Stack>
  );
}
