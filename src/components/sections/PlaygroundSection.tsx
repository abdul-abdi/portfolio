import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Experiment {
  id: number;
  title: string;
  description: string;
  gradient: string;
}

const experiments: Experiment[] = [
  {
    id: 1,
    title: "AI Vibe Generation",
    description: "Dynamic design themes powered by Gemini AI prompts",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    id: 2,
    title: "Smart Contract IDE",
    description: "Multi-file editor with dependency management for Solidity",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    id: 3,
    title: "Live Component Preview",
    description: "Real-time UI component rendering with theme switching",
    gradient: "from-cyan-500 to-blue-400",
  },
  {
    id: 4,
    title: "Security Analysis",
    description: "Automated vulnerability detection for smart contracts",
    gradient: "from-amber-500 to-orange-400",
  },
];

export const PlaygroundSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Section Header */}
      <div className="px-6 mb-16">
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="label-mono mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            03 — Playground
          </motion.p>
          <motion.h2
            className="heading-xl max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Where curiosity
            <br />
            <span className="gradient-text-cobalt">meets code.</span>
          </motion.h2>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="relative">
        <motion.div
          className="flex gap-6 px-6"
          style={{ x }}
        >
          {experiments.map((exp, index) => (
            <ExperimentCard key={exp.id} experiment={exp} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Hint */}
      <motion.p
        className="label-mono text-center mt-12 text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        ← Scroll to explore →
      </motion.p>
    </section>
  );
};

interface ExperimentCardProps {
  experiment: Experiment;
  index: number;
}

const ExperimentCard = ({ experiment, index }: ExperimentCardProps) => {
  return (
    <motion.div
      className="flex-shrink-0 w-[300px] md:w-[400px] aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      data-hoverable="true"
    >
      {/* Background */}
      <div className={`relative w-full h-full bg-gradient-to-br ${experiment.gradient} p-[1px]`}>
        <div className="w-full h-full bg-background rounded-2xl p-8 flex flex-col justify-between">
          {/* Animated Pattern */}
          <div className="flex-1 relative overflow-hidden rounded-xl bg-obsidian-light">
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${experiment.gradient} opacity-20`}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            />
            
            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
            />

            {/* Floating Elements */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-16 h-16 rounded-full bg-gradient-to-br ${experiment.gradient} opacity-40 blur-sm`}
                style={{
                  left: `${20 + i * 25}%`,
                  top: `${30 + (i % 2) * 30}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  x: [-5, 5, -5],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          {/* Info */}
          <div className="mt-6">
            <h3 className="heading-md mb-2 group-hover:text-primary transition-colors">
              {experiment.title}
            </h3>
            <p className="body-sm">{experiment.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
