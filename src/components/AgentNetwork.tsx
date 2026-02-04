import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface Connection {
  from: number;
  to: number;
}

export const AgentNetwork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate nodes in a pleasing distribution
  const nodes: Node[] = [
    { id: 0, x: 0.7, y: 0.2, size: 8, delay: 0, duration: 4 },
    { id: 1, x: 0.85, y: 0.35, size: 6, delay: 0.5, duration: 5 },
    { id: 2, x: 0.6, y: 0.4, size: 10, delay: 1, duration: 4.5 },
    { id: 3, x: 0.75, y: 0.55, size: 7, delay: 0.3, duration: 5.5 },
    { id: 4, x: 0.9, y: 0.6, size: 5, delay: 0.8, duration: 4 },
    { id: 5, x: 0.55, y: 0.65, size: 8, delay: 1.2, duration: 5 },
    { id: 6, x: 0.8, y: 0.8, size: 6, delay: 0.6, duration: 4.5 },
    { id: 7, x: 0.65, y: 0.85, size: 9, delay: 0.2, duration: 5 },
    { id: 8, x: 0.5, y: 0.3, size: 5, delay: 1.5, duration: 4 },
    { id: 9, x: 0.95, y: 0.45, size: 4, delay: 0.9, duration: 5.5 },
  ];

  // Define connections between nodes
  const connections: Connection[] = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 3 },
    { from: 2, to: 5 },
    { from: 3, to: 4 },
    { from: 3, to: 6 },
    { from: 5, to: 7 },
    { from: 6, to: 7 },
    { from: 0, to: 8 },
    { from: 1, to: 9 },
    { from: 4, to: 9 },
    { from: 8, to: 2 },
  ];

  return (
    <div
      ref={containerRef}
      className="absolute top-0 right-0 w-1/2 h-full pointer-events-none hidden lg:block"
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="overflow-visible"
      >
        <defs>
          {/* Gradient for connections */}
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(224, 100%, 59%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(224, 60%, 45%)" stopOpacity="0.1" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {connections.map((conn, i) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          return (
            <motion.line
              key={`conn-${i}`}
              x1={fromNode.x * dimensions.width}
              y1={fromNode.y * dimensions.height}
              x2={toNode.x * dimensions.width}
              y2={toNode.y * dimensions.height}
              stroke="url(#connectionGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2, delay: i * 0.1 },
                opacity: { duration: 1, delay: i * 0.1 },
              }}
            />
          );
        })}

        {/* Data flow particles along connections */}
        {connections.slice(0, 6).map((conn, i) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          return (
            <motion.circle
              key={`particle-${i}`}
              r="2"
              fill="hsl(224, 100%, 59%)"
              filter="url(#glow)"
              initial={{
                cx: fromNode.x * dimensions.width,
                cy: fromNode.y * dimensions.height,
                opacity: 0,
              }}
              animate={{
                cx: [
                  fromNode.x * dimensions.width,
                  toNode.x * dimensions.width,
                ],
                cy: [
                  fromNode.y * dimensions.height,
                  toNode.y * dimensions.height,
                ],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.8,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.g key={node.id}>
            {/* Outer glow ring */}
            <motion.circle
              cx={node.x * dimensions.width}
              cy={node.y * dimensions.height}
              r={node.size + 8}
              fill="none"
              stroke="hsl(224, 100%, 59%)"
              strokeWidth="1"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: node.duration,
                delay: node.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Main node */}
            <motion.circle
              cx={node.x * dimensions.width}
              cy={node.y * dimensions.height}
              r={node.size}
              fill="hsl(224, 100%, 59%)"
              filter="url(#glow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                cx: node.x * dimensions.width + (smoothMouseX.get() - 0.5) * 20,
                cy: node.y * dimensions.height + (smoothMouseY.get() - 0.5) * 20,
              }}
              transition={{
                opacity: { duration: 0.8, delay: node.delay },
                scale: { duration: 0.8, delay: node.delay },
              }}
            />

            {/* Inner bright core */}
            <motion.circle
              cx={node.x * dimensions.width}
              cy={node.y * dimensions.height}
              r={node.size * 0.4}
              fill="white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 2,
                delay: node.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.g>
        ))}

        {/* Central orchestrator node - larger, more prominent */}
        <motion.g>
          <motion.circle
            cx={dimensions.width * 0.72}
            cy={dimensions.height * 0.48}
            r="25"
            fill="none"
            stroke="hsl(224, 100%, 59%)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.4,
              rotate: 360,
            }}
            transition={{
              opacity: { duration: 1 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
            style={{ transformOrigin: `${dimensions.width * 0.72}px ${dimensions.height * 0.48}px` }}
          />
          <motion.circle
            cx={dimensions.width * 0.72}
            cy={dimensions.height * 0.48}
            r="18"
            fill="hsl(224, 100%, 59%)"
            filter="url(#glow)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 0.8,
              scale: [1, 1.1, 1],
            }}
            transition={{
              opacity: { duration: 1, delay: 0.5 },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          />
          <motion.circle
            cx={dimensions.width * 0.72}
            cy={dimensions.height * 0.48}
            r="8"
            fill="white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.g>
      </svg>

      {/* Subtle gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 70% 50%, transparent 0%, hsl(0, 0%, 4%) 70%)",
        }}
      />
    </div>
  );
};
