import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface CartContextType {
  cartItems: any[];
  fetchCartItems: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  fetchCartItems: async () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const fetchCartItems = async () => {
    const token = localStorage.getItem("authToken");
    const user_id = localStorage.getItem("userId");
    if (!token || !user_id) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  useEffect(() => {
    fetchCartItems(); // fetch once on load
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 
