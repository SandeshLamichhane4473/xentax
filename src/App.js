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
import Banks from "./components/setup/Banks";
import BankBranches from "./components/setup/BankBranches";
import RevenueHeadings from "./components/setup/RevenueHeadings";
import CentralGovtHeadings from "./components/setup/CentralGovtHeadings.jsx";
import SakaForm1Input from "./components/sakaform/SakaForm1Input.jsx";
import SakaForm1Validate from "./components/sakaform/SakaForm1Validate.jsx";
import GovernmentAccountsHeadings from "./components/setup/GovernmentAccountsHeadings.jsx";
import LocalGovernmentHeadings from "./components/setup/LocalGovernmentHeadings.jsx";
import MonthNames from "./components/setup/MonthNames.jsx";
import BanksAccountsOnGl from "./components/setup/BanksAccountsOnGl.jsx";
import LocalGvtGrant from "./components/setup/LocalGvtGrant.jsx";
import SakaForm1View from "./components/sakaform/SakaForm1View.jsx";

function App() {
  return (
    <Router>
 <Routes>
      {/* Guest-only routes */}
        <Route element={<GuestRoute />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
       
       {/* Protect the routes */}
       <Route element={<ProtectedRoute />}>
        {/* Dashboard with nested routes */}
        
         <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="default" replace />} />  {/* default */}

            {/* Only access_level = 'U' can access Users */}
          <Route element={<ProtectedRoute allowedAccess="U" />}>
            <Route path="users" element={<Users />} />
          </Route>
           
            {/* Only access_level = 'S' can access Setup & Banks */}
          <Route element={<ProtectedRoute allowedAccess="S" />}>
            <Route path="setup" element={<Setup />} />
            <Route path="setup/banks" element={<Banks />} />
            <Route path="setup/bankbranches" element={<BankBranches />} /> 
             <Route path="setup/revenueheadings" element={<RevenueHeadings />} /> 
             <Route path="setup/centralgovtheadings" element={<CentralGovtHeadings />} />
             <Route path="setup/GovernmentAccountsHeadings" element={<GovernmentAccountsHeadings />} />
             <Route path="setup/LocalGovernmentHeadings" element={<LocalGovernmentHeadings />} />
              <Route path="setup/MonthNames" element={<MonthNames />} /> 
              <Route path="setup/BanksAccount" element={<BanksAccountsOnGl />} />   
              <Route path="setup/LocalGvtGrant" element={<LocalGvtGrant />} />
             
          </Route>

          {/* Only access_level = 'F'  Forms */} 
          <Route element={<ProtectedRoute allowedAccess="F" />}>
             <Route path="sakaform" element={<Sakaform />} />
             <Route path="sakaform/sakaform1input" element={<SakaForm1Input />} />
             <Route path="sakaform/sakaform1validate" element={<SakaForm1Validate />} />
              <Route path="sakaform/sakaform1view" element={<SakaForm1View />} />
          </Route>

          <Route path="report" element={<Report />} />
         
          <Route path="default" element={<Default />} />
          {/* End of dashboard route  */}
         </Route>
         {/* End of the protected dashboard routes */}
        </Route>

        {/* Redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
