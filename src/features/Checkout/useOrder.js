import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "./orderSlice";

const useOrder = () => {
  const { storeState, orders } = useSelector((store) => store.orders);
  const dispatch = useDispatch();

  const createOrder = (userDetails, orderDetails) => {
    const payload = { userDetails, orderDetails };
    console.log(payload);
    dispatch(addOrder(payload));
  };

  return {
    orders,
    createOrder,
  };
};

export default useOrder;