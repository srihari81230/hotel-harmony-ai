import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  age?: number;
  dob?: string;
  location?: string;
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelImage: string;
  location: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  pricePerNight: number;
  discount: number;
  total: number;
  paymentMethod: string;
  createdAt: string;
}

interface AuthCtx {
  user: UserProfile | null;
  bookings: Booking[];
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
  addBooking: (b: Omit<Booking, "id" | "createdAt">) => Booking;
}

const Ctx = createContext<AuthCtx | null>(null);

const USER_KEY = "luxestay.user";
const BOOK_KEY = "luxestay.bookings";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window === "undefined") return null;
    try { const v = localStorage.getItem(USER_KEY); return v ? JSON.parse(v) : null; } catch { return null; }
  });
  const [bookings, setBookings] = useState<Booking[]>(() => {
    if (typeof window === "undefined") return [];
    try { const v = localStorage.getItem(BOOK_KEY); return v ? JSON.parse(v) : []; } catch { return []; }
  });

  useEffect(() => { if (user) localStorage.setItem(USER_KEY, JSON.stringify(user)); else localStorage.removeItem(USER_KEY); }, [user]);
  useEffect(() => { localStorage.setItem(BOOK_KEY, JSON.stringify(bookings)); }, [bookings]);

  const login = (email: string, name?: string) => {
    setUser({ email, name: name || email.split("@")[0] });
  };
  const logout = () => setUser(null);
  const updateProfile = (patch: Partial<UserProfile>) => setUser((u) => (u ? { ...u, ...patch } : u));
  const addBooking = (b: Omit<Booking, "id" | "createdAt">): Booking => {
    const full: Booking = { ...b, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    setBookings((prev) => [full, ...prev]);
    return full;
  };

  return <Ctx.Provider value={{ user, bookings, login, logout, updateProfile, addBooking }}>{children}</Ctx.Provider>;
};

export const useAuth = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be inside AuthProvider");
  return v;
};
