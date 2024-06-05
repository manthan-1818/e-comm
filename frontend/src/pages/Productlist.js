import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import "../css/Productlist.css";

const mockProducts = [
  {
    _id: 1,
    name: "Product 1",
    brand: "Brand A",
    description: "Description 1",
    price: 100,
    rating: 4,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    _id: 2,
    name: "Product 2",
    brand: "Brand B",
    description: "Description 2",
    price: 150,
    rating: 3,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    _id: 2,
    name: "Product 2",
    brand: "Brand A",
    description: "Description 2",
    price: 150,
    rating: 3,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    _id: 2,
    name: "Product 2",
    brand: "Brand B",
    description: "Description 2",
    price: 150,
    rating: 3,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    _id: 2,
    name: "Product 2",
    brand: "Brand B",
    description: "Description 2",
    price: 150,
    rating: 3,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    _id: 2,
    name: "Product 2",
    brand: "Brand A",
    description: "Description 2",
    price: 150,
    rating: 3,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    _id: 2,
    name: "Product 2",
    brand: "Brand A",
    description: "Description 2",
    price: 150,
    rating: 3,
    imageUrl: "https://via.placeholder.com/150",
  },
];

const ProductList = () => {
  const [brandFilter, setBrandFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProducts = mockProducts.filter((product) => {
    if (brandFilter && product.brand !== brandFilter) return false;

    if (priceFilter && product.price > parseInt(priceFilter)) return false;
    return true;
  });

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            style={{ marginTop: "20px", marginBottom: "0" }}
          >
            Product List
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={3} justifyContent="flex-start">
            {filteredProducts.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <Card className="card">
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.imageUrl}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {product.description}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="body1" color="text.primary">
                        ${product.price}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {product.rating} ★
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              Filters
            </Typography>
            <Box>
              <TextField
                select
                label="Filter by Brand"
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                variant="outlined"
                fullWidth
              >
                <MenuItem value="">All Brands</MenuItem>

                <MenuItem value="Brand A">Brand A</MenuItem>
                <MenuItem value="Brand B">Brand B</MenuItem>
              </TextField>

              <TextField
                select
                label="Filter by Price"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                variant="outlined"
                fullWidth
                style={{ marginTop: "10px" }}
              >
                <MenuItem value="">All Prices</MenuItem>
                <MenuItem value="100">Less than $100</MenuItem>
                <MenuItem value="200">Less than $200</MenuItem>
              </TextField>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductList;
