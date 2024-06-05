import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Verificationmail from "./components/VerificationMail";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductPage from "./pages/Productpage";
import ProductList from "./pages/Productlist"; 
import AdminPanel from "./pages/Adminpannel";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verification-mail" element={<Verificationmail />} />
          <Route path="/productpage" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/productlist" element={<ProductList />} /> 
          <Route path="/admin-panel" element={<AdminPanel />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
