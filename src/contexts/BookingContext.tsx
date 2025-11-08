import React, { createContext, useContext, useReducer, ReactNode } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// --------- Types ----------
export interface Booking {
  id?: number;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  service: string;
  totalamount?: number;
  timestamp?: string;
}

interface State {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Booking[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "ADD_BOOKING"; payload: Booking }
  | { type: "RESET_LOADING" }
  | { type: "RESET_SUCCESS" }
  | { type: "DELETE_BOOKING"; payload: number };

interface ContextProps extends State {
  fetchBookings: () => Promise<void>;
  addBooking: (data: Booking) => Promise<Booking | null>;
  deleteBooking: (id: number) => Promise<void>;
}

// --------- Reducer ----------
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        bookings: action.payload,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case "ADD_BOOKING":
      return {
        ...state,
        success: true,
        bookings: [...state.bookings, action.payload],
      };
    case "RESET_LOADING":
      return { ...state, loading: false };
    case "RESET_SUCCESS":
      return { ...state, success: false };
    case "DELETE_BOOKING":
      return {
        ...state,
        bookings: state.bookings.filter((b) => b.id !== action.payload),
      };
    default:
      return state;
  }
};

// --------- Context ----------
const BookingContext = createContext<ContextProps | undefined>(undefined);

// --------- Provider ----------
export const BookingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    bookings: [],
    loading: false,
    error: null,
    success: false,
  });

  const token = localStorage.getItem("authToken");

  // --------- Fetch All Bookings ----------
  const fetchBookings = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await axios.get(`${API_BASE}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "FETCH_SUCCESS", payload: res.data });
    } catch (err: any) {
      dispatch({
        type: "FETCH_ERROR",
        payload: err.response?.data?.msg || "Failed to fetch bookings",
      });
    }
  };

  // --------- Add Booking ----------
  const addBooking = async (data: Booking): Promise<Booking | null> => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await axios.post(`${API_BASE}/bookings`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "ADD_BOOKING", payload: res.data });
      return res.data;
    } catch (err: any) {
      dispatch({
        type: "FETCH_ERROR",
        payload: err.response?.data?.msg || "Failed to add booking",
      });
      return null;
    } finally {
       dispatch({ type: "RESET_LOADING" });
    }
  };

  // --------- Delete Booking ----------
  const deleteBooking = async (id: number) => {
    try {
      await axios.delete(`${API_BASE}/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "DELETE_BOOKING", payload: id });
    } catch (err: any) {
      dispatch({
        type: "FETCH_ERROR",
        payload: err.response?.data?.msg || "Failed to delete booking",
      });
    }
  };

  return (
    <BookingContext.Provider
      value={{
        bookings: state.bookings,
        loading: state.loading,
        error: state.error,
        success: state.success,
        fetchBookings,
        addBooking,
        deleteBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// --------- Hook for easy usage ----------
export const useBooking = (): ContextProps => {
  const context = useContext(BookingContext);
  if (!context)
    throw new Error("useBooking must be used within a BookingProvider");
  return context;
};
