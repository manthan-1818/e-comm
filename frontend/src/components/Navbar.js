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
import '../css/Navbar.css';
import { Typography } from '@mui/material';
import { logout } from '../redux/slice/authSlice'; 

const IconTextWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
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

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    handleClose();
  };

 
  const isLoginPage = location.pathname === '/login';

  return (
    <nav className="navbar">
    <div className="navbar-brand">
      <Link to="/" className="ecommerce-link">E-Commerce</Link>
      <div className="spacer"></div>
      <div className="search-bar">
        <div>
          <SearchIcon />
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
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Link to="/login" className="login-link">
                  <Button id="login-button">
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
            <Link to="/cart" className="cart-link">
              <Button id="cart-button">
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
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
