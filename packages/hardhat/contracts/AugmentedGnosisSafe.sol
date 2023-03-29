// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "contracts/gnosis-safe/GnosisSafe.sol";
import "./ContractAddOwner.sol";

contract AugmentedGnosisSafe is GnosisSafe, ContractAddOwner {}
