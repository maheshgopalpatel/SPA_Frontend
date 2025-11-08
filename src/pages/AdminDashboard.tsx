import React, { useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, DollarSign } from "lucide-react";
import SettingsMenu from "@/components/SettingsMenu";
import { useBooking } from "@/contexts/BookingContext";
import { useContact } from "@/contexts/ContactContext";
import ServiceManager from "@/components/ServiceManager";
import GalleryManager from "@/components/GalleryManager";
import OffersManager from "@/components/OffersManager";

const formatDate = (isoDate: string) => {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const AdminDashboard = () => {
  const { bookings, loading: bookingsLoading, fetchBookings } = useBooking();
  const { contactInfo } = useContact();

  const [loadingContacts, setLoadingContacts] = React.useState(false);

  // Fetch bookings on mount
  useEffect(() => {
    fetchBookings();
  }, []);

  // Stats derived from bookings
  const stats = {
    totalBookings: bookings.length,
    monthlyRevenue: bookings.reduce(
      (sum, b) => Number(sum) + Number(b.totalamount || 0),
      0
    ),
    activeStaff: 8,
    totalCustomers: new Set(bookings.map((b) => b.phone)).size,
  };

  return (
    <div className="min-h-screen bg-background p-6 text-foreground">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your spa operations effectively
            </p>
          </div>
          <SettingsMenu />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="h-full bg-card text-card-foreground shadow-sm border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Bookings
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
            </CardContent>
          </Card>

          <Card className="h-full bg-card text-card-foreground shadow-sm border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{stats.monthlyRevenue.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="h-full bg-card text-card-foreground shadow-sm border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Staff
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeStaff}</div>
              <p className="text-xs text-muted-foreground">2 new this month</p>
            </CardContent>
          </Card>

          <Card className="h-full bg-card text-card-foreground shadow-sm border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Customers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="contactInfo">Contact Info</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="offers" >
              Add Offers
            </TabsTrigger>
          </TabsList>

          {/* BOOKINGS TAB */}
          <TabsContent value="bookings">
            <Card className="bg-card text-card-foreground border border-border shadow-sm">
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Track and manage appointments</CardDescription>
              </CardHeader>
              <CardContent>
                {bookingsLoading ? (
                  <p className="text-center text-muted-foreground">
                    Loading...
                  </p>
                ) : bookings.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-border rounded-lg overflow-hidden">
                      <thead className="bg-muted/30 text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold">
                            Name
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">
                            Service
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">
                            Date
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">
                            Time
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">
                            Phone
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.slice(0, 10).map((booking, i) => (
                          <tr
                            key={i}
                            className="border-t border-border hover:bg-muted/10 transition"
                          >
                            <td className="px-4 py-3">{booking.name}</td>
                            <td className="px-4 py-3 capitalize text-primary font-medium">
                              {booking.service}
                            </td>
                            <td className="px-4 py-3">
                              {formatDate(booking.date)}
                            </td>
                            <td className="px-4 py-3">{booking.time}</td>
                            <td className="px-4 py-3">{booking.phone}</td>
                            <td className="px-4 py-3 text-right">
                              <Badge variant="outline">
                                ₹{booking.totalamount}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">
                    No bookings found
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* CONTACT INFO TAB */}
          <TabsContent value="contactInfo">
            <Card className="bg-card text-card-foreground border border-border shadow-sm">
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>
                  Messages received from contact form
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingContacts ? (
                  <p className="text-center text-muted-foreground">
                    Loading...
                  </p>
                ) : contactInfo.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-border rounded-lg overflow-hidden">
                      <thead className="bg-muted/30 text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold">
                            Name
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">
                            Mobile
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">
                            Email
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">
                            Message
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">
                            Date
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {contactInfo.slice(0, 10).map((msg, i) => (
                          <tr
                            key={i}
                            className="border-t border-border hover:bg-muted/10 transition"
                          >
                            <td className="px-4 py-3">{msg.name}</td>
                            <td className="px-4 py-3">{msg.phone}</td>
                            <td className="px-4 py-3">{msg.email}</td>
                            <td className="px-4 py-3">{msg.message}</td>
                            <td className="px-4 py-3">
                              {new Date(msg.created_at).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </td>

                            <td className="px-4 py-3">
                              {new Date(msg.created_at).toLocaleTimeString(
                                "en-IN",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">
                    No messages found
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          {/* CONTACT INFO TAB */}
          <TabsContent value="services">
            <Card className="bg-card text-card-foreground border border-border shadow-sm">
              <CardHeader>
                <CardTitle>Service Management</CardTitle>
                <CardDescription>
                  Manage services : add , update, delete service-related data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ServiceManager />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="gallery">
            <Card className="bg-card text-card-foreground border border-border shadow-sm">
              <CardHeader>
                <CardTitle>Gallery Management</CardTitle>
                <CardDescription>
                  Upload and manage service-related images
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GalleryManager />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="offers">
            <Card className="bg-card text-card-foreground border border-border shadow-sm">
              <CardHeader>
                <CardTitle>Manage Offers</CardTitle>
                <CardDescription>
                  Here you can manage offers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OffersManager/>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
