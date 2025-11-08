// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

// const ContactSection = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission here
//     alert("Thank you for your message! We will get back to you soon.");
//     setFormData({ name: "", email: "", phone: "", message: "" });
//   };

//   const contactInfo = [
//     {
//       icon: MapPin,
//       title: "Visit Us",
//       details: [
//         "Maa Laxmi Complex 1st Floor Kathal More Argora Road Near by Padosan Restaurant",
//         "Ranchi(JH) PIN 834005",
//       ],
//       action: "Get Directions",
//       link:"https://maps.app.goo.gl/fJXiaX6CRjR4qYxV8"
//     },
//     {
//       icon: Phone,
//       title: "Call Us",
//       details: ["+91 62077 42437"],
//       action: "Call Now",
//       link:"tel:+916207742437"
//     },
//     {
//       icon: Mail,
//       title: "Email Us",
//       details: ["info@abspaunisexsaloon.com"],
//       action: "Send Email",
//       link:"mailto:info@abspaunisexsaloon.com"
//     },
//     {
//       icon: Clock,
//       title: "Working Hours",
//       details: ["Mon - Sat: 9:00 AM - 10:00 PM"],
     
//     },
//   ];

//   return (
//     <section
//       id="contact"
//       className="py-20 bg-gradient-to-br from-spa-cream to-background"
//     >
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-16 animate-fade-in">
//           <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
//             Get In Touch
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Ready to book your appointment or have questions? We're here to help
//             you relax and rejuvenate.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12">
//           {/* Contact Form */}
//           <Card className="bg-gradient-card border-0 shadow-strong animate-slide-up">
//             <CardContent className="p-8">
//               <h3 className="text-2xl font-bold text-foreground mb-6">
//                 Send Us a Message
//               </h3>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Full Name</Label>
//                     <Input
//                       id="name"
//                       name="name"
//                       placeholder="Enter your name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="phone">Phone Number</Label>
//                     <Input
//                       id="phone"
//                       name="phone"
//                       type="tel"
//                       placeholder="Enter your phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email Address</Label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="message">Message</Label>
//                   <Textarea
//                     id="message"
//                     name="message"
//                     placeholder="Tell us about your requirements or questions..."
//                     rows={5}
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full bg-amber-600 hover:opacity-90 transition-all duration-300 hover:scale-105"
//                   size="lg"
//                 >
//                   <Send className="w-4 h-4 mr-2" />
//                   Send Message
//                 </Button>
//               </form>
//               <Card className="bg-gradient-card border-0 shadow-strong overflow-hidden animate-scale-in mt-10">
//                 <div className="relative">
//                   {/* Map Container */}
//                   <div className="w-full">
//                     <div className="relative w-full pb-[56.25%] overflow-hidden rounded-xl">
//                       <iframe
//                         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.722191793949!2d85.2534000751026!3d23.362077278937353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4df00730e78c5%3A0x244e8433109d3d4c!2sAB%20Spa%20%26%20Unisex%20Saloon!5e0!3m2!1sen!2sin!4v1760028710570!5m2!1sen!2sin"
//                         className="absolute top-0 left-0 w-full h-full border-0"
//                         allowFullScreen
//                         loading="lazy"
//                         referrerPolicy="no-referrer-when-downgrade"
//                       ></iframe>
//                     </div>
//                   </div>

//                   {/* Optional Gradient Overlay */}
//                   <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 to-transparent"></div>
//                 </div>
//               </Card>
//             </CardContent>
//           </Card>

//           {/* Contact Information & Map */}
//           <div className="space-y-8">
//             {/* Contact Info Grid */}
//             <div className="grid gap-6">
//               {contactInfo.map((info, index) => {
//                 const Icon = info.icon;
//                 return (
//                   <Card
//                     key={index}
//                     className="bg-gradient-card border-0 min-h-[200px] shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-up"
//                     style={{ animationDelay: `${index * 0.1}s` }}
//                   >
//                     <CardContent className="p-6">
//                       <div className="flex items-start gap-4">
//                         <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
//                           <Icon className="w-6 h-6 text-primary-foreground" />
//                         </div>

