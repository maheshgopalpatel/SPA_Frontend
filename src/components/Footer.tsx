// import {
//   MapPin,
//   Phone,
//   Mail,
//   Facebook,
//   Instagram,
//   Youtube,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import logo from "../../public/logo.png";

// const Footer = () => {
//   const quickLinks = [
//     { name: "Home", href: "#home" },
//     { name: "Services", href: "#services" },
//     { name: "Gallery", href: "#gallery" },
//     { name: "Reviews", href: "#reviews" },
//     { name: "Contact", href: "#contact" },
//   ];

//   const services = [
//     "Thai Massage",
//     "Sublime Swedish Therapy",
//     "Hot Stone Therapy",
//     "Abhyanga Therapy",
//     "Wellness Retreat Therapy",
//     "Balinese Therapy",
//     "Sleep Therapy",
//     "Healing Potli Therapy",
//     "Head Massage",
//   ];

//   const socialLinks = [
//     { icon: Facebook, href: "#", name: "Facebook" },
//     { icon: Instagram, href: "https://www.instagram.com/a_b_s_p_a?igsh=MTNhdmRuZW45czFkaA==", name: "Instagram" },
//     { icon: Youtube, href: "https://youtube.com/@abspaunisexsaloon?si=wiE9t7TywnLPBdoN", name: "YouTube" },
//   ];

//   const scrollToSection = (href: string) => {
//     const element = document.querySelector(href);
//     if (element) element.scrollIntoView({ behavior: "smooth" });
//   };

//   return (

//       <footer className="bg-gradient-to-br from-primary-dark to-spa-sage-dark text-primary-foreground dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 dark:text-white">

//       <div className="container mx-auto px-4 py-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div className="animate-fade-in">
//             <div className="flex items-center justify-center md:justify-start mb-4">
//               <div className="flex items-center justify-center h-32 w-32">
//                 {logo ? (
//                   <img src={logo} alt="logo" className="object-contain" />
//                 ) : (
//                   <span className="text-white font-bold text-lg">AB</span>
//                 )}
//               </div>
//             </div>

//             <p className="text-white/90 mb-6 leading-relaxed">
//               Experience the perfect blend of relaxation and rejuvenation at our premium spa and unisex salon. Professional treatments for everyone.
//             </p>

//             {/* Contact Info */}
//             <div className="space-y-3">
//               <div className="flex items-center gap-3">
//                 <MapPin className="w-6 h-6 text-yellow-300" />
//                 <span className="text-sm text-white/90">
//                   Maa Laxmi Complex 1st Floor Kathal More Argora Road Near by Padosan Restaurant Ranchi(JH) PIN 834005
//                 </span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Phone className="w-4 h-4 text-yellow-300" />
//                 <span className="text-sm text-white/90">+91 62077 42437</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Mail className="w-4 h-4 text-yellow-300" />
//                 <span className="text-sm text-white/90">info@abspaunisexsaloon.com</span>
//               </div>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
//             <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
//             <ul className="space-y-3">
//               {quickLinks.map((link) => (
//                 <li key={link.name}>
//                   <button
//                     onClick={() => scrollToSection(link.href)}
//                     className="text-white/90 hover:text-yellow-300 transition-colors duration-300 text-sm"
//                   >
//                     {link.name}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Services */}
//           <div
//             onClick={() => scrollToSection('#services')}
//             className="animate-fade-in cursor-pointer"
//             style={{ animationDelay: "0.2s" }}
//           >
//             <h4 className="text-lg font-semibold mb-6">Our Services</h4>
//             <ul className="space-y-3">
//               {services.map((service) => (
//                 <li key={service}>
//                   <span className="text-white/90 text-sm">{service}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Business Hours & Social */}
//           <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
//             <h4 className="text-lg font-semibold mb-6">Business Hours</h4>
//             <div className="space-y-3 mb-8">
//               <div className="flex justify-between">
//                 <span className="text-sm text-white/90">Monday - Sunday</span>
//                 <span className="text-sm text-white/90">9 AM - 10 PM</span>
//               </div>
//             </div>

//             {/* Social Links */}
//             <div>
//               <h5 className="font-semibold mb-4">Follow Us</h5>
//               <div className="flex gap-3">
//                 {socialLinks.map((social) => {
//                   const Icon = social.icon;
//                   let colorClass = "";
//                   switch (social.name) {
//                     case "Facebook":
//                       colorClass = "text-blue-600";
//                       break;
//                     case "Instagram":
//                       colorClass = "text-pink-500";
//                       break;
//                     case "YouTube":
//                       colorClass = "text-red-600";
//                       break;
//                     default:
//                       colorClass = "text-white";
//                   }
//                   return (
//                     <a
//                       key={social.name}
//                       href={social.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
//                       aria-label={social.name}
//                     >
//                       <Icon className={`w-4 h-4 ${colorClass}`} />
//                     </a>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="border-t border-white/20 mt-8 pt-8 text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
//           <p className="text-white/80 text-sm">
//             © 2025 AB Spa and Unisex Salon. All rights reserved. |
//             <span className="hover:text-yellow-300 transition-colors cursor-pointer"> Privacy Policy</span> |
//             <span className="hover:text-yellow-300 transition-colors cursor-pointer"> Terms of Service</span>
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// import { Mail, MapPin, Phone,Facebook,Instagram, Youtube} from "lucide-react";
// // import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <footer className="bg-gradient-to-b from-[#1a2238] to-[#121826] text-gray-300 pt-12 pb-6">
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-10 text-sm">

//         {/* --- Column 1: Logo & About --- */}
//         <div>
//           <div className="flex items-center mb-4">
//             <img
//               src="/logo.png"
//               alt="AB Spa Logo"
//               className="w-16 h-16 rounded-full border-2 border-yellow-400"
//             />
//             <h3 className="ml-3 text-xl font-bold text-yellow-400">AB SPA & Unisex Salon</h3>
//           </div>
//           <p className="text-gray-400 leading-relaxed">
//             Experience the perfect blend of relaxation and rejuvenation at our premium spa and
//             unisex salon. Professional treatments for everyone.
//           </p>
//         </div>

//         {/* --- Column 2: Contact Info --- */}
//         <div>
//           <h3 className="text-lg font-semibold text-yellow-400 mb-3">Contact Us</h3>
//           <ul className="space-y-2 text-gray-400">
//             <li className="flex items-start">
//               <MapPin className="w-4 h-4 mt-1 mr-2 text-yellow-400" />
//               Maa Laxmi Complex, 1st Floor, Kathal More Argora Road, near Padosan Restaurant, Ranchi (JH) - 834005
//             </li>
//             <li className="flex items-center">
//               <Phone className="w-4 h-4 mr-2 text-yellow-400" /> +91 62077 42437
//             </li>
//             <li className="flex items-center">
//               <Mail className="w-4 h-4 mr-2 text-yellow-400" /> info@abspaunisexsaloon.com
//             </li>
//           </ul>
//         </div>

//         {/* --- Column 3: Quick Links --- */}
//         <div>
//           <h3 className="text-lg font-semibold text-yellow-400 mb-3">Quick Links</h3>
//           <ul className="space-y-2">
//             <li><a href="#home" className="hover:text-yellow-400">Home</a></li>
//             <li><a href="#services" className="hover:text-yellow-400">Services</a></li>
//             <li><a href="#gallery" className="hover:text-yellow-400">Gallery</a></li>
//             <li><a href="#reviews" className="hover:text-yellow-400">Reviews</a></li>
//             <li><a href="#contact" className="hover:text-yellow-400">Contact</a></li>
//           </ul>
//         </div>

//         {/* --- Column 4: Our Services --- */}
//         <div>
//           <h3 className="text-lg font-semibold text-yellow-400 mb-3">Our Services</h3>
//           <ul className="grid grid-cols-2 gap-x-4 text-gray-400">
//             <li>Thai Massage</li>
//             <li>Sublime Swedish Therapy</li>
//             <li>Hot Stone Therapy</li>
//             <li>Abhyanga Therapy</li>
//             <li>Wellness Retreat Therapy</li>
//             <li>Balinese Therapy</li>
//             <li>Sleep Therapy</li>
//             <li>Healing Potli Therapy</li>
//             <li>Head Massage</li>
//           </ul>
//         </div>

//         {/* --- Column 5: Business Hours + Social Icons --- */}
//         <div>
//           <h3 className="text-lg font-semibold text-yellow-400 mb-3">Business Hours</h3>
//           <p className="text-gray-400 mb-5">
//             Monday - Sunday:<br />9:00 AM – 10:00 PM
//           </p>

//           {/* Social Icons */}
//           <div className="flex items-center gap-4 mt-2">
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="p-2 bg-gray-700 hover:bg-yellow-400 rounded-full text-gray-300 hover:text-black transition-all duration-300"
//             >
//               <Facebook className="w-4 h-4" />
//             </a>
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="p-2 bg-gray-700 hover:bg-yellow-400 rounded-full text-gray-300 hover:text-black transition-all duration-300"
//             >
//               <Instagram className="w-4 h-4" />
//             </a>
//             <a
//               href="https://youtube.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="p-2 bg-gray-700 hover:bg-yellow-400 rounded-full text-gray-300 hover:text-black transition-all duration-300"
//             >
//               <Youtube className="w-4 h-4" />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* --- Divider --- */}
//       <div className="border-t border-gray-700 mt-10 mb-4"></div>

