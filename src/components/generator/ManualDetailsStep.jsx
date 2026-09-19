import React from 'react';
import {
  AlertCircle,
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  Info,
  Link as LinkIcon,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { getManualFieldErrors } from '../../utils/manualFields';
import detailsBackground from '../../assets/details.png';

/*
 * UI-only refresh.
 * All store bindings, validation, creation-mode branching and step navigation
 * are intentionally unchanged.
 */
const inputClassName =
  'h-[42px] w-full rounded-[11px] border border-[#CBDCE6] bg-white px-3 text-[13px] font-semibold text-[#16334A] outline-none transition placeholder:text-[#8FA5B5] hover:border-[#ABC3D1] focus:border-[#6F98AE] focus:ring-[3px] focus:ring-[#DCEAF1]/80 lg:h-[38px] 2xl:h-[42px]';

const ManualDetailsStep = () => {
  const {
    creationMode,
    profile,
    updateProfile,
    recipient,
    updateRecipient,
    setCompanyName,
    setStep,
  } = useStore();
  const [error, setError] = React.useState('');

  const handleContinue = () => {
    const missing = getManualFieldErrors({ profile, recipient });

    if (missing.length > 0) {
      setError(
        'Complete all required fields. If you want one hidden in the final letter, enter a single blank space in that field.'
      );
      return;
    }

    setError('');

    if (creationMode === 'scratch') {
      setStep(4);
      return;
    }

    setStep(2);
  };

  return (
    <div className="bg-[#F7F4EE] px-4 py-3.5 sm:px-5 lg:h-full lg:min-h-0 lg:overflow-hidden lg:px-6 lg:py-3 xl:px-7">
      <div className="mx-auto grid w-full max-w-[1720px] gap-4 lg:h-full lg:min-h-0 lg:grid-cols-[0.305fr_0.695fr] xl:gap-5">
        {/* LEFT CONTEXT PANEL */}
        <aside
          className="relative overflow-hidden rounded-[24px] bg-[#082A40] shadow-[0_22px_48px_rgba(25,42,55,0.14)] lg:h-full lg:min-h-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(4,27,43,0.46) 0%, rgba(4,29,45,0.55) 48%, rgba(3,25,40,0.72) 100%), url(${detailsBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: '58% center',
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_10%,rgba(132,173,199,0.14),transparent_32%)]" />

          <div className="relative z-10 flex h-full min-h-0 flex-col px-5 py-5 xl:px-6 xl:py-5">
            <div>
              {/* Explicit dimensions avoid invalid Tailwind width classes becoming full-width. */}
              <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-[#E5B447] text-[#12364E] shadow-[0_10px_24px_rgba(229,180,71,0.2)]">
                <User size={21} strokeWidth={2.2} />
              </div>

              <p className="mt-4 text-[10px] font-black uppercase tracking-[0.24em] text-[#F0B946]">
                Required Details
              </p>

              <h1 className="mt-2 max-w-[390px] font-serif text-[clamp(27px,3.7vh,37px)] font-bold leading-[0.99] tracking-[-0.035em] text-white">
                Build the right
                <span className="block text-[#B7CEDD]">foundation first.</span>
              </h1>

              <p className="mt-3 max-w-[410px] text-[12px] font-medium leading-[1.55] text-[#C9D8E2]">
                Add the personal and employer details that will appear in your final cover letter.
              </p>
            </div>

            <div className="mt-4 rounded-[17px] border border-[#63879E]/55 bg-[#123A52]/72 px-4 py-3 backdrop-blur-[2px] xl:px-4">
              <div className="flex items-center gap-3">
                <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] bg-[#254E67] text-[#F1BA47]">
                  <ShieldCheck size={17} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#9EB7C7]">Important</p>
                  <p className="mt-0.5 text-[13px] font-bold text-white">Complete every field</p>
                </div>
              </div>

              <div className="mt-2.5 space-y-2">
                <InfoRow>AI does not extract these details automatically.</InfoRow>
                <InfoRow>
                  Use <span className="font-bold text-white">Hiring Manager</span> if the name is unknown.
                </InfoRow>
                <InfoRow>Enter one blank space to hide a field from the final letter.</InfoRow>
              </div>
            </div>

            <div className="mt-3 rounded-[17px] border border-[#63879E]/50 bg-[#12384F]/66 px-4 py-3 backdrop-blur-[2px] xl:px-4">
              <p className="text-[9px] font-black uppercase tracking-[0.21em] text-[#9EB7C7]">What happens next</p>

              <div className="relative mt-2.5 space-y-2">
                <div className="absolute bottom-4 left-[15px] top-4 w-px bg-[#486E85]" />
                <FlowStep number="01" title="Personal Details" text="Used in your letter header." active />
                <FlowStep number="02" title="Employer Details" text="Used for role personalization." />
                <FlowStep number="03" title="Continue Building" text="Everything remains editable." />
              </div>
            </div>

            <div className="mt-auto pt-3">
              <div className="h-px bg-[#5E8198]/45" />
              <div className="mt-3 flex items-center gap-2.5 text-[11px] font-medium text-[#C9D7E1]">
                <span className="flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full bg-[#2C566D] text-[#F2BD4C]">
                  <Check size={13} strokeWidth={2.7} />
                </span>
                Saved directly into your CareerSense editor.
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT FORM */}
        <section className="rounded-[24px] border border-[#DDD7CF] bg-white px-5 py-5 shadow-[0_20px_45px_rgba(37,51,64,0.065)] sm:px-6 lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:overflow-hidden lg:py-4 xl:px-6 xl:py-4">
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#E8E2D9] pb-2.5">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#A87924]">Required Input</p>
              <h2 className="mt-1 font-serif text-[clamp(27px,3.8vh,35px)] font-bold leading-none tracking-[-0.035em] text-[#102E46]">
                Letter Details
              </h2>
            </div>
            <div className="hidden rounded-full bg-[#F7F0E3] px-4 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-[#9A7027] sm:block">
              Required Fields *
            </div>
          </div>

          <div className="mt-2.5 flex min-h-0 flex-1 flex-col gap-2.5">
            <FieldSection
              title="Personal Information"
              icon={User}
              note="This information will appear in your cover letter header."
            >
              <Field label="Full Name" icon={User}>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => updateProfile({ fullName: e.target.value })}
                  className={inputClassName}
                />
              </Field>

              <Field label="Email" icon={Mail}>
                <input
                  type="text"
                  value={profile.email}
                  onChange={(e) => updateProfile({ email: e.target.value })}
                  className={inputClassName}
                />
              </Field>

              <Field label="Phone" icon={Phone}>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => updateProfile({ phone: e.target.value })}
                  className={inputClassName}
                />
              </Field>

              <Field label="Location" icon={MapPin}>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => updateProfile({ address: e.target.value })}
                  className={inputClassName}
                />
              </Field>

              <Field label="LinkedIn / Portfolio" icon={LinkIcon}>
                <input
                  type="text"
                  value={profile.linkedinPortfolio || ''}
                  onChange={(e) => updateProfile({ linkedinPortfolio: e.target.value })}
                  className={inputClassName}
                  placeholder="https://linkedin.com/in/yourname"
                />
              </Field>

              <Field label="Current Job Title" icon={Briefcase}>
                <input
                  type="text"
                  value={profile.currentJobTitle || ''}
                  onChange={(e) => updateProfile({ currentJobTitle: e.target.value })}
                  className={inputClassName}
                />
              </Field>

              <ExperienceField>
                <input
                  type="number"
                  min="0"
                  value={profile.experienceYears || ''}
                  onChange={(e) => updateProfile({ experienceYears: e.target.value })}
                  className={inputClassName}
                  placeholder="Years"
                />
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={profile.experienceMonths || ''}
                  onChange={(e) => updateProfile({ experienceMonths: e.target.value })}
                  className={inputClassName}
                  placeholder="Months"
                />
              </ExperienceField>
            </FieldSection>

            <FieldSection
              title="Target Employer"
              icon={Building2}
              note="Add details about the company and role you're applying for."
            >
              <Field label="Company Name" icon={Building2}>
                <input
                  type="text"
                  value={recipient.company}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className={inputClassName}
                  placeholder="Google"
                />
              </Field>

              <Field label="Target Job Role / Position" icon={Briefcase}>
                <input
                  type="text"
                  value={recipient.targetRole}
                  onChange={(e) => updateRecipient({ targetRole: e.target.value })}
                  className={inputClassName}
                  placeholder="Director & COO"
                />
              </Field>

              <Field label="Hiring Manager" icon={User}>
                <input
                  type="text"
                  value={recipient.name}
                  onChange={(e) => updateRecipient({ name: e.target.value })}
                  className={inputClassName}
                  placeholder="Hiring Manager"
                />
              </Field>

              <Field label="Hiring Manager Designation" icon={Briefcase}>
                <input
                  type="text"
                  value={recipient.title || ''}
                  onChange={(e) => updateRecipient({ title: e.target.value })}
                  className={inputClassName}
                  placeholder="CEO / President"
                />
              </Field>

              <Field label="Company Address" icon={MapPin} className="lg:col-span-2">
                <input
                  type="text"
                  value={recipient.address}
                  onChange={(e) => updateRecipient({ address: e.target.value })}
                  className={inputClassName}
                  placeholder="Mountain View, California."
                />
              </Field>
            </FieldSection>

            {error && (
              <div className="flex shrink-0 items-start gap-2 rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-[11px] font-bold leading-4 text-red-600">
                <AlertCircle size={15} className="mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            <div className="mt-auto flex shrink-0 flex-col gap-2.5 border-t border-[#EAE5DE] pt-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-[11px] font-medium text-[#7891A1]">
                <span className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#EDF5F8] text-[#6C91A5]">
                  <Info size={12} />
                </span>
                Everything remains editable in the editor.
              </div>

              <button
                onClick={handleContinue}
                className="group inline-flex h-[40px] items-center justify-center gap-3 rounded-[10px] bg-[#0E3048] px-7 text-[13px] font-black text-white shadow-[0_10px_22px_rgba(14,48,72,0.16)] transition hover:bg-[#163E58] focus:outline-none focus:ring-[3px] focus:ring-[#C8D9E6]"
              >
                Continue
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const InfoRow = ({ children }) => (
  <div className="flex items-start gap-2.5 text-[11px] font-medium leading-[1.45] text-[#C4D4DE]">
    <span className="mt-[5px] h-[7px] w-[7px] shrink-0 rounded-full bg-[#F1B944]" />
    <span>{children}</span>
  </div>
);

const FlowStep = ({ number, title, text, active = false }) => (
  <div className="relative flex items-start gap-3">
    <div
      className={`relative z-10 flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-full border text-[10px] font-black ${
        active
          ? 'border-[#E6B346] bg-[#1D445B] text-[#F0BB49] shadow-[0_0_0_3px_rgba(230,179,70,0.07)]'
          : 'border-[#4F768D] bg-[#183E56] text-[#D3DFE7]'
      }`}
    >
      {number}
    </div>
    <div className="pt-0.5">
      <p className="text-[12px] font-bold leading-4 text-white">{title}</p>
      <p className="mt-0.5 text-[10px] leading-4 text-[#9FB6C5]">{text}</p>
    </div>
  </div>
);

const FieldSection = ({ title, icon: Icon, note, children }) => (
  <div className="shrink-0 overflow-hidden rounded-[16px] border border-[#E2DDD5] bg-[#FFFEFC]">
    <div className="flex min-h-[39px] flex-col gap-1.5 border-b border-[#E8E2D9] bg-[#FAF7F2] px-3.5 py-1.5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2.5">
        <span className="flex h-[29px] w-[29px] items-center justify-center rounded-[8px] bg-[#EAF3F7] text-[#62879C]">
          <Icon size={15} />
        </span>
        <h3 className="text-[11px] font-black uppercase tracking-[0.16em] text-[#15334A]">{title}</h3>
      </div>
      {note && <p className="hidden text-[10px] italic text-[#7890A0] xl:block">{note}</p>}
    </div>

    <div className="grid gap-x-3 gap-y-2 p-3 md:grid-cols-2 lg:grid-cols-3 xl:p-3">{children}</div>
  </div>
);

const Field = ({ label, icon: Icon, children, className = '' }) => (
  <label className={`block ${className}`}>
    <span className="mb-1 block text-[9px] font-black uppercase tracking-[0.115em] text-[#668399]">
      {label} <span className="text-[#D85656]">*</span>
    </span>
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-[#7798AA]" size={15} />
      <div className="[&>input]:pl-10">{children}</div>
    </div>
  </label>
);

const ExperienceField = ({ children }) => (
  <div className="md:col-span-2 lg:col-span-3">
    <span className="mb-1 block text-[9px] font-black uppercase tracking-[0.115em] text-[#668399]">
      Experience <span className="text-[#D85656]">*</span>
    </span>
    <div className="grid gap-3 sm:grid-cols-2">{children}</div>
  </div>
);

export default ManualDetailsStep;
