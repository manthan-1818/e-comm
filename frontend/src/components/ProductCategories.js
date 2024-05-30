import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Container, Grid, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import image1 from "../images/ai.jpeg";
import image2 from "../images/bag.jpg";
import image3 from "../images/beauty.jpeg";
import { Image } from "react-bootstrap";

const ProductCategories = ({ category }) => {
  // Mock products data
  const mockProducts = [
    {
      _id: "1",
      productName: "Product 1",
      price: 10,
      productImage: { image2 },
    },
    {
      _id: "2",
      productName: "Product 2",
      price: 20,
      productImage: ["image2.jpg"],
    },
    {
      _id: "3",
      productName: "Product 3",
      price: 30,
      productImage: ["image3.jpg"],
    },
  ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulating fetching products from category
  const fetchProductsFromCategory = async () => {
    setLoading(true);
    // Simulate delay with setTimeout
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
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={3} key={product._id}>
                <Link
                  to={`/product/${product._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box sx={{ border: "1px solid", padding: 2 }}>
                    <img
                      src={image1}
                      alt={product.productName}
                      style={{ width: "100%", height: "auto" }}
                    />
                    <Typography variant="h6">{product.productName}</Typography>
                    <Typography variant="h6">${product.price}</Typography>
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
