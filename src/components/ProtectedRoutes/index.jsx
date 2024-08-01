import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = Cookies.get("jwt_token");

  return token === undefined ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoutes;
