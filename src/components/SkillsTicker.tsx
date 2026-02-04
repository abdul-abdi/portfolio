import { motion } from "framer-motion";

const skills = [
  "CONTEXT ENG",
  "PROMPT ENG",
  "AI AGENTS",
  "LLM OPS",
  "PMO",
  "AGILE",
  "SOLIDITY",
  "RUST",
  "AUTOMATION",
  "WEB3",
  "TYPESCRIPT",
  "REACT",
  "NEXT.JS",
  "NODE.JS",
];

export const SkillsTicker = () => {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 h-[80vh] overflow-hidden hidden lg:block z-40">
      <motion.div
        className="flex flex-col gap-6"
        animate={{
          y: [0, "-50%"],
        }}
        transition={{
          y: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {/* Quadruple the skills for seamless infinite loop */}
        {[...skills, ...skills, ...skills, ...skills].map((skill, i) => (
          <span
            key={i}
            className="text-sm font-medium tracking-[0.15em] text-muted-foreground/70 whitespace-nowrap transition-colors duration-300 hover:text-primary"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
