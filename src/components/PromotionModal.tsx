import React, { useMemo } from 'react';
import { X } from 'lucide-react';
import promo from '../assets/promo.png';
import promo1 from '../assets/promo1.png';

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromotionModal: React.FC<PromotionModalProps> = ({ isOpen, onClose }) => {
  // Don't render if closed
  if (!isOpen) return null;

  // Array of promo images
  const images = [promo, promo1];

  // Pick a random image on each render (or refresh)
  const randomImage = useMemo(() => {
    const index = Math.floor(Math.random() * images.length);
    return images[index];
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative bg-white flex justify-center items-center rounded-lg overflow-hidden shadow-lg max-w-md min-h-[100px] w-full">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          <X className="h-6 w-6 bg-white text-base text-red-500 rounded-full" />
        </button>

        <img src={randomImage} alt="offer" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default PromotionModal;
