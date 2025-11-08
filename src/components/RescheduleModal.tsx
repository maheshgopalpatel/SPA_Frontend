import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newDate: string, newTime: string) => Promise<void>;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!newDate || !newTime) return;
    setLoading(true);
    await onSubmit(newDate, newTime);
    setLoading(false);
    setNewDate("");
    setNewTime("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Reschedule Booking
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">New Date</label>
            <Input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">New Time</label>
            <Input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Updating..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal;
