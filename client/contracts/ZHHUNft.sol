// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.4;
  import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
  import "@openzeppelin/contracts/access/Ownable.sol";
  import "./IZHHU.sol";

  contract PreNFTDrop is ERC721Enumerable, Ownable {
      /**
       *  _baseTokenURI for computing {tokenURI}. If set, the resulting URI for each
       * token will be the concatenation of the `baseURI` and the `tokenId`.
       */
      string _baseTokenURI;

      //  _price is the price of one Crypto Dev NFT
      uint256 public _price = 0.001 ether;

      uint256 public _icoprice=0.00001 ether;

      // _paused is used to pause the contract in case of an emergency
      bool public _paused;

      // max number of PreNFTDrop
      uint256 public maxTokenIds = 10;

      // total number of tokenIds minted
      uint256 public tokenIds;

      // zhhu contract instance
      IZHHU zhhu;

      modifier onlyWhenNotPaused {
          require(!_paused, "Contract currently paused");
          _;
      }

      /**
       *  ERC721 constructor takes in a `name` and a `symbol` to the token collection.
       * name in our case is `Crypto Devs` and symbol is `CD`.
       * Constructor for Crypto Devs takes in the baseURI to set _baseTokenURI for the collection.
       * It also initializes an instance of whitelist interface.
       */
      constructor (string memory baseURI, address zhhucontract) ERC721("ZHHU Pre NFT Drop", "PIN") {
          _baseTokenURI = baseURI;
          zhhu = IZHHU(zhhucontract);
      }

      /**
      *  mint allows a user to mint 1 NFT per transaction after the presale has ended.
      */
      function mint() public payable {
          require(tokenIds < maxTokenIds, "Exceed maximum Crypto Devs supply");
          if(zhhu.tokenOwners(msg.sender))
          {
            require(msg.value >= _icoprice, "Ether sent is not correct");
          }
          else {
            require(msg.value >= _price, "Ether sent is not correct");
          }
          tokenIds += 1;
          _safeMint(msg.sender, tokenIds);
      }

      /**
      * _baseURI overides the Openzeppelin's ERC721 implementation which by default
      * returned an empty string for the baseURI
      */
      function _baseURI() internal view virtual override returns (string memory) {
          return _baseTokenURI;
      }


      /**
      *  withdraw sends all the ether in the contract
      * to the owner of the contract
       */
      function withdraw() public onlyOwner  {
          address _owner = owner();
          uint256 amount = address(this).balance;
          (bool sent, ) =  _owner.call{value: amount}("");
          require(sent, "Failed to send Ether");
      }

       // Function to receive Ether. msg.data must be empty
      receive() external payable {}

      // Fallback function is called when msg.data is not empty
      fallback() external payable {}
  }

  