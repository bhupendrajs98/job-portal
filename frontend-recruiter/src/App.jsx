import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Jobs from "./pages/Job";
import CreateJob from "./pages/Createjob";
import Applicants from "./pages/Applicant";
import Report from "./pages/Report";
import Setting from "./pages/Setting";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar fixed at top */}
        <Topbar sidebarOpen={sidebarOpen} />

        {/* Main scrollable area */}
        <main className="flex-1 bg-gray-50 p-6 overflow-auto">
          <Routes>
            <Route path="/recruiter/dashboard" element={<Dashboard />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/recruiter/jobs" element={<Jobs />} />
            <Route path="/recruiter/jobs/create" element={<CreateJob />} />
            <Route path="/recruiter/applicants" element={<Applicants />} />
            <Route path="/recruiter/reports" element={<Report />} />
           <Route path="/recruiter/settings" element={<Setting />} />


            {/* Add more routes here */}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
