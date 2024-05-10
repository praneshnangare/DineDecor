import toastBannerReducer from '../features/toastBanner/toastBannerSlice';
import cartReducer from '../features/Cart/cartSlice';
import orderReducer from '../features/Checkout/orderSlice';
export default {
  toastBanner: toastBannerReducer,
  cart: cartReducer,
  orders: orderReducer,
};