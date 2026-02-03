import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AbstractShape } from "../AbstractShape";
import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const titleSplitY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const subtitleSplitY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Abstract 3D Shape */}
      <motion.div
        className="absolute z-0"
        style={{ scale, opacity: useTransform(scrollYProgress, [0, 0.7], [1, 0.3]) }}
      >
        <AbstractShape />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        style={{ y, opacity }}
      >
        {/* Label */}
        <motion.p
          className="label-mono mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Digital Experience Designer
        </motion.p>

        {/* Main Title - Splits on scroll */}
        <div className="overflow-hidden">
          <motion.h1
            className="heading-display mb-4"
            style={{ y: titleSplitY }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Architecting
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="heading-display gradient-text-cobalt"
            style={{ y: subtitleSplitY }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Digital Emotions.
          </motion.h1>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a href="#works" className="btn-primary">
            View Works
          </a>
          <a href="#about" className="btn-ghost">
            About Me
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ opacity }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-muted-foreground"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="label-mono text-xs">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};
