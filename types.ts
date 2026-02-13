
export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface TourDetail {
  id: string;
  name: string;
  category: 'Free' | 'Trek' | 'Amazon';
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  description: string;
  longDescription: string;
  image: string;
  price?: string;
  priceDisclaimer?: string;
  itinerary: ItineraryItem[];
  inclusions: string[];
  exclusions: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
