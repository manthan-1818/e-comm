import React from "react";
import { Container, Typography } from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import Category from "./Category";
import ProductCategories from "./ProductCategories";
import image1 from "../images/i1.jpg";
import image2 from "../images/i2.jpg";
import image3 from "../images/i3.jpg";

const Body = () => {
  return (
    <div>
      <Category />
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img className="d-block w-100" src={image1} alt="First slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image2} alt="Second slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image3} alt="Third slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container className="my-3">
        <Typography variant="h5">Best Of Mobiles</Typography>
      </Container>
      <ProductCategories />
      
    </div>
  );
};

export default Body;
