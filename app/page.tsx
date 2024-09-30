'use client'

import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaLinkedin, FaProjectDiagram, FaChartLine, FaUsers, FaClock, FaLightbulb, FaTasks } from 'react-icons/fa'
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

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentProject, setCurrentProject] = useState(0)
  const projects = [
    {
      title: 'E-commerce Platform Overhaul',
      description: 'Led a cross-functional team to redesign and optimize the user experience of a major e-commerce platform, resulting in a 30% increase in conversion rates.',
      link: 'https://github.com/abdul-abdi/ecommerce-project',
      icon: FaChartLine,
    },
    {
      title: 'Agile Transformation Initiative',
      description: 'Spearheaded the transition of a 50-person development team to Agile methodologies, improving project delivery times by 40% and team satisfaction by 25%.',
      link: 'https://github.com/abdul-abdi/agile-transformation',
      icon: FaUsers,
    },
    {
      title: 'Product Launch Strategy',
      description: 'Developed and executed a comprehensive launch strategy for a new SaaS product, achieving 150% of the target user acquisition in the first quarter.',
      link: 'https://github.com/abdul-abdi/product-launch',
      icon: FaLightbulb,
    },
    {
      title: 'Project Management Dashboard',
      description: 'Created a centralized project management dashboard, integrating data from multiple tools to provide real-time insights and improve decision-making efficiency.',
      link: 'https://github.com/abdul-abdi/pm-dashboard',
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

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-blue-900 min-h-screen text-white relative">
      <div className="stars"></div>
      <div className="twinkling"></div>
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
            <p className="text-3xl mb-10 text-blue-300">Product & Project Management Professional</p>
            <div className="flex justify-center space-x-6 mb-12">
              <SocialLink href="https://github.com/abdul-abdi" icon={FaGithub} />
              <SocialLink href="https://www.linkedin.com/in/abdullahi-abdi" icon={FaLinkedin} />
            </div>
            <motion.a
              href="#about"
              className="btn btn-primary text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discover My Expertise
            </motion.a>
          </motion.div>
        </section>

        <section id="about" ref={ref} className="py-20">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={fadeIn}
            transition={{ duration: 0.8 }}
            className="bg-gray-800 p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-4xl font-bold mb-8 text-center gradient-text">About Me</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg mb-4 leading-relaxed">
                  I'm a seasoned Product and Project Management professional with a passion for driving innovation and delivering results. With over 8 years of experience, I specialize in Agile methodologies, strategic planning, and cross-functional team leadership.
                </p>
                <p className="text-lg leading-relaxed">
                  My approach combines data-driven decision making with a keen understanding of user needs, allowing me to consistently deliver products that exceed expectations and drive business growth.
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
              { icon: FaClock, name: 'Agile Methodologies' },
              { icon: FaLightbulb, name: 'Innovation Management' },
              { icon: FaTasks, name: 'Resource Optimization' },
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
          <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Key Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        <section id="contact" className="py-20">
          <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Get in Touch</h2>
          <form className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
            <InputField label="Name" id="name" type="text" />
            <InputField label="Email" id="email" type="email" />
            <InputField label="Message" id="message" type="textarea" />
            <motion.button 
              type="submit" 
              className="btn btn-primary w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 mt-20">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Abdullahi Abdi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

const SocialLink = ({ href, icon: Icon }) => (
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

const SkillCard = ({ skill, index }) => (
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

const ProjectCard = ({ project, index }) => (
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

const InputField = ({ label, id, type }) => (
  <div className="mb-6">
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-300">{label}</label>
    {type === 'textarea' ? (
      <textarea id={id} name={id} rows={4} className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent" required />
    ) : (
      <input type={type} id={id} name={id} className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent" required />
    )}
  </div>
)