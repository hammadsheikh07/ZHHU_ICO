import React, { useContext, useEffect, useState } from "react";
import SideBySide from "../../components/SideBySide";
import { Box, Button, Typography } from "@mui/material";
import logo from "../../static/images/logo1500.png";
import { WalletContext } from "../../WalletContext";
import {
  whitelistContractAddress,
  whitelistabi,
} from "../../constants/contants";
import { Contract } from "ethers";
const Home = () => {
  const { currentSigner, walletConnected } = useContext(WalletContext);
  // joinedWhitelist keeps track of whether the current metamask address has joined the Whitelist or not
  const [joinedWhitelist, setJoinedWhitelist] = useState(false);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);
  // numberOfWhitelisted tracks the number of addresses's whitelisted
  const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);
  useEffect(() => {
    if (walletConnected) {
      checkIfAddressInWhitelist();
      getNumberOfWhitelisted();
    }
  },);
  /**
   * addAddressToWhitelist: Adds the current connected address to the whitelist
   */
  const addAddressToWhitelist = async () => {
    try {
      const whitelistContract = new Contract(
        whitelistContractAddress,
        whitelistabi,
        currentSigner
      );
      console.log(whitelistContract);
      // call the addAddressToWhitelist from the contract
      const tx = await whitelistContract.addAddressToWhitelist();
      console.log(tx);
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      // get the updated number of addresses in the whitelist
      await getNumberOfWhitelisted();
      setJoinedWhitelist(true);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * getNumberOfWhitelisted:  gets the number of whitelisted addresses
   */
  const getNumberOfWhitelisted = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // No need for the Signer here, as we are only reading state from the blockchain
      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      const whitelistContract = new Contract(
        whitelistContractAddress,
        whitelistabi,
        currentSigner
      );
      // call the numAddressesWhitelisted from the contract
      const _numberOfWhitelisted =
        await whitelistContract.numAddressesWhitelisted();
      setNumberOfWhitelisted(_numberOfWhitelisted);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * checkIfAddressInWhitelist: Checks if the address is in whitelist
   */
  const checkIfAddressInWhitelist = async () => {
    try {
      // We will need the signer later to get the user's address
      // Even though it is a read transaction, since Signers are just special kinds of Providers,
      // We can use it in it's place
      const whitelistContract = new Contract(
        whitelistContractAddress,
        whitelistabi,
        currentSigner
      );
      // Get the address associated to the signer which is connected to  MetaMask
      const address = await currentSigner.getAddress();
      // call the whitelistedAddresses from the contract
      const _joinedWhitelist = await whitelistContract.whitelistedAddresses(
        address
      );
      setJoinedWhitelist(_joinedWhitelist);
    } catch (err) {
      console.error(err);
    }
  };

  const RenderButton = () => {
    if (walletConnected) {
      if (joinedWhitelist) {
        return <Typography>Thanks for joining the Whitelist</Typography>;
      } else if (loading) {
        return <Button variant="contained">Loading...</Button>;
      } else {
        return (
          <Button variant="contained" onClick={addAddressToWhitelist}>
            Join the Whitelist
          </Button>
        );
      }
    } else {
    }
  };

  const leftComponent = (
    <>
      <Typography variant="h2" sx={{ my: 0.5, color: "white" }}>
        Welcome to ZHHU!
      </Typography>
      <Typography
        variant="h5"
        sx={{ my: 0.5, color: "white", textAlign: "center" }}
      >
        Whitelist your address to mint NFT so that you can participate in ICO
      </Typography>
      <Typography sx={{ color: "white", mb: "10px" }}>
        {numberOfWhitelisted} have already joined the Whitelist
      </Typography>
      {RenderButton()}
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

export default Home;
