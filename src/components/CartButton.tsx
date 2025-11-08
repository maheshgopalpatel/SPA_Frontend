import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";

export default function CartButton({openCart}) {
  const {cartItems} = useCart()

  const handleClick = () => {
    openCart()
  };

  return (
    <button
      onClick={handleClick}
      className="relative flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      <ShoppingCart className="w-5 h-5" />
      <span className="hidden sm:block">Cart</span>

      {cartItems.length > 0 && (
        <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
          {cartItems.length}
        </Badge>
      )}
    </button>
  );
}
