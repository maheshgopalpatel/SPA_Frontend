import { useState, useEffect, useRef } from "react";

interface VideoCarouselProps {
  videos: string[];
  className?: string;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 5000); // change video every 5 seconds
    return () => clearInterval(interval);
  }, [videos.length]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // autoplay might be blocked in some browsers
      });
    }
  }, [currentIndex]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className || ""}`}>
      <video
        key={currentIndex}
        ref={videoRef}
        src={videos[currentIndex]}
        className="w-full h-full object-cover"
        muted
        autoPlay
        loop
      />
    </div>
  );
};

export default VideoCarousel;
