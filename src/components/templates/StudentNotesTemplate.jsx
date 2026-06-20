import React from 'react';
import { Body, Signature, getProfilePhoto } from './ProfessionalTemplateParts';

const StudentNotesTemplate = (props) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const photo = getProfilePhoto(profile);
  const firstName = (profile.fullName || '').split(' ').filter(Boolean)[0];

  const accentColor = props.accent || design.color || '#2563eb';

  const bodyDesign = {
    ...design,
    fontFamily:
      design.fontFamily ||
      '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.2, 10.8), 11.8),
    lineHeight: Number(design.lineHeight) || 1.48,
  };

  const visibleSkills = skills.filter((skill) => hasValue(skill)).slice(0, 6);

  const hasRecipient =
    hasValue(recipient.name) ||
    hasValue(recipient.title) ||
    hasValue(recipient.company) ||
    hasValue(recipient.address);

  const showSignature =
    hasValue(signature.closing) ||
    hasValue(profile.fullName) ||
    signature.enabled;

  const contactItems = [
    {
      label: 'Email',
      value: profile.email,
      tone: 'red',
      breakAll: true,
    },
    {
      label: 'Phone',
      value: profile.phone,
      tone: 'blue',
    },
    {
      label: 'Location',
      value: profile.address,
      tone: 'teal',
    },
    {
      label: 'Portfolio',
      value: profile.linkedinPortfolio,
      tone: 'yellow',
      breakAll: true,
    },
  ].filter((item) => hasValue(item.value));

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-[#f7fbff] p-[4mm] shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      <div className="relative min-h-[289mm] bg-[#f9fbff]">
        {/* NOTEBOOK GRID BACKGROUND */}
        <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(#dceaff_1px,transparent_1px),linear-gradient(90deg,#dceaff_1px,transparent_1px)] [background-size:6mm_6mm]" />

        <div className="relative z-10 px-[5mm] py-[5mm]">
          {/* HEADER */}
          <header className="rounded-[18px] border border-slate-200 bg-white/95 p-4 shadow-[0_10px_26px_rgba(43,74,116,0.07)]">
            <div className="flex items-start justify-between gap-5">
              <div className="min-w-0">
                {hasValue(firstName) && (
                  <h1 className="text-[27px] font-black leading-tight tracking-[-0.035em] text-slate-950">
                    Hi, I am{' '}
                    <span style={{ color: accentColor }}>{firstName}</span>.
                  </h1>
                )}

                {hasValue(profile.fullName) && (
                  <p className="mt-1.5 text-[10.5px] font-black uppercase tracking-[0.15em] text-slate-500">
                    {profile.fullName}
                  </p>
                )}

                {(hasValue(profile.currentJobTitle) || visibleSkills.length > 0) && (
                  <p className="mt-2 max-w-[132mm] text-[11px] font-semibold leading-4 text-slate-600">
                    {[profile.currentJobTitle, visibleSkills.slice(0, 3).join(' • ')]
                      .filter((value) => hasValue(value))
                      .join(' · ')}
                  </p>
                )}
              </div>

              <div className="shrink-0 text-right">
                <span className="inline-flex rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[8.8px] font-black uppercase tracking-[0.14em] text-slate-500 shadow-sm">
                  Cover Letter
                </span>

                <p className="mt-2 text-[10px] font-bold text-slate-500">
                  {formattedDate}
                </p>
              </div>
            </div>

            <p className="mt-3 max-w-[150mm] text-[10.8px] font-semibold leading-4 text-slate-700">
              A warm, organized, and professional cover letter layout designed
              for clarity, personality, and easy readability.
            </p>
          </header>

          {/* MAIN CONTENT */}
          <main className="mt-4 grid grid-cols-[1fr_48mm] gap-4">
            {/* LEFT LETTER AREA */}
            <section className="space-y-4">
              {hasRecipient && (
                <section className="rounded-[16px] border border-slate-200 bg-white/95 p-4 shadow-sm">
                  <SectionTab accentColor={accentColor}>Recipient</SectionTab>

                  <div className="mt-3 text-[11.2px] font-semibold leading-4 text-slate-700">
                    {hasValue(recipient.name) && (
                      <p className="font-black text-slate-950">
                        {recipient.name}
                      </p>
                    )}

                    {hasValue(recipient.title) && (
                      <p className="text-slate-600">{recipient.title}</p>
                    )}

                    {hasValue(recipient.company) && (
                      <p className="font-bold text-slate-800">
                        {recipient.company}
                      </p>
                    )}

                    {hasValue(recipient.address) && (
                      <p className="text-slate-600">{recipient.address}</p>
                    )}
                  </div>
                </section>
              )}

              <section className="rounded-[16px] border border-slate-200 bg-white/95 p-4 shadow-sm">
                <SectionTab accentColor={accentColor}>Letter</SectionTab>

                <div className="mt-3 rounded-[14px] bg-white px-3 py-2.5 text-slate-800">
                  <Body
                    body={props.body}
                    design={bodyDesign}
                    onUpdateBody={props.onUpdateBody}
                    className="
                      text-left text-slate-800
                      prose-p:my-1.5
                      prose-p:font-medium
                      prose-p:leading-snug
                      prose-ul:my-1.5
                      prose-li:my-0.5
                      prose-strong:font-semibold
                      prose-strong:text-blue-700
                      [&>*:first-child]:mt-0
                      [&>*:last-child]:mb-0
                    "
                  />
                </div>
              </section>

              {/* SIGNATURE - NATURAL FLOW */}
              {showSignature && (
                <footer
                  className="
                    border-t border-slate-200 pt-4
                    text-slate-900
                    [&>div]:mt-0
                    [&_img]:h-10
                    [&_p]:text-slate-950
                  "
                >
                  <Signature
                    signature={signature}
                    profile={profile}
                    accent={accentColor}
                  />
                </footer>
              )}
            </section>

            {/* RIGHT SIDEBAR */}
            <aside className="space-y-4">
              {/* PHOTO CARD */}
              <section className="rounded-[16px] border border-slate-200 bg-white/95 p-4 shadow-sm">
                <div className="relative mx-auto w-[32mm]">
                  <div className="absolute -top-2 left-1/2 h-5 w-10 -translate-x-1/2 rounded-sm bg-white shadow-sm" />

                  <img
                    src={photo}
                    alt={`${profile.fullName || 'Profile'} profile`}
                    className="h-[32mm] w-full rounded-[12px] object-cover shadow-sm"
                  />
                </div>

                {hasValue(profile.fullName) && (
                  <p className="mt-3 text-center text-[9.8px] font-black uppercase leading-3 tracking-[0.11em] text-slate-950">
                    {profile.fullName}
                  </p>
                )}
              </section>

              {/* CONTACT */}
              {contactItems.length > 0 && (
                <section className="rounded-[16px] border border-slate-200 bg-white/95 p-4 shadow-sm">
                  <SectionTab accentColor={accentColor}>Contact</SectionTab>

                  <div className="mt-3 space-y-2 text-[9.4px] font-bold text-slate-700">
                    {contactItems.map((item) => (
                      <ContactPill
                        key={item.label}
                        tone={item.tone}
                        breakAll={item.breakAll}
                      >
                        <span className="block text-[7.8px] font-black uppercase tracking-[0.12em] opacity-70">
                          {item.label}
                        </span>
                        <span>{item.value}</span>
                      </ContactPill>
                    ))}
                  </div>
                </section>
              )}

              {/* SKILLS */}
              {visibleSkills.length > 0 && (
                <section className="rounded-[16px] border border-slate-200 bg-white/95 p-4 shadow-sm">
                  <SectionTab accentColor={accentColor}>Skills</SectionTab>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {visibleSkills.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-lg bg-blue-50 px-2 py-1 text-[9px] font-black leading-tight text-blue-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* NOTE */}
              <section className="rounded-[16px] border border-slate-200 bg-white/95 p-4 shadow-sm">
                <p className="text-[9.8px] font-semibold leading-4 text-slate-600">
                  Organized like study notes, but polished enough for a real
                  professional application.
                </p>
              </section>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
};

const SectionTab = ({ children, accentColor }) => (
  <span
    className="inline-flex rounded-lg px-2.5 py-1 text-[8.8px] font-black uppercase tracking-[0.09em] text-slate-950 shadow-[0_2px_0_rgba(15,23,42,0.10)]"
    style={{
      backgroundColor: '#fff4a8',
      border: `1px solid ${accentColor}22`,
    }}
  >
    {children}
  </span>
);

const ContactPill = ({ children, tone, breakAll = false }) => {
  const tones = {
    red: 'bg-red-50 text-red-700',
    blue: 'bg-blue-50 text-blue-700',
    teal: 'bg-teal-50 text-teal-700',
    yellow: 'bg-yellow-50 text-yellow-700',
  };

  return (
    <p
      className={`rounded-lg px-2.5 py-1.5 leading-3.5 ${
        breakAll ? 'break-all' : 'break-words'
      } ${tones[tone] || tones.blue}`}
    >
      {children}
    </p>
  );
};

export default StudentNotesTemplate;