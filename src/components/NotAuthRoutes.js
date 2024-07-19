import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const NotAuthRoutes = ({ isAuth }) => {
  const auth = useSelector((state) => state.user?.isAuth);

  return auth ? <Navigate to="/" /> : <Outlet />;
};

export default NotAuthRoutes;