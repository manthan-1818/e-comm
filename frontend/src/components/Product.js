import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <Link to={`/product/${product.id}`}>View Details</Link>
    </div>
  );
};

export default Product;
