import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Maximize2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

interface GalleryItem {
  id: number;
  caption: string;
  media_type: "image" | "video";
  media_url: string;
  created_at: string;
}

const GallerySection: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Fetch data from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/gallery")
      .then((res) => setGalleryItems(res.data))
      .catch((err) => console.error("Error fetching gallery:", err));
  }, []);
console.log(galleryItems);

  return (
    <section id="gallery" className="py-8 sm:py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-3">
            Our Gallery
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our latest images and videos captured at the spa.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {galleryItems.length > 0 ? (
            galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={scaleUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <Card
                  className="group overflow-hidden bg-gradient-card border-0 shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                  onClick={() =>
                    setSelectedItem(
                      item.media_url.startsWith("http")
                        ? item.media_url
                        : `http://localhost:5000${item.media_url}`
                    )
                  }
                >
                  <div className="relative overflow-hidden">
                    {item.media_type === "video" ? (
                      <video
                        src={
                          `${item.media_url}`
                        }
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-40 sm:h-48 md:h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <img
                        src={
                          `${item.media_url}`
                        }
                        alt={item.caption}
                        className="w-full h-40 sm:h-48 md:h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                      >
                        <Maximize2 className="w-4 h-4 mr-1 sm:mr-2" />
                        View
                      </Button>
                    </div>

                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-semibold text-sm sm:text-base">
                        {item.caption || "Gallery Item"}
                      </h3>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-muted-foreground">
              No gallery items found.
            </p>
          )}
        </div>

        {/* Modal */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-4xl bg-transparent border-0 p-0">
            {selectedItem && (
              <div className="relative">
                {selectedItem.endsWith(".mp4") ? (
                  <video
                    src={selectedItem}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                ) : (
                  <img
                    src={selectedItem}
                    alt="Gallery Item"
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                )}

                {/* <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-white hover:bg-white/20"
                  onClick={() => setSelectedItem(null)}
                >
                  ×
                </Button> */}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default GallerySection;
