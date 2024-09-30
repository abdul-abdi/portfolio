'use client'

import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaLinkedin, FaProjectDiagram, FaChartLine, FaUsers, FaRocket, FaCubes, FaCode, FaEnvelope, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { SiJira, SiTrello, SiAsana, SiNotion, SiSlack, SiConfluence } from 'react-icons/si'
import { useState, useEffect, useCallback } from 'react'

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

const CosmicGame = () => {
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [stars, setStars] = useState<{ id: number; x: number; y: number }[]>([])

  const addStar = useCallback(() => {
    const newStar = {
      id: Date.now(),
      x: Math.random() * 100,
      y: Math.random() * 100,
    }
    setStars(prevStars => [...prevStars, newStar])
  }, [])

  const removeStar = useCallback((id: number) => {
    setStars(prevStars => prevStars.filter(star => star.id !== id))
  }, [])

  const handleClick = (id: number) => {
    if (!gameOver) {
      setScore(prevScore => prevScore + 1)
      removeStar(id)
      addStar()
      if (score + 1 >= 20) {
        setGameOver(true)
      }
    }
  }

  const resetGame = () => {
    setScore(0)
    setGameOver(false)
    setStars([])
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver && stars.length < 5) {
        addStar()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [addStar, gameOver, stars.length])

  return (
    <div className="text-center">
      <h3 className="text-2xl font-semibold mb-4 gradient-text">Cosmic Star Catcher</h3>
      <p className="mb-4">Catch the stars before they disappear!</p>
      <div className="relative w-64 h-64 mx-auto bg-gray-800 rounded-lg overflow-hidden">
        {stars.map(star => (
          <motion.div
            key={star.id}
            className="absolute text-2xl cursor-pointer"
            style={{ top: `${star.y}%`, left: `${star.x}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => handleClick(star.id)}
          >
            ⭐
          </motion.div>
        ))}
      </div>
      <p className="text-xl my-4">Score: {score}</p>
      {gameOver && (
        <motion.button
          className="cosmic-btn"
          onClick={resetGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Play Again
        </motion.button>
      )}
    </div>
  )
}

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const projects = [
    {
      title: 'Agile Transformation Initiative',
      description: 'Led a company-wide agile transformation, resulting in a 30% increase in project delivery speed and improved team satisfaction.',
      link: 'https://github.com/abdul-abdi/agile-transformation',
      icon: FaRocket,
    },
    {
      title: 'Blockchain-based Supply Chain Solution',
      description: 'Managed the development of a blockchain solution for supply chain transparency, reducing disputes by 40% and improving traceability.',
      link: 'https://github.com/abdul-abdi/blockchain-supply-chain',
      icon: FaCubes,
    },
    {
      title: 'Cross-functional Team Leadership',
      description: 'Successfully led a cross-functional team of 15 members to deliver a complex web3 project, meeting all deadlines and exceeding client expectations.',
      link: 'https://github.com/abdul-abdi/web3-project-management',
      icon: FaUsers,
    },
    {
      title: 'Product Strategy for DeFi Platform',
      description: 'Developed and executed a product strategy for a DeFi platform, resulting in a 200% increase in user adoption within six months.',
      link: 'https://github.com/abdul-abdi/defi-product-strategy',
      icon: FaChartLine,
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
      setIsScrolled(window.scrollY > 50)

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
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const controls = useAnimation()
  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <div className="relative min-h-screen">
      <div className="star-background">
        <div className="star-field">
          {[...Array(500)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <div
              key={`constellation-${i}`}
              className="constellation"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 6}s`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="content-wrapper">
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900 bg-opacity-90' : 'bg-transparent'}`}>
          <nav className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <motion.a 
                href="#home"
                className="text-2xl font-bold text-blue-400 logo-text"
                whileHover={{ scale: 1.05 }}
              >
                AA
              </motion.a>
              <ul className="hidden md:flex space-x-8">
                {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                  <li key={item}>
                    <motion.a 
                      href={`#${item}`} 
                      className={`hover:text-blue-400 transition-colors nav-link ${activeSection === item ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : ''}`}
                      whileHover={{ y: -2, color: "#60a5fa" }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Navigate to ${item} section`}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </motion.a>
                  </li>
                ))}
              </ul>
              <motion.button
                className="md:hidden text-2xl"
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                ☰
              </motion.button>
            </div>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="md:hidden mt-4"
              >
                <ul className="flex flex-col space-y-4">
                  {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                    <li key={item}>
                      <motion.a 
                        href={`#${item}`} 
                        className={`block hover:text-blue-400 transition-colors nav-link ${activeSection === item ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : ''}`}
                        whileHover={{ x: 5, color: "#60a5fa" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label={`Navigate to ${item} section`}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
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
              <p className="text-3xl mb-10 text-blue-300">Project Manager & Blockchain Enthusiast</p>
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
                Explore My Journey
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
              <h2 className="text-4xl font-bold mb-8 text-center gradient-text">Bridging Tech and Management</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg mb-4 leading-relaxed">
                    Hello! I&apos;m Abdullahi, a project manager with a strong background in software engineering, specializing in blockchain and web development. With over 8 years of experience, I&apos;ve found my passion in bridging the gap between cutting-edge technology and effective project management.
                  </p>
                  <p className="text-lg mb-4 leading-relaxed">
                    My journey began in software development, where I honed my skills in blockchain and web technologies. This technical foundation has been invaluable in my transition to project management, allowing me to lead teams with a deep understanding of the challenges and opportunities in tech projects.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Currently, I&apos;m expanding my horizons by studying product management, aiming to blend my technical expertise with strategic product thinking. I&apos;m excited about creating innovative solutions that not only meet technical requirements but also deliver real value to users and businesses.
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
            <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Skill Constellation</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10">
              {[
                { icon: FaProjectDiagram, name: 'Project Management' },
                { icon: FaChartLine, name: 'Product Strategy' },
                { icon: FaUsers, name: 'Team Leadership' },
                { icon: FaRocket, name: 'Agile Methodologies' },
                { icon: FaCubes, name: 'Blockchain Development' },
                { icon: FaCode, name: 'Web Development' },
                { icon: SiJira, name: 'Jira' },
                { icon: SiTrello, name: 'Trello' },
                { icon: SiAsana, name: 'Asana' },
                { icon: SiNotion, name: 'Notion' }, // Replaced Microsoft Project with Notion
                { icon: SiSlack, name: 'Slack' },
                { icon: SiConfluence, name: 'Confluence' },
              ].map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </section>

          <section id="projects" className="py-20">
            <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Project Milestones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </section>

          <section id="interests" className="py-20">
            <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Beyond the Project Board</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="section-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaChartLine className="text-5xl mb-4 text-blue-400 mx-auto" />
                <h3 className="text-2xl font-semibold mb-2 text-center">Product Management Aspirant</h3>
                <p className="text-center">
                  Currently diving deep into product management studies, aiming to combine my technical background with strategic product thinking to create innovative blockchain solutions.
                </p>
              </motion.div>
              <motion.div 
                className="section-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaRocket className="text-5xl mb-4 text-blue-400 mx-auto" />
                <h3 className="text-2xl font-semibold mb-2 text-center">Emerging Tech Enthusiast</h3>
                <p className="text-center">
                  Passionate about staying at the forefront of technology. Always exploring new developments in blockchain, AI, and IoT to envision how they can revolutionize project management and product development.
                </p>
              </motion.div>
            </div>
          </section>

          <section id="contact" className="py-20">
            <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Initiate Contact</h2>
            <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
              <div className="w-full md:w-1/2">
                <motion.div 
                  className="section-card h-full"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <CosmicGame />
                </motion.div>
              </div>
              <div className="w-full md:w-1/2">
                <motion.div 
                  className="section-card h-full"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-semibold mb-6 gradient-text">Cosmic Communication Portal</h3>
                  <div className="flex items-center mb-6">
                    <FaMapMarkerAlt className="text-2xl text-blue-400 mr-2" />
                    <span className="text-lg">Nairobi, Kenya</span>
                  </div>
                  <div className="space-y-6">
                    <CosmicContactOption
                      icon={FaEnvelope}
                      title="Subspace Email"
                      description="Send a message through the digital cosmos"
                      action="Abdullahiabdi1233@gmail.com"
                    />
                    <CosmicContactOption
                      icon={FaLinkedin}
                      title="Professional Nebula"
                      description="Connect in the LinkedIn galaxy"
                      action="https://www.linkedin.com/in/abdullahi-abdi"
                    />
                    <CosmicContactOption
                      icon={FaGithub}
                      title="Code Repository"
                      description="Explore my digital constellations"
                      action="https://github.com/abdul-abdi"
                    />
                    <CosmicContactOption
                      icon={FaCalendarAlt}
                      title="Schedule a Cosmic Meeting"
                      description="Book a time slot in my interstellar calendar"
                      action="https://calendly.com/abdullahiabdi1233/one-on-one"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-gray-900 bg-opacity-80 py-8 mt-20">
          <div className="container mx-auto px-6 text-center">
            <p>&copy; 2024 Abdullahi Abdi. Bridging project management and blockchain innovation.</p>
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
    whileHover={{ scale: 1.05, rotate: 5 }}
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
    whileHover={{ scale: 1.03, rotateY: 5 }}
  >
    <div className="flex items-center mb-4">
      <project.icon className="text-4xl text-blue-400 mr-4" />
      <h3 className="text-xl font-semibold text-blue-300">{project.title}</h3>
    </div>
    <p className="mb-4 text-gray-300">{project.description}</p>
    <motion.button 
      className="cosmic-btn"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Learn More
    </motion.button>
  </motion.div>
)

const CosmicContactOption = ({ icon: Icon, title, description, action }: { icon: React.ElementType, title: string, description: string, action: string }) => (
  <motion.div 
    className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg transition-all duration-300 hover:bg-gray-700"
    whileHover={{ scale: 1.05, rotate: 1 }}
  >
    <div className="flex-shrink-0">
      <Icon className="text-3xl text-blue-400" />
    </div>
    <div className="flex-grow">
      <h4 className="text-lg font-semibold text-blue-300">{title}</h4>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
    <motion.a
      href={action.startsWith('http') ? action : `mailto:${action}`}
      target="_blank"
      rel="noopener noreferrer"
      className="cosmic-btn text-sm px-4 py-2"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      Connect
    </motion.a>
  </motion.div>
)