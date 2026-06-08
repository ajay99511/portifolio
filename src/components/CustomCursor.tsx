"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

export default function CustomCursor() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // Default true for SSR safety — cursor stays hidden until hydration confirms pointer type
  const [isTouch, setIsTouch] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Detect pointer type and listen for changes (e.g. hybrid devices)
  useEffect(() => {
    const mql = window.matchMedia('(pointer: coarse)');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouch(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Apply/remove cursor-none on body based on pointer type
  useEffect(() => {
    document.body.classList.toggle('cursor-none', !isTouch);
  }, [isTouch]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // No DOM elements on touch devices — native pointer should work normally
  if (isTouch) return null;

  const mixBlend = mounted && theme === 'light' ? 'mix-blend-multiply' : 'mix-blend-screen';

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 w-4 h-4 bg-brand-neon rounded-full ${mixBlend} pointer-events-none z-[9999] shadow-[0_0_20px_#00f0ff]`}
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.3 : 1
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className={`fixed top-0 left-0 w-32 h-32 border border-brand-neon rounded-full ${mixBlend} pointer-events-none z-[9998] opacity-20`}
        animate={{
          x: mousePosition.x - 64,
          y: mousePosition.y - 64,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 0.2
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.8 }}
      />
    </>
  );
}
