import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IoHeart } from "react-icons/io5";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Star,
  Gift,
  MapPin,
  Phone,
  User,
  Plus,
  Edit,
  Heart,
} from "lucide-react";
import SettingsMenu from "@/components/SettingsMenu";
import BookingDetailsModal from "@/components/BookingDetailsModal";
import RescheduleModal from "@/components/RescheduleModal";
import { useToast } from "@/hooks/use-toast";
import BookingPopup from "@/components/BookingPopup";
import { useService } from "@/contexts/ServiceContext";
import UserProfileCard from "@/components/UserProfileCard";
import { Booking } from "@/types/Service";
import ServicesSection from "@/components/ServicesSection";
import CartButton from "@/components/CartButton";
import Cart from "@/components/Cart";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const CustomerDashboard = () => {
  const [customerStats] = useState({
    totalVisits: 0,
    loyaltyPoints: 0,
    nextReward: 0,
    memberSince: "Jan 2023",
  });

  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [serviceHistory, setServiceHistory] = useState([]);
  const [favoriteServices, setFavoriteServices] = useState([]);
  const [userDetails, setUserDetails] = useState<[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookingId, setBookingId] = useState<Number>(null);
  const [bookingDetailsModal, setbookingDetailsModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { services, fetchServices } = useService();
  const { toast } = useToast();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const openBookingPopup = () => {
    // setSelectedService(null);
    setIsPopupOpen(true);
  };

  const closeBookingPopup = () => {
    setIsPopupOpen(false);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setbookingDetailsModal(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Cancel booking
  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.put(
        `${API_BASE}/bookings/cancel/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update upcomingBookings state
      setUpcomingBookings((prev) =>
        prev.map((b) => (b.id === id ? res.data.booking : b))
      );
      alert("Booking cancelled successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking");
    }
  };

  // Reschedule booking
  const handleOpenReschedule = (id: number) => {
    setBookingId(id);
    setIsModalOpen(true);
  };

  const handleReschedule = async (newDate: string, newTime: string) => {
    if (!bookingId) return;

    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.put(
        `${API_BASE}/bookings/reschedule/${bookingId}`,
        { newDate, newTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUpcomingBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? res.data.booking : b))
      );

      toast({
        title: "Booking Updated",
        description: "Your booking was rescheduled successfully.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to reschedule booking. Try again.",
        variant: "destructive",
      });
    }
  };

  // View details
  const handleViewDetails = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(`${API_BASE}/bookings/details/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedBooking(res.data || []);
      setbookingDetailsModal(true);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch booking details");
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("authToken"); // stored after login
        const res = await axios.get(`${API_BASE}/bookings/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userRes = await axios.get(`${API_BASE}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserDetails(userRes.data || []);

        const totalSpent = res.data.reduce((sum, booking) => {
          const amount = parseFloat(booking.totalamount || "0");
          return sum + (isNaN(amount) ? 0 : amount);
        }, 0);

        const loyaltyPoints = Math.floor(totalSpent / 100);

        const rewardThreshold = 1000;
        const nextReward = rewardThreshold - (totalSpent % rewardThreshold);
        const timestamps = res.data.map((b) => new Date(b.timestamp).getTime());
        const earliest = Math.min(...timestamps);
        const memberSince = new Date(earliest);
        const memberSinceStr = memberSince.toLocaleString("default", {
          month: "short",
          year: "numeric",
        });

        customerStats.totalVisits = res.data.length;
        customerStats.loyaltyPoints = loyaltyPoints;
        customerStats.nextReward = nextReward;
        customerStats.memberSince = memberSinceStr;

        const upcoming = res.data.filter((b) => new Date(b.date) >= new Date());

        const history = res.data.filter((b) => new Date(b.date) < new Date());

        setUpcomingBookings(upcoming);
        setServiceHistory(history);
        // favorite services count
        const favoritesMap = {};

        res.data.forEach((b) => {
          favoritesMap[b.service] = (favoritesMap[b.service] || 0) + 1;
        });

        const favs = Object.entries(favoritesMap)
          .map(([name, bookings]) => ({ name, bookings }))
          .sort((a, b) => b.bookings - a.bookings);
        setFavoriteServices(favs);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };

    fetchBookings();
  }, []);

  // handle new booking (after booking creation)
  const handleNewBooking = (newBooking) => {
    setUpcomingBookings((prev) => [...prev, newBooking]);
    // also update favorites
    setFavoriteServices((prev) => {
      const found = prev.find((f) => f.name === newBooking.service);
      if (found) {
        return prev.map((f) =>
          f.name === newBooking.service ? { ...f, bookings: f.bookings + 1 } : f
        );
      } else {
        return [...prev, { name: newBooking.service, bookings: 1 }];
      }
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="w-full flex gap-3 mb-8 items-center">
          <div className="w-full flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                My Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back! Manage your appointments and profile
              </p>
            </div>
            {/* <Button className="bg-amber-600" onClick={openBookingPopup}>
              <Plus className="w-4 h-4 mr-2" />
              Book Appointment
            </Button> */}
            <CartButton openCart={() => setCartOpen(true)} />
            <Cart
              isOpen={cartOpen}
              onClose={() => setCartOpen(false)}
              onLoginClick={() => alert("Open login popup here")}
            />
          </div>
          <SettingsMenu />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Visits
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customerStats.totalVisits}
              </div>
              <p className="text-xs text-muted-foreground">
                Member since {customerStats.memberSince}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Loyalty Points
              </CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customerStats.loyaltyPoints}
              </div>
              <p className="text-xs text-muted-foreground">
                {customerStats.nextReward - customerStats.loyaltyPoints} points
                to next reward
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Visits
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {upcomingBookings.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Next: {upcomingBookings[0]?.date}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Favorite Service
              </CardTitle>
              <IoHeart className="h-5 w-5 text-muted-foreground text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                {favoriteServices[0]?.name}
              </div>
              <p className="text-xs text-muted-foreground">
                {favoriteServices[0]?.bookings} times booked
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="history">Service History</TabsTrigger>
            <TabsTrigger value="loyalty">Loyalty & Rewards</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="services" className="space-y-6">
            <ServicesSection />
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            {/* Upcoming Appointments Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled services</CardDescription>
                </div>
                <Button onClick={openBookingPopup} className="bg-amber-600">
                  <Plus className="w-4 h-4 mr-2" />
                  New Booking
                </Button>
                {isPopupOpen && (
                  <BookingPopup
                    services={services}
                    userDetails={userDetails}
                    selectedService={selectedService}
                    onClose={closeBookingPopup}
                  />
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingBookings.map(
                    (booking) =>
                      booking.status && (
                        <div
                          key={booking.id}
                          className="p-4 border rounded-lg space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-lg">
                                {booking.service}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                with {booking.staff}
                              </p>
                            </div>
                            <Badge
                              variant={
                                booking.status === "confirmed"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>
                                {new Date(booking.date).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{booking.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>{booking.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span>+91 62077 42437</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenReschedule(booking.id)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Reschedule
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancel(booking.id)}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(booking.id)}
                            >
                              View Details
                            </Button>
                          </div>
                          <BookingDetailsModal
                            booking={selectedBooking}
                            isOpen={bookingDetailsModal}
                            onClose={closeModal}
                          />
                          <RescheduleModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSubmit={handleReschedule}
                          />
                        </div>
                      )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Service History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service History</CardTitle>
                <CardDescription>
                  Your past appointments and reviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceHistory.map((service) => (
                    <div key={service.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium">{service.service}</p>
                          <p className="text-sm text-muted-foreground">
                            with {service.staff}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ₹{service.totalamount || service.amount}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>
                              {new Date(service.date).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Loyalty Tab */}
          <TabsContent value="loyalty" className="space-y-4">
            <Card className="p-6 shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Loyalty & Rewards
                </CardTitle>
                <CardDescription>
                  Track your loyalty points and rewards based on your bookings.
                </CardDescription>
              </CardHeader>

              <CardContent>
                {userDetails.length > 0 ? (
                  (() => {
                    const totalSpent = userDetails.reduce(
                      (sum, b) => sum + parseFloat(b.totalamount || "0"),
                      0
                    );

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                          <h4 className="text-gray-500">Total Spent</h4>
                          <p className="text-2xl font-semibold text-gray-800">
                            ₹{totalSpent.toFixed(2)}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                          <h4 className="text-gray-500">Loyalty Points</h4>
                          <p className="text-2xl font-semibold text-yellow-600">
                            {customerStats.loyaltyPoints} pts
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                          <h4 className="text-gray-500">Next Reward In</h4>
                          <p className="text-2xl font-semibold text-green-600">
                            {customerStats.nextReward} pts
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                          <h4 className="text-gray-500">Member Since</h4>
                          <p className="text-2xl font-semibold text-blue-600">
                            {customerStats.memberSince}
                          </p>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <p className="text-gray-500 text-center">
                    No bookings found yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <UserProfileCard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;
