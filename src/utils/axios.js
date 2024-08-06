import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "" : "http://localhost:4000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (err.response.data === "jwt expired") {
      window.location.reload();
      toast.info("로그인 기간이 만료되었습니다. 다시 로그인해주세요");
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
