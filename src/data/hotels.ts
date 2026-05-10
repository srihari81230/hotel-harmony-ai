import hotel1 from "@/assets/hotel-1.jpg";
import hotel2 from "@/assets/hotel-2.jpg";
import hotel3 from "@/assets/hotel-3.jpg";
import hotel4 from "@/assets/hotel-4.jpg";
import hotel5 from "@/assets/hotel-5.jpg";
import hotel6 from "@/assets/hotel-6.jpg";

export interface Hotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  description: string;
  category: string;
  matchScore?: number;
}

export const hotels: Hotel[] = [
  {
    id: "1",
    name: "Azure Shores Resort",
    location: "Goa, India",
    price: 26500,
    rating: 4.9,
    reviews: 1284,
    image: hotel1,
    amenities: ["Pool", "Spa", "Beach", "Restaurant", "Bar"],
    description: "Beachfront luxury with infinity pool overlooking the Arabian Sea. World-class dining and premium spa treatments on Goa's pristine coastline.",
    category: "Beach",
  },
  {
    id: "2",
    name: "Alpine Peak Lodge",
    location: "Manali, Himachal Pradesh",
    price: 22800,
    rating: 4.8,
    reviews: 892,
    image: hotel2,
    amenities: ["Ski-in/out", "Fireplace", "Hot Tub", "Restaurant"],
    description: "Cozy mountain retreat with panoramic Himalayan views. Rustic elegance meets modern comfort amidst snow-capped peaks and pine forests.",
    category: "Mountain",
  },
  {
    id: "3",
    name: "Skyline Terrace Hotel",
    location: "Mumbai, Maharashtra",
    price: 37500,
    rating: 4.7,
    reviews: 2156,
    image: hotel3,
    amenities: ["Rooftop Bar", "Gym", "Concierge", "Restaurant"],
    description: "Mumbai's finest rooftop experience. Panoramic Marine Drive views with award-winning dining and impeccable service in the City of Dreams.",
    category: "City",
  },
  {
    id: "4",
    name: "Coral Water Villas",
    location: "Kovalam, Kerala",
    price: 56500,
    rating: 4.9,
    reviews: 743,
    image: hotel4,
    amenities: ["Overwater Villa", "Snorkeling", "Spa", "Butler"],
    description: "Private overwater bungalows in Kerala's emerald backwaters. The ultimate tropical escape with personalized butler service and Ayurvedic wellness.",
    category: "Beach",
  },
  {
    id: "5",
    name: "Grand Haveli Palace",
    location: "Jaipur, Rajasthan",
    price: 32000,
    rating: 4.8,
    reviews: 1567,
    image: hotel5,
    amenities: ["Historic", "Fine Dining", "Spa", "Ballroom"],
    description: "A royal masterpiece in the heart of the Pink City. Rajput grandeur with modern luxury, peacock gardens, and world-famous Rajasthani hospitality.",
    category: "Historic",
  },
  {
    id: "6",
    name: "Thar Golden Resort",
    location: "Jaisalmer, Rajasthan",
    price: 43200,
    rating: 4.6,
    reviews: 934,
    image: hotel6,
    amenities: ["Desert Safari", "Pool", "Spa", "Fine Dining"],
    description: "Minimalist luxury set against the golden sands of the Thar Desert. Infinity pool, camel safaris, and stargazing from your private terrace.",
    category: "Desert",
  },
];

export const categories = ["All", "Beach", "Mountain", "City", "Historic", "Desert"];
