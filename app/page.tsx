"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Code,
  Globe,
  Server,
  GitBranch,
  Award,
  BookOpen,
  Menu,
  X,
  Heart,
  Coffee,
  Shield,
  Lock,
  Eye,
  Bug,
  ArrowRight,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ContactForm } from "./components/contact-form"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  const skills = {
    frontend: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "JavaScript", level: 95 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Bootstrap", level: 80 },
      { name: "Redux", level: 75 },
      { name: "Vue.js", level: 70 },
    ],
    backend: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "Python", level: 90 },
      { name: "Django", level: 75 },
      { name: "FastAPI", level: 70 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 85 },
      { name: "MySQL", level: 75 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 65 },
    ],
    cybersecurity: [
      { name: "Ethical Hacking", level: 80 },
      { name: "Penetration Testing", level: 75 },
      { name: "Vulnerability Assessment", level: 85 },
      { name: "Network Security", level: 70 },
      { name: "Web Application Security", level: 85 },
      { name: "OWASP Top 10", level: 90 },
      { name: "Burp Suite", level: 80 },
      { name: "Nmap", level: 75 },
      { name: "Metasploit", level: 70 },
      { name: "Wireshark", level: 75 },
      { name: "Kali Linux", level: 80 },
      { name: "SIEM Tools", level: 65 },
    ],
    tools: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 85 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 70 },
      { name: "Vercel", level: 85 },
      { name: "Netlify", level: 80 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 85 },
      { name: "Figma", level: 70 },
      { name: "Linux", level: 80 },
    ],
  }

  const projects = [
    {
      title: "Smart Expense Tracker – Full-Stack",
      description:
        "Smart Expense Tracker is a full-stack web application that helps users seamlessly track, categorize, and visualize their income and expenses. It empowers individuals to manage their personal finances with detailed analytics and modern UI.",
      tech: ["React", "Data Visualization", "Local Storage", "Responsive Design"],
      github: "https://github.com/Abhii8084/smart-expense-tracker",
      live: "https://preview-full-stack-project-ideas-kzmg2550pd4qxnxe5c8o.vusercontent.net/",
      image: "/smart-tracker.png?height=200&width=300",
      type: "Full-Stack + Security",
      featured: true,
    },
    {
      title: "Real-Time Collaborative Task Board",
      description:
        "Real-Time Collaborative Task Board is a full-stack Kanban-style productivity application designed for teams and individuals to manage tasks efficiently. With live updates and collaboration features, multiple users can work together in real-time to organize projects, assign responsibilities, and monitor progress.",
      tech: ["React", "Tailwind CSS", "Zustand/Redux", "Socket.io-client", "React DnD", "Node.js", "Express.js"],
      github: "https://github.com/Abhii8084/project-task-board",
      live: "https://preview-full-stack-project-ideas-kzmk6hyn0bbdczk2zeqg.vusercontent.net/",
      image: "/project-task.png?height=200&width=300",
      type: "Task Management",
      featured: true,
    },
    {
      title: "Smart Recipe Finder – AI-Powered Ingredient-Based Meal Suggestion App",
      description:
        "Smart Recipe Finder is a full-stack web application that helps users discover delicious recipes based on the ingredients they have at home. Designed for convenience and creativity, the app leverages intelligent filtering and optional AI integration to suggest the most relevant recipes instantly.",
      tech: ["React", "Express.js", "MongoDB", "Socket.io", "bcrypt", "JWT"],
      github: "https://github.com/Abhii8084/receipe-finder",
      live: "https://preview-full-stack-project-ideas-kzmow23fhl5evtbbp7c7.vusercontent.net/",
      image: "/receipe-finder.png?height=200&width=300",
      type: "Ingredient-Based Search",
      featured: false,
    },
    {
      title: "Secure Chat Application",
      description:
        "End-to-end encrypted messaging application with perfect forward secrecy, secure key exchange, and message integrity verification.",
      tech: ["Vue.js", "Node.js", "Socket.io", "Crypto-js", "MongoDB"],
      github: "https://github.com/abhishekraj/secure-chat",
      live: "https://secure-chat-demo.vercel.app",
      image: "/placeholder.svg?height=200&width=300",
      type: "Full-Stack + Security",
      featured: false,
    },
  ]

  const education = [
    {
      degree: "Bachelor of Computer Apllications",
      institution: "Ims Noida",
      year: "2020 - 2023",
      grade: "CGPA: 7.5/10",
      specialization: "Cybersecurity & Software Development",
    },
    {
      degree: "High School",
      institution: "A.n College,Patna",
      year: "2016 - 2018",
      grade: "CGPA: 7.5/10",
    },
  ]

  const certifications = [
    { name: "Certified Ethical Hacker (CEH)", icon: "🛡️", status: "In Progress", progress: 75 },
    { name: "CompTIA Security+", icon: "🔒", status: "Planned", progress: 0 },
    { name: "AWS Cloud Practitioner", icon: "☁️", status: "Completed", progress: 100 },
    { name: "OWASP Web Security", icon: "🌐", status: "Completed", progress: 100 },
    { name: "MongoDB Developer Associate", icon: "🍃", status: "Completed", progress: 100 },
    { name: "Google Cloud Digital Leader", icon: "🌐", status: "Completed", progress: 100 },
  ]

  useEffect(() => {
    setIsLoaded(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "education", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-x-hidden">
      {/* Subtle Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-950 to-slate-900/50" />
        <div
          className="absolute w-96 h-96 bg-blue-500/5 rounded-full blur-3xl transition-all duration-700 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-slate-800/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-900/10 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold tracking-tight">
              <span className="text-slate-400">{"<"}</span>
              <span className="text-slate-100">Abhishek</span>
              <span className="text-blue-400">Raj</span>
              <span className="text-slate-400">{"/>"}</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["Home", "About", "Skills", "Projects", "Education", "Contact"].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-all duration-300 relative group ${
                    activeSection === item.toLowerCase() ? "text-blue-400" : "text-slate-400 hover:text-slate-200"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-blue-400 transition-all duration-300 ${
                      activeSection === item.toLowerCase() ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Mobile Navigation Toggle */}
            <button
              className="md:hidden text-slate-400 hover:text-slate-200 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-800/50 animate-in slide-in-from-top duration-300">
              <div className="flex flex-col space-y-4 pt-4">
                {["Home", "About", "Skills", "Projects", "Education", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-left text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4 relative z-10">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div
              className={`relative mb-8 transition-all duration-1000 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {/* <Avatar className="w-32 h-32 mx-auto ring-2 ring-slate-700/50 ring-offset-4 ring-offset-slate-950 transition-all duration-300 hover:ring-blue-400/50">
                <AvatarImage src="/my-pic.png?height=128&width=128" alt="Abhishek Raj" />
                <AvatarFallback className="text-2xl bg-slate-800 text-slate-200">AR</AvatarFallback>
              </Avatar> */}
              <div className="absolute -top-2 -right-2 animate-bounce">
                <div className="w-8 h-8 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-400/30">
                  <Shield className="w-4 h-4 text-blue-400" />
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-300 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-blue-400">
                  Abhishek Raj
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-400 mb-8 leading-relaxed">
                <span className="text-slate-300">Full-Stack Developer</span> &{" "}
                <span className="text-blue-400">Cybersecurity Enthusiast</span>
                <br />
                <span className="text-lg text-slate-500">
                  Passionate about creating secure and scalable web experiences
                </span>
              </p>
            </div>

            <div
              className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-500 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="bg-blue-600 hover:bg-blue-700 text-white border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 group"
              >
                <Shield className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300 hover:scale-105 group bg-transparent"
              >
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Download Resume
              </Button>
            </div>

            <div
              className={`flex justify-center space-x-6 transition-all duration-1000 delay-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Link
                href="https://github.com/Abhii8084"
                className="text-slate-400 hover:text-slate-200 transition-all duration-300 hover:scale-110 group"
              >
                <Github className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/abhishekraj8084/"
                className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 group"
              >
                <Linkedin className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              </Link>
              <Link
                href="mailto:rajabhishek.9499@gmail.com"
                className="text-slate-400 hover:text-slate-200 transition-all duration-300 hover:scale-110 group"
              >
                <Mail className="h-6 w-6 group-hover:rotate-12 transition-transform" />
              </Link>
            </div>

            <div className="mt-16 animate-bounce">
              <ChevronDown className="h-6 w-6 text-slate-500 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-100">
              About <span className="text-blue-400">Me</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-slate-300 leading-relaxed">
                  I'm a passionate <span className="text-blue-400 font-medium">full-stack developer</span> and{" "}
                  <span className="text-slate-200 font-medium">cybersecurity enthusiast</span> with a strong foundation
                  in modern web technologies and security practices. As a recent graduate, I'm eager to contribute to
                  innovative projects while ensuring they're built with security in mind.
                </p>

                <p className="text-lg text-slate-300 leading-relaxed">
                  I enjoy solving complex problems, writing{" "}
                  <span className="text-slate-200 font-medium">secure code</span>, and creating{" "}
                  <span className="text-blue-400 font-medium">user-friendly applications</span> that prioritize both
                  functionality and security. My goal is to work with a team that values innovation, security-first
                  development, and continuous learning.
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    <span className="text-slate-300">Noida</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
                    <Mail className="h-4 w-4 text-blue-400" />
                    <span className="text-slate-300">rajabhishek.9499@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
                    <Phone className="h-4 w-4 text-blue-400" />
                    <span className="text-slate-300">+91 8368273943</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300 hover:scale-105 group">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-400/30 group-hover:bg-blue-500/30 transition-colors">
                        <Shield className="h-5 w-5 text-blue-400" />
                      </div>
                      <span className="text-slate-100">What I Do</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex items-center gap-3 group/item hover:text-slate-200 transition-colors">
                        <Code className="h-4 w-4 text-blue-400 group-hover/item:scale-110 transition-transform" />
                        Full-Stack Web Development
                      </li>
                      <li className="flex items-center gap-3 group/item hover:text-slate-200 transition-colors">
                        <Shield className="h-4 w-4 text-blue-400 group-hover/item:scale-110 transition-transform" />
                        Cybersecurity & Ethical Hacking
                      </li>
                      <li className="flex items-center gap-3 group/item hover:text-slate-200 transition-colors">
                        <Bug className="h-4 w-4 text-blue-400 group-hover/item:scale-110 transition-transform" />
                        Vulnerability Assessment & Penetration Testing
                      </li>
                      <li className="flex items-center gap-3 group/item hover:text-slate-200 transition-colors">
                        <Lock className="h-4 w-4 text-blue-400 group-hover/item:scale-110 transition-transform" />
                        Secure Application Development
                      </li>
                      <li className="flex items-center gap-3 group/item hover:text-slate-200 transition-colors">
                        <Eye className="h-4 w-4 text-blue-400 group-hover/item:scale-110 transition-transform" />
                        Security Auditing & Compliance
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 relative z-10 bg-slate-900/20">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-100">
              Technical <span className="text-blue-400">Skills</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(skills).map(([category, skillList], categoryIndex) => (
                <Card
                  key={category}
                  className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-500 hover:scale-105 group"
                  style={{ animationDelay: `${categoryIndex * 200}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 capitalize">
                      <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-400/30 group-hover:bg-blue-500/30 transition-colors">
                        {category === "frontend" && <Globe className="h-5 w-5 text-blue-400" />}
                        {category === "backend" && <Server className="h-5 w-5 text-blue-400" />}
                        {category === "cybersecurity" && <Shield className="h-5 w-5 text-blue-400" />}
                        {category === "tools" && <GitBranch className="h-5 w-5 text-blue-400" />}
                      </div>
                      <span className="text-slate-100">{category}</span>
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      {category === "frontend" && "User interfaces & experiences"}
                      {category === "backend" && "Server-side development"}
                      {category === "cybersecurity" && "Security & ethical hacking"}
                      {category === "tools" && "Development tools & platforms"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {skillList.map((skill, index) => (
                        <div key={skill.name} className="group/skill">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-slate-300 group-hover/skill:text-slate-200 transition-colors">
                              {skill.name}
                            </span>
                            <span className="text-xs text-slate-500">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-1.5">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-blue-400 h-1.5 rounded-full transition-all duration-1000 ease-out"
                              style={{
                                width: `${skill.level}%`,
                                animationDelay: `${categoryIndex * 200 + index * 100}ms`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-100">
              Featured <span className="text-blue-400">Projects</span>
            </h2>

            {/* Featured Projects */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {projects
                .filter((project) => project.featured)
                .map((project, index) => (
                  <Card
                    key={project.title}
                    className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm overflow-hidden hover:bg-slate-900/70 transition-all duration-500 hover:scale-105 group"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-slate-900/50 group-hover:from-blue-500/20 transition-all duration-500" />
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-blue-500/20 text-blue-400 border border-blue-400/30 backdrop-blur-sm">
                          {project.type}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-slate-100 group-hover:text-white transition-colors">{project.title}</span>
                        <div className="flex gap-2">
                          <Link
                            href={project.github}
                            className="text-slate-400 hover:text-slate-200 transition-all duration-300 hover:scale-125 group/link"
                          >
                            <Github className="h-4 w-4 group-hover/link:rotate-12 transition-transform" />
                          </Link>
                          <Link
                            href={project.live}
                            className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-125 group/link"
                          >
                            <ExternalLink className="h-4 w-4 group-hover/link:rotate-12 transition-transform" />
                          </Link>
                        </div>
                      </CardTitle>
                      <CardDescription className="text-slate-400 group-hover:text-slate-300 transition-colors">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200 hover:border-slate-600 transition-all duration-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* Other Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((project) => !project.featured)
                .map((project, index) => (
                  <Card
                    key={project.title}
                    className="bg-slate-900/30 border-slate-800/30 backdrop-blur-sm overflow-hidden hover:bg-slate-900/50 transition-all duration-300 hover:scale-105 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-slate-900/50 group-hover:from-slate-700/30 transition-all duration-300" />
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-slate-800/50 text-slate-300 border border-slate-700/50 backdrop-blur-sm text-xs">
                          {project.type}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between text-base">
                        <span className="text-slate-200 group-hover:text-white transition-colors">{project.title}</span>
                        <div className="flex gap-1">
                          <Link
                            href={project.github}
                            className="text-slate-500 hover:text-slate-300 transition-all duration-300 hover:scale-110"
                          >
                            <Github className="h-3 w-3" />
                          </Link>
                          <Link
                            href={project.live}
                            className="text-slate-500 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </CardTitle>
                      <CardDescription className="text-slate-400 text-sm line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs border-slate-700/50 text-slate-500 hover:text-slate-300 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.tech.length > 3 && (
                          <Badge variant="outline" className="text-xs border-slate-700/50 text-slate-500">
                            +{project.tech.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 px-4 relative z-10 bg-slate-900/20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-100">
              Education & <span className="text-blue-400">Certifications</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-400/30">
                      <BookOpen className="h-5 w-5 text-blue-400" />
                    </div>
                    <span className="text-slate-100">Education</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {education.map((edu, index) => (
                    <div
                      key={index}
                      className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:bg-slate-800/50 transition-colors"
                    >
                      <h3 className="font-semibold text-slate-100 mb-1">{edu.degree}</h3>
                      <p className="text-slate-300 mb-1">{edu.institution}</p>
                      <p className="text-sm text-slate-400 mb-1">{edu.year}</p>
                      <p className="text-sm font-medium text-blue-400 mb-1">{edu.grade}</p>
                      <p className="text-sm text-slate-400">{edu.specialization}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-400/30">
                      <Award className="h-5 w-5 text-blue-400" />
                    </div>
                    <span className="text-slate-100">Certifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:bg-slate-800/50 transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{cert.icon}</span>
                            <span className="text-slate-300 group-hover:text-slate-200 transition-colors">
                              {cert.name}
                            </span>
                          </div>
                          <Badge
                            className={`text-xs ${
                              cert.status === "Completed"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : cert.status === "In Progress"
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                  : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            }`}
                          >
                            {cert.status}
                          </Badge>
                        </div>
                        {cert.progress > 0 && (
                          <div className="w-full bg-slate-700 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${
                                cert.status === "Completed"
                                  ? "bg-green-500"
                                  : cert.status === "In Progress"
                                    ? "bg-yellow-500"
                                    : "bg-blue-500"
                              }`}
                              style={{
                                width: `${cert.progress}%`,
                                animationDelay: `${index * 200}ms`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-100">
              Get In <span className="text-blue-400">Touch</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-blue-400 animate-pulse" />
                  <span className="text-slate-100">Let's work together!</span>
                </h3>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                  I'm always interested in new opportunities and exciting projects, especially those involving{" "}
                  <span className="text-blue-400 font-medium">cybersecurity</span> and{" "}
                  <span className="text-slate-200 font-medium">full-stack development</span>. Whether you have a
                  question or just want to say hi, feel free to reach out!
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:bg-slate-800/50 transition-all duration-200 group">
                    <Mail className="h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-300">rajabhishek.9499@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:bg-slate-800/50 transition-all duration-200 group">
                    <Phone className="h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-300">+91 8368273943</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:bg-slate-800/50 transition-all duration-200 group">
                    <MapPin className="h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-300">Noida</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-2 text-slate-500">
                  <Coffee className="h-4 w-4" />
                  <span className="text-sm">Powered by coffee, curiosity & cybersecurity</span>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800/50 relative z-10">
        <div className="container mx-auto text-center">
          <p className="text-slate-400 flex items-center justify-center gap-2">
            © {new Date().getFullYear()} Abhishek Raj. Built with{" "}
            <Heart className="h-4 w-4 text-blue-400 animate-pulse" />
            using <span className="text-slate-300 font-medium">Next.js</span> and{" "}
            <span className="text-slate-300 font-medium">Tailwind CSS</span>.
          </p>
        </div>
      </footer>
    </div>
  )
}
