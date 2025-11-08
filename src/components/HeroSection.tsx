// import { Calendar, Star, Sparkles } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import heroImage from '@/assets/spa-hero.jpg';

// const HeroSection = () => {
//   const scrollToBooking = () => {
//     const element = document.querySelector('#services');
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0">
//         <img 
//           src={heroImage} 
//           alt="AB Spa and Unisex Salon" 
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/40"></div>
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-spa-sage-dark/30"></div>
//       </div>

//       {/* Floating Elements */}
//       <div className="absolute top-20 left-10 animate-float">
//         <div className="w-3 h-3 bg-spa-rose-gold rounded-full opacity-60"></div>
//       </div>
//       <div className="absolute top-32 right-20 animate-float" style={{ animationDelay: '1s' }}>
//         <Sparkles className="w-6 h-6 text-accent-gold opacity-70" />
//       </div>
//       <div className="absolute bottom-32 left-16 animate-float" style={{ animationDelay: '2s' }}>
//         <div className="w-2 h-2 bg-amber-600-light rounded-full opacity-50"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 text-center max-w-4xl mx-auto px-4 animate-fade-in">
//         <div className="mb-6">
//           <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm mt-20 md:mt-4">
//             <Star className="w-4 h-4 fill-accent-gold text-accent-gold" />
//             <span>Rated #1 Spa in the City</span>
//           </div>
//         </div>

//         <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
//           AB SPA 
//           {/* <span className="block bg-gradient-to-r from-spa-rose-gold to-accent-gold bg-clip-text text-transparent">
//             Unisex Salon
//           </span> */}
//         </h1>

//         <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
//           Experience the perfect blend of relaxation and rejuvenation. 
//           Professional treatments for everyone in a serene, welcoming environment.
//         </p>

//         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//           <Button 
//             onClick={scrollToBooking}
//             size="lg" 
//             className="bg-amber-600 hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-strong text-lg px-8 py-6"
//           >
//             <Calendar className="w-5 h-5 mr-2" />
//             Book Your Session
//           </Button>
          
//           <Button 
//             variant="outline" 
//             size="lg"
//             className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm text-lg px-8 py-6"
//             onClick={() => {
//               const element = document.querySelector('#gallery');
//               if (element) element.scrollIntoView({ behavior: 'smooth' });
//             }}
//           >
//             View Gallery
//           </Button>
//         </div>

//         {/* Stats */}
//         <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
//           <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
//             <div className="text-3xl font-bold text-white mb-2">500+</div>
//             <div className="text-white/80">Happy Clients</div>
//           </div>
//           <div className="text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
//             <div className="text-3xl font-bold text-white mb-2">50+</div>
//             <div className="text-white/80">Premium Services</div>
//           </div>
//           <div className="text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
//             <div className="text-3xl font-bold text-white mb-2">5+</div>
//             <div className="text-white/80">Years Experience</div>
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//         <div className="w-1 h-8 bg-white/50 rounded-full"></div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;











// import { useState, useEffect } from 'react';
// import { Calendar, Star, Sparkles } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import heroImage from '@/assets/ab.mp4';
// import { useInView } from 'react-intersection-observer';

// // Stat component
// const Stat = ({ end, suffix = '', title, delay = '0s' }: { end: number; suffix?: string; title: string; delay?: string }) => {
//   const [count, setCount] = useState(0);
//   const { ref, inView } = useInView(); 

//   useEffect(() => {
//     let timer: NodeJS.Timer;

//     if (inView) {
//       let start = 0;
//       const duration = 1500; // total animation duration in ms
//       const increment = end / (duration / 30); // update every 30ms

//       timer = setInterval(() => {
//         start += increment;
//         if (start >= end) {
//           start = end;
//           clearInterval(timer);
//         }
//         setCount(Math.ceil(start));
//       }, 30);
//     } else {
//       // Reset counter when leaving view
//       setCount(0);
//       clearInterval(timer);
//     }

//     return () => clearInterval(timer);
//   }, [inView, end]);

//   return (
//     <div ref={ref} className="text-center animate-slide-up" style={{ animationDelay: delay }}>
//       <div className="text-3xl font-bold text-white mb-2">{count}{suffix}</div>
//       <div className="text-white/80">{title}</div>
//     </div>
//   );
// };

// const HeroSection = () => {
//   const scrollToBooking = () => {
//     const element = document.querySelector('#services');
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0">
//         <img src={heroImage} alt="AB Spa and Unisex Salon" className="w-full h-full object-cover" />
//         <div className="absolute inset-0 bg-black/40"></div>
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-spa-sage-dark/30"></div>
//       </div>

