import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";
import { useContact } from "@/contexts/ContactContext";

export default function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const { sendMessage } = useContact(); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
setIsSubmitting(true);
    // Call context function
    await sendMessage(formData);
setIsSubmitting(false);
    // Reset form and close popup
    setFormData({ name: "", phone: "", email: "", message: "" });
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        className="bg-amber-600 text-white px-6 py-3 hover:opacity-90 transition"
        onClick={() => setIsOpen(true)}
      >
        Get In Touch
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            <Card className="bg-gradient-card border-0 shadow-none">
              <CardContent className="p-4 border-0 shadow-none">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                  Send Us a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex self-start">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex self-start">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex self-start">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="flex self-start">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your requirements or questions..."
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-600 hover:opacity-90 transition-all duration-300 hover:scale-105"
                    size="lg"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
