import React, { useState, useEffect } from 'react';
import '../css/Cart.css'; // Import CSS for styling

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fetch cart items from server or local storage
      // Example: const cartItems = fetchCartItems(); // Fetch cart items from server
      // Update cart items
      // setCartItems(cartItems);
      // For demonstration, set an empty array
      setCartItems([]);
    }, 5000); // Check every 5 seconds
    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <p>Missing Cart items?</p>
      ) : (
        <div>
          {/* Render cart items */}
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <p>{item.name}</p>
              <p>${item.price}</p>
              {/* Add more item details as needed */}
            </div>
          ))}
          {/* Add total price or checkout button if needed */}
        </div>
      )}
    </div>
  );
};

export default Cart;
