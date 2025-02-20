// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GivCertificateNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Mapping from token ID to certificate type
    mapping(uint256 => string) public certificateTypes;
    
    // Events
    event CertificateMinted(address indexed recipient, uint256 indexed tokenId, string certificateType);

    constructor() ERC721("Giv Volunteer Certificate", "GVC") Ownable(msg.sender) {}

    function mintCertificate(
        address recipient,
        string memory certificateType,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        certificateTypes[newTokenId] = certificateType;

        emit CertificateMinted(recipient, newTokenId, certificateType);

        return newTokenId;
    }

    function getCertificateType(uint256 tokenId) public view returns (string memory) {
        return certificateTypes[tokenId];
    }

    // Override required functions
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
