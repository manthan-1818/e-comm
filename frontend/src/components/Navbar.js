import React from "react";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Person2Icon from "@mui/icons-material/Person2";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import "../css/Navbar.css";
import { Typography } from "@mui/material";

// Styled components for search bar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const IconTextWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">E-Commerce</Link>
      </div>

      <div style={{ marginLeft: "auto" }}>
        <ul className="navbar-links">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <li>
            <Button
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleClick}
              endIcon={
                <IconTextWrapper>
                  <Person2Icon sx={{ color: "black" }} />
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                      textTransform: "none",
                      color: "black",
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
              <MenuItem onClick={handleClose}>Login</MenuItem>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </li>
          <li>
            <Link to="/login">LOG IN</Link>
          </li>

          <li>
            <Link to="/cart">
              <Button id="cart-button">
                <IconTextWrapper>
                  <LocalMallIcon sx={{ color: "black" }} />
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                      textTransform: "none",
                      color: "black",
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
