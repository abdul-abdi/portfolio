import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const aboutText = `I craft digital experiences that blur the line between art and technology. With over a decade of obsession in design and development, I've learned that the best interfaces are the ones you don't notice—they just feel right.

My approach is simple: understand the human, then build for them. Every pixel, every interaction, every millisecond of animation serves a purpose. Nothing is arbitrary.

Currently, I'm focused on building immersive web experiences that push the boundaries of what's possible in the browser. From 3D visualizations to complex motion systems, I believe the web is the most democratic canvas we have.`;

const skills = [
  "UI/UX",
  "WEBFLOW",
  "GSAP",
  "THREE.JS",
  "REACT",
  "NEXT.JS",
  "FIGMA",
  "MOTION",
  "SPLINE",
  "TYPESCRIPT",
];

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Split text into words for animation
  const words = aboutText.split(" ");

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6"
    >
      {/* Skills Ticker */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-20 overflow-hidden hidden lg:block">
        <div className="ticker-wrapper rotate-180" style={{ writingMode: "vertical-rl" }}>
          <div className="ticker-content">
            {[...skills, ...skills].map((skill, i) => (
              <span key={i} className="ticker-item">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Section Label */}
        <motion.p
          className="label-mono mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          01 — About
        </motion.p>

        {/* Animated Text */}
        <div className="body-lg leading-[1.8] space-y-8">
          {aboutText.split("\n\n").map((paragraph, pIndex) => (
            <p key={pIndex} className="flex flex-wrap">
              {paragraph.split(" ").map((word, wIndex) => {
                const globalIndex =
                  aboutText
                    .split("\n\n")
                    .slice(0, pIndex)
                    .join(" ")
                    .split(" ").length + wIndex;
                
                return (
                  <WordReveal
                    key={`${pIndex}-${wIndex}`}
                    word={word}
                    index={globalIndex}
                    scrollYProgress={scrollYProgress}
                    totalWords={words.length}
                  />
                );
              })}
            </p>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {[
            { number: "10+", label: "Years Experience" },
            { number: "50+", label: "Projects Shipped" },
            { number: "15+", label: "Happy Clients" },
            { number: "∞", label: "Cups of Coffee" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <span className="heading-lg gradient-text-cobalt">{stat.number}</span>
              <p className="label-mono mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface WordRevealProps {
  word: string;
  index: number;
  scrollYProgress: any;
  totalWords: number;
}

const WordReveal = ({ word, index, scrollYProgress, totalWords }: WordRevealProps) => {
  // Calculate when this word should appear
  const start = 0.1 + (index / totalWords) * 0.5;
  const end = start + 0.05;

  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  const color = useTransform(
    scrollYProgress,
    [start, end],
    ["hsl(240, 2%, 35%)", "hsl(0, 0%, 95%)"]
  );

  return (
    <motion.span
      className="mr-[0.3em] inline-block"
      style={{ opacity, color }}
    >
      {word}
    </motion.span>
  );
};
