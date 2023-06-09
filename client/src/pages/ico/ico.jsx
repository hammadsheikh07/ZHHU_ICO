import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Input, Typography } from "@mui/material";
import SideBySide from "../../components/SideBySide";
import logo from "../../static/images/logo1500.png";
import {
  ZHHU_Tokens_Address,
  zhhutokenabi,
  PRE_NFTDROP_Address,
  prenftabi,
} from "../../constants/contants";
import { WalletContext } from "../../WalletContext";
import { BigNumber, Contract, utils } from "ethers";
const ICO = () => {
  const { walletConnected, currentSigner, connectWallet } =
    useContext(WalletContext);
  // Create a BigNumber `0`
  const zero = BigNumber.from(0);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);
  // tokensToBeClaimed keeps track of the number of tokens that can be claimed
  // based on the ZHHU NFT's held by the user for which they havent claimed the tokens
  const [tokensToBeClaimed, setTokensToBeClaimed] = useState(zero);
  // balanceOfCryptoDevTokens keeps track of number of ZHHU tokens owned by an address
  const [balanceOfCryptoDevTokens, setBalanceOfCryptoDevTokens] =
    useState(zero);
  // amount of the tokens that the user wants to mint
  const [tokenAmount, setTokenAmount] = useState(zero);
  // tokensMinted is the total number of tokens that have been minted till now out of 10000(max total supply)
  const [tokensMinted, setTokensMinted] = useState(zero);
  // isOwner gets the owner of the contract through the signed address
  const [isOwner, setIsOwner] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  useEffect(()=>{
    if(walletConnected)
    {
       getTotalTokensMinted();
       getBalanceOfCryptoDevTokens();
       getTokensToBeClaimed();
    }
  })
  const getTokensToBeClaimed = async () => {
    try {
      // Create an instance of NFT Contract
      const nftContract = new Contract(
        PRE_NFTDROP_Address,
        prenftabi,
        currentSigner
      );
      // Create an instance of tokenContract
      const tokenContract = new Contract(
        ZHHU_Tokens_Address,
        zhhutokenabi,
        currentSigner
      );
      // Get the address associated to the signer which is connected to  MetaMask
      const address = await currentSigner.getAddress();
      // call the balanceOf from the NFT contract to get the number of NFT's held by the user
      const balance = await nftContract.balanceOf(address);
      // balance is a Big number and thus we would compare it with Big number `zero`
      if (balance === zero) {
        setTokensToBeClaimed(zero);
      } else {
        // amount keeps track of the number of unclaimed tokens
        var amount = 0;
        // For all the NFT's, check if the tokens have already been claimed
        // Only increase the amount if the tokens have not been claimed
        // for a an NFT(for a given tokenId)
        for (var i = 0; i < balance; i++) {
          const tokenId = await nftContract.tokenOfOwnerByIndex(address, i);
          const claimed = await tokenContract.tokenIdsClaimed(tokenId);
          if (!claimed) {
            amount++;
          }
        }
        //tokensToBeClaimed has been initialized to a Big Number, thus we would convert amount
        // to a big number and then set its value
        setTokensToBeClaimed(BigNumber.from(amount));
      }
    } catch (err) {
      console.error(err);
      setTokensToBeClaimed(zero);
    }
  };

  /**
   * getBalanceOfCryptoDevTokens: checks the balance of ZHHU Tokens's held by an address
   */
  const getBalanceOfCryptoDevTokens = async () => {
    try {
      // Create an instace of token contract
      const tokenContract = new Contract(
        ZHHU_Tokens_Address,
        zhhutokenabi,
        currentSigner
      );
      // Get the address associated to the signer which is connected to  MetaMask
      const address = await currentSigner.getAddress();
      // call the balanceOf from the token contract to get the number of tokens held by the user
      const balance = await tokenContract.balanceOf(address);
      // balance is already a big number, so we dont need to convert it before setting it
      setBalanceOfCryptoDevTokens(balance);
    } catch (err) {
      console.error(err);
      setBalanceOfCryptoDevTokens(zero);
    }
  };

  /**
   * mintCryptoDevToken: mints `amount` number of tokens to a given address
   */
  const mintCryptoDevToken = async (amount) => {
    try {
      // Create an instance of tokenContract
      const tokenContract = new Contract(
        ZHHU_Tokens_Address,
        zhhutokenabi,
        currentSigner
      );
      // Each token is of `0.001 ether`. The value we need to send is `0.001 * amount`
      const value = 0.001 * amount;
      const tx = await tokenContract.mint(amount, {
        // value signifies the cost of one ZHHU token which is "0.001" eth.
        // We are parsing `0.001` string to ether using the utils library from ethers.js
        value: utils.parseEther(value.toString()),
      });
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      window.alert("Sucessfully minted ZHHU Tokens");
      await getBalanceOfCryptoDevTokens();
      await getTotalTokensMinted();
      await getTokensToBeClaimed();
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * claimCryptoDevTokens: Helps the user claim ZHHU Tokens
   */
  const claimCryptoDevTokens = async () => {
    try {
      // Create an instance of tokenContract
      const tokenContract = new Contract(
        ZHHU_Tokens_Address,
        zhhutokenabi,
        currentSigner
      );
      const tx = await tokenContract.claim();
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      window.alert("Sucessfully claimed ZHHU Tokens");
      await getBalanceOfCryptoDevTokens();
      await getTotalTokensMinted();
      await getTokensToBeClaimed();
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * getTotalTokensMinted: Retrieves how many tokens have been minted till now
   * out of the total supply
   */
  const getTotalTokensMinted = async () => {
    try {
      // Create an instance of token contract
      const tokenContract = new Contract(
        ZHHU_Tokens_Address,
        zhhutokenabi,
        currentSigner
      );
      // Get all the tokens that have been minted
      const _tokensMinted = await tokenContract.totalSupply();
      setTokensMinted(_tokensMinted);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * getOwner: gets the contract owner by connected address
   */
  const getOwner = async () => {
    try {
      const tokenContract = new Contract(
        ZHHU_Tokens_Address,
        zhhutokenabi,
        currentSigner
      );
      // call the owner function from the contract
      const _owner = await tokenContract.owner();
      // Get the address associated to signer which is connected to Metamask
      const address = await currentSigner.getAddress();
      if (address.toLowerCase() === _owner.toLowerCase()) {
        setIsOwner(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  /**
   * withdrawCoins: withdraws ether and tokens by calling
   * the withdraw function in the contract
   */
  const withdrawCoins = async () => {
    try {
      const tokenContract = new Contract(
        ZHHU_Tokens_Address,
        zhhutokenabi,
        currentSigner
      );

      const tx = await tokenContract.withdraw();
      setLoading(true);
      await tx.wait();
      setLoading(false);
      await getOwner();
    } catch (err) {
      console.error(err);
    }
  };

  const renderButton = () => {
    // If we are currently waiting for something, return a loading Button
    if (loading) {
      return (
        <div>
          <Button>Loading...</Button>
        </div>
      );
    }
    // if owner is connected, withdrawCoins() is called
    if (walletConnected && isOwner) {
      return (
        <div>
          <Button variant="contained" onClick={withdrawCoins}>
            Withdraw Coins
          </Button>
        </div>
      );
    }
    // If tokens to be claimed are greater than 0, Return a claim Button
    if (tokensToBeClaimed > 0) {
      return (
        <div>
          <Typography>
            {tokensToBeClaimed * 10} Tokens can be claimed!
          </Typography>
          <Button variant="contained" onClick={claimCryptoDevTokens}>
            Claim Tokens
          </Button>
        </div>
      );
    }
  };

  const leftComponent = (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2">Claim ICO Tokens</Typography>
      <Typography>
        Participate in ICO, each pre drop NFT = 10 ZHHU tokens
      </Typography>
      {renderButton()}
    </Box>
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

export default ICO;