//       {/* Floating Elements */}
//       <div className="absolute top-20 left-10 animate-float">
//         <div className="w-3 h-3 bg-spa-rose-gold rounded-full opacity-60"></div>
//       </div>
//       <div className="absolute top-32 right-20 animate-float" style={{ animationDelay: '1s' }}>
//         <Sparkles className="w-6 h-6 text-accent-gold opacity-70" />
//       </div>
//       <div className="absolute bottom-32 left-16 animate-float" style={{ animationDelay: '2s' }}>
//         <div className="w-2 h-2 bg-amber-600-light rounded-full opacity-50"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 text-center max-w-4xl mx-auto px-4 animate-fade-in">
//         <div className="mb-6">
//           <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm mt-20 md:mt-4">
//             <Star className="w-4 h-4 fill-accent-gold text-accent-gold" />
//             <span>Rated #1 Spa in the City</span>
//           </div>
//         </div>

//         <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
//           AB SPA
//         </h1>

//         <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
//           Experience the perfect blend of relaxation and rejuvenation. 
//           Professional treatments for everyone in a serene, welcoming environment.
//         </p>

//         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//           <Button 
//             onClick={scrollToBooking}
//             size="lg" 
//             className="bg-amber-600 hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-strong text-lg px-8 py-6"
//           >
//             <Calendar className="w-5 h-5 mr-2" />
//             Book Your Session
//           </Button>
          
//           <Button 
//             variant="outline" 
//             size="lg"
//             className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm text-lg px-8 py-6"
//             onClick={() => {
//               const element = document.querySelector('#gallery');
//               if (element) element.scrollIntoView({ behavior: 'smooth' });
//             }}
//           >
//             View Gallery
//           </Button>
//         </div>

//         {/* Stats Section with Animated Counter */}
//         <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
//           <Stat end={100} suffix="+" title="Happy Clients" delay="0.2s" />
//           <Stat end={10} suffix="+" title="Premium Services" delay="0.4s" />
//           <Stat end={1} suffix="+" title="Years Experience" delay="0.4s" />
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//         <div className="w-1 h-8 bg-white/50 rounded-full"></div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;




// import { useEffect, useState } from 'react';
// import { Calendar, Star, Sparkles } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useInView } from 'react-intersection-observer';
// import HeroVideoLoding from './HeroVideoLoding';

// // Stat component
// const Stat = ({ end, suffix = '', title, delay = '0s' }: { end: number; suffix?: string; title: string; delay?: string }) => {
//   const [count, setCount] = useState(0);
//   const { ref, inView } = useInView();

//   useEffect(() => {
//     let timer: NodeJS.Timer;

//     if (inView) {
//       let start = 0;
//       const duration = 1500; // total animation duration in ms
//       const increment = end / (duration / 30); // update every 30ms

//       timer = setInterval(() => {
//         start += increment;
//         if (start >= end) {
//           start = end;
//           clearInterval(timer);
//         }
//         setCount(Math.ceil(start));
//       }, 30);
//     } else {
//       setCount(0);
//       clearInterval(timer);
//     }

//     return () => clearInterval(timer);
//   }, [inView, end]);

//   return (
//     <div ref={ref} className="text-center animate-slide-up" style={{ animationDelay: delay }}>
//       <div className="text-3xl font-bold text-white mb-2">{count}{suffix}</div>
//       <div className="text-white/80">{title}</div>
//     </div>
//   );
// };

// const HeroSection = () => {
//   const scrollToBooking = () => {
//     const element = document.querySelector('#services');
//     if (element) element.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Background Video */}
      
//       <div className="absolute inset-0">
//       <HeroVideoLoding/>
//         <div className="absolute inset-0 bg-black/40"></div>
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-spa-sage-dark/30"></div>
//       </div>
      

//       {/* Floating Elements */}
//       <div className="absolute top-20 left-10 animate-float">
//         <div className="w-3 h-3 bg-spa-rose-gold rounded-full opacity-60"></div>
//       </div>
//       <div className="absolute top-32 right-20 animate-float" style={{ animationDelay: '1s' }}>
//         <Sparkles className="w-6 h-6 text-accent-gold opacity-70" />
//       </div>
//       <div className="absolute bottom-32 left-16 animate-float" style={{ animationDelay: '2s' }}>
//         <div className="w-2 h-2 bg-amber-600-light rounded-full opacity-50"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 text-center max-w-4xl mx-auto px-4 animate-fade-in">
//         <div className="mb-6">
//           <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm mt-20 md:mt-4">
//             <Star className="w-4 h-4 fill-accent-gold text-accent-gold" />
//             <span>Rated #1 Spa in the City</span>
//           </div>
//         </div>

//         <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">AB SPA</h1>

//         <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
//           Experience the perfect blend of relaxation and rejuvenation. 
//           Professional treatments for everyone in a serene, welcoming environment.
//         </p>

//         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//           <Button 
//             onClick={scrollToBooking}
//             size="lg" 
//             className="bg-amber-600 hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-strong text-lg px-8 py-6"
//           >
//             <Calendar className="w-5 h-5 mr-2" />
//             Book Your Session
//           </Button>
          
//           <Button 
//             variant="outline" 
//             size="lg"
//             className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm text-lg px-8 py-6"
//             onClick={() => {
//               const element = document.querySelector('#contact');
//               if (element) element.scrollIntoView({ behavior: 'smooth' });
//             }}
//           >
//             Get In Touch
//           </Button>
//         </div>

//         {/* Stats Section */}
//       <div className="mt-16 flex justify-center gap-8 max-w-2xl mx-auto">
//   <Stat end={100} suffix="+" title="Happy Clients" delay="0.2s" />
//   <Stat end={10} suffix="+" title="Premium Services" delay="0.4s" />
//   <Stat end={5} suffix="+" title="Years Experience" delay="0.4s" />
// </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//         <div className="w-1 h-8 bg-white/50 rounded-full"></div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;



import { useEffect, useState } from 'react';
import { Calendar, Star, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import ContactPopup from '@/components/ContactPopup';
import VideoCarousel from './VideoCarousel';

// Stat component
const Stat = ({
  end,
  suffix = '',
  title,
  delay = '0s',
}: {
  end: number;
  suffix?: string;
  title: string;
  delay?: string;
}) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (inView) {
      let start = 0;
      const duration = 1500;
      const increment = end / (duration / 30);
      timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCount(Math.ceil(start));
      }, 30);
    } else {
      setCount(0);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <div ref={ref} className="text-center animate-slide-up" style={{ animationDelay: delay }}>
      <div className="text-3xl font-bold text-white mb-2">{count}{suffix}</div>
      <div className="text-white/80">{title}</div>
    </div>
  );
};

const HeroSection = () => {
  const scrollToBooking = () => {
    const element = document.querySelector('#services');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Video paths for carousel
  const videoPaths = [
    '/ab1.mp4',
    '/ab2.mp4',
    '/ab3.mp4',
    '/ab4.mp4',
  ];

  return (
    <section id="home" className="relative w-full">
      {/* Carousel + Content Container */}
      <div className="relative w-full h-[50vh] md:h-screen overflow-hidden">
        {/* Video Carousel */}
        <VideoCarousel videos={videoPaths} />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-spa-sage-dark/30"></div>

        {/* Floating Elements */}
        <div className="absolute top-5 left-5 md:top-20 md:left-10 animate-float">
          <div className="w-3 h-3 bg-spa-rose-gold rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-16 right-5 md:top-32 md:right-20 animate-float" style={{ animationDelay: '1s' }}>
          <Sparkles className="w-6 h-6 text-accent-gold opacity-70" />
        </div>
        <div className="absolute bottom-16 left-5 md:bottom-32 md:left-16 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-2 h-2 bg-amber-600-light rounded-full opacity-50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <div className="mb-4 md:mb-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm">
              <Star className="w-4 h-4 fill-accent-gold text-accent-gold" />
              <span>Rated #1 Spa in the City</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">AB SPA</h1>
          <p className="text-lg md:text-2xl text-white/90 mb-6 md:mb-8 max-w-2xl leading-relaxed">
            Experience the perfect blend of relaxation and rejuvenation. 
            Professional treatments for everyone in a serene, welcoming environment.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={scrollToBooking}
              size="lg"
              className="bg-amber-600 hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-strong text-lg px-8 py-4"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Your Session
            </Button>

            <ContactPopup/>
          </div>

          {/* Stats */}
          <div className="mt-4 md:mt-16 flex justify-center gap-6 max-w-2xl mx-auto">
            <Stat end={500} suffix="+" title="Happy Clients" delay="0.2s" />
            <Stat end={50} suffix="+" title="Premium Services" delay="0.4s" />
            <Stat end={5} suffix="+" title="Years Experience" delay="0.6s" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-8 bg-white/50 rounded-full"></div>
      </div>
    </section>
  );
};

export default HeroSection;
