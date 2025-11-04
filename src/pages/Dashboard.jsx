import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="flex min-h-screen overflow-x-hidden">
      {/* Sidebar - fixed width */}
      <Sidebar />

      {/* Main Content - takes remaining space, but never exceeds viewport */}
      <div className="flex-1 min-w-0 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;