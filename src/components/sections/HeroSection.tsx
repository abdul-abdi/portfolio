import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { GridBackground } from "../GridBackground";

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX - innerWidth / 2) / 50);
      mouseY.set((e.clientY - innerHeight / 2) / 50);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Staggered letter animation
  const headline = "DIGITAL";
  const subline = "ARCHITECT";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <GridBackground />

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full px-6 md:px-12 lg:px-20"
        style={{ y, opacity }}
      >
        {/* Top Label */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="w-12 h-px bg-primary" />
          <span className="label-mono">Portfolio 2024</span>
        </motion.div>

        {/* Main Headline - Massive Typography */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-medium tracking-[-0.05em] leading-[0.85] text-foreground"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: smoothMouseX }}
          >
            {headline.split("").map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.05 }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-medium tracking-[-0.05em] leading-[0.85]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: useTransform(smoothMouseX, v => v * -1) }}
          >
            <span className="gradient-text-cobalt">{subline}</span>
            <motion.span 
              className="inline-block w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full ml-4 align-middle"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.h1>
        </div>

        {/* Bottom Section - Split Layout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-16 md:mt-24 gap-8">
          {/* Left - Description */}
          <motion.div
            className="max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className="body-lg">
              Crafting immersive digital experiences that blur the line between 
              art and interface. Based in the intersection of design & code.
            </p>
          </motion.div>

          {/* Right - CTA */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <a href="#works" className="btn-primary group">
              <span>Explore Works</span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </a>
            <a href="#contact" className="btn-ghost">
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <motion.div
          className="absolute right-6 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          style={{ y: smoothMouseY }}
        >
          {[
            { value: "5+", label: "Years" },
            { value: "40+", label: "Projects" },
            { value: "∞", label: "Ideas" },
          ].map((stat, i) => (
            <div key={i} className="text-right">
              <div className="text-4xl font-medium text-foreground">{stat.value}</div>
              <div className="label-mono text-xs">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity }}
      >
        <span className="label-mono text-xs">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  );
};
