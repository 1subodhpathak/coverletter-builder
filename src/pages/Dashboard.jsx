import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  BrainCircuit,
  Check,
  Clock3,
  CreditCard,
  FileText,
  FolderOpen,
  Home as HomeIcon,
  LayoutTemplate,
  Loader2,
  Menu,
  PenLine,
  Plus,
  Sparkles,
  Target,
  Trash2,
  UploadCloud,
  UserRound,
  X,
  Zap,
  Star,
  ArrowRight,
  Database,
  Crown,
  Lightbulb,
  HelpCircle,
  MoreVertical,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { templateCount } from '../components/templates/templateCatalog';
import { getCareerSenseUsage } from '../services/careerSensePoints';
import { useStore } from '../store/useStore';
import { extractTextFromPDF, hasUsablePdfText, parseResumeData } from '../services/pdfService';
import { SignedIn, SignedOut, SignInButton, useAuth, useUser } from '@clerk/clerk-react';
import CustomUserButton from '../components/common/CustomUserButton';
import BlueLogo from '../assets/logos/BlueGray.png';
import dashboardBackground from '../assets/dashboard.png';
import DashboardTour from '../components/dashboard/DashboardTour';

const TemplateLibraryPage = lazy(() =>
  import('../components/templates/TemplateGallery').then((module) => ({
    default: module.TemplateLibraryPage,
  }))
);

const MAX_DATA_SOURCES = 10;
const PROFILE_FIELDS = [
  'fullName',
  'email',
  'phone',
  'address',
  'linkedinPortfolio',
  'currentJobTitle',
  'experienceYears',
  'experienceMonths',
];
const BUILDER_COLORS = {
  ink: '#2F4156',
  teal: '#567C8D',
  mist: '#C8D9E6',
  paper: '#F5EFEB',
};

