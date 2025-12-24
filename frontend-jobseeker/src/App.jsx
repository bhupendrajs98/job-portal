import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import JobDetails from "./pages/Jobdetails";
import ApplyJob from "./pages/Applyjob";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/Protectedroute";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import CompanyReview from "./components/Companyreview";
import SalaryGuide from "./components/Salaryguide";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route
          path="/apply/:jobId"
          element={
            <ProtectedRoute allowedRoles={["jobseeker"]}>
              <ApplyJob />
            </ProtectedRoute>
          }
        />

        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/reviews" element={<CompanyReview />} />
        <Route path="/salary" element={<SalaryGuide />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
