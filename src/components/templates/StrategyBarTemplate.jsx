import React from 'react';
import { Body, ContactLines, Signature } from './ProfessionalTemplateParts';

const StrategyBarTemplate = ({
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

  const accentColor = accent || design.color || '#0369a1';

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 6);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['Growth Strategy', 'Operational Scale', 'Stakeholder Alignment'];

  const remainingSkills = visibleSkills.slice(3);

  const hasRecipient =
    hasValue(recipient.name) ||
    hasValue(recipient.title) ||
    hasValue(recipient.company) ||
    hasValue(recipient.address);

  const hasContact =
    hasValue(profile.email) ||
    hasValue(profile.phone) ||
    hasValue(profile.address) ||
    hasValue(profile.linkedinPortfolio);

  const showSignature =
    hasValue(signature.closing) ||
    hasValue(profile.fullName) ||
    signature.enabled;

  const bodyDesign = {
    ...design,
    fontFamily:
      design.fontFamily ||
      '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.3, 10.9), 11.8),
    lineHeight: Number(design.lineHeight) || 1.48,
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const strategyFlow = [
    {
      label: 'Assess',
      text: 'Understand priorities, gaps, risks, and opportunities.',
    },
    {
      label: 'Align',
      text: 'Bring people, goals, and execution together.',
    },
    {
      label: 'Execute',
      text: 'Move strategy into measurable outcomes.',
    },
  ];

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-slate-100 p-[4mm] text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
        '--strategy-accent': accentColor,
      }}
    >
      <div className="min-h-[289mm] overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">
        {/* HEADER */}
        <header className="grid grid-cols-[1fr_54mm] border-b border-slate-200">
          <div className="px-7 py-5">
            <div
              className="h-1.5 w-20 rounded-full"
              style={{ backgroundColor: accentColor }}
            />

            <p
              className="mt-3 text-[9.2px] font-black uppercase tracking-[0.2em]"
              style={{ color: accentColor }}
            >
              Cover Letter
            </p>

            {hasValue(profile.fullName) && (
              <h1 className="mt-2 text-[29px] font-black leading-tight tracking-[-0.04em] text-slate-950">
                {profile.fullName}
              </h1>
            )}

            {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
              <p className="mt-2 max-w-[118mm] text-[11px] font-semibold leading-4 text-slate-600">
                {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
                  .filter((value) => hasValue(value))
                  .join(' · ')}
              </p>
            )}
          </div>

          {hasContact && (
            <div
              className="px-5 py-5 text-white"
              style={{
                background: `linear-gradient(160deg, ${accentColor} 0%, #0f172a 88%)`,
              }}
            >
              <p className="text-[8.8px] font-black uppercase tracking-[0.18em] text-white/60">
                Contact
              </p>

              <div className="mt-2 text-[9.8px] font-semibold leading-4 text-white/86 [&_p]:break-words">
                <ContactLines profile={profile} dark />
              </div>
            </div>
          )}
        </header>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-[50mm_1fr] gap-6 px-7 py-6">
          {/* LEFT SIDEBAR */}
          <aside>
            {/* DATE + RECIPIENT */}
            <section
              className="rounded-xl border px-4 py-3"
              style={{
                borderColor: `${accentColor}22`,
                backgroundColor: `${accentColor}08`,
              }}
            >
              <div className="border-b border-slate-200 pb-3">
                <p className="mb-1.5 text-[8.8px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Date
                </p>

                <p className="text-[11px] font-bold leading-4 text-slate-800">
                  {formattedDate}
                </p>
              </div>

              {hasRecipient && (
                <div className="pt-3">
                  <p
                    className="mb-1.5 text-[8.8px] font-black uppercase tracking-[0.16em]"
                    style={{ color: accentColor }}
                  >
                    Recipient
                  </p>

                  <div className="text-[10.5px] font-semibold leading-4 text-slate-700">
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
                      <p className="mt-0.5 text-slate-600">
                        {recipient.address}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* STRATEGY PROCESS */}
            <section className="mt-4">
              <SidebarTitle accentColor={accentColor}>
                Strategy Process
              </SidebarTitle>

              <div className="mt-3 space-y-2">
                {strategyFlow.map((item, index) => (
                  <ProcessItem
                    key={item.label}
                    number={index + 1}
                    label={item.label}
                    text={item.text}
                    accentColor={accentColor}
                  />
                ))}
              </div>
            </section>

            {/* KEY STRENGTHS */}
            {featuredSkills.length > 0 && (
              <section className="mt-4">
                <SidebarTitle accentColor={accentColor}>
                  Key Strengths
                </SidebarTitle>

                <div className="mt-3 space-y-2">
                  {featuredSkills.map((skill, index) => (
                    <div
                      key={`${skill}-${index}`}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm"
                    >
                      <p className="text-[7.8px] font-black uppercase tracking-[0.13em] text-slate-400">
                        Focus {index + 1}
                      </p>

                      <p className="mt-1 text-[10.2px] font-black leading-4 text-slate-800">
                        {skill}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ADDITIONAL SKILLS */}
            {remainingSkills.length > 0 && (
              <section className="mt-4">
                <SidebarTitle accentColor={accentColor}>
                  Additional Skills
                </SidebarTitle>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {remainingSkills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border px-2.5 py-1 text-[8.8px] font-black leading-tight"
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
            <section className="mb-4 flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
              <div>
                <p
                  className="text-[9.2px] font-black uppercase tracking-[0.18em]"
                  style={{ color: accentColor }}
                >
                  Strategic Narrative
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
                className="rounded-full px-3 py-1 text-[8px] font-black uppercase tracking-[0.12em]"
                style={{
                  backgroundColor: `${accentColor}12`,
                  color: accentColor,
                }}
              >
                Focused
              </div>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.035)]">
              <Body
                body={body}
                design={bodyDesign}
                onUpdateBody={onUpdateBody}
                className="
                  text-left text-slate-800
                  prose-p:my-1.5
                  prose-p:font-medium
                  prose-p:leading-snug
                  prose-ul:my-1.5
                  prose-li:my-0.5
                  prose-strong:font-semibold
                  prose-strong:text-[var(--strategy-accent)]
                  [&>*:first-child]:mt-0
                  [&>*:last-child]:mb-0
                "
              />
            </section>

            {showSignature && (
              <footer
                className="
                  mt-5 border-t border-slate-200 pt-4
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
          </main>
        </div>
      </div>
    </div>
  );
};

const SidebarTitle = ({ children, accentColor }) => (
  <p
    className="text-[8.8px] font-black uppercase tracking-[0.16em]"
    style={{ color: accentColor }}
  >
    {children}
  </p>
);

const ProcessItem = ({ number, label, text, accentColor }) => (
  <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
    <div className="flex items-center gap-2.5">
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-black text-white"
        style={{ backgroundColor: accentColor }}
      >
        {number}
      </span>

      <p className="text-[10.5px] font-black leading-4 text-slate-800">
        {label}
      </p>
    </div>

    <p className="mt-1.5 text-[9.3px] font-semibold leading-4 text-slate-600">
      {text}
    </p>
  </div>
);

export default StrategyBarTemplate;