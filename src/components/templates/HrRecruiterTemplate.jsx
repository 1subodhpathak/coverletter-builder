import React from 'react';
import { Body, ContactLines, Signature } from './ProfessionalTemplateParts';

const HrRecruiterTemplate = ({
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

  const accentColor = accent || design.color || '#0f766e';

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 6);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['Talent Acquisition', 'Hiring Strategy', 'Candidate Experience'];

  const remainingSkills = visibleSkills.slice(3);

  const hasContact =
    hasValue(profile.address) ||
    hasValue(profile.phone) ||
    hasValue(profile.email) ||
    hasValue(profile.linkedinPortfolio);

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
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.1, 10.8), 11.6),
    lineHeight: Number(design.lineHeight) || 1.44,
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const hiringFlow = [
    {
      title: 'Attract',
      body: 'Build candidate interest and employer trust.',
    },
    {
      title: 'Assess',
      body: 'Screen clearly against role needs.',
    },
    {
      title: 'Engage',
      body: 'Create a positive hiring experience.',
    },
    {
      title: 'Hire',
      body: 'Support decisions, offers, and onboarding.',
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
        '--hr-accent': accentColor,
      }}
    >
      <div className="min-h-[289mm] overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">
        {/* HEADER */}
        <header className="grid grid-cols-[1fr_50mm] border-b border-slate-200">
          <div className="px-6 py-4">
            <div
              className="h-1.5 w-16 rounded-full"
              style={{ backgroundColor: accentColor }}
            />

            <p
              className="mt-2.5 text-[8.8px] font-black uppercase tracking-[0.18em]"
              style={{ color: accentColor }}
            >
              Cover Letter
            </p>

            {hasValue(profile.fullName) && (
              <h1 className="mt-1.5 text-[26px] font-black leading-tight tracking-[-0.04em] text-slate-950">
                {profile.fullName}
              </h1>
            )}

            {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
              <p className="mt-1.5 max-w-[118mm] text-[10.5px] font-semibold leading-4 text-slate-600">
                {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
                  .filter((value) => hasValue(value))
                  .join(' · ')}
              </p>
            )}
          </div>

          {hasContact && (
            <div
              className="px-4 py-4 text-white"
              style={{
                background: `linear-gradient(160deg, ${accentColor} 0%, #134e4a 86%)`,
              }}
            >
              <p className="text-[8px] font-black uppercase tracking-[0.16em] text-white/60">
                Contact
              </p>

              <div className="mt-2 text-[9px] font-semibold leading-4 text-white/86 [&_p]:break-words">
                <ContactLines profile={profile} dark />
              </div>
            </div>
          )}
        </header>

        <div className="grid grid-cols-[48mm_1fr] gap-5 px-6 py-5">
          {/* LEFT PEOPLE PANEL */}
          <aside>
            {/* DATE + RECIPIENT */}
            <section className="rounded-xl border border-teal-100 bg-teal-50/70 px-3 py-2.5">
              <div className="border-b border-teal-100 pb-2.5">
                <p className="mb-1 text-[8px] font-black uppercase tracking-[0.15em] text-slate-400">
                  Date
                </p>

                <p className="text-[10.2px] font-bold leading-4 text-slate-800">
                  {formattedDate}
                </p>
              </div>

              {hasRecipient && (
                <div className="pt-2.5">
                  <p
                    className="mb-1 text-[8px] font-black uppercase tracking-[0.15em]"
                    style={{ color: accentColor }}
                  >
                    Recipient
                  </p>

                  <div className="text-[10px] font-semibold leading-4 text-slate-700">
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

            {/* HIRING JOURNEY */}
            <section className="mt-3.5">
              <SidebarTitle accentColor={accentColor}>
                Hiring Journey
              </SidebarTitle>

              <div className="mt-2.5 space-y-1.5">
                {hiringFlow.map((step, index) => (
                  <JourneyStep
                    key={step.title}
                    index={index}
                    title={step.title}
                    body={step.body}
                    accentColor={accentColor}
                  />
                ))}
              </div>
            </section>

            {/* HR STRENGTHS */}
            {featuredSkills.length > 0 && (
              <section className="mt-3.5">
                <SidebarTitle accentColor={accentColor}>
                  HR Strengths
                </SidebarTitle>

                <div className="mt-2.5 space-y-1.5">
                  {featuredSkills.map((skill, index) => (
                    <div
                      key={`${skill}-${index}`}
                      className="rounded-xl border border-teal-100 bg-white px-3 py-2 shadow-sm"
                    >
                      <p className="text-[7.5px] font-black uppercase tracking-[0.13em] text-teal-400">
                        People Skill {index + 1}
                      </p>

                      <p className="mt-0.5 text-[10px] font-black leading-4 text-slate-800">
                        {skill}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ADDITIONAL SKILLS */}
            {remainingSkills.length > 0 && (
              <section className="mt-3.5">
                <SidebarTitle accentColor={accentColor}>
                  Capabilities
                </SidebarTitle>

                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {remainingSkills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border px-2 py-1 text-[8px] font-black leading-tight"
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
            {/* ROLE BRIEF */}
            <section className="mb-3 rounded-[16px] border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p
                    className="text-[8.8px] font-black uppercase tracking-[0.16em]"
                    style={{ color: accentColor }}
                  >
                    People & Talent Narrative
                  </p>

                  <h2 className="mt-1 text-[20px] font-black leading-tight tracking-[-0.035em] text-slate-950">
                    Building Better Hiring Experiences
                  </h2>

                  {(hasValue(recipient.targetRole) || hasValue(recipient.company)) && (
                    <p className="mt-1 text-[10.3px] font-semibold leading-4 text-slate-600">
                      {[recipient.targetRole, recipient.company]
                        .filter((value) => hasValue(value))
                        .join(' · ')}
                    </p>
                  )}
                </div>

                <div
                  className="rounded-full px-2.5 py-1 text-[7.6px] font-black uppercase tracking-[0.1em]"
                  style={{
                    backgroundColor: `${accentColor}12`,
                    color: accentColor,
                  }}
                >
                  People First
                </div>
              </div>
            </section>

            {/* BODY */}
            <section className="rounded-2xl border border-slate-100 bg-white px-4 py-3.5 shadow-[0_8px_22px_rgba(20,83,45,0.03)]">
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
                  prose-strong:text-[var(--hr-accent)]
                  [&>*:first-child]:mt-0
                  [&>*:last-child]:mb-0
                "
              />
            </section>

            {/* HR VALUE STRIP */}
            <section className="mt-3 grid grid-cols-3 gap-2.5">
              <ValuePillar
                title="Talent"
                body="Engages candidates with clarity."
                accentColor={accentColor}
              />

              <ValuePillar
                title="Culture"
                body="Supports trust and communication."
                accentColor={accentColor}
              />

              <ValuePillar
                title="Process"
                body="Improves workflows and decisions."
                accentColor={accentColor}
              />
            </section>

            {/* SIGNATURE */}
            {showSignature && (
              <footer
                className="
                  mt-4 border-t border-teal-100 pt-3.5
                  text-slate-900
                  [&>div]:mt-0
                  [&_img]:h-9
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
    className="text-[8.2px] font-black uppercase tracking-[0.15em]"
    style={{ color: accentColor }}
  >
    {children}
  </p>
);

const JourneyStep = ({ index, title, body, accentColor }) => (
  <div className="rounded-xl border border-teal-100 bg-white px-3 py-2 shadow-sm">
    <div className="flex items-center gap-2">
      <span
        className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full text-[7.5px] font-black text-white"
        style={{ backgroundColor: accentColor }}
      >
        {index + 1}
      </span>

      <p className="text-[10px] font-black leading-4 text-slate-800">
        {title}
      </p>
    </div>

    <p className="mt-1 text-[8.8px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
  </div>
);

const ValuePillar = ({ title, body, accentColor }) => (
  <div
    className="rounded-xl border px-2.5 py-2"
    style={{
      borderColor: `${accentColor}24`,
      backgroundColor: `${accentColor}08`,
    }}
  >
    <p
      className="text-[8.5px] font-black uppercase tracking-[0.13em]"
      style={{ color: accentColor }}
    >
      {title}
    </p>

    <p className="mt-1 text-[9px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
  </div>
);

export default HrRecruiterTemplate;