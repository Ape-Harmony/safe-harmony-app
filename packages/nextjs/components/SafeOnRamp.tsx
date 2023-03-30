import { SafeOnRampKit, SafeOnRampProviderType } from '@safe-global/onramp-kit'
import { useSigner, useAccount } from "wagmi";
import React, { useState, useEffect } from "react";
import { useSafeAuth } from "../services/web3/safeAuth";

export default function SafeOnRamp() {
  const { login, logout, provider, safeAuth } = useSafeAuth();
  const { data: signer }: any = useSigner();

  const [data, setData] = useState(null);
  const [safeonramp, setSafeOnRamp] = useState(null);


  const fetchData = async () => {
    // const response = await fetch("https://api.example.com/data");
    // const json = await response.json();
    const safeOnRamp = await SafeOnRampKit.init(SafeOnRampProviderType.Stripe, {
      onRampProviderConfig: {
        stripePublicKey:
          'pk_test_51HU0zfLa65ug6JuJb5p5vR635YGUPr3msVcHKMcXOaTPBm5M1lBDFfopEVzgtresIxN2qCrrvVUizZu8EngdVYk600R6TASxVv', // Safe public key
        onRampBackendUrl: 'https://aa-stripe.safe.global', // Safe deployed server
      },
    });
    const sessionData = await safeOnRamp.open({
      walletAddress: "0xa13fe0D873789867EE25C2471145de9c33d7F46b",
      networks: ['ethereum'],
      element: '#stripe-root',
      sessionId: 'cos_1Mei3cKSn9ArdBimJhkCt1XC', // Optional, if you want to use a specific created session
      events: {
        onLoaded: () => console.log('Loaded'),
        onPaymentSuccessful: () => console.log('Payment successful'),
        onPaymentError: () => console.log('Payment failed'),
        onPaymentProcessing: () => console.log('Payment processing')
      }
    })
    // setData(sessionData);
    // setSafeOnRamp(safeOnRamp)
  };




  return (
    <button onClick={fetchData}>
        Get Stripe 
    </button>
  );
}
