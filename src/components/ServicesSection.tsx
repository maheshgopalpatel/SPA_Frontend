import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Scissors,
  Sparkles,
  Palette,
  Crown,
  Heart,
  Hand,
  Check,
  ShoppingCart,
} from "lucide-react";
import { Service } from "@/types/Service";
import { useService } from "@/contexts/ServiceContext";
import { useCart } from "@/contexts/CartContext"; // 🛒 new
import axios from "axios";
import { useNavigate } from "react-router-dom";

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const DEFAULT_DISCOUNT = 20;

const getDiscountedPrice = (
  price: string,
  discount: number = DEFAULT_DISCOUNT
) => {
  const numeric = parseInt(price.replace(/[^\d]/g, ""), 10);
  const discounted = numeric - (numeric * discount) / 100;
  return discounted.toFixed(0);
};

interface ServicesSectionProps {
  onLoginClick: () => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ onLoginClick }) => {
  const [addedServiceId, setAddedServiceId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const navigate = useNavigate();

  const { services, fetchServices, loading, error } = useService();
  const { fetchCartItems } = useCart(); // 🛒 fetch cart after add

  useEffect(() => {
    fetchServices();
  }, []);

  const categories = [
    { name: "All", icon: Crown },
    { name: "Hair", icon: Scissors },
    { name: "Skin", icon: Sparkles },
    { name: "Massage", icon: Hand },
    { name: "Beauty", icon: Palette },
    { name: "Special", icon: Heart },
  ];

  const filteredServices =
    selectedCategory === "All"
      ? services
      : services.filter(
          (s) => s.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  const handleAddToCart = async (service: Service) => {
    const token = localStorage.getItem("authToken");
    const user_id = localStorage.getItem("userId");

    if (!token) {
      onLoginClick();
      return;
    }

    try {
      setLoadingId(service.id);

      const firstOption = service.options?.[0];
      const price = firstOption
        ? parseInt(firstOption.price.replace(/[^\d]/g, ""), 10)
        : 0;

      const payload = {
        service_id: service.id,
        user_id: user_id,
        price,
        duration: firstOption?.duration || "60 min",
      };

      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        setAddedServiceId(service.id);
        fetchCartItems(); 
        setTimeout(() => setAddedServiceId(null), 2000);
      }
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  if (loading)
    return <p className="text-center py-10 text-lg">Loading services...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load services: {error}
      </p>
    );

  return (
    <section
      id="services"
      className="relative py-20 bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-100 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-yellow-500 opacity-70 text-xl"
            initial={{
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ✨
          </motion.span>
        ))}
      </div>

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-2xl sm:text-4xl font-bold text-amber-800 mb-8 drop-shadow-md"
      >
        🪔 Festive Spa Specials 🪔
      </motion.h2>

      <div className="flex overflow-x-auto space-x-6 p-4 scrollbar-hide justify-center mb-12">
        {categories.map(({ name }) => (
          <motion.div
            key={name}
            onClick={() => setSelectedCategory(name)}
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-shrink-0 flex flex-col items-center justify-center cursor-pointer transition-transform ${
              selectedCategory === name ? "drop-shadow-[0_0_10px_#f59e0b]" : ""
            }`}
          >
            <motion.div
              className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-4 shadow-lg ${
                selectedCategory === name
                  ? "bg-gradient-to-br from-amber-300 to-orange-200 border-amber-600"
                  : "bg-gradient-to-br from-white to-amber-100 border-amber-300"
              }`}
            >
              <span className="text-xl sm:text-3xl select-none">🪔</span>
            </motion.div>
            <p className="text-sm mt-3 font-semibold text-gray-800">{name}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 container mx-auto px-4 relative z-10">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
          >
            <Card className="group hover:shadow-[0_0_20px_#f59e0b88] transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-white to-amber-50 border border-amber-200 overflow-hidden flex flex-col h-full rounded-2xl">
              <div className="relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-40 sm:h-44 md:h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {service.discount && (
                  <Badge className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 font-semibold shadow-md text-xs sm:text-sm px-2 py-1 rounded-md">
                    {service.discount}% OFF
                  </Badge>
                )}
                {service.popular && (
                  <Badge className="absolute top-2 right-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white text-xs sm:text-sm px-2 py-1 rounded">
                    Popular
                  </Badge>
                )}
              </div>

              <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col flex-1">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground group-hover:text-amber-700 transition-colors mb-1 sm:mb-2">
                  {service.name}
                </h3>

                <p className="text-xs sm:text-sm md:text-base text-foreground mb-2 sm:mb-3 flex-1">
                  {service.description}
                </p>

                {service.options?.map((opt, i) => {
                  const discounted = getDiscountedPrice(
                    opt.price,
                    service.discount
                  );
                  return (
                    <div key={i} className="flex justify-between mb-1 text-sm">
                      <span>{opt.duration}</span>
                      <span>
                        <span className="line-through text-gray-400 mr-1">
                          {opt.price}
                        </span>
                        <span className="font-semibold text-green-600">
                          ₹{discounted}
                        </span>
                      </span>
                    </div>
                  );
                })}

                <Button
                  onClick={() => handleAddToCart(service)}
                  size="sm"
                  disabled={loadingId === service.id}
                  className={`flex-1 min-w-0 text-xs sm:text-sm md:text-base mt-3 transition-all duration-300 ${
                    addedServiceId === service.id
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90"
                  }`}
                >
                  {loadingId === service.id ? (
                    "Adding..."
                  ) : addedServiceId === service.id ? (
                    <>
                      <Check className="w-4 h-4 mr-1" /> Added
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-1" /> Add to Cart
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
