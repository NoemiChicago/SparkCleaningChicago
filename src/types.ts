export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  hoursBooked: number; // in hours
  homeSize?: number; // legacy backward compatibility
  bedrooms: number;
  bathrooms: number;
  frequency: 'once' | 'weekly' | 'biweekly' | 'monthly';
  preferredDate: string;
  preferredTime: string;
  extras: string[];
  estimatedCost: number;
  address: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  createdAt: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  hoursBooked: number;
  homeSize?: number; // legacy backward compatibility
  bedrooms: number;
  bathrooms: number;
  frequency: string;
  address: string;
  notes?: string;
  estimatedCost: number;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number; // 1-5
  comment: string;
  serviceType: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Kitchen' | 'Bathroom' | 'Living Room' | 'Full House';
  imageBefore: string;
  imageAfter: string;
  description: string;
}

export interface ServicePrice {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  features: string[];
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string[]; // split by paragraphs or sections
  author: string;
  date: string;
  category: string;
  tags: string[];
  readTime: string;
  image: string;
}

