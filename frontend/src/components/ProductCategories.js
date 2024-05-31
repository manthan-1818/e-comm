import "../css/ProductCategories.css";
// import image1 from "../images/ai.jpeg";
import image1 from "../images/toy.jpg";

// import image2 from "../images/bag.jpg";
import image2 from "../images/apple.jpg";

// import image3 from "../images/beauty.jpeg";
import image0 from "../images/watch.jpg"

import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Container, Grid, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";


const ProductCategories = ({ category }) => {
  
  const mockProducts = [
    {
      _id: "1",
      productName: "Product 1",
      price: 10,
      productImage: image1,
    },
    {
      _id: "2",
      productName: "Product 2",
      price: 20,
      productImage: image2,
    },
    {
      _id: "3",
      productName: "Product 3",
      price: 30,
      productImage: image0,
    },
  ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductsFromCategory = async () => {
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchProductsFromCategory();
  }, [category]);

  return (
    <>
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Container>
          <Grid container spacing={0}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <Link
                  to={`/product/${product._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box className="product-card">
                    <Box className="product-image-container">
                      <img
                        src={product.productImage}
                        alt={product.productName}
                      />
                    </Box>
                    <Box className="product-info">
                      <Typography variant="h6" style={{ marginBottom: "0.5rem" }}>
                        {product.productName}
                      </Typography>
                      <Typography variant="h6">${product.price}</Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default ProductCategories;
