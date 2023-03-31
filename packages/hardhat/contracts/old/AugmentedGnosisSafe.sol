// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "contracts/gnosis-safe/GnosisSafe.sol";
import "./ContractAddOwner.sol";

contract AugmentedGnosisSafe is GnosisSafe, ContractAddOwner {
  uint256 public acceptedAgreement;
  address public rentedTokenContract;
  uint256 public rentedTokenId;

  function augmentedSetup(address _owner, address _rentedTokenContract, uint256 _rentedTokenId) external {
    address[] memory owners = new address[](1);
    owners[0] = _owner;
    rentedTokenContract = _rentedTokenContract;
    rentedTokenId = _rentedTokenId;
    this.setup(owners, 1, msg.sender, "", address(0), address(0), 0, payable(0));
  }

  function proposeRentalAgreement(uint256 fee, uint8 minDays, uint256 dailyStreamAmount) external {}
}
