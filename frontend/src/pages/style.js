import { Carousel } from "react-bootstrap";
import styled from "@emotion/styled";
 
const CustomCarousel = styled(Carousel)`
  height: 50vh;
  width: 100%;
  .carousel-item {
    height: 50vh;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
 
export default CustomCarousel;