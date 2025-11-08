import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Loader2,
  Trash2,
  ShoppingBag,
  CreditCard,
  MapPin,
  X,
  Gift,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

interface CartPopupProps {
  onLoginClick: () => void;
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Cart: React.FC<CartPopupProps> = ({ onLoginClick, isOpen, onClose }) => {
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);
  const [confirmItem, setConfirmItem] = useState<number | null>(null);
  const [offers, setOffers] = useState<any[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number>(0);

  const { toast } = useToast();
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  const { cartItems, fetchCartItems } = useCart();

  useEffect(() => {
    if (isOpen && token && userId) {
      fetchCartItems();
      fetchOffers();
    }
  }, [isOpen]);

  const fetchOffers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/offers/active", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOffers(res.data);
    } catch (err) {
      console.error("Failed to load offers:", err);
    }
  };

  const handleRemove = async (id: number) => {
    try {
      setRemovingId(id);
      await axios.delete(`http://localhost:5000/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({ title: "Removed", description: "Item removed from cart." });
      fetchCartItems();
    } catch (err) {
      console.error("Remove failed:", err);
      toast({
        title: "Error",
        description: "Failed to remove item.",
        variant: "destructive",
      });
    } finally {
      setRemovingId(null);
      setConfirmItem(null);
    }
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => Number(sum) + Number(item.price),
    0
  );

  const finalTotal = (cartTotal - discount).toFixed(2);

  const applyOffer = async (offerId: number) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/offers/apply",
        { offerId, cartTotal },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedOffer(offerId);
      setDiscount(res.data.discount);
      toast({
        title: "Offer Applied 🎁",
        description: `You saved ₹${res.data.discount}!`,
      });
    } catch (err) {
      console.error("Offer apply failed:", err);
      toast({
        title: "Invalid Offer",
        description: "This offer could not be applied.",
        variant: "destructive",
      });
    }
  };

  const handleCheckout = async (method: "razorpay" | "cash") => {
    if (!token || !userId) {
      onLoginClick();
      return;
    }

    try {
      setProcessing(true);

      if (method === "cash") {
        await axios.post(
          "http://localhost:5000/api/payment/cash",
          { user_id: userId, total_amount: finalTotal },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        toast({
          title: "Booking Confirmed",
          description: "Pay at the spa location.",
        });

        fetchCartItems();
        onClose();
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { user_id: userId, total_amount: finalTotal },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { order } = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Spa Bliss",
        description: "Service Payment",
        order_id: order.id,
        handler: async (response: any) => {
          await axios.post("http://localhost:5000/api/cart/verify", response, {
            headers: { Authorization: `Bearer ${token}` },
          });

          toast({
            title: "Payment Successful",
            description: "Your booking has been confirmed!",
          });

          fetchCartItems();
          onClose();
        },
        theme: { color: "#f59e0b" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Checkout failed:", err);
      toast({
        title: "Payment Failed",
        description: "Something went wrong, please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-amber-800 text-center mb-6">
            🛍️ Your Cart
          </h2>

          {!token ? (
            <div className="flex flex-col items-center py-10 text-gray-600">
              <p>Please login to view your cart</p>
              <Button onClick={onLoginClick} className="mt-3 bg-amber-600">
                Login Now
              </Button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center text-gray-600 py-10">
              <ShoppingBag className="w-10 h-10 mx-auto mb-3 text-amber-500" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="flex items-center p-4 mb-3 rounded-xl"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 ml-4">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">₹{item.price}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => setConfirmItem(item.id)}
                    disabled={removingId === item.id}
                  >
                    {removingId === item.id ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </Card>
              ))}

              {/* 🎁 Offers Section */}
              {offers.length > 0 && (
                <div className="mt-5">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-amber-600" />
                    Available Offers
                  </h3>
                  <div className="space-y-2">
                    {offers.map((offer) => (
                      <div
                        key={offer.id}
                        className={`p-3 border rounded-md cursor-pointer ${
                          selectedOffer === offer.id
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                        onClick={() => applyOffer(offer.id)}
                      >
                        <p className="font-medium text-sm">
                          {offer.title} -{" "}
                          {offer.discount_type === "percentage"
                            ? `${offer.discount_value}% off`
                            : `₹${offer.discount_value} off`}
                        </p>
                        <p className="text-xs text-gray-500">
                          {offer.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t pt-4 mt-4 text-right">
                {discount > 0 && (
                  <p className="text-green-600 font-medium">
                    Discount: -₹{discount}
                  </p>
                )}
                <p className="text-lg font-semibold text-amber-800 mb-4">
                  Total: ₹{finalTotal}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    disabled={processing}
                    onClick={() => handleCheckout("razorpay")}
                  >
                    <CreditCard className="w-4 h-4 mr-2" /> Pay Online
                  </Button>

                  <Button
                    className="bg-amber-600 hover:bg-amber-700"
                    disabled={processing}
                    onClick={() => handleCheckout("cash")}
                  >
                    <MapPin className="w-4 h-4 mr-2" /> Pay on Location
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 🧾 Confirmation Dialog */}
      {confirmItem !== null && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Remove Item?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to remove this item from your cart?
            </p>
            <div className="flex justify-center gap-3">
              <Button
                variant="destructive"
                onClick={() => handleRemove(confirmItem)}
                disabled={removingId === confirmItem}
              >
                {removingId === confirmItem ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  "Yes, Remove"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setConfirmItem(null)}
                className="text-gray-700"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
