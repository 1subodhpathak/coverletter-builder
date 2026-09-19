import React, { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Check, FileText, PenLine, Target, Lock,
  UploadCloud, ChevronRight, Zap, Star,
  LayoutTemplate, LifeBuoy, Sparkles, User, Palette,
  Bold, List, Menu, X, Mail, Phone, Building2, MapPin, CheckCircle2
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { getCareerSenseUsage } from '../services/careerSensePoints';
import { SignedIn, SignedOut, SignInButton, useAuth, useUser } from '@clerk/clerk-react';
import CustomUserButton from '../components/common/CustomUserButton';
import BlueLogo from '../assets/logos/BlueGray.png';
import builderBackground from '../assets/builder.png';

import ManualDetailsStep from '../components/generator/ManualDetailsStep';
import ResumeUploader from '../components/generator/ResumeUploader';
import JobDetails from '../components/generator/JobDetails';
import EditorTour from '../components/editor/EditorTour';

const Editor = lazy(() => import('../components/editor/Editor'));

// Preload Editor bundle in background so it's ready instantly when needed
const preloadEditor = () => import('../components/editor/Editor');


const builderToolkitItems = [
  {
    title: 'Required personal details',
    text: 'Keep your full name, email, phone number, current role, and location ready so the letter header is complete and professional.',
    icon: User,
    bullets: ['Full name and job title', 'Email and phone number', 'City, state, or preferred location'],
  },
  {
    title: 'Target company details',
    text: 'The strongest letters mention the employer and role clearly. Add the company name, hiring manager, target role, and company address when available.',
    icon: Building2,
    bullets: ['Company name and target role', 'Hiring manager or department', 'Company address if known'],
  },
  {
    title: 'Resume and proof points',
    text: 'Upload a resume or prepare your strongest achievements, responsibilities, certifications, and measurable wins.',
    icon: PenLine,
    bullets: ['Recent experience', 'Top 3 to 5 achievements', 'Relevant skills, tools, and certifications'],
  },
  {
    title: 'Job description matters most',
    text: 'Paste the job post whenever possible. It helps the system match keywords, priorities, and tone to the employer’s expectations.',
    icon: Target,
    bullets: ['Role requirements', 'Keywords from the posting', 'Team, mission, or industry language'],
  },
  {
    title: 'Choose your build path',
    text: 'Start from scratch for full manual control, use resume mode for a quick draft, or add the job description for the most tailored version.',
    icon: UploadCloud,
    bullets: ['Scratch: manual writing', 'Resume: general professional draft', 'Resume + job: most targeted result'],
  },
  {
    title: 'What a strong cover letter needs',
    text: 'Every finished letter should explain why you fit the role, prove it with results, and end with a confident close.',
    icon: CheckCircle2,
    bullets: ['Clear role-specific opening', 'Relevant proof and achievements', 'Professional closing and signature'],
  },
  {
    title: 'What to review before export',
    text: 'Before downloading, confirm the role title, company name, contact details, body alignment, and final one-page formatting.',
    icon: Check,
    bullets: ['Correct company and role', 'No placeholder text', 'Clean one-page PDF preview'],
  },
  {
    title: 'You can refine everything later',
    text: 'After generation, use the editor to update the employer details, switch templates, tune styling, and improve the writing before export.',
    icon: LayoutTemplate,
    bullets: ['Edit contact and company data', 'Change template and styling', 'Preview and print as PDF'],
  },
];

const editorToolkitItems = [
  {
    title: 'Data tab',
    text: 'This is where you complete the information the letter actually depends on: your header, company details, skills, image, and signature.',
    icon: User,
    bullets: ['Name, email, and phone', 'Company, role, manager, and address', 'Skills, profile photo, and signature'],
    actionLabel: 'Open Data tab',
    targetTab: 'profile',
  },
  {
    title: 'Style tab',
    text: 'Use this area to control the visual quality of the final letter. Template choice and spacing affect how well the PDF prints.',
    icon: Palette,
    bullets: ['Change template layout', 'Adjust theme, font, and color', 'Check spacing and margin balance'],
    actionLabel: 'Open Style tab',
    targetTab: 'design',
  },
  {
    title: 'Engine tab',
    text: 'Rebuild the letter when you want a different tone or when the job description has changed and the draft needs to be recalibrated.',
    icon: Zap,
    bullets: ['Professional, confident, or persuasive tone', 'Rebuild after changing job details', 'Compare before replacing the draft'],
    actionLabel: 'Open Engine tab',
    targetTab: 'ai',
  },
  {
    title: 'Required content check',
    text: 'Before you export, make sure the letter includes a role-specific opening, proof of results, company references, and a clean closing.',
    icon: FileText,
    bullets: ['Opening tailored to the role', 'Achievements with impact', 'Professional sign-off and signature'],
  },
  {
    title: 'Contact and employer accuracy',
    text: 'Most final mistakes happen in the small details. Verify every employer field and every contact field before saving the PDF.',
    icon: Mail,
    bullets: ['Correct email and phone number', 'Correct company and hiring manager', 'Correct role title and address'],
  },
  {
    title: 'Formatting tools',
    text: 'Select text on the page and use the editor tools to strengthen hierarchy, improve alignment, and make results easier to scan.',
    icon: Bold,
    bullets: ['Use bold for titles and proof points', 'Use bullets for achievements when needed', 'Keep spacing visually balanced'],
  },
  {
    title: 'Print and PDF review',
    text: 'Always open Print Preview before export. Confirm the letter stays on one page, text does not shift, and margins look clean.',
    icon: List,
    bullets: ['No text shifting', 'No extra white margins', 'No content spilling to page 2'],
  },
];

const creationOptions = [
  {
    mode: 'scratch',
    title: 'Start from Scratch',
    badge: 'Manual',
    badgeStyle: 'bg-[#EAF1FF] text-[#2864C7]',
    icon: PenLine,
    description: 'Skip AI generation and jump directly into the editor with a clean professional template.',
    features: ['Full writing control', 'Professional templates']
  },
  {
    mode: 'resume',
    title: 'Resume Based Letter',
    badge: 'Fastest',
    badgeStyle: 'bg-[#DDF7EE] text-[#107A64]',
    icon: UploadCloud,
    description: 'Upload your resume and CareerSense will prepare a professional draft around your experience and strongest achievements.',
    features: ['Highlights your skills', 'Professional tone']
  },
  {
    mode: 'resume-job',
    title: 'Job-Specific Calibration',
    badge: 'Best Match',
    badgeStyle: 'bg-[#FFF1D7] text-[#946313]',
    icon: Target,
    description: 'Upload your resume and target job description to create the most relevant and precisely tailored cover letter.',
    features: ['Keywords matched', 'Tailored to the role']
  },
];

const creationContentByMode = {
  default: {
    eyebrow: 'Cover Letter Builder',
    title: 'Turn your experience into',
    accent: 'opportunity.',
    description:
      'Create a compelling, professional cover letter tailored to your target job. Start from scratch, use your resume, or let AI match it to a specific role.',
    supportItems: [
      {
        icon: FileText,
        title: 'Professional Templates',
        text: 'Modern, ATS-friendly designs',
      },
      {
        icon: Zap,
        title: 'AI-Powered Suggestions',
        text: 'Tailored to your experience',
      },
      {
        icon: Target,
        title: 'Job-Ready Output',
        text: 'Make a stronger impression',
      },
    ],
  },
  scratch: {
    eyebrow: 'Cover Letter Builder',
    title: 'Write with complete',
    accent: 'control.',
    description:
      'Start with a professional structure and shape every sentence yourself. This path gives you complete ownership of the final letter.',
    supportItems: [
      { icon: LayoutTemplate, title: 'Professional Templates', text: 'Start from a polished layout' },
      { icon: PenLine, title: 'Manual Precision', text: 'Control every line and detail' },
      { icon: CheckCircle2, title: 'Ready to Refine', text: 'Edit and export when ready' },
    ],
  },
  resume: {
    eyebrow: 'Cover Letter Builder',
    title: 'Turn your resume into',
    accent: 'a stronger story.',
    description:
      'Use your resume to create a professional first draft that brings your experience, strengths, and achievements into a clear narrative.',
    supportItems: [
      { icon: FileText, title: 'Experience Led', text: 'Built around your resume' },
      { icon: Sparkles, title: 'Smart Suggestions', text: 'Surfaces relevant strengths' },
      { icon: Zap, title: 'Faster First Draft', text: 'Get to editing sooner' },
    ],
  },
  'resume-job': {
    eyebrow: 'Cover Letter Builder',
    title: 'Match your experience to',
    accent: 'the exact role.',
    description:
      'Combine your resume with the job description to create the most relevant version, aligned to the role, employer language, and key requirements.',
    supportItems: [
      { icon: Target, title: 'Role Alignment', text: 'Focused on the target position' },
      { icon: Sparkles, title: 'Keyword Matching', text: 'Reflects job-post language' },
      { icon: CheckCircle2, title: 'Sharper Relevance', text: 'Designed for targeted applications' },
    ],
  },
};

const Builder = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [subData, setSubData] = React.useState({ plan: 'free', tokensRemaining: 30000 });
  const [isHelpOpen, setIsHelpOpen] = React.useState(false);
  const [isEditorTourOpen, setIsEditorTourOpen] = React.useState(false);
  const [editorGuideTarget, setEditorGuideTarget] = React.useState(null);
  const [creditUsage, setCreditUsage] = React.useState(() => getCareerSenseUsage());
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const {
    step,
    creationMode,
    setStep,
    setCreationMode,
    setGeneratedLetter,
    resetBuilder,
  } = useStore();

  React.useEffect(() => {
    preloadEditor();
  }, []);

  React.useEffect(() => {
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
        console.error('Error fetching subscription status in Builder:', err);
      }
    };
    fetchSub();
  }, [user?.id]);

  React.useEffect(() => {
    const refreshUsage = () => setCreditUsage(getCareerSenseUsage());
    window.addEventListener('storage', refreshUsage);
    window.addEventListener('focus', refreshUsage);

    return () => {
      window.removeEventListener('storage', refreshUsage);
      window.removeEventListener('focus', refreshUsage);
    };
  }, []);

  const steps = getSteps(creationMode);
  const openHome = () => {
    resetBuilder();
    navigate('/');
  };

  const chooseMode = (mode) => {
    setCreationMode(mode);
    if (mode === 'scratch') {
      setGeneratedLetter(getScratchLetter());
    }
    setStep(1);
  };

  const handleBack = () => {
    if (step === 4) {
      setStep(0);
      return;
    }

    if (step === 3) {
      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(1);
      return;
    }

    if (step === 1) {
      setStep(0);
      return;
    }

    navigate('/dashboard');
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const isEditorStep = step === 4;

  const openHelp = () => {
    setIsMobileNavOpen(false);
    if (isEditorStep) {
      setIsEditorTourOpen(true);
      return;
    }
    setIsHelpOpen(true);
  };
  const helpItems = isEditorStep ? editorToolkitItems : builderToolkitItems;
  const helpTitle = isEditorStep ? 'Cover Letter Editor Guide' : 'Cover Letter Builder Guide';
  const helpSubtitle = isEditorStep ? 'Everything to check before you export' : 'What data you should prepare for the best result';
  const helpSummary = isEditorStep
    ? 'Use the editor to verify content, fix employer details, improve formatting, and preview the final one-page PDF.'
    : 'The best cover letters come from strong inputs: your contact details, target company information, relevant achievements, and the job description.';
  const helpQuickFacts = isEditorStep
    ? [
      { label: 'Review first', value: 'Role, company, signature' },
      { label: 'Must confirm', value: 'One-page print preview' },
      { label: 'Best result', value: 'Tailored opening + proof' },
    ]
    : [
      { label: 'Most important input', value: 'Job description' },
      { label: 'Must have', value: 'Name, email, phone, role' },
      { label: 'Best source', value: 'Resume + achievements' },
    ];

  const runHelpAction = (item) => {
    if (item.targetTab) {
      setEditorGuideTarget({ tab: item.targetTab, id: Date.now() });
    }
    setIsHelpOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#F5EFEB] font-sans text-[#2F4156] selection:bg-[#C8D9E6]">
      {/* Keep navigation inside the active builder flow; the start screen is immersive. */}
      {step > 0 && (
      <header className="relative z-50 w-full border-b border-white/10 bg-[#082B45]/95 text-white shadow-[0_8px_28px_rgba(3,22,36,0.22)] backdrop-blur-xl">
        <div className="mx-auto w-full px-4 py-2 sm:px-6">
          <div className="flex min-h-16 flex-wrap lg:flex-nowrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3 sm:gap-6">
              <button onClick={openHome} className="flex items-center gap-3 transition-opacity hover:opacity-80">
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
              <div className="hidden h-6 w-px bg-white/20 md:block" />
              {step > 0 && (
                <div className="hidden min-w-0 items-center lg:flex">
                  {steps.map((item, index) => {
                    const active = step === item.num;
                    const done = step > item.num;
                    return (
                      <React.Fragment key={item.label}>
                        <div className={`flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 xl:px-3 xl:py-1.5 transition-colors ${active ? 'bg-white/[0.12]' : ''}`}>
                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${active
                              ? 'bg-[#E3BA5E] text-[#082B45] shadow-sm'
                              : done
                                ? 'bg-[#6D91A5] text-white'
                                : 'bg-white/15 text-[#C9D9E3]'
                              }`}
                          >
                            {done ? <Check size={10} strokeWidth={3} /> : item.num}
                          </div>
                          <span className={`text-[12px] font-semibold ${active ? 'text-white' : 'text-[#C9D9E3]'}`}>
                            {item.label}
                          </span>
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`mx-1.5 h-px w-3 xl:w-6 ${done ? 'bg-[#6D91A5]' : 'bg-white/20'}`} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 xl:gap-3">
              <div className="hidden items-center gap-2 xl:gap-3 md:flex">
                <button
                  onClick={openHelp}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-md px-1.5 xl:px-2 text-[12px] font-semibold text-[#D6E3EA] transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  aria-label="Open help toolkit"
                >
                  <LifeBuoy size={14} /> Help
                </button>
                <SignedIn>
                  <div className="hidden items-center gap-2 xl:flex">
                    <div className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.07] px-3 py-1.5 shadow-2xs">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 text-amber-500 shrink-0">
                        <Star className="h-3.5 w-3.5" fill="currentColor" />
                      </div>
                      <div className="flex flex-col text-left leading-none">
                        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#AFC4D1] leading-tight">AI Tokens Remaining</p>
                        <p className="text-xs font-black text-white leading-none mt-0.5">{(subData.tokensRemaining ?? 30000).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.07] px-3 py-1.5 shadow-2xs">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shrink-0">
                        <span className="text-xs font-black">$</span>
                      </div>
                      <div className="flex flex-col text-left leading-none">
                        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#AFC4D1] leading-tight">Bill</p>
                        <p className="text-xs font-black text-white leading-none mt-0.5">{formatUsd(creditUsage.totalBillUsd)}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-white/15 bg-white/[0.09] px-2.5 py-1.5 xl:px-3 text-[12px] font-bold text-white shadow-sm transition-all hover:bg-white/[0.15] focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    Dashboard
                  </button>
                </SignedIn>
                <button onClick={handleBack} className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-white/15 bg-white/[0.09] px-2.5 py-1.5 xl:px-3 text-[12px] font-bold text-white shadow-sm transition-all hover:bg-white/[0.15] focus:outline-none focus:ring-2 focus:ring-white/30">
                  <ArrowLeft size={14} />
                  Back
                </button>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#E3BA5E] px-4 text-[12px] font-bold text-[#082B45] shadow-sm transition hover:bg-[#EDC974] focus:outline-none focus:ring-2 focus:ring-white/30">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center gap-2">
                    <CustomUserButton />
                  </div>
                </SignedIn>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileNavOpen((current) => !current)}
                aria-label={isMobileNavOpen ? 'Close builder menu' : 'Open builder menu'}
                aria-expanded={isMobileNavOpen}
                className="flex h-11 w-11 items-center justify-center rounded-md border border-white/15 bg-white/[0.09] text-white shadow-sm transition hover:bg-white/[0.15] md:hidden"
              >
                {isMobileNavOpen ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>
          {isMobileNavOpen && (
            <div className="border-t border-white/10 pt-3 md:hidden">
              {step > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {steps.map((item) => {
                    const active = step === item.num;
                    const done = step > item.num;
                    return (
                      <div
                        key={item.label}
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold ${active
                          ? 'bg-[#E3BA5E] text-[#082B45]'
                          : done
                            ? 'bg-[#6D91A5] text-white'
                            : 'bg-white/10 text-[#D6E3EA]'
                          }`}
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/80 text-[10px] font-bold text-inherit">
                          {done ? <Check size={10} strokeWidth={3} /> : item.num}
                        </span>
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="grid gap-2">
                <button
                  onClick={() => {
                    openHelp();
                  }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/15 bg-white/[0.08] px-3 py-2 text-[12px] font-bold text-white shadow-sm"
                >
                  <LifeBuoy size={14} />
                  Help
                </button>
                <SignedIn>
                  <button
                    onClick={() => {
                      setIsMobileNavOpen(false);
                      navigate('/dashboard');
                    }}
                    className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/15 bg-white/[0.08] px-3 py-2 text-[12px] font-bold text-white shadow-sm"
                  >
                    <LayoutTemplate size={14} />
                    Dashboard
                  </button>
                </SignedIn>
                <button
                  onClick={() => {
                    setIsMobileNavOpen(false);
                    handleBack();
                  }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/15 bg-white/[0.08] px-3 py-2 text-[12px] font-bold text-white shadow-sm"
                >
                  <ArrowLeft size={14} />
                  Back
                </button>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button
                      onClick={() => setIsMobileNavOpen(false)}
                      className="inline-flex min-h-11 w-full items-center gap-2 rounded-md bg-[#E3BA5E] px-3 py-2 text-[12px] font-bold text-[#082B45] shadow-sm transition hover:bg-[#EDC974]"
                    >
                      <User size={14} />
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
              </div>
              <SignedIn>
                <div className="mt-3 grid gap-2">
                  <MobileInfoPill
                    icon={Zap}
                    label="AI Tokens Remaining"
                    value={(subData.tokensRemaining ?? 30000).toLocaleString()}
                  />
                  <MobileInfoPill
                    icon={FileText}
                    label="Total Bill"
                    value={formatUsd(creditUsage.totalBillUsd)}
                  />
                </div>
              </SignedIn>
            </div>
          )}
        </div>
      </header>
      )}

      <AnimatePresence>
        {isHelpOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-end justify-center bg-[#020E18]/80 p-3 backdrop-blur-md sm:items-center sm:p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 18 }}
              className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-[18px] border border-[#46657A] bg-[#071F32] text-white shadow-[0_30px_100px_rgba(0,0,0,0.48)] sm:max-h-[calc(100dvh-2rem)]"
            >
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 bg-[#082B45] px-4 py-3 sm:px-5 sm:py-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#E3BA5E] sm:text-[11px] sm:tracking-[0.16em]">{helpTitle}</p>
                  <h2 className="mt-1 text-base font-black text-[#F8F4EC] sm:text-lg">{helpSubtitle}</h2>
                  <p className="mt-2 max-w-2xl text-[12px] font-semibold leading-5 text-[#B9CDD8]">{helpSummary}</p>
                </div>
                <button
                  onClick={() => setIsHelpOpen(false)}
                  className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/15 bg-white/[0.08] text-xl leading-none text-[#D6E3EA] transition hover:bg-white/[0.15] hover:text-white"
                  aria-label="Close builder help"
                >
                  ×
                </button>
              </div>

              <div className="border-b border-white/10 bg-[#0A2940] px-4 py-3 sm:px-5">
                <div className="grid gap-2 sm:grid-cols-3">
                  {helpQuickFacts.map((item) => (
                    <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.055] px-3 py-2.5">
                      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#E3BA5E]">{item.label}</p>
                      <p className="mt-1 text-[12px] font-bold text-[#F5EFEB]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid flex-1 gap-3 overflow-y-auto bg-[#071F32] p-4 [scrollbar-color:#54758A_transparent] [scrollbar-width:thin] sm:grid-cols-2 sm:p-5">
                {helpItems.map((item) => {
                  const { title, text, icon: Icon, actionLabel, targetTab, bullets } = item;
                  return (
                    <div key={title} className="rounded-xl border border-white/10 bg-white/[0.055] p-3 shadow-[0_8px_22px_rgba(0,0,0,0.12)] sm:p-4">
                      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg border border-[#E3BA5E]/30 bg-[#E3BA5E]/10 text-[#E7C56F] sm:mb-3">
                        <Icon size={18} />
                      </div>
                      <h3 className="text-sm font-black text-[#F8F4EC]">{title}</h3>
                      <p className="mt-1 text-xs font-semibold leading-5 text-[#AFC4D1]">{text}</p>
                      {bullets?.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {bullets.map((bullet) => (
                            <div key={bullet} className="flex items-start gap-2 text-[11px] font-semibold leading-5 text-[#D6E3EA]">
                              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E3BA5E]" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {targetTab && (
                        <button
                          onClick={() => runHelpAction(item)}
                          className="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[#E3BA5E]/35 bg-[#E3BA5E]/10 px-3 py-2 text-[11px] font-black text-[#F1CF79] transition hover:border-[#E3BA5E]/60 hover:bg-[#E3BA5E]/15"
                        >
                          {actionLabel}
                          <ChevronRight size={13} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="shrink-0 border-t border-white/10 bg-[#061A2A] px-4 py-3 sm:px-5 sm:py-4">
                <button
                  onClick={() => setIsHelpOpen(false)}
                  className="min-h-11 w-full rounded-lg bg-[#E3BA5E] px-4 py-2.5 text-sm font-black text-[#082B45] shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition hover:bg-[#EDC974]"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <EditorTour
        open={isEditorTourOpen && isEditorStep}
        onClose={() => setIsEditorTourOpen(false)}
        onNavigate={(tab) => setEditorGuideTarget({ tab, id: Date.now() })}
      />

      <main className={`relative overflow-hidden ${step === 0 ? 'min-h-dvh bg-[#F6F8FB]' : 'min-h-screen lg:h-[calc(100dvh-81px)] lg:min-h-0'}`}>
        <div className="relative z-10 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="h-full w-full"
            >
              {step === 0 && <CreationStart onChoose={chooseMode} isSignedIn={isSignedIn} onHelp={openHelp} onBack={handleBack} />}
              {step === 1 && <ManualDetailsStep />}
              {step === 2 && <ResumeUploader />}
              {step === 3 && <JobDetails />}
              {step === 4 && (
                <div className="bg-[#F5EFEB]">
                  <Suspense fallback={<StepFallback message="Opening Cover Letter Studio..." tinted />}>
                    <Editor guideTarget={editorGuideTarget} />
                  </Suspense>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const StepFallback = ({ tinted = false, message = "Loading workspace..." }) => (
  <div className={`flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center p-8 text-center ${tinted ? 'bg-[#F5EFEB]' : 'bg-[#F5EFEB]/50'}`}>
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-[#C8D9E6] bg-white p-8 shadow-xl max-w-sm w-full mx-4">
      <div className="relative flex h-14 w-14 items-center justify-center">
        <span className="absolute h-14 w-14 animate-ping rounded-full bg-[#567C8D]/20" />
        <span className="h-12 w-12 animate-spin rounded-full border-4 border-[#C8D9E6] border-t-[#2F4156]" />
      </div>
      <div>
        <h3 className="text-lg font-black text-[#2F4156]">{message}</h3>
        <p className="mt-1 text-xs font-semibold text-[#567C8D]">
          Preparing your cover letter workspace...
        </p>
      </div>
    </div>
  </div>
);

const CreationStart = ({ onChoose, isSignedIn, onHelp, onBack }) => {
  const defaultMode = 'default';
  const [previewMode, setPreviewMode] = React.useState(defaultMode);
  const activeContent = creationContentByMode[previewMode] ?? creationContentByMode[defaultMode];

  return (
    <section className="min-h-dvh w-full bg-[#F6F8FB] lg:h-dvh lg:min-h-0">
      <div className="grid min-h-dvh w-full lg:h-full lg:min-h-0 lg:grid-cols-[39%_61%]">
        {/* LEFT EXPERIENCE PANEL */}
        <aside
          className="relative isolate flex min-h-[680px] overflow-hidden bg-[#09243B] text-white lg:min-h-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(5, 30, 53, 0.46) 0%, rgba(5, 25, 45, 0.66) 55%, rgba(4, 18, 33, 0.84) 100%), url(${builderBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,32,55,0.18),rgba(7,32,55,0.03))]" />

          <div className="flex w-full flex-col px-7 py-8 sm:px-10 sm:py-10 lg:px-[6.1%] lg:py-[clamp(20px,3.2vh,40px)] xl:px-[9.5%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={previewMode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex h-full flex-col"
              >
                <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/45 bg-[#112F4A]/55 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#F7CC69] shadow-[0_6px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:px-5 sm:text-[12px]">
                  <Sparkles size={15} strokeWidth={2.2} />
                  {activeContent.eyebrow}
                </div>

                <div className="mt-7 max-w-[585px] lg:mt-[clamp(16px,2.3vh,26px)]">
                  <h1 className="cs-display max-w-[570px] text-[28px] font-extrabold leading-[1.01] tracking-[-0.04em] text-white sm:text-[32px] lg:text-[clamp(38px,5.3vh,50px)]">
                    {activeContent.title}
                    <span className="mt-1 block text-[#F6D17B]">{activeContent.accent}</span>
                  </h1>

                  <p className="mt-6 max-w-[565px] text-[15px] font-medium leading-7 text-[#D9E3EC] sm:text-[17px] lg:mt-[clamp(14px,2vh,22px)] lg:text-[clamp(14px,1vw,17px)] lg:leading-[1.6]">
                    {activeContent.description}
                  </p>
                </div>

                <div className="mt-8 grid max-w-[575px] grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6 lg:mt-[clamp(18px,2.8vh,30px)] lg:gap-6">
                  {activeContent.supportItems.map(({ icon: Icon, title, text }) => (
                    <div key={title} className="min-w-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.06] bg-[#173A5B]/90 text-[#E8EEF5] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm lg:h-12 lg:w-12">
                        <Icon size={25} strokeWidth={1.8} />
                      </div>
                      <h3 className="mt-3.5 text-[14px] font-bold leading-[1.25] text-white lg:mt-2.5 lg:text-[14px]">
                        {title}
                      </h3>
                      <p className="mt-2 text-[12px] font-medium leading-[1.45] text-[#B8C8D8] lg:mt-1.5 lg:text-[12px]">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto hidden max-w-[545px] pb-1 pt-8 sm:block lg:pt-[clamp(16px,2.6vh,28px)]">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 font-serif text-[42px] font-bold leading-none text-[#F6D17B]">“</div>
                    <div className="pt-1">
                      <p className="text-[13px] italic leading-[1.55] text-[#D8E1EA] sm:text-[14px]">
                        A great cover letter can open doors.<br />
                        We help you write one that gets noticed.
                      </p>
                      <div className="mt-4 flex items-center gap-3">
                        <span className="h-px w-9 bg-[#C79B54]" />
                        <span className="text-[11px] font-bold tracking-[0.28em] text-[#E7EDF4]">CareerSense</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </aside>

        {/* RIGHT BUILD OPTIONS */}
        <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[radial-gradient(circle_at_80%_8%,rgba(229,236,244,0.72),transparent_34%),linear-gradient(180deg,#FBFCFE_0%,#F5F7FA_100%)] px-5 py-7 sm:px-8 sm:py-9 lg:h-full lg:min-h-0 lg:px-[5.2%] lg:py-[clamp(16px,2.6vh,32px)] xl:px-[5.1%]">
          <div className="mx-auto flex w-full max-w-[1030px] flex-1 flex-col">
            <div className="grid grid-cols-[1fr_auto] items-start gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#D7DFE8] bg-white/80 px-3 text-[12px] font-bold text-[#243A52] shadow-[0_3px_12px_rgba(25,43,64,0.05)] transition hover:border-[#BFCBD8] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#B8CBE0]/50"
                  aria-label="Back to dashboard"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>
                <span className="hidden h-5 w-px bg-[#D5DDE6] sm:block" />
                <p className="hidden text-[10px] font-extrabold uppercase tracking-[0.34em] text-[#5D7088] sm:block sm:text-[11px]">
                  Build Options
                </p>
              </div>

              <div className="hidden items-center justify-center gap-0 sm:flex">
                <span className="h-4 w-4 rounded-full border-[4px] border-[#C8DFFF] bg-[#2B70D6] shadow-[0_0_0_1px_rgba(43,112,214,0.08)]" />
                <span className="h-px w-14 bg-[#C6CDD6]" />
                <span className="h-4 w-4 rounded-full bg-[#C7CDD5]" />
                <span className="h-px w-14 bg-[#C6CDD6]" />
                <span className="h-4 w-4 rounded-full bg-[#8999AE]" />
              </div>

              <button
                type="button"
                onClick={onHelp}
                className="justify-self-end text-[13px] font-semibold text-[#2769C7] transition hover:text-[#174D9A] focus:outline-none"
                aria-label="Need help choosing a cover letter build option"
              >
                <span className="inline-flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-current text-[11px] font-extrabold">?</span>
                  <span className="hidden md:inline">Need help choosing?</span>
                </span>
              </button>
            </div>

            <div className="mt-4 sm:mt-5 lg:mt-[clamp(10px,1.5vh,18px)]">
              <h2 className="cs-display text-[30px] font-extrabold leading-[1.04] tracking-[-0.035em] text-[#0D1730] sm:text-[36px] lg:text-[clamp(30px,4.6vh,40px)]">
                Choose your starting point
              </h2>
              <p className="mt-2.5 text-[14px] font-medium text-[#75869C] sm:text-[15px] lg:text-[16px]">
                You can add, redesign and refine everything later.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-4 lg:mt-[clamp(16px,2.3vh,24px)] lg:gap-[clamp(10px,1.6vh,16px)]">
              {creationOptions.map(({ mode, title, badge, badgeStyle, icon: Icon, description, features }, index) => {
                const isLocked = !isSignedIn && mode !== 'resume';

                const cardContent = (
                  <div
                    className={`relative flex min-h-[145px] items-center gap-4 overflow-hidden rounded-[20px] border bg-white px-5 py-5 pr-16 shadow-[0_9px_24px_rgba(25,43,64,0.055)] transition-all duration-[250ms] sm:gap-6 sm:px-7 sm:pr-20 lg:min-h-[clamp(104px,14vh,132px)] lg:gap-5 lg:px-6 lg:py-3 lg:pr-20 ${
                      index === 2
                        ? 'border-[#E6A62B] shadow-[0_10px_28px_rgba(178,123,25,0.07)]'
                        : 'border-[#E7EAF0] group-hover:border-[#CFD7E1] group-hover:shadow-[0_12px_30px_rgba(25,43,64,0.085)]'
                    }`}
                  >
                    {index === 2 && <span className="absolute inset-y-0 left-0 w-[3px] bg-[#D99B22]" />}

                    <div
                      className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[17px] border sm:h-[78px] sm:w-[78px] lg:h-[62px] lg:w-[62px] ${
                        isLocked
                          ? 'border-[#D8DEE6] bg-[#F2F4F7] text-[#8A97A6]'
                          : index === 0
                            ? 'border-[#D9E4F7] bg-[#EAF1FF] text-[#2463C5]'
                            : index === 1
                              ? 'border-[#D4EFE8] bg-[#DFF6F0] text-[#0D7567]'
                              : 'border-[#F0D9A6] bg-[#FFF3D9] text-[#805615]'
                      }`}
                    >
                      {isLocked ? <Lock size={25} strokeWidth={1.8} /> : <Icon size={29} strokeWidth={1.8} />}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                        <h3 className="text-[17px] font-extrabold tracking-[-0.02em] text-[#101B33] sm:text-[18px] lg:text-[18px]">
                          {title}
                        </h3>
                        {isLocked ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#EEF1F4] px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#657486]">
                            <Lock size={9} /> Sign In
                          </span>
                        ) : (
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.15em] ${badgeStyle}`}>
                            {badge}
                          </span>
                        )}
                      </div>

                      <p className="mt-2 max-w-[780px] text-[13px] font-medium leading-[1.5] text-[#667A92] sm:text-[14px] lg:mt-1.5 lg:text-[13px]">
                        {isLocked ? 'Sign in to unlock this creation method.' : description}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-7 gap-y-2 lg:mt-2">
                        {features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-[11px] font-semibold text-[#526B87] sm:text-[12px]">
                            <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#EDF5FC] text-[#2671C9]">
                              <Check size={11} strokeWidth={3} />
                            </span>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="absolute right-5 top-1/2 flex h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-full bg-[#F3F5F8] text-[#101B33] transition-all duration-200 group-hover:translate-x-1 group-hover:bg-[#EAF0F7] sm:right-7 lg:right-5 lg:h-11 lg:w-11">
                      <ChevronRight size={22} strokeWidth={2.4} />
                    </div>
                  </div>
                );

                if (isLocked) {
                  return (
                    <SignInButton mode="modal" key={mode}>
                      <div
                        onMouseEnter={() => setPreviewMode(mode)}
                        onFocus={() => setPreviewMode(mode)}
                        onMouseLeave={() => setPreviewMode(defaultMode)}
                        onBlur={() => setPreviewMode(defaultMode)}
                        className="group w-full cursor-pointer text-left focus:outline-none"
                      >
                        {cardContent}
                      </div>
                    </SignInButton>
                  );
                }

                return (
                  <motion.button
                    key={mode}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + index * 0.08, duration: 0.28 }}
                    onClick={() => onChoose(mode)}
                    onMouseEnter={() => setPreviewMode(mode)}
                    onFocus={() => setPreviewMode(mode)}
                    onMouseLeave={() => setPreviewMode(defaultMode)}
                    onBlur={() => setPreviewMode(defaultMode)}
                    className="group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B70D6] focus-visible:ring-offset-2"
                    whileTap={{ scale: 0.996 }}
                  >
                    {cardContent}
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-auto hidden pt-6 md:block lg:pt-[clamp(12px,2vh,22px)]">
              <div className="flex items-center gap-4 text-[11px] font-medium text-[#65758C] sm:text-[12px]">
                <span className="h-px flex-1 bg-[#D5DCE5]" />
                <span>Trusted by thousands to build their careers</span>
                <span className="h-px flex-1 bg-[#D5DCE5]" />
              </div>

              <div className="mx-auto mt-3 grid max-w-[780px] grid-cols-3 divide-x divide-[#D5DCE5] text-center lg:mt-[clamp(8px,1.2vh,12px)]">
                <div className="px-4">
                  <p className="text-[20px] font-extrabold tracking-[-0.02em] text-[#111C34] sm:text-[22px]">500K+</p>
                  <p className="mt-1 text-[11px] font-medium text-[#65758C] sm:text-[12px]">Cover letters created</p>
                </div>
                <div className="px-4">
                  <p className="text-[20px] font-extrabold tracking-[-0.02em] text-[#111C34] sm:text-[22px]">4.8/5</p>
                  <p className="mt-1 text-[11px] font-medium text-[#65758C] sm:text-[12px]">User satisfaction</p>
                </div>
                <div className="px-4">
                  <p className="text-[20px] font-extrabold tracking-[-0.02em] text-[#111C34] sm:text-[22px]">3x</p>
                  <p className="mt-1 text-[11px] font-medium text-[#65758C] sm:text-[12px]">Higher response rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const formatPoints = (value) => new Intl.NumberFormat('en-US').format(Math.round(Number(value) || 0));
const formatUsd = (value) => `$${(Number(value) || 0).toFixed(4)}`;

const MobileInfoPill = ({ icon: Icon, label, value }) => (
  <div className="flex min-h-11 items-center justify-between gap-3 rounded-md border border-[#C8D9E6] bg-white px-3 py-2 text-[11px] font-bold text-[#567C8D] shadow-sm">
    <div className="flex items-center gap-2">
      <Icon size={12} className="text-[#567C8D]" />
      <span>{label}</span>
    </div>
    <span className="text-[#2F4156]">{value}</span>
  </div>
);

const getSteps = (mode) => {
  if (mode === 'scratch') {
    return [
      { num: 1, label: 'Details', icon: <User size={14} /> },
      { num: 4, label: 'Editor', icon: <PenLine size={14} /> },
    ];
  }
  if (mode === 'resume') {
    return [
      { num: 1, label: 'Details', icon: <User size={14} /> },
      { num: 2, label: 'Resume', icon: <UploadCloud size={14} /> },
      { num: 4, label: 'Editor', icon: <PenLine size={14} /> },
    ];
  }
  return [
    { num: 1, label: 'Details', icon: <User size={14} /> },
    { num: 2, label: 'Resume', icon: <UploadCloud size={14} /> },
    { num: 3, label: 'Job Details', icon: <Target size={14} /> },
    { num: 4, label: 'Editor', icon: <PenLine size={14} /> },
  ];
};

const getScratchLetter = () => `
  <p>I am reaching out to introduce myself and share my interest in opportunities where my experience can create meaningful value.</p>
  <p>My background includes strong execution, clear communication, and a practical approach to solving business problems. I would welcome the opportunity to tailor this letter to a specific role and company.</p>
  <p>Thank you for your time and consideration.</p>
`;

export default Builder;