//       {/* --- Bottom Bar --- */}
//       <div className="text-center text-gray-400 text-sm">
//         © 2025 AB Spa and Unisex Salon. All rights reserved.{" "}
//         <a href="/privacy" className="hover:text-yellow-400">Privacy Policy</a> |{" "}
//         <a href="/terms" className="hover:text-yellow-400">Terms of Service</a>
//       </div>
//     </footer>
//   );
// }

// import { Mail, MapPin, Phone,Facebook,Instagram, Youtube} from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="bg-gradient-to-b from-[#1a2238] to-[#121826] text-gray-300 pt-12 pb-6">
//       {/* <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8 text-sm"> */}
//         <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-x-4 gap-y-8 text-sm">

//         {/* --- Column 1: Logo & About --- */}
//         <div className="pr-6">
//           <div className="flex items-center mb-4">
//             <img
//               src="/logo.png"
//               alt="AB Spa Logo"
//               className="w-16 h-16 rounded-full border-2 border-yellow-400"
//             />
//             <h3 className="ml-3 text-xl font-bold text-yellow-400 leading-tight">
//               AB SPA & Unisex Salon
//             </h3>
//           </div>
//           <p className="text-gray-400 leading-relaxed">
//             Experience the perfect blend of relaxation and rejuvenation at our premium spa and unisex salon.
//             Professional treatments for everyone.
//           </p>
//         </div>

//         {/* --- Column 2: Contact Info --- */}
//         <div>
//           <h3 className="text-lg font-semibold text-yellow-400 mb-3">Contact Us</h3>
//           <ul className="space-y-2 text-gray-400">
//             <li className="flex items-start">
//               <MapPin className="w-14 h-14 mt-1 mr-2 text-yellow-400" />
//               Maa Laxmi Complex, 1st Floor, Kathal More Argora Road, near Padosan Restaurant, Ranchi (JH) - 834005
//             </li>
//             <li className="flex items-center">
//               <Phone className="w-4 h-4 mr-2 text-yellow-400" /> +91 62077 42437
//             </li>
//             <li className="flex items-center">
//               <Mail className="w-4 h-4 mr-2 text-yellow-400" /> info@abspaunisexsaloon.com
//             </li>
//           </ul>
//         </div>

//         {/* --- Column 4: Our Services (two-column layout, no wrapping issue) --- */}
//         <div className="col-span-1 pl-10">
//           <h3 className="text-lg font-semibold text-yellow-400 mb-3">Our Services</h3>
//           <div className="grid grid-cols-2 gap-x-6 gap-y-2 whitespace-nowrap text-gray-400">
//             <span>Thai Massage</span>
//             <span>Sublime Swedish </span>
//             <span>Hot Stone Therapy</span>
//             <span>Abhyanga Therapy</span>
//             <span>Wellness Retreat </span>
//             <span>Balinese Therapy</span>
//             <span>Sleep Therapy</span>
//             <span>Healing Potli Therapy</span>
//             <span>Head Massage</span>
//           </div>
//         </div>

//           {/* --- Column 3: Quick Links --- */}
//         <div className="pl-28">
//           <h3 className="text-lg font-semibold text-yellow-400 mb-3">Quick Links</h3>
//           <ul className="space-y-2">
//             <li><a href="#home" className="hover:text-yellow-400">Home</a></li>
//             <li><a href="#services" className="hover:text-yellow-400">Services</a></li>
//             <li><a href="#gallery" className="hover:text-yellow-400">Gallery</a></li>
//             <li><a href="#reviews" className="hover:text-yellow-400">Reviews</a></li>
//             <li><a href="#contact" className="hover:text-yellow-400">Contact</a></li>
//           </ul>
//         </div>

//         {/* --- Column 5: Business Hours + Social Icons --- */}
//         <div className="pl-12">
//           <h3 className="text-lg font-semibold text-yellow-400 mb-3">Business Hours</h3>
//           <p className="text-gray-400 mb-5 leading-relaxed">
//             Monday - Sunday:<br />9:00 AM – 10:00 PM
//           </p>

