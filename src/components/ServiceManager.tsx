import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useService } from "@/contexts/ServiceContext";
import { Select } from "@/components/ui/select"; // if not present, replace with <select>

export default function ServiceManager() {
  const { services, fetchServices, addService, updateService, deleteService } = useService();
  const [form, setForm] = useState({
    id: null as number | null,
    name: "",
    description: "",
    prices: [{ duration: "", price: "" }],
    image: null as File | null,
    preview: "",
    offerType: "none",
    offerPercentage: "",
    applicableUsers: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  // ➕ Add duration-price row
  const handleAddRow = () =>
    setForm((prev) => ({ ...prev, prices: [...prev.prices, { duration: "", price: "" }] }));

  // 🗑️ Remove duration row
  const handleRemoveRow = (index: number) =>
    setForm((prev) => ({
      ...prev,
      prices: prev.prices.filter((_, i) => i !== index),
    }));

  // 🔄 Handle price changes
  const handlePriceChange = (index: number, field: string, value: string) => {
    const updated = form.prices.map((p, i) => (i === index ? { ...p, [field]: value } : p));
    setForm({ ...form, prices: updated });
  };

  // 🖼️ Image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file)
      setForm((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
  };

  // ✏️ Edit
  const handleEdit = (service: any) => {
    setForm({
      id: service.id,
      name: service.name,
      description: service.description || "",
      prices: service.prices || [{ duration: "", price: "" }],
      image: null,
      preview: service.image || "",
      offerType: service.offer_type || "none",
      offerPercentage: service.offer_percentage?.toString() || "",
      applicableUsers: service.applicable_users || "",
    });
    setIsEditing(true);
  };

  // 💾 Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Please enter service name");
    if (form.prices.some((p) => !p.duration || !p.price))
      return alert("Please fill all duration and price fields");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("prices", JSON.stringify(form.prices));
    formData.append("offerType", form.offerType);
    formData.append("offerPercentage", form.offerPercentage);
    formData.append("applicableUsers", form.applicableUsers);
    if (form.image) formData.append("image", form.image);

    if (isEditing && form.id) await updateService(form.id, formData as any);
    else await addService(formData as any);

    setForm({
      id: null,
      name: "",
      description: "",
      prices: [{ duration: "", price: "" }],
      image: null,
      preview: "",
      offerType: "none",
      offerPercentage: "",
      applicableUsers: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-primary">Manage Services</h2>

      {/* Add / Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border p-4 rounded-lg shadow-sm bg-white dark:bg-gray-900"
      >
        <div className="flex flex-wrap gap-4">
          <Input
            placeholder="Service Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Offer Section */}
        <div className="border-t pt-4 mt-4 space-y-3">
          <h3 className="font-semibold text-gray-700">Offer Details (optional)</h3>
          <div className="flex flex-wrap gap-3">
            <select
              className="border rounded-md px-3 py-2"
              value={form.offerType}
              onChange={(e) => setForm({ ...form, offerType: e.target.value })}
            >
              <option value="none">No Offer</option>
              <option value="all_users">For All Users</option>
              <option value="specific_users">Specific Users</option>
            </select>

            {form.offerType !== "none" && (
              <Input
                placeholder="Offer % (e.g. 20)"
                type="number"
                value={form.offerPercentage}
                onChange={(e) => setForm({ ...form, offerPercentage: e.target.value })}
              />
            )}

            {form.offerType === "specific_users" && (
              <Input
                placeholder="Applicable User Emails (comma-separated)"
                value={form.applicableUsers}
                onChange={(e) => setForm({ ...form, applicableUsers: e.target.value })}
              />
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Upload Image</label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {form.preview && (
            <img
              src={form.preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md border mt-2 shadow-sm"
            />
          )}
        </div>

        {/* Price Rows */}
        <div className="space-y-2">
          {form.prices.map((p, i) => (
            <div key={i} className="flex gap-3 items-center">
              <Input
                placeholder="Duration (e.g. 30 min)"
                value={p.duration}
                onChange={(e) => handlePriceChange(i, "duration", e.target.value)}
              />
              <Input
                placeholder="Price"
                type="number"
                value={p.price}
                onChange={(e) => handlePriceChange(i, "price", e.target.value)}
              />
              {form.prices.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveRow(i)}
                >
                  ✕
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="secondary" onClick={handleAddRow}>
            + Add Duration
          </Button>
        </div>

        <Button type="submit" className="w-full">
          {isEditing ? "Update Service" : "Add Service"}
        </Button>

        {isEditing && (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              setForm({
                id: null,
                name: "",
                description: "",
                prices: [{ duration: "", price: "" }],
                image: null,
                preview: "",
                offerType: "none",
                offerPercentage: "",
                applicableUsers: "",
              });
              setIsEditing(false);
            }}
          >
            Cancel Edit
          </Button>
        )}
      </form>

      {/* Services Table */}
      <table className="min-w-full border mt-6 rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-900">
        <thead className="bg-gray-100 dark:bg-gray-800 text-left">
          <tr>
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Offer</th>
            <th className="p-2">Description</th>
            <th className="p-2">Durations</th>
            <th className="p-2">Prices</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id} className="border-t dark:border-gray-700">
              <td className="p-2">
                {s.image ? (
                  <img src={s.image} alt={s.name} className="w-16 h-16 object-cover rounded-md border" />
                ) : (
                  "-"
                )}
              </td>
              <td className="p-2 font-medium">{s.name}</td>
              <td className="p-2 text-sm">
                {s.offer_type === "none"
                  ? "-"
                  : `${s.offer_percentage}% (${s.offer_type === "all_users" ? "All" : "Specific"})`}
              </td>
              <td className="p-2">{s.description || "-"}</td>
              <td className="p-2">
                {s.options?.map((p: any, i: number) => (
                  <div key={i} className="text-sm">{p.duration}</div>
                ))}
              </td>
              <td className="p-2">
                {s.options?.map((p: any, i: number) => (
                  <div key={i} className="text-sm">{p.price}</div>
                ))}
              </td>
              <td className="p-2 text-center">
                <div className="flex gap-2 justify-center items-center">

                <Button variant="outline" size="sm" onClick={() => handleEdit(s)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => deleteService(s.id!)}>
                  Delete
                </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
