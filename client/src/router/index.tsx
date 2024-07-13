import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = useSelector((state) => state?.auth.login.currentUser);

  if (!currentUser) {
    return <Navigate to="/accounts/login" />;
  }

  return children;
};

export default ProtectedRoute;
