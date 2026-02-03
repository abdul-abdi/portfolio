import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const AbstractShape = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] perspective-1000"
    >
      <motion.div
        className="absolute inset-0 preserve-3d"
        style={{ rotateX, rotateY }}
      >
        {/* Main Shape - Morphing Blob */}
        <motion.div
          className="absolute inset-0"
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 60%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: `
              radial-gradient(
                ellipse at 30% 30%,
                hsl(224, 100%, 59%) 0%,
                hsl(224, 60%, 35%) 40%,
                transparent 70%
              )
            `,
            filter: "blur(0px)",
          }}
        />

        {/* Inner Glow */}
        <motion.div
          className="absolute inset-[15%] rounded-full animate-pulse-glow"
          style={{
            background: `
              radial-gradient(
                circle at center,
                hsl(224, 100%, 70%) 0%,
                hsl(224, 100%, 59%) 30%,
                transparent 70%
              )
            `,
          }}
        />

        {/* Orbiting Ring 1 */}
        <motion.div
          className="absolute inset-[-10%] rounded-full border border-primary/20 animate-spin-slow"
          style={{ animationDuration: "25s" }}
        />

        {/* Orbiting Ring 2 */}
        <motion.div
          className="absolute inset-[-5%] rounded-full border border-primary/10 animate-spin-slow"
          style={{ animationDuration: "20s", animationDirection: "reverse" }}
        />

        {/* Floating Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/60"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Background Glow */}
      <div
        className="absolute inset-[-50%] rounded-full animate-pulse-glow pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at center,
              hsl(224, 100%, 59%, 0.15) 0%,
              transparent 50%
            )
          `,
        }}
      />
    </div>
  );
};
