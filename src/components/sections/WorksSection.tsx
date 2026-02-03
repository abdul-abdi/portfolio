import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  tech: string[];
  color: string;
  featured?: boolean;
  wide?: boolean;
  tall?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Luminary",
    category: "Brand & Web Design",
    year: "2024",
    tech: ["React", "Three.js", "GSAP"],
    color: "from-blue-600/20 to-purple-600/20",
    featured: true,
  },
  {
    id: 2,
    title: "Nexus Pay",
    category: "Fintech Platform",
    year: "2024",
    tech: ["Next.js", "Stripe", "Tailwind"],
    color: "from-emerald-600/20 to-teal-600/20",
    wide: true,
  },
  {
    id: 3,
    title: "Synthwave",
    category: "Music Visualizer",
    year: "2023",
    tech: ["WebGL", "Web Audio", "Canvas"],
    color: "from-pink-600/20 to-orange-600/20",
    tall: true,
  },
  {
    id: 4,
    title: "Orbit",
    category: "SaaS Dashboard",
    year: "2023",
    tech: ["Vue", "D3.js", "Supabase"],
    color: "from-violet-600/20 to-indigo-600/20",
  },
  {
    id: 5,
    title: "Terraform",
    category: "Real Estate Platform",
    year: "2023",
    tech: ["React", "MapboxGL", "Node"],
    color: "from-amber-600/20 to-yellow-600/20",
    wide: true,
  },
  {
    id: 6,
    title: "Cipher",
    category: "Crypto Exchange",
    year: "2022",
    tech: ["Next.js", "Web3", "Ethereum"],
    color: "from-cyan-600/20 to-blue-600/20",
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
            href="#"
            className="btn-ghost self-start md:self-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            View All Works
            <ArrowUpRight className="w-4 h-4" />
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
            <span className="label-mono">{project.category}</span>
            <motion.div
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Bottom */}
          <div>
            <h3 className="heading-md mb-3">{project.title}</h3>
            <div className="flex items-center gap-4">
              <span className="body-sm">{project.year}</span>
              <motion.div
                className="flex gap-2 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70"
                  >
                    {t}
                  </span>
                ))}
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
