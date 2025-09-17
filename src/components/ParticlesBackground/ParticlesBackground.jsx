import React, { useRef, useEffect } from 'react';

/**
 * ParticlesBackground
 * - рисует падающие круги (с разной скоростью/радиусом/размытием)
 * - масштабируется под devicePixelRatio (чтобы было чётко на Retina)
 * - pointer-events: none (не мешает кликам)
 *
 * props:
 * - dotsCount (number) - количество частиц
 * - color (string) - цвет частиц
 */
export default function ParticlesBackground({
  dotsCount = 250,
  color = '#000'
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const dotsRef = useRef([]);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // resize canvas to window size (with DPR support)
    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      sizeRef.current = { width, height, dpr };

      // set CSS size (so canvas fits the screen)
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      // set backing store size
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      // map drawing coordinates to CSS px (so we can draw using window coordinates)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // keep particles inside new bounds (or reinit if you prefer)
      dotsRef.current.forEach(dot => {
        dot.x = Math.min(dot.x, width + dot.radius);
        dot.y = Math.min(dot.y, height + dot.radius);
      });
    }

    // create initial particles
    function initDots() {
      const { width, height } = sizeRef.current;
      const dots = [];
      for (let i = 0; i < dotsCount; i++) {
        const radius = Math.random() * 3 + 2; // 2..5 px
        const speed = Math.random() * 1.3 + 0.4; // px per frame-base
        const blur = Math.random() * 6; // blur 0..6
        const swaySpeed = Math.random() * 0.02 + 0.004; // horizontal sway speed
        const swayDistance = Math.random() * 18 + 2; // sway magnitude
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          speed,
          blur,
          swaySpeed,
          swayDistance,
          angle: Math.random() * Math.PI * 2
        });
      }
      dotsRef.current = dots;
    }

    resize();
    initDots();
    window.addEventListener('resize', resize);

    let lastTime = performance.now();
    function animate(now) {
      const { width, height, dpr } = sizeRef.current;
      const dt = Math.max(0, now - lastTime);
      // normalize dt to ~60fps (so speed roughly consistent)
      const factor = dt / (1000 / 60);
      lastTime = now;

      // clear canvas (transparent background)
      ctx.clearRect(0, 0, width, height);

      // draw dots
      for (let dot of dotsRef.current) {
        // update
        dot.angle += dot.swaySpeed * factor;
        // gentle horizontal sway
        dot.x += Math.sin(dot.angle) * (dot.swayDistance * 0.01) * factor;
        // vertical falling
        dot.y += dot.speed * factor;

        // draw circle
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        // shadowBlur works in device pixels; scale by dpr for consistent look
        ctx.shadowBlur = dot.blur * dpr;
        ctx.fill();
        ctx.closePath();

        // recycle if out of bottom
        if (dot.y - dot.radius > height) {
          dot.y = -dot.radius;
          dot.x = Math.random() * width;
          // randomize some parameters a bit
          dot.speed = Math.random() * 1.3 + 0.4;
          dot.radius = Math.random() * 3 + 2;
          dot.blur = Math.random() * 6;
          dot.swayDistance = Math.random() * 18 + 2;
        }

        // wrap horizontally (optional)
        if (dot.x < -dot.radius) dot.x = width + dot.radius;
        if (dot.x > width + dot.radius) dot.x = -dot.radius;
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dotsCount, color]);

  return (
    <canvas
      ref={canvasRef}
      className="canvas__bg"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'transparent'
      }}
    />
  );
}
