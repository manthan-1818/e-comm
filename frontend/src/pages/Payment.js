import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import {
  Button,
  CircularProgress,
  Box,
  Typography,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { clearCart } from "../redux/slice/cartSlice";
import axiosInstance from "../utils/services/axios";
import { useNavigate } from "react-router-dom";
import "../css/Payment.css";

const Payment = () => {
  const order = useSelector((state) => state?.order?.orderDetails);
  const userId = useSelector((state) => state.auth.user?._id);
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) =>
    state.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [open, setOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post(
          "http://192.168.2.85:5000/product/create-payment-intent",
          {
            amount: totalAmount,
          }
        );
        setClientSecret(response.data.clientSecret);
        setError("");  
      } catch (error) {
        console.error("Failed to fetch client secret:", error);
        setError("Failed to fetch client secret");
      }
    };

    fetchClientSecret();
  }, [totalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(""); 
    setShowSuccessAlert(false);  

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            address: {
              postal_code: zipCode,
            },
          },
        },
      }
    );

    if (error) {
      setError(`Payment failed: ${error.message}`);
      setLoading(false);
    } else {
      const paymentData = {
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
        paymentMethod: paymentIntent.payment_method,
        created: paymentIntent.created,
      };

      const orderDetails = {
        items: order,
        totalAmount,
        paymentData,
        userId,
      };

      try {
        const response = await axiosInstance.post(
          "/order/add-order",
          orderDetails
        );

        if (response.status === 201) {
          setShowSuccessAlert(true);
          setError("");  
          dispatch(clearCart());
          setOpen(true);
        }
      } catch (error) {
        setError(
          `Failed to place the order: ${
            error.response?.data?.message || error.message
          }`
        );
        setShowSuccessAlert(false);  
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    navigate("/");
  };

  const handleGoToHomePage = () => {
    navigate("/");
  };

  return (
    <Box className="payment-container">
      <Paper className="paper-container">
        <form onSubmit={handleSubmit}>
          <Box className="card-details" mb={3}>
            <Typography component="span" variant="h6" sx={{ color: "#333" }}>
              Card Details
            </Typography>

            <Box className="card-element-container">
              <CardElement id="cardElement" />
            </Box>
          </Box>

          {error && !showSuccessAlert && (
            <Box className="error-message" mb={3}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}

          {showSuccessAlert && (
            <Box className="success-message" mb={3}>
              <Alert
                iconMapping={{
                  success: <CheckCircleOutlineIcon fontSize="inherit" />,
                }}
                severity="success"
              >
                Payment successful! Thank you for your purchase.
              </Alert>
              <Box mt={2} textAlign="center">
              <Button
  variant="contained"
  onClick={handleGoToHomePage}
  style={{ backgroundColor: '#d63384', color: '#ffffff' }}
>
  Go to Home Page
</Button>

              </Box>
            </Box>
          )}

          {!showSuccessAlert && (
            <Box className="pay-button-container">
              <Button
                type="submit"
                variant="contained"
                className="pay-button"
                disabled={!stripe || !elements || loading}
                startIcon={
                  loading && (
                    <CircularProgress size={20} className="processing-icon" />
                  )
                }
              >
                {loading ? "Processing..." : "Pay"}
              </Button>
            </Box>
          )}
        </form>
      </Paper>
    </Box>
  );
};

export default Payment;
