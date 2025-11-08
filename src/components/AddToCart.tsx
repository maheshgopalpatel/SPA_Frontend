import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AddToCartProps {
  serviceId: number;
  name: string;
  price: number;
  duration?: string;
}

export default function AddToCart({
  serviceId,
  name,
  price,
  duration,
}: AddToCartProps) {
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdd = async () => {
    const token = localStorage.getItem("authToken");
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          service_id: serviceId,
          duration: duration || "60 min",
          price: price.toString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      }
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Failed to add to cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAdd}
      disabled={loading || added}
      className={`w-full flex items-center justify-center gap-2 transition-all duration-300 ${
        added
          ? "bg-green-600 hover:bg-green-700"
          : "bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90"
      }`}
    >
      {added ? (
        <>
          <Check className="w-4 h-4" /> Added
        </>
      ) : loading ? (
        "Adding..."
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" /> Add to Cart ₹{price}
        </>
      )}
    </Button>
  );
}
