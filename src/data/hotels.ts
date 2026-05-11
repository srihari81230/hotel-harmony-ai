import hotel1 from "@/assets/hotel-1.jpg";
import hotel2 from "@/assets/hotel-2.jpg";
import hotel3 from "@/assets/hotel-3.jpg";
import hotel4 from "@/assets/hotel-4.jpg";
import hotel5 from "@/assets/hotel-5.jpg";
import hotel6 from "@/assets/hotel-6.jpg";

export interface SubRatings {
  cleanliness: number;
  roomComfort: number;
  service: number;
  location: number;
  valueForMoney: number;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  description: string;
  category: string;
  matchScore?: number;
  starRating: 1 | 2 | 3 | 4 | 5;
  birthdayParties?: boolean;
  freeCancellation?: boolean;
  support24x7?: boolean;
  freeSwimmingPool?: boolean;
  gym?: boolean;
  acRooms?: boolean;
  breakfastIncluded?: boolean;
  subRatings: SubRatings;
}

const images = [hotel1, hotel2, hotel3, hotel4, hotel5, hotel6];

const cities = [
  "Goa", "Mumbai, Maharashtra", "Jaipur, Rajasthan", "Udaipur, Rajasthan", "Jaisalmer, Rajasthan",
  "Manali, Himachal Pradesh", "Shimla, Himachal Pradesh", "Dharamshala, Himachal Pradesh",
  "Kovalam, Kerala", "Munnar, Kerala", "Alleppey, Kerala", "Kochi, Kerala",
  "Bengaluru, Karnataka", "Mysore, Karnataka", "Coorg, Karnataka", "Hampi, Karnataka",
  "Chennai, Tamil Nadu", "Ooty, Tamil Nadu", "Kodaikanal, Tamil Nadu", "Pondicherry",
  "New Delhi", "Agra, Uttar Pradesh", "Varanasi, Uttar Pradesh", "Lucknow, Uttar Pradesh",
  "Rishikesh, Uttarakhand", "Nainital, Uttarakhand", "Mussoorie, Uttarakhand",
  "Darjeeling, West Bengal", "Kolkata, West Bengal", "Gangtok, Sikkim",
  "Pune, Maharashtra", "Lonavala, Maharashtra", "Mahabaleshwar, Maharashtra",
  "Hyderabad, Telangana", "Visakhapatnam, Andhra Pradesh", "Tirupati, Andhra Pradesh",
  "Ahmedabad, Gujarat", "Rann of Kutch, Gujarat", "Diu", "Daman",
  "Bhubaneswar, Odisha", "Puri, Odisha", "Shillong, Meghalaya", "Guwahati, Assam",
  "Andaman Islands", "Leh, Ladakh",
];

const categoryByCity = (c: string): string => {
  if (/Goa|Kovalam|Diu|Daman|Puri|Visakhapatnam|Andaman|Pondicherry|Alleppey/i.test(c)) return "Beach";
  if (/Manali|Shimla|Dharamshala|Munnar|Coorg|Ooty|Kodaikanal|Nainital|Mussoorie|Darjeeling|Gangtok|Mahabaleshwar|Lonavala|Leh|Shillong/i.test(c)) return "Mountain";
  if (/Jaipur|Udaipur|Agra|Varanasi|Hampi|Mysore|Lucknow|Tirupati/i.test(c)) return "Historic";
  if (/Jaisalmer|Rann of Kutch/i.test(c)) return "Desert";
  return "City";
};

const hotelNames = [
  "Azure Shores Resort", "Alpine Peak Lodge", "Skyline Terrace Hotel", "Coral Water Villas",
  "Grand Haveli Palace", "Thar Golden Resort", "Royal Orchid Suites", "Sunset Bay Inn",
  "Heritage Mansion", "The Emerald Retreat", "Lotus Garden Resort", "Silver Pine Hotel",
  "Mystic River Lodge", "Pearl Coast Hotel", "Tiger Hills Resort", "Mango Grove Stay",
  "Saffron Sands", "Crystal Lake Inn", "Imperial Crown Hotel", "Velvet Cloud Suites",
  "Banyan Tree Resort", "Marble Arch Hotel", "Sapphire Bay Resort", "Peacock Palace",
  "Cedar Wood Lodge", "Riviera Pearl", "Maharaja Manor", "Whispering Pines",
  "Golden Lotus Hotel", "Indigo Heights", "Cascade Falls Resort", "Mirage Desert Camp",
  "Jasmine Valley Inn", "Spice Garden Hotel", "Backwater Bliss", "Snow Crest Resort",
  "Tropic Breeze Villas", "Stonewall Heritage", "Misty Meadows Lodge", "Pearl Harbour Hotel",
];

let idCounter = 0;
const seed = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};
const pick = <T,>(arr: T[], s: number) => arr[s % arr.length];

