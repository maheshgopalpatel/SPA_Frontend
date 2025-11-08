// import { useEffect, useRef, useState } from "react";

// const HeroVideoLoading = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => setIsVisible(entry.isIntersecting),
//       { threshold: 0.1 }
//     );
//     if (videoRef.current) observer.observe(videoRef.current);
//     return () => observer.disconnect();
//   }, []);

//   // Play or pause the video based on visibility
//   useEffect(() => {
//     if (!videoRef.current) return;
//     if (isVisible) {
//       videoRef.current.play().catch((err) => console.log(err));
//     } else {
//       videoRef.current.pause();
//     }
//   }, [isVisible]);

//   return (
//     <video
//       ref={videoRef}
//       playsInline
//       muted
//       loop
//       preload="auto"
//       className="w-full h-auto"
//     >
//       <source src="/ab.mp4" type="video/mp4" />
//     </video>
//   );
// };

// export default HeroVideoLoading;


import { useEffect, useRef, useState } from "react";

const HeroVideoLoading = () => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isVisible) {
      videoRef.current.play().catch((err) => console.log(err));
    } else {
      videoRef.current.pause();
    }
  }, [isVisible]);

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      <video
        ref={videoRef}
        playsInline
        muted
        loop
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/ab.mp4" type="video/mp4" />
      </video>

      {/* Optional overlay (to darken video for text contrast) */}
      <div className="absolute inset-0 bg-black/30"></div>

  
    </div>
  );
};

export default HeroVideoLoading;



