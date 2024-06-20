import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authSlice from "../slice/authSlice";
import uiSlice from "../slice/uiSlice";
import cartSlice from '../slice/cartSlice';
import orderSlice from "../slice/orderSlice"

const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  ui: uiSlice,
  order: orderSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
