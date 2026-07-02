import React, { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Check, FileText, PenLine, Target, Lock,
  UploadCloud, ChevronRight, Zap, 
  LayoutTemplate, LifeBuoy, Sparkles, User, Palette,
  Bold, List, Menu, X, Mail, Phone, Building2, MapPin, CheckCircle2
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { getCareerSenseUsage } from '../services/careerSensePoints';
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from '@clerk/clerk-react';
import BlueLogo from '../assets/logos/BlueLogo.png';

const ManualDetailsStep = lazy(() => import('../components/generator/ManualDetailsStep'));
const ResumeUploader = lazy(() => import('../components/generator/ResumeUploader'));
const JobDetails = lazy(() => import('../components/generator/JobDetails'));
const Editor = lazy(() => import('../components/editor/Editor'));
const AnimatedHeroBackground = lazy(() => import('../components/landing/AnimatedHeroBackground'));

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
    badgeStyle: 'bg-[#F5EFEB] text-[#2F4156] ring-1 ring-[#C8D9E6]',
    icon: PenLine,
    description: 'Skip the AI and jump straight into our editor with a blank, professional template.',
    features: ['Full control', 'Ready-to-use templates']
  },
  {
    mode: 'resume',
    title: 'Resume Based Letter',
    badge: 'Fastest',
    badgeStyle: 'bg-[#C8D9E6] text-[#2F4156] ring-1 ring-[#567C8D]/20',
    icon: UploadCloud,
    description: "Upload your resume, and we'll create a strong, professional cover letter highlighting your general experience.",
    features: ['Highlights your skills', 'Professional tone']
  },
  {
    mode: 'resume-job',
    title: 'Job-Specific Calibration',
    badge: 'Highly Recommended',
    badgeStyle: 'bg-[#567C8D]/10 text-[#2F4156] ring-1 ring-[#567C8D]/25',
    icon: Target,
    description: "Upload your resume and the job posting. We'll write a letter tailored exactly to what the employer is looking for.",
    features: ['Keywords matched', 'Tailored to the role']
  },
];

const creationContentByMode = {
  default: {
    eyebrow: 'Getting Started',
    title: 'Choose how to build',
    accent: 'your cover letter.',
    description:
      'Pick a starting point below. For the best results, we highly recommend uploading both your resume and the job description to create a perfectly tailored letter.',
    supportItems: [
      {
        icon: LayoutTemplate,
        title: 'ATS-Friendly Designs',
        text: 'Clean layouts designed to easily pass through screening software.',
      },
      {
        icon: Sparkles,
        title: 'Smart Writing',
        text: 'Automatically highlights your best achievements and relevant skills.',
      },
    ],
  },
  scratch: {
    eyebrow: 'Manual Build',
    title: 'Start from Scratch',
    accent: 'with full control.',
    description:
      'Choose this path when you want to write manually, shape every sentence yourself, and build the letter directly inside the editor.',
    supportItems: [
      {
        icon: LayoutTemplate,
        title: 'Flexible Templates',
        text: 'Jump into polished layouts immediately without waiting for AI generation.',
      },
      {
        icon: Sparkles,
        title: 'Manual Precision',
        text: 'Best when you already know the exact tone, structure, and message you want.',
      },
    ],
  },
  resume: {
    eyebrow: 'Resume Powered',
    title: 'Turn your resume into',
    accent: 'a Cover letter.',
    description:
      'Hover here when speed matters. We use your resume to create a professional letter that reflects your broader experience and strengths.',
    supportItems: [
      {
        icon: LayoutTemplate,
        title: 'ATS-Friendly Framing',
        text: 'Your experience is organized into a clean structure that is easy to scan and refine.',
      },
      {
        icon: Sparkles,
        title: 'Stronger First Version',
        text: 'A quick way to surface your top achievements before you make final edits.',
      },
    ],
  },
  'resume-job': {
    eyebrow: 'Best Match',
    title: 'Match your resume to',
    accent: 'the exact role.',
    description:
      'This is the most tailored option. Add both your resume and the job description so the left draft starts closer to what the employer is actually asking for.',
    supportItems: [
      {
        icon: LayoutTemplate,
        title: 'Keyword Alignment',
        text: 'The draft can reflect the language, priorities, and role expectations from the posting.',
      },
      {
        icon: Sparkles,
        title: 'Sharper Personalization',
        text: 'Best for targeted applications where relevance and specificity matter most.',
      },
    ],
  },
};

