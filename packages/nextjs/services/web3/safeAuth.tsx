import { useState, useContext } from "react";
import { SafeAuthKit, SafeAuthProviderType } from "@safe-global/auth-kit";
import { SafeContext } from '../../context/SafeProvider';

export function useSafeAuth() {
  const safeContext = useContext(SafeContext);
  const { safeAuth } = safeContext;
  const [provider, setProvider] = useState<any | null>(null);
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<any | null>(null);

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
    login,
    logout,
    safeAuthSignInResponse,
  };
}
