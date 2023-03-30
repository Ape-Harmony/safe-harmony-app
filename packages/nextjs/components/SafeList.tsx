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

  async function handleJoinSafe() {
    const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer });
    const safeFactory = await SafeFactory.create({ ethAdapter });
    // TODO: join a safe
  }

  const renderButtons = (
    <>
      {!provider && (
        <Button onClick={() => login()} mt={4}>
          Auth to Sign
        </Button>
      )}
      {provider && (
        <Button onClick={handleJoinSafe} mt={4}>
          Sign
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
          {renderButtons}
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
      {!items && !safeAddresses && (<div> No Safes Created yet </div>)}
    </Grid>
  );
}
