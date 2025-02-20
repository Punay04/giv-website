import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Tooltip } from '@mui/material';
import { AccountBalanceWallet as WalletIcon, LinkOff as DisconnectIcon } from '@mui/icons-material';
import detectEthereumProvider from '@metamask/detect-provider';

const WalletButton = () => {
  const [account, setAccount] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected();
    
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      setAccount('');
    } else {
      setAccount(accounts[0]);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const provider = await detectEthereumProvider();
      
      if (provider) {
        const accounts = await provider.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    if (account) {
      // If already connected, disconnect
      setAccount('');
      return;
    }

    try {
      setIsConnecting(true);
      const provider = await detectEthereumProvider();

      if (!provider) {
        window.open('https://metamask.io/download/', '_blank');
        return;
      }

      const accounts = await provider.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Tooltip title={account ? 'Click to disconnect' : 'Connect MetaMask wallet'}>
      <Button
        variant="contained"
        onClick={connectWallet}
        disabled={isConnecting}
        sx={{
          backgroundColor: account ? '#4caf50' : '#2196f3',
          '&:hover': {
            backgroundColor: account ? '#388e3c' : '#1976d2',
          },
          borderRadius: '20px',
          textTransform: 'none',
          px: 3,
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {account ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'white' }}>
                {formatAddress(account)}
              </Typography>
              <DisconnectIcon sx={{ fontSize: 16 }} />
            </Box>
          </>
        ) : (
          <>
            <WalletIcon />
            <Typography variant="body2">
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Typography>
          </>
        )}
      </Button>
    </Tooltip>
  );
};

export default WalletButton;
