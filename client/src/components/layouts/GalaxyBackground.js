import React, { useEffect, useRef } from 'react';

const GalaxyBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];
    const numStars = 800;

    let mouseX = 0;
    let mouseY = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * canvas.width,
          size: Math.random() * 1.5 + 0.5,
          color: Math.random() > 0.8 ? '#00f5d4' : (Math.random() > 0.5 ? '#7b2cbf' : '#ffffff')
        });
      }
    };

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - canvas.width / 2) * 0.05;
      mouseY = (e.clientY - canvas.height / 2) * 0.05;
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Removed solid fill so radial gradient from CSS can show behind
      // ctx.fillStyle = 'rgba(5, 5, 16, 1)'; 
      // ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];

        // Move star for parallax effect
        star.z -= 0.5;
        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        }

        const k = 128.0 / star.z;
        const px = (star.x - canvas.width / 2 - mouseX) * k + canvas.width / 2;
        const py = (star.y - canvas.height / 2 - mouseY) * k + canvas.height / 2;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const size = (1 - star.z / canvas.width) * star.size * 3;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          
          // Glow effect
          ctx.shadowBlur = size * 2;
          ctx.shadowColor = star.color;
          
          ctx.fillStyle = star.color;
          ctx.fill();
          
          ctx.shadowBlur = 0; // Reset
        }
      }

      animationFrameId = requestAnimationFrame(drawStars);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    resizeCanvas();
    drawStars();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="galaxy-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default GalaxyBackground;
