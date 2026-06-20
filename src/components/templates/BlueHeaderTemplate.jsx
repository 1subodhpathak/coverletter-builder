import React from 'react';
import { Body, ContactLines, Signature } from './ProfessionalTemplateParts';

const BlueHeaderTemplate = ({
  body = '',
  design = {},
  profile = {},
  signature = {},
  recipient = {},
  skills = [],
  accent,
  onUpdateBody,
}) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const accentColor = accent || design.color || '#2563eb';

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 8);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 4)
      : ['Communication', 'Collaboration', 'Problem Solving', 'Execution'];

  const remainingSkills = visibleSkills.slice(4);

  const hasRecipient =
    hasValue(recipient.name) ||
    hasValue(recipient.title) ||
    hasValue(recipient.company) ||
    hasValue(recipient.address);

  const showSignature =
    hasValue(signature.closing) ||
    hasValue(profile.fullName) ||
    signature.enabled;

  const bodyDesign = {
    ...design,
    fontFamily:
      design.fontFamily ||
      '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.6, 11.1), 11.9),
    lineHeight: Math.min(Number(design.lineHeight) || 1.58, 1.46),
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-white text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
        '--template-accent': accentColor,
      }}
    >
      {/* HEADER */}
      <header
        className="relative overflow-hidden px-9 py-7 text-white"
        style={{
          background: `linear-gradient(135deg, ${accentColor} 0%, #0f172a 84%)`,
        }}
      >
        <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/10" />
        <div className="absolute bottom-0 right-20 h-20 w-44 rounded-t-[42px] bg-white/10" />

        <div className="relative z-10 grid grid-cols-[1fr_56mm] items-start gap-5">
          <div className="min-w-0">
            <div className="h-1.5 w-20 rounded-full bg-white/70" />

            <p className="mt-3 text-[9.5px] font-black uppercase tracking-[0.18em] text-white/72">
              Cover Letter
            </p>

            {hasValue(profile.fullName) && (
              <h1 className="mt-2 text-[33px] font-black leading-tight tracking-[-0.045em] text-white">
                {profile.fullName}
              </h1>
            )}

            {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
              <p className="mt-2 max-w-[118mm] text-[11px] font-semibold leading-4 text-white/82">
                {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
                  .filter((value) => hasValue(value))
                  .join(' · ')}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-2.5 text-[10px] font-semibold leading-4 text-white/86 backdrop-blur-sm">
            <p className="mb-2 text-[9px] font-black uppercase tracking-[0.18em] text-white/55">
              Contact
            </p>

            <ContactLines profile={profile} dark />
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-[48mm_1fr] gap-6 px-9 py-7">
        {/* LEFT SIDEBAR */}
        <aside>
          {/* DATE + RECIPIENT */}
          <section
            className="rounded-2xl border px-4 py-3"
            style={{
              borderColor: `${accentColor}22`,
              backgroundColor: `${accentColor}08`,
            }}
          >
            <div className="border-b border-slate-200 pb-3">
              <p className="mb-1.5 text-[9.5px] font-black uppercase tracking-[0.16em] text-slate-400">
                Date
              </p>

              <p className="text-[11.5px] font-bold leading-4 text-slate-800">
                {formattedDate}
              </p>
            </div>

            {hasRecipient && (
              <div className="pt-3">
                <p
                  className="mb-1.5 text-[9.5px] font-black uppercase tracking-[0.16em]"
                  style={{ color: accentColor }}
                >
                  Recipient
                </p>

                <div className="text-[11.5px] font-semibold leading-4 text-slate-700">
                  {hasValue(recipient.name) && (
                    <p className="font-black text-slate-950">
                      {recipient.name}
                    </p>
                  )}

                  {(hasValue(recipient.title) || hasValue(recipient.company)) && (
                    <p>
                      {[recipient.title, recipient.company]
                        .filter((value) => hasValue(value))
                        .join(', ')}
                    </p>
                  )}

                  {hasValue(recipient.address) && (
                    <p className="mt-1 text-slate-600">{recipient.address}</p>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* SUMMARY NOTE */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p
              className="text-[10px] font-black uppercase tracking-[0.18em]"
              style={{ color: accentColor }}
            >
              Candidate Profile
            </p>

            <p className="mt-2 text-[10.5px] font-semibold leading-4 text-slate-600">
              A clean and flexible cover letter format designed for clear
              communication, professional presentation, and easy reading.
            </p>
          </section>

          {/* FEATURED SKILLS */}
          {featuredSkills.length > 0 && (
            <section className="mt-6">
              <SidebarTitle accentColor={accentColor}>
                Key Strengths
              </SidebarTitle>

              <div className="mt-3 space-y-2.5">
                {featuredSkills.map((skill, index) => (
                  <div
                    key={`${skill}-${index}`}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm"
                  >
                    <p className="text-[8.5px] font-black uppercase tracking-[0.14em] text-slate-400">
                      Strength {index + 1}
                    </p>

                    <p className="mt-1 text-[11px] font-black leading-4 text-slate-800">
                      {skill}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ADDITIONAL SKILLS */}
          {remainingSkills.length > 0 && (
            <section className="mt-6">
              <SidebarTitle accentColor={accentColor}>
                Additional Skills
              </SidebarTitle>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {remainingSkills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-full border px-2.5 py-1 text-[9.5px] font-black leading-tight"
                    style={{
                      borderColor: `${accentColor}55`,
                      color: accentColor,
                      backgroundColor: `${accentColor}10`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* MAIN LETTER */}
        <main>
          <section className="mb-4 flex items-center justify-between gap-5 border-b border-slate-200 pb-3">
            <div>
              <p
                className="text-[10.5px] font-black uppercase tracking-[0.22em]"
                style={{ color: accentColor }}
              >
                Application Letter
              </p>

              {(hasValue(recipient.targetRole) || hasValue(recipient.company)) && (
                <p className="mt-1 text-[11px] font-semibold leading-4 text-slate-600">
                  {[recipient.targetRole, recipient.company]
                    .filter((value) => hasValue(value))
                    .join(' · ')}
                </p>
              )}
            </div>

            <div
              className="rounded-full px-4 py-2 text-[9.5px] font-black uppercase tracking-[0.14em]"
              style={{
                backgroundColor: `${accentColor}12`,
                color: accentColor,
              }}
            >
              Ready
            </div>
          </section>

          {/* BODY */}
          <section className="rounded-2xl border border-slate-100 bg-white px-6 py-5 shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
            <Body
              body={body}
              design={bodyDesign}
              onUpdateBody={onUpdateBody}
              className="
                text-left text-slate-800
                prose-p:my-2.5
                prose-p:font-medium
                prose-p:leading-relaxed
                prose-ul:my-2.5
                prose-li:my-1.5
                prose-strong:font-semibold
                prose-strong:text-[var(--template-accent)]
                [&>*:first-child]:mt-0
                [&>*:last-child]:mb-0
              "
            />
          </section>

          {/* SIGNATURE - NATURAL FLOW */}
          {showSignature && (
            <footer
              className="
                mt-7 border-t border-slate-200 pt-5
                text-slate-900
                [&>div]:mt-0
                [&_img]:h-12
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
        </main>
      </div>
    </div>
  );
};

const SidebarTitle = ({ children, accentColor }) => (
  <p
    className="text-[10px] font-black uppercase tracking-[0.2em]"
    style={{ color: accentColor }}
  >
    {children}
  </p>
);

export default BlueHeaderTemplate;
