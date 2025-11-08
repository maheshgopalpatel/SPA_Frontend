import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import ContactSection from "./components/ContactSection";
import { BookingProvider } from "./contexts/BookingContext";
import { ContactProvider } from "./contexts/ContactContext";
import { ServiceProvider } from "./contexts/ServiceContext";
import Cart from "./components/Cart";
import { useState } from "react";
import Legal from "./components/Legal";
import { CartProvider } from "./contexts/CartContext";

const queryClient = new QueryClient();

const App = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ServiceProvider>
        <BookingProvider>
          <CartProvider>
            <ContactProvider>
              <ThemeProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <AuthProvider>
                      <Routes>
                        {/* Public route */}
                        <Route
                          path="/"
                          element={
                            <Index
                              isLoginModalOpen={isLoginModalOpen}
                              setIsLoginModalOpen={setIsLoginModalOpen}
                            />
                          }
                        />

                        <Route path="/contact" element={<ContactSection />} />
                        <Route path="/privacy" element={<Legal />} />

                        {/* ✅ Protected Routes */}
                        <Route
                          path="/admin"
                          element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                              <AdminDashboard />
                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="/staff"
                          element={
                            <ProtectedRoute allowedRoles={["staff"]}>
                              <StaffDashboard />
                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="/customer"
                          element={
                            <ProtectedRoute allowedRoles={["user"]}>
                              <CustomerDashboard />
                            </ProtectedRoute>
                          }
                        />

                        {/* Catch-all route */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>

                      {/* ✅ WhatsApp icon stays visible across all pages */}
                      <FloatingWhatsApp />
                    </AuthProvider>
                  </BrowserRouter>
                </TooltipProvider>
              </ThemeProvider>
            </ContactProvider>
          </CartProvider>
        </BookingProvider>
      </ServiceProvider>
    </QueryClientProvider>
  );
};

export default App;
