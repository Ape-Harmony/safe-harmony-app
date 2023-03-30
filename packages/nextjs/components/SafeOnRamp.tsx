import { SafeOnRampKit, SafeOnRampProviderType } from '@safe-global/onramp-kit'
import { useSigner, useAccount } from "wagmi";
import { Grid, GridItem, Button, Box } from "@chakra-ui/react";
import { useSafeAuth } from "../services/web3/safeAuth";

export default async function SafeOnRamp() {
  const { login, logout, provider, safeAuth } = useSafeAuth();
  const { data: signer }: any = useSigner();

  const safeOnRamp = await SafeOnRampKit.init(SafeOnRampProviderType.Stripe, {
    onRampProviderConfig: {
      stripePublicKey:
        'pk_test_51MZbmZKSn9ArdBimSyl5i8DqfcnlhyhJHD8bF2wKrGkpvNWyPvBAYtE211oHda0X3Ea1n4e9J9nh2JkpC7Sxm5a200Ug9ijfoO', // Safe public key
      onRampBackendUrl: 'https://aa-stripe.safe.global', // Safe deployed server
    },
  });

const sessionData = await safeOnRamp.open({
  walletAddress: useAccount().toString(),
  networks: ['polygon'],
  element: '#stripe-root',
  sessionId: 'cos_1Mei3cKSn9ArdBimJhkCt1XC', // Optional, if you want to use a specific created session
  events: {
    onLoaded: () => console.log('Loaded'),
    onPaymentSuccessful: () => console.log('Payment successful'),
    onPaymentError: () => console.log('Payment failed'),
    onPaymentProcessing: () => console.log('Payment processing')
  }
})

  async function handleJoinSafe() {
  //  const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer });
   // const safeFactory = await SafeFactory.create({ ethAdapter });
    // TODO: join a safe
  }

  return (
    <button>

    </button>
  );
}
