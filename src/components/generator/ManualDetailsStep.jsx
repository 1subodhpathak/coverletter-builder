import React from 'react';
import { AlertCircle, ArrowRight, Briefcase, Building2, Link as LinkIcon, Mail, MapPin, Phone, User } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { getManualFieldErrors } from '../../utils/manualFields';

const inputClassName =
  'w-full rounded-xl border border-[#C8D9E6] bg-[#F5EFEB]/60 px-4 py-2 text-sm font-semibold text-[#2F4156] outline-none transition placeholder:text-[#567C8D]/45 focus:border-[#567C8D] focus:bg-white focus:ring-2 focus:ring-[#C8D9E6]';

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
      setError(`Complete all required fields. If you want one hidden in the final letter, enter a single blank space in that field.`);
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
    <div className="min-h-[calc(100vh-80px)] bg-[#F5EFEB] px-5 py-5 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[0.7fr_1.3fr]">
        <section className="rounded-2xl border border-[#C8D9E6] bg-white p-5 shadow-sm lg:p-6">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#C8D9E6]/55 text-[#2F4156]">
            <User size={22} />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#567C8D]">Manual Details</p>
          <h1 className="cs-display mt-2.5 text-[2.1rem] font-black leading-tight tracking-tight text-[#2F4156]">
            Add letter details before you begin
          </h1>
          <p className="mt-2.5 text-sm leading-6 text-[#567C8D]">
            These fields are collected separately and are the only source for personal and employer details in the final cover letter.
          </p>

          <div className="mt-5 rounded-xl border border-[#C8D9E6] bg-[#F5EFEB]/70 p-4">
            <p className="text-sm font-black text-[#2F4156]">Important</p>
            <ul className="mt-2.5 space-y-1.5 text-[13px] leading-5 text-[#567C8D]">
              <li>AI will not take this information from the resume or job description.</li>
              <li>Every field below is required before continuing.</li>
              <li>If you do not know the hiring manager name, enter <span className="font-black text-[#2F4156]">Hiring Manager</span> to keep the letter professional.</li>
              <li>If you do not want a field to appear in the final letter, enter a single blank space.</li>
            </ul>
          </div>
        </section>

        <section className="rounded-2xl border border-[#C8D9E6] bg-white p-5 shadow-sm lg:p-6">
          <div className="mb-4">
            <h2 className="cs-display text-[2rem] font-black leading-tight text-[#2F4156]">Required Input Section</h2>
            <p className="mt-1 text-[13px] text-[#567C8D]">This information will also stay editable later in the editor.</p>
          </div>

          <div className="space-y-4">
            <FieldSection title="Personal Variables">
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
              <div className="md:col-span-2 grid gap-3 md:grid-cols-[2fr_1fr_1fr]">
                <Field label="Current Job Title" icon={Briefcase}>
                  <input
                    type="text"
                    value={profile.currentJobTitle || ''}
                    onChange={(e) => updateProfile({ currentJobTitle: e.target.value })}
                    className={inputClassName}
                  />
                </Field>
                <label className="block md:col-span-2">
                  <span className="mb-2 block text-xs font-black uppercase tracking-wide text-[#567C8D]">
                    Experience <span className="text-red-500">*</span>
                  </span>
                  <div className="grid gap-3 md:grid-cols-2">
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
                  </div>
                </label>
              </div>
            </FieldSection>

            <FieldSection title="Target Employer">
              <Field label="Company Name" icon={Building2}>
                <input
                  type="text"
                  value={recipient.company}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className={inputClassName}
                  placeholder="Google"
                />
              </Field>
              <Field label="Target Job Role / Position" icon={Building2}>
                <input
                  type="text"
                  value={recipient.targetRole}
                  onChange={(e) => updateRecipient({ targetRole: e.target.value })}
                  className={inputClassName}
                  placeholder="Director & COO"
                />
              </Field>
              <div className="md:col-span-2 grid gap-3 md:grid-cols-2">
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
              </div>
              <Field label="Company Address" icon={MapPin}>
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
              <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-600">
                <AlertCircle size={17} />
                {error}
              </div>
            )}

            <button
              onClick={handleContinue}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F4156] py-3 text-[15px] font-black text-white shadow-sm transition hover:bg-[#567C8D]"
            >
              Continue
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

const FieldSection = ({ title, children }) => (
  <div className="space-y-2.5">
    <h3 className="border-b border-slate-100 pb-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#567C8D]">
      {title}
    </h3>
    <div className="grid gap-x-4 gap-y-2.5 md:grid-cols-2">{children}</div>
  </div>
);

const Field = ({ label, icon: Icon, children }) => (
  <label className="block">
    <span className="mb-1 block text-[11px] font-black uppercase tracking-wide text-[#567C8D]">
      {label} <span className="text-red-500">*</span>
    </span>
    <div className="relative">
      <Icon className="absolute left-4 top-2.5 text-[#567C8D]" size={18} />
      <div className="[&>input]:pl-11">{children}</div>
    </div>
  </label>
);

export default ManualDetailsStep;
