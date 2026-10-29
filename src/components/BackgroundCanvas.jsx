import React, { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mouse coordinates for gentle interactive parallax
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    // Floating Stardust Particles
    const particleCount = Math.min(width < 768 ? 40 : 80, 100);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.4 - 0.1,
      color: Math.random() > 0.5 ? "rgba(245, 190, 71, " : "rgba(168, 85, 247, ",
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI,
    }));

    let time = 0;

    const render = () => {
      // Ease mouse toward target
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Clear with subtle persistent trail for motion blur
      ctx.fillStyle = "rgba(6, 7, 19, 0.25)";
      ctx.fillRect(0, 0, width, height);

      // Render floating particles
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.speedX;
          p.y += p.speedY;
          p.pulse += 0.02;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Flowing Ribbons Representing Ninad (Music / Gold) & Natraj (Dance / Violet)
      if (!prefersReducedMotion) {
        time += 0.008;
      }

      // Parallax offsets
      const offsetX = (mouse.x - width / 2) * 0.04;
      const offsetY = (mouse.y - height / 2) * 0.04;

      // Ribbon 1: Ninad (Acoustic golden soundwave rhythm)
      ctx.save();
      const goldGrad = ctx.createLinearGradient(0, 0, width, height);
      goldGrad.addColorStop(0, "rgba(245, 190, 71, 0)");
      goldGrad.addColorStop(0.3, "rgba(245, 190, 71, 0.28)");
      goldGrad.addColorStop(0.7, "rgba(217, 119, 6, 0.35)");
      goldGrad.addColorStop(1, "rgba(245, 190, 71, 0)");

      ctx.strokeStyle = goldGrad;
      ctx.lineWidth = 3.5;
      ctx.shadowBlur = 24;
      ctx.shadowColor = "rgba(245, 190, 71, 0.45)";

      ctx.beginPath();
      const wavePoints1 = 30;
      for (let i = 0; i <= wavePoints1; i++) {
        const x = (width / wavePoints1) * i;
        const normalizedX = x / width;
        const wave1 = Math.sin(normalizedX * 4 + time + offsetX * 0.01) * 70;
        const wave2 = Math.cos(normalizedX * 2.5 - time * 0.8) * 45;
        const y = height * 0.52 + wave1 + wave2 + offsetY;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // Ribbon 2: Natraj (Kinetic violet/magenta dance ribbon)
      ctx.save();
      const purpleGrad = ctx.createLinearGradient(width, 0, 0, height);
      purpleGrad.addColorStop(0, "rgba(168, 85, 247, 0)");
      purpleGrad.addColorStop(0.35, "rgba(168, 85, 247, 0.35)");
      purpleGrad.addColorStop(0.65, "rgba(236, 72, 153, 0.25)");
      purpleGrad.addColorStop(1, "rgba(99, 102, 241, 0)");

      ctx.strokeStyle = purpleGrad;
      ctx.lineWidth = 4;
      ctx.shadowBlur = 30;
      ctx.shadowColor = "rgba(168, 85, 247, 0.55)";

      ctx.beginPath();
      const wavePoints2 = 30;
      for (let i = 0; i <= wavePoints2; i++) {
        const x = (width / wavePoints2) * i;
        const normalizedX = x / width;
        const waveA = Math.cos(normalizedX * 3.5 - time * 1.1 - offsetX * 0.01) * 80;
        const waveB = Math.sin(normalizedX * 1.8 + time * 0.7) * 50;
        const y = height * 0.48 + waveA + waveB - offsetY;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // Convergence Glow at Center
      const centerGlow = ctx.createRadialGradient(
        width / 2 + offsetX * 1.5,
        height * 0.5 + offsetY * 1.5,
        10,
        width / 2,
        height * 0.5,
        Math.min(width, height) * 0.55
      );
      centerGlow.addColorStop(0, "rgba(168, 85, 247, 0.08)");
      centerGlow.addColorStop(0.5, "rgba(245, 190, 71, 0.04)");
      centerGlow.addColorStop(1, "rgba(6, 7, 19, 0)");

      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
