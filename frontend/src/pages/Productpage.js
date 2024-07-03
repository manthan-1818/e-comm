import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { fetchProduct } from "../utils/services/productservices";
import { addToCart } from "../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import "../css/Productpage.css";
import Navbar from "../components/Navbar";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const ProductPage = () => {
  const { id } = useParams();
  const cartData = useSelector((state) => state.cart?.items || []);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(false);
  const [product, setProduct] = useState(null);
  const [val, setVal] = useState(0);
  const [mainImage, setMainImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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
    if (!isAuthenticated) {
      setOpenModal(true);
      return;
    }

    if (!product) return;
    dispatch(addToCart(product));
    console.log("Added to cart:", product);
    setToast(true);
    navigate("/cart");
  };

  const handleBuyNow = (_id) => {
    if (!isAuthenticated) {
      setOpenModal(true);
      return;
    }

    if (!product) return;

    navigate("/checkout", { state: { buyNowProduct: product } });
  };

  const handleImage = (image, index) => {
    setMainImage(image);
    setVal(index);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const { productImage, productName, rating, price, description } = product || {};

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="product-gallery">
          <div className="thumbnails">
            {loading
              ? Array.from(new Array(4)).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={60}
                    height={60}
                    sx={{ marginBottom: "8px" }}
                  />
                ))
              : productImage.map((image, index) => (
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
            {loading ? (
              <Skeleton variant="rectangular" width={400} height={400} />
            ) : (
              <img src={mainImage || productImage[val]} alt="Main Product" />
            )}
          </div>
          <div className="buttons">
            {loading ? (
              <>
                <Skeleton variant="rectangular" width={100} height={40} sx={{ marginBottom: "8px" }} />
                <Skeleton variant="rectangular" width={100} height={40} />
              </>
            ) : (
              <>
                <button className="add-to-cart" onClick={handleCart}>
                  Add to Cart
                </button>
                <button className="buy-now" onClick={() => handleBuyNow(product._id)}>
                  <FlashOnIcon /> BUY NOW
                </button>
              </>
            )}
          </div>
        </div>
        <div className="product-details">
          {loading ? (
            <>
              <Skeleton variant="text" width={300} height={40} sx={{ marginBottom: "16px" }} />
              <Skeleton variant="text" width={100} height={30} sx={{ marginBottom: "16px" }} />
              <Skeleton variant="text" width={150} height={30} sx={{ marginBottom: "16px" }} />
              <Skeleton variant="text" width={400} height={200} />
            </>
          ) : (
            <>
              <h1>{productName}</h1>
              <div className="rating">
                <span>{rating} ★</span>
              </div>
              <div className="price">
                <span className="current-price">${price}</span>
              </div>
              <div className="highlights">
                <h3>Description</h3>
                <p>{description}</p>
              </div>
            </>
          )}
        </div>

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}
            >
              Missing Cart items?
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, textAlign: "center" }}
            >
              Please log in to add items to your cart.
            </Typography>
            <Grid container justifyContent="center" sx={{ mt: 4 }}>
              <Button
                onClick={handleLoginClick}
                variant="contained"
                sx={{
                  backgroundColor: "#d63384",
                  color: "white",
                  "&:hover": { backgroundColor: "#d63384" },
                }}
              >
                Login
              </Button>
            </Grid>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ProductPage;
