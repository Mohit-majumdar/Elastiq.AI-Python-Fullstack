import React, { useState } from 'react';
import { MessageSquarePlus } from 'lucide-react';
import type { ReviewFormData } from '../types';

interface ReviewFormProps {
  onSubmit: (review: ReviewFormData) => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [formData, setFormData] = useState<ReviewFormData>({
    movieName: '',
    review: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ movieName: '', review: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="movieName" className="block text-sm font-medium text-gray-700">
          Movie Name
        </label>
        <input
          type="text"
          id="movieName"
          value={formData.movieName}
          onChange={(e) => setFormData(prev => ({ ...prev, movieName: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="review" className="block text-sm font-medium text-gray-700">
          Your Review
        </label>
        <textarea
          id="review"
          value={formData.review}
          onChange={(e) => setFormData(prev => ({ ...prev, review: e.target.value }))}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <MessageSquarePlus className="w-5 h-5 mr-2" />
        Add Review
      </button>
    </form>
  );
}