import React, { useEffect, useState } from "react";

function SalaryGuide() {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dummy salary data
    const dummySalaries = [
      { _id: "1", jobTitle: "Frontend Developer", company: "TechCorp", location: "Bangalore", avgSalary: "₹8,00,000" },
      { _id: "2", jobTitle: "Backend Developer", company: "InnovateX", location: "Hyderabad", avgSalary: "₹9,50,000" },
      { _id: "3", jobTitle: "Fullstack Developer", company: "FutureSoft", location: "Pune", avgSalary: "₹10,00,000" },
      { _id: "4", jobTitle: "Data Scientist", company: "CyberTech", location: "Bangalore", avgSalary: "₹12,00,000" },
      { _id: "5", jobTitle: "UI/UX Designer", company: "DataWorks", location: "Mumbai", avgSalary: "₹7,50,000" },
      { _id: "6", jobTitle: "DevOps Engineer", company: "CloudNet", location: "Bangalore", avgSalary: "₹11,00,000" },
      { _id: "7", jobTitle: "Product Manager", company: "NanoSoft", location: "Delhi", avgSalary: "₹15,00,000" },
      { _id: "8", jobTitle: "QA Engineer", company: "BrightSolutions", location: "Chennai", avgSalary: "₹6,50,000" },
      { _id: "9", jobTitle: "Mobile App Developer", company: "NextGenTech", location: "Bangalore", avgSalary: "₹9,00,000" },
      { _id: "10", jobTitle: "Cloud Architect", company: "AlphaWorks", location: "Hyderabad", avgSalary: "₹18,00,000" },
    ];

    setTimeout(() => {
      setSalaries(dummySalaries);
      setLoading(false);
    }, 1000); // simulate API delay
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Salary Guide</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && salaries.length === 0 ? (
          <p className="text-gray-600 col-span-full text-center">No salary data found.</p>
        ) : (
          salaries.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{job.jobTitle}</h2>
              <p className="text-gray-700 mb-1">Company: {job.company}</p>
              <p className="text-gray-700 mb-1">Location: {job.location}</p>
              <p className="text-gray-500 font-medium mt-2">Average Salary: {job.avgSalary}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SalaryGuide;
