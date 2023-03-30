import { useState } from "react";
import { SafeAuthKit, SafeAuthProviderType } from "@safe-global/auth-kit";

export function useSafeAuth() {
  const [safeAuth, setSafeAuth] = useState<any>();
  const [provider, setProvider] = useState<any | null>(null);
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<any | null>(null);

  const auth = async () => {
    setSafeAuth(
      await SafeAuthKit.init(SafeAuthProviderType.Web3Auth, {
        chainId: "0x5",
        txServiceUrl: "https://safe-transaction-goerli.safe.global", // Optional. Only if want to retrieve related safes
        authProviderConfig: {
          //rpcTarget: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
          rpcTarget: `https://goerli.infura.io/v3/cdb4d6bddb91452d90a7213480d8d791`,
          //clientId: process.env.WEB3_AUTH_CLIENT_ID,
          clientId: "BKgUDDbGRab81AQa5WbjQNIbj05-1elP8PKWVsUfUb2WNoarBPp32IcYiFqzKbsRsvzFBNhm1k0plsOeyyjCNiw",
          network: "testnet",
          theme: "dark",
        },
      }),
    );
  };

  const login = async () => {
    if (!safeAuth) return;

    const response = await safeAuth.signIn();
    console.log("SIGN IN RESPONSE: ", response);

    setSafeAuthSignInResponse(response);
    setProvider(safeAuth.getProvider() as any);
  };

  const logout = async () => {
    if (!safeAuth) return;

    await safeAuth.signOut();

    setProvider(null);
    setSafeAuthSignInResponse(null);
  };

  return {
    provider,
    auth,
    login,
    logout,
    safeAuthSignInResponse,
  };
}
