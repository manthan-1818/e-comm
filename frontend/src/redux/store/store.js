import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authSlice from "../slice/authSlice";
import uiSlice from "../slice/uiSlice";
import cartSlice from '../slice/cartSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  ui: uiSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
