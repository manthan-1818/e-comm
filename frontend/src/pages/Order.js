import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { fetchOrders } from "../utils/services/orderservices";
import Navbar from "../components/Navbar"; 
const Order = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [filter, setFilter] = useState("past 3 months");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orders = await fetchOrders();
        setOrders(orders.orders); // Ensure we access the orders array correctly
        console.log("Fetched orders:", orders);
      } catch (error) {
        enqueueSnackbar(
          `Failed to fetch the data. Please try again later. ${error.message}`,
          {
            variant: "error",
          }
        );
      }
    };

    fetchOrder();
  }, []);

  const handleToggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <Container>
      <Navbar /> {/* Include the Navbar component here */}
      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Filter</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Filter"
          >
            <MenuItem value="past 3 months">past 3 months</MenuItem>
            <MenuItem value="past 6 months">past 6 months</MenuItem>
            <MenuItem value="past year">past year</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search all orders"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1, mx: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ bgcolor: "#d63384", "&:hover": { bgcolor: "#b82b6e" } }}
        >
          Search Orders
        </Button>
      </Box>
      <List>
        {orders.map((order) => (
          <Card key={order._id} variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    ORDER PLACED
                  </Typography>
                  <Typography variant="body2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    SHIP TO
                  </Typography>
                  <Typography variant="body2">{order.address}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    ORDER #
                  </Typography>
                  <Typography variant="body2">{order._id}</Typography>
                </Box>
              </Box>
              <ListItem>
                <ListItemText primary={`Total Amount: $${order.totalAmount}`} />
                <IconButton
                  edge="end"
                  onClick={() => handleToggleExpand(order._id)}
                >
                  {expandedOrderId === order._id ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
              </ListItem>
              {expandedOrderId === order._id && (
                <Box mt={2}>
                  <Typography variant="h6">Items</Typography>
                  {order.items.map((item) => (
                    <Box
                      key={item._id}
                      mb={1}
                      pl={2}
                      display="flex"
                      alignItems="center"
                    >
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "16px",
                        }}
                      />
                      <Box>
                        <Typography>Quantity: {item.quantity}</Typography>
                        <Typography>Price: ${item.price}</Typography>
                      </Box>
                      <Divider />
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="primary"
                sx={{ bgcolor: "#d63384", "&:hover": { bgcolor: "#b82b6e" } }}
              >
                Track package
              </Button>
              <Button size="small" variant="outlined">
                Get help
              </Button>
            </CardActions>
          </Card>
        ))}
      </List>
    </Container>
  );
};

export default Order;
