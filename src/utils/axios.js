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
    const original = err.config;
    if (err.response.status == 401 && !original._retry) {
      original._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await axiosInstance.post("/token", {
            refreshToken,
          });
          const newAccesstoken = response.data.accessToken;
          localStorage.setItem("accessToken", newAccesstoken);
          axiosInstance.defaults.headers.common["Authorization"] =
            "Bearer " + newAccesstoken;
          original.headers["Authorization"] = "Bearer " + newAccesstoken;
          return axiosInstance(original);
        } catch (err) {
          console.error(err);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          toast.info("로그인 기간이 만료되었습니다. 다시 로그인해주세요");
        }
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
