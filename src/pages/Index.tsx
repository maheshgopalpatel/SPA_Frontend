import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import GallerySection from '@/components/GallerySection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import PromotionModal from '@/components/PromotionModal'; // ✅ Import this

const Index = ({isLoginModalOpen, setIsLoginModalOpen}) => {
  const [isPromotionOpen, setIsPromotionOpen] = useState(false);

  // Show promotion 1s after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPromotionOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation onLoginClick={() => setIsLoginModalOpen(true)} />
      <HeroSection />
      <ServicesSection onLoginClick={() => setIsLoginModalOpen(true)} />
      <GallerySection />
      <ReviewsSection />
      <ContactSection />
      <Footer />

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* ✅ Promotional Modal */}
      <PromotionModal 
        isOpen={isPromotionOpen}
        onClose={() => setIsPromotionOpen(false)}
      />
    </div>
  );
};

export default Index;
