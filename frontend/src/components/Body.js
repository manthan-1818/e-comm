import React from "react";
import { Container, Typography } from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import Category from "./Category";
// import { Container } from "react-bootstrap";
import CustomCarousel from "../pages/style";
import ProductCategories from "./ProductCategories";
import image1 from "../images/i1.jpg";
import image2 from "../images/i2.jpg";
import image3 from "../images/i3.jpg";
import '../css/Body.css';  // Ensure CSS is correctly imported

const Body = () => {
  return (
    <div className="body-container" style={{ marginBottom: '3%' }}> 
      <Category category="mobile" />
      {/* <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={image1} alt="First slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={image2} alt="Second slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={image3} alt="Third slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel> */}
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
      <Container>
        <Typography> </Typography>
      </Container>
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
