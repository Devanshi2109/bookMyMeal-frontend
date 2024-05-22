import { Navigate } from "react-router-dom";
import useAuthStore from "../app/authStore";

const RedirectIfAuthenticated = ({ element }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/" /> : element;
};

export default RedirectIfAuthenticated;
