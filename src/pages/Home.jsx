import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  FileText,
  Layout,
  Lock,
  Menu,
  PenLine,
  Play,
  Target,
  UploadCloud,
  X,
  Zap,
  Star,
  ChevronDown,
  FileEdit,
  FileCheck,
  MessageSquare,
  Award,
  ArrowUpRight,
} from 'lucide-react';
import CoverLetterGenie from '../components/landing/CoverLetterGenie';
import { getCareerSenseUsage } from '../services/careerSensePoints';
import { useStore } from '../store/useStore';
import { templateCount } from '../components/templates/templateCatalog';
import { SignedIn, SignedOut, SignInButton, useAuth, useUser } from '@clerk/clerk-react';
import CustomUserButton from '../components/common/CustomUserButton';
import { motion, AnimatePresence } from 'framer-motion';
const coverLetterVideo = 'https://d7exlrhix3get.cloudfront.net/CoverLetter.mp4';
import BlueLogo from '../assets/logos/BlueGray.png';
import heroBackground from '../assets/hero.png';
import TrustedCompanies from '../components/landing/TrustedCompanies';

const coverLetterCareerTools = [
  {
    name: 'AI Resume Builder',
    desc: 'Craft ATS-friendly resumes in minutes',
    href: 'https://resume.careersenseai.com/',
    icon: FileEdit,
    badge: 'Popular',
  },
  {
    name: 'ATS Score Checker',
    desc: 'Analyze & optimize resume keyword match',
    href: 'https://ats.careersenseai.com/',
    icon: FileCheck,
    badge: 'AI Powered',
  },
  {
    name: 'Interview Simulator',
    desc: 'Practice realistic AI voice & chat interviews',
    href: 'https://careersenseai.com/interview-simulator',
    icon: MessageSquare,
  },
  {
    name: 'Skill Certification',
    desc: 'Validate skills & earn verifiable certificates',
    href: 'https://certifi.careersenseai.com/',
    icon: Award,
  },
];

const AnimatedHeroBackground = lazy(() => import('../components/landing/AnimatedHeroBackground'));
const CoverLetterAssistant = lazy(() => import('../components/landing/CoverLetterAssistant'));
const BeforeAfterTransformation = lazy(() => import('../components/landing/BeforeAfterTransformation'));
const CoverLetterAnatomy = lazy(() => import('../components/landing/CoverLetterAnatomy'));
const FinalCTA = lazy(() => import('../components/landing/FinalCTA'));
const Footer = lazy(() => import('../components/landing/Footer'));
const Testimonial = lazy(() => import('../components/landing/Testimonial'));
const TemplateShowcase = lazy(() =>
  import('../components/templates/TemplateGallery').then((module) => ({
    default: module.TemplateShowcase,
  }))
);

const methods = [
  {
    mode: 'scratch',
    icon: PenLine,
    title: 'Build from Scratch',
    label: 'Free',
    text: 'Open the editor, write manually, and use professional formatting tools.',
  },
  {
    mode: 'resume',
    icon: UploadCloud,
    title: 'Resume Based Letter',
    label: 'Cora AI',
    text: 'Cora AI analyzes your resume and creates a strong general cover letter.',
  },
  {
    mode: 'resume-job',
    icon: Target,
    title: 'Job-Specific Calibration',
    label: 'Best match',
    text: 'Cora AI matches your resume to a role and writes a tailored letter.',
  },
];

const heroStats = [
  { icon: Zap, value: `${templateCount}`, label: 'Templates' },
  { icon: FileText, value: 'A4', label: 'Preview' },
  { icon: Target, value: '3', label: 'ways to start' },
  { icon: Brain, value: 'ATS', label: 'Friendly' },
];

const HERO_WORDS = ['Smarter', 'Faster', 'Sharper'];

