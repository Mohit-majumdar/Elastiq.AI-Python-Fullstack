import React, { useState } from "react";
import { Film } from "lucide-react";
import { ReviewForm } from "./components/ReviewForm";
import { ReviewList } from "./components/ReviewList";
import { analyzeSentiment,get_reviews } from "./utils/sentiment";
import type { Review, ReviewFormData } from "./types";
import { MessageSquarePlus } from "lucide-react";

function App() {
  const [reviews, setReviews] = useState<Review[]>([]);

  const handleSubmitReview = async (formData: ReviewFormData) => {
    const newReview: Review = await analyzeSentiment(
      formData.review,
      formData.movieName
    );
    console.log(newReview);
    setReviews((prev) => [newReview, ...prev]);
  };
const get_all_reviews = async () =>{
  const all_reviews = await get_reviews();
  setReviews(all_reviews);


}
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <Film className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Movie Reviews</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <ReviewForm onSubmit={handleSubmitReview} />
          </div>
          <div className="mb-8">
          <button
            onClick={() => get_all_reviews()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <MessageSquarePlus className="w-5 h-5 mr-2" />
            Get all Reviewss
          </button>
          </div>

          {reviews.length > 0 ? (
            <ReviewList reviews={reviews} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No reviews yet. Be the first to add one!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
