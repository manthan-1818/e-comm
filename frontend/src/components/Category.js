import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Image } from "react-bootstrap";
import image1 from "../images/ai.jpeg";
import image2 from "../images/bag.jpg";
import image3 from "../images/beauty.jpeg";
import image4 from "../images/toy.jpg";
import image5 from "../images/laptop.jpeg";
import image6 from "../images/furnished.avif";
import image7 from "../images/fashhion.avif";
import image8 from "../images/electronics.webp";
import image9 from "../images/mobile.webp";
import image10 from "../images/grocery.webp";
import image11 from "../images/air2.jpeg";
import image12 from "../images/apple.jpg";
import "../css/Category.css";

const mockCategoryProduct = [
  {
    category: "Grocery",
    productImage: image10,
    productName: "Electronics",
  },
  {
    category: "Mobiles",
    productImage: image9,
    productName: "Clothing",
  },
  {
    category: "Electronics",
    productImage: image5,
    productName: "Clothing",
  },
  {
    category: "Appliances",
    productImage: image8,
    productName: "Clothing",
  },
  {
    category: "EarPhones",
    productImage: image12,
    productName: "Clothing",
  },
  {
    category: "Fashion",
    productImage: image7,
    productName: "Clothing",
  },
  {
    category: "Travel",
    productImage: image11,
    productName: "Clothing",
  },
  {
    category: "Toys",
    productImage: image4,
    productName: "Clothing",
  },
  {
    category: "Furniture",
    productImage: image6,
    productName: "Clothing",
  },
];

const Category = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCategoryProduct = async () => {
    setTimeout(() => {
      setCategoryProduct(mockCategoryProduct);
      setLoading(false);
    }, 1000);
  };

  const handleChange = (category) => {
    navigate(`/productlist`);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

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
          {categoryProduct.map((category, index) => (
            <Box
              key={index}
              onClick={() => handleChange(category.category)}
              className="category-box"
            >
              <Image
                src={category.productImage}
                alt={category.productName}
                className="category-image"
              />
              <Typography variant="h6" className="category-text">
                {category.category}
              </Typography>
            </Box>
          ))}
        </div>
      )}
    </>
  );
};

export default Category;
