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
} from 'lucide-react';
import CoverLetterGenie from '../components/landing/CoverLetterGenie';
import { getCareerSenseUsage } from '../services/careerSensePoints';
import { useStore } from '../store/useStore';
import { templateCount } from '../components/templates/templateCatalog';
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';
import coverLetterVideo from '../assets/CoverLetter1.mp4';

const AnimatedHeroBackground = lazy(() => import('../components/landing/AnimatedHeroBackground'));
const CoverLetterAssistant = lazy(() => import('../components/landing/CoverLetterAssistant'));
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
    label: 'Grow AI',
    text: 'Grow analyzes your resume and creates a strong general cover letter.',
  },
  {
    mode: 'resume-job',
    icon: Target,
    title: 'Job-Specific Calibration',
    label: 'Best match',
    text: 'Grow matches your resume to a role and writes a tailored letter.',
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
  const resetBuilder = useStore((state) => state.resetBuilder);
  const setCreationMode = useStore((state) => state.setCreationMode);
  const setGeneratedLetter = useStore((state) => state.setGeneratedLetter);
  const setStep = useStore((state) => state.setStep);
  const [usage, setUsage] = useState(() => getCareerSenseUsage());
  const [heroWordIdx, setHeroWordIdx] = useState(0);
  const [heroWordVisible, setHeroWordVisible] = useState(true);
  const [scrollShade, setScrollShade] = useState(0);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const refreshUsage = () => setUsage(getCareerSenseUsage());
    window.addEventListener('storage', refreshUsage);
    window.addEventListener('focus', refreshUsage);
    return () => {
      window.removeEventListener('storage', refreshUsage);
      window.removeEventListener('focus', refreshUsage);
    };
  }, []);

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

      <header className="relative z-20 px-0 pt-3">
        <div className="mx-auto max-w-[1400px] border border-white/45 bg-white/55 px-4 py-3 shadow-[0_18px_60px_rgba(47,65,86,0.14)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/42 sm:rounded-2xl sm:px-6">
          <div className="flex min-h-16 flex-wrap items-center justify-between gap-3">
            <button onClick={() => navigate('/')} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2F4156] text-white shadow-sm ring-1 ring-white/35">
                <FileText size={22} />
              </div>
              <div className="text-left">
                <p className="cs-display text-lg font-extrabold leading-none tracking-tight">CareerSense</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#567C8D]">Executive Letters</p>
              </div>
            </button>

            <nav className="hidden items-center gap-7 text-sm font-extrabold text-[#567C8D] lg:flex" aria-label="Landing">
              <a href="#methods" className="hover:text-[#2F4156]">Build Options</a>
              <a href="#cover-letter-questions" className="hover:text-[#2F4156]">Ask Grow</a>
              <a href="#anatomy" className="hover:text-[#2F4156]">Letter Guide</a>
              <a href="#templates" className="hover:text-[#2F4156]">Templates</a>
              <a href="#testimonials" className="hover:text-[#2F4156]">Reviews</a>
            </nav>

            <div className="flex items-center gap-2">
              <SignedIn>
                <div className="hidden flex-1 items-center justify-end gap-2 sm:flex-none md:flex">
                  <UsagePill label="Career Points Used" value={formatPoints(usage.totalPoints)} />
                  <UsagePill label="Total Bill" value={formatUsd(usage.totalBillUsd)} />
                </div>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="inline-flex h-11 items-center justify-center rounded-xl bg-[#2F4156] px-5 text-[13px] font-bold text-white hover:bg-[#233244] shadow-sm transition">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <button
                type="button"
                onClick={() => setIsMobileNavOpen((current) => !current)}
                aria-label={isMobileNavOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileNavOpen}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C8D9E6] bg-white/88 text-[#2F4156] shadow-sm transition hover:bg-white lg:hidden"
              >
                {isMobileNavOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
          {isMobileNavOpen && (
            <div className="mt-3 border-t border-[#C8D9E6]/70 pt-3 lg:hidden">
              <nav className="grid gap-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#567C8D]" aria-label="Landing Mobile">
                <a href="#methods" onClick={() => setIsMobileNavOpen(false)} className="rounded-lg border border-transparent bg-white/55 px-3 py-2 hover:border-[#C8D9E6] hover:text-[#2F4156]">Build Options</a>
                <a href="#cover-letter-questions" onClick={() => setIsMobileNavOpen(false)} className="rounded-lg border border-transparent bg-white/55 px-3 py-2 hover:border-[#C8D9E6] hover:text-[#2F4156]">Ask Grow</a>
                <a href="#anatomy" onClick={() => setIsMobileNavOpen(false)} className="rounded-lg border border-transparent bg-white/55 px-3 py-2 hover:border-[#C8D9E6] hover:text-[#2F4156]">Letter Guide</a>
                <a href="#templates" onClick={() => setIsMobileNavOpen(false)} className="rounded-lg border border-transparent bg-white/55 px-3 py-2 hover:border-[#C8D9E6] hover:text-[#2F4156]">Templates</a>
                <a href="#testimonials" onClick={() => setIsMobileNavOpen(false)} className="rounded-lg border border-transparent bg-white/55 px-3 py-2 hover:border-[#C8D9E6] hover:text-[#2F4156]">Reviews</a>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button onClick={() => setIsMobileNavOpen(false)} className="w-full text-center rounded-lg bg-[#2F4156] text-white px-3 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.12em] hover:bg-[#233244] transition">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
              </nav>
              <SignedIn>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <UsagePill
                    label="Career Points Used"
                    value={formatPoints(usage.totalPoints)}
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
        </div>
      </header>

      <main className="relative z-10">
        <section className="relative isolate overflow-hidden border-b border-[#C8D9E6]">
          <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-[1400px] items-center gap-10 overflow-hidden px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <HeroBackground />

            <div className="relative z-10" data-scroll-reveal>
              <h1 className="cs-display mb-5 max-w-3xl text-4xl font-extrabold leading-[1.06] tracking-tight text-[#2F4156] sm:text-5xl md:text-6xl lg:text-[3.75rem]">
                Build{' '}
                <span
                  style={{
                    display: 'inline-block',
                    transition: 'opacity 0.35s ease, transform 0.35s ease',
                    opacity: heroWordVisible ? 1 : 0,
                    transform: heroWordVisible ? 'translateY(0px)' : 'translateY(-10px)',
                  }}
                  className="text-[#567C8D]"
                >
                  {HERO_WORDS[heroWordIdx]}
                </span>
                <br />
                with Intelligence.
              </h1>
              <p className="mb-8 max-w-[640px] text-base font-semibold leading-7 text-[#567C8D] sm:text-[1.08rem] sm:leading-[1.75]">
                CareerSense helps senior professionals craft boardroom-ready cover letters from scratch, from a resume, or from a resume matched to an executive job description.
              </p>

              <div className="mb-9 flex flex-wrap gap-3">
                <button
                  onClick={openBuilderStart}
                  className="inline-flex min-h-[53px] min-w-[180px] items-center justify-between rounded-[12px] border border-[#0F1C2E] bg-[#0F1C2E] px-6 text-[14px] font-black text-white shadow-[0_14px_30px_rgba(15,28,46,0.16)] transition hover:-translate-y-0.5 hover:bg-[#16263d]"
                >
                  <span>Start Building</span>
                  <ArrowRight size={22} />
                </button>
                <SignedIn>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="inline-flex min-h-[38px] min-w-[180px] items-center justify-between rounded-[12px] border border-[#C8D9E6] bg-white px-6 text-[14px] font-black text-[#0F1C2E] shadow-[0_14px_28px_rgba(47,65,86,0.09)] transition hover:-translate-y-0.5 hover:border-[#9DB5C6] hover:bg-white"
                  >
                    <span>Dashboard</span>
                    <Layout size={20} />
                  </button>
                </SignedIn>
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex min-h-[38px] min-w-[180px] items-center justify-between rounded-[12px] border border-[#C8D9E6] bg-white px-6 text-[14px] font-black text-[#0F1C2E] shadow-[0_14px_28px_rgba(47,65,86,0.09)] transition hover:-translate-y-0.5 hover:border-[#9DB5C6] hover:bg-white"
                >
                  <span>How it works</span>
                  <Play size={18} className="text-[#0F1C2E] fill-current" />
                </button>
              </div>

              <div id="methods" className="mb-9 grid scroll-mt-4 gap-3 sm:grid-cols-3">
                {methods.map(({ mode, icon: Icon, title, text }) => {
                  const isLocked = !isSignedIn && mode !== 'resume';

                  const cardContent = (
                    <div className="group min-h-[176px] rounded-2xl p-5 text-left backdrop-blur border border-transparent bg-white/55 hover:border-[#567C8D]/40 hover:bg-white sm:min-h-[220px] transition duration-300 relative h-full">
                      <div className="mb-5 flex items-center justify-between">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${isLocked ? 'bg-slate-200 text-slate-400' : 'bg-[#C8D9E6] text-[#567C8D]'}`}>
                          {isLocked ? <Lock size={20} /> : <Icon size={22} />}
                        </div>
                        <div className="flex items-center gap-2">
                          {isLocked ? (
                            <span className="inline-flex items-center gap-1 rounded bg-[#E2E8F0] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#64748B] ring-1 ring-slate-300">
                              <Lock size={10} /> Sign In
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded bg-[#F5EFEB] text-[#2F4156] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ring-[#C8D9E6]">
                              {mode === 'scratch' ? 'Free' : mode === 'resume' ? 'Grow AI' : 'Best match'}
                            </span>
                          )}
                          <ArrowRight size={15} className="text-[#567C8D] transition group-hover:translate-x-1" />
                        </div>
                      </div>
                      <h3 className="cs-display font-extrabold text-[#2F4156]">{title}</h3>
                      <p className="mt-2 text-sm font-semibold leading-6 text-[#567C8D]">
                        {isLocked ? "Please sign in to unlock this build option." : text}
                      </p>
                    </div>
                  );

                  if (isLocked) {
                    return (
                      <SignInButton mode="modal" key={title}>
                        <div className="cursor-pointer relative h-full">
                          {cardContent}
                        </div>
                      </SignInButton>
                    );
                  }

                  return (
                    <button key={title} onClick={() => startBuilderForMode(mode)} className="w-full text-left focus:outline-none h-full">
                      {cardContent}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-6 border-t border-[#C8D9E6] pt-6">
                {heroStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C8D9E6] bg-white/80 text-[#567C8D] shadow-sm">
                      <Icon size={18} />
                    </div>

                    <div>
                      <p className="cs-display text-2xl font-extrabold text-[#2F4156]">{stat.value}</p>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#567C8D]">{stat.label}</p>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>

            <div className="relative z-10 lg:translate-y-2" data-scroll-reveal>
              <CoverLetterGenie />
            </div>
          </div>
        </section>

        <LazyLandingSection minHeight="520px">
          <CoverLetterAssistant />
        </LazyLandingSection>

        <LazyLandingSection id="anatomy" minHeight="620px">
          <CoverLetterAnatomy />
        </LazyLandingSection>

        <LazyLandingSection id="templates" minHeight="620px">
          <TemplateShowcase />
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
  <div id={id} data-scroll-reveal>
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
    <div ref={ref} id={id}>
      {content}
    </div>
  );
};

const SectionPlaceholder = ({ minHeight }) => (
  <div aria-hidden="true" style={{ minHeight }} />
);

const UsagePill = ({ label, value, mobile = false }) => (
  <div
    className={`h-11 items-center gap-3 rounded-xl border border-[#C8D9E6]/80 bg-white/72 px-4 shadow-sm backdrop-blur ${
      mobile ? 'flex justify-between' : 'hidden md:inline-flex'
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
