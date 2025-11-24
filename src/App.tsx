import React, { useState, useEffect, useRef } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import * as THREE from 'three'; 
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Database, 
  Layout, 
  Smartphone, 
  Terminal,
  Menu,
  X,
  ChevronDown,
  Monitor,
  Server,
  Layers,
  Send,
  Cpu,
  GraduationCap,
  Globe,
  Copy,
  Check,
} from 'lucide-react';

interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  about: string;
}

interface SkillCategory {
  category: string;
  icon: React.ElementType;
  items: string[];
}

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

interface ProjectItem {
  title: string;
  type: string;
  description: string;
  tech: string[];
  link?: string;
  icon: React.ElementType;
  color: string;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// --- Data ---

const personalInfo: PersonalInfo = {
  name: "Dabala Yonas",
  title: "Software Engineer",
  location: "Addis Ababa, Ethiopia",
  email: "dabo.yonasl@gmail.com",
  phone: "+251-910-227-023",
  website: "www.dabala.netlify.app",
  about: "A passionate Software Engineer with a foundation in coding starting at age 14. I specialize in building scalable full-stack applications and intuitive mobile experiences."
};

const skills: SkillCategory[] = [
  { category: "Frontend", icon: Layout, items: ["React.js", "Next.js", "Tailwind CSS", "HTML5/CSS3", "Figma"] },
  { category: "Backend", icon: Server, items: ["Django", "Java", "REST API", "JWT", "Node.js"] },
  { category: "Mobile", icon: Smartphone, items: ["Flutter (Dart)", "Android (Java)", "Cross-Platform"] },
  { category: "Database", icon: Database, items: ["PostgreSQL", "MySQL", "SQLite"] },
  { category: "DevOps & Tools", icon: Terminal, items: ["Git", "GitHub", "Vercel", "Netlify", "Joomla"] }
];

const experience: ExperienceItem[] = [
  {
    company: "SICS IT OUTSOURCING",
    role: "Full-Stack Developer",
    period: "2025 - Present",
    description: "Leading the end-to-end development of enterprise management systems, including a Car Maintenance System and a Car Rental platform."
  },
  {
    company: "Next General Trading",
    role: "Software Developer",
    period: "Jan 2023 - Jan 2025",
    description: "Managed company web presence and internal tools. Developed the official company website and oversaw content strategy."
  },
  {
    company: "A2SV",
    role: "Hackathon Team Lead",
    period: "Apr 2024 - Sep 2024",
    description: "Led diverse teams to build AI-powered agricultural solutions and full-stack web apps, achieving top ranks in competitive hackathons."
  }
];

const projects: ProjectItem[] = [
  {
    title: "Johnny Auto System",
    type: "Management System",
    description: "A complete Car Maintenance & Assembly Management web app. Features inventory tracking, mechanic workflow management, and service history logging.",
    tech: ["React.js", "Django", "PostgreSQL"],
    icon: Layers,
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "SICS Car Rental",
    type: "Admin & Landing",
    description: "A dual-interface platform: A public booking website for customers and a comprehensive admin dashboard for fleet management.",
    tech: ["React.js", "Django", "REST API"],
    icon: Monitor,
    color: "from-emerald-500 to-teal-400"
  },
  {
    title: "Next General Trading",
    type: "Company Website",
    description: "Official corporate website for Next General Trading. Built to showcase services and portfolio with a custom CMS implementation.",
    tech: ["Joomla", "PHP", "CSS3"],
    link: "https://ngtechet.com",
    icon: Globe,
    color: "from-indigo-500 to-purple-400"
  },
  {
    title: "Equb Mobile App",
    type: "FinTech App",
    description: "A digital transformation of the traditional Ethiopian 'Equb' saving circle. Users can securely join circles, pay dues, and track lottery rounds.",
    tech: ["Flutter", "PostgreSQL", "Dart"],
    icon: Smartphone,
    color: "from-pink-500 to-rose-400"
  },
  {
    title: "ASTU ID Maker",
    type: "Android App",
    description: "Native Android application used to automate the design and generation of student identification cards for the university.",
    tech: ["Java", "XML", "Android SDK"],
    icon: Cpu,
    color: "from-amber-500 to-orange-400"
  }
];

// --- Custom Hooks ---

const useOnScreen = (options: IntersectionObserverInit): [React.RefObject<HTMLDivElement>, boolean] => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [ref, options]);

  return [ref as React.RefObject<HTMLDivElement>, isVisible];
};

