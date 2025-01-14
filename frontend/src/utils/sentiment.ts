import axios from 'axios';
import { Review } from '../types';

export const analyzeSentiment = async (review: string,movieName:string) => {
    try {
      const BASE_URL = import.meta.env.VITE_API_URL  ;
      const payload = {text: review, moviename: movieName}
      const response = await axios.post(
        `${BASE_URL}/analyze`,
        payload
      );
      if (response.status !== 200) {
        console.error('Failed to analyze sentiment:', response.data);
      }
      const data = response.data;

      return {
        id: data?.id,
        movieName: data?.moviename,
        review: data?.text,
        sentiment: data?.sentiment,
        date: data?.create_at,
      }
    } catch (error) {
      console.error('Failed to analyze sentiment:', error);
      return {
        id: '',
        movieName: '',
        review: '',
        sentiment: 'neutral',
        date: '',
      }
    }
  };

export const get_reviews = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_API_URL  ;
      const response = await axios.get(`${BASE_URL}/reviews`);
      if (response.status !== 200) {
        console.error('Failed to get all reviews:', response.data);
      }
      const data = response.data;
      return data.map((review: any) => ({
        id: review.id,
        movieName: review.moviename,
        review: review.text,
        sentiment: review.sentiment,
        date: review.create_at,
      }));
    } catch (error) {
      console.error('Failed to get all reviews:', error);
      return [];
    }
  }