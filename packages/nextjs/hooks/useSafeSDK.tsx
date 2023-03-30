// yarn install ethers@5.0.0 @safe-global/safe-core-sdk @safe-global/safe-ethers-lib
import { ethers } from 'ethers'
import Safe, { SafeFactory } from '@safe-global/safe-core-sdk'
import EthersAdapter from '@safe-global/safe-ethers-lib'

function useSafeSDK(){
  const provider = new ethers.providers.JsonRpcProvider('...'); //1
  const signerWallet = new ethers.Wallet('<PRIVATE_KEY>', provider); //2
  const ethAdapter = new EthersAdapter({ethers, signerOrProvider: signerWallet}); //3

  const safeFactory = await SafeFactory.create({ ethAdapter }); //4
  const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig: { threshold: 2, owners: ['0x...', '0x...', '0x..'] }}); //5
}