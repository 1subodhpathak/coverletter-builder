import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  PenLine,
  Star,
  Target,
  UploadCloud,
  Zap,
} from 'lucide-react';
import AnimatedHeroBackground from '../components/landing/AnimatedHeroBackground';
import CoverLetterAnatomy from '../components/landing/CoverLetterAnatomy';
import CoverLetterAssistant from '../components/landing/CoverLetterAssistant';
import CoverLetterGenie from '../components/landing/CoverLetterGenie';
import FinalCTA from '../components/landing/FinalCTA';
import Footer from '../components/landing/Footer';
import Testimonial from '../components/landing/Testimonial';
import { TemplateShowcase, templateCount } from '../components/templates/TemplateGallery';
import { getCareerSenseUsage } from '../services/careerSensePoints';
import { useStore } from '../store/useStore';

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
  { icon: Target, value: 'ATS', label: 'Friendly' },
];

const HERO_WORDS = ['smarter', 'faster', 'sharper'];

const Home = () => {
  const navigate = useNavigate();
  const resetBuilder = useStore((state) => state.resetBuilder);
  const setCreationMode = useStore((state) => state.setCreationMode);
  const setGeneratedLetter = useStore((state) => state.setGeneratedLetter);
  const setStep = useStore((state) => state.setStep);
  const [usage, setUsage] = useState(() => getCareerSenseUsage());
  const [heroWordIdx, setHeroWordIdx] = useState(0);
  const [heroWordVisible, setHeroWordVisible] = useState(true);

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

  const startBuilderForMode = (mode) => {
    resetBuilder();
    setCreationMode(mode);
    if (mode === 'scratch') {
      setGeneratedLetter(getScratchLetter());
    }
    setStep(1);
    navigate('/builder');
  };

  return (
    <div className="cs-shell min-h-screen font-sans text-slate-950">
      <header className="sticky top-0 z-50 border-b border-[#dbe3ef] bg-[#fbfaf6]/88 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3 lg:px-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0b1f3a] text-white shadow-sm">
              <FileText size={22} />
            </div>
            <div className="text-left">
              <p className="cs-display text-lg font-extrabold leading-none tracking-tight">CareerSense</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6b7280]">Executive Letters</p>
            </div>
          </button>

          <nav className="hidden items-center gap-7 text-sm font-extrabold text-[#586579] lg:flex" aria-label="Landing">
            <a href="#methods" className="hover:text-[#0b1f3a]">Workflows</a>
            <a href="#templates" className="hover:text-[#0b1f3a]">Templates</a>
            <a href="#testimonials" className="hover:text-[#0b1f3a]">Proof</a>
            <a href="#quality" className="hover:text-[#0b1f3a]">Quality</a>
          </nav>

          <div className="flex flex-1 items-center justify-end gap-2 sm:flex-none">
            <UsagePill label="Career Points Used" value={formatPoints(usage.totalPoints)} />
            <UsagePill label="Total Bill" value={formatUsd(usage.totalBillUsd)} />
            <button onClick={() => navigate('/dashboard')} className="cs-button-secondary hidden rounded-lg px-4 py-2 text-sm font-black hover:bg-white xl:block">
              Dashboard
            </button>
            <button onClick={() => navigate('/builder')} className="cs-button rounded-lg px-4 py-2 text-sm font-black">
              Create Letter
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden border-b border-[#dbe3ef]">
          <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-[1400px] items-center gap-14 overflow-hidden px-6 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr]">
            <AnimatedHeroBackground />

            <div className="relative z-10">
              <h1 className="cs-display mb-5 max-w-3xl text-5xl font-extrabold leading-[1.04] tracking-tight text-[#111827] md:text-6xl lg:text-[3.75rem]">
                Build{' '}
                <span
                  style={{
                    display: 'inline-block',
                    transition: 'opacity 0.35s ease, transform 0.35s ease',
                    opacity: heroWordVisible ? 1 : 0,
                    transform: heroWordVisible ? 'translateY(0px)' : 'translateY(-10px)',
                  }}
                  className="text-[#18796f]"
                >
                  {HERO_WORDS[heroWordIdx]}
                </span>
                <br />
                with Intelligence.
              </h1>
              <p className="mb-8 max-w-[640px] text-[1.08rem] font-semibold leading-[1.75] text-[#586579]">
                CareerSense helps senior professionals craft boardroom-ready cover letters from scratch, from a resume, or from a resume matched to an executive job description.
              </p>

              <div className="mb-9 flex flex-wrap items-center gap-4">
                <div className="flex -space-x-2.5">
                  {['K', 'N', 'P', 'S', 'D'].map((initial, index) => (
                    <div
                      key={initial}
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${
                        ['bg-slate-300 text-slate-700', 'bg-slate-400 text-white', 'bg-slate-500 text-white', 'bg-slate-600 text-white', 'bg-slate-700 text-white'][index]
                      }`}
                    >
                      {initial}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3.5 w-3.5 fill-[#b8893b] text-[#b8893b]" />
                    ))}
                  </div>
                  <span className="mt-0.5 text-[11px] font-bold text-[#6b7280]">Built for VP, Director, and CXO applications</span>
                </div>
              </div>

              <div id="methods" className="mb-9 grid gap-3 sm:grid-cols-3">
                {methods.map(({ mode, icon: Icon, title, text }) => (
                  <button key={title} onClick={() => startBuilderForMode(mode)} className="cs-soft-card group min-h-[220px] rounded-2xl p-5 text-left backdrop-blur transition hover:-translate-y-1 hover:border-[#18796f]/40 hover:bg-white">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef8f6] text-[#18796f]">
                        <Icon size={22} />
                      </div>
                      <ArrowRight size={15} className="text-[#18796f] transition group-hover:translate-x-1" />
                    </div>
                    <h3 className="cs-display font-extrabold text-[#111827]">{title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#586579]">{text}</p>
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-6 border-t border-[#dbe3ef] pt-6">
                {heroStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#dbe3ef] bg-white/80 text-[#18796f] shadow-sm">
                      <Icon size={18} />
                    </div>

                    <div>
                      <p className="cs-display text-2xl font-extrabold text-[#111827]">{stat.value}</p>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6b7280]">{stat.label}</p>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>

            <div className="relative z-10 lg:translate-y-2">
              <CoverLetterGenie />
            </div>
          </div>
        </section>

        <CoverLetterAssistant />

        <CoverLetterAnatomy />

        <div id="templates">
          <TemplateShowcase />
        </div>

        <Testimonial />

        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
};

const UsagePill = ({ label, value }) => (
  <div className="hidden rounded-full border border-[#dbe3ef] bg-white/80 px-4 py-2 shadow-sm md:block">
    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#8a94a6]">{label}</p>
    <p className="mt-0.5 text-sm font-black text-[#111827]">{value}</p>
  </div>
);

const formatPoints = (value) => new Intl.NumberFormat('en-US').format(Math.round(Number(value) || 0));

const formatUsd = (value) => `$${(Number(value) || 0).toFixed(4)}`;

export default Home;

const getScratchLetter = () => `
  <p>Write your custom cover letter here.</p>
  <p>Use the editor to tailor your opening, achievements, and closing for this opportunity.</p>
`;
