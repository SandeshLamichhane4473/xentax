import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from './pages/Dashboard'
import Users from "./sections/Users";
import Setup from "./sections/Setup";
import Report from "./sections/Reports";
import Sakaform from "./sections/Sakaform";
import ProtectedRoute from "./components/ProtectedRoute";
import Default from "./sections/Default";
import GuestRoute from "./components/GuestRoute";


function App() {
  return (
    <Router>
 <Routes>
      {/* Guest-only routes */}
        <Route element={<GuestRoute />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        {/* Dashboard with nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
         <Route index element={<Navigate to="default" replace />} />  {/* default */}

           
           <Route element={<ProtectedRoute allowedAccess="U" />}>
            <Route path="users" element={<Users />} />
          </Route> 
 
           <Route path="default" element={<Default />} />
          <Route path="setup" element={<Setup />} />
          <Route path="report" element={<Report />} />
          <Route path="sakaform" element={<Sakaform />} />

        </Route>

        {/* Redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
