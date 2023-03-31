// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777Recipient.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "./gnosis-safe/handler/HandlerContext.sol";
import "./SafeManagerModule.sol";

/// @title Default Callback Handler - returns true for known token callbacks
/// @author Richard Meissner - <richard@gnosis.pm>
contract AirdropForwarderCallbackHandler is
  IERC165,
  IERC1155Receiver,
  IERC777Recipient,
  IERC721Receiver,
  HandlerContext
{
  string public constant NAME = "Airdrop Forwarding Callback Handler";
  string public constant VERSION = "1.0.0";

  event ReceivedTokenDebug(address sender, address by, address from);

  SafeManagerModule public immutable safeManager;

  constructor(SafeManagerModule _manager) {
    safeManager = _manager;
  }

  function onERC1155Received(
    address,
    address,
    uint256,
    uint256,
    bytes calldata
  ) external pure override returns (bytes4) {
    return 0xf23a6e61;
  }

  function onERC1155BatchReceived(
    address,
    address,
    uint256[] calldata,
    uint256[] calldata,
    bytes calldata
  ) external pure override returns (bytes4) {
    return 0xbc197c81;
  }

  function onERC721Received(
    address,
    address from,
    uint256 tokenId,
    bytes calldata
  ) external pure override returns (bytes4) {
    // SafeManagerModule.SafeData memory data = safeManager.safeData(_msgSender());

    // emit ReceivedTokenDebug(_msgSender(), data.lockedTokenContract, from);

    // // Deposit collateral.
    // if (msg.sender == collection) {
    //   if (receiptId != 0) {
    //     // Only allow one collateral.
    //     revert InvalidTransfer("Already collateralized");
    //   }

    //   return this.onERC721Received.selector;
    // }

    return 0x150b7a02;
  }

  function tokensReceived(address, address, address, uint256, bytes calldata, bytes calldata) external pure override {
    // We implement this for completeness, doesn't really have any value
  }

  function supportsInterface(bytes4 interfaceId) external view virtual override returns (bool) {
    return
      interfaceId == type(IERC1155Receiver).interfaceId ||
      interfaceId == type(IERC721Receiver).interfaceId ||
      interfaceId == type(IERC165).interfaceId;
  }
}
