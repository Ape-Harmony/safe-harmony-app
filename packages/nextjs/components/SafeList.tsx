import { Grid, GridItem, Button, Box, Flex } from "@chakra-ui/react";
import { useSafeAuth } from "../services/web3/safeAuth";
import { ethers } from "ethers";
import Safe, { SafeFactory } from "@safe-global/safe-core-sdk";
import EthersAdapter from "@safe-global/safe-ethers-lib";

import { useSigner } from "wagmi";
// const ethAdapter = new EthersAdapter({ethers, signerOrProvider: signerWallet}); //3

// const safeFactory = await SafeFactory.create({ ethAdapter }); //4
// const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig: { threshold: 2, owners: ['0x...', '0x...', '0x..'] }});

export default function SafeList({ items, safeAddresses }: any) {
  const { login, logout, provider, safeAuth } = useSafeAuth();
  const { data: signer }: any = useSigner();

  async function handleJoinSafe(safeAddress: string) {
    const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer });
    // const safeFactory = await SafeFactory.create({ ethAdapter });
    const safeSdk: Safe = await Safe.create({ ethAdapter, safeAddress });
    const tx = await safeSdk.createEnableModuleTx("0x0847ecc9190158a77afa3f7501d9b764035bf39a");
    console.log(tx);
    safeSdk.getModules();
    // const signature = await safeSdk.signTransaction(tx);
    // console.log(signature);
    const result = await safeSdk.executeTransaction(tx);
    console.log(result);
    // TODO: join a safe
  }

  const renderButtons = address => (
    <>
      {!provider && (
        <Button
          border="2px"
          background="#211922"
          borderColor="#71283D"
          color="#E3667F"
          borderRadius="30px"
          h="74px"
          onClick={() => login()}
        >
          Auth to Join
        </Button>
      )}
      {provider && (
        <Button
          border="2px"
          background="#211922"
          borderColor="#71283D"
          color="#E3667F"
          borderRadius="30px"
          h="74px"
          onClick={() => handleJoinSafe(address)}
        >
          Request
        </Button>
      )}
    </>
  );
  // Temorary.. TODO: delete when fetch safes
  const renderAddresses = safeAddresses?.map((address: any) => {
    return (
      <>
        <Flex
          w="617px"
          h="77px"
          boxShadow="xs"
          py="3"
          px={0}
          border="2px"
          borderColor="#58E8F5"
          borderRadius="34px"
          alignItems="center"
          color="#B2AFAF"
          display="flex"
          justify="space-between"
        >
          <Flex>
            <h4>{address.split(0, 6)}..</h4>
            <Box>
              <Flex>
                <div>Fee:  0.1 USDT</div>
                <div>Min Days: 10</div>
              </Flex>
              <div>Daily stream amount: 2 </div>
            </Box>
          </Flex>
          {renderButtons(address)}
        </Flex>
      </>
    );
  });

  const renderItems = items?.map((safe: any) => {
    return (
      <>
        <Flex
          w="617px"
          h="77px"
          boxShadow="xs"
          py="3"
          px={0}
          border="2px"
          borderColor="#58E8F5"
          borderRadius="34px"
          alignItems="center"
          color="#B2AFAF"
          display="flex"
          justify="space-between"
        >
          <Flex>
            <img src="/assets/nftMock.svg" alt="nft" />
            <Box m="auto">
              <Flex ml={4}>
                <Box mr={40}>Fee: 0.1 USDT</Box>
                <Box>Min Days: 10</Box>
              </Flex>
              <Box ml={4}>Daily stream amount: 2</Box>
            </Box>
          </Flex>
          {renderButtons(safe.address)}
        </Flex>
      </>
    );
  });

  return (
    <>
      {items ? renderItems : renderAddresses}
      {!items && !safeAddresses && <div> No Safes Created yet </div>}
    </>
  );
}
