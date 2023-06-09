import React, { createContext, useEffect, useState } from "react";
import { providers } from "ethers";
const WalletContext = createContext();

const WalletContextProvider = ({ children }) => {
  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);
  const [currentSigner, changeAccount] = useState({});
  const [currentProvider, changeProvider] = useState({});
  /*
      connectWallet: Connects the MetaMask wallet
    */
  useEffect(() => {
    if (!walletConnected) {
      getProviderAndSigner();
      if(currentProvider==null)
      {
        setWalletConnected(true)
      }
    }
  }, [walletConnected]);
  const changeWallet = async () => {
    const chainId = await currentSigner.getChainId();
    if (chainId !== 11155111) {
      alert("change your network to sepolia testnet");
    }
  };
  const connectWallet = async () => {
    try {
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };
  const getProviderOrSigner = async () => {
    // Connect to Metamask
    const provider = new providers.Web3Provider(window.ethereum, "any");
    changeProvider(provider);
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    changeAccount(signer);
    setWalletConnected(true);
  };
  const contextValue = {
    currentSigner,
    walletConnected,
    connectWallet,
  };
  const getProviderAndSigner = async () => {
    // Connect to Metamask
    const provider = new providers.Web3Provider(window.ethereum, "any");
    changeProvider(provider);
    const signer = provider.getSigner();
    changeAccount(signer);
  };
  return (
    <>
      <WalletContext.Provider value={contextValue}>
        {children}
      </WalletContext.Provider>
    </>
  );
};

export { WalletContextProvider, WalletContext };
