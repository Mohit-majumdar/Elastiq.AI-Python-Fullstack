import React from 'react';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import type { Review } from '../types';

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  const getSentimentIcon = (sentiment: Review['sentiment']) => {
    switch (sentiment) {
      case 'Positive':
        return <ThumbsUp className="w-5 h-5 text-green-500" />;
      case 'Negative':
        return <ThumbsDown className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };

  const getDatetime = (date: string) => {
    const datetime = new Date(date);
    return datetime.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{review.movieName}</h3>
              <p className="mt-2 text-gray-600">{review.review}</p>
              <p className="mt-2 text-sm text-gray-500">{getDatetime(review.date)}</p>
            </div>
            <div className="flex items-center space-x-2">
              {getSentimentIcon(review.sentiment)}
              <span className="text-sm capitalize">{review.sentiment}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}