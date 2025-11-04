import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // adjust path

function ProtectedRoute({ allowedAccess }) {
  const { user } = useAuth(); // get from context instead of localStorage

  // Not logged in → redirect to login
  if (!user) {
    alert("You are not logged in.");
    return <Navigate to="/login" replace />;
  }

  // Check access level
  if (
    allowedAccess &&
    !user.access_level.trim().toUpperCase().includes(allowedAccess.toUpperCase())
  ) {
    alert("You do not have permission to access this page.");
    return <Navigate to="/unauthorized" replace />; // ✅ must return Navigate
  }

  // else render child routes
  return <Outlet />;
}

export default ProtectedRoute;

