import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import css from ".//css/index.css";
import css from "./css/index.css";
import { Provider } from "react-redux";
import store from "./redux/store/store"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  </React.StrictMode>
);



