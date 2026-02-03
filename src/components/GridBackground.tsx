import { motion } from "framer-motion";

export const GridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated vertical lines */}
      <div className="absolute inset-0 flex justify-between px-[5%]">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{
              duration: 1.5,
              delay: 0.8 + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ originY: 0 }}
          />
        ))}
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-[20%] right-[15%] w-[300px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle at center, hsl(var(--electric-cobalt) / 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-[30%] left-[10%] w-[200px] h-[200px] rounded-full"
        style={{
          background: "radial-gradient(circle at center, hsl(var(--electric-cobalt) / 0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          y: [20, -20, 20],
          x: [10, -10, 10],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Corner accent */}
      <div 
        className="absolute top-0 right-0 w-[50vw] h-[50vh]"
        style={{
          background: "radial-gradient(ellipse at top right, hsl(var(--electric-cobalt) / 0.08) 0%, transparent 50%)",
        }}
      />
    </div>
  );
};
