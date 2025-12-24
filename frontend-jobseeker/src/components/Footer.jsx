import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">HireOn</h2>
          <p className="mt-4 text-sm text-gray-400">
            HireOn helps job seekers find the right opportunities and
            recruiters find the right talent.
          </p>
        </div>

        {/* Job Seekers */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Job Seekers
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Find Jobs</li>
            <li className="hover:text-white cursor-pointer">Create Resume</li>
            <li className="hover:text-white cursor-pointer">Job Alerts</li>
            <li className="hover:text-white cursor-pointer">Career Advice</li>
          </ul>
        </div>

        {/* Recruiters */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Recruiters
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Post a Job</li>
            <li className="hover:text-white cursor-pointer">Search Resumes</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
            <li className="hover:text-white cursor-pointer">Recruiter Login</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} HireOn. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
