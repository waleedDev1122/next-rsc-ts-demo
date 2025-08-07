export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};


export type Product = {
  id: number;
  title: string;
  description: string;
  availabilityStatus: string;
  price: number;
  thumbnail: string;
  rating: string;
  reviews: Review[];
};

