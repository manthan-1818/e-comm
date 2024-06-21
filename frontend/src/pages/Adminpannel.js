import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// import ReorderIcon from "@mui/icons-material/Reorder";
import Box from "@mui/material/Box";
import AllUsers from "../components/AllUsers";
import AllProducts from "../components/AllProducts";
import Navbar from "../components/Navbar";

const AdminPanel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    if (index === 2) {
      navigate("/order");
    }
  };

  const sidebarItems = [
    { text: "All Users", icon: <ManageAccountsIcon /> },
    { text: "All Products", icon: <LocalMallIcon /> },
    { text: "Orders", icon: <ShoppingBagIcon /> },
  ];

  const renderSidebar = () => (
    <List>
      {sidebarItems.map((item, index) => (
        <ListItemButton
          key={item.text}
          selected={selectedIndex === index}
          onClick={() => handleListItemClick(index)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
    </List>
  );

  const renderContent = () => {
    switch (selectedIndex) {
      case 0:
        return <AllUsers />;
      case 1:
        return <AllProducts />;
      default:
        return <AllProducts />;
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          {sidebarItems.map((item, index) => (
            <Box key={index} mr={2}>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => handleListItemClick(index)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </>
  );
};

export default AdminPanel;
