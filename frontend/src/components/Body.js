import React from "react";
import { Container, Typography } from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import Category from "./Category";
import CustomCarousel from "../pages/style";
import ProductCategories from "./ProductCategories";
import image1 from "../images/i1.jpg";
import image2 from "../images/i2.jpg";
import image3 from "../images/i3.jpg";
import '../css/Body.css';  

const Body = () => {
  return (
    <div className="body-container" style={{ marginBottom: '3%' }}> 
      <Category category="mobile" />
        <CustomCarousel  interval={1000}>
          <Carousel.Item>
            <img className="d-block w-100" src={image2} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={image3} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={image1} alt="Third slide" />
          </Carousel.Item>
        </CustomCarousel>
      <Container className="my-4">
        <Typography variant="h5">NIKE</Typography>
      </Container>
      <ProductCategories brandName={"NIKE"} />
      <Container className="my-4">
        <Typography variant="h5">APPLE</Typography>
      </Container>
      <ProductCategories brandName={"apple"} />
      <Container className="my-4">
        <Typography variant="h5">Jack & Jones</Typography>
      </Container>
      <ProductCategories brandName={"Jack and Jones"} />
    </div>
  );
};  

export default Body;
