import React from 'react';
import { createRoot } from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux/store/store"

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);



