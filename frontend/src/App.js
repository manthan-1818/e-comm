import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import StripeProvider from './components/StripeProvider'; 
import Verificationmail from "./components/VerificationMail";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductPage from "./pages/Productpage";
import ProductList from "./pages/Productlist";
import AdminPanel from "./pages/Adminpannel";
import Profile from "./components/Profile";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderDetails from "./pages/Orderdetails";
import Invoice from "./pages/Invoice";
// const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

const App = () => {
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  return (
    <Router>
      <StripeProvider> 
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verification-mail" element={<Verificationmail />} />
            <Route path="/productpage/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/productlist" element={<ProductList />} /> 
            <Route path="/admin-panel" element={<AdminPanel />} /> 
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/checkout" element={<Checkout />} /> 
            <Route path="/payment" element={<Payment />} /> 
            <Route path="/order-details" element={<OrderDetails />} /> 
            <Route path="/invoice" element={<Invoice />} /> 

          </Routes>
        </div>
      </StripeProvider>
    </Router>
  );
};

export default App;
