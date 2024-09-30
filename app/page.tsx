'use client'

import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaLinkedin, FaProjectDiagram, FaChartLine, FaUsers, FaRocket, FaGlobeAmericas, FaSpaceShuttle } from 'react-icons/fa'
import { SiJira, SiTrello, SiAsana, SiMicrosoft } from 'react-icons/si'
import { useState, useEffect } from 'react'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const floatingAnimation = {
  y: ['-10%', '10%'],
  transition: {
    y: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut'
    }
  }
}

interface Project {
  title: string;
  description: string;
  link: string;
  icon: React.ElementType;
}

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
}

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const projects = [
    {
      title: 'Interstellar E-commerce Expansion',
      description: 'Piloted a cross-galactic team to redesign the UX of a major e-commerce platform, resulting in a 30% surge in conversion rates across multiple star systems.',
      link: 'https://github.com/abdul-abdi/cosmic-ecommerce',
      icon: FaGlobeAmericas,
    },
    {
      title: 'Agile Nebula Transformation',
      description: 'Orchestrated the transition of a 50-person fleet to Agile methodologies, improving project delivery velocities by 40% and team satisfaction by 25 light-years.',
      link: 'https://github.com/abdul-abdi/agile-nebula',
      icon: FaRocket,
    },
    {
      title: 'Quantum Product Launch',
      description: 'Engineered and executed a multi-dimensional launch strategy for a new SaaS product, achieving 150% of the target user acquisition in the first cosmic quarter.',
      link: 'https://github.com/abdul-abdi/quantum-launch',
      icon: FaSpaceShuttle,
    },
    {
      title: 'Galactic Project Dashboard',
      description: 'Crafted a centralized project management dashboard, integrating data from multiple galaxies to provide real-time insights and improve decision-making efficiency.',
      link: 'https://github.com/abdul-abdi/galactic-dashboard',
      icon: FaProjectDiagram,
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)

      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) {
        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const controls = useAnimation()
  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <div className="min-h-screen text-white relative">
      <div className="space-background">
        <div className="star-field">
          {[...Array(200)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                transform: `translateZ(${Math.random() * 1000}px)`,
              }}
            />
          ))}
        </div>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="nebula"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
            }}
          />
        ))}
      </div>
      <div className="content-wrapper">
        <header className="fixed top-0 left-0 right-0 z-50 bg-opacity-90 backdrop-blur-md bg-gray-900 shadow-lg">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <motion.a 
                href="#home"
                className="text-2xl font-bold text-blue-400"
                whileHover={{ scale: 1.05 }}
              >
                AA
              </motion.a>
              <ul className="hidden md:flex space-x-8">
                {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                  <li key={item}>
                    <motion.a 
                      href={`#${item}`} 
                      className={`hover:text-blue-400 transition-colors ${activeSection === item ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : ''}`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </motion.a>
                  </li>
                ))}
              </ul>
              <motion.button
                className="md:hidden text-2xl"
                whileTap={{ scale: 0.95 }}
              >
                ☰
              </motion.button>
            </div>
          </nav>
        </header>

        <div className="fixed left-0 top-0 h-1 bg-blue-500 z-50" style={{ width: `${scrollProgress}%` }}></div>

        <main className="container mx-auto px-6 pt-24">
          <section id="home" className="min-h-screen flex items-center justify-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.h1 
                className="text-7xl font-bold mb-6 text-shadow gradient-text"
                animate={floatingAnimation}
              >
                Abdullahi Abdi
              </motion.h1>
              <p className="text-3xl mb-10 text-blue-300">Cosmic Product & Project Navigator</p>
              <div className="flex justify-center space-x-6 mb-12">
                <SocialLink href="https://github.com/abdul-abdi" icon={FaGithub} />
                <SocialLink href="https://www.linkedin.com/in/abdullahi-abdi" icon={FaLinkedin} />
              </div>
              <motion.a
                href="#about"
                className="cosmic-btn text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Embark on the Cosmic Journey
              </motion.a>
            </motion.div>
          </section>

          <section id="about" ref={ref} className="py-20">
            <motion.div
              initial="hidden"
              animate={controls}
              variants={fadeIn}
              transition={{ duration: 0.8 }}
              className="section-card"
            >
              <h2 className="text-4xl font-bold mb-8 text-center gradient-text">Navigating the Business Cosmos</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg mb-4 leading-relaxed">
                    As a seasoned Cosmic Product and Project Navigator, I&apos;ve charted courses through the vast expanses of business galaxies for over a decade. My expertise in Agile methodologies, strategic planning, and cross-functional leadership has propelled numerous projects to interstellar success.
                  </p>
                  <p className="text-lg leading-relaxed">
                    By harnessing the gravitational pull of data-driven insights and user-centric design, I consistently deliver products that not only meet but exceed expectations, fueling business growth and innovation across the universe of industries.
                  </p>
                </div>
                <div className="flex justify-center">
                  <motion.div 
                    className="w-64 h-64 bg-blue-500 rounded-full flex items-center justify-center text-6xl font-bold"
                    animate={floatingAnimation}
                  >
                    AA
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="skills" className="py-20">
            <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Core Competencies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10">
              {[
                { icon: FaProjectDiagram, name: 'Project Management' },
                { icon: FaChartLine, name: 'Product Strategy' },
                { icon: FaUsers, name: 'Team Leadership' },
                { icon: FaRocket, name: 'Agile Methodologies' },
                { icon: FaSpaceShuttle, name: 'Innovation Management' },
                { icon: FaGlobeAmericas, name: 'Resource Optimization' },
                { icon: SiJira, name: 'Jira' },
                { icon: SiTrello, name: 'Trello' },
                { icon: SiAsana, name: 'Asana' },
                { icon: SiMicrosoft, name: 'MS Project' },
              ].map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </section>

          <section id="projects" className="py-20">
            <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Constellations of Success</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </section>

          <section id="contact" className="py-20">
            <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Initiate Contact</h2>
            <form className="max-w-md mx-auto section-card">
              <InputField label="Name" id="name" type="text" />
              <InputField label="Email" id="email" type="email" />
              <InputField label="Message" id="message" type="textarea" />
              <motion.button 
                type="submit" 
                className="cosmic-btn w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Launch Message
              </motion.button>
            </form>
          </section>
        </main>

        <footer className="bg-gray-900 bg-opacity-80 py-8 mt-20">
          <div className="container mx-auto px-6 text-center">
            <p>&copy; 2024 Abdullahi Abdi. All rights reserved across the cosmos.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

const SocialLink = ({ href, icon: Icon }: { href: string; icon: React.ElementType }) => (
  <motion.a 
    href={href}
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-3xl hover:text-blue-400 transition-colors"
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon />
  </motion.a>
)

interface Skill {
  icon: React.ElementType;
  name: string;
}

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
    whileHover={{ scale: 1.05 }}
  >
    <skill.icon className="text-5xl mb-3 text-blue-400" />
    <span className="text-sm font-medium">{skill.name}</span>
  </motion.div>
)

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
    whileHover={{ scale: 1.03 }}
  >
    <div className="flex items-center mb-4">
      <project.icon className="text-4xl text-blue-400 mr-4" />
      <h3 className="text-xl font-semibold text-blue-300">{project.title}</h3>
    </div>
    <p className="mb-4 text-gray-300">{project.description}</p>
    <motion.a 
      href={project.link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="btn btn-primary inline-block"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      View on GitHub
    </motion.a>
  </motion.div>
)

const InputField = ({ label, id, type }: InputFieldProps) => (
  <div className="mb-6">
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-300">{label}</label>
    {type === 'textarea' ? (
      <textarea id={id} name={id} rows={4} className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent" required />
    ) : (
      <input type={type} id={id} name={id} className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent" required />
    )}
  </div>
)