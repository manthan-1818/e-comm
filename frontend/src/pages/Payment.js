// src/pages/Payment.js

import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Divider } from '@mui/material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { placeOrder } from '../redux/slice/orderSlice';

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handlePlaceOrder = () => {
    const orderDetails = {
      paymentInfo: paymentInfo,
    };

    dispatch(placeOrder(orderDetails));

    navigate('/order-confirmation');
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Payment
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Card Number"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Expiry Date"
            name="expiryDate"
            value={paymentInfo.expiryDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="CVV"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Card Holder Name"
            name="cardHolderName"
            value={paymentInfo.cardHolderName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Box>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: '#d63384',
            '&:hover': {
              backgroundColor: '#c62874',
            },
          }}
          onClick={handlePlaceOrder}
          fullWidth
        >
          Place Order
        </Button>
      </Container>
    </>
  );
};

export default Payment;
