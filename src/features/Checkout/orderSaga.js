import { call, put, takeEvery } from "@redux-saga/core/effects";
import * as api from "./orderAPI";
import {
  getOrdersSuccess,
  getOrdersFailure,
  addOrderSuccess,
  addOrderFailure,
} from "./orderSlice";
import { showToastBanner } from "../toastBanner/toastBannerSlice";

function* workGetOrderSaga() {
  try {
    const order = yield call(api.getOrder);
    yield put(getOrdersSuccess(order));
  } catch (e) {
    console.log(e);
    yield put(getOrdersFailure());
    yield put(
      showToastBanner({
        message: "There was an error while fetching orders",
        type: "error",
      })
    );
  }
}

function* workAddOrderSaga(action) {
  try {
    const order = yield call(api.addOrderAPI, action.payload);
    console.log(order);
    yield put(addOrderSuccess(order));
    yield put(
      showToastBanner({
        title: "Order placed",
        message: "Order added successfully",
        type: "success",
      })
    );
  } catch (e) {
    yield put(addOrderFailure());
    yield put(
      showToastBanner({
        title: "Could not place order",
        message: e.message,
        type: "error",
      })
    );
  }
}

function* orderSaga() {
  yield takeEvery("orders/getOrders", workGetOrderSaga);
  yield takeEvery("orders/addOrder", workAddOrderSaga);
}

export default orderSaga;
