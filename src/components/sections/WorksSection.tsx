import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  tech: string[];
  color: string;
  description: string;
  github: string;
  featured?: boolean;
  wide?: boolean;
  tall?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "VibeUI",
    category: "AI Design System Generator",
    year: "2025",
    tech: ["Next.js 16", "Gemini AI", "Tailwind CSS"],
    color: "from-violet-600/20 to-purple-600/20",
    description: "AI-powered design system generator that transforms natural language prompts into production-ready systems with color palettes, typography, and exportable design tokens.",
    github: "https://github.com/abdul-abdi/vibeui",
    featured: true,
  },
  {
    id: 2,
    title: "Karibu",
    category: "Smart Contract Platform",
    year: "2025",
    tech: ["Next.js", "ethers.js", "Hedera"],
    color: "from-emerald-600/20 to-teal-600/20",
    description: "Web-based smart contract development platform with multi-file IDE, automated security analysis, AI assistant, and one-click testnet deployment. No wallet setup required.",
    github: "https://github.com/abdul-abdi/karibu",
    wide: true,
  },
  {
    id: 3,
    title: "Zenith",
    category: "AI Life Engine",
    year: "2025",
    tech: ["Next.js 15", "Gemini AI", "Zustand"],
    color: "from-pink-600/20 to-rose-600/20",
    description: "AI-orchestrated life transformation platform that gamifies personal goals into RPG-style questlines with XP progression, adaptive difficulty, and curated learning resources.",
    github: "https://github.com/abdul-abdi/zenith",
    tall: true,
  },
  {
    id: 4,
    title: "BlockCreative",
    category: "Web3 Marketplace",
    year: "2024",
    tech: ["Next.js", "Lisk", "MongoDB"],
    color: "from-amber-600/20 to-orange-600/20",
    description: "Decentralized marketplace connecting scriptwriters with producers. Features AI script analysis, blockchain escrow payments, and NFT-based ownership rights.",
    github: "https://github.com/abdul-abdi/blockcreative",
  },
  {
    id: 5,
    title: "Atomic Habits Tracker",
    category: "Productivity Tool",
    year: "2024",
    tech: ["JavaScript", "React", "Vercel"],
    color: "from-cyan-600/20 to-blue-600/20",
    description: "Habit tracking application inspired by James Clear's methodology. Build lasting habits through small, incremental daily actions with visual progress tracking.",
    github: "https://github.com/abdul-abdi/atomic-habits-tracker",
    wide: true,
  },
];

export const WorksSection = () => {
  return (
    <section id="works" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <motion.p
              className="label-mono mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              02 — Selected Works
            </motion.p>
            <motion.h2
              className="heading-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Projects that
              <br />
              <span className="gradient-text-cobalt">speak volumes.</span>
            </motion.h2>
          </div>
          <motion.a
            href="https://github.com/abdul-abdi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost self-start md:self-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            View GitHub
            <Github className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(250px,auto)]">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), {
    damping: 20,
    stiffness: 300,
  });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), {
    damping: 20,
    stiffness: 300,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const gridClass = project.featured
    ? "md:col-span-2 md:row-span-2"
    : project.wide
    ? "md:col-span-2"
    : project.tall
    ? "md:row-span-2"
    : "";

  return (
    <motion.div
      ref={cardRef}
      className={`${gridClass} perspective-1000`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={`
          relative h-full min-h-[250px] rounded-2xl overflow-hidden cursor-pointer
          bg-gradient-to-br ${project.color}
          border border-white/5 backdrop-blur-sm
          transition-colors duration-500
        `}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        data-hoverable="true"
      >
        {/* Content */}
        <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between">
          {/* Top */}
          <div className="flex items-start justify-between">
            <span className="label-mono text-xs sm:text-sm">{project.category}</span>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
              aria-label="GitHub repository"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Middle - Description */}
          <div className="flex-1 flex items-center py-4">
            <p className="body-sm text-muted-foreground/80 line-clamp-4">
              {project.description}
            </p>
          </div>

          {/* Bottom */}
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-[-0.02em] leading-[1.2] mb-3">{project.title}</h3>
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="body-sm">{project.year}</span>
                <div className="flex gap-1 sm:gap-2 flex-wrap">
                  {project.tech.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-white/10 text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <motion.div
                className="flex items-center gap-1 text-xs text-primary flex-shrink-0"
                animate={{ x: isHovered ? 4 : 0 }}
              >
                <span className="hidden sm:inline">View</span>
                <ArrowUpRight className="w-3 h-3" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(
              circle at ${50 + mouseX.get() / 3}% ${50 + mouseY.get() / 3}%,
              rgba(255,255,255,0.15) 0%,
              transparent 50%
            )`,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};
