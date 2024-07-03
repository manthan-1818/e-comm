import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchCategoryProducts } from "../utils/services/productservices";
import { useSnackbar } from 'notistack';
import "../css/Category.css";

const Category = ({ category }) => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const fetchProductsFromCategory = useCallback(async () => {
    if (!category) {
      console.error("Category is undefined or empty in frontend");
      return;
    }
    setLoading(true);
    try {
      const response = await fetchCategoryProducts(category);

      if (response.data && response.data.length === 0) {
        enqueueSnackbar(`No products found for category ${category}`, {
          variant: 'info',
        });
      }

      setCategoryProduct(response.data);
    } catch (error) {
      console.error("Error fetching products by category:", error);
      enqueueSnackbar(`Failed to fetch the product. Please try again later. ${error.message}`, {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [category, enqueueSnackbar]);

  useEffect(() => {
    fetchProductsFromCategory();
  }, [category, fetchProductsFromCategory]);

  const handleChange = (selectedCategory) => {
    navigate(`/productlist?category=${selectedCategory}`);
  };

  const skeletonCount = categoryProduct.length || 10; 

  return (
    <div className="category-container">
      {loading ? (
        Array.from({ length: skeletonCount }).map((_, index) => (
          <Box key={index} className="category-box">
            <Skeleton variant="rectangular" width="80px" height="70px" style={{ borderRadius: '8px' }} />
            <Box mt={1}>
              <Skeleton variant="text" width="70%" style={{ borderRadius: '4px' }} />
            </Box>
          </Box>
        ))
      ) : (
        categoryProduct.length === 0 ? (
          <Typography variant="body1">No products found for category {category}</Typography>
        ) : (
          categoryProduct.map((categoryItem) => (
            <Box key={categoryItem._id} className="category-box" onClick={() => handleChange(categoryItem.category)}>
              <Image
                src={categoryItem.productImage[0]}
                alt={categoryItem.productName}
                className="category-image"
              />
              <Typography variant="body2" className="category-text">
                {categoryItem.category}
              </Typography>
            </Box>
          ))
        )
      )}
    </div>
  );
};

export default Category;