//                         <div className="flex-1">
//                           <h4 className="font-semibold text-foreground mb-2">
//                             {info.title}
//                           </h4>
//                           {info.details.map((detail, idx) => (
//                             <p
//                               key={idx}
//                               className="text-muted-foreground text-sm mb-1"
//                             >
//                               {detail}
//                             </p>
//                           ))}
//                           <Button
//                             variant="link"
//                             className="text-primary p-0 h-auto mt-2 hover:underline"
//                           >
//                             <a
//                               href={info.link}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                             >
//                               {info.action}
//                             </a>
//                           </Button>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//             </div>

//             {/* Google Map Placeholder */}
//           </div>
//         </div>

//         {/* Emergency Contact */}
//         <div className="mt-16 text-center animate-fade-in">
//           <div className="bg-amber-600 p-6 rounded-2xl shadow-strong max-w-lg mx-auto">
//             <h3 className="text-xl font-bold text-primary-foreground mb-3">
//               Need Immediate Assistance?
//             </h3>
//             <p className="text-primary-foreground/90 mb-4 text-sm">
//               For urgent bookings or inquiries, call us directly
//             </p>
//             <a
//               href="tel:+919876543210"
//               className="inline-flex items-center justify-center px-6 py-3 bg-white/20 border border-white/30 text-white hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all duration-300 hover:scale-105"
//             >
//               <Phone className="w-4 h-4 mr-2" />
//               +91 62077 42437
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;


import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useContact } from "@/contexts/ContactContext";
  const CONTACT_SHEET_URL = import.meta.env.VITE_MESSAGE_URL

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
   const { sendMessage } = useContact();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ref to the hidden form
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await sendMessage(formData);

    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: [
        "Maa Laxmi Complex 1st Floor Kathal More Argora Road Near Padosan Restaurant",
        "Ranchi (JH) PIN 834005",
      ],
      action: "Get Directions",
      link: "https://maps.app.goo.gl/fJXiaX6CRjR4qYxV8",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 62077 42437"],
      action: "Call Now",
      link: "tel:+916207742437",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@abspaunisexsaloon.com"],
      action: "Send Email",
      link: "mailto:info@abspaunisexsaloon.com",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sat: 9:00 AM - 10:00 PM"],
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-spa-cream to-background"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to book your appointment or have questions? We’re here to help
            you relax and rejuvenate.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-gradient-card border-0 shadow-strong animate-slide-up">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4 ">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
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
                    <Label htmlFor="phone">Phone Number</Label>
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
                  <Label htmlFor="email">Email Address</Label>
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
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your requirements or questions..."
                    rows={10}
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

              {/* Hidden Google Form
              <form
                ref={formRef}
                action={CONTACT_SHEET_URL}
                method="POST"
                target="hidden_iframe"
                className="hidden"
              >
                <input type="text" name="entry.770205686" value={formData.name} readOnly />
                <input type="tel" name="entry.729659402" value={formData.phone} readOnly />
                <input type="email" name="entry.1812675438" value={formData.email} readOnly />
                <textarea name="entry.2144968633" value={formData.message} readOnly />
                <iframe name="hidden_iframe" style={{ display: "none" }}></iframe>
              </form> */}

            </CardContent>
          </Card>

          {/* Contact Info Cards */}
          <div className="space-y-8">
            <div className="grid gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card
                    key={index}
                    className="bg-gradient-card border-0 min-h-[150px] shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>

                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-2">
                            {info.title}
                          </h4>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-muted-foreground text-sm mb-1">
                              {detail}
                            </p>
                          ))}
                          {info.link && (
                            <Button
                              variant="link"
                              className="text-primary p-0 h-auto mt-2 hover:underline"
                            >
                              <a href={info.link} target="_blank" rel="noopener noreferrer">
                                {info.action}
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;