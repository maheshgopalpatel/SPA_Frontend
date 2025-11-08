import React, { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { useBooking } from "@/contexts/BookingContext";
import { Service, ServiceOption } from "@/types/Service";

interface BookingPopupProps {
  services: Service[];
  userDetails: any;
  selectedService: Service | null;
  onClose: () => void;
}

const BookingPopup: React.FC<BookingPopupProps> = ({
  userDetails,
  services,
  selectedService,
  onClose,
}) => {
  const { toast } = useToast();
  const { addBooking, loading } = useBooking();
  const { username, email, phone } = userDetails
console.log(username, email, userDetails);


  const [formData, setFormData] = useState({
    name: username || "",
    phone: phone || "",
    email: email || "",
    date: "",
    time: "",
    selectedServiceIds: selectedService ? [selectedService.id] : [],
  });

  const [selectedOptionsById, setSelectedOptionsById] = useState<
    Record<number, ServiceOption>
  >(
    selectedService && selectedService.options
      ? { [selectedService.id]: selectedService.options[0] }
      : {}
  );

  const totalamount = useMemo(() => {
    return services
      .filter((s) => formData.selectedServiceIds.includes(s.id))
      .reduce((sum, s) => {
        const selectedOption = selectedOptionsById[s.id];
        if (s.options && selectedOption) {
          return (
            Number(sum) + Number(selectedOption.price.replace(/[^0-9.]/g, ""))
          );
        } else {
          const numeric = Number(s.price?.replace(/[^0-9.]/g, "") || 0);
          return Number(sum) + (isNaN(numeric) ? 0 : numeric);
        }
      }, 0);
  }, [formData.selectedServiceIds, services, selectedOptionsById]);

  const handleServiceToggle = (id: number) => {
    setFormData((prev) => {
      const alreadySelected = prev.selectedServiceIds.includes(id);
      const updatedIds = alreadySelected
        ? prev.selectedServiceIds.filter((sid) => sid !== id)
        : [...prev.selectedServiceIds, id];

      if (alreadySelected) {
        setSelectedOptionsById((prevOptions) => {
          const copy = { ...prevOptions };
          delete copy[id];
          return copy;
        });
      } else {
        const service = services.find((s) => s.id === id);
        if (service?.options) {
          setSelectedOptionsById((prevOptions) => ({
            ...prevOptions,
            [id]: service.options![0],
          }));
        }
      }

      return {
        ...prev,
        selectedServiceIds: updatedIds,
      };
    });
  };

  const handleOptionSelect = (serviceId: number, option: ServiceOption) => {
    setSelectedOptionsById((prev) => ({
      ...prev,
      [serviceId]: option,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedServices = services.filter((s) =>
      formData.selectedServiceIds.includes(s.id)
    );

    if (!selectedServices.length) {
      toast({
        title: "No Service Selected",
        description: "Please select at least one service before booking.",
        variant: "destructive",
      });
      return;
    }

    const bookingData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      date: formData.date,
      time: formData.time,
      service: selectedServices.map((s) => s.name).join(", "),
      totalamount: totalamount,
    };

    try {
      const newBooking = await addBooking(bookingData); // ✅ handle success immediately
      if (newBooking) {
        toast({
          title: "Booking Confirmed!",
          description:
            "Thank you for choosing us! Your booking has been successfully saved.",
        });

        setFormData({
          name: "",
          phone: "",
          email: "",
          date: "",
          time: "",
          selectedServiceIds: [],
        });
        setSelectedOptionsById({});
        onClose();
      } else {
        toast({
          title: "Booking Failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description:
          err.response?.data?.msg ||
          "Something went wrong while saving. Please try again.",
        variant: "destructive",
      });
    }
  };

  // ✅ Show all services if selectedService is null
  const visibleServices = selectedService ? [selectedService] : services;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md p-6 rounded-2xl shadow-lg relative animate-fade-in overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-primary dark:text-primary mb-4 text-center">
          Book Your Appointment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Fields */}
          <input
            type="text"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none dark:bg-gray-800 dark:text-white"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none dark:bg-gray-800 dark:text-white"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none dark:bg-gray-800 dark:text-white"
          />

          {/* Date & Time */}
          <div className="flex gap-4">
            <div className=" text-xs w-1/3">
              <label className="block font-medium mb-1 dark:text-gray-200">
                Date *
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={formData.date || ""}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="text-xs w-2/3">
              <label className="block  font-medium mb-1 dark:text-gray-200">
                Time *
              </label>
              <div className="w-full">
                <div className="flex gap-2 justify-center items-center">
                  {/* Hour Selector */}
                  <select
                    required
                    value={formData.time?.split(":")[0] || ""}
                    onChange={(e) => {
                      const [_, minuteAmPm] = formData.time.split(":");
                      const newTime = `${e.target.value}:${
                        minuteAmPm || "00 AM"
                      }`;
                      setFormData({ ...formData, time: newTime });
                    }}
                    className="w-1/3 border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">HH</option>
                    {Array.from({ length: 12 }, (_, i) => {
                      const hour = i + 1;
                      return (
                        <option
                          key={hour}
                          value={hour.toString().padStart(2, "0")}
                        >
                          {hour.toString().padStart(2, "0")}
                        </option>
                      );
                    })}
                  </select>

                  {/* Minute Selector */}
                  <select
                    required
                    value={formData.time?.split(":")[1]?.split(" ")[0] || ""}
                    onChange={(e) => {
                      const [hour, minuteAmPm] = formData.time.split(":");
                      const ampm = minuteAmPm?.split(" ")[1] || "AM";
                      const newTime = `${hour || "12"}:${
                        e.target.value
                      } ${ampm}`;
                      setFormData({ ...formData, time: newTime });
                    }}
                    className="w-1/3 border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 60 }, (_, i) => {
                      const minute = i.toString().padStart(2, "0");
                      return (
                        <option key={minute} value={minute}>
                          {minute}
                        </option>
                      );
                    })}
                  </select>

                  {/* AM/PM Selector */}
                  <select
                    required
                    value={formData.time?.split(" ")[1] || ""}
                    onChange={(e) => {
                      const [hour, minuteAmPm] = formData.time.split(":");
                      const minute = minuteAmPm?.split(" ")[0] || "00";
                      const newTime = `${hour || "12"}:${minute} ${
                        e.target.value
                      }`;
                      setFormData({ ...formData, time: newTime });
                    }}
                    className="w-1/3 border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">AM/PM</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="mb-4">
            <p className="font-medium mb-2 dark:text-gray-200">
              Select Services:
            </p>
            <div className="max-h-40 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-2">
              {visibleServices.map((s) => (
                <label
                  key={s.id}
                  className="flex items-center gap-2 mb-1 cursor-pointer dark:text-gray-200"
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedServiceIds.includes(s.id)}
                    onChange={() => handleServiceToggle(s.id)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm">{s.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Options for selected services */}
          {formData.selectedServiceIds.map(
            (id) =>
              services.find((s) => s.id === id)?.options && (
                <div className="mb-4" key={id}>
                  <p className="font-medium mb-2 dark:text-gray-200">
                    Choose Duration/Price for{" "}
                    {services.find((s) => s.id === id)?.name}:
                  </p>
                  <div className="flex flex-col gap-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
                    {services
                      .find((s) => s.id === id)!
                      .options!.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleOptionSelect(id, opt)}
                          className={`w-full py-2 rounded-lg border ${
                            selectedOptionsById[id] === opt
                              ? "border-primary bg-amber-600 text-white"
                              : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
                          }`}
                        >
                          {opt.duration} – {opt.price}
                        </button>
                      ))}
                  </div>
                </div>
              )
          )}

          {/* Total Amount */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              Total Amount:
            </span>
            <span className="text-lg font-bold text-primary">
              ₹{totalamount}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded-xl transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-amber-600 dark:bg-gradient-to-r dark:from-primary-dark dark:to-secondary-dark hover:opacity-90"
            }`}
          >
            {loading ? "Saving..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPopup;
