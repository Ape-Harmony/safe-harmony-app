// // SPDX-License-Identifier: UNLICENSED
// pragma solidity 0.8.19;

// import "./VaultReceiptNft.sol";
// import "./AugmentedGnosisSafe.sol";

// import {ISuperAgreement, SuperAppDefinitions, ISuperfluid, ISuperToken, ISuperApp} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
// import {SuperAppBase} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";
// import "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol" as CFALibraryV1;

// using CFALibraryV1 for CFALibraryV1.InitData;

// // constructor(ISuperfluid host) {
// // }

// // function afterAgreementCreated(
// //   ISuperToken _superToken,
// //   address _agreementClass,
// //   bytes32, // _agreementId,
// //   bytes calldata /*_agreementData*/,
// //   bytes calldata, // _cbdata,
// //   bytes calldata _ctx
// // ) external override onlyExpected(_superToken, _agreementClass) onlyHost returns (bytes memory newCtx) {
// //   newCtx = cfaV1.createFlowWithCtx(_ctx, receiver, token, flowRate); //passing in the ctx which is sent to the callback here
// //   newCtx = cfaV1.createFlowWithCtx(newCtx, receiver, token, flowRate); //passing in the ctx which is returned from the first call here
// // }

// contract SafeManager is SuperAppBase {
//   //initialize cfaV1 variable
//   CFALibraryV1.InitData public cfaV1;

//   struct RentalAgreement {
//     uint256 fee;
//     uint8 minDays;
//     uint256 dailyStreamAmount;
//     address proposer;
//   }

//   struct SafeData {
//     uint256 acceptedAgreementIndex;
//     address lockedTokenContract;
//     uint256 lockedTokenId;
//   }

//   // mapping(VaultReceiptNft => AugmentedGnosisSafe) public receiptToSafe;
//   mapping(AugmentedGnosisSafe => RentalAgreement[]) public proposedAgreements;
//   mapping(AugmentedGnosisSafe => address) public safeToPrimaryOwner;
//   mapping(AugmentedGnosisSafe => SafeData) public safeData;

//   // ISuperfluid public host;

//   constructor(ISuperfluid host) {
//     // acceptedToken = _acceptedToken;
//     // underlyingToken = _underlyingToken;

//     //initialize InitData struct, and set equal to cfaV1
//     cfaV1 = CFALibraryV1.InitData(
//       host,
//       IConstantFlowAgreementV1(
//         address(host.getAgreementClass(keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1")))
//       )
//     );

//     // Super app registration
//     // Do not allow external agreement creation / updating
//     uint256 configWord = SuperAppDefinitions.APP_LEVEL_FINAL | SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP;
//     _host.registerApp(configWord);
//   }

//   function proposeRentalAgreement(
//     AugmentedGnosisSafe safe,
//     uint256 fee,
//     uint8 minDays,
//     uint256 dailyStreamAmount // TODO Super Stream
//   ) external payable {
//     // AugmentedGnosisSafe gnosisSafe = AugmentedGnosisSafe(safe);
//     // gnosisSafe.proposeRentalAgreement(fee, minDays, dailyStreamAmount);

//     // require(msg.value >= fee);

//     proposedAgreements[safe].push(RentalAgreement(fee, minDays, dailyStreamAmount, msg.sender));
//   }

//   function acceptRentalAgreement(AugmentedGnosisSafe safe) external {
//     require(msg.sender == safe.getOwners()[0], "Not the primary owner of the safe");

//     // proposedAgreements[safe].push(RentalAgreement(fee, minDays, dailyStreamAmount, msg.sender));
//   }

//   // Inspired by Superfluid's EmploymentLoan.sol
//   function getPaymentFlowRate() public view returns (int96 paymentFlowRate) {
//     return int96((borrowAmount * int256(interestRate)) / int256(100));
//   }

//   function executeRentalAgreement(AugmentedGnosisSafe safe, uint256 index) external {
//     require(acceptedAgreement[safe] == index, "Not the accepted agreement");

//     RentalAgreement memory agreement = proposedAgreements[safe][index];
//     require(msg.sender == agreement.proposer, "Not the proposer of the agreement");

//     safe.addOwnerWithThreshold(agreement.proposer, 2);

//     acceptedToken.createFlowFrom(agreement.proposer, address(this), flowRate);

//     // proposedAgreements[safe].push(RentalAgreement(fee, minDays, dailyStreamAmount, msg.sender));
//   }

//   // modifiers
//   modifier onlyHost() {
//     if (msg.sender != address(host)) revert Unauthorized();
//     _;
//   }

//   function afterAgreementCreated(
//     ISuperToken _superToken,
//     address _agreementClass,
//     bytes32, // _agreementId,
//     bytes calldata, // _agreementData
//     bytes calldata, // _cbdata,
//     bytes calldata _ctx
//   ) external override onlyHost returns (bytes memory newCtx) {
//     address safe = _ctx.msgSender;
//     RentalAgreement memory agreement = proposedAgreements[safe][index];

//     newCtx = cfaV1.createFlowWithCtx(_ctx, receiver, token, flowRate); //passing in the ctx which is sent to the callback here
//     return _ctx;
//   }

//   function afterAgreementTerminated(
//     ISuperToken _superToken,
//     address _agreementClass,
//     bytes32, // _agreementId,
//     bytes calldata, // _agreementData
//     bytes calldata, // _cbdata,
//     bytes calldata _ctx
//   ) external override onlyHost returns (bytes memory newCtx) {
//     RentalAgreement memory agreement = proposedAgreements[safe][index];

//     liquidateUser();
//     return _ctx;
//   }

//   // function hello() external {
//   //   require(false, "World");
//   // }
// }
