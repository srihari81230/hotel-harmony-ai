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
    location: "Cancún, Mexico",
    price: 320,
    rating: 4.9,
    reviews: 1284,
    image: hotel1,
    amenities: ["Pool", "Spa", "Beach", "Restaurant", "Bar"],
    description: "Beachfront luxury with infinity pool overlooking the Caribbean Sea. World-class dining and premium spa treatments.",
    category: "Beach",
  },
  {
    id: "2",
    name: "Alpine Peak Lodge",
    location: "Whistler, Canada",
    price: 275,
    rating: 4.8,
    reviews: 892,
    image: hotel2,
    amenities: ["Ski-in/out", "Fireplace", "Hot Tub", "Restaurant"],
    description: "Cozy mountain retreat with ski-in/ski-out access. Rustic elegance meets modern comfort amidst snow-capped peaks.",
    category: "Mountain",
  },
  {
    id: "3",
    name: "Skyline Terrace Hotel",
    location: "New York, USA",
    price: 450,
    rating: 4.7,
    reviews: 2156,
    image: hotel3,
    amenities: ["Rooftop Bar", "Gym", "Concierge", "Restaurant"],
    description: "Manhattan's finest rooftop experience. Panoramic city views with Michelin-starred dining and impeccable service.",
    category: "City",
  },
  {
    id: "4",
    name: "Coral Water Villas",
    location: "Maldives",
    price: 680,
    rating: 4.9,
    reviews: 743,
    image: hotel4,
    amenities: ["Overwater Villa", "Snorkeling", "Spa", "Butler"],
    description: "Private overwater bungalows in crystal-clear lagoons. The ultimate tropical escape with personalized butler service.",
    category: "Beach",
  },
  {
    id: "5",
    name: "Grand Europa Palace",
    location: "Vienna, Austria",
    price: 385,
    rating: 4.8,
    reviews: 1567,
    image: hotel5,
    amenities: ["Historic", "Fine Dining", "Spa", "Ballroom"],
    description: "A 19th-century masterpiece in the heart of Vienna. Classical grandeur with modern luxury and world-famous pastries.",
    category: "Historic",
  },
  {
    id: "6",
    name: "Sahara Oasis Resort",
    location: "Dubai, UAE",
    price: 520,
    rating: 4.6,
    reviews: 934,
    image: hotel6,
    amenities: ["Desert Safari", "Pool", "Spa", "Fine Dining"],
    description: "Minimalist luxury set against golden sand dunes. Infinity pool, desert safaris, and stargazing from your private terrace.",
    category: "Desert",
  },
];

export const categories = ["All", "Beach", "Mountain", "City", "Historic", "Desert"];
