import { useState, useEffect, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import AOS from 'aos';
import { certificates } from './certificatesData';
import { projects } from './projectsData';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [certModalData, setCertModalData] = useState<{
    isOpen: boolean;
    title: string;
    issuer: string;
    credentialId: string;
    filename: string;
    folder: string;
  }>({
    isOpen: false,
    title: '',
    issuer: '',
    credentialId: '',
    filename: '',
    folder: 'certificates',
  });
  const [certFilter, setCertFilter] = useState('all');
  const [certSearch, setCertSearch] = useState('');

  // Typing effect refs - must be at component level, not inside useEffect
  const titleIdx = useRef(0);
  const charIdx = useRef(0);
  const isDeleting = useRef(false);

  // Initialize AOS and typing effect
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      disable: 'mobile', // Disable AOS on mobile to ensure all content is visible
    });

    // Typing effect
    const subTitlesArr = [
      "AI/ML Researcher",
      "Deep Learning Engineer",
      "Computer Science Student",
      "Python Specialist"
    ];

    let timeoutId: ReturnType<typeof setTimeout>;

    function typeEffect() {
      const currentText = subTitlesArr[titleIdx.current];

      if (isDeleting.current) {
        charIdx.current--;
        setTypedText(currentText.substring(0, charIdx.current));
      } else {
        charIdx.current++;
        setTypedText(currentText.substring(0, charIdx.current));
      }

      let speed = isDeleting.current ? 40 : 100;

      if (!isDeleting.current && charIdx.current === currentText.length) {
        speed = 2200;
        isDeleting.current = true;
      } else if (isDeleting.current && charIdx.current === 0) {
        isDeleting.current = false;
        titleIdx.current = (titleIdx.current + 1) % subTitlesArr.length;
        speed = 400;
      }

      timeoutId = setTimeout(typeEffect, speed);
    }

    timeoutId = setTimeout(typeEffect, 800);
    return () => clearTimeout(timeoutId);
  }, []);

  // Sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        if (window.scrollY > 20) {
          navbar.classList.add('bg-dark-950/95', 'shadow-2xl', 'py-1', 'border-white/10');
          navbar.classList.remove('bg-dark-950/80');
        } else {
          navbar.classList.remove('bg-dark-950/95', 'shadow-2xl', 'py-1', 'border-white/10');
          navbar.classList.add('bg-dark-950/80');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && certModalData.isOpen) {
        closeCertificateModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [certModalData.isOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openCertificateModal = (title: string, issuer: string, period: string, credentialId: string, filename: string, folder: string = 'certificates') => {
    setCertModalData({
      isOpen: true,
      title,
      issuer,
      credentialId,
      filename,
      folder,
    });
    document.body.classList.add('overflow-hidden');
  };

  const closeCertificateModal = () => {
    setCertModalData({
      ...certModalData,
      isOpen: false,
    });
    document.body.classList.remove('overflow-hidden');
  };

  const filterCertifications = (category: string) => {
    setCertFilter(category);
  };

  const handleCertSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertSearch(e.target.value.toLowerCase().trim());
    setCertFilter('all');
  };

  return (
    <div className="bg-dark-950 text-gray-200 font-sans relative antialiased leading-relaxed">
      {/* Glowing Background Mesh */}
      <div className="glow-mesh">
        <div className="glow-orb-1"></div>
        <div className="glow-orb-2"></div>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-dark-950/80 backdrop-blur-md border-b border-white/5 transition duration-300" id="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center">
              <a href="#home" className="font-display font-extrabold text-xl tracking-wide bg-gradient-to-r from-brand-400 to-brand-accent bg-clip-text text-transparent hover:opacity-95 transition">
                FATAHILLAH
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 sm:space-x-2">
              <a href="#home" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition">Home</a>
              <a href="#experience" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition">Experience</a>
              <a href="#skills" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition">Skills</a>
              <a href="#certificates" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition">Certificates</a>
              <a href="#projects" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition">Projects</a>
              <a href="#contact" className="px-4 py-2 ml-2 rounded-lg text-sm font-semibold bg-brand-500 hover:bg-brand-600 text-white transition-all shadow-md shadow-brand-500/10">Get In Touch</a>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none transition"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <LucideIcons.X className="w-6 h-6" />
                ) : (
                  <LucideIcons.Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-dark-900 border-b border-white/5" id="mobile-menu">
            <div className="px-2 pt-2 pb-4 space-y-1">
              <a href="#home" onClick={closeMobileMenu} className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition font-medium">Home</a>
              <a href="#experience" onClick={closeMobileMenu} className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition font-medium">Experience</a>
              <a href="#skills" onClick={closeMobileMenu} className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition font-medium">Skills</a>
              <a href="#certificates" onClick={closeMobileMenu} className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition font-medium">Certificates</a>
              <a href="#projects" onClick={closeMobileMenu} className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition font-medium">Projects</a>
              <a href="#contact" onClick={closeMobileMenu} className="block px-4 py-3 mt-2 rounded-lg text-center font-semibold bg-brand-500 hover:bg-brand-600 text-white transition">Get In Touch</a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-3 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl w-full text-center relative z-10 overflow-hidden" data-aos="fade-up" data-aos-duration="1000">
          {/* Accent Pill */}
          <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-semibold rounded-full bg-brand-900/40 text-brand-200 border border-brand-500/20 shadow-sm shadow-brand-500/5 max-w-full">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0"></span>
            <span className="truncate">Available for Opportunities & Collaborations</span>
          </span>

          {/* Full Name */}
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-tight mb-3 sm:mb-4 px-4 break-words">
            Nuruddin Sulthon Syah Fatahillah Rahmani
          </h1>

          {/* Nickname / Moniker Badge */}
          <p className="text-sm font-semibold tracking-wider text-brand-accent font-mono mb-4 sm:mb-6">
            KNOW AS <span className="underline decoration-wavy underline-offset-4 text-white">LEANDERS</span>
          </p>

          {/* Animated Typing Title */}
          <div className="h-12 sm:h-14 md:h-16 lg:h-20 flex items-center justify-center mb-4 sm:mb-6 px-4 w-full">
            <h2 className="font-display font-bold text-base sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 text-center break-words max-w-full">
              <span className="border-r-2 border-brand-400 pr-1 select-none animate-pulse">{typedText}</span>
            </h2>
          </div>

          {/* Tagline / Bio */}
          <p className="text-xs sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-4">
            Final-year Computer Science student at <span className="text-white hover:text-brand-accent transition">Universitas Nusa Cendana</span> (Kupang, Indonesia) specializing in Deep Learning, NLP, and Computer Vision. Dedicated to turning state-of-the-art AI research into tangible, high-performance web applications.
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <a href="#projects" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold bg-white text-dark-900 duration-300 hover:bg-gray-100 ring-2 ring-white/10 shadow-lg flex items-center justify-center gap-2 hover:translate-y-[-2px] transition text-sm sm:text-base">
              View Projects
              <LucideIcons.ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold bg-dark-800 hover:bg-dark-700 hover:border-white/10 transition border border-white/5 text-white flex items-center justify-center gap-2 hover:translate-y-[-2px] text-sm sm:text-base">
              Contact Me
              <LucideIcons.Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative bg-dark-900/30">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-block text-xs font-mono tracking-widest text-brand-400 uppercase mb-2">My Journey</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">Work Experience</h2>
            <div className="h-1 w-12 bg-brand-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Custom Timeline Layout */}
          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-[2px] before:bg-white/5 before:pointer-events-none">

            {/* Experience Card 1 (Google Cloud Arcade Facilitator) */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between group" data-aos="fade-up">
              {/* Timeline Node dot */}
              <div className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full bg-brand-500 border-4 border-dark-950 -translate-x-1.5 sm:-translate-x-2 group-hover:scale-125 group-hover:bg-brand-accent transition duration-300 z-10"></div>

              <div className="w-full sm:w-[46%] pl-12 sm:pl-0 sm:text-right order-2 sm:order-1 sm:pr-8">
                <span className="inline-block px-2.5 py-1 text-xs font-mono rounded bg-brand-900/30 text-brand-200 border border-brand-500/10 mb-2">Internship</span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white">Google Cloud Arcade Facilitator</h3>
                <p className="text-xs sm:text-sm font-mono text-gray-500 mb-2">Google Cloud Skills Boost • Sep 2025 (1 month)</p>
                <p className="text-xs font-semibold text-brand-accent mb-3 sm:justify-end flex items-center gap-1">
                  <LucideIcons.MapPin className="w-3.5 h-3.5" /> Indonesia, Remote
                </p>
              </div>

              <div className="w-full sm:w-[46%] pl-12 sm:pl-8 order-3 sm:order-2 mt-2 sm:mt-0">
                <div className="glass-card p-5 sm:p-6 rounded-2xl">
                  <p className="text-sm text-gray-400 mb-4 text-justify leading-relaxed">
                    Selected as Official Facilitator for Google Cloud Arcade Indonesia 2025, a cloud computing learning program by Google Cloud in collaboration with Dicoding Indonesia. Responsibilities include helping participants understand GCA materials, inviting participants via referral code, providing guidance in completing challenges, and collaborating with 299+ facilitators across Indonesia.
                  </p>
                  <div className="flex flex-wrap gap-1.5 select-none">
                    <span className="px-2 py-0.5 text-xs font-mono rounded-lg bg-white/5 border border-white/5 text-gray-300">Google Cloud Platform (GCP)</span>
                    <span className="px-2 py-0.5 text-xs font-mono rounded-lg bg-white/5 border border-white/5 text-gray-300">Cloud Computing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Card 2 (Machine Learning Specialist) */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between group" data-aos="fade-up" data-aos-delay="100">
              <div className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full bg-brand-500 border-4 border-dark-950 -translate-x-1.5 sm:-translate-x-2 group-hover:scale-125 group-hover:bg-brand-accent transition duration-300 z-10"></div>

              <div className="w-full sm:w-[46%] pl-12 sm:pl-8 order-3 sm:order-1">
                <div className="glass-card p-5 sm:p-6 rounded-2xl">
                  <p className="text-sm text-gray-400 mb-4 text-justify leading-relaxed">
                    Intensive training program (900+ hours) covering Supervised & Unsupervised Learning, Deep Learning with TensorFlow, NLP, Computer Vision, Model Deployment on GCP, Feature Engineering, and Capstone Project development across ML, Mobile Development, and Cloud Computing learning paths.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    <span className="px-2 py-0.5 text-xs font-mono rounded-lg bg-white/5 border border-white/5 text-gray-200">TensorFlow</span>
                    <span className="px-2 py-0.5 text-xs font-mono rounded-lg bg-white/5 border border-white/5 text-gray-200">Deep Learning</span>
                    <span className="px-2 py-0.5 text-xs font-mono rounded-lg bg-white/5 border border-white/5 text-gray-200">NLP</span>
                    <span className="px-2 py-0.5 text-xs font-mono rounded-lg bg-white/5 border border-white/5 text-gray-200">Computer Vision</span>
                    <span className="px-2 py-0.5 text-xs font-mono rounded-lg bg-white/5 border border-white/5 text-gray-200">GCP</span>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-[46%] pl-12 sm:pl-0 order-2 sm:order-2">
                <span className="inline-block px-2.5 py-1 text-xs font-mono rounded bg-brand-900/30 text-brand-200 border border-brand-500/10 mb-2">Internship</span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white">Machine Learning Specialist</h3>
                <p className="text-xs sm:text-sm font-mono text-gray-500 mb-1">Bangkit Academy (Google, Gojek, Tokopedia, Traveloka)</p>
                <p className="text-xs sm:text-sm font-mono text-gray-500 mb-2">Feb 2024 to Jul 2024 (6 months)</p>
                <p className="text-xs font-semibold text-brand-accent mb-3 flex items-center gap-1">
                  <LucideIcons.MapPin className="w-3.5 h-3.5" /> Indonesia, Remote
                </p>
              </div>
            </div>

            {/* Experience Card 3 (Kementerian Pendidikan dan Kebudayaan BPMP NTT) */}
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between group" data-aos="fade-up" data-aos-delay="200">
              <div className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full bg-brand-500 border-4 border-dark-950 -translate-x-1.5 sm:-translate-x-2 group-hover:scale-125 group-hover:bg-brand-accent transition duration-300 z-10"></div>

              <div className="w-full sm:w-[46%] pl-12 sm:pl-0 sm:text-right order-2 sm:order-1 sm:pr-8">
                <span className="inline-block px-2.5 py-1 text-xs font-mono rounded bg-brand-900/30 text-brand-200 border border-brand-500/10 mb-2">Internship</span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white">Intern at Seksi FPMP</h3>
                <p className="text-xs sm:text-sm font-mono text-gray-500 mb-1">Kementerian Pendidikan dan Kebudayaan (BPMP NTT)</p>
                <p className="text-xs sm:text-sm font-mono text-gray-500 mb-2">Jul 2020 to Nov 2020 (5 months)</p>
                <p className="text-xs font-semibold text-brand-accent mb-3 sm:justify-end flex items-center gap-1">
                  <LucideIcons.MapPin className="w-3.5 h-3.5" /> Kupang, NTT, On-site
                </p>
              </div>

              <div className="w-full sm:w-[46%] pl-12 sm:pl-8 order-3 sm:order-2">
                <div className="glass-card p-5 sm:p-6 rounded-2xl">
                  <p className="text-sm text-gray-400 mb-4 text-justify leading-relaxed">
                    Placed at BPMP East Nusa Tenggara Province. Responsibilities include collecting and analyzing education quality data from districts across NTT, preparing data-based reports, participating in program evaluation and monitoring, and coordinating with functional and structural staff.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    <span className="px-2 py-0.5 text-xs font-mono rounded-lg bg-white/5 border border-white/5 text-gray-200">Data Analysis</span>
                    <span className="px-2 py-0.5 text-xs font-mono rounded-lg bg-white/5 border border-white/5 text-gray-200">Microsoft Excel</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-block text-xs font-mono tracking-widest text-brand-400 uppercase mb-2">My Toolkit</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">Skills & Specializations</h2>
            <div className="h-1 w-12 bg-brand-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">

            {/* Category 1: AI/ML */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl" data-aos="fade-up">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mb-6">
                <LucideIcons.BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-4">AI / Machine Learning</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span> TensorFlow
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span> PyTorch
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span> Scikit-learn
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span> Deep Learning
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span> Natural Language Processing (NLP)
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span> Computer Vision
                </li>
              </ul>
            </div>

            {/* Category 2: Programming */}
            <div className="glass-card p-6 sm:p-8 rounded-xl" data-aos="fade-up" data-aos-delay="100">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mb-6">
                <LucideIcons.CodeXml className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-4">Programming</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span> Python
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span> JavaScript (ES6+)
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span> SQL
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span> HTML5 / CSS3
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span> Shell Scripting
                </li>
              </ul>
            </div>

            {/* Category 3: Cloud & DevOps */}
            <div className="glass-card p-6 sm:p-8 rounded-xl" data-aos="fade-up" data-aos-delay="200">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mb-6">
                <LucideIcons.Cloud className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-4">Cloud & DevOps</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span> Google Cloud Platform (GCP)
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span> Git & GitHub Actions
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span> Linux Administration
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span> CI/CD Workflows
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span> Model Deployment
                </li>
              </ul>
            </div>

            {/* Category 4: Data */}
            <div className="glass-card p-6 sm:p-8 rounded-xl" data-aos="fade-up" data-aos-delay="300">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mb-6">
                <LucideIcons.Database className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-4">Data Analytics</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span> Data Analysis
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span> Feature Engineering
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span> Model Evaluation
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span> Pandas & NumPy
                </li>
                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span> Tableau & BI Tooling
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* LICENSES & CERTIFICATIONS SECTION */}
      <section id="certificates" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-dark-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <div className="inline-block text-xs font-mono tracking-widest text-brand-400 uppercase mb-2">My Qualifications</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">Licenses & Certifications</h2>
            <div className="h-1 w-12 bg-brand-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Filter Controls & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/5 max-w-5xl mx-auto" data-aos="fade-up">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 select-none scrollbar-thin">
              <button
                onClick={() => filterCertifications('all')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg cursor-pointer hover:bg-white/15 duration-300 border border-white/5 ${certFilter === 'all' ? 'bg-white/10 text-white' : 'bg-white/5 text-gray-400'}`}
              >
                All ({certificates.length})
              </button>
              <button
                onClick={() => filterCertifications('aiml')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg cursor-pointer hover:bg-white/10 duration-300 border border-white/5 ${certFilter === 'aiml' ? 'bg-white/10 text-white' : 'bg-white/5 text-gray-400'}`}
              >
                AI / ML ({certificates.filter(c => c.tags.includes('aiml')).length})
              </button>
              <button
                onClick={() => filterCertifications('prog')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg cursor-pointer hover:bg-white/10 duration-300 border border-white/5 ${certFilter === 'prog' ? 'bg-white/10 text-white' : 'bg-white/5 text-gray-400'}`}
              >
                Programming & SQL ({certificates.filter(c => c.tags.includes('prog')).length})
              </button>
              <button
                onClick={() => filterCertifications('data')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg cursor-pointer hover:bg-white/10 duration-300 border border-white/5 ${certFilter === 'data' ? 'bg-white/10 text-white' : 'bg-white/5 text-gray-400'}`}
              >
                Data & Automation ({certificates.filter(c => c.tags.includes('data')).length})
              </button>
              <button
                onClick={() => filterCertifications('specialization')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg cursor-pointer hover:bg-white/10 duration-300 border border-white/5 ${certFilter === 'specialization' ? 'bg-white/10 text-white' : 'bg-white/5 text-gray-400'}`}
              >
                Specializations ({certificates.filter(c => c.tags.includes('specialization')).length})
              </button>
            </div>

            <div className="relative w-full md:w-72">
              <LucideIcons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={certSearch}
                onChange={handleCertSearch}
                placeholder="Search certifications..."
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-dark-900 border border-white/10 focus:border-brand-500 focus:outline-none text-sm text-white placeholder-gray-500 transition-all font-sans"
              />
            </div>
          </div>

          {/* Certifications Cards Grid - Dynamic from certificatesData.ts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates
              .filter(cert => {
                // Filter by category
                if (certFilter !== 'all' && !cert.tags.includes(certFilter)) {
                  return false;
                }
                // Filter by search
                if (certSearch) {
                  const searchLower = certSearch.toLowerCase();
                  return (
                    cert.title.toLowerCase().includes(searchLower) ||
                    cert.issuer.toLowerCase().includes(searchLower)
                  );
                }
                return true;
              })
              .map((cert) => {
                // Get icon component dynamically
                const IconComponent = (LucideIcons as any)[cert.icon] || LucideIcons.Award;

                // Get icon color class
                const iconColorClasses: Record<string, string> = {
                  purple: 'bg-purple-500/10 border-purple-500/25 text-purple-400',
                  yellow: 'bg-yellow-400/10 border-yellow-400/20 text-yellow-500',
                  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
                  brand: 'bg-brand-500/10 border-brand-500/20 text-brand-400',
                  pink: 'bg-pink-500/10 border-pink-500/20 text-pink-500',
                  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
                  red: 'bg-red-500/10 border-red-500/20 text-red-500',
                  indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
                  amber: 'bg-amber-500/10 border-amber-500/20 text-amber-500',
                  orange: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
                };

                return (
                  <div
                    key={cert.id}
                    className="glass-card p-6 rounded-2xl flex flex-col justify-between group h-full"
                    data-aos="fade-up"
                    data-aos-delay={cert.delay || 0}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 border rounded-lg ${iconColorClasses[cert.iconColor] || iconColorClasses.brand}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-gray-400">
                          ID: {cert.credentialId}
                        </span>
                      </div>
                      <h3 className="font-display font-medium text-white mb-2 group-hover:text-brand-400 duration-300 line-clamp-2">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium mb-1 flex items-center gap-1.5">
                        <LucideIcons.Award className="w-3.5 h-3.5 text-brand-accent" /> {cert.issuer}
                      </p>
                      <p className="text-xs font-mono text-gray-500 mb-4">{cert.period}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                      <button
                        onClick={() => openCertificateModal(cert.title, cert.issuer, cert.period, cert.credentialId, cert.filename)}
                        className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-brand-500 hover:text-white hover:border-brand-500 border border-white/10 text-xs font-semibold text-gray-300 text-center cursor-pointer transition"
                      >
                        View Certificate
                      </button>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-white/5 hover:bg-brand-accent/20 border border-white/10 text-gray-300 hover:text-brand-accent duration-200"
                          title="Show Credential"
                        >
                          <LucideIcons.ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>


      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-block text-xs font-mono tracking-widest text-brand-400 uppercase mb-2">
              My Work
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Featured Projects
            </h2>
            <div className="h-1 w-12 bg-brand-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group"
                data-aos="fade-up"
                data-aos-delay={project.delay || 0}
              >
                {/* Project Image/Thumbnail */}
                <div className="relative h-48 bg-dark-900 border-b border-white/5 overflow-hidden">
                  <img
                    src={`/projects/${encodeURIComponent(project.image)}`}
                    alt={project.title}
                    className="w-full h-full object-cover scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="absolute inset-0 bg-gradient-to-br from-brand-900/10 to-brand-accent/5 opacity-50"></div>
                          <div class="absolute inset-0 flex items-center justify-center p-6 text-center">
                            <p class="font-display font-bold text-lg text-white/70 tracking-wide leading-relaxed">${project.title.split(' ').slice(0, 3).join(' ')}</p>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-3 group-hover:text-brand-400 transition duration-300 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-sm text-brand-300 mb-4 leading-relaxed font-medium">
                      {project.subtitle}
                    </p>
                    <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 text-[10px] sm:text-xs font-mono rounded bg-white/5 border border-white/5 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-brand-500 hover:text-white hover:border-brand-500 border border-white/10 text-xs font-bold text-gray-200 text-center duration-300 flex items-center justify-center gap-1.5"
                      >
                        <LucideIcons.Github className="w-4 h-4" />
                        GitHub
                      </a>
                    ) : (
                      <div className="flex-1 py-2.5 rounded-lg bg-dark-700 border border-white/5 text-xs font-bold text-gray-400 text-center cursor-not-allowed flex items-center justify-center gap-1.5">
                        <LucideIcons.Github className="w-4 h-4" />
                        GitHub
                      </div>
                    )}

                    {project.liveDemoUrl ? (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white border border-brand-500 text-xs font-bold text-center duration-300 flex items-center justify-center gap-1.5"
                      >
                        <LucideIcons.Play className="w-4 h-4" />
                        Live Demo
                      </a>
                    ) : (
                      <div className="flex-1 py-2.5 rounded-lg bg-dark-700 hover:bg-dark-600 border border-white/5 text-xs font-bold text-gray-400 hover:text-white text-center duration-300 flex items-center justify-center gap-1.5 cursor-not-allowed">
                        <LucideIcons.Play className="w-4 h-4" />
                        Live Demo
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-dark-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-block text-xs font-mono tracking-widest text-brand-400 uppercase mb-2">Get Connected</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">Let's Work Together</h2>
            <div className="h-1 w-12 bg-brand-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Left: Info Cards */}
            <div className="lg:col-span-2 space-y-6" data-aos="fade-right">
              <h3 className="font-display font-bold text-xl text-white">Contact Details</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Have any project ideas, research papers, or internships to discuss? Drop me a line directly through email or connect with me via Github/LinkedIn!
              </p>

              {/* Card: Email */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-900 border border-white/5 hover:border-brand-500/30 duration-300">
                <div className="p-3 rounded-lg bg-brand-500/10 text-brand-400">
                  <LucideIcons.Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono tracking-wider text-gray-500 uppercase">Direct Email</span>
                  <a href="mailto:sultanfatahillah57@gmail.com" className="text-sm font-semibold text-gray-200 hover:text-brand-accent transition">sultanfatahillah57@gmail.com</a>
                </div>
              </div>

              {/* Card: Github */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-900 border border-white/5 hover:border-brand-500/30 duration-300">
                <div className="p-3 rounded-lg bg-brand-500/10 text-brand-400">
                  <LucideIcons.Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono tracking-wider text-gray-500 uppercase">GitHub Profile</span>
                  <a href="https://github.com/f4tahitsYours" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gray-200 hover:text-brand-accent transition">github.com/f4tahitsYours</a>
                </div>
              </div>

              {/* Card: LinkedIn */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-900 border border-white/5 hover:border-brand-500/30 duration-300">
                <div className="p-3 rounded-lg bg-brand-500/10 text-brand-400">
                  <LucideIcons.Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono tracking-wider text-gray-500 uppercase">LinkedIn</span>
                  <a href="https://www.linkedin.com/in/nuruddin-sulthon-syah-fatahillah-rahmani-35765829b/?locale=in" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gray-200 hover:text-brand-accent transition">Nuruddin Sulthon Syah Fatahillah Rahmani</a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-3 glass-card p-6 sm:p-8 rounded-2xl" data-aos="fade-left">
              <h3 className="font-display font-bold text-xl text-white mb-6">Send a Message</h3>

              <form
                action="https://formspree.io/f/xojbedqw"
                method="POST"
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-gray-400 mb-2 uppercase">
                      Your Name
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-sm text-white focus:border-brand-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-gray-400 mb-2 uppercase">
                      Email Address
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="johndoe@gmail.com"
                      className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-sm text-white focus:border-brand-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-mono text-gray-400 mb-2 uppercase">
                    Subject
                  </label>

                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="Research proposal / job opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-sm text-white focus:border-brand-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-gray-400 mb-2 uppercase">
                    Your Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Hi Leanders, I would love to talk about..."
                    className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-sm text-white focus:border-brand-500 focus:outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl transition shadow-lg shadow-brand-500/20 duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Send Message
                  <LucideIcons.Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 text-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-display font-semibold text-sm tracking-widest text-white/90 mb-4">&copy; 2026 NURUDDIN SULTHON SYAH FATAHILLAH RAHMANI</p>
          <p className="text-xs text-gray-500 font-mono">
            Built with React, TypeScript, Tailwind CSS, and AOS.js. Ready for deployment.
          </p>
          <p className="text-[10px] text-gray-600 font-mono mt-1">
            Also known as <span className="text-gray-400 font-semibold">Leanders</span> • Universitas Nusa Cendana, Indonesia
          </p>
        </div>
      </footer>

      {/* CERTIFICATE MODAL */}
      {certModalData.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/90 backdrop-blur-md transition-opacity duration-300"
          onClick={closeCertificateModal}
        >
          <div
            className="relative w-full max-w-lg bg-dark-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/5 bg-dark-950">
              <div>
                <span className="text-[10px] font-mono text-brand-400 uppercase tracking-wider">{certModalData.issuer}</span>
                <h3 className="font-display font-bold text-base sm:text-lg text-white leading-tight">{certModalData.title}</h3>
              </div>
              <button onClick={closeCertificateModal} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 duration-200 cursor-pointer">
                <LucideIcons.X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 bg-dark-900 relative">
              {/* PDF Preview */}
              <div className="w-full aspect-[4/3] bg-dark-800 rounded-xl overflow-hidden border border-white/5 mb-4">
                <iframe
                  src={`/${certModalData.folder}/${encodeURIComponent(certModalData.filename)}`}
                  className="w-full h-full"
                  title={certModalData.title}
                />
              </div>

              {/* Certificate Info */}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-brand-400">
                  <LucideIcons.ShieldCheck className="w-5 h-5" />
                  <p className="text-xs font-mono">Credential ID: {certModalData.credentialId || 'N/A'}</p>
                </div>
                <p className="text-xs text-gray-400">
                  Click "Download PDF" below to save the certificate to your device.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-4 sm:p-6 border-t border-white/5 bg-dark-950">
              <button onClick={closeCertificateModal} className="px-4 py-2 text-xs font-semibold hover:bg-white/5 border border-white/10 text-gray-400 hover:text-white duration-200 rounded-lg cursor-pointer">
                Close Panel
              </button>
              <a
                href={`/${certModalData.folder}/${encodeURIComponent(certModalData.filename)}`}
                download
                className="px-4 py-2 text-xs font-semibold bg-brand-500 hover:bg-brand-600 text-white duration-200 rounded-lg shadow-md shadow-brand-500/10 flex items-center gap-1.5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LucideIcons.Download className="w-3.5 h-3.5" /> Download PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
