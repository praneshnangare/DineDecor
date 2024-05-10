// src/routes/Routes.jsx
import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../features/HomePage/Home';
import Cart from '../features/Cart/Cart';
import ProductDetails from '../features/ProductDetails/ProductDetails';
import Checkout from '../features/Checkout/Checkout';
import AppBarComponent from '../components/AppBar';

const Routes = () => {
  return (
    <>
      <Route element={<AppBarComponent />} >
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product:id" element={<ProductDetails />} />
      <Route path="/checkout" element={<Checkout />} />
      </Route>
    </>
  );
};

export default Routes;
