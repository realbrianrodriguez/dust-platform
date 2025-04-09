// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract DustMatter is ERC1155, ERC1155Supply, Ownable {
    using Strings for uint256;

    // Mapping from token ID to metadata URI
    mapping(uint256 => string) private _tokenURIs;
    
    // Mapping from token ID to supplement type
    mapping(uint256 => string) public supplementTypes;
    
    // Base URI for token metadata
    string private _baseURI;

    constructor(string memory baseURI) ERC1155("") Ownable(msg.sender) {
        _baseURI = baseURI;
    }

    /**
     * @dev Creates a new supplement type and mints NFTs
     * @param id Token ID for the new supplement
     * @param amount Number of tokens to mint
     * @param supplementType Type of supplement (e.g., "Ashwagandha")
     * @param uri Metadata URI for the token
     */
    function createSupplement(
        uint256 id,
        uint256 amount,
        string memory supplementType,
        string memory uri
    ) public onlyOwner {
        require(bytes(supplementTypes[id]).length == 0, "Supplement type already exists");
        
        supplementTypes[id] = supplementType;
        _tokenURIs[id] = uri;
        _mint(msg.sender, id, amount, "");
    }

    /**
     * @dev Mints tokens for a specific supplement type
     * @param to Address to mint tokens to
     * @param id Token ID to mint
     * @param amount Number of tokens to mint
     */
    function mintSupplement(
        address to,
        uint256 id,
        uint256 amount
    ) public onlyOwner {
        require(bytes(supplementTypes[id]).length > 0, "Supplement type does not exist");
        _mint(to, id, amount, "");
    }

    /**
     * @dev Returns the URI for a given token ID
     * @param tokenId Token ID to get URI for
     */
    function uri(uint256 tokenId) public view virtual override returns (string memory) {
        require(exists(tokenId), "URI query for nonexistent token");

        string memory tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI;

        if (bytes(tokenURI).length > 0) {
            return string(abi.encodePacked(base, tokenURI));
        }

        return string(abi.encodePacked(base, tokenId.toString()));
    }

    /**
     * @dev Sets the base URI for all token metadata
     * @param newBaseURI New base URI to set
     */
    function setBaseURI(string memory newBaseURI) public onlyOwner {
        _baseURI = newBaseURI;
    }

    /**
     * @dev See {IERC1155-_beforeTokenTransfer}.
     */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
