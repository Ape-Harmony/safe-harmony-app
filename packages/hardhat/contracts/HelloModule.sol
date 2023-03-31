// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "@gnosis.pm/safe-contracts/contracts/base/Module.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract HelloModule is Module {
  string public world = "";

  function setup() public {
    setManager();
  }

  function hello() external {
    world = "hello";
  }

  function helloParam(string memory param) external {
    world = param;
  }
}
