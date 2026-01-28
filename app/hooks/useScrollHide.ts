import { useState, useEffect, useRef } from "react";

export const useScrollHide = () => {
  const [isHidden, setIsHidden] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTouchingRef = useRef(false);

  useEffect(() => {
    const clearExistingTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const scheduleShow = (delay: number) => {
      clearExistingTimeout();
      timeoutRef.current = setTimeout(() => {
        if (!isTouchingRef.current) {
          setIsHidden(false);
        }
      }, delay);
    };

    const handleTouchStart = () => {
      isTouchingRef.current = true;
      clearExistingTimeout();
      setIsHidden(true);
    };

    const handleTouchEnd = () => {
      isTouchingRef.current = false;
      // Show immediately when finger lifted
      clearExistingTimeout();
      setIsHidden(false);
    };

    const handleScroll = () => {
      // Only hide if touching, show immediately when scroll stops
      if (isTouchingRef.current) {
        setIsHidden(true);
      } else {
        // Scroll without touch (inertia) - show when it stops
        clearExistingTimeout();
        timeoutRef.current = setTimeout(() => {
          setIsHidden(false);
        }, 150);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
      window.removeEventListener("scroll", handleScroll);
      clearExistingTimeout();
    };
  }, []);

  return isHidden;
};
