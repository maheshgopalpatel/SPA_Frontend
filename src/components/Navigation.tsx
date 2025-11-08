// import { useState } from "react";
// import { Menu, X, Calendar, Phone, MapPin } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import ThemeToggle from "@/components/ThemeToggle";
// import logo from "../../public/logo.png";
// interface NavigationProps {
//   onLoginClick: () => void;
// }

// const Navigation = ({ onLoginClick }: NavigationProps) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const navItems = [
//     { name: "Home", href: "#home" },
//     { name: "Services", href: "#services" },
//     { name: "Gallery", href: "#gallery" },
//     { name: "Reviews", href: "#reviews" },
//     { name: "Contact", href: "#contact" },
//   ];

//   const scrollToSection = (href: string) => {
//     const element = document.querySelector(href);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//     setIsMenuOpen(false);
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between  h-16 md:h-24">
//           {/* Logo */}
//           <div className="flex items-center">
//             <div className="flex items-center justify-center h-14 w-14 md:h-20 md:w-20">
//               {logo ? (
//                 <img src={logo} alt="logo" />
//               ) : (
//                 <span className="text-primary-foreground font-bold text-lg">
//                   AB
//                 </span>
//               )}
//             </div>
//             <div className="pl-3">
//               <p className="text-lg md:text-xl text-ellipsis wave-text font-bold">
//                 AB SPA & UNISEX SALON
//               </p>

//               {/* <p className="text-xs -mt-1 pl-[0.5px] text-justify w-full text-violet-700">Unisex Salon</p> */}
//              </div> 
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <button
//                 key={item.name}
//                 onClick={() => scrollToSection(item.href)}
//                 className="text-foreground hover:text-primary transition-colors duration-300 relative group"
//               >
//                 {item.name}
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
//               </button>
//             ))}
//           </div>

//           {/* Contact Info & Login (Desktop)
//           <div className="hidden lg:flex items-center space-x-4">
//             <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//               <Phone className="w-4 h-4" />
//               <span>+91 62077 42437</span>
//             </div>
//             <ThemeToggle />
//             <Button
//               onClick={onLoginClick}
//               variant="default"
//               size="sm"
//               className="hidden md:inline-flex bg-amber-600 hover:opacity-90 transition-opacity"
//             >
//               Login
//             </Button>
//           </div> */}

//           {/* Contact Info & Login (Visible on all devices) */}
// <div className="flex items-center space-x-4">
//   <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
//     <Phone className="w-4 h-4" />
//     <span>+91 62077 42437</span>
//   </div>
//   <ThemeToggle />
//   <Button
//     onClick={onLoginClick}
//     variant="default"
//     size="sm"
//     className="bg-amber-600 hover:opacity-90 transition-opacity"
//   >
//     Login
//   </Button>
// </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
//           >
//             {isMenuOpen ? (
//               <X className="w-6 md:w-9 h-6 md:h-9" />
//             ) : (
//               <Menu className="w-6 md:w-9 h-6 md:h-9 " />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="lg:hidden bg-card border-t border-border">
//             <div className="px-4 py-6 space-y-4">
//               {navItems.map((item) => (
//                 <button
//                   key={item.name}
//                   onClick={() => scrollToSection(item.href)}
//                   className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
//                 >
//                   {item.name}
//                 </button>
//               ))}

//               <div className="pt-4 border-t border-border space-y-3">
//                 <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                   <Phone className="w-4 h-4" />
//                   <span>+91 62077 42437</span>
//                 </div>
//                 {/* <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                   <MapPin className="w-4 h-4" />
//                   <span>123 Spa Street, Wellness City</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <ThemeToggle />
//                   <Button
//                     onClick={() => scrollToSection("#services")}
//                     variant="outline"
//                     size="sm"
//                     className="flex-1 ml-4"
//                   >
//                     <Calendar className="w-4 h-4 mr-2" />
//                     Book Appointment
//                   </Button>
//                 </div> */}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navigation;


import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "../../public/logo.png";

interface NavigationProps {
  onLoginClick: () => void;
}

const Navigation = ({ onLoginClick }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-24">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center justify-center h-14 w-14 md:h-20 md:w-20">
              {logo ? (
                <img src={logo} alt="logo" />
              ) : (
                <span className="text-primary-foreground font-bold text-lg">
                  AB
                </span>
              )}
            </div>
            <div className="pl-3">
              <p className="text-lg md:text-xl wave-text font-bold">
                AB SPA & UNISEX SALON
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground hover:text-primary transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Contact Info & Login (Desktop only) */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>+91 62077 42437</span>
            </div>
            <ThemeToggle />
            <Button
              onClick={onLoginClick}
              variant="default"
              size="sm"
              className="bg-amber-600 hover:opacity-90 transition-opacity"
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 md:w-9 h-6 md:h-9" />
            ) : (
              <Menu className="w-6 md:w-9 h-6 md:h-9" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </button>
              ))}

              {/* 👇 Simple Login Link with Blue Hover */}
              <button
                onClick={onLoginClick}
                className="block w-full text-left py-2 text-foreground hover:text-blue-500 font-semibold transition-colors duration-300"
              >
                Login
              </button>

              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>+91 62077 42437</span>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
