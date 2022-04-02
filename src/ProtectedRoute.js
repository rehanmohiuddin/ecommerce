import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import checkAuthentication from "./Frontend/hooks/isAuthenticated";

function ProtectedRoute({ children }) {
  const [isAuthenticated, loading] = checkAuthentication();
  return isAuthenticated ? children : <Navigate to={"/"} />;
}

export default ProtectedRoute;
