import { createSlice } from '@reduxjs/toolkit';
import { get_cart, set_cart, remove_cart } from '../../constant/strorageconstant';

const initialState = {
  items: get_cart(),
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);
      state.totalQuantity++;
      state.totalAmount += newItem.price;

      console.log("Attempting to add item to cart");

      if (!existingItem) {
        console.log("price", newItem.price); 
        state.items.push({
          _id: newItem._id,
          productName: newItem.productName,
          productImage: newItem.productImage,
          quantity: 1,
          price: newItem.price,
        });
        set_cart(state.items);
        console.log("Item added to cart");
      } else {
        existingItem.quantity++;
        set_cart(state.items);
        console.log("Total items in cart:", state.items.length);
        console.log("Total quantity of all items in cart:", state.totalQuantity);
      }
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item._id === id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item._id !== id);
        set_cart(state.items);
      }
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item._id === id);
      if (existingItem) {
        state.totalQuantity += quantity - existingItem.quantity;
        state.totalAmount += (quantity - existingItem.quantity) * existingItem.price;
        existingItem.quantity = quantity;
      }
      set_cart(state.items);
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      remove_cart();
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
