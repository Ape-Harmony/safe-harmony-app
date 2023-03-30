import { useState, useEffect } from "react";
import { SafeAuthKit, SafeAuthProviderType } from "@safe-global/auth-kit";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig } from "wagmi";
import { Toaster } from "react-hot-toast";

import "@rainbow-me/rainbowkit/styles.css";
import { appChains } from "~~/services/web3/wagmiConnectors";
import { wagmiClient } from "~~/services/web3/wagmiClient";

import { BlockieAvatar } from "~~/components/scaffold-eth";

import Header from "~~/components/Header";
import Footer from "~~/components/Footer";

import { useAppStore } from "~~/services/store/store";
import { useEthPrice } from "~~/hooks/scaffold-eth";

import NextNProgress from "nextjs-progressbar";
import "~~/styles/globals.css";

import type { AppProps } from "next/app";
import type { SafeAuthKit, SafeAuthProviderType, SafeAuthSignInData } from '@safe-global/auth-kit'

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  const [safeAuth, setSafeAuth] = useState<SafeAuthKit>();
  const [provider, setProvider] = useState<any | null>(null)
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<any | null>(
    null
  )

  const price = useEthPrice();
  const setEthPrice = useAppStore(state => state.setEthPrice);

  useEffect(() => {
    (async () => {
      setSafeAuth(
        await SafeAuthKit.init(SafeAuthProviderType.Web3Auth, {
          chainId: "0x5",
          txServiceUrl: "https://safe-transaction-goerli.safe.global", // Optional. Only if want to retrieve related safes
          authProviderConfig: {
            rpcTarget: "https://goerli.infura.io/v3/cdb4d6bddb91452d90a7213480d8d791",
            clientId: "BKgUDDbGRab81AQa5WbjQNIbj05-1elP8PKWVsUfUb2WNoarBPp32IcYiFqzKbsRsvzFBNhm1k0plsOeyyjCNiw",
            network: "testnet",
            theme: "dark",
          },
        }),
      );
    })();
  }, []);

  console.log("safeAuth")
  console.log(safeAuth)

  useEffect(() => {
    if (price > 0) {
      setEthPrice(price);
    }
  }, [setEthPrice, price]);

  const login = async () => {
    if (!safeAuth) return

    const response = await safeAuth.signIn()
    console.log('SIGN IN RESPONSE: ', response)

    setSafeAuthSignInResponse(response)
    setProvider(safeAuth.getProvider() as any)
  }
  const logout = async () => {
    if (!safeAuth) return

    await safeAuth.signOut()

    setProvider(null)
    setSafeAuthSignInResponse(null)
  }

  return (
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <NextNProgress />
        <RainbowKitProvider chains={appChains.chains} avatar={BlockieAvatar}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="relative flex flex-col flex-1">
              <button onClick={login}>Login</button>
              <button onClick={logout}>Logout</button>
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
          <Toaster />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
};

export default ScaffoldEthApp;
