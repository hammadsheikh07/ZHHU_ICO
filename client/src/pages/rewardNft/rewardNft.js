import React, { useContext, useEffect, useState } from "react";
import SideBySide from "../../components/SideBySide";
import { Box, Button, Typography } from "@mui/material";
import logo from "../../static/images/logo1500.png";
import { WalletContext } from "../../WalletContext";
import {
  rewardnftabi,
  REWARD_NFT_ADDRESS,
  ZHHU_Tokens_Address,
  zhhutokenabi,
} from "../../constants/contants";
import { Contract, utils } from "ethers";

const RewardNft = () => {
  const [totalMinted, setTotalMinted] = useState(19);
  const { walletConnected, currentSigner, connectWallet } =
    useContext(WalletContext);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);
  // checks if the currently connected MetaMask wallet is the owner of the contract
  const [isOwner, setIsOwner] = useState(false);

  const [isReward, setReward] = useState(false);

  useEffect(() => {
    if (walletConnected) {
      getOwner();
      getRewardCheck();
    }
  });
  /**
   * mint: Mint an NFT during the presale
   */
  const mintNFT = async () => {
    try {
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const nftContract = new Contract(
        REWARD_NFT_ADDRESS,
        rewardnftabi,
        currentSigner
      );
      let valuee = "";
      if (isReward) {
        valuee = "0.0001";
      } else {
        valuee = "0.01";
      }
      // call the presaleMint from the contract, only whitelisted addresses would be able to mint
      const tx = await nftContract.mint({
        // value signifies the cost of one Pre NFT drop which is "0.01" eth.
        // We are parsing `0.01` string to ether using the utils library from ethers.js
        value: utils.parseEther(valuee),
      });
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      window.alert("You successfully minted a reward NFT drop!");
    } catch (err) {
      console.error(err);
    }
  };

  const getRewardCheck = async () => {
    try {
      const tokenContract = new Contract(
        ZHHU_Tokens_Address,
        zhhutokenabi,
        currentSigner
      );

      setLoading(true);
      const tx = await tokenContract.getReward();
      setReward(tx);
      setLoading(false);
    } catch (err) {
      console.error(err);
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
        REWARD_NFT_ADDRESS,
        rewardnftabi,
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
    } else
      return (
        <Button variant="contained" onClick={mintNFT}>
          Claim Reward
        </Button>
      );
  };

  const leftComponent = (
    <>
      <Typography
        variant="h2"
        sx={{ my: 0.5, color: "white", textAlign: "center" }}
      >
        Welcome to ZHHU Reward NFT!
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
        minHeight: "91vh",
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
    </Box>
  );
};

export default RewardNft;