//           {/* Social Icons */}
//           <div className="flex items-center gap-4">
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="p-2 bg-gray-700 hover:bg-yellow-400 rounded-full text-gray-300 hover:text-black transition-all duration-300"
//             >
//               <Facebook className="w-4 h-4" />
//             </a>
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="p-2 bg-gray-700 hover:bg-yellow-400 rounded-full text-gray-300 hover:text-black transition-all duration-300"
//             >
//               <Instagram className="w-4 h-4" />
//             </a>
//             <a
//               href="https://youtube.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="p-2 bg-gray-700 hover:bg-yellow-400 rounded-full text-gray-300 hover:text-black transition-all duration-300"
//             >
//               <Youtube className="w-4 h-4" />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* --- Divider --- */}
//       <div className="border-t border-gray-700 mt-10 mb-4"></div>

//       {/* --- Bottom Bar --- */}
//       <div className="text-center text-gray-400 text-sm px-4">
//         © 2025 AB Spa and Unisex Salon. All rights reserved.{" "}
//         <a href="/privacy" className="hover:text-yellow-400">Privacy Policy</a> |{" "}
//         <a href="/terms" className="hover:text-yellow-400">Terms of Service</a>
//       </div>
//     </footer>
//   );
// }

import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

const currentYear = new Date().getFullYear();
export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#1a2238] to-[#121826] text-gray-300 pt-12 pb-6">
      <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* --- Column 1: Logo & About --- */}
        <div className="sm:col-span-2 md:col-span-1">
          <div className="flex items-center mb-4">
            <img
              src="/logo.png"
              alt="AB Spa Logo"
              className="w-16 h-16 rounded-full border-2 border-yellow-400"
            />
            <h3 className="ml-3 text-xl font-bold text-yellow-400 leading-tight">
              AB SPA & Unisex Salon
            </h3>
          </div>
          <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
            Experience the perfect blend of relaxation and rejuvenation at our
            premium spa and unisex salon. Professional treatments for everyone.
          </p>
        </div>

        {/* --- Column 2: Contact Info --- */}
        <div className="sm:col-span-2 md:col-span-1">
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">
            Contact Us
          </h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-start">
              <MapPin className="w-5 h-5 mt-1 mr-2 text-yellow-400 flex-shrink-0" />
              Maa Laxmi Complex, 1st Floor, Kathal More Argora Road, near
              Padosan Restaurant, Ranchi (JH) - 834005
            </li>
            <li className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-yellow-400 flex-shrink-0" />{" "}
              +91 62077 42437
            </li>
            <li className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-yellow-400 flex-shrink-0" />{" "}
              info@abspaunisexsaloon.com
            </li>
          </ul>
        </div>

        {/* --- Column 3: Our Services --- */}
        <div className="sm:col-span-1 md:col-span-1">
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">
            Our Services
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-400 text-sm">
            <span>Thai Massage</span>
            <span>Sublime Swedish</span>
            <span>Hot Stone Therapy</span>
            <span>Abhyanga Therapy</span>
            <span>Wellness Retreat</span>
            <span>Balinese Therapy</span>
            <span>Sleep Therapy</span>
            <span>Healing Potli </span>
            <span>Head Massage</span>
          </div>
        </div>

        {/* --- Column 4 & 5 combined for mobile --- */}
        <div className="sm:col-span-2 md:col-span-2 grid grid-cols-2 gap-6 mt-6 md:mt-0">
          {/* --- Quick Links --- */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#home"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Reviews
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* --- Business Hours --- */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">
              Business Hours
            </h3>
            <p className="text-gray-400 mb-5 leading-relaxed text-sm">
              Monday - Sunday:
              <br />
              9:00 AM – 10:00 PM
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 hover:bg-yellow-400 rounded-full text-gray-300 hover:text-black transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 hover:bg-yellow-400 rounded-full text-gray-300 hover:text-black transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 hover:bg-yellow-400 rounded-full text-gray-300 hover:text-black transition-all duration-300"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- Divider --- */}
      <div className="border-t border-gray-700 mt-10 mb-4"></div>

      {/* --- Bottom Bar --- */}
      <div className="text-center text-gray-400 text-sm px-4">
        © {currentYear} AB Spa and Unisex Salon. All rights reserved.{" "}
        <a href="/privacy" className="hover:text-yellow-400 transition-colors">
          Privacy Policy
        </a>{" "}
        |{" "}
        <a href="/privacy" className="hover:text-yellow-400 transition-colors">
          Terms of Service
        </a>
        <p className="text-center text-sm text-muted-foreground">
          Designed & Developed by{" "}
          <span className="text-yellow-400 font-semibold">Krinexiya</span>
        </p>
      </div>
    </footer>
  );
}
