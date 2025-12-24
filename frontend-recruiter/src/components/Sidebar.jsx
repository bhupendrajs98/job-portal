import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/recruiter/dashboard", icon: Home },
  { name: "Jobs", path: "/recruiter/jobs", icon: Briefcase },
  { name: "Applicants", path: "/recruiter/applicants", icon: Users },
  { name: "Reports", path: "/recruiter/reports", icon: BarChart3 },
  { name: "Settings", path: "/recruiter/settings", icon: Settings },
];

function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      } bg-white border-r h-screen flex flex-col transition-all duration-300`}
    >
      {/* Logo + Hamburger */}
      <div className="h-16 flex items-center gap-3 px-4 border-b">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>

        {open && (
          <h1 className="text-2xl font-bold text-blue-600">HireOn</h1>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <item.icon size={20} />
            {open && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/signin";
          }}
          className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={20} />
          {open && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
