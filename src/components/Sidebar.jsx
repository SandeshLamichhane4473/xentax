import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const userInfo = JSON.parse(localStorage.getItem("userInfo")); // { username, access_level }

function Sidebar() {
  const navigate = useNavigate();
    const { logout } = useAuth();
 


   const links = [
    { name: "Users", path: "users", access: "U" },       // only users with 'U' can see
    { name: "Setup", path: "setup", access: "" },       // example: admin only
    { name: "Report", path: "report", access: "" },
    { name: "Sakaform", path: "sakaform", access: "" },
    { name: "Logout", path: "logout" },
  ];

  const handleLogout = () => {
    logout(); // ✅ updates context and removes localStorage
    navigate("/login"); // redirect to login
  };


  return (
    <div className="w-40 bg-primary border-r p-2 flex flex-col">
   <h2 className="text-sm font-bold mb-6 mt-6 text-secondary   w-full  ">
    NRB Xentax
  </h2>

  <nav className="flex flex-col space-y-2">
        {links.map((link) => {
          // Handle Logout button
          if (link.name === "Logout") {
            return (
              <button
                key={link.name}
                onClick={handleLogout}
                className="text-left px-4 py-2 rounded hover:bg-gray-200 font-medium"
              >
                {link.name}
              </button>
            );
          }

          // Only show link if user has access
          if (link.access && userInfo?.access_level !== link.access) {
            return null;
          }

          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded hover:bg-gray-200 ${
                  isActive ? "bg-primary text-white" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;
