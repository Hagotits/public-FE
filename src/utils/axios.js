import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "" : "http://localhost:4000",
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.Authorization =
      "Bearer " + localStorage.getItem("accessToken");
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (err) {
    if (err.response.data === "jwt expired") {
      window.location.reload();
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;