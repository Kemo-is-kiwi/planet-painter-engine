import { useEffect, useRef } from 'react';

export const StarField = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const createStars = () => {
      const container = containerRef.current;
      if (!container) return;

      // Clear existing stars
      container.innerHTML = '';

      // Create 100 stars
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        container.appendChild(star);
      }
    };

    createStars();
  }, []);

  return <div ref={containerRef} className="star-field" />;
};