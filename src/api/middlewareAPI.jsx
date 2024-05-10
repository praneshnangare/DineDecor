import axios from "axios";
import config from "../config";

const baseConfiguration = {
  baseURL: config.baseUrl,
  timeout: 10000,
  headers: {
    "cache-control": "no-cache",
  },
};

const axiosInstance = axios.create(baseConfiguration);

export default axiosInstance;
