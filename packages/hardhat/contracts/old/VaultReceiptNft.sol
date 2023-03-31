// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract VaultReceiptNft is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
  using Counters for Counters.Counter;

  uint256 public nextTokenId = 1;

  constructor() ERC721("Ape Harmony Vault", "APEHV") {}

  // TODO: Restrict to only vault contracts.
  function safeMint(address to, string memory uri) public {
    _safeMint(to, nextTokenId);
    _setTokenURI(nextTokenId, uri);
    nextTokenId += 1;
  }

  // The following functions are overrides required by Solidity.

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }
}
