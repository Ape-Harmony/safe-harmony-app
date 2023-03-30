import { useState } from "react";
import { SafeAuthKit, SafeAuthProviderType } from "@safe-global/auth-kit";

export function useSafeAuth() {
  const [safeAuth, setSafeAuth] = useState<any>();
  const [provider, setProvider] = useState<any | null>(null);
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<any | null>(null);

  const auth = async () => {
    const safe = await SafeAuthKit.init(SafeAuthProviderType.Web3Auth, {
      chainId: "0x5",
      txServiceUrl: "https://safe-transaction-goerli.safe.global", // Optional. Only if want to retrieve related safes
      authProviderConfig: {
        rpcTarget: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
        clientId: process.env.WEB3_AUTH_CLIENT_ID || "",
        network: "testnet",
        theme: "dark",
      },
    });

    setSafeAuth(safe);
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
    safeAuth,
    auth,
    login,
    logout,
    safeAuthSignInResponse,
  };
}
