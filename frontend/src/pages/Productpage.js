import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { fetchProduct } from "../utils/services/productservices";
import { addToCart } from "../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import "../css/Productpage.css";

const ProductPage = () => {
  const { id } = useParams();
  const cartData = useSelector((state) => state.cart?.items || []);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [product, setProduct] = useState(null);
  const [val, setVal] = useState(0);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchedProduct = async (_id) => {
      setLoading(true);
      try {
        const response = await fetchProduct(_id);
        setProduct(response.data);
      } catch (error) {
        enqueueSnackbar(
          `Failed to fetch the data. Please try again later. ${error.message}`,
          {
            variant: "error",
          }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchedProduct(id);
  }, [id, enqueueSnackbar]);

  const handleCart = () => {
    if (!product) return; 
    dispatch(addToCart(product));
    console.log("Added to cart:", product);
    setToast(true);
    navigate("/cart/");
  };
  

  const handleBuyNow = (_id) => {
    if (!product) return; 
    const isProductInCart = cartData.find((item) => item._id === _id);

    if (isProductInCart) {
      navigate("/cart/");
    } else {
      dispatch(addToCart(product));
      navigate("/cart/");
    }
  };

  const handleImage = (image, index) => {
    setMainImage(image);
    setVal(index);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="error">Product not found.</div>;
  }

  const { productImage, productName, rating, price, description } = product;

  return (
    <div className="container">
      <div className="product-gallery">
        <div className="thumbnails">
          {productImage.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onMouseEnter={() => handleImage(image, index)}
            />
          ))}
        </div>
      </div>
      <div className="main-image">
        <div className="image-container">
          <img src={mainImage || productImage[val]} alt="Main Product" />
        </div>
        <div className="buttons">
          <button className="add-to-cart" onClick={handleCart}>
            Add to Cart
          </button>
          <button className="buy-now" onClick={() => handleBuyNow(product._id)}>
            <FlashOnIcon /> BUY NOW
          </button>
        </div>
      </div>
      <div className="product-details">
        <h1>{productName}</h1>
        <div className="rating">
          <span>{rating} ★</span>
        </div>
        <div className="price">
          <span className="current-price">₹{price}</span>
        </div>
        <div className="availability">
          <div className="pincode-container">
            <input type="text" placeholder="Enter Delivery Pincode" />
            <button className="check-button">Check</button>
          </div>
          <span className="note">Currently out of stock in this area.</span>
        </div>
        <div className="highlights">
          <h3>Description</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