const Home = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [subData, setSubData] = useState({ plan: 'free', tokensRemaining: 30000 });
  const resetBuilder = useStore((state) => state.resetBuilder);
  const setCreationMode = useStore((state) => state.setCreationMode);
  const setGeneratedLetter = useStore((state) => state.setGeneratedLetter);
  const setStep = useStore((state) => state.setStep);
  const savedLetters = useStore((state) => state.savedLetters);
  const [usage, setUsage] = useState(() => getCareerSenseUsage(savedLetters));
  const [heroWordIdx, setHeroWordIdx] = useState(0);
  const [heroWordVisible, setHeroWordVisible] = useState(true);
  const [scrollShade, setScrollShade] = useState(0);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    const fetchSub = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_BASE_URL || 'https://server.datasenseai.com';
        const res = await fetch(`${apiBase}/careersense/subscription/status?clerkId=${user.id}`);
        const data = await res.json();
        if (data.success) {
          setSubData({ plan: data.plan || 'free', tokensRemaining: data.tokensRemaining ?? 30000 });
        }
      } catch (err) {
        console.error('Error fetching subscription status in Home:', err);
      }
    };
    fetchSub();
  }, [user?.id]);

  useEffect(() => {
    const refreshUsage = () => setUsage(getCareerSenseUsage(savedLetters));
    setUsage(getCareerSenseUsage(savedLetters));
    window.addEventListener('storage', refreshUsage);
    window.addEventListener('focus', refreshUsage);
    return () => {
      window.removeEventListener('storage', refreshUsage);
      window.removeEventListener('focus', refreshUsage);
    };
  }, [savedLetters]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroWordVisible(false);
      window.setTimeout(() => {
        setHeroWordIdx((current) => (current + 1) % HERO_WORDS.length);
        setHeroWordVisible(true);
      }, 350);
    }, 2600);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let frame = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setScrollShade(0.18);
      return undefined;
    }

    const updateShade = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(window.scrollY / maxScroll, 1);
      setScrollShade(progress);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateShade);
    };

    updateShade();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const landingShadeStyle = {
    '--shade-sky': `rgba(200, 217, 230, ${0.28 + scrollShade * 0.28})`,
    '--shade-teal': `rgba(86, 124, 141, ${0.06 + scrollShade * 0.14})`,
    '--shade-paper': `rgba(245, 239, 235, ${0.9 - scrollShade * 0.18})`,
    '--shade-progress': `${Math.max(scrollShade * 100, 4)}%`,
    '--scroll-drift': `${scrollShade * -72}px`,
    '--scroll-soft-drift': `${scrollShade * 42}px`,
  };

  const openBuilderStart = () => {
    resetBuilder();
    navigate('/builder');
  };

  const startBuilderForMode = (mode) => {
    resetBuilder();
    setCreationMode(mode);
    if (mode === 'scratch') {
      setGeneratedLetter(getScratchLetter());
    }
    setStep(1);
    navigate('/builder');
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = Array.from(document.querySelectorAll('[data-scroll-reveal]'));

    if (reducedMotion) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.16 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F5EFEB] font-sans text-slate-950" style={landingShadeStyle}>
      <LandingBackdrop />

      <header className="relative z-50 w-full border-b border-white/10 bg-[#082B45]/95 text-white shadow-[0_10px_30px_rgba(3,22,36,0.22)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1600px] min-h-16 flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-8 sm:py-3">
          <button onClick={() => navigate('/')} className="flex items-center gap-3">
            <img src={BlueLogo} alt="CareerSense Logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-2xl shadow-xs shrink-0" />
            <div className="text-left">
              <h1 className="text-[25px] font-black leading-none tracking-[-0.04em]">
                <span className="text-[#F5EFEB]">Career</span><span className="text-[#E3BA5E]">Sense</span>
              </h1>
              <p className="mt-1 text-[9px] font-black uppercase tracking-[0.28em] text-[#AFC7D5]">
                Executive Letters
              </p>
            </div>
          </button>

          <nav className="hidden items-center gap-6 text-sm font-extrabold text-[#D6E3EA] lg:flex" aria-label="Landing">
            <div className="relative" ref={toolsRef}>
              <button
                type="button"
                onClick={() => setToolsOpen((prev) => !prev)}
                className="flex items-center gap-1.5 transition hover:text-white"
                aria-expanded={toolsOpen}
              >
                <span>Career Tools</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${toolsOpen ? 'rotate-180 text-[#E3BA5E]' : ''}`}
                />
              </button>

              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.16 }}
                    style={{ backgroundColor: '#082B45' }}
                    className="absolute left-0 top-full mt-3 w-80 rounded-2xl border border-white/15 p-2.5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50"
                  >
                    <div className="mb-2 px-2.5 pt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8EAABF]">
                      AI Career Suite
                    </div>
                    <div className="space-y-1">
                      {coverLetterCareerTools.map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <a
                            key={tool.name}
                            href={tool.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setToolsOpen(false)}
                            className="group flex items-center justify-between gap-3 rounded-xl p-2.5 transition hover:bg-white/[0.08]"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-[#E3BA5E] group-hover:bg-[#E3BA5E] group-hover:text-[#082B45] transition">
                                <Icon size={18} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[13px] font-bold text-white group-hover:text-[#E3BA5E] transition">
                                    {tool.name}
                                  </span>
                                  {tool.badge && (
                                    <span className="rounded-full bg-[#E3BA5E]/20 px-2 py-0.5 text-[9px] font-bold text-[#E3BA5E]">
                                      {tool.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] font-medium text-[#9BB5C6]">
                                  {tool.desc}
                                </p>
                              </div>
                            </div>
                            <ArrowUpRight
                              size={14}
                              className="text-[#9BB5C6] opacity-0 transition group-hover:opacity-100 group-hover:text-white"
                            />
                          </a>
                        );
                      })}
                    </div>
                    <div className="mt-2 border-t border-white/10 pt-2">
                      <a
                        href="https://careersenseai.com/#career-tools"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setToolsOpen(false)}
                        className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-[#E3BA5E] hover:bg-white/[0.06] transition"
                      >
                        <span>Explore all career tools</span>
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#methods" className="transition hover:text-white">Build Options</a>
            <a href="#cover-letter-questions" className="transition hover:text-white"> Ai</a>
            <a href="#anatomy" className="transition hover:text-white">Letter Guide</a>
            <a href="#templates" className="transition hover:text-white">Templates</a>
            <a href="#testimonials" className="transition hover:text-white">Reviews</a>
          </nav>

          <div className="flex items-center gap-2">
            <SignedIn>
              <div className="hidden flex-1 items-center justify-end gap-2 sm:flex-none md:flex">
                <div className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.07] px-3 py-1.5 shadow-2xs">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 text-amber-500 shrink-0">
                    <Star className="h-3.5 w-3.5" fill="currentColor" />
                  </div>
                  <div className="flex flex-col text-left leading-none">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#AFC4D1] leading-tight">AI Tokens Remaining</p>
                    <p className="mt-0.5 text-xs font-black leading-none text-white">{(subData.tokensRemaining ?? 30000).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.07] px-3 py-1.5 shadow-2xs">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shrink-0">
                    <span className="text-xs font-black">$</span>
                  </div>
                  <div className="flex flex-col text-left leading-none">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#AFC4D1] leading-tight">Bill</p>
                    <p className="mt-0.5 text-xs font-black leading-none text-white">{formatUsd(usage.totalBillUsd)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex h-9 shrink-0 items-center gap-2 rounded-xl bg-[#E3BA5E] px-4 text-xs font-bold text-[#082B45] shadow-2xs transition-all hover:bg-[#EDC974] active:scale-95"
                >
                  Dashboard
                </button>
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="inline-flex h-9 items-center justify-center rounded-xl bg-[#E3BA5E] px-5 text-xs font-bold text-[#082B45] shadow-2xs transition hover:bg-[#EDC974]">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-2">
                <CustomUserButton />
              </div>
            </SignedIn>
            <button
              type="button"
              onClick={() => setIsMobileNavOpen((current) => !current)}
              aria-label={isMobileNavOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.09] text-white shadow-2xs transition hover:bg-white/[0.15] md:hidden"
            >
              {isMobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {isMobileNavOpen && (
          <div className="border-t border-white/10 px-4 pb-4 pt-3 sm:px-8 lg:hidden">
            <nav className="grid gap-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#D6E3EA]" aria-label="Landing Mobile">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
                <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8EAABF]">
                  Career Tools
                </p>
                <div className="mt-1 space-y-1">
                  {coverLetterCareerTools.map((tool) => (
                    <a
                      key={tool.name}
                      href={tool.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileNavOpen(false)}
                      className="flex items-center justify-between rounded-md px-2.5 py-2 text-[12px] font-semibold text-white hover:bg-white/10 transition"
                    >
                      <span className="flex items-center gap-2">
                        <tool.icon size={15} className="text-[#E3BA5E]" />
                        {tool.name}
                      </span>
                      <ArrowUpRight size={13} className="text-[#9BB5C6]" />
                    </a>
                  ))}
                  <a
                    href="https://careersenseai.com/#career-tools"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileNavOpen(false)}
                    className="flex items-center justify-between border-t border-white/10 px-2.5 pt-2 text-[11px] font-bold text-[#E3BA5E]"
                  >
                    <span>Explore all tools</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>

              <a href="#methods" onClick={() => setIsMobileNavOpen(false)} className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 transition hover:bg-white/[0.12] hover:text-white">Build Options</a>
              <a href="#cover-letter-questions" onClick={() => setIsMobileNavOpen(false)} className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 transition hover:bg-white/[0.12] hover:text-white"> Ai</a>
              <a href="#anatomy" onClick={() => setIsMobileNavOpen(false)} className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 transition hover:bg-white/[0.12] hover:text-white">Letter Guide</a>
              <a href="#templates" onClick={() => setIsMobileNavOpen(false)} className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 transition hover:bg-white/[0.12] hover:text-white">Templates</a>
              <a href="#testimonials" onClick={() => setIsMobileNavOpen(false)} className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 transition hover:bg-white/[0.12] hover:text-white">Reviews</a>
              <SignedOut>
                <SignInButton mode="modal">
                  <button onClick={() => setIsMobileNavOpen(false)} className="w-full rounded-lg bg-[#E3BA5E] px-3 py-2.5 text-center text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#082B45] transition hover:bg-[#EDC974]">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </nav>
            <SignedIn>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <UsagePill
                  label="AI Tokens Remaining"
                  value={(subData.tokensRemaining ?? 30000).toLocaleString()}
                  mobile
                />
                <UsagePill
                  label="Total Bill"
                  value={formatUsd(usage.totalBillUsd)}
                  mobile
                />
              </div>
            </SignedIn>
          </div>
        )}
      </header>

      <main className="relative z-10 flex w-full flex-col gap-0 overflow-x-clip">
        <section
  className="
    relative isolate overflow-hidden bg-[#F6EFE4]
    lg:h-[calc(100dvh-82px)]
    lg:min-h-0
  "
  data-scroll-reveal
  data-hero-section
>
  {/* =========================================================
      HERO BACKGROUND
      ========================================================= */}
  <img
    src={heroBackground}
    alt=""
    aria-hidden="true"
    className="
      absolute inset-0
      h-full w-full
      object-cover
      object-center
    "
  />

  {/* Stronger readability wash on left */}
  <div
    className="
      absolute inset-0
      bg-[linear-gradient(
        90deg,
        rgba(248,241,230,0.99)_0%,
        rgba(248,241,230,0.97)_31%,
        rgba(248,241,230,0.84)_46%,
        rgba(248,241,230,0.30)_61%,
        rgba(248,241,230,0.03)_78%
      )]
    "
  />

  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.02),rgba(247,240,229,.10)_70%,rgba(247,240,229,.20))]" />

  <div
    className="
      relative z-10 mx-auto
      grid w-full max-w-[1580px]
      gap-8 px-5 py-8
      sm:px-8
      lg:h-full
      lg:grid-cols-[0.92fr_1.08fr]
      lg:items-center
      lg:px-12
      lg:py-5
      xl:px-16
    "
  >
    {/* =========================================================
        LEFT
        ========================================================= */}
    <div className="max-w-[660px] lg:translate-y-[clamp(32px,4.5vh,48px)]">

      {/* Eyebrow */}
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-7 bg-[#BA8125]" />

        <p className="text-[10px] font-black uppercase tracking-[0.29em] text-[#A56F1D]">
          Executive Cover Letter Builder
        </p>
      </div>

      {/* Main headline */}
      <h1
        className="
          max-w-[620px]
          font-serif
          text-[clamp(46px,6.2vh,66px)]
          font-semibold
          leading-[0.97]
          tracking-[-0.045em]
          text-[#102D47]
        "
      >
        Letters for serious
        <br />
        applications.
      </h1>

      {/* Existing animated words — kept */}
      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-bold text-[#587488]">
        <span>Build</span>

        <span
          style={{
            display: 'inline-block',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
            opacity: heroWordVisible ? 1 : 0,
            transform: heroWordVisible
              ? 'translateY(0px)'
              : 'translateY(-7px)',
          }}
          className="text-[#A56F1D]"
        >
          {HERO_WORDS[heroWordIdx]}
        </span>

        <span>with CareerSense intelligence.</span>
      </div>

      {/* Description */}
      <p
        className="
          mt-4
          max-w-[590px]
          text-[15px]
          font-medium
          leading-[1.62]
          text-[#31546B]
          xl:text-[16px]
        "
      >
        Polished, job-specific cover letters with executive-level structure
        and intelligent guidance. Go from your experience to a compelling,
        editable draft in minutes.
      </p>

      {/* =========================================================
          CTAs
          ========================================================= */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={openBuilderStart}
          className="
            group inline-flex
            h-[50px]
            min-w-[245px]
            items-center justify-between
            rounded-[9px]
            bg-[#0B3A5B]
            px-6
            text-[13px]
            font-extrabold
            text-white
            shadow-[0_10px_24px_rgba(11,58,91,.17)]
            transition
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#082F4B]
          "
        >
          <span>Start Building Free</span>

          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>

        <button
          onClick={() => setIsVideoModalOpen(true)}
          className="
            group inline-flex
            h-[50px]
            min-w-[220px]
            items-center justify-center
            gap-3
            rounded-[9px]
            border border-[#9EB1BD]
            bg-white/60
            px-5
            text-[13px]
            font-extrabold
            text-[#14344D]
            backdrop-blur-sm
            transition
            duration-300
            hover:-translate-y-0.5
            hover:bg-white/90
          "
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E8C267] text-[#102D47]">
            <Play size={11} fill="currentColor" />
          </span>

          See How It Works
        </button>
      </div>

      {/* =========================================================
          BENEFITS
          ========================================================= */}
      <div className="mt-6 grid max-w-[560px] gap-x-7 gap-y-2.5 sm:grid-cols-2">
        {[
          'Executive-grade templates',
          'AI-powered guidance',
          'Job-specific tailoring',
          'Download as PDF',
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2.5 text-[12.5px] font-semibold text-[#294960]"
          >
            <span
              className="
                flex h-[24px] w-[24px]
                shrink-0 items-center justify-center
                rounded-full
                border border-[#B88627]
                text-[12px]
                font-bold
                text-[#B88627]
              "
            >
              ✓
            </span>

            {item}
          </div>
        ))}
      </div>

      {/* =========================================================
          STATS
          ========================================================= */}
      <div
        className="
          mt-6
          flex w-full max-w-[650px] flex-wrap
          gap-x-5 gap-y-3
          border-t border-[#D7CFC3]
          pt-5
          sm:flex-nowrap
          sm:gap-x-4
        "
      >
        {heroStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="flex min-w-[125px] items-center gap-2.5 sm:min-w-0 sm:flex-1"
            >
              <div
                className="
                  flex h-10 w-10
                  shrink-0
                  items-center justify-center
                  rounded-[10px]
                  border border-white/80
                  bg-[#EDF2F5]/90
                  text-[#163D59]
                  shadow-[0_4px_12px_rgba(16,45,71,.05)]
                "
              >
                <Icon size={16} strokeWidth={1.9} />
              </div>

              <div>
                <p className="text-[21px] font-black leading-none tracking-[-0.025em] text-[#102D47]">
                  {stat.value}
                </p>

                <p className="mt-1 text-[8.5px] font-black uppercase tracking-[0.14em] text-[#637C8E]">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* =========================================================
        RIGHT VISUAL
        ========================================================= */}
    <div className="relative hidden h-full min-h-0 lg:block">

      {/* Builder Card */}
      <div
        id="methods"
        className="
          absolute
          right-[1.5%]
          top-1/2
          w-[355px]
          -translate-y-1/2
          scroll-mt-24
          overflow-hidden
          rounded-[18px]
          border border-[#D9E1E6]
          bg-white/96
          p-[18px]
          shadow-[0_24px_60px_rgba(19,43,60,.18)]
          backdrop-blur-xl
          xl:right-[3%]
          xl:w-[375px]
        "
      >
        {/* Header */}
        <div className="flex items-start gap-3 border-b border-[#E7ECEF] pb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#EAF2F6] text-[#123A57]">
            <ArrowRight size={17} className="-rotate-45" />
          </div>

          <div>
            <p className="text-[14px] font-black tracking-[-0.02em] text-[#102D47]">
              CareerSense Builder
            </p>

            <p className="mt-0.5 text-[10.5px] font-medium text-[#7A909F]">
              Turn your experience into impact
            </p>
          </div>
        </div>

        {/* Methods */}
        <div className="mt-4 space-y-2.5">
          {methods.map(({ mode, icon: Icon, title, text }, index) => {
            const isLocked = !isSignedIn && mode !== 'resume';

            const methodContent = (
              <div
                className="
                  group flex
                  min-h-[86px]
                  w-full
                  items-center gap-3
                  rounded-[11px]
                  border border-[#E1E8EC]
                  bg-white
                  px-3.5 py-3
                  text-left
                  shadow-[0_3px_10px_rgba(16,45,71,.035)]
                  transition
                  hover:border-[#BFD0DB]
                  hover:bg-[#FAFCFD]
                "
              >
                <div
                  className={`
                    flex h-10 w-10
                    shrink-0
                    items-center justify-center
                    rounded-[9px]
                    ${
                      isLocked
                        ? 'bg-[#EEF0F2] text-[#9CAAB3]'
                        : index === 2
                          ? 'bg-[#FFF1D5] text-[#B17A1C]'
                          : 'bg-[#EDF3F6] text-[#254B65]'
                    }
                  `}
                >
                  {isLocked ? (
                    <Lock size={16} />
                  ) : (
                    <Icon size={17} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[11.5px] font-extrabold text-[#15364E]">
                      {title}
                    </p>

                    {isLocked ? (
                      <span className="shrink-0 text-[8px] font-black uppercase tracking-[0.11em] text-[#8A9DAA]">
                        Sign In
                      </span>
                    ) : (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#15956A] text-[9px] font-black text-white">
                        ✓
                      </span>
                    )}
                  </div>

                  <p className="mt-1 line-clamp-2 text-[9.5px] font-medium leading-[1.4] text-[#7B909E]">
                    {isLocked
                      ? 'Sign in to unlock this build option.'
                      : text}
                  </p>
                </div>
              </div>
            );

            if (isLocked) {
              return (
                <SignInButton mode="modal" key={title}>
                  <div className="cursor-pointer">
                    {methodContent}
                  </div>
                </SignInButton>
              );
            }

            return (
              <button
                key={title}
                onClick={() => startBuilderForMode(mode)}
                className="block w-full focus:outline-none"
              >
                {methodContent}
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <button
          onClick={openBuilderStart}
          className="
            group mt-4
            flex h-[50px] w-full
            items-center justify-center
            gap-3
            rounded-[10px]
            bg-[#0B304B]
            text-[12.5px]
            font-extrabold
            text-white
            shadow-[0_9px_20px_rgba(11,48,75,.17)]
            transition
            hover:bg-[#08283F]
          "
        >
          Generate My Letter

          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>

    {/* =========================================================
        MOBILE METHODS
        ========================================================= */}
    <div
      id="methods-mobile"
      className="grid scroll-mt-24 gap-3 sm:grid-cols-3 lg:hidden"
    >
      {methods.map(({ mode, icon: Icon, title, text }) => {
        const isLocked = !isSignedIn && mode !== 'resume';

        const card = (
          <div className="h-full rounded-[14px] border border-[#D4DEE4] bg-white/90 p-4 text-left shadow-sm backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div
                className={`
                  flex h-10 w-10
                  items-center justify-center
                  rounded-[10px]
                  ${
                    isLocked
                      ? 'bg-slate-100 text-slate-400'
                      : 'bg-[#EAF2F6] text-[#254B65]'
                  }
                `}
              >
                {isLocked ? (
                  <Lock size={17} />
                ) : (
                  <Icon size={18} />
                )}
              </div>

              <ArrowRight size={15} className="text-[#6F8797]" />
            </div>

            <h3 className="mt-4 text-[14px] font-extrabold text-[#15364E]">
              {title}
            </h3>

            <p className="mt-1.5 text-[11px] font-medium leading-[1.5] text-[#708796]">
              {isLocked
                ? 'Please sign in to unlock this build option.'
                : text}
            </p>
          </div>
        );

        if (isLocked) {
          return (
            <SignInButton mode="modal" key={title}>
              <div className="cursor-pointer">
                {card}
              </div>
            </SignInButton>
          );
        }

        return (
          <button
            key={title}
            onClick={() => startBuilderForMode(mode)}
            className="h-full w-full focus:outline-none"
          >
            {card}
          </button>
        );
      })}
    </div>
  </div>

  {/* Extra compression for laptops with limited vertical space */}
  <style>{`
    @media (min-width: 1024px) and (max-height: 820px) {
      [data-hero-section] > div {
        padding-top: 12px;
        padding-bottom: 12px;
      }
    }
  `}</style>
</section>

        <TrustedCompanies />

        <LazyLandingSection id="templates" minHeight="620px">
          <TemplateShowcase />
        </LazyLandingSection>

        <LazyLandingSection minHeight="440px">
          <BeforeAfterTransformation />
        </LazyLandingSection>

        <LazyLandingSection minHeight="520px">
          <CoverLetterAssistant />
        </LazyLandingSection>

        <LazyLandingSection id="anatomy" minHeight="620px">
          <CoverLetterAnatomy />
        </LazyLandingSection>

        <LazyLandingSection minHeight="520px">
          <Testimonial />
        </LazyLandingSection>

        <LazyLandingSection minHeight="320px">
          <FinalCTA />
        </LazyLandingSection>
      </main>

      <div className="relative z-10">
        <LazyLandingSection minHeight="180px" reveal={false}>
          <Footer />
        </LazyLandingSection>
      </div>

      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoModalOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl"
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition"
                aria-label="Close video"
              >
                <X size={20} />
              </button>
              <div className="aspect-video w-full bg-black">
                <video
                  src={coverLetterVideo}
                  autoPlay
                  controls
                  className="h-full w-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LandingBackdrop = () => (
  <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(86,124,141,0.105)_1px,transparent_1px),linear-gradient(to_bottom,rgba(86,124,141,0.09)_1px,transparent_1px)] bg-[size:34px_34px]" style={{ transform: 'translate3d(0, var(--scroll-drift), 0)' }} />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,var(--shade-sky),transparent_32%),radial-gradient(circle_at_82%_20%,var(--shade-teal),transparent_34%),linear-gradient(180deg,var(--shade-paper),rgba(255,255,255,0.62)_54%,rgba(245,239,235,0.88))]" style={{ transform: 'translate3d(0, var(--scroll-soft-drift), 0)' }} />
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8D9E6]/80 to-transparent" />
  </div>
);

const HeroBackground = () => {
  const isMobile = useIsMobileViewport();

  if (isMobile) {
    return <StaticHeroBackground />;
  }

  return (
    <Suspense fallback={<StaticHeroBackground />}>
      <AnimatedHeroBackground />
    </Suspense>
  );
};

const StaticHeroBackground = () => (
  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#F5EFEB]" aria-hidden="true">
    <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(to_right,rgba(86,124,141,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(86,124,141,0.12)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_95%_95%_at_50%_50%,black_28%,transparent_100%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(200,217,230,0.72),transparent_34%),radial-gradient(circle_at_86%_24%,rgba(86,124,141,0.14),transparent_36%),linear-gradient(180deg,rgba(245,239,235,0.72),rgba(255,255,255,0.46)_58%,rgba(245,239,235,0.92))]" />
    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F5EFEB] to-transparent" />
  </div>
);

const useIsMobileViewport = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia('(max-width: 767px)').matches;
  });

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(query.matches);

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return isMobile;
};

const ScrollReveal = ({ children, id }) => (
  <div id={id} className="w-full shrink-0" data-scroll-reveal>
    {children}
  </div>
);

const LazyLandingSection = ({ children, id, minHeight, reveal = true }) => {
  const ref = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || shouldRender) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '720px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldRender]);

  const content = shouldRender ? (
    <Suspense fallback={<SectionPlaceholder minHeight={minHeight} />}>{children}</Suspense>
  ) : (
    <SectionPlaceholder minHeight={minHeight} />
  );

  return reveal ? (
    <ScrollReveal id={id}>
      <div ref={ref}>{content}</div>
    </ScrollReveal>
  ) : (
    <div ref={ref} id={id} className="w-full shrink-0">
      {content}
    </div>
  );
};

const SectionPlaceholder = ({ minHeight }) => (
  <div aria-hidden="true" style={{ minHeight }} />
);

const UsagePill = ({ label, value, mobile = false }) => (
  <div
    className={`h-11 items-center gap-3 rounded-xl border border-[#C8D9E6]/80 bg-white/72 px-4 shadow-sm backdrop-blur ${mobile ? 'flex justify-between' : 'hidden md:inline-flex'
      }`}
  >
    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#567C8D]">{label}</p>
    <p className="text-sm font-black text-[#2F4156]">{value}</p>
  </div>
);

const formatPoints = (value) => new Intl.NumberFormat('en-US').format(Math.round(Number(value) || 0));

const formatUsd = (value) => `$${(Number(value) || 0).toFixed(4)}`;

export default Home;

const getScratchLetter = () => `
  <p>Write your custom cover letter here.</p>
  <p>Use the editor to tailor your opening, achievements, and closing for this opportunity.</p>
`;
