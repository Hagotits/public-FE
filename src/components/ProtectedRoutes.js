import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ children, isAuth }) => {
  const auth = useSelector((state) => state.user?.isAuth);

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;