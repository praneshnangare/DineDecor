import { all } from "@redux-saga/core/effects";
import cartSaga from "../features/Cart/cartSaga";
import orderSaga from "../features/Checkout/orderSaga";

export default function* rootSaga() {
  yield all([
    cartSaga(),
    orderSaga()
  ]);
}