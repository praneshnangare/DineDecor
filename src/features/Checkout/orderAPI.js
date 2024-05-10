import axiosInstance from "../../api/middlewareAPI";

export const getAllOrdersAPI = async () => axiosInstance.get("/order");

export const addOrderAPI = async (data) => axiosInstance.post("/order", data);

export const getOrderAPI = async (id) => axiosInstance.get(`/order/${id}`);