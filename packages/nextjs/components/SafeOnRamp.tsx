import { SafeOnRampKit, SafeOnRampProviderType } from "@safe-global/onramp-kit";
import { useSigner } from "wagmi";
import React, { useState } from "react";
import { Tooltip } from "@chakra-ui/react";

import { useSafeAuth } from "../services/web3/safeAuth";

export default function SafeOnRamp() {
  const { authAddress } = useSafeAuth();
  const { data: signer }: any = useSigner();

  const [address, setAuthAddress] = useState<string>(authAddress ? authAddress.eoa : "");

  const fundWallet = async () => {
    // await login()
    setAuthAddress(authAddress.eoa);

    const safeOnRamp = await SafeOnRampKit.init(SafeOnRampProviderType.Stripe, {
      onRampProviderConfig: {
        stripePublicKey:
          "pk_test_51MZbmZKSn9ArdBimSyl5i8DqfcnlhyhJHD8bF2wKrGkpvNWyPvBAYtE211oHda0X3Ea1n4e9J9nh2JkpC7Sxm5a200Ug9ijfoO", // Safe public key
        onRampBackendUrl: "https://aa-stripe.safe.global", // Safe deployed server
      },
    });
    const sessionData = await safeOnRamp.open({
      walletAddress: address,
      networks: ["ethereum", "polygon"],
      element: "#stripe-root",
      // sessionId: 'cos_1Mei3cKSn9ArdBimJhkCt1XC', // Optional, if you want to use a specific created session
      events: {
        onLoaded: () => console.log("Loaded"),
        onPaymentSuccessful: () => console.log("Payment successful"),
        onPaymentError: () => console.log("Payment failed"),
        onPaymentProcessing: () => console.log("Payment processing"),
      },
    });

    console.log({ sessionData });
  };

  const isClickable = authAddress
    ? {}
    : {
        "pointer-events": "none",
        opacity: "0.5",
        filter: "alpha(opacity=100)",
      };

  return (
    <Tooltip label="authenticate to deposit funds">
      <div>
        <div style={isClickable} onClick={fundWallet}>
          <img className="btn-image" src="/assets/btn-fund.svg" alt="landing" />
        </div>
      </div>
    </Tooltip>
  );
}
