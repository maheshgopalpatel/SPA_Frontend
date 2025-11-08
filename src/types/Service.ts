export interface ServicePrice {
  duration: string;
  price: number;

}

export interface ServiceOption {
  duration: string;
  price: string;
}

export interface Service {
  id: number;
  name: string;
  description?: string;
  category?: string;
  image?: string;
  options?: ServiceOption[];
  price?: string;
  duration?: string;
  popular?: boolean;
  offer_percentage?: number;
  offer_type:string;
}

export interface Booking {
  id: number;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  service: string;
  totalamount: string;
  timestamp: string;
  status: boolean;
}

export interface ProfileCardProps {
  bookings: Booking[];
}