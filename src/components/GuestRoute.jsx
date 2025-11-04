import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function GuestRoute() {
  const { user } = useAuth();

  // If user is logged in → redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise render the children (login page)
  return <Outlet />;
}

export default GuestRoute;
