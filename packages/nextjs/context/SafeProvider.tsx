import { createContext, ReactNode, useEffect, useState } from "react";
import { SafeAuthKit, SafeAuthProviderType } from "@safe-global/auth-kit";

const SafeContext = createContext<any | undefined>(undefined);

const SafeProvider = ({ children }: { children: ReactNode }) => {
  const [safeAuth, setSafeAuth] = useState<any>();
  const [authAddress, setAuthAddress] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [provider, setProvider] = useState<any | null>(null);

  const auth = async () => {
    setIsLoading(true);
    try {
      const safe = await SafeAuthKit.init(SafeAuthProviderType.Web3Auth, {
        chainId: "0x5",
        txServiceUrl: "https://safe-transaction-goerli.safe.global", // Optional. Only if want to retrieve related safes
        authProviderConfig: {
          rpcTarget: `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
          clientId: process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID,
          network: "testnet",
          theme: "dark",
        },
      });
      setSafeAuth(safe);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const login = async () => {
    if (!safeAuth) return;

    const response = await safeAuth.signIn();
    console.log("SIGN IN RESPONSE: ", response);

    setAuthAddress(response);
    setProvider(safeAuth.getProvider() as any);
  };
  const logout = async () => {
    if (!safeAuth) return;

    await safeAuth.signOut();

    setProvider(null);
    setAuthAddress(null);
  };

  useEffect(() => {
    auth();
  }, []);

  return (
    <SafeContext.Provider value={{ isLoading, safeAuth, login, authAddress, provider, logout }}>
      {children}
    </SafeContext.Provider>
  );
};

export { SafeProvider, SafeContext };
