import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface GalleryItem {
  id: number;
  service_id: number;
  service_name?: string;
  media_url: string;
  media_type: "image" | "video";
  caption: string;
}

interface Service {
  id: number;
  name: string;
}

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const GalleryManager: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchGallery();
    fetchServices();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${API_BASE}/gallery`);
      setGallery(res.data);
      //   console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleServiceChange = (e) => {
    const selectedId = Number(e.target.value);
    setSelectedService(selectedId);

    const selectedServiceObject = services.find((s) => s.id === selectedId);

    if (selectedServiceObject) {
      setCaption(selectedServiceObject.name);
    } else {
      setCaption("");
    }
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API_BASE}/services`);
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    const maxSize = f.type.startsWith("image")
      ? 2 * 1024 * 1024
      : 20 * 1024 * 1024;
    if (f.size > maxSize) {
      alert(`Max file size is ${f.type.startsWith("image") ? "2MB" : "20MB"}`);
      return;
    }

    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !selectedService) return alert("Service and file required");

    const formData = new FormData();
    formData.append("service_id", selectedService.toString());
    formData.append("caption", caption);
    formData.append("media", file);

    try {
      await axios.post(`${API_BASE}/gallery`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setFile(null);
      setPreview(null);
      setCaption("");
      setSelectedService(null);
      fetchGallery();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE}/gallery/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      fetchGallery();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <select
          className="border px-2 py-1 rounded mb-6"
          value={selectedService ?? ""}
          onChange={handleServiceChange} 
          required
        >
          <option value="">Select Service</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border px-2 py-1 rounded hidden"

        />
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
        />

        {preview &&
          (file?.type.startsWith("image") ? (
            <img src={preview} className="w-40 h-40 object-cover border mt-2" />
          ) : (
            <video src={preview} controls className="w-40 h-40 border mt-2" />
          ))}

        <Button type="submit">Upload</Button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {gallery.map((item) => (
          <Card
            key={item.id}
            className="relative group overflow-hidden border border-border"
          >
            {item.media_type === "image" ? (
              <img
                src={`${item.media_url}`}
                className="w-full h-40 object-cover"
              />
            ) : (
              <video
                src={`${API_BASE}${item.media_url}`}
                controls
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-2 text-sm">
              <p className="font-semibold">{item.caption || "No caption"}</p>
              <p className="text-xs text-gray-500">{item.service_name}</p>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(item.id)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GalleryManager;
