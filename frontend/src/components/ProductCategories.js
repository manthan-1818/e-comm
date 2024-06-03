import "../css/ProductCategories.css";
import image1 from "../images/toy.jpg";
import image2 from "../images/apple.jpg";
import image0 from "../images/watch.jpg";
import image3 from "../images/camera.jpg";
import image4 from "../images/keyboard.jpg";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import LinearProgress from "@mui/material/LinearProgress";
import { Container, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCategories = ({ category }) => {
  const mockProducts = [
    {
      _id: "1",
      productName: "Best of Action Toys",
      price: "Up to 70% Off",
      productImage: image1,
    },
    {
      _id: "2",
      productName: "Electric Cycle",
      price: "Up to 40% Off",
      productImage: image2,
    },
    {
      _id: "3",
      productName: "Top Stationery",
      price: "From ₹49",
      productImage: image0,
    },
    {
      _id: "4",
      productName: "Microphones",
      price: "Up to 70% off",
      productImage: image3,
    },
    {
      _id: "5",
      productName: "Geared Cycles",
      price: "Up to 70% Off",
      productImage: image4,
    },
    {
      _id: "6",
      productName: "Soft Toys",
      price: "Upto 70% Off",
      productImage: image4,
    },
    {
      _id: "2",
      productName: "Electric Cycle",
      price: "Up to 40% Off",
      productImage: image2,
    },
    {
      _id: "2",
      productName: "Electric Cycle",
      price: "Up to 40% Off",
      productImage: image2,
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

  const settings = {
    dots: false,
    infinite: false, // Disable infinite scrolling
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={`${className} custom-arrow next-arrow`} onClick={onClick}>
        <div className="arrow-icon"></div>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={`${className} custom-arrow prev-arrow`} onClick={onClick}>
        <div className="arrow-icon"></div>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Container>
          <Slider {...settings}>
            {products.map((product) => (
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none" }}
                key={product._id}
              >
                <Box className="product-card" marginRight={2} marginBottom={2}>
                  <Box className="product-image-container">
                    <img src={product.productImage} alt={product.productName} />
                  </Box>
                  <Box className="product-info">
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
                      {product.price}
                    </Typography>
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
