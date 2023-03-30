import { useContext } from "react";
import { SafeContext } from '../../context/SafeProvider';

export function useSafeAuth() {
  const safeContext = useContext(SafeContext);
  const { logout, safeAuth, login, provider, authAddress } = safeContext;

  return {
    provider,
    safeAuth,
    login,
    logout,
    authAddress,
  };
}
