import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Person2Icon from '@mui/icons-material/Person2';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import '../css/Navbar.css';
import { logout } from '../redux/slice/authSlice';
import image from "../images/logo.png";

const IconTextWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
};

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.items);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = () => {
    navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handlePanel = () => {
    navigate("/admin-panel");
    handleClose();
  };

  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    handleClose();
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      setOpenModal(true);
    } else {
      navigate('/cart');
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const isLoginPage = location.pathname === '/login';
  const isAdminPanelPage = location.pathname === '/admin-panel';

const itemCount = cartItems.length;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="ecommerce-link">
          <img
            src={image}
            alt="E-Commerce"
            style={{ marginRight: '5px', width: '100px', height: '52px' }} 
          />
        </Link>
        <div className="spacer"></div>
        <div className="search-bar">
          <div>
            <SearchIcon   />
          </div>
          <InputBase
            placeholder="Search products, brands, and more..."
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSearch();
              }
            }}
            style={{ width: '300px' }}
          />
        </div>
      </div>

      <div style={{ marginLeft: 'auto' }}>
        <ul className="navbar-links">
          {!isLoginPage && (
            <li>
              {isAuthenticated ? (
                <>
                  <Button
                    aria-controls="profile-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    endIcon={
                      <IconTextWrapper>
                        <Person2Icon sx={{ color: 'black' }} />
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            color: 'black',
                          }}
                        >
                          Profile
                        </Typography>
                      </IconTextWrapper>
                    }
                  />
                  <Menu
                    id="profile-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    {!isAdminPanelPage && user?.role === "Admin" && (
                      <MenuItem onClick={handlePanel}>Admin Panel</MenuItem>
                    )}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Link to="/login" className="login-link">
                  <Button id="login-button" className="customButton">
                    <IconTextWrapper>
                      <Person2Icon sx={{ color: 'black' }} />
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: '0.7rem',
                          fontWeight: 'bold',
                          textTransform: 'none',
                          color: 'black',
                        }}
                      >
                        Login
                      </Typography>
                    </IconTextWrapper>
                  </Button>
                </Link>
              )}
            </li>
          )}
          <li>
            <IconButton color="inherit" onClick={handleCartClick} className="customButton">
              {isAuthenticated ? (
                 <Badge badgeContent={itemCount} className="customBadge">
                  <IconTextWrapper>
                    <LocalMallIcon sx={{ color: 'black' }} />
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        color: 'black',
                      }}
                    >
                      Cart
                    </Typography>
                  </IconTextWrapper>
                </Badge>
              ) : (
                <IconTextWrapper>
                  <LocalMallIcon sx={{ color: 'black' }} />
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      color: 'black',
                    }}
                  >
                    Cart
                  </Typography>
                </IconTextWrapper>
              )}
            </IconButton>
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Missing Cart items?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Login to see the items you added previously.
                </Typography>
                <Button 
                  onClick={handleLoginClick} 
                  variant="contained" 
                  
                  sx={{ 
                    backgroundColor: '#d63384', 
                    color: 'white', 
                    '&:hover': { backgroundColor: '#d63384' } 
                  }}
                >
                  Login
                </Button>
              </Box>
            </Modal>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
