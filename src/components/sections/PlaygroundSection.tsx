import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface Experiment {
  id: number;
  title: string;
  description: string;
  gradient: string;
}

const experiments: Experiment[] = [
  {
    id: 1,
    title: "Natural Language to Design",
    description: "Transforming text prompts into complete design systems with AI",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    id: 2,
    title: "Gamified Goal Systems",
    description: "RPG-style progression mechanics for personal development",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    id: 3,
    title: "Zero-Config Blockchain",
    description: "Smart contract deployment without wallet setup friction",
    gradient: "from-cyan-500 to-blue-400",
  },
  {
    id: 4,
    title: "AI Script Analysis",
    description: "Evaluating screenplay quality and marketability with Gemini",
    gradient: "from-amber-500 to-orange-400",
  },
  {
    id: 5,
    title: "Multi-Agent Orchestration",
    description: "Coordinating specialized AI agents for complex workflow automation",
    gradient: "from-rose-500 to-pink-400",
  },
  {
    id: 6,
    title: "Context Window Optimization",
    description: "Maximizing LLM performance through intelligent context engineering",
    gradient: "from-indigo-500 to-blue-400",
  },
  {
    id: 7,
    title: "Human-in-the-Loop Systems",
    description: "Building AI workflows with strategic human checkpoints",
    gradient: "from-lime-500 to-green-400",
  },
  {
    id: 8,
    title: "Real-time Component Preview",
    description: "Live UI rendering with dynamic theme switching and hot reload",
    gradient: "from-fuchsia-500 to-purple-400",
  },
];

export const PlaygroundSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  // Calculate drag constraints
  useEffect(() => {
    const updateConstraints = () => {
      if (scrollContainerRef.current) {
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const clientWidth = window.innerWidth;
        // Account for the left padding (pl-20 = 80px on mobile, pl-28 = 112px on lg)
        const maxDrag = scrollWidth - clientWidth + 24;
        setConstraints({
          left: -Math.max(0, maxDrag),
          right: 0,
        });
      }
    };

    // Initial calculation after render
    const timer = setTimeout(updateConstraints, 100);
    window.addEventListener("resize", updateConstraints);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateConstraints);
    };
  }, []);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Section Header */}
      <div className="px-6 mb-16">
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="label-mono mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            03 — Playground
          </motion.p>
          <motion.h2
            className="heading-xl max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Where curiosity
            <br />
            <span className="gradient-text-cobalt">meets code.</span>
          </motion.h2>
        </div>
      </div>

      {/* Horizontal Scroll Container - Simple Drag */}
      <motion.div
        ref={scrollContainerRef}
        className="flex gap-6 pl-20 lg:pl-28 pr-6 cursor-grab active:cursor-grabbing select-none"
        drag="x"
        dragConstraints={constraints}
        dragElastic={0.1}
        dragMomentum={true}
        dragTransition={{
          power: 0.3,
          timeConstant: 200,
          bounceStiffness: 300,
          bounceDamping: 30
        }}
      >
        {experiments.map((exp, index) => (
          <ExperimentCard key={exp.id} experiment={exp} index={index} />
        ))}
      </motion.div>

      {/* Hint */}
      <motion.p
        className="label-mono text-center mt-12 text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        ← Drag to explore →
      </motion.p>
    </section>
  );
};

interface ExperimentCardProps {
  experiment: Experiment;
  index: number;
}

const ExperimentCard = ({ experiment, index }: ExperimentCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [10, -10]), {
    damping: 20,
    stiffness: 300,
  });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]), {
    damping: 20,
    stiffness: 300,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[400px] aspect-[4/5] rounded-2xl overflow-visible cursor-pointer group perspective-1000"
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      data-hoverable="true"
    >
      {/* Glow effect on hover */}
      <motion.div
        className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${experiment.gradient} blur-2xl`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Card Background */}
      <div className={`relative w-full h-full bg-gradient-to-br ${experiment.gradient} p-[2px] rounded-2xl`}>
        <div className="w-full h-full bg-background rounded-2xl p-5 sm:p-8 flex flex-col justify-between overflow-hidden">
          {/* Animated Pattern */}
          <div className="flex-1 relative overflow-hidden rounded-xl bg-obsidian-light">
            {/* Pulsing gradient background */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${experiment.gradient}`}
              animate={{
                opacity: [0.15, 0.25, 0.15],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Rotating gradient overlay */}
            <motion.div
              className="absolute inset-0"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.1), transparent)",
                opacity: isHovered ? 0.5 : 0.2
              }}
            />

            {/* Grid Pattern */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
                `,
                backgroundSize: "24px 24px",
                opacity: isHovered ? 0.6 : 0.3,
                transition: "opacity 0.3s ease",
              }}
            />

            {/* Floating Orbs */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full bg-gradient-to-br ${experiment.gradient}`}
                style={{
                  width: 40 + i * 15,
                  height: 40 + i * 15,
                  left: `${15 + i * 20}%`,
                  top: `${20 + (i % 2) * 35}%`,
                  filter: "blur(8px)",
                }}
                animate={{
                  y: [-15, 15, -15],
                  x: [-8, 8, -8],
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 5 + i * 1.5,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Center accent */}
            <motion.div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br ${experiment.gradient}`}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ filter: "blur(20px)" }}
            />
          </div>

          {/* Info */}
          <motion.div
            className="mt-4 sm:mt-6"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-[-0.02em] leading-[1.2] mb-2 group-hover:text-primary transition-colors duration-300">
              {experiment.title}
            </h3>
            <p className="body-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              {experiment.description}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
