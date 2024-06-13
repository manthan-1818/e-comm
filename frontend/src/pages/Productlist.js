import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { useLocation } from "react-router-dom";
import axiosInstance from "../utils/services/axios";
import "../css/Productlist.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brandFilter, setBrandFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get("category");
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = "/product/get-products";
        if (categoryFilter) {
          url = `/product/fetch-product-by-category?category=${categoryFilter}`;
        }
        const response = await axiosInstance.get(url);
        let filteredProducts = response.data.data;
        if (brandFilter) {
          filteredProducts = filteredProducts.filter(
            (product) => product.brand === brandFilter
          );
        }
        if (priceFilter) {
          filteredProducts = filteredProducts.filter(
            (product) => parseInt(product.price) < parseInt(priceFilter)
          );
        }
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryFilter, brandFilter, priceFilter]);

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
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="60vh"
            >
              <Typography variant="h5">Loading...</Typography>
            </Box>
          ) : products.length === 0 ? (
            <Typography variant="body1">No products found.</Typography>
          ) : (
            <Grid container spacing={3} justifyContent="flex-start">
              {products.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <Card className="card">
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.productImage[0]}
                      alt={product.productName}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div" gutterBottom>
                        {product.productName}
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
          )}
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