// --- Components ---

const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    
    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // Objects
    const geometry = new THREE.IcosahedronGeometry(2.5, 1);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x2dd4bf, // Teal-400
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const coreGeometry = new THREE.OctahedronGeometry(1, 0);
    const coreMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x60a5fa, // Blue-400
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 700;
    const posArray = new Float32Array(particleCount * 3);

    for(let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.5,
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;
    sphere.position.x = 1.5;
    core.position.x = 1.5;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: globalThis.MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    const handleResize = () => {
        if (!mount) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        if(window.innerWidth < 768) {
            sphere.position.x = 0;
            core.position.x = 0;
            sphere.scale.set(0.7, 0.7, 0.7);
        } else {
            sphere.position.x = 1.5;
            core.position.x = 1.5;
            sphere.scale.set(1, 1, 1);
        }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      const targetX = mouseX * 0.5;
      const targetY = mouseY * 0.5;

      sphere.rotation.y += 0.002;
      sphere.rotation.x += 0.001;
      sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y) * 0.05;
      sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x) * 0.05;

      core.rotation.y -= 0.005;
      core.rotation.x -= 0.005;

      sphere.position.y = Math.sin(elapsedTime * 0.5) * 0.1;
      core.position.y = Math.sin(elapsedTime * 0.5) * 0.1;

      particlesMesh.rotation.y = -elapsedTime * 0.05;
      particlesMesh.rotation.x = mouseY * 0.1;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  // Typecasting ref to allow it to be passed to div
  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={`relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(45, 212, 191, 0.1), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => (
  <a 
    href={href} 
    onClick={(e) => {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      if (onClick) onClick();
    }}
    className="relative px-3 py-2 text-slate-300 hover:text-teal-400 transition-colors duration-300 group overflow-hidden cursor-pointer"
  >
    <span className="relative z-10">{children}</span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
  </a>
);

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-teal-400 transition-all"
      title="Copy to clipboard"
    >
      {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
    </button>
  );
};

const ProjectCard: React.FC<{ project: ProjectItem }> = ({ project }) => {
  const Icon = project.icon;
  return (
    <ScrollReveal>
      <SpotlightCard className="h-full group hover:border-teal-500/30 transition-all duration-500 hover:-translate-y-1 flex flex-col">
        <div className={`h-1.5 w-full bg-gradient-to-r ${project.color}`}></div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-slate-800 text-teal-400 group-hover:text-white group-hover:bg-teal-500 transition-colors duration-300">
              <Icon size={24} />
            </div>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-teal-400 transition-colors">
                <ExternalLink size={20} />
              </a>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-teal-400 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((t, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/50">
                {t}
              </span>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </ScrollReveal>
  );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Form State
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Construct mailto link
    const mailtoLink = `mailto:dabo.yonasl@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    window.location.href = mailtoLink;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans selection:bg-teal-500/30 selection:text-teal-200 overflow-x-hidden">
      
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0B1120]/90 backdrop-blur-xl border-b border-slate-800/50 shadow-lg' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
          <a href="#" className="text-2xl font-bold tracking-tighter group z-50">
            <span className="text-teal-400 group-hover:text-white transition-colors">D</span>
            <span className="text-slate-100">Y</span>
            <span className="text-teal-500 animate-pulse">.</span>
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#projects">Work</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#education">Education</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-100 p-2 z-50 hover:text-teal-400 transition-colors">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Positioned outside nav for proper full-screen stacking */}
      <div className={`fixed inset-0 bg-[#0B1120] z-40 flex flex-col justify-center items-center gap-8 text-xl transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <a href="#skills" onClick={() => setIsMenuOpen(false)} className="hover:text-teal-400">Skills</a>
        <a href="#projects" onClick={() => setIsMenuOpen(false)} className="hover:text-teal-400">Work</a>
        <a href="#experience" onClick={() => setIsMenuOpen(false)} className="hover:text-teal-400">Experience</a>
        <a href="#education" onClick={() => setIsMenuOpen(false)} className="hover:text-teal-400">Education</a>
        <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-teal-400">Contact</a>
      </div>

      {/* Hero Section with 3D Background */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
        {/* 3D Canvas Injection */}
        <ThreeBackground />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10 w-full pointer-events-none">
          <div className="space-y-8 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-mono animate-in slide-in-from-left-10 fade-in duration-700 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              Available for Hire
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none animate-in slide-in-from-left-10 fade-in duration-700 delay-100 drop-shadow-xl">
              Crafting Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 filter drop-shadow-lg">Solutions.</span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed animate-in slide-in-from-left-10 fade-in duration-700 delay-200 bg-[#0B1120]/30 backdrop-blur-sm rounded p-2 -ml-2">
              Hello! I'm <span className="text-teal-400 font-semibold">{personalInfo.name}</span>. 
              I build accessible, pixel-perfect, and performant web & mobile applications that solve real-world problems.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-in slide-in-from-bottom-10 fade-in duration-700 delay-300">
              <a href="#projects" className="px-8 py-4 bg-teal-500 text-slate-900 font-bold rounded-lg hover:bg-teal-400 transition-all hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] hover:-translate-y-1 flex items-center gap-2">
                View Projects <ChevronDown size={18} />
              </a>
              <a href="#contact" className="px-8 py-4 bg-slate-800/80 backdrop-blur text-slate-200 font-bold rounded-lg border border-slate-700 hover:border-teal-500/50 hover:bg-slate-800 transition-all hover:-translate-y-1">
                Contact Me
              </a>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500 z-20">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative z-10 bg-[#0B1120]">
        <div className="max-w-6xl mx-auto px-6">
           <h2 className="text-4xl font-bold text-white mb-12 flex items-center gap-3">
             <span className="text-teal-400">01.</span> Technical Skills
             <div className="h-px bg-slate-800 flex-grow ml-4"></div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <ScrollReveal key={index}>
                  <SpotlightCard className="p-6 h-full hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-slate-800/50 text-teal-400 ring-1 ring-white/10">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white">{skill.category}</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      {skill.items.map((item, i) => (
                         <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-300 hover:border-teal-500/50 hover:text-teal-400 transition-colors cursor-default">
                           <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                           {item}
                         </div>
                      ))}
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 relative z-10 bg-[#0F1629]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
             <h2 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-teal-400">02.</span> Featured Projects
            </h2>
            <p className="text-slate-400 max-w-xl">A collection of applications I've designed and developed, ranging from enterprise ERPs to mobile utilities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 bg-[#0F1629]/50 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-16 flex items-center gap-3">
             <span className="text-teal-400">03.</span> Experience
          </h2>
          
          <div className="relative space-y-12 border-l-2 border-slate-800 ml-3 md:ml-6 pl-8 md:pl-10 pb-4">
            {experience.map((job, index) => (
              <ScrollReveal key={index} className="relative group">
                <div className="absolute -left-[41px] md:-left-[49px] top-1 w-5 h-5 rounded-full bg-[#0B1120] border-4 border-teal-500 group-hover:scale-110 transition-all duration-300 z-10"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-2xl font-bold text-white group-hover:text-teal-400 transition-colors">{job.company}</h3>
                  <span className="font-mono text-teal-500 text-sm bg-teal-500/10 px-3 py-1 rounded-full">{job.period}</span>
                </div>
                
                <h4 className="text-lg text-slate-300 mb-4 font-medium flex items-center gap-2">
                  {job.role}
                </h4>
                
                <p className="text-slate-400 leading-relaxed max-w-3xl">
                  {job.description}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 relative z-10 bg-[#0B1120]">
        <div className="max-w-4xl mx-auto px-6">
           <h2 className="text-4xl font-bold text-white mb-12 flex items-center gap-3">
             <span className="text-teal-400">04.</span> Education
          </h2>

          <ScrollReveal>
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-1 rounded-2xl">
              <div className="bg-[#0B1120] p-8 rounded-xl border border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 text-teal-500 pointer-events-none">
                  <GraduationCap size={200} />
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Adama Science and Technology University</h3>
                    <p className="text-xl text-teal-400 font-medium mb-2">Bachelor of Science in Software Engineering</p>
                    <p className="text-slate-500 flex items-center gap-2">
                      <MapPin size={16} /> Adama, Ethiopia
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-3xl font-bold text-slate-200">2025</span>
                    <span className="text-sm text-slate-500 uppercase tracking-wider">Graduation Year</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative z-10 bg-[#0F1629]/30">
        <div className="max-w-6xl mx-auto px-6">
           <h2 className="text-4xl font-bold text-white mb-12 flex items-center gap-3">
             <span className="text-teal-400">05.</span> Get In Touch
          </h2>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <ScrollReveal>
              <div className="space-y-8">
                <p className="text-slate-400 text-lg leading-relaxed">
                  I am currently open to new opportunities. Whether you have a question about my stack, want to collaborate on a project, or just want to say hi, my inbox is always open!
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-teal-500/50 transition-colors group">
                    <div className="p-3 bg-slate-800 rounded-lg text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-900 transition-all">
                      <Mail size={24} />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm text-slate-500">Email</p>
                      <a href={`mailto:${personalInfo.email}`} className="text-slate-200 font-medium hover:text-teal-400 transition-colors">{personalInfo.email}</a>
                    </div>
                    <CopyButton text={personalInfo.email} />
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-teal-500/50 transition-colors group">
                    <div className="p-3 bg-slate-800 rounded-lg text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-900 transition-all">
                      <Phone size={24} />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm text-slate-500">Phone</p>
                      <a href={`tel:${personalInfo.phone}`} className="text-slate-200 font-medium hover:text-teal-400 transition-colors">{personalInfo.phone}</a>
                    </div>
                    <CopyButton text={personalInfo.phone} />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <a target='_blank' href="https://github.com/dabalayonas" className="p-3 bg-slate-800 rounded-lg text-slate-400 hover:bg-teal-500 hover:text-white transition-all transform hover:-translate-y-1">
                    <Github size={24} />
                  </a>
                  <a href="#" className="p-3 bg-slate-800 rounded-lg text-slate-400 hover:bg-teal-500 hover:text-white transition-all transform hover:-translate-y-1">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal className="lg:delay-200">
              <form className="space-y-6 bg-[#0F1629] p-8 rounded-2xl border border-slate-800 shadow-2xl" onSubmit={handleSendMessage}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400 font-medium">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all" 
                      placeholder="Roba Asefa"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400 font-medium">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all" 
                      placeholder="roba@example.com"
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-slate-400 font-medium">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all" 
                    placeholder="Project Collaboration"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-slate-400 font-medium">Message</label>
                  <textarea 
                    name="message"
                    rows={4} 
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all" 
                    placeholder="Hi, I'd like to talk about..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="w-full py-4 bg-teal-500 text-slate-900 font-bold rounded-lg hover:bg-teal-400 transition-all hover:shadow-lg hover:shadow-teal-500/20 flex items-center justify-center gap-2">
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-600 text-sm bg-[#060913] border-t border-slate-900/50">
        <p className="font-mono hover:text-teal-500 transition-colors cursor-default">
          Designed & Built by {personalInfo.name} © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default App;