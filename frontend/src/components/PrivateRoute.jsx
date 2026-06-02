import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {

  const token =
    localStorage.getItem("token");

  // ❌ No Token
  if (!token) {

    return <Navigate to="/login" />;

  }

  // ✅ Logged In
  return children;

};

export default PrivateRoute;