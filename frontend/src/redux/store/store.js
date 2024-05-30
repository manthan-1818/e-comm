import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authSlice from "../slice/authSlice";
import uiSlice from "../slice/uiSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  ui: uiSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
