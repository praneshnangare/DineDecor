import { useDispatch, useSelector } from "react-redux";
import { showToastBanner } from "../toastBanner/toastBannerSlice";
import { useState } from "react";
import { updateCartItems } from "../Cart/cartSlice";

const useCart = () => {
  const dispatch = useDispatch();
  const { storeState, cartItems } = useSelector((store) => store.cart);

  const addToCart = (item) => {
    if (cartItems.some((cartItem) => cartItem.id === item.id)) {
      dispatch(showToastBanner({
        message: "Product already in cart",
        type: "success",
      }));
      return;
    }
    item.quantity = 1;
    dispatch(updateCartItems([item, ...cartItems]));
  };

  const updateCart = (item) => {
    const cart = cartItems.map((cartItem) => cartItem.id === item.id ? item : cartItem);
    dispatch(updateCartItems(cart));
  };

  const removeFromCart = (item) => {
    const cart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    dispatch(updateCartItems(cart));
  };

  const clearCart = () => {
    dispatch(updateCartItems([]));
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateCart,
    clearCart,
    storeState,
  };
};

export default useCart;
