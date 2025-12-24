import React from "react";
import { Bell, User } from "lucide-react";

function Topbar({ sidebarOpen }) {
  return (
    <header
      className={`h-16 flex items-center justify-between bg-white border-b px-4 transition-all duration-300 ${
        sidebarOpen ? "ml-0" : "ml-20"
      }`}
    >
      {/* Left content */}
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>

      {/* Right content */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-2">
          <User size={20} />
          <span className="hidden md:inline">Admin</span>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
