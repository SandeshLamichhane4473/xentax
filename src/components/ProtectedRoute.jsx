import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedAccess }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // if no token or access doesn't match → redirect to login
  if (!userInfo || (allowedAccess && userInfo.access_level !== allowedAccess)) {
    alert("user try to accss the users, but has no right.")
    return <Navigate to="/login" replace />;
  }

  // else render child routes
  return <Outlet />;
}

export default ProtectedRoute;
