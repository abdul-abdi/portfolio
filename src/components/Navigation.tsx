import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" },
];

// Custom SVG Logo Component
const Logo = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 hover:scale-110"
  >
    {/* Outer geometric frame */}
    <path
      d="M20 2L38 11V29L20 38L2 29V11L20 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      className="text-foreground/30"
    />
    {/* Inner hexagon accent */}
    <path
      d="M20 8L32 14.5V27.5L20 34L8 27.5V14.5L20 8Z"
      stroke="url(#logoGradient)"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Stylized "A" */}
    <path
      d="M20 12L28 28H24L22.5 24.5H17.5L16 28H12L20 12Z"
      fill="currentColor"
      className="text-foreground"
    />
    {/* Inner triangle cutout for "A" */}
    <path
      d="M20 17L22 22H18L20 17Z"
      fill="hsl(var(--background))"
    />
    {/* Accent dot */}
    <circle
      cx="32"
      cy="20"
      r="2"
      fill="url(#logoGradient)"
    />
    {/* Gradient definition */}
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(224, 100%, 59%)" />
        <stop offset="100%" stopColor="hsl(224, 60%, 45%)" />
      </linearGradient>
    </defs>
  </svg>
);

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10, 10, 10, 0)", "rgba(10, 10, 10, 0.8)"]
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(20px)"]
  );

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{ backgroundColor, backdropFilter: backdropBlur }}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Logo />
          </motion.a>

          {/* Desktop Links */}
          <motion.div
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="label-mono hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary py-2 px-6 text-xs">
              Let's Talk
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 z-40 bg-background md:hidden"
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="heading-lg hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                y: isOpen ? 0 : 20,
              }}
              transition={{ delay: isOpen ? i * 0.1 : 0 }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            className="btn-primary mt-8"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : 20,
            }}
            transition={{ delay: isOpen ? 0.3 : 0 }}
          >
            Let's Talk
          </motion.a>
        </div>
      </motion.div>
    </>
  );
};
