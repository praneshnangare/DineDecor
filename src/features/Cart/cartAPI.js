import axiosInstance from "../../api/middlewareAPI";

export const getCartItemsAPI = async () =>  axiosInstance.get("/cart");

export const updateCartItemsAPI = async (data) => axiosInstance.post("/cart", data);
