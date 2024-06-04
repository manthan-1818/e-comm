import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Verificationmail from "./components/Verificationmail";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductPage from "./pages/Productpage";
import { useSelector } from "react-redux";
import ProductList from "./pages/Productlist"; 

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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
