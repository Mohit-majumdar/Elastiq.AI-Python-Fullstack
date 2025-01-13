export interface Review {
    id: string;
    movieName: string;
    review: string;
    sentiment: string;
    date: string;
  }
  
  export interface ReviewFormData {
    movieName: string;
    review: string;
  }