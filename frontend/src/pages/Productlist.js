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
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/services/axios";
import "../css/Productlist.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brandFilter, setBrandFilter] = useState("");
  const [brands, setBrands] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
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
        console.log("API Response:", response.data);

        const { data, success, message } = response.data;

        if (success) {
          const fetchedProducts = data || [];
          setProducts(fetchedProducts);

          const uniqueBrands = [
            ...new Set(fetchedProducts.map((product) => product.brandName)),
          ];
          setBrands(uniqueBrands);

          setFilteredProducts(fetchedProducts);
        } else {
          console.error("Error fetching products:", message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryFilter]);
  
  useEffect(() => {
    if (brandFilter === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.brandName === brandFilter
      );
      setFilteredProducts(filtered);
    }
  }, [brandFilter, products]);

  const handleCardClick = (productId) => {
    navigate(`/Productpage/${productId}`);
  };

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
          ) : filteredProducts.length === 0 ? (
            <Typography variant="body1">No products found.</Typography>
          ) : (
            <Grid container spacing={3} justifyContent="flex-start">
              {filteredProducts.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    className="card"
                    onClick={() => handleCardClick(product._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.productImage[0]}
                      alt={product.productName}
                    />
                    <CardContent className="card-content">
                      <Typography variant="h6" component="div" gutterBottom>
                        {product.productName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                        className="card-description"
                      >
                        {product.description}
                      </Typography>
                      <Box className="card-footer">
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
                <MenuItem key="" value="">
                  All Brands
                </MenuItem>
                {brands.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductList;