const buildHotel = (name: string, city: string, idx: number): Hotel => {
  idCounter++;
  const s = seed(name + city);
  // Price spread 1,000 → 50,000
  const price = 1000 + ((s % 491) * 100); // 1000 to 50000 in 100 steps
  const hasDiscount = s % 3 === 0;
  const discountPct = 10 + (s % 36); // 10-45%
  const originalPrice = hasDiscount ? Math.round((price / (1 - discountPct / 100)) / 50) * 50 : undefined;
  const star = (price < 5000 ? 1 + (s % 2) : price < 15000 ? 2 + (s % 2) : price < 30000 ? 3 + (s % 2) : 4 + (s % 2)) as Hotel["starRating"];
  const rating = Math.min(5, Math.max(3.2, 3.5 + (star * 0.3) + ((s % 7) / 20)));
  const cat = categoryByCity(city);
  const baseAmen = ["Restaurant"];
  const ac = s % 5 !== 0;
  const gym = star >= 3 && s % 4 !== 0;
  const breakfast = s % 2 === 0;
  const pool = star >= 3 && s % 3 !== 0;
  const support = star >= 4 && s % 4 === 0;
  const cancel = s % 2 === 1;
  const birthday = star >= 3 && s % 5 === 0;
  const amen = [...baseAmen];
  if (ac) amen.push("AC Rooms");
  if (gym) amen.push("Gym");
  if (breakfast) amen.push("Breakfast");
  if (pool) amen.push("Swimming Pool");
  if (cat === "Beach") amen.push("Beach Access");
  if (cat === "Mountain") amen.push("Mountain View");
  if (cat === "Historic") amen.push("Heritage Tour");
  if (cat === "Desert") amen.push("Desert Safari");
  if (star >= 4) amen.push("Spa");

  return {
    id: String(idCounter),
    name,
    location: city,
    price,
    originalPrice,
    discount: hasDiscount ? discountPct : undefined,
    rating: Math.round(rating * 10) / 10,
    reviews: 100 + (s % 2400),
    image: pick(images, idx),
    amenities: amen,
    description: `A ${star}-star ${cat.toLowerCase()} stay in ${city}. Comfortable rooms, warm hospitality and signature experiences await every guest.`,
    category: cat,
    starRating: star,
    birthdayParties: birthday,
    freeCancellation: cancel,
    support24x7: support,
    freeSwimmingPool: pool && star >= 4 && s % 6 === 0,
    gym,
    acRooms: ac,
    breakfastIncluded: breakfast,
    subRatings: {
      cleanliness: Math.min(10, Math.round((rating * 2 + (s % 5) / 5) * 10) / 10),
      roomComfort: Math.min(10, Math.round((rating * 2 + ((s + 1) % 5) / 5) * 10) / 10),
      service: Math.min(10, Math.round((rating * 2 + ((s + 2) % 5) / 5) * 10) / 10),
      location: Math.min(10, Math.round((rating * 2 + ((s + 3) % 5) / 5) * 10) / 10),
      valueForMoney: Math.min(10, Math.round((rating * 2 + ((s + 4) % 5) / 5) * 10) / 10),
    },
  };
};

const list: Hotel[] = [];
for (let i = 0; i < hotelNames.length; i++) {
  const city = cities[i % cities.length];
  list.push(buildHotel(hotelNames[i], city, i));
}
// pad to ~46
for (let i = hotelNames.length; i < cities.length; i++) {
  list.push(buildHotel(`${cities[i].split(",")[0]} Royale`, cities[i], i));
}

export const hotels: Hotel[] = list;

export const categories = ["All", "Beach", "Mountain", "City", "Historic", "Desert"];

// Food menu (used in detail modal)
export interface FoodItem {
  name: string;
  cuisine: "North Indian" | "South Indian" | "Chinese" | "Italian";
  veg: boolean;
  price: number;
  image: string;
}

export const foodMenu: FoodItem[] = [
  { name: "Butter Chicken", cuisine: "North Indian", veg: false, price: 480, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=70" },
  { name: "Paneer Tikka", cuisine: "North Indian", veg: true, price: 360, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=70" },
  { name: "Dal Makhani", cuisine: "North Indian", veg: true, price: 320, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=70" },
  { name: "Masala Dosa", cuisine: "South Indian", veg: true, price: 220, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&q=70" },
  { name: "Idli Sambar", cuisine: "South Indian", veg: true, price: 180, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=70" },
  { name: "Chettinad Chicken", cuisine: "South Indian", veg: false, price: 420, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=70" },
  { name: "Hakka Noodles", cuisine: "Chinese", veg: true, price: 280, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=70" },
  { name: "Chilli Chicken", cuisine: "Chinese", veg: false, price: 380, image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&q=70" },
  { name: "Veg Manchurian", cuisine: "Chinese", veg: true, price: 260, image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&q=70" },
  { name: "Margherita Pizza", cuisine: "Italian", veg: true, price: 540, image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&q=70" },
  { name: "Penne Arrabbiata", cuisine: "Italian", veg: true, price: 460, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&q=70" },
  { name: "Chicken Lasagna", cuisine: "Italian", veg: false, price: 580, image: "https://images.unsplash.com/photo-1619895092538-128f4d7eb74e?w=400&q=70" },
];
