import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Invoice = ({ order }) => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box>
          <Typography variant="body1">Order ID: {order._id}</Typography>
          <Typography variant="body1">
            Order Date: {new Date(order.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">Ship To:</Typography>
          <Typography variant="body1">{order.address}</Typography>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.productName}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">${item.price}</TableCell>
                <TableCell align="right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} align="right">
                <Typography variant="h6">Total Amount:</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">
                  ${order.totalAmount.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Invoice;
