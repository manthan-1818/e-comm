import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Image } from "react-bootstrap";
import { useSnackbar } from 'notistack';
import { fetchProductsByCategory } from '../utils/services/productservices';
import "../css/Category.css";

const Category = ({ category }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProductsFromCategory = async () => {
    setLoading(true);
    try {
      const response = await fetchProductsByCategory(category);
      setCategoryProduct(response.data);
    } catch (error) {
      enqueueSnackbar(`Failed to fetch the product. Please try again later. ${error.message}`, {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsFromCategory();
  }, [category]);

  const handleCategoryClick = (clickedCategory) => {
    navigate(`/productlist?category=${clickedCategory}`);
  };

  return (
    <>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <div className="category-container">
          {categoryProduct.map((categoryItem, index) => (
            <Box
              key={index}
              onClick={() => handleCategoryClick(categoryItem.category)}
              className="category-box"
            >
              <Image
                src={categoryItem.productImage}
                alt={categoryItem.productName}
                className="category-image"
              />
              <Typography variant="h6" className="category-text">
                {categoryItem.category}
              </Typography>
            </Box>
          ))}
        </div>
      )}
    </>
  );
};

export default Category;
