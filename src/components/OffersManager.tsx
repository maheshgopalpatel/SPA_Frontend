import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Edit, Trash2, X } from "lucide-react";

interface Offer {
  id: number;
  title: string;
  code: string;
  description: string;
  discount_type: string;
  discount_value: string;
  max_discount: number;
  min_amount: number;
  valid_from: string;
  valid_to: string;
  active: boolean;
}

const OffersManager: React.FC = () => {
  const { toast } = useToast();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("authToken");

  const [form, setForm] = useState({
    title: "",
    code: "",
    description: "",
    discount_type: "percentage",
    discount_value: "",
    max_discount: "",
    min_amount: "",
    valid_from: "",
    valid_to: "",
    active: true,
  });

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/offers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOffers(res.data);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to fetch offers.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !form.code ||
      !form.discount_value ||
      !form.valid_from ||
      !form.valid_to
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);
      if (editingOffer) {
        await axios.put(
          `http://localhost:5000/api/offers/${editingOffer.id}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast({ title: "Updated", description: "Offer updated successfully!" });
      } else {
        await axios.post("http://localhost:5000/api/offers", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast({ title: "Created", description: "Offer created successfully!" });
      }

      fetchOffers();
      setShowForm(false);
      setEditingOffer(null);
      setForm({
        title: "",
        code: "",
        description: "",
        discount_type: "percentage",
        discount_value: "",
        max_discount: "",
        min_amount: "",
        valid_from: "",
        valid_to: "",
        active: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to save offer.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    toast({
      title: "Delete Offer?",
      description: (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => handleDelete(offers.id)}
            className="px-3 py-1 bg-red-500 text-white rounded-md"
          >
            Yes
          </button>
          <button className="px-3 py-1 bg-gray-300 rounded-md">Cancel</button>
        </div>
      ),
    });
    try {
      await axios.delete(`http://localhost:5000/api/offers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: "Deleted", description: "Offer removed successfully!" });
      fetchOffers();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete offer.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setForm({
  ...offer,
  discount_value: String(offer.discount_value ?? ""),
  max_discount: String(offer.max_discount ?? ""),
  min_amount: String(offer.min_amount ?? ""),
});

    setShowForm(true);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-700">
          🎟️ Offers Management
        </h2>
        <Button
          onClick={() => {
            setShowForm(true);
            setEditingOffer(null);
          }}
          className="bg-amber-600 hover:bg-amber-700"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Offer
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin w-8 h-8 text-amber-600" />
        </div>
      ) : offers.length === 0 ? (
        <p className="text-center text-gray-500">No offers available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {offers.map((offer) => (
            <Card key={offer.id} className="p-4 relative">
              <div className="absolute top-3 right-3 flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleEdit(offer)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(offer.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <h3 className="font-bold text-lg text-amber-800">{offer.code}</h3>
              <p className="text-sm text-gray-600 mb-2">{offer.description}</p>
              <p>
                💰{" "}
                {offer.discount_type === "percentage"
                  ? `${offer.discount_value}%`
                  : `₹${offer.discount_value}`}{" "}
                off (Max ₹{offer.max_discount || "-"})
              </p>
              <p>🛒 Min Order: ₹{offer.min_amount}</p>
              <p>
                📅 {offer.valid_from.split("T")[0]} -{" "}
                {offer.valid_to.split("T")[0]}
              </p>
              <p
                className={`mt-2 text-sm font-medium ${
                  offer.active ? "text-green-600" : "text-red-500"
                }`}
              >
                {offer.active ? "Active" : "Inactive"}
              </p>
            </Card>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-bold text-amber-700 mb-4">
              {editingOffer ? "Edit Offer" : "Add New Offer"}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Code"
                name="code"
                value={form.code}
                onChange={handleChange}
              />
              <Input
                placeholder="Discount Value"
                name="discount_value"
                type="number"
                value={form.discount_value}
                onChange={handleChange}
              />
              <select
                name="discount_type"
                value={form.discount_type}
                onChange={handleChange}
                className="border rounded-lg p-2"
              >
                <option value="percentage">Percentage</option>
                <option value="flat">Flat</option>
              </select>
              <Input
                placeholder="Max Discount"
                name="max_discount"
                type="number"
                value={form.max_discount}
                onChange={handleChange}
              />
              <Input
                placeholder="Min Amount"
                name="min_amount"
                type="number"
                value={form.min_amount}
                onChange={handleChange}
              />
              <Input
                type="date"
                name="valid_from"
                value={form.valid_from}
                onChange={handleChange}
              />
              <Input
                type="date"
                name="valid_to"
                value={form.valid_to}
                onChange={handleChange}
              />
            </div>

            <textarea
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border rounded-lg p-2 mt-3 w-full h-20"
            />

            <div className="flex items-center mt-3 gap-2">
              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              <label>Active</label>
            </div>

            <div className="flex justify-end mt-5 gap-3">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-amber-600 hover:bg-amber-700"
                disabled={saving}
              >
                {saving ? <Loader2 className="animate-spin w-4 h-4" /> : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffersManager;