const navItems = [
  { id: 'dashboard', label: 'Overview', icon: HomeIcon },
  { id: 'letters', label: 'My Letters', icon: FolderOpen },
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  { id: 'resumes', label: 'Data Sources', icon: FileText },
  { id: 'credits', label: 'Usage & Billing', icon: CreditCard },
  { id: 'profile', label: 'Profile Settings', icon: UserRound },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resetBuilder = useStore((state) => state.resetBuilder);
  const savedLetters = useStore((state) => state.savedLetters);
  const storedResumes = useStore((state) => state.storedResumes);
  const storedJobDescriptions = useStore((state) => state.storedJobDescriptions);
  const profile = useStore((state) => state.profile);
  const loadSavedLetter = useStore((state) => state.loadSavedLetter);
  const deleteSavedLetter = useStore((state) => state.deleteSavedLetter);

  const { user } = useUser();
  const [subData, setSubData] = useState({ plan: 'free', tokensRemaining: 30000 });
  const [activeView, setActiveView] = useState('dashboard');
  const [creditUsage, setCreditUsage] = useState(() => getCareerSenseUsage(savedLetters));
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);

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
        console.error('Error fetching subscription in Dashboard:', err);
      }
    };
    fetchSub();
  }, [user?.id]);

  useEffect(() => {
    setCreditUsage(getCareerSenseUsage(savedLetters));
  }, [savedLetters]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const view = searchParams.get('view');

    if (view && navItems.some((item) => item.id === view)) {
      setActiveView(view);
    }
  }, [location.search]);

  const totalDataSources = storedResumes.length + storedJobDescriptions.length;
  const clampedDataSources = Math.min(totalDataSources, MAX_DATA_SOURCES);
  const dataSourcePercent = Math.round((clampedDataSources / MAX_DATA_SOURCES) * 100);
  const profileCompletedFields = PROFILE_FIELDS.filter((field) => {
    const value = profile[field];
    return value !== '' && value !== null && typeof value !== 'undefined';
  }).length;
  const profileCompleteness = Math.round((profileCompletedFields / PROFILE_FIELDS.length) * 100);
  const configuredTemplates = useMemo(
    () => new Set(savedLetters.map((letter) => letter.selectedTemplate).filter(Boolean)).size,
    [savedLetters]
  );
  const templatePercent = Math.round((configuredTemplates / templateCount) * 100);
  const recentLetters = useMemo(() => savedLetters.slice(0, 3), [savedLetters]);
  const userName = profile.fullName ? profile.fullName.split(' ')[0] : 'there';

  const pipelineFocus = useMemo(() => {
    if (profileCompleteness < 100) return 'Profile Setup';
    if (totalDataSources === 0) return 'Data Sources';
    if (savedLetters.length === 0) return 'First Draft';
    if (configuredTemplates === 0) return 'Template Selection';
    return 'Optimization';
  }, [configuredTemplates, profileCompleteness, savedLetters.length, totalDataSources]);

  const stats = useMemo(
    () => [
      {
        label: 'Letters Created',
        value: savedLetters.length,
        helper: savedLetters.length ? 'Saved in My Letters' : 'No cover letters saved yet',
      },
      {
        label: 'Resumes Stored',
        value: storedResumes.length,
        helper: storedResumes.length ? 'Ready in Data Sources' : 'Add your first resume',
      },
      {
        label: 'JDs Stored',
        value: storedJobDescriptions.length,
        helper: storedJobDescriptions.length ? 'Ready in Data Sources' : 'Add your first job description',
      },
    ],
    [savedLetters.length, storedJobDescriptions.length, storedResumes.length]
  );

  const actionItems = useMemo(
    () => [
      {
        key: 'profile',
        text: 'Complete all profile fields',
        action: 'Edit Profile',
        isDone: profileCompleteness === 100,
        onClick: () => setActiveView('profile'),
      },
      {
        key: 'resume',
        text: 'Upload at least one resume',
        action: 'Add Data',
        isDone: storedResumes.length > 0,
        onClick: () => setActiveView('resumes'),
      },
      {
        key: 'letter',
        text: 'Create your first cover letter',
        action: 'Build Now',
        isDone: savedLetters.length > 0,
        onClick: () => startBuilder(),
      },
    ],
    [profileCompleteness, savedLetters.length, storedResumes.length]
  );

  useEffect(() => {
    if (activeView === 'credits') {
      setCreditUsage(getCareerSenseUsage(savedLetters));
    }
  }, [activeView, savedLetters]);

  const startBuilder = () => {
    resetBuilder();
    navigate('/builder');
  };

  const handleNav = (id) => {
    if (id === 'create') {
      startBuilder();
      return;
    }
    setActiveView(id);
  };

  const openSavedLetterInBuilder = (id) => {
    loadSavedLetter(id);
    navigate('/builder');
  };

  const activeLabel = navItems.find((item) => item.id === activeView)?.label || 'Overview';

  const tokenPercent = Math.max(
    0,
    Math.min(100, Math.round(((subData.tokensRemaining ?? 30000) / 10000) * 100))
  );

  return (
    <div className="min-h-screen bg-[#F8F3EA] font-sans text-[#102D47] selection:bg-[#E9D49A]/45">
      {/* =========================================================
          GLOBAL DASHBOARD HEADER
          ========================================================= */}
      <header className="fixed inset-x-0 top-0 z-50 h-[72px] border-b border-white/10 bg-[#082B45]/95 text-white shadow-[0_8px_26px_rgba(3,22,36,0.22)] backdrop-blur-xl">
        <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-7">
          <button
            onClick={() => navigate('/')}
            className="flex min-w-0 items-center gap-3 text-left transition-opacity hover:opacity-80"
          >
            <img
              src={BlueLogo}
              alt="CareerSense Logo"
              className="h-11 w-11 shrink-0 object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-[25px] font-black leading-none tracking-[-0.045em]">
                <span className="text-[#F5EFEB]">Career</span>
                <span className="text-[#E3BA5E]">Sense</span>
              </h1>
              <p className="mt-1 text-[9px] font-black uppercase tracking-[0.27em] text-[#AFC7D5]">
                Executive Letters
              </p>
            </div>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="hidden h-10 items-center gap-2 px-2 text-[13px] font-semibold text-[#D6E3EA] transition hover:text-white md:inline-flex"
              onClick={() => {
                setActiveView('dashboard');
                setIsTourOpen(true);
              }}
            >
              <HelpCircle size={16} />
              Help
            </button>

            <div className="hidden items-center gap-2 lg:flex">
              <div className="flex h-12 items-center gap-2.5 rounded-[13px] border border-white/15 bg-white/[0.07] px-3 shadow-[0_4px_14px_rgba(2,18,30,0.14)]">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF3D9] text-[#EAAA1C]">
                  <Star size={15} fill="currentColor" />
                </div>
                <div className="min-w-[112px] leading-none">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#AFC4D1]">
                    AI Tokens Remaining
                  </p>
                  <p className="mt-1 text-[13px] font-black text-white">
                    {(subData.tokensRemaining ?? 30000).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex h-12 items-center gap-2.5 rounded-[13px] border border-white/15 bg-white/[0.07] px-3 shadow-[0_4px_14px_rgba(2,18,30,0.14)]">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E7F8EF] text-[#0C9A63]">
                  <span className="text-[13px] font-black">$</span>
                </div>
                <div className="min-w-[78px] leading-none">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#AFC4D1]">Bill</p>
                  <p className="mt-1 text-[13px] font-black text-white">{formatUsd(creditUsage.totalBillUsd)}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveView('dashboard')}
              className="hidden h-11 items-center justify-center rounded-[10px] border border-white/15 bg-white/[0.09] px-4 text-[13px] font-bold text-white shadow-sm transition hover:bg-white/[0.15] sm:inline-flex"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate('/')}
              className="hidden h-11 items-center justify-center gap-2 rounded-[10px] border border-white/15 bg-white/[0.09] px-4 text-[13px] font-bold text-white shadow-sm transition hover:bg-white/[0.15] md:inline-flex"
            >
              <ArrowRight size={14} className="rotate-180" />
              Back
            </button>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="inline-flex h-11 items-center justify-center rounded-[10px] bg-[#E3BA5E] px-4 text-[13px] font-bold text-[#082B45] shadow-sm transition hover:bg-[#EDC974]">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <CustomUserButton />
            </SignedIn>

            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/15 bg-white/[0.09] text-white transition hover:bg-white/[0.15] lg:hidden"
              aria-label="Open dashboard navigation"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          DESKTOP SIDEBAR
          ========================================================= */}
      <aside className="fixed bottom-0 left-0 top-[72px] z-40 hidden w-[300px] overflow-hidden bg-[linear-gradient(180deg,#082B45_0%,#061F34_100%)] text-white shadow-[18px_0_50px_rgba(4,29,47,0.12)] lg:flex lg:flex-col">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        />

        <div className="relative flex h-full flex-col px-5 py-7">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/20 bg-[#173F59] text-[18px] font-bold">
              {profile.photo || user?.imageUrl ? (
                <img
                  src={profile.photo || user?.imageUrl}
                  alt={profile.fullName || 'Profile'}
                  className="h-full w-full object-cover"
                />
              ) : (
                userName.charAt(0).toUpperCase()
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-[#C5D6E1]">Welcome back,</p>
              <p className="truncate font-serif text-[20px] font-semibold tracking-[-0.02em] text-white">
                {profile.fullName || user?.fullName || 'CareerSense User'}
              </p>
            </div>
          </div>

          <p className="mt-5 px-2 text-[9px] font-bold uppercase tracking-[0.25em] text-[#9BB5C6]">
            Let&apos;s build your next opportunity
          </p>

          <nav className="mt-6 space-y-1.5" aria-label="Dashboard" data-tour="navigation">
            {navItems.map(({ id, label, icon: Icon, badge }) => {
              const active = activeView === id;
              return (
                <button
                  key={id}
                  onClick={() => handleNav(id)}
                  className={`group relative flex h-11 w-full items-center justify-between rounded-[12px] px-3.5 text-[13px] font-semibold transition-all ${
                    active
                      ? 'bg-gradient-to-r from-[#E2B54B]/30 to-[#E2B54B]/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'
                      : 'text-[#DCE8EF] hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={18}
                      className={active ? 'text-[#F2BD42]' : 'text-[#9BB5C6] group-hover:text-white'}
                    />
                    <span>{label}</span>
                  </div>

                  {badge ? (
                    <span className="rounded-full bg-[#E2B54B] px-2 py-0.5 text-[10px] font-bold text-[#082B45]">
                      {badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-6">
            <div className="relative overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.06] p-4">
              <div className="flex items-center gap-2 text-[#E2B54B]">
                <Sparkles size={16} />
                <span className="text-[12px] font-bold uppercase tracking-wider">
                  {subData?.plan && subData.plan !== 'free'
                    ? `${subData.plan.charAt(0).toUpperCase() + subData.plan.slice(1)} Plan`
                    : 'Upgrade to Pro'}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[#C5D6E1]">
                {subData?.plan && subData.plan !== 'free'
                  ? 'Manage your subscription and premium access.'
                  : 'Get more templates, higher AI limits and premium features.'}
              </p>
              <a
                href="https://careersenseai.com/pricing"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex h-8 w-full items-center justify-center gap-1.5 rounded-[8px] bg-[#E2B54B] text-[12px] font-bold text-[#082B45] shadow-sm transition hover:bg-[#EDC974]"
              >
                <span>{subData?.plan && subData.plan !== 'free' ? 'Manage Plan' : 'Upgrade Now'}</span>
                <ArrowRight size={13} />
              </a>
            </div>

            <p className="mt-4 text-center text-[10px] text-[#7A98AB]">
              Better Resumes, Brighter Futures
            </p>
          </div>
        </div>
      </aside>

      {/* =========================================================
          MOBILE DRAWER
          ========================================================= */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileNavOpen(false)}
              className="absolute inset-0 bg-[#061F34]/55 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 250 }}
              className="relative flex h-full w-[290px] flex-col bg-[#082B45] px-5 py-5 text-white shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src={BlueLogo} alt="CareerSense" className="h-9 w-9 object-contain" />
                  <span className="text-[18px] font-black">CareerSense</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15"
                >
                  <X size={17} />
                </button>
              </div>

              <nav className="space-y-1.5">
                {navItems.map(({ id, label, icon: Icon }) => {
                  const active = activeView === id;
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        handleNav(id);
                        setIsMobileNavOpen(false);
                      }}
                      className={`flex h-11 w-full items-center gap-3 rounded-[10px] px-3 text-[13px] font-semibold ${
                        active ? 'bg-[#E2B54B]/30 text-white' : 'text-[#DCE8EF]'
                      }`}
                    >
                      <Icon size={17} className={active ? 'text-[#F2BD42]' : ''} />
                      {label}
                    </button>
                  );
                })}
              </nav>

              <button
                onClick={() => {
                  startBuilder();
                  setIsMobileNavOpen(false);
                }}
                className="mt-auto flex h-11 items-center justify-center gap-2 rounded-[10px] bg-[#F0B83E] text-[13px] font-bold text-[#0A304B]"
              >
                <PenLine size={15} />
                Create Cover Letter
              </button>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================
          MAIN WORKSPACE
          ========================================================= */}
      <main className="relative min-h-screen pt-[72px] lg:ml-[300px]">
        <DashboardBackdrop />

        <div className="relative z-10 mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
          {activeView === 'dashboard' && (
            <div className="dashboard-overview flex min-h-[calc(100vh-112px)] flex-col">
              {/* Greeting */}
              <section className="mb-5 shrink-0" data-tour="overview">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#B17B22]">
                  Dashboard
                </p>
                <h2 className="mt-2 font-serif text-[36px] font-semibold leading-[1.05] tracking-[-0.035em] text-[#102D47] lg:text-[40px]">
                  Good to see you again, {userName}!
                </h2>
                <p className="mt-2 text-[13px] font-medium text-[#31546B]">
                  Here&apos;s an overview of your progress and everything you need to create stronger cover letters.
                </p>
              </section>

              {/* 4 dashboard metrics */}
              <section className="grid shrink-0 gap-3 sm:grid-cols-2 xl:grid-cols-4" data-tour="metrics">
                <OverviewMetricCard
                  icon={FileText}
                  title="Cover Letters Created"
                  value={savedLetters.length}
                  helper={savedLetters.length ? 'Saved in My Letters' : 'Create your first letter'}
                  tone="blue"
                />
                <OverviewMetricCard
                  icon={Database}
                  title="Data Sources"
                  value={`${clampedDataSources} / ${MAX_DATA_SOURCES}`}
                  percent={dataSourcePercent}
                  helper={`${dataSourcePercent}%`}
                  tone="green"
                />
                <OverviewMetricCard
                  icon={LayoutTemplate}
                  title="Templates Used"
                  value={`${configuredTemplates} / ${templateCount}`}
                  percent={templatePercent}
                  helper={`${templatePercent}%`}
                  tone="gold"
                />
                <OverviewMetricCard
                  icon={UserRound}
                  title="Profile Completeness"
                  value={`${profileCompleteness}%`}
                  percent={profileCompleteness}
                  tone="purple"
                />
              </section>

              {/* Primary actions */}
              <section className="mt-4 grid shrink-0 gap-3 xl:grid-cols-[1.45fr_1fr]" data-tour="actions">
                <div className="flex min-h-[96px] items-center justify-between gap-4 rounded-[16px] border border-[#E1E4E2] bg-white/94 px-5 py-4 shadow-[0_12px_32px_rgba(55,49,39,0.08)]">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FFF1D8] text-[#A86F12]">
                      <PenLine size={25} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[15px] font-bold text-[#102D47]">Create a New Cover Letter</h3>
                      <p className="mt-1 text-[11px] font-medium text-[#668093]">
                        Turn your experience into opportunities with a tailored cover letter.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={startBuilder}
                    className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-[9px] bg-[#0B3A67] px-5 text-[12px] font-bold text-white shadow-[0_8px_18px_rgba(11,58,103,.16)] transition hover:bg-[#082F55]"
                  >
                    Get Started
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="flex min-h-[96px] items-center justify-between gap-4 rounded-[16px] border border-[#E1E4E2] bg-white/94 px-5 py-4 shadow-[0_12px_32px_rgba(55,49,39,0.08)]">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#1760C8]">
                      <LayoutTemplate size={25} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-[#102D47]">Explore Templates</h3>
                      <p className="mt-1 text-[11px] font-medium text-[#668093]">
                        Choose from professionally designed templates.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveView('templates')}
                    className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-[9px] border border-[#C8D9E6] bg-white px-4 text-[11px] font-bold text-[#0D58B8] transition hover:bg-[#F5F9FD]"
                  >
                    Browse Templates
                    <ArrowRight size={13} />
                  </button>
                </div>
              </section>

              {/* Bottom dashboard area */}
              <section className="mt-4 grid min-h-0 flex-1 gap-3 xl:grid-cols-[1.45fr_1fr]">
                {/* Recent Cover Letters */}
                <div className="min-h-0 rounded-[16px] border border-[#E1E4E2] bg-white/95 p-4 shadow-[0_12px_32px_rgba(55,49,39,0.08)]" data-tour="recent">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText size={17} className="text-[#B57B16]" />
                      <h3 className="text-[15px] font-bold text-[#102D47]">Recent Cover Letters</h3>
                    </div>
                    <button
                      onClick={() => setActiveView('letters')}
                      className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1760C8] hover:underline"
                    >
                      View All
                      <ArrowRight size={12} />
                    </button>
                  </div>

                  {recentLetters.length === 0 ? (
                    <div className="flex h-[180px] flex-col items-center justify-center rounded-[12px] border border-dashed border-[#CCD9E2] bg-[#FBFCFD] px-5 text-center">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF3F7] text-[#567C8D]">
                        <FileText size={18} />
                      </div>
                      <p className="mt-3 text-[13px] font-bold text-[#102D47]">No cover letters yet</p>
                      <p className="mt-1 text-[11px] text-[#7590A2]">Create your first letter and it will appear here.</p>
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-[12px] border border-[#D9E4EB]">
                      {recentLetters.map((letter, index) => (
                        <button
                          key={letter.id}
                          onClick={() => openSavedLetterInBuilder(letter.id)}
                          className={`group flex min-h-[62px] w-full items-center justify-between gap-4 bg-white px-4 py-2.5 text-left transition hover:bg-[#F9FBFC] ${
                            index < recentLetters.length - 1 ? 'border-b border-[#E3EBF0]' : ''
                          }`}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F1F5F8] text-[#153E59]">
                              <FileText size={16} />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-[12.5px] font-bold text-[#102D47]">
                                {letter.title || 'Cover Letter'}
                              </p>
                              <p className="mt-0.5 truncate text-[10.5px] text-[#7991A2]">
                                {letter.company || 'Company'} · {formatDate(letter.updatedAt)}
                              </p>
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-3">
                            <span className="rounded-full bg-[#E7F7EF] px-2.5 py-1 text-[9.5px] font-bold text-[#13915D]">
                              Saved
                            </span>
                            <MoreVertical size={15} className="text-[#6B8495]" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Plan + usage */}
                <div className="min-h-0 rounded-[16px] border border-[#E1E4E2] bg-white/95 p-4 shadow-[0_12px_32px_rgba(55,49,39,0.08)]" data-tour="usage">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Crown size={17} className="text-[#B57B16]" />
                      <h3 className="text-[15px] font-bold text-[#102D47]">Your Plan &amp; Usage</h3>
                    </div>
                    <button
                      onClick={() => setActiveView('credits')}
                      className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1760C8] hover:underline"
                    >
                      Manage Plan
                      <ArrowRight size={12} />
                    </button>
                  </div>

                  <div className="overflow-hidden rounded-[12px] border border-[#D9E4EB]">
                    <div className="flex min-h-[62px] items-center justify-between gap-3 border-b border-[#E3EBF0] px-4 py-2.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0F3F6] text-[#173E59]">
                          <Crown size={16} />
                        </div>
                        <div>
                          <p className="text-[12px] font-bold text-[#102D47]">
                            {(subData.plan || 'free').charAt(0).toUpperCase() + (subData.plan || 'free').slice(1)} Plan
                          </p>
                          <p className="mt-0.5 text-[10px] text-[#7991A2]">
                            CareerSense subscription
                          </p>
                        </div>
                      </div>
                      {(subData.plan || 'free').toLowerCase() === 'free' && (
                        <button
                          onClick={() => setActiveView('credits')}
                          className="h-8 rounded-[8px] bg-[#A56E16] px-4 text-[10.5px] font-bold text-white transition hover:bg-[#8E5D10]"
                        >
                          Upgrade
                        </button>
                      )}
                    </div>

                    <div className="px-4 py-3">
                      <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2 font-semibold text-[#173E59]">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF3FF] text-[#1760C8]">
                            <Zap size={14} />
                          </div>
                          AI Tokens Remaining
                        </div>
                        <span className="font-bold text-[#1760C8]">
                          {(subData.tokensRemaining ?? 30000).toLocaleString()} / 10,000
                        </span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E4EEE9]">
                        <div
                          className="h-full rounded-full bg-[#13A36D] transition-all duration-500"
                          style={{ width: `${tokenPercent}%` }}
                        />
                      </div>
                      <p className="mt-1 text-right text-[9.5px] font-bold text-[#13A36D]">{tokenPercent}%</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-start gap-3 rounded-[12px] border border-[#F0D7A8] bg-[#FFF8EA] p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F9E8C5] text-[#AE7618]">
                      <Lightbulb size={16} />
                    </div>
                    <div>
                      <p className="text-[11.5px] font-bold text-[#9C6512]">Pro Tip</p>
                      <p className="mt-0.5 text-[10.5px] leading-[1.45] text-[#5B6670]">
                        {totalDataSources < 2
                          ? 'Add more data sources — resumes and job descriptions — to get more tailored cover letters.'
                          : pipelineFocus === 'Optimization'
                            ? 'Try a different template and refine your strongest achievements before exporting.'
                            : `Your current focus is ${pipelineFocus}. Completing it will improve future drafts.`}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeView === 'letters' && (
            <ListView
              title="My Letters"
              description="Open any saved cover letter and continue editing it anytime."
              items={savedLetters}
              emptyText="No letters saved yet."
              onOpen={openSavedLetterInBuilder}
              onDelete={deleteSavedLetter}
            />
          )}

          {activeView === 'templates' && <TemplatesView />}
          {activeView === 'resumes' && <ResumeView />}
          {activeView === 'credits' && <CreditsView usage={creditUsage} subData={subData} />}
          {activeView === 'profile' && <ProfileView />}
        </div>
      </main>

      <DashboardTour open={isTourOpen} onClose={() => setIsTourOpen(false)} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600&display=swap');

        @media (min-width: 1024px) and (max-height: 850px) {
          .dashboard-overview {
            min-height: calc(100vh - 100px);
          }

          .dashboard-overview > section:first-child {
            margin-bottom: 12px;
          }

          .dashboard-overview h2 {
            font-size: 34px;
          }
        }
      `}</style>
    </div>
  );
};

const DashboardBackdrop = () => (
  <div className="pointer-events-none fixed bottom-0 left-0 right-0 top-[72px] overflow-hidden lg:left-[300px]">
    <img
      src={dashboardBackground}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover object-center"
    />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,243,234,.90)_0%,rgba(248,243,234,.78)_36%,rgba(248,243,234,.69)_68%,rgba(248,243,234,.76)_100%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.12),rgba(248,243,234,.22)_55%,rgba(248,243,234,.42))]" />
  </div>
);

const OverviewMetricCard = ({ icon: Icon, title, value, helper, percent, tone = 'blue' }) => {
  const tones = {
    blue: {
      card: 'border-[#D2E1EF] bg-[#F8FBFF]/95',
      icon: 'bg-[#E7F1FF] text-[#1760C8]',
      bar: 'bg-[#1760C8]',
      track: 'bg-[#E2EAF2]',
      helper: 'text-[#239466]',
    },
    green: {
      card: 'border-[#D0E8DB] bg-[#F8FCFA]/95',
      icon: 'bg-[#E6F6EE] text-[#138B57]',
      bar: 'bg-[#14A269]',
      track: 'bg-[#E1EEE7]',
      helper: 'text-[#138B57]',
    },
    gold: {
      card: 'border-[#EBDDBD] bg-[#FFFCF7]/95',
      icon: 'bg-[#FFF2D8] text-[#AD7414]',
      bar: 'bg-[#B47A16]',
      track: 'bg-[#F1E8D7]',
      helper: 'text-[#9B6A18]',
    },
    purple: {
      card: 'border-[#DED8F0] bg-[#FBFAFF]/95',
      icon: 'bg-[#EEEAFE] text-[#49369B]',
      bar: 'bg-[#49369B]',
      track: 'bg-[#EBE8F5]',
      helper: 'text-[#49369B]',
    },
  };

  const palette = tones[tone] || tones.blue;

  return (
    <div className={`min-h-[120px] rounded-[14px] border p-4 shadow-[0_10px_25px_rgba(48,48,40,.06)] ${palette.card}`}>
      <div className="flex items-center gap-3">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${palette.icon}`}>
          <Icon size={22} strokeWidth={1.9} />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-[#23445D]">{title}</p>
          <p className="mt-1 text-[23px] font-black tracking-[-0.03em] text-[#102D47]">{value}</p>
        </div>
      </div>

      {typeof percent === 'number' ? (
        <div className="mt-3 flex items-center gap-2.5">
          <div className={`h-2 flex-1 overflow-hidden rounded-full ${palette.track}`}>
            <div
              className={`h-full rounded-full ${palette.bar}`}
              style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
            />
          </div>
          {helper && <span className={`text-[10px] font-bold ${palette.helper}`}>{helper}</span>}
        </div>
      ) : (
        helper && <p className={`mt-3 text-[10.5px] font-semibold ${palette.helper}`}>{helper}</p>
      )}
    </div>
  );
};

const HeroMetric = ({ title, value, subtitle }) => (
  <div className="rounded-2xl border border-white/70 bg-white/82 p-4 shadow-[0_14px_36px_rgba(47,65,86,0.08)] backdrop-blur-xl">
    <div className="mb-3 flex items-center justify-between">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#567C8D]">{title}</p>
      <span className="h-2 w-2 rounded-full bg-[#567C8D]"></span>
    </div>
    <p className="text-2xl font-extrabold tracking-tight text-[#2F4156]">{value}</p>
    <p className="mt-1 text-[11px] font-medium text-[#567C8D]">{subtitle}</p>
  </div>
);

const Step = ({ icon: Icon, label, status }) => {
  let wrapperClass = 'border-[#C8D9E6] bg-white text-[#567C8D]';
  let labelClass = 'text-[#567C8D]';

  if (status === 'completed') {
    wrapperClass = 'border-[#567C8D] bg-[#567C8D] text-white';
    labelClass = 'text-[#567C8D]';
  } else if (status === 'current') {
    wrapperClass = 'border-[#2F4156] bg-[#2F4156] text-white';
    labelClass = 'text-[#2F4156]';
  }

  return (
    <div className="relative z-10 flex flex-col items-center gap-2 bg-transparent px-1">
      <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-300 ${wrapperClass}`}>
        <Icon size={16} strokeWidth={2.4} />
      </div>
      <div className="text-center">
        <p className={`text-[10px] font-bold uppercase tracking-[0.16em] ${labelClass}`}>{label}</p>
        <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#567C8D]/75">
          {status === 'completed' ? 'Completed' : status === 'current' ? 'In Progress' : 'Pending'}
        </p>
      </div>
    </div>
  );
};

const ActionItem = ({ text, action, isDone, onClick }) => (
  <div className="flex flex-col gap-3 rounded-2xl border border-[#C8D9E6] bg-[#F5EFEB]/55 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-3">
      {isDone && (
        <span className="shrink-0 rounded-full border border-[#C8D9E6] bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#567C8D]">
          Done
        </span>
      )}
      <p className={`text-[13px] font-semibold ${isDone ? 'text-[#567C8D]/65 line-through' : 'text-[#2F4156]'}`}>{text}</p>
    </div>
    <button
      onClick={onClick}
      className={`h-9 shrink-0 rounded-xl px-4 text-[12px] font-bold transition ${isDone
          ? 'border border-[#C8D9E6] bg-white text-[#567C8D] hover:bg-[#F5EFEB]'
          : 'bg-[#2F4156] text-white hover:bg-[#233244]'
        }`}
    >
      {action}
    </button>
  </div>
);

const PipelineStat = ({ label, value }) => (
  <div className="flex items-center justify-between rounded-xl border border-[#C8D9E6] bg-white px-3.5 py-2.5 text-[12px]">
    <span className="font-semibold text-[#567C8D]">{label}</span>
    <span className="font-bold text-[#2F4156]">{value}</span>
  </div>
);

const ProgressMetric = ({ label, value, width, helper }) => (
  <div>
    <div className="mb-2 flex items-center justify-between text-[11px] font-bold">
      <span className="text-[#567C8D]">{label}</span>
      <span className="text-[#2F4156]">{value}</span>
    </div>
    <ProgressBar width={width} />
    <p className="mt-1.5 text-[10px] text-[#567C8D]">{helper}</p>
  </div>
);

const ProgressBar = ({ percent, width }) => (
  <div className="h-2 w-full overflow-hidden rounded-full bg-[#C8D9E6]/45">
    <div
      className="h-full rounded-full bg-[#567C8D] transition-all duration-500"
      style={{ width: width || `${percent}%` }}
    />
  </div>
);

const MetricBar = ({ label, value, width, helper, colorClass = 'bg-[#2F4156]' }) => (
  <div>
    <div className="mb-2 flex items-center justify-between text-[13px] font-bold text-[#2F4156]">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <ProgressBar percent={Number.parseFloat(width) || 0} width={width} />
    <p className="mt-1.5 text-[11px] font-medium text-[#567C8D]">{helper}</p>
  </div>
);

const EmptyState = ({ title, description }) => (
  <div className="rounded-2xl border border-dashed border-[#C8D9E6] bg-[#F5EFEB]/55 p-6 text-center">
    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#C8D9E6] bg-white text-[#567C8D] shadow-sm">
      <FileText size={18} />
    </div>
    <p className="text-[14px] font-bold text-[#2F4156]">{title}</p>
    <p className="mt-2 text-[12px] text-[#567C8D]">{description}</p>
  </div>
);

const ListView = ({ title, description, items, emptyText, onOpen, onDelete }) => (
  <section className="space-y-4">
    <div className="overflow-hidden rounded-[24px] border border-white/70 bg-white/82 shadow-[0_18px_48px_rgba(47,65,86,0.08)] backdrop-blur-xl">
      <div className="border-b border-[#C8D9E6] p-4 sm:p-6">
        <h2 className="text-xl font-extrabold tracking-tight text-[#2F4156]">{title}</h2>
        <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-[#567C8D]">{description}</p>
      </div>

      {items.length > 0 ? (
        <div className="divide-y divide-[#C8D9E6]/55 bg-white/50">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#C8D9E6] bg-[#F5EFEB] text-[#567C8D]">
                  <FileText size={18} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#2F4156]">{item.title}</h3>
                  <p className="mt-0.5 text-[12px] text-[#567C8D]">{item.company} · {formatDate(item.updatedAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => onOpen(item.id)}
                  className="inline-flex h-9 items-center gap-2 rounded-xl bg-[#2F4156] px-4 text-[12px] font-bold text-white transition hover:bg-[#233244]"
                >
                  <PenLine size={13} /> Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 transition hover:bg-rose-100"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="No items found" description={emptyText} />
      )}
    </div>
  </section>
);

const TemplatesView = () => (
  <Suspense
    fallback={
      <div className="flex h-[400px] flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-[#567C8D]" size={28} />
        <p className="text-[13px] font-bold text-[#567C8D]">Loading template studio...</p>
      </div>
    }
  >
    <TemplateLibraryPage />
  </Suspense>
);

const ResumeView = () => {
  const storedResumes = useStore((state) => state.storedResumes);
  const storedJobDescriptions = useStore((state) => state.storedJobDescriptions);
  const addStoredResume = useStore((state) => state.addStoredResume);
  const addStoredJobDescription = useStore((state) => state.addStoredJobDescription);
  const deleteStoredResume = useStore((state) => state.deleteStoredResume);
  const deleteStoredJobDescription = useStore((state) => state.deleteStoredJobDescription);

  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [isUploadingJobDescription, setIsUploadingJobDescription] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setUploadError('Resume uploads support PDF files only.');
      return;
    }

    try {
      setIsUploadingResume(true);
      setUploadError('');
      const text = await extractTextFromPDF(file);
      if (!hasUsablePdfText(text)) throw new Error('Could not extract enough resume text from that file.');
      const parsedData = parseResumeData(text);
      addStoredResume({ name: file.name, text, skills: parsedData.skills });
    } catch (error) {
      console.error('Resume upload failed', error);
      setUploadError(error.message || 'Failed to save resume.');
    } finally {
      setIsUploadingResume(false);
    }
  };

  const handleJobDescriptionUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isText = file.type.startsWith('text/') || /\.(txt|md)$/i.test(file.name);

    if (!isPdf && !isText) {
      setUploadError('Job description uploads support PDF, TXT, and Markdown files.');
      return;
    }

    try {
      setIsUploadingJobDescription(true);
      setUploadError('');
      const text = isPdf ? await extractTextFromPDF(file) : await file.text();
      const cleanedText = text.replace(/\s+\n/g, '\n').trim();
      if (cleanedText.length < 40) throw new Error('Could not extract enough job description text from that file.');
      addStoredJobDescription({ name: file.name, text: cleanedText });
    } catch (error) {
      console.error('Job description upload failed', error);
      setUploadError(error.message || 'Failed to save job description.');
    } finally {
      setIsUploadingJobDescription(false);
    }
  };

  return (
    <section className="space-y-4">
      <div className="rounded-[24px] border border-white/70 bg-white/82 p-5 shadow-[0_18px_48px_rgba(47,65,86,0.08)] backdrop-blur-xl sm:p-6">
        <h2 className="text-xl font-extrabold tracking-tight text-[#2F4156]">Data Sources</h2>
        <p className="mt-1 text-[13px] text-[#567C8D]">Store resumes and job descriptions here, then reuse them inside the builder.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#C8D9E6] bg-[#F5EFEB]/55 px-4 py-3 shadow-sm transition hover:bg-white">
            <div>
              <p className="text-[14px] font-bold text-[#2F4156]">Upload Resume</p>
              <p className="mt-0.5 text-[11px] text-[#567C8D]">PDF resumes saved with stored date.</p>
            </div>
            {isUploadingResume ? <Loader2 size={16} className="animate-spin text-[#567C8D]" /> : <UploadCloud size={16} className="text-[#567C8D]" />}
            <input type="file" className="hidden" accept=".pdf,application/pdf" onChange={handleResumeUpload} />
          </label>

          <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#C8D9E6] bg-[#F5EFEB]/55 px-4 py-3 shadow-sm transition hover:bg-white">
            <div>
              <p className="text-[14px] font-bold text-[#2F4156]">Upload Job Description</p>
              <p className="mt-0.5 text-[11px] text-[#567C8D]">PDF, TXT, and Markdown supported.</p>
            </div>
            {isUploadingJobDescription ? <Loader2 size={16} className="animate-spin text-[#567C8D]" /> : <UploadCloud size={16} className="text-[#567C8D]" />}
            <input type="file" className="hidden" accept=".pdf,.txt,.md,text/plain,text/markdown,application/pdf" onChange={handleJobDescriptionUpload} />
          </label>
        </div>

        {uploadError && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-2.5 text-xs font-bold text-red-600">
            <AlertCircle size={14} />
            {uploadError}
          </div>
        )}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <DocumentListCard
          title="Stored Resumes"
          description="Available when building from Resume or Resume + JD."
          items={storedResumes}
          emptyText="No resumes stored yet."
          onDelete={deleteStoredResume}
        />
        <DocumentListCard
          title="Stored Job Descriptions"
          description="Available when building from Resume + JD."
          items={storedJobDescriptions}
          emptyText="No job descriptions stored yet."
          onDelete={deleteStoredJobDescription}
        />
      </div>
    </section>
  );
};

