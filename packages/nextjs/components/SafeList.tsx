import { Grid, GridItem, Button, Box } from "@chakra-ui/react";
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
        <Button onClick={() => login()} mt={4}>
          Auth to Sign
        </Button>
      )}
      {provider && (
        <Button onClick={() => handleJoinSafe(address)} mt={4}>
          Add module
        </Button>
      )}
    </>
  );
  // Temorary.. TODO: delete when fetch safes
  const renderAddresses = safeAddresses?.map((address: any) => {
    return (
      <GridItem key={address} w="100%" h="40">
        <Box boxShadow="xs" p="3" border="1px" borderColor="gray.200" alignItems="center" color="gray.300">
          <h4>{address.split(0, 6)}..</h4>
          <div>isLocked: </div>
          {renderButtons(address)}
        </Box>
      </GridItem>
    );
  });

  const renderItems = items?.map((safe: any) => {
    return (
      <GridItem key={safe.id} w="100%" h="40">
        <Box boxShadow="xs" p="3" border="1px" borderColor="gray.200" alignItems="center" color="gray.300">
          <h4>{safe.name}</h4>
          <div>isLocked: {safe.isLocked}</div>
          {renderButtons}
        </Box>
      </GridItem>
    );
  });

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      {items ? renderItems : renderAddresses}
      {!items && !safeAddresses && <div> No Safes Created yet </div>}
    </Grid>
  );
}
