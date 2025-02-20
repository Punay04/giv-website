import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import { Wallet as WalletIcon, LocalOffer as CouponIcon } from '@mui/icons-material';

const vouchers = [
  {
    id: 1,
    title: 'Amazon Gift Card',
    description: '₹500 Amazon Gift Card',
    image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2',
    coins: 50,
    provider: 'Amazon',
  },
  {
    id: 2,
    title: 'Flipkart Voucher',
    description: '₹1000 Flipkart Voucher',
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db',
    coins: 100,
    provider: 'Flipkart',
  },
  {
    id: 3,
    title: 'Myntra Fashion Coupon',
    description: '20% off on fashion items',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
    coins: 30,
    provider: 'Myntra',
  },
  {
    id: 4,
    title: 'Swiggy Super Discount',
    description: '₹200 off on food delivery',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
    coins: 25,
    provider: 'Swiggy',
  },
  {
    id: 5,
    title: 'BookMyShow Offer',
    description: 'Buy 1 Get 1 on movie tickets',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1',
    coins: 40,
    provider: 'BookMyShow',
  },
];

const Redeem = () => {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  
  // Mock user data - In real app, this would come from your user context/state
  const userCoins = 150;

  const handleRedeemClick = (voucher) => {
    setSelectedVoucher(voucher);
    setOpenDialog(true);
  };

  const handleConfirmRedeem = () => {
    // Here you would make an API call to process the redemption
    // For now, we'll just show a success message
    setRedeemSuccess(true);
    setTimeout(() => {
      setRedeemSuccess(false);
      setOpenDialog(false);
      setSelectedVoucher(null);
    }, 2000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" gutterBottom>
          Redeem Giv Coins
        </Typography>
        <Chip
          icon={<WalletIcon />}
          label={`${userCoins} Coins Available`}
          color="primary"
          variant="outlined"
          sx={{ fontSize: '1.1rem', py: 2.5, px: 1 }}
        />
      </Box>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Exchange your earned Giv Coins for exclusive vouchers and discounts. Earn 10 coins for every hour of volunteering!
      </Typography>

      <Grid container spacing={3}>
        {vouchers.map((voucher) => (
          <Grid item key={voucher.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={voucher.image}
                alt={voucher.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {voucher.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {voucher.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                  <Chip
                    icon={<CouponIcon />}
                    label={`${voucher.coins} Coins`}
                    color="primary"
                    variant="outlined"
                  />
                  <Button
                    variant="contained"
                    onClick={() => handleRedeemClick(voucher)}
                    disabled={userCoins < voucher.coins}
                  >
                    Redeem
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Redemption</DialogTitle>
        <DialogContent>
          {redeemSuccess ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              Successfully redeemed! Check your email for the voucher code.
            </Alert>
          ) : (
            <>
              <Typography variant="body1" gutterBottom>
                Are you sure you want to redeem:
              </Typography>
              <Typography variant="h6" gutterBottom>
                {selectedVoucher?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This will deduct {selectedVoucher?.coins} coins from your balance.
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!redeemSuccess && (
            <>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={handleConfirmRedeem} variant="contained" autoFocus>
                Confirm
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Redeem;
