import { useState, useRef, useEffect } from "react";

const FloatingWhatsApp = () => {
  const [showTip, setShowTip] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 70, y: window.innerHeight-60  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragMoved, setDragMoved] = useState(false); // track movement
  const dragStart = useRef({ x: 0, y: 0 });
  const elementStart = useRef({ x: 0, y: 0 });

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragMoved(false);
    dragStart.current = { x: e.clientX, y: e.clientY };
    elementStart.current = { x: position.x, y: position.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) setDragMoved(true); // mark as drag if moved enough
    setPosition({
      x: Math.min(window.innerWidth - 60, Math.max(30, elementStart.current.x + dx)),
      y: Math.min(window.innerHeight - 60, Math.max(30, elementStart.current.y + dy)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers (mobile)
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragMoved(false);
    const touch = e.touches[0];
    dragStart.current = { x: touch.clientX, y: touch.clientY };
    elementStart.current = { x: position.x, y: position.y };
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.current.x;
    const dy = touch.clientY - dragStart.current.y;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) setDragMoved(true);
    setPosition({
      x: Math.min(window.innerWidth - 60, Math.max(30, elementStart.current.x + dx)),
      y: Math.min(window.innerHeight - 60, Math.max(30, elementStart.current.y + dy)),
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Attach and clean up listeners
  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("touchmove", handleTouchMove);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging]);

  // Tooltip hover
  const handleHover = (val) => setShowTip(val);

  // Handle click only if not dragged
  const handleClick = (e) => {
    if (dragMoved) {
      e.preventDefault(); // stop WhatsApp opening while dragging
    }
  };

  return (
    <div
      className="fixed z-50 select-none cursor-pointer"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        touchAction: "none",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Tooltip */}
      {showTip && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-green-400 text-sm px-3 py-1 rounded-lg shadow-md whitespace-nowrap">
          Chat with AB Spa
        </div>
      )}

      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/916207742437"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onClick={handleClick} // only open on actual click
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-2xl shadow-lg hover:scale-110 transition-transform active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp Chat"
          className="w-9 h-9"
          draggable="false"
        />
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
