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
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useSelector } from "react-redux";
import { fetchOrder } from "../utils/services/orderservices";
import Invoice from "../pages/Invoice";

const Order = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [filter, setFilter] = useState("past 3 months");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const fetchedOrders = await fetchOrder(userId);
        setOrders(fetchedOrders.orders);
        setFilteredOrders(fetchedOrders.orders);
        console.log("Fetched orders:", fetchedOrders);
      } catch (error) {
        enqueueSnackbar(
          `Failed to fetch the data. Please try again later. ${error.message}`,
          {
            variant: "error",
          }
        );
      }
    };

    fetch();
  }, [userId, enqueueSnackbar]);

  useEffect(() => {
    const filtered = orders.filter((order) =>
      order.items.some((item) =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  const handleToggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const handleOpenInvoice = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseInvoice = () => {
    setSelectedOrder(null);
  };

  return (
    <Container>
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
          placeholder="Search product names"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1, mx: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ bgcolor: "#d63384", "&:hover": { bgcolor: "#b82b6e" } }}
        >
          Search Orders
        </Button>
      </Box>
      <Grid container spacing={2}>
        {filteredOrders.map((order) => (
          <Grid item xs={12} key={order._id}>
            <Card variant="outlined">
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
                <List>
                  {order.items.map((item) => (
                    <ListItem key={item._id}>
                      <ListItemText
                        primary={`Product Name: ${item.productName}`}
                      />
                      <ListItemText
                        primary={`Total Amount: $${order.totalAmount}`}
                      />
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
                  ))}
                </List>
                {expandedOrderId === order._id && (
                  <Box mt={2}>
                    {order.items.map((item) => (
                      <Box
                        key={item._id}
                        mb={1}
                        pl={2}
                        display="flex"
                        alignItems="center"
                      >
                        <img
                          src={item.productImage[0]}
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
                        <Divider orientation="vertical" flexItem />
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
                  onClick={() => handleOpenInvoice(order)}
                  sx={{ bgcolor: "#d63384", "&:hover": { bgcolor: "#b82b6e" } }}
                >
                  View Invoice
                </Button>
                <Button size="small" variant="outlined">
                  Get help
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={!!selectedOrder} onClose={handleCloseInvoice} maxWidth="md" fullWidth>
        <DialogTitle>Invoice</DialogTitle>
        <DialogContent>
          {selectedOrder && <Invoice order={selectedOrder} />}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Order;
