"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);

    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  const handleInteractiveHover = useCallback(() => {
    const interactiveElements = document.querySelectorAll(
      "a, button, .interactive, [role='button'], input, textarea, select"
    );

    const handleEnter = () => setIsHovered(true);
    const handleLeave = () => setIsHovered(false);

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const cleanup = handleInteractiveHover();

    // Re-register on DOM mutations (e.g. route changes)
    const observer = new MutationObserver(() => {
      cleanup();
      handleInteractiveHover();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      cleanup();
      observer.disconnect();
    };
  }, [isTouch, handleInteractiveHover]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - (isHovered ? 24 : 16),
          y: position.y - (isHovered ? 24 : 16),
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div
          className={`w-full h-full rounded-full border transition-all duration-200 ${
            isHovered
              ? "border-brand-neon/60 bg-brand-neon/5 scale-100"
              : "border-brand-neon/40 bg-transparent scale-100"
          }`}
        />
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
        }}
        transition={{ type: "spring", stiffness: 1200, damping: 28, mass: 0.2 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-brand-neon" />
      </motion.div>
    </>
  );
};

export default CustomCursor;
