// import { useState } from 'react';
// import { ethers } from 'ethers'
// import Safe, { SafeFactory } from '@safe-global/safe-core-sdk'
// import EthersAdapter from '@safe-global/safe-ethers-lib'

// export default function useSafeSDK(){
//   const [safeFactory, setSafeFactory] = useState<any>();
//   const [signerWallet, setSignerWallet] = useState<any>();

//   const signerWallet = new ethers.Wallet('<PRIVATE_KEY>', provider); //2
//   const ethAdapter = new EthersAdapter({ethers, signerOrProvider: signerWallet}); //3

//   const init = async (privateKey, provider) => {
//     setSignerWallet(
//       new ethers.Wallet(privateKey, provider);
//     );

//     await SafeFactory.create({ ethAdapter }); //4

//     setProvider(null);
//     setSafeAuthSignInResponse(null);
//   };

//   const createSafe = async () => {
//     if (!ethAdapter) return;

//     await SafeFactory.create({ ethAdapter }); //4

//     setProvider(null);
//     setSafeAuthSignInResponse(null);
//   };

//   const safeFactory = await SafeFactory.create({ ethAdapter }); //4
//   const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig: { threshold: 2, owners: ['0x...', '0x...', '0x..'] }});

// }