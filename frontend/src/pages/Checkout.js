import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { placeOrder } from "../redux/slice/orderSlice";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) =>
    state.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );
  const location = useLocation();
  const buyNowProduct = location.state?.buyNowProduct || null;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    if (!buyNowProduct && cartItems.length === 0) {
      navigate("/cart");
    }
  }, [buyNowProduct, cartItems, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleProceedToPayment = () => {
    const orderDetails = {
      shippingInfo: shippingInfo,
      cartItems: buyNowProduct
        ? [
            {
              productId: buyNowProduct._id,
              productName: buyNowProduct.productName,
              productImage: buyNowProduct.productImage,
              quantity: 1,
              price: buyNowProduct.price,
            },
          ]
        : cartItems.map((item) => ({
            productId: item._id,
            productName: item.productName,
            productImage: item.productImage,
            quantity: item.quantity,
            price: item.price,
          })),
      totalAmount: buyNowProduct
        ? buyNowProduct.price
        : totalAmount,
    };
    console.log("Order Details:", orderDetails);
    dispatch(placeOrder(orderDetails));
    navigate("/payment");
  };

  const displayedItems = buyNowProduct ? [buyNowProduct] : cartItems;

  const grandTotal = buyNowProduct ? buyNowProduct.price : totalAmount;

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <TextField
              label="Full Name"
              name="fullName"
              value={shippingInfo.fullName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              name="address"
              value={shippingInfo.address}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              name="city"
              value={shippingInfo.city}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="State"
              name="state"
              value={shippingInfo.state}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Postal Code"
              name="postalCode"
              value={shippingInfo.postalCode}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Country"
              name="country"
              value={shippingInfo.country}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ mb: 2 }}>
              {displayedItems.map((item) => (
                <Box
                  key={item._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>
                    {item.productName} (x{item.quantity || 1})
                  </Typography>
                  <Typography>
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${grandTotal.toFixed(2)}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "#d63384",
            "&:hover": {
              backgroundColor: "#c62874",
            },
          }}
          onClick={handleProceedToPayment}
          fullWidth
        >
          Proceed to Payment
        </Button>
      </Container>
    </>
  );
};

export default Checkout;