const Builder = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [isHelpOpen, setIsHelpOpen] = React.useState(false);
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
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-[#C8D9E6] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto w-full px-4 py-2 sm:px-6">
          <div className="flex min-h-16 flex-wrap lg:flex-nowrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3 sm:gap-6">
            <button onClick={openHome} className="flex items-center gap-3 transition-opacity hover:opacity-80">
              <img src={BlueLogo} alt="CareerSense Logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-2xl shadow-xs shrink-0" />
              <div className="text-left">
                <h1 className="text-[25px] font-black leading-none tracking-[-0.04em]">
                  <span className="text-[#0D2E63]">Career</span><span className="text-[#306099]">Sense</span>
                </h1>
                <p className="mt-1 text-[9px] font-black uppercase tracking-[0.28em] text-[#6B87A0]">
                  Executive Letters
                </p>
              </div>
            </button>
            <div className="hidden h-6 w-px bg-[#C8D9E6] md:block" />
            {step > 0 && (
            <div className="hidden min-w-0 items-center lg:flex">
              {steps.map((item, index) => {
                const active = step === item.num;
                const done = step > item.num;
                return (
                  <React.Fragment key={item.label}>
                    <div className={`flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 xl:px-3 xl:py-1.5 transition-colors ${active ? 'bg-[#C8D9E6]/50' : ''}`}>
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                          active
                            ? 'bg-[#2F4156] text-white shadow-sm'
                            : done
                              ? 'bg-[#567C8D] text-white'
                              : 'bg-[#C8D9E6] text-[#567C8D]'
                        }`}
                      >
                        {done ? <Check size={10} strokeWidth={3} /> : item.num}
                      </div>
                      <span className={`text-[12px] font-semibold ${active ? 'text-[#2F4156]' : 'text-[#567C8D]'}`}>
                        {item.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`mx-1.5 h-px w-3 xl:w-6 ${done ? 'bg-[#567C8D]' : 'bg-[#C8D9E6]'}`} />
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
                onClick={() => setIsHelpOpen(true)}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-md px-1.5 xl:px-2 text-[12px] font-semibold text-[#567C8D] transition-colors hover:text-[#2F4156] focus:outline-none focus:ring-2 focus:ring-[#C8D9E6]"
                aria-label="Open help toolkit"
              >
                <LifeBuoy size={14} /> Help
              </button>
              <SignedIn>
                <div className="hidden items-center gap-1.5 xl:gap-2 xl:flex">
                  <div className="flex min-h-10 items-center gap-1.5 xl:gap-2 rounded-md border border-[#C8D9E6] bg-white px-2.5 py-1.5 xl:px-3 text-[11px] font-bold text-[#567C8D] shadow-sm">
                    <Zap size={12} className="text-[#567C8D]" />
                    Career Points Used
                    <span className="text-[#2F4156]">{formatPoints(creditUsage.totalPoints)}</span>
                  </div>
                  <div className="flex min-h-10 items-center gap-1.5 xl:gap-2 rounded-md border border-[#C8D9E6] bg-white px-2.5 py-1.5 xl:px-3 text-[11px] font-bold text-[#567C8D] shadow-sm">
                    <FileText size={12} className="text-[#567C8D]" />
                    Total Bill
                    <span className="text-[#2F4156]">{formatUsd(creditUsage.totalBillUsd)}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-[#C8D9E6] bg-white px-2.5 py-1.5 xl:px-3 text-[12px] font-bold text-[#2F4156] shadow-sm transition-all hover:bg-[#F5EFEB] hover:shadow focus:outline-none focus:ring-2 focus:ring-[#C8D9E6]"
                >
                  Dashboard
                </button>
              </SignedIn>
              <button onClick={handleBack} className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-[#C8D9E6] bg-white px-2.5 py-1.5 xl:px-3 text-[12px] font-bold text-[#2F4156] shadow-sm transition-all hover:bg-[#F5EFEB] hover:shadow focus:outline-none focus:ring-2 focus:ring-[#C8D9E6]">
                <ArrowLeft size={14} />
                Back
              </button>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#2F4156] px-4 text-[12px] font-bold text-white shadow-sm hover:bg-[#233244] transition focus:outline-none focus:ring-2 focus:ring-[#C8D9E6]">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileNavOpen((current) => !current)}
              aria-label={isMobileNavOpen ? 'Close builder menu' : 'Open builder menu'}
              aria-expanded={isMobileNavOpen}
              className="flex h-11 w-11 items-center justify-center rounded-md border border-[#C8D9E6] bg-white text-[#2F4156] shadow-sm transition hover:bg-[#F5EFEB] md:hidden"
            >
              {isMobileNavOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
          {isMobileNavOpen && (
            <div className="border-t border-[#C8D9E6] pt-3 md:hidden">
              {step > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {steps.map((item) => {
                    const active = step === item.num;
                    const done = step > item.num;
                    return (
                      <div
                        key={item.label}
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                          active
                            ? 'bg-[#C8D9E6]/50 text-[#2F4156]'
                            : done
                              ? 'bg-[#567C8D] text-white'
                              : 'bg-[#F5EFEB] text-[#567C8D]'
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
                    setIsMobileNavOpen(false);
                    setIsHelpOpen(true);
                  }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#C8D9E6] bg-white px-3 py-2 text-[12px] font-bold text-[#2F4156] shadow-sm"
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
                    className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#C8D9E6] bg-white px-3 py-2 text-[12px] font-bold text-[#2F4156] shadow-sm"
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
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#C8D9E6] bg-white px-3 py-2 text-[12px] font-bold text-[#2F4156] shadow-sm"
                >
                  <ArrowLeft size={14} />
                  Back
                </button>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button
                      onClick={() => setIsMobileNavOpen(false)}
                      className="inline-flex min-h-11 w-full items-center gap-2 rounded-md bg-[#2F4156] px-3 py-2 text-[12px] font-bold text-white shadow-sm hover:bg-[#233244] transition"
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
                    label="Career Points Used"
                    value={formatPoints(creditUsage.totalPoints)}
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

      <AnimatePresence>
        {isHelpOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-900/60 p-3 backdrop-blur-sm sm:items-center sm:p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 18 }}
              className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-[#C8D9E6] bg-white shadow-2xl sm:max-h-[calc(100dvh-2rem)]"
            >
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#C8D9E6] bg-[#F5EFEB] px-4 py-3 sm:px-5 sm:py-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#567C8D] sm:text-[11px] sm:tracking-[0.16em]">{helpTitle}</p>
                  <h2 className="mt-1 text-base font-black text-[#2F4156] sm:text-lg">{helpSubtitle}</h2>
                  <p className="mt-2 max-w-2xl text-[12px] font-semibold leading-5 text-[#567C8D]">{helpSummary}</p>
                </div>
                <button
                  onClick={() => setIsHelpOpen(false)}
                  className="flex min-h-11 min-w-11 items-center justify-center rounded-md border border-[#C8D9E6] bg-white text-xl leading-none text-[#567C8D] transition hover:bg-[#F5EFEB] hover:text-[#2F4156]"
                  aria-label="Close builder help"
                >
                  ×
                </button>
              </div>

              <div className="border-b border-[#C8D9E6] bg-white px-4 py-3 sm:px-5">
                <div className="grid gap-2 sm:grid-cols-3">
                  {helpQuickFacts.map((item) => (
                    <div key={item.label} className="rounded-lg border border-[#C8D9E6] bg-[#F8FBFD] px-3 py-2.5">
                      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#567C8D]">{item.label}</p>
                      <p className="mt-1 text-[12px] font-bold text-[#2F4156]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid flex-1 gap-3 overflow-y-auto p-4 sm:grid-cols-2 sm:p-5">
                {helpItems.map((item) => {
                  const { title, text, icon: Icon, actionLabel, targetTab, bullets } = item;
                  return (
                  <div key={title} className="rounded-lg border border-[#C8D9E6] bg-white p-3 shadow-sm sm:p-4">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-[#C8D9E6]/55 text-[#2F4156] sm:mb-3">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-sm font-black text-[#2F4156]">{title}</h3>
                    <p className="mt-1 text-xs font-semibold leading-5 text-[#567C8D]">{text}</p>
                    {bullets?.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {bullets.map((bullet) => (
                          <div key={bullet} className="flex items-start gap-2 text-[11px] font-semibold leading-5 text-[#2F4156]">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#567C8D]" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {targetTab && (
                      <button
                        onClick={() => runHelpAction(item)}
                        className="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-md border border-[#C8D9E6] bg-[#F5EFEB] px-3 py-2 text-[11px] font-black text-[#2F4156] transition hover:border-[#567C8D]/50 hover:bg-[#C8D9E6]/45"
                      >
                        {actionLabel}
                        <ChevronRight size={13} />
                      </button>
                    )}
                  </div>
                  );
                })}
              </div>

              <div className="shrink-0 border-t border-[#C8D9E6] bg-[#F5EFEB] px-4 py-3 sm:px-5 sm:py-4">
                <button
                  onClick={() => setIsHelpOpen(false)}
                  className="min-h-11 w-full rounded-md bg-[#2F4156] px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#567C8D]"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative min-h-screen overflow-hidden">
        {step === 0 && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Suspense fallback={<StepFallback tinted />}>
              <AnimatedHeroBackground />
            </Suspense>
          </div>
        )}
        
        <div className="relative z-10 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full"
            >
              {step === 0 && <CreationStart onChoose={chooseMode} isSignedIn={isSignedIn} />}
              {step === 1 && (
                <Suspense fallback={<StepFallback />}>
                  <ManualDetailsStep />
                </Suspense>
              )}
              {step === 2 && (
                <Suspense fallback={<StepFallback />}>
                  <ResumeUploader />
                </Suspense>
              )}
              {step === 3 && (
                <Suspense fallback={<StepFallback />}>
                  <JobDetails />
                </Suspense>
              )}
              {step === 4 && (
                <div className="bg-[#F5EFEB]">
                  <Suspense fallback={<StepFallback tinted />}>
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

const StepFallback = ({ tinted = false }) => (
  <div className={`min-h-[60vh] w-full ${tinted ? 'bg-[#F5EFEB]' : ''}`} />
);

const CreationStart = ({ onChoose, isSignedIn }) => {
  const defaultMode = 'default';
  const [previewMode, setPreviewMode] = React.useState(defaultMode);
  const activeContent = creationContentByMode[previewMode] ?? creationContentByMode[defaultMode];

  return (
    <div className="mx-auto max-w-8xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        <div className="flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={previewMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-[#C8D9E6] bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#567C8D] shadow-sm backdrop-blur-md">
                <Zap size={14} className="fill-current text-[#567C8D]" />
                {activeContent.eyebrow}
              </div>

              <h1 className="cs-display text-3xl font-extrabold leading-[1.1] tracking-tight text-[#2F4156] sm:text-5xl">
                {activeContent.title} <br />
                <span className="text-[#567C8D]">{activeContent.accent}</span>
              </h1>

              <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-[#567C8D]">
                {activeContent.description}
              </p>

              <div className="mt-8 grid max-w-lg gap-5 border-t border-[#C8D9E6] pt-7 sm:grid-cols-2 sm:gap-6 sm:pt-8">
                {activeContent.supportItems.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex flex-col gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded border border-[#C8D9E6] bg-white/90 text-[#2F4156] shadow-sm">
                      <Icon size={16} />
                    </div>
                    <h4 className="text-[13px] font-bold text-[#2F4156]">{title}</h4>
                    <p className="text-[12px] leading-relaxed text-[#567C8D]">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-5">
          {creationOptions.map(({ mode, title, badge, badgeStyle, icon: Icon, description, features }, index) => {
            const isLocked = !isSignedIn && mode !== 'resume';

            const cardContent = (
              <div className={`relative flex flex-col gap-5 rounded-xl border bg-white/95 p-6 shadow-sm backdrop-blur-md transition-all duration-300 sm:flex-row ${index === 2 ? 'border-[#567C8D]/40 shadow-[0_18px_45px_rgba(47,65,86,0.12)]' : 'border-[#C8D9E6] group-hover:border-[#567C8D]/30 group-hover:shadow-[0_18px_45px_rgba(47,65,86,0.1)]'}`}>
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                  isLocked ? 'border-slate-300 bg-slate-100 text-slate-400' :
                  index === 2
                    ? 'border-[#567C8D]/25 bg-[#C8D9E6]/55 text-[#2F4156]'
                    : 'border-[#C8D9E6] bg-[#F5EFEB]/60 text-[#567C8D] group-hover:bg-[#C8D9E6]/30'
                }`}>
                  {isLocked ? <Lock size={20} /> : <Icon size={22} strokeWidth={2} />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h3 className="text-[16px] font-bold text-[#2F4156]">{title}</h3>
                    {isLocked ? (
                      <span className="inline-flex items-center gap-1 rounded bg-[#E2E8F0] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#64748B] ring-1 ring-slate-300">
                        <Lock size={10} /> Sign In
                      </span>
                    ) : (
                      <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeStyle}`}>
                        {badge}
                      </span>
                    )}
                  </div>
                  <p className="mb-4 pr-8 text-[13px] leading-relaxed text-[#567C8D]">
                    {isLocked ? "Sign in to unlock this creation method." : description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] font-semibold text-[#567C8D]">
                        <Check size={12} className="text-[#567C8D]" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute right-6 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#C8D9E6] bg-white/90 text-[#567C8D] opacity-0 shadow-sm transition-all duration-300 group-hover:translate-x-1 group-hover:border-[#567C8D]/30 group-hover:text-[#2F4156] group-hover:opacity-100 sm:flex">
                  <ChevronRight size={16} strokeWidth={2.5} />
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
                    className="group relative w-full text-left focus:outline-none cursor-pointer"
                  >
                    <div className="absolute -inset-0.5 rounded-2xl bg-[#567C8D] opacity-0 blur transition duration-500 group-hover:opacity-15" />
                    {cardContent}
                  </div>
                </SignInButton>
              );
            }

            return (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                key={mode}
                onClick={() => onChoose(mode)}
                onMouseEnter={() => setPreviewMode(mode)}
                onFocus={() => setPreviewMode(mode)}
                onMouseLeave={() => setPreviewMode(defaultMode)}
                onBlur={() => setPreviewMode(defaultMode)}
                className="group relative w-full text-left focus:outline-none"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="absolute -inset-0.5 rounded-2xl bg-[#567C8D] opacity-0 blur transition duration-500 group-hover:opacity-15" />
                {cardContent}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
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
