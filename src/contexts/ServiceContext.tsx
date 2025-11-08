import React, { createContext, useContext, useReducer, ReactNode } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Service } from "@/types/Service";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// ------------------ State Types ------------------
interface State {
  services: Service[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Service[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "ADD_SERVICE"; payload: Service }
  | { type: "UPDATE_SERVICE"; payload: Service }
  | { type: "DELETE_SERVICE"; payload: number }
  | { type: "RESET" };

// ------------------ Context Type ------------------
interface ServiceContextProps extends State {
  fetchServices: () => Promise<void>;
  addService: (data: Service) => Promise<void>;
  updateService: (id: number, data: Service) => Promise<void>;
  deleteService: (id: number) => Promise<void>;
}

// ------------------ Reducer ------------------
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, services: action.payload };
    case "ADD_SERVICE":
      return { ...state, services: [action.payload, ...state.services] };
    case "UPDATE_SERVICE":
      return {
        ...state,
        services: state.services.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };
    case "DELETE_SERVICE":
      return {
        ...state,
        services: state.services.filter((s) => s.id !== action.payload),
      };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "RESET":
      return { ...state, success: false, error: null, loading: false };
    default:
      return state;
  }
};

// ------------------ Context ------------------
const ServiceContext = createContext<ServiceContextProps | undefined>(undefined);

// ------------------ Provider ------------------
export const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();

  const [state, dispatch] = useReducer(reducer, {
    services: [],
    loading: false,
    error: null,
    success: false,
  });

  const token = localStorage.getItem("authToken");

  // ------------------ Fetch All Services ------------------
  const fetchServices = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await axios.get(`${API_BASE}/services`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      console.log(res.data);
      
    } catch (err: any) {
      dispatch({
        type: "FETCH_ERROR",
        payload: err.response?.data?.msg || "Failed to load services",
      });
    }
  };

  // ------------------ Add Service ------------------
  const addService = async (data: Service) => {
    try {
      const res = await axios.post(`${API_BASE}/services`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "ADD_SERVICE", payload: res.data });
      toast({ title: "✅ Service added successfully" });
    } catch (err: any) {
      toast({
        title: "Failed to add service",
        description: err?.response?.data?.msg || "Server error",
        variant: "destructive",
      });
    }
  };

  // ------------------ Update Service ------------------
  const updateService = async (id: number, data: Service) => {
    try {
      const res = await axios.put(`${API_BASE}/services/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "UPDATE_SERVICE", payload: res.data });
      toast({ title: "✅ Service updated successfully" });
    } catch (err: any) {
      toast({
        title: "Update failed",
        description: err?.response?.data?.msg || "Server error",
        variant: "destructive",
      });
    }
  };

  // ------------------ Delete Service ------------------
  const deleteService = async (id: number) => {
    try {
      await axios.delete(`${API_BASE}/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "DELETE_SERVICE", payload: id });
      toast({ title: "🗑️ Service deleted" });
    } catch (err: any) {
      toast({
        title: "Delete failed",
        description: err?.response?.data?.msg || "Server error",
        variant: "destructive",
      });
    }
  };

  return (
    <ServiceContext.Provider
      value={{
        ...state,
        fetchServices,
        addService,
        updateService,
        deleteService,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

// ------------------ Hook ------------------
export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useService must be used within a ServiceProvider");
  }
  return context;
};
