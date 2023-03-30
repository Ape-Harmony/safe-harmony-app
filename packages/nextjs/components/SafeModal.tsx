import { useForm } from "react-hook-form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  Button,
  Stack,
  Input,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import EthersAdapter from "@safe-global/safe-ethers-lib";
import Safe, { SafeFactory } from "@safe-global/safe-core-sdk";
import { useSigner, useAccount } from "wagmi";

import { useSafeAuth } from "~~/services/web3/safeAuth";

export default function SafeModal({ isOpen, onClose }: any) {
  const { authAddress, safeAuth } = useSafeAuth();

  const { data: signer }: any = useSigner();
  // const { address } = useAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mockContract = "0x9fF8ed7430664CbF33317b265FDE484542152390";

  async function createSafe(safeData: any) {
    // TODO: ALEX!! Use Safe Manager 0_0
    const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer });
    const safeFactory = await SafeFactory.create({ ethAdapter });
    const safeSdk: Safe = await safeFactory.deploySafe({
      safeAccountConfig: { threshold: 2, owners: [authAddress.eoa, mockContract] },
    });
    console.log(safeSdk.getAddress());
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.50" backdropFilter="blur(1px) hue-rotate(10deg)" />
        <ModalContent>
          <ModalHeader>Set Up New Safe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(data => createSafe(data))}>
              <Stack spacing={3}>
                <Input variant="filled" type="number" placeholder="Set up fee" {...register("fee")} />
                <Input
                  variant="filled"
                  type="number"
                  placeholder="Min days"
                  {...register("minDays", { required: true })}
                />
                <Input
                  variant="filled"
                  type="number"
                  placeholder="Daily stream amount"
                  {...register("dailyStreamAmount", { required: true })}
                />
                <Input type="submit" />
              </Stack>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
