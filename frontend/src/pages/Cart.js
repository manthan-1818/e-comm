// src/pages/Cart.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { removeFromCart, updateQuantity } from "../redux/slice/cartSlice";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log("Cart Items cart page:", cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 0),
      0
    );
  };

  return (
    <>
      <Navbar />
      {cartItems.length === 0 ? (
        <Box
          sx={{
            height: "90vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color: "#757575",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <ProductionQuantityLimitsIcon sx={{ fontSize: 50 }} />
        </Box>
      ) : (
        <>
          <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
              Shopping Cart
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              {cartItems.map((item, index) => (
                <Grid item xs={12} md={6} key={item._id || index}>
                  <Card
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      boxShadow: 3,
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 150, height: 150, objectFit: "cover" }}
                      image={
                        item.productImage && item.productImage.length > 0
                          ? item.productImage[0]
                          : ""
                      }
                      alt={item.productName}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{item.productName}</Typography>
                      <Typography variant="body1">
                        Price: ${item.price ? item.price.toFixed(2) : "N/A"}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 2,
                        }}
                      >
                        <Typography variant="body1" sx={{ mr: 2 }}>
                          Quantity:
                        </Typography>
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          onChange={(e) =>
                            handleQuantityChange(
                              item._id,
                              parseInt(e.target.value)
                            )
                          }
                          style={{
                            width: "60px",
                            marginRight: "10px",
                            padding: "5px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                          }}
                        />
                        <Typography variant="body1">
                          Total: $
                          {item.price
                            ? (item.price * item.quantity).toFixed(2)
                            : "N/A"}
                        </Typography>
                      </Box>
                    </CardContent>
                    <IconButton
                      onClick={() => handleRemoveItem(item._id)}
                      sx={{ mr: 2 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ mt: 3, mb: 3 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography variant="h5">
                Total: ${calculateTotal().toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 0,
                  backgroundColor: "#d63384",
                  "&:hover": {
                    backgroundColor: "#d63384",
                  },
                }}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default Cart;



