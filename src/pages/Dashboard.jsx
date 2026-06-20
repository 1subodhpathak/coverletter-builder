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
  PenLine,
  Plus,
  Sparkles,
  Target,
  Trash2,
  UploadCloud,
  UserRound,
  Zap,
} from 'lucide-react';
import { templateCount } from '../components/templates/templateCatalog';
import { getCareerSenseUsage } from '../services/careerSensePoints';
import { useStore } from '../store/useStore';
import { extractTextFromPDF, hasUsablePdfText, parseResumeData } from '../services/pdfService';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

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

  const [activeView, setActiveView] = useState('dashboard');
  const [creditUsage, setCreditUsage] = useState(() => getCareerSenseUsage());

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
      setCreditUsage(getCareerSenseUsage());
    }
  }, [activeView]);

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

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F5EFEB] font-sans text-[#2F4156] selection:bg-[#C8D9E6]">
      <DashboardBackdrop />

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] border-r border-[#C8D9E6] bg-white/78 px-4 py-5 shadow-[0_24px_60px_rgba(47,65,86,0.08)] backdrop-blur-xl lg:block">
        <button onClick={() => navigate('/')} className="mb-7 flex items-center gap-3 px-2 text-left transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2F4156] text-white shadow-sm">
            <FileText size={17} strokeWidth={2.4} />
          </div>
          <div>
            <p className="text-[14px] font-bold leading-none tracking-tight text-[#2F4156]">CareerSense</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#567C8D]">Workspace</p>
          </div>
        </button>

        <nav className="space-y-1" aria-label="Dashboard">
          {navItems.map(({ id, label, icon: Icon }) => {
            const active = activeView === id;
            return (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-[#C8D9E6]/55 text-[#2F4156] shadow-sm'
                    : 'text-[#567C8D] hover:bg-white/70 hover:text-[#2F4156]'
                }`}
              >
                <Icon size={16} strokeWidth={active ? 2.5 : 2} />
                {label}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="relative lg:ml-[248px]">
        <header className="sticky top-0 z-30 border-b border-[#C8D9E6] bg-white/72 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <h1 className="text-[17px] font-bold tracking-tight text-[#2F4156]">{activeLabel}</h1>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 lg:flex">
                <div className="flex items-center gap-2 rounded-full border border-[#C8D9E6] bg-white/75 px-3 py-1.5 text-[11px] font-bold text-[#567C8D]">
                  <Zap size={12} className="text-[#567C8D]" />
                  Career Points Used
                  <span className="text-[#2F4156]">{formatPoints(creditUsage.totalPoints)}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#C8D9E6] bg-white/75 px-3 py-1.5 text-[11px] font-bold text-[#567C8D]">
                  <CreditCard size={12} className="text-[#567C8D]" />
                  Estimated Cost
                  <span className="text-[#2F4156]">{formatUsd(creditUsage.totalBillUsd)}</span>
                </div>
              </div>
              <button
                        onClick={startBuilder}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2F4156] px-5 text-[13px] font-bold text-white transition hover:bg-[#233244]"
                      >
                        <PenLine size={14} />
                        Initialize Builder
                      </button>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="inline-flex h-10 items-center justify-center rounded-xl bg-[#2F4156] px-5 text-[13px] font-bold text-white hover:bg-[#233244] shadow-sm transition">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </header>

        <nav className="sticky top-16 z-20 border-b border-[#C8D9E6] bg-white/86 px-3 py-2 backdrop-blur-xl lg:hidden" aria-label="Mobile dashboard">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map(({ id, label, icon: Icon }) => {
              const active = activeView === id;
              return (
                <button
                  key={id}
                  onClick={() => handleNav(id)}
                  className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border px-3 text-[12px] font-bold transition ${
                    active
                      ? 'border-[#C8D9E6] bg-[#C8D9E6]/45 text-[#2F4156]'
                      : 'border-[#C8D9E6] bg-white/90 text-[#567C8D]'
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          {activeView === 'dashboard' && (
            <div className="space-y-6">
              <section className="overflow-hidden rounded-[28px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.68),rgba(200,217,230,0.22))] shadow-[0_24px_70px_rgba(47,65,86,0.12)] backdrop-blur-xl">
                <div className="grid gap-6 p-6 lg:grid-cols-[1.08fr_0.92fr] lg:p-8">
                  <div className="flex flex-col justify-center">
                    <div className="mb-5 inline-flex w-fit items-center gap-2 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#567C8D]">
                      Dashboard Overview
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-[#2F4156] md:text-4xl">
                      Welcome back, <span className="text-[#567C8D]">{userName}</span>.
                    </h2>
                    <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#567C8D]">
                      Your workspace is live. Resume storage, job-description storage, cover letters, profile completion,
                      and template usage are all now pulled from the real saved data in your builder.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        onClick={startBuilder}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2F4156] px-5 text-[13px] font-bold text-white transition hover:bg-[#233244]"
                      >
                        <PenLine size={14} />
                        Initialize Builder
                      </button>
                      <button
                        onClick={() => setActiveView('templates')}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#C8D9E6] bg-white/80 px-5 text-[13px] font-bold text-[#2F4156] transition hover:bg-white"
                      >
                        <LayoutTemplate size={14} />
                        Browse Templates
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {stats.map((stat) => (
                      <HeroMetric key={stat.label} title={stat.label} value={stat.value} subtitle={stat.helper} />
                    ))}
                  </div>
                </div>
              </section>

              <section className="grid gap-6 xl:grid-cols-[1fr_344px]">
                <div className="space-y-6">
                  <section className="flex flex-col gap-4 rounded-[24px] border border-white/70 bg-white/82 p-5 shadow-[0_18px_48px_rgba(47,65,86,0.08)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C8D9E6]/50 text-xl font-bold text-[#2F4156]">
                        {userName.charAt(0).toUpperCase()}
                        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#567C8D] text-white ring-2 ring-white">
                          <Sparkles size={10} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-[16px] font-bold text-[#2F4156]">{profile.fullName || 'Complete Your Profile'}</h3>
                        <p className="mt-0.5 text-[13px] text-[#567C8D]">{profile.currentJobTitle || 'Add your current job title to personalize drafts'}</p>
                      </div>
                    </div>

                    <div className="flex w-full flex-col gap-2 sm:w-[230px]">
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#567C8D]">
                        <span>{profileCompleteness}% complete</span>
                        <span>{profileCompletedFields}/{PROFILE_FIELDS.length}</span>
                      </div>
                      <ProgressBar percent={profileCompleteness} />
                    </div>

                    <button
                      onClick={() => setActiveView('profile')}
                      className="h-10 shrink-0 rounded-xl border border-[#C8D9E6] bg-[#C8D9E6]/35 px-4 text-[13px] font-bold text-[#2F4156] transition hover:bg-[#C8D9E6]/55"
                    >
                      Edit Profile
                    </button>
                  </section>

                  <section className="rounded-[24px] border border-white/70 bg-white/82 p-6 shadow-[0_18px_48px_rgba(47,65,86,0.08)] backdrop-blur-xl">
                    <div className="mb-8 flex items-center justify-between">
                      <div>
                        <h3 className="text-[16px] font-bold text-[#2F4156]">Creation Pipeline</h3>
                        <p className="mt-1 text-[13px] text-[#567C8D]">
                          Current focus: <span className="font-bold text-[#2F4156]">{pipelineFocus}</span>
                        </p>
                      </div>
                    </div>

                    <div className="relative mb-10 mt-6 flex justify-between px-1 sm:px-4">
                      <div className="absolute left-5 right-5 top-5 h-px -translate-y-1/2 bg-[#C8D9E6]"></div>
                      <Step
                        icon={UserRound}
                        label="Profile"
                        status={profileCompleteness === 100 ? 'completed' : 'current'}
                      />
                      <Step
                        icon={UploadCloud}
                        label="Sources"
                        status={totalDataSources > 0 ? 'completed' : profileCompleteness === 100 ? 'current' : 'pending'}
                      />
                      <Step
                        icon={LayoutTemplate}
                        label="Template"
                        status={configuredTemplates > 0 ? 'completed' : totalDataSources > 0 ? 'current' : 'pending'}
                      />
                      <Step
                        icon={BrainCircuit}
                        label="Draft"
                        status={savedLetters.length > 0 ? 'completed' : configuredTemplates > 0 ? 'current' : 'pending'}
                      />
                      <Step icon={Check} label="Export" status="pending" />
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[14px] font-bold text-[#2F4156]">Recommended Actions</h4>
                      {actionItems.map((item) => (
                        <ActionItem key={item.key} {...item} />
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[24px] border border-white/70 bg-white/82 p-5 shadow-[0_18px_48px_rgba(47,65,86,0.08)] backdrop-blur-xl sm:p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <h3 className="text-[16px] font-bold text-[#2F4156]">Recent Letters</h3>
                      <button onClick={() => setActiveView('letters')} className="text-[12px] font-semibold text-[#567C8D] hover:text-[#2F4156] hover:underline">
                        View All
                      </button>
                    </div>

                    {recentLetters.length === 0 ? (
                      <EmptyState
                        title="No saved letters yet"
                        description="Create a cover letter in the builder and it will appear here automatically."
                      />
                    ) : (
                      <div className="divide-y divide-[#C8D9E6]/55">
                        {recentLetters.map((letter) => (
                          <button
                            key={letter.id}
                            onClick={() => openSavedLetterInBuilder(letter.id)}
                            className="group flex w-full flex-col gap-3 py-4 text-left first:pt-0 last:pb-0 md:flex-row md:items-center md:justify-between"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#C8D9E6] bg-[#F5EFEB] text-[#567C8D] transition-colors group-hover:bg-[#C8D9E6]/45 group-hover:text-[#2F4156]">
                                <FileText size={17} strokeWidth={2} />
                              </div>
                              <div>
                                <p className="text-[14px] font-bold text-[#2F4156] transition-colors group-hover:text-[#567C8D]">{letter.title}</p>
                                <p className="mt-0.5 text-[12px] text-[#567C8D]">{letter.company} · {formatDate(letter.updatedAt)}</p>
                              </div>
                            </div>
                            <span className="w-fit rounded-full border border-[#C8D9E6] bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#567C8D]">
                              Saved
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </section>
                </div>

                <div className="space-y-6">
                  <section className="rounded-[24px] border border-white/70 bg-white/82 p-5 shadow-[0_18px_48px_rgba(47,65,86,0.08)] backdrop-blur-xl">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-[14px] font-bold text-[#2F4156]">Profile Snapshot</h3>
                      <button
                        onClick={() => setActiveView('profile')}
                        className="rounded-lg border border-[#C8D9E6] bg-[#F5EFEB] px-2.5 py-1 text-[11px] font-bold text-[#567C8D] transition hover:bg-white"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="flex items-start gap-3 rounded-2xl border border-[#C8D9E6] bg-[#F5EFEB]/55 p-3.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#C8D9E6]/65 text-[#2F4156]">
                        <Target size={16} />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-[#2F4156]">{profile.currentJobTitle || 'No current job title saved yet'}</p>
                        <p className="mt-0.5 text-[11px] text-[#567C8D]">{profile.address || 'Location not added yet'}</p>
                      </div>
                    </div>
                  </section>

                  <section className="rounded-[24px] border border-white/70 bg-white/82 p-6 shadow-[0_18px_48px_rgba(47,65,86,0.08)] backdrop-blur-xl">
                    <h3 className="mb-6 text-[15px] font-bold text-[#2F4156]">System Metrics</h3>

                    <div className="space-y-5">
                      <MetricBar
                        label="Profile Completeness"
                        value={`${profileCompleteness}%`}
                        width={`${profileCompleteness}%`}
                        helper={`${profileCompletedFields} of ${PROFILE_FIELDS.length} fields filled`}
                      />
                      <MetricBar
                        label="Data Sources Attached"
                        value={`${dataSourcePercent}%`}
                        width={`${dataSourcePercent}%`}
                        helper={`${clampedDataSources} of ${MAX_DATA_SOURCES} sources stored`}
                        colorClass="bg-[#567C8D]"
                      />
                      <MetricBar
                        label="Templates Configured"
                        value={`${templatePercent}%`}
                        width={`${templatePercent}%`}
                        helper={`${configuredTemplates} of ${templateCount} templates used`}
                      />
                    </div>

                    <div className="mb-4 mt-8">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#567C8D]">Pipeline Activity</p>
                    </div>

                    <div className="space-y-3">
                      <PipelineStat label="Saved in workspace" value={savedLetters.length} />
                      <PipelineStat label="Resumes stored" value={storedResumes.length} />
                      <PipelineStat label="JDs stored" value={storedJobDescriptions.length} />
                      <PipelineStat label="Profile fields done" value={`${profileCompletedFields}/${PROFILE_FIELDS.length}`} />
                    </div>
                  </section>
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
          {activeView === 'credits' && <CreditsView usage={creditUsage} />}
          {activeView === 'profile' && <ProfileView />}
        </div>
      </main>
    </div>
  );
};

const DashboardBackdrop = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      className="absolute inset-0 opacity-55"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(86, 124, 141, 0.13) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(86, 124, 141, 0.11) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
      }}
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(200,217,230,0.78),transparent_26%),radial-gradient(circle_at_82%_14%,rgba(86,124,141,0.12),transparent_30%),radial-gradient(circle_at_72%_74%,rgba(200,217,230,0.26),transparent_34%),linear-gradient(180deg,rgba(245,239,235,0.72),rgba(255,255,255,0.32)_48%,rgba(245,239,235,0.92))]" />
    <svg className="absolute inset-0 h-full w-full opacity-35">
      <defs>
        <linearGradient id="dashboard-flow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={BUILDER_COLORS.teal} stopOpacity="0" />
          <stop offset="40%" stopColor={BUILDER_COLORS.teal} stopOpacity="0.45" />
          <stop offset="72%" stopColor={BUILDER_COLORS.mist} stopOpacity="0.36" />
          <stop offset="100%" stopColor={BUILDER_COLORS.paper} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M -120 330 C 220 120, 460 260, 760 210 S 1180 240, 1520 30" fill="none" stroke="url(#dashboard-flow)" strokeWidth="1.6" />
      <path d="M -100 760 C 200 590, 420 520, 760 640 S 1180 780, 1520 500" fill="none" stroke="url(#dashboard-flow)" strokeWidth="1.35" />
      <path d="M 80 -120 C 340 160, 620 220, 900 160 S 1220 250, 1520 630" fill="none" stroke="url(#dashboard-flow)" strokeWidth="1.1" opacity="0.72" />
    </svg>
  </div>
);

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
      disabled={isDone}
      className={`shrink-0 text-[12px] font-bold transition ${
        isDone ? 'cursor-not-allowed text-[#567C8D]/40' : 'text-[#567C8D] hover:text-[#2F4156]'
      }`}
    >
      {action}
    </button>
  </div>
);

const ProgressBar = ({ percent, colorClass = 'bg-[#2F4156]' }) => (
  <div className="h-2 w-full overflow-hidden rounded-full bg-[#C8D9E6]/55">
    <div className={`h-full rounded-full transition-all duration-500 ${colorClass}`} style={{ width: `${Math.min(percent, 100)}%` }}></div>
  </div>
);

const MetricBar = ({ label, value, width, helper, colorClass = 'bg-[#2F4156]' }) => (
  <div>
    <div className="mb-2 flex items-center justify-between text-[13px] font-bold text-[#2F4156]">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <ProgressBar percent={Number.parseFloat(width) || 0} colorClass={colorClass} />
    <p className="mt-1.5 text-[11px] font-medium text-[#567C8D]">{helper}</p>
  </div>
);

const PipelineStat = ({ label, value }) => (
  <div className="flex items-center justify-between border-b border-[#C8D9E6]/55 pb-3 last:border-0 last:pb-0">
    <span className="text-[13px] font-medium text-[#567C8D]">{label}</span>
    <span className="text-[13px] font-bold text-[#2F4156]">{value}</span>
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
  <section className="rounded-[24px] border border-white/70 bg-white/82 p-5 shadow-[0_18px_48px_rgba(47,65,86,0.08)] backdrop-blur-xl sm:p-6">
    <div className="mb-6">
      <h2 className="text-xl font-extrabold tracking-tight text-[#2F4156]">{title}</h2>
      <p className="mt-1 text-[13px] text-[#567C8D]">{description}</p>
    </div>

    {items.length === 0 ? (
      <EmptyState title={emptyText} description="Every cover letter you build in the editor is stored here automatically." />
    ) : (
      <div className="divide-y divide-[#C8D9E6]/55 border-t border-[#C8D9E6]/55">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col gap-2 py-3 first:pt-4 last:pb-0 md:flex-row md:items-center md:justify-between group">
            <button onClick={() => onOpen?.(item.id)} className="flex flex-1 items-start gap-3 text-left">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#C8D9E6] bg-[#F5EFEB] text-[#567C8D] transition-colors group-hover:bg-[#C8D9E6]/45 group-hover:text-[#2F4156]">
                <FileText size={16} strokeWidth={2} />
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#2F4156] transition-colors group-hover:text-[#567C8D]">{item.title}</p>
                <p className="mt-0.5 text-[12px] text-[#567C8D]">{item.company} · Updated {formatDate(item.updatedAt)}</p>
              </div>
            </button>
            <div className="flex items-center gap-2">
              <span className="w-fit rounded-full border border-[#C8D9E6] bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#567C8D]">
                Saved
              </span>
              <button
                onClick={() => onDelete?.(item.id)}
                className="rounded-xl border border-[#C8D9E6] bg-white p-1.5 text-[#567C8D] shadow-sm transition hover:bg-red-50 hover:text-red-600"
                aria-label={`Delete ${item.title}`}
                title={`Delete ${item.title}`}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </section>
);

const TemplatesView = () => (
  <Suspense fallback={<div className="min-h-[60vh] rounded-2xl border border-slate-200 bg-white shadow-sm" />}>
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

const CreditsView = ({ usage }) => {
  const records = usage.records || [];

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-[24px] border border-white/70 bg-white/82 shadow-[0_18px_48px_rgba(47,65,86,0.08)] backdrop-blur-xl">
        <div className="border-b border-[#C8D9E6] p-4 sm:p-6">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#567C8D]">Platform Metrics</p>
          <h2 className="text-xl font-extrabold tracking-tight text-[#2F4156]">Usage & Billing Ledger</h2>
          <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-[#567C8D]">
            Track computational activity across analysis, mapping, and document generation.
          </p>
        </div>

        <div className="grid gap-3 bg-[#F5EFEB]/55 p-4 sm:gap-4 sm:p-6 md:grid-cols-3">
          <CreditStat label="Compute Used" value={formatPoints(usage.totalPoints)} helper="Total operations" tone="ink" />
          <CreditStat label="Estimated Cost" value={formatUsd(usage.totalBillUsd)} helper="Based on current tier" tone="teal" />
          <CreditStat label="Logged Actions" value={records.length} helper="Saved in this session" tone="mist" />
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
  const updateProfile = useStore((state) => state.updateProfile);
  const [saved, setSaved] = useState(false);

  const handleChange = (field) => (event) => {
    updateProfile({ [field]: event.target.value });
    setSaved(false);
  };

  const handleSave = () => {
    updateProfile({
      fullName: profile.fullName || '',
      email: profile.email || '',
      phone: profile.phone || '',
      address: profile.address || '',
      linkedinPortfolio: profile.linkedinPortfolio || '',
      currentJobTitle: profile.currentJobTitle || '',
      experienceYears: profile.experienceYears || '',
      experienceMonths: profile.experienceMonths || '',
    });
    setSaved(true);
  };

  const fields = [
    { key: 'fullName', label: 'Full name', placeholder: 'Enter full name', type: 'text' },
    { key: 'email', label: 'Email address', placeholder: 'Enter email address', type: 'email' },
    { key: 'phone', label: 'Phone number', placeholder: 'Enter phone number', type: 'text' },
    { key: 'address', label: 'Location / City', placeholder: 'Enter location or city', type: 'text' },
    { key: 'linkedinPortfolio', label: 'LinkedIn / Portfolio', placeholder: 'Paste LinkedIn URL or portfolio link', type: 'text' },
  ];

  return (
    <section className="rounded-[24px] border border-white/70 bg-white/82 p-5 shadow-[0_18px_48px_rgba(47,65,86,0.08)] backdrop-blur-xl sm:p-6">
      <h2 className="text-xl font-extrabold tracking-tight text-[#2F4156]">Profile Settings</h2>
      <p className="mt-1 text-[13px] text-[#567C8D]">Saved profile details automatically prefill the required input section when you start a new cover letter.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.key} className="block group">
            <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#567C8D] transition-colors group-focus-within:text-[#2F4156]">
              {field.label}
            </span>
            <input
              type={field.type}
              min={field.min}
              max={field.max}
              value={profile[field.key] || ''}
              onChange={handleChange(field.key)}
              className="w-full rounded-xl border border-[#C8D9E6] bg-white px-3 py-2 text-[13px] text-[#2F4156] placeholder:text-[#567C8D]/55 outline-none transition-all focus:border-[#567C8D] focus:ring-2 focus:ring-[#C8D9E6]/60 shadow-sm"
              placeholder={field.placeholder}
            />
          </label>
        ))}
        <div className="md:col-span-2">
          <div className="grid gap-5 md:grid-cols-[2fr_1fr_1fr]">
            <label className="block group">
              <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#567C8D] transition-colors group-focus-within:text-[#2F4156]">
                Current job title
              </span>
              <input
                type="text"
                value={profile.currentJobTitle || ''}
                onChange={handleChange('currentJobTitle')}
                className="w-full rounded-xl border border-[#C8D9E6] bg-white px-3 py-2 text-[13px] text-[#2F4156] placeholder:text-[#567C8D]/55 outline-none transition-all focus:border-[#567C8D] focus:ring-2 focus:ring-[#C8D9E6]/60 shadow-sm"
                placeholder="Enter current job title"
              />
            </label>
            <div className="group md:col-span-2">
              <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#567C8D] transition-colors group-focus-within:text-[#2F4156]">
                Experience
              </span>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="number"
                  min="0"
                  value={profile.experienceYears || ''}
                  onChange={handleChange('experienceYears')}
                  className="w-full rounded-xl border border-[#C8D9E6] bg-white px-3 py-2 text-[13px] text-[#2F4156] placeholder:text-[#567C8D]/55 outline-none transition-all focus:border-[#567C8D] focus:ring-2 focus:ring-[#C8D9E6]/60 shadow-sm"
                  placeholder="Years"
                />
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={profile.experienceMonths || ''}
                  onChange={handleChange('experienceMonths')}
                  className="w-full rounded-xl border border-[#C8D9E6] bg-white px-3 py-2 text-[13px] text-[#2F4156] placeholder:text-[#567C8D]/55 outline-none transition-all focus:border-[#567C8D] focus:ring-2 focus:ring-[#C8D9E6]/60 shadow-sm"
                  placeholder="Months"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-[#C8D9E6] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-[12px] font-medium ${saved ? 'text-emerald-600' : 'text-[#567C8D]'}`}>
          {saved ? 'Profile settings saved. Used for new sessions.' : 'Changes are stored to prefill new builder sessions.'}
        </p>
        <button
          onClick={handleSave}
          className="h-10 w-full rounded-xl bg-[#2F4156] px-4 text-[13px] font-bold text-white shadow-sm transition-colors hover:bg-[#233244] sm:w-auto"
        >
          Save Configuration
        </button>
      </div>
    </section>
  );
};

export default Dashboard;