const DocumentListCard = ({ title, description, items, emptyText, onDelete }) => (
  <section className="rounded-[24px] border border-white/70 bg-white/82 p-4 shadow-[0_18px_48px_rgba(47,65,86,0.08)] backdrop-blur-xl sm:p-5">
    <div className="mb-4">
      <h3 className="text-[15px] font-bold text-[#2F4156]">{title}</h3>
      <p className="mt-0.5 text-[12px] text-[#567C8D]">{description}</p>
    </div>

    {items.length === 0 ? (
      <EmptyState title={emptyText} description="Add a file here and it becomes available inside the builder." />
    ) : (
      <div className="divide-y divide-[#C8D9E6]/55 rounded-2xl border border-[#C8D9E6]/55">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3 px-3 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-[13px] font-bold text-[#2F4156]">{item.name}</p>
              <p className="mt-0.5 text-[11px] text-[#567C8D]">Saved {formatSourceDate(item.createdAt)}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-full border border-[#C8D9E6] bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#567C8D]">
                {item.type === 'resume' ? 'Resume' : 'JD'}
              </span>
              <button
                onClick={() => onDelete?.(item.id)}
                className="rounded-xl border border-[#C8D9E6] bg-white p-1.5 text-[#567C8D] shadow-sm transition hover:bg-red-50 hover:text-red-600"
                aria-label={`Delete ${item.name}`}
                title={`Delete ${item.name}`}
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </section>
);

const CreditsView = ({ usage, subData }) => {
  const records = usage.records || [];

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-[24px] border border-white/70 bg-white/82 shadow-[0_18px_48px_rgba(47,65,86,0.08)] backdrop-blur-xl">
        <div className="border-b border-[#C8D9E6] p-4 sm:p-6">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#567C8D]">Platform Metrics</p>
          <h2 className="text-xl font-extrabold tracking-tight text-[#2F4156]">Usage & Billing Ledger</h2>
          <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-[#567C8D]">
            Track AI tokens remaining, subscription tier, and overall billing across cover letters.
          </p>
        </div>

        <div className="grid gap-3 bg-[#F5EFEB]/55 p-4 sm:gap-4 sm:p-6 sm:grid-cols-2 xl:grid-cols-4">
          <CreditStat label="AI Tokens Remaining" value={(subData?.tokensRemaining ?? 30000).toLocaleString()} helper="CareerSense Reverse Balance" tone="ink" />
          <CreditStat label="Lifetime tokens used" value={(usage.totalPoints || 0).toLocaleString()} helper="Total Platform Consumption" tone="mist" />
          <CreditStat label="Lifetime bills" value={formatUsd(usage.totalBillUsd)} helper="Bills are managed by careersenseAi, you dont need to pay" tone="teal" />
          <CreditStat label="Active Operational Tier" value={`${(subData?.plan || 'free').toUpperCase()} Plan`} helper="CareerSense Subscription" tone="amber" href="https://careersenseai.com/pricing" />
        </div>
      </div>

      <div className="rounded-[24px] border border-white/70 bg-white/82 p-4 shadow-[0_18px_48px_rgba(47,65,86,0.08)] backdrop-blur-xl sm:p-6">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-[#2F4156]">Transaction History</h3>
            <p className="mt-0.5 text-[12px] text-[#567C8D]">A detailed ledger of API and extraction usage.</p>
          </div>
          <span className="w-fit rounded-full border border-[#C8D9E6] bg-[#F5EFEB] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#567C8D]">
            System Logs
          </span>
        </div>

        {records.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-[#C8D9E6]">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-[1.15fr_1fr_0.8fr_0.7fr] gap-3 bg-[#F5EFEB]/55 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#567C8D]">
                <span>Operation</span>
                <span>Resource</span>
                <span>Timestamp</span>
                <span className="text-right">Units</span>
              </div>
              <div className="divide-y divide-[#C8D9E6]/55">
                {records.map((record) => (
                  <div key={record.id} className="grid grid-cols-[1.15fr_1fr_0.8fr_0.7fr] gap-3 px-4 py-3 text-[12px]">
                    <div>
                      <p className="font-bold text-[#2F4156]">{record.feature}</p>
                      <p className="mt-0.5 text-[10px] font-medium text-[#567C8D]">{record.status}</p>
                    </div>
                    <p className="flex items-center font-medium text-[#567C8D]">{record.label}</p>
                    <p className="flex items-center font-medium text-[#567C8D]">{formatDate(record.createdAt)}</p>
                    <p className="flex items-center justify-end text-right font-bold text-[#2F4156]">{formatPoints(record.totalPoints)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <EmptyState
            title="No operations logged"
            description="Generate a document from a data source and the operational cost will appear here automatically."
          />
        )}
      </div>
    </section>
  );
};

const CreditStat = ({ label, value, helper, tone }) => {
  const dotClass =
    tone === 'teal' ? 'bg-[#567C8D]' : tone === 'mist' ? 'bg-[#C8D9E6]' : 'bg-[#2F4156]';

  return (
    <div className="rounded-2xl border border-[#C8D9E6] bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#567C8D]">{label}</p>
        <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`}></span>
      </div>
      <p className="text-2xl font-extrabold tracking-tight text-[#2F4156]">{value}</p>
      <p className="mt-1 text-[11px] font-medium text-[#567C8D]">{helper}</p>
    </div>
  );
};

const formatPoints = (value) => new Intl.NumberFormat('en-US').format(Math.round(Number(value) || 0));
const formatUsd = (value) => `$${(Number(value) || 0).toFixed(4)}`;

const formatDate = (value) => {
  if (!value) return 'Not available';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
};

const formatSourceDate = (value) => {
  if (!value) return 'Not available';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
};

const ProfileView = () => {
  const profile = useStore((state) => state.profile);

  const fields = [
    { key: 'fullName', label: 'Full name', value: profile.fullName || '—', type: 'text' },
    { key: 'email', label: 'Email address', value: profile.email || '—', type: 'email' },
    { key: 'phone', label: 'Phone number', value: profile.phone || '—', type: 'text' },
    { key: 'address', label: 'Location / City', value: profile.address || '—', type: 'text' },
    { key: 'linkedinPortfolio', label: 'LinkedIn / Portfolio', value: profile.linkedinPortfolio || '—', type: 'text' },
  ];

  return (
    <section className="rounded-[24px] border border-white/70 bg-white/82 p-5 shadow-[0_18px_48px_rgba(47,65,86,0.08)] backdrop-blur-xl sm:p-6">
      <h2 className="text-xl font-extrabold tracking-tight text-[#2F4156]">Profile Context (Read-Only)</h2>
      <p className="mt-1 text-[13px] text-[#567C8D]">Below is your active workspace profile synced from your master account. Used to prefill cover letter builder sessions.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key} className="block group">
            <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#567C8D]">
              {field.label}
            </span>
            <div className="flex h-10 w-full items-center rounded-xl border border-[#C8D9E6] bg-slate-50 px-3 text-[13px] font-bold text-[#2F4156] shadow-sm">
              {field.value}
            </div>
          </div>
        ))}
        <div className="md:col-span-2">
          <div className="grid gap-5 md:grid-cols-[2fr_1fr_1fr]">
            <div className="block group">
              <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#567C8D]">
                Current job title
              </span>
              <div className="flex h-10 w-full items-center rounded-xl border border-[#C8D9E6] bg-slate-50 px-3 text-[13px] font-bold text-[#2F4156] shadow-sm">
                {profile.currentJobTitle || '—'}
              </div>
            </div>
            <div className="group md:col-span-2">
              <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#567C8D]">
                Experience
              </span>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex h-10 w-full items-center rounded-xl border border-[#C8D9E6] bg-slate-50 px-3 text-[13px] font-bold text-[#2F4156] shadow-sm">
                  {profile.experienceYears ? `${profile.experienceYears} Years` : '—'}
                </div>
                <div className="flex h-10 w-full items-center rounded-xl border border-[#C8D9E6] bg-slate-50 px-3 text-[13px] font-bold text-[#2F4156] shadow-sm">
                  {profile.experienceMonths ? `${profile.experienceMonths} Months` : '—'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end border-t border-[#C8D9E6] pt-5">
        <a
          href="https://careersenseai.com/dashboard?tab=My%20Profile"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-[#2F4156] px-5 text-[13px] font-bold text-white shadow-sm transition-colors hover:bg-[#233244] active:scale-95 sm:w-auto"
        >
          Edit Profile ↗
        </a>
      </div>
    </section>
  );
};

export default Dashboard;
