// ProtectedRoute.js
import { Navigate, Outlet } from "react-router";
import { useAuth } from "./context/useAuth";

const ProtectedRoute = () => {
  const { user } = useAuth();
  console.log("ProtectedRoute user:---", user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If there is a user, render the child components via <Outlet />
  return <Outlet />;
};

export default ProtectedRoute;
