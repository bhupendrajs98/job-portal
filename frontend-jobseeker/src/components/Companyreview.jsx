import React, { useEffect, useState } from "react";

function CompanyReview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 12 Dummy reviews (9 original + 3 new fake)
    const dummyReviews = [
      {
        _id: "1",
        companyName: "TechCorp",
        comment: "Great place to learn and grow!",
        rating: 4.5,
        userName: "Alice Johnson",
      },
      {
        _id: "2",
        companyName: "InnovateX",
        comment: "Amazing team and flexible work hours.",
        rating: 4.2,
        userName: "Bob Smith",
      },
      {
        _id: "3",
        companyName: "FutureSoft",
        comment: "Supportive management and good perks.",
        rating: 4.0,
        userName: "Charlie Brown",
      },
      {
        _id: "4",
        companyName: "CyberTech",
        comment: "Innovative projects and learning opportunities.",
        rating: 4.3,
        userName: "Diana Prince",
      },
      {
        _id: "5",
        companyName: "DataWorks",
        comment: "Good work-life balance and friendly environment.",
        rating: 4.1,
        userName: "Ethan Hunt",
      },
      {
        _id: "6",
        companyName: "CloudNet",
        comment: "Excellent mentorship and growth prospects.",
        rating: 4.4,
        userName: "Fiona Gallagher",
      },
      {
        _id: "7",
        companyName: "NanoSoft",
        comment: "Challenging tasks but rewarding experience.",
        rating: 4.0,
        userName: "George Lucas",
      },
      {
        _id: "8",
        companyName: "BrightSolutions",
        comment: "Friendly colleagues and supportive management.",
        rating: 4.3,
        userName: "Hannah Montana",
      },
      {
        _id: "9",
        companyName: "NextGenTech",
        comment: "Fast-paced environment with lots of learning.",
        rating: 4.2,
        userName: "Ian Somerhalder",
      },
      // 3 new fake reviews
      {
        _id: "10",
        companyName: "AlphaWorks",
        comment: "Creative projects and amazing culture.",
        rating: 4.6,
        userName: "Jack Sparrow",
      },
      {
        _id: "11",
        companyName: "BetaSolutions",
        comment: "Supportive team and flexible work options.",
        rating: 4.3,
        userName: "Kate Winslet",
      },
      {
        _id: "12",
        companyName: "GammaTech",
        comment: "Challenging but rewarding environment.",
        rating: 4.4,
        userName: "Leonardo DiCaprio",
      },
    ];

    setTimeout(() => {
      setReviews(dummyReviews);
      setLoading(false);
    }, 1000); // simulate API delay
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Company Reviews</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && reviews.length === 0 ? (
          <p className="text-gray-600 col-span-full text-center">No reviews found.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{review.companyName}</h2>
              <p className="text-gray-700 mb-3">{review.comment}</p>
              <p className="text-sm text-gray-500">Rating: {review.rating} / 5</p>
              <p className="text-sm text-gray-400 mt-1">By: {review.userName}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CompanyReview;
