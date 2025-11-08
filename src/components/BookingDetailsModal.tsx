import React from "react";
import { X, Calendar, Clock, MapPin, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Bookingdetails {
  id: number;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  service: string;
  totalamount: number;
  status: boolean; // true = confirmed, false = cancelled
}

interface BookingDetailsModalProps {
  booking: Bookingdetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  booking,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold mb-4">Booking Details</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span>{booking.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{booking.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{new Date(booking.date).toLocaleDateString("en-GB")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{booking.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{booking.service}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Total Amount:</span> ₹{booking.totalamount}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Status:</span>{" "}
            {booking.status ? "Confirmed" : "Cancelled"}
          </div>
        </div>
        <div className="mt-4 text-right">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
