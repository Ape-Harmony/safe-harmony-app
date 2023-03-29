// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "./VaultReceiptNft.sol";
import "./AugmentedGnosisSafe.sol";

contract SafeManager {
  mapping(VaultReceiptNft => AugmentedGnosisSafe) public receiptToSafe;
  mapping(AugmentedGnosisSafe => mapping(VaultReceiptNft => bool)) isSafeKnown;

  function hello() external {
    require(false, "World");
  }
}
