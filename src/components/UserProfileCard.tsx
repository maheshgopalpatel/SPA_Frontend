import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Input } from "@/components/ui/input";

const UserProfileCard = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const { toast } = useToast();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // Fetch user & booking data
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const fetchData = async () => {
      try {
        const [userRes, bookingRes] = await Promise.all([
          axios.get(`${API_BASE}/api/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE}/bookings/user`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUser(userRes.data);
        setBookings(bookingRes.data);
        localStorage.setItem("userId", userRes.data.userId);

        setFormData({
          username: userRes.data.username || "",
          email: userRes.data.email || "",
          phone: userRes.data.phone || "",
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchData();
  }, [API_BASE]);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile update
  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.put(`${API_BASE}/api/user/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser((prev) => ({ ...prev, ...formData }));
      setEditMode(false);
      toast({ title: "Profile updated successfully!" });
    } catch (err) {
      console.error("Error updating profile:", err);
      toast({ title: "Failed to update profile", variant: "destructive" });
    }
  };

  // Derived values
  const totalSpent = bookings.reduce(
    (sum, b) => sum + parseFloat(b.totalamount || 0),
    0
  );
  const totalBookings = bookings.length;
  const loyaltyPoints = Math.floor(totalSpent / 100);
  const nextReward = 100 - (totalSpent % 100);
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "—";

  if (!user)
    return <p className="text-center py-4 text-gray-500">Loading profile...</p>;

  return (
    <Card className="p-6 shadow-lg rounded-2xl max-w-4xl mx-auto mt-8 bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-800">
          My Profile
        </CardTitle>
        <CardDescription className="text-gray-500">
          View or update your personal and membership details
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex justify-end mb-6">
          <Button
            variant={editMode ? "outline" : "default"}
            onClick={() => setEditMode((prev) => !prev)}
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Editable Fields */}
          <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-5 rounded-xl shadow-sm">
            <h4 className="text-gray-500 mb-1">Full Name</h4>
            {editMode ? (
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            ) : (
              <p className="text-lg font-semibold text-gray-800">
                {formData.username}
              </p>
            )}
          </div>

          <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-5 rounded-xl shadow-sm">
            <h4 className="text-gray-500 mb-1">Email</h4>
            {editMode ? (
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            ) : (
              <p className="text-lg font-medium text-gray-800">
                {formData.email}
              </p>
            )}
          </div>

          <div className="bg-gradient-to-br from-green-100 to-green-50 p-5 rounded-xl shadow-sm">
            <h4 className="text-gray-500 mb-1">Phone</h4>
            {editMode ? (
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            ) : (
              <p className="text-lg font-medium text-gray-800">
                {formData.phone || "—"}
              </p>
            )}
          </div>

          {/* Membership Info */}
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-5 rounded-xl shadow-sm">
            <h4 className="text-gray-500 mb-1">Member Since</h4>
            <p className="text-lg font-medium text-gray-800">{memberSince}</p>
          </div>

          {/* <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-5 rounded-xl shadow-sm">
            <h4 className="text-gray-500 mb-1">Total Bookings</h4>
            <p className="text-xl font-semibold text-gray-800">
              {totalBookings}
            </p>
          </div> */}

          {/* <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-5 rounded-xl shadow-sm">
            <h4 className="text-gray-500 mb-1">Total Spent</h4>
            <p className="text-xl font-semibold text-gray-800">
              ₹{totalSpent.toFixed(2)}
            </p>
          </div> */}

          {/* <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 p-5 rounded-xl shadow-sm col-span-1 md:col-span-2">
            <h4 className="text-gray-500 mb-1">Loyalty Points</h4>
            <p className="text-2xl font-bold text-indigo-700">
              {loyaltyPoints} pts
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Next reward in ₹{nextReward.toFixed(2)} spending
            </p>
          </div> */}
        </div>

        {editMode && (
          <div className="flex justify-end mt-6">
            <Button onClick={handleSave} className="bg-indigo-600 text-white">
              Save Changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
