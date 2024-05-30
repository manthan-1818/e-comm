import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import Navbar from '../components/Navbar'; 
// import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import '../css/Home.css'; 

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error("There was an error fetching the products!", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      {/* <Header /> */}
      {/* <div className="content-container">
        <h1>Products</h1>
        <div className="products-grid">
          {products.map(product => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div> */}
      <Footer />
    </div>
  );
};

export default Home;
