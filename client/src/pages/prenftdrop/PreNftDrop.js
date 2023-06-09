import React, { useContext, useEffect, useState } from "react";
import SideBySide from "../../components/SideBySide";
import { Box, Button, Typography } from "@mui/material";
import logo from "../../static/images/logo1500.png";
import { WalletContext } from "../../WalletContext";
import { prenftabi, PRE_NFTDROP_Address } from "../../constants/contants";
import { Contract, utils } from "ethers";

const PreNFTDrop = () => {
  const [totalMinted, setTotalMinted] = useState(19);
  const { walletConnected, currentSigner, connectWallet } =
    useContext(WalletContext);
  // presaleStarted keeps track of whether the presale has started or not
  const [presaleStarted, setPresaleStarted] = useState(false);
  // presaleEnded keeps track of whether the presale ended
  const [presaleEnded, setPresaleEnded] = useState(false);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);
  // checks if the currently connected MetaMask wallet is the owner of the contract
  const [isOwner, setIsOwner] = useState(false);
  // tokenIdsMinted keeps track of the number of tokenIds that have been minted
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");

  useEffect(() => {
    if (walletConnected) {
      checkIfPresaleStarted();
      checkIfPresaleEnded();
      getOwner();
      getTokenIdsMinted();
    }
  });
  /**
   * presaleMint: Mint an NFT during the presale
   */
  const presaleMint = async () => {
    try {
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const nftContract = new Contract(
        PRE_NFTDROP_Address,
        prenftabi,
        currentSigner
      );
      // call the presaleMint from the contract, only whitelisted addresses would be able to mint
      const tx = await nftContract.presaleMint({
        // value signifies the cost of one Pre NFT drop which is "0.01" eth.
        // We are parsing `0.01` string to ether using the utils library from ethers.js
        value: utils.parseEther("0.01"),
      });
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      window.alert("You successfully minted a Pre NFT drop!");
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * publicMint: Mint an NFT after the presale
   */
  const publicMint = async () => {
    try {
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const nftContract = new Contract(
        PRE_NFTDROP_Address,
        prenftabi,
        currentSigner
      );
      // call the mint from the contract to mint the Pre NFT drop
      const tx = await nftContract.mint({
        // value signifies the cost of one Pre NFT drop which is "0.01" eth.
        // We are parsing `0.01` string to ether using the utils library from ethers.js
        value: utils.parseEther("0.01"),
      });
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      window.alert("You successfully minted a PRE-NFT!");
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * startPresale: starts the presale for the NFT Collection
   */
  const startPresale = async () => {
    try {
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const nftContract = new Contract(
        PRE_NFTDROP_Address,
        prenftabi,
        currentSigner
      );
      // call the startPresale from the contract
      const tx = await nftContract.startPresale();
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      // set the presale started to true
      await checkIfPresaleStarted();
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * checkIfPresaleStarted: checks if the presale has started by quering the `presaleStarted`
   * variable in the contract
   */
  const checkIfPresaleStarted = async () => {
    try {
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const nftContract = new Contract(
        PRE_NFTDROP_Address,
        prenftabi,
        currentSigner
      );
      // call the presaleStarted from the contract
      const _presaleStarted = await nftContract.presaleStarted();
      if (!_presaleStarted) {
        await getOwner();
      }
      setPresaleStarted(_presaleStarted);
      return _presaleStarted;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  /**
   * checkIfPresaleEnded: checks if the presale has ended by quering the `presaleEnded`
   * variable in the contract
   */
  const checkIfPresaleEnded = async () => {
    try {
      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      const nftContract = new Contract(
        PRE_NFTDROP_Address,
        prenftabi,
        currentSigner
      ); // call the presaleEnded from the contract
      const _presaleEnded = await nftContract.presaleEnded();
      // _presaleEnded is a Big Number, so we are using the lt(less than function) instead of `<`
      // Date.now()/1000 returns the current time in seconds
      // We compare if the _presaleEnded timestamp is less than the current time
      // which means presale has ended
      const hasEnded = _presaleEnded.lt(Math.floor(Date.now() / 1000));
      if (hasEnded) {
        setPresaleEnded(true);
      } else {
        setPresaleEnded(false);
      }
      return hasEnded;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  /**
   * getOwner: calls the contract to retrieve the owner
   */
  const getOwner = async () => {
    try {
      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      const nftContract = new Contract(
        PRE_NFTDROP_Address,
        prenftabi,
        currentSigner
      ); // call the owner function from the contract
      const _owner = await nftContract.owner();

      // Get the address associated to the signer which is connected to  MetaMask
      const address = await currentSigner.getAddress();
      if (address.toLowerCase() === _owner.toLowerCase()) {
        setIsOwner(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  /**
   * getTokenIdsMinted: gets the number of tokenIds that have been minted
   */
  const getTokenIdsMinted = async () => {
    try {
      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      const nftContract = new Contract(
        PRE_NFTDROP_Address,
        prenftabi,
        currentSigner
      );
      // call the tokenIds from the contract
      const _tokenIds = await nftContract.tokenIds();
      //_tokenIds is a `Big Number`. We need to convert the Big Number to a string
      setTokenIdsMinted(_tokenIds.toString());
    } catch (err) {
      console.error(err);
    }
  };

  /*
      renderButton: Returns a Button based on the state of the dapp
    */
  const renderButton = () => {
    // If wallet is not connected, return a Button which allows them to connect their wllet
    if (!walletConnected) {
      return (
        <Button onClick={connectWallet} variant="contained">
          Connect your wallet
        </Button>
      );
    }

    // If we are currently waiting for something, return a loading Button
    if (loading) {
      return <Button variant="contained">Loading...</Button>;
    }

    // If connected user is the owner, and presale hasnt started yet, allow them to start the presale
    if (isOwner && !presaleStarted) {
      return (
        <Button variant="contained" onClick={startPresale}>
          Start Presale!
        </Button>
      );
    }

    // If connected user is not the owner but presale hasn't started yet, tell them that
    if (!presaleStarted) {
      return (
        <div>
          <Typography>Presale hasnt started!</Typography>
        </div>
      );
    }

    // If presale started, but hasn't ended yet, allow for minting during the presale period
    if (presaleStarted && !presaleEnded) {
      return (
        <div>
          <Typography>
            Presale has started!!! If your address is whitelisted, Mint a Crypto
            Dev 🥳
          </Typography>
          <Button variant="contained" onClick={presaleMint}>
            Presale Mint 🚀
          </Button>
        </div>
      );
    }

    // If presale started and has ended, its time for public minting
    if (presaleStarted && presaleEnded) {
      return (
        <Button variant="contained" onClick={publicMint}>
          Public Mint 🚀
        </Button>
      );
    }
  };

  const leftComponent = (
    <>
      <Typography
        variant="h2"
        sx={{ my: 0.5, color: "white", textAlign: "center" }}
      >
        Welcome to ZHHU PreNFTDrop!
      </Typography>
      <Typography variant="h5" sx={{ my: 0.5, color: "white" }}>
        Its an Pre NFT drop to participate in ICO.
      </Typography>
      {renderButton()}
    </>
  );

  const rightComponent = (
    <>
      <img style={{ width: "50%" }} src={logo} />
    </>
  );
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SideBySide
        leftComponent={leftComponent}
        rightComponent={rightComponent}
        leftStyles={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        rightStyles={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      ;
    </Box>
  );
};

export default PreNFTDrop;
