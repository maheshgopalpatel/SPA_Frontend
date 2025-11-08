import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at?: string;
}

interface ContactContextProps {
  sendMessage: (data: ContactMessage) => Promise<void>;
  contactInfo: ContactMessage[];
}

const ContactContext = createContext<ContactContextProps | undefined>(
  undefined
);

export const ContactProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [contactInfo, setContactInfo] = useState<ContactMessage[]>([]);
  const { toast } = useToast();
  const token = localStorage.getItem("authToken");

  const sendMessage = async (data: ContactMessage) => {
    try {
      await axios.post(`${API_BASE}/contacts`, data);
      toast({
        title: "✅ Message Sent",
        description: "Thank you! We’ll get back to you soon.",
      });
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Failed to Send",
        description: err?.response?.data?.msg || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  // Fetch contacts on mount
  useEffect(() => {
    const fetchContacts = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${API_BASE}/contacts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContactInfo(res.data || []);
      } catch (err) {
        console.error("Contacts fetch failed:", err);
      }
    };
    fetchContacts();
  }, [token]);

  return (
    <ContactContext.Provider value={{ sendMessage, contactInfo }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = (): ContactContextProps => {
  const context = useContext(ContactContext);
  if (!context)
    throw new Error("useContact must be used within ContactProvider");
  return context;
};
