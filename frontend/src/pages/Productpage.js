import React, { useState } from "react";
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; 
import "../css/Productpage.css";
import image1 from "../images/keyboard.jpg";
import image2 from "../images/apple.jpg";
import image0 from "../images/watch.jpg";
import image3 from "../images/camera.jpg";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';

const ProductPage = () => {
  const [mainImage, setMainImage] = useState(image1);

  const images = [image1, image2, image0, image3]; 

  return (
    <div className="container">
      <div className="product-gallery">
        <div className="thumbnails">
          {images.map((image, index) => (
            <img 
              key={index} 
              src={image} 
              alt={`Thumbnail ${index + 1}`} 
              onMouseEnter={() => setMainImage(image)}
            />
          ))}
        </div>
      </div>
      <div className="main-image">
        <div className="image-container">
          <img src={mainImage} alt="Main Product" />
        </div>
        <div className="buttons">
          <button className="add-to-cart"><ShoppingCartIcon/>ADD TO CART</button>
          <button className="buy-now"><FlashOnIcon/>BUY NOW</button>
        </div>
      </div>
      <div className="product-details">
        <h1>
          Apple AirPods (2nd gen) with Charging Case Bluetooth Headset with Mic
          (White, True Wireless)
        </h1>
        <div className="rating">
          <span>4.5 ★</span>
          <span>1,39,054 Ratings & 7,754 Reviews</span>
        </div>
        <div className="price">
          <span className="current-price">₹8,499</span>
          <span className="original-price">₹12,900</span>
        </div>
        <div className="offers">
          <h3>Available offers</h3>
          <ul>
            <li><LocalOfferIcon style={{ color: '#198754', fontSize: 16 }} /> 5% Cashback on Flipkart Axis Bank Card</li>
            <li><LocalOfferIcon style={{ color: '#198754', fontSize: 16 }} /> 10% off up to ₹1250 on HDFC Bank Credit Card EMI Txns</li>
            <li><LocalOfferIcon style={{ color: '#198754', fontSize: 16 }} /> 10% off up to ₹1500 on HDFC Bank Credit Card EMI Txns</li>
            <li><LocalOfferIcon style={{ color: '#198754', fontSize: 16 }} /> Get extra 29% off (price inclusive of cashback/coupon)</li>
          </ul>
        </div>
       
        <div className="availability">
          <div className="pincode-container">
            <input type="text" placeholder="Enter Delivery Pincode" />
            <button className="check-button">Check</button>
          </div>
         
          <span className="note">Currently out of stock in this area.</span>
        </div>
        <div className="highlights">
          <h3>Highlights </h3>
          <ul>
            <li>With Mic: Yes</li>
            <li>Automatically on, automatically connected</li>
            <li>Easy setup for all your Apple devices</li>
            <li>Quick access to Siri by saying Hey Siri</li>
            <li>Double-tap to play or skip forward</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
