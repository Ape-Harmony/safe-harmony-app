// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./gnosis-safe/GnosisSafe.sol";

// interface GnosisSafe {
//     /// @dev Allows a Module to execute a Safe transaction without any further confirmations.
//     /// @param to Destination address of module transaction.
//     /// @param value Ether value of module transaction.
//     /// @param data Data payload of module transaction.
//     /// @param operation Operation type of module transaction.
//     function execTransactionFromModule(address to, uint256 value, bytes calldata data, Enum.Operation operation)
//         external
//         returns (bool success);
// }

contract SafeManagerModule {
  // struct RentalAgreement {
  //   uint256 fee;
  //   uint8 minDays;
  //   uint256 dailyStreamAmount;
  //   address proposer;
  // }

  struct SafeData {
    address primaryOwner;
    IERC721 lockedTokenContract;
    uint256 lockedTokenId;
    // uint256 acceptedAgreementIndex;
    uint256 streamAmntUsdcPerSec;
  }

  // mapping(AugmentedGnosisSafe => RentalAgreement[]) public proposedAgreements;
  mapping(GnosisSafe => SafeData) public safeData;

  constructor() {}

  // function deploySafe() {
  // bytes data = abi.encodeWithSignature("addOwnerWithThreshold(address,uint256)", recoverer, 1);

  //   safe.execTransactionFromModule(address(safe), 0, data, Enum.Operation.Call);
  // }

  function registerSafe(
    GnosisSafe safe,
    IERC721 lockedTokenContract,
    uint256 lockedTokenId,
    uint256 streamAmntUsdcPerSec
  ) external {
    require(safeData[safe].primaryOwner != address(0), "Safe already registered");
    require(safe.getOwners()[0] == msg.sender, "Caller does not match safe owner");
    require(lockedTokenContract.ownerOf(lockedTokenId) == address(safe), "Safe does not own locked token");

    safeData[safe] = SafeData(msg.sender, lockedTokenContract, lockedTokenId, streamAmntUsdcPerSec);
  }

  // function proposeRentalAgreement(
  //   AugmentedGnosisSafe safe,
  //   uint256 fee,
  //   uint8 minDays,
  //   uint256 dailyStreamAmount // TODO Super Stream
  // ) external payable {
  //   // AugmentedGnosisSafe gnosisSafe = AugmentedGnosisSafe(safe);
  //   // gnosisSafe.proposeRentalAgreement(fee, minDays, dailyStreamAmount);

  //   // require(msg.value >= fee);

  //   proposedAgreements[safe].push(RentalAgreement(fee, minDays, dailyStreamAmount, msg.sender));
  // }

  // function acceptRentalAgreement(AugmentedGnosisSafe safe) external {
  //   require(msg.sender == safe.getOwners()[0], "Not the primary owner of the safe");

  //   // proposedAgreements[safe].push(RentalAgreement(fee, minDays, dailyStreamAmount, msg.sender));
  // }

  // // Inspired by Superfluid's EmploymentLoan.sol
  // function getPaymentFlowRate() public view returns (int96 paymentFlowRate) {
  //   return int96((borrowAmount * int256(interestRate)) / int256(100));
  // }

  // function executeRentalAgreement(AugmentedGnosisSafe safe, uint256 index) external {
  //   require(acceptedAgreement[safe] == index, "Not the accepted agreement");

  //   RentalAgreement memory agreement = proposedAgreements[safe][index];
  //   require(msg.sender == agreement.proposer, "Not the proposer of the agreement");

  //   safe.addOwnerWithThreshold(agreement.proposer, 2);

  //   acceptedToken.createFlowFrom(agreement.proposer, address(this), flowRate);

  //   // proposedAgreements[safe].push(RentalAgreement(fee, minDays, dailyStreamAmount, msg.sender));
  // }
}
