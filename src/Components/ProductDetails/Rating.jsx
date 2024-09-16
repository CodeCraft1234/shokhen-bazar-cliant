import { useEffect, useState } from "react";
import useFeedbacks from "../../Hook/useFeedbacks";

const RatingComponent = () => {
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [feedbacks, refetch] = useFeedbacks();

  useEffect(() => {
    if (feedbacks && feedbacks.length > 0) {
      const totalRatings = feedbacks.length;
      const averageRating =
        feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0) /
        totalRatings;

      setTotalRatings(totalRatings);
      setAverageRating(averageRating);
    }
  }, [feedbacks]);

  const ratings = [1, 2, 3, 4, 5].map((stars) => ({
    stars,
    count: feedbacks.filter((feedback) => feedback.rating === stars).length,
  }));

  return (
    <div className="max-w-xs p-4 bg-white rounded shadow-md">
      <div className="flex items-center mb-2">
        <div className="text-3xl font-semibold text-gray-800">
          {averageRating.toFixed(1)}
        </div>
        <div className="ml-2 px-2 py-1 text-lg font-medium text-yellow-500 bg-yellow-100 rounded">
          {averageRating >= 4
            ? "Excellent"
            : averageRating >= 3
            ? "Good"
            : "Average"}
        </div>
      </div>
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              className={`w-6 h-6 ${
                i < Math.round(averageRating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.174c.969 0 1.372 1.24.588 1.81l-3.382 2.455a1 1 0 00-.363 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.383-2.455a1 1 0 00-1.176 0L5.79 18.058c-.784.57-1.84-.197-1.54-1.118l1.287-3.97a1 1 0 00-.363-1.118L1.791 9.397c-.784-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.97z" />
            </svg>
          ))}
        </div>
        <div className="ml-2 text-gray-600">{totalRatings} ratings</div>
      </div>
      <div>
        {ratings
          .sort((a, b) => b.stars - a.stars) // Sort ratings in descending order
          .map((rating) => (
            <div key={rating.stars} className="flex items-center mb-1">
              <div className="flex items-center w-24">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating.stars ? "text-yellow-500" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.174c.969 0 1.372 1.24.588 1.81l-3.382 2.455a1 1 0 00-.363 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.383-2.455a1 1 0 00-1.176 0L5.79 18.058c-.784.57-1.84-.197-1.54-1.118l1.287-3.97a1 1 0 00-.363-1.118L1.791 9.397c-.784-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.97z" />
                  </svg>
                ))}
              </div>
              <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500"
                  style={{ width: `${(rating.count / totalRatings) * 100}%` }}
                ></div>
              </div>
              <div className="ml-2 text-gray-600">{rating.count}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RatingComponent;
