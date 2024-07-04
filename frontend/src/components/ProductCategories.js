// ProductCategories.jsx

import "../css/ProductCategories.css";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Container, Box, Typography, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchProductBrand } from "../utils/services/productservices";

const ProductCategories = ({ brandName }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductBrands = async () => {
    setLoading(true);
    try {
      const response = await fetchProductBrand(brandName);
      console.log("Fetched products:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductBrands();
  }, [brandName]);

  const settings = {
    dots: false,
    infinite: false, 
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <>
      {loading ? (
        <Container>
          <Box sx={{ display: 'flex' }}>
            {[...Array(6)].map((_, index) => (
              <Skeleton
                variant="rectangular"
                width={210}
                height={118}
                key={index}
                sx={{ marginRight: 2 }}
              />
            ))}
          </Box>
        </Container>
      ) : (
        <Container>
          <Slider {...settings}>
            {products.map((product) => (
              <Link
                to={`/Productpage/${product._id}`}
                style={{
                  textDecoration: "none",
                  "&:hover": { textDecoration: "none" },
                }}
                key={product._id}
              >
                <Box className="product-card" marginRight={2} marginBottom={2}>
                  <Box className="product-image-container">
                    <img src={product.productImage[0]} alt={product.productName} />
                  </Box>
                  <Box className="product-info">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <Typography
                        variant="body1"
                        style={{ marginBottom: "0.5rem" }}
                      >
                        {product.productName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="price"
                      >
                        $ {product.price}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Link>
            ))}
          </Slider>
        </Container>
      )}
    </>
  );
};

export default ProductCategories;
