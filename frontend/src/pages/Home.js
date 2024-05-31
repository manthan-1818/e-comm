import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/Home.css";
import Body from "../components/Body";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <Body />
      <Footer />
    </div>
  );
};

export default Home;
