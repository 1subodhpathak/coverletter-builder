import React from 'react';
import { Body, Signature } from './ProfessionalTemplateParts';

const TimelineTemplate = ({
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

  const accentColor = accent || design.color || '#38bdf8';
  const sidebarColor = '#0f172a';

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 6);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['Strategic Thinking', 'Execution', 'Stakeholder Alignment'];

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

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-white text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      <div
        className="grid min-h-[297mm]"
        style={{ gridTemplateColumns: '56mm 1fr' }}
      >
        {/* LEFT SIDEBAR */}
        <aside
          className="px-5 py-6 text-white"
          style={{ backgroundColor: sidebarColor }}
        >
          {/* CANDIDATE */}
          <section>
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">
              Candidate
            </p>

            {hasValue(profile.fullName) && (
              <h1 className="mt-2.5 text-[24px] font-black leading-tight tracking-[-0.035em] text-white">
                {profile.fullName}
              </h1>
            )}

            {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
              <p className="mt-3 text-[9.5px] font-black uppercase leading-4 tracking-[0.12em] text-slate-400">
                {[profile.currentJobTitle, featuredSkills.slice(0, 2).join(' • ')]
                  .filter((value) => hasValue(value))
                  .join(' · ')}
              </p>
            )}
          </section>

          <div
            className="my-5 h-1.5 w-16 rounded-full"
            style={{ backgroundColor: accentColor }}
          />

          {/* CONTACT */}
          {hasContact && (
            <section>
              <SidebarTitle>Contact</SidebarTitle>

              <div className="mt-3 space-y-2.5 text-[9.8px] font-semibold leading-4 text-slate-300">
                <Contact label="Email" value={profile.email} />
                <Contact label="Phone" value={profile.phone} />
                <Contact label="Location" value={profile.address} />
                <Contact
                  label="LinkedIn / Portfolio"
                  value={profile.linkedinPortfolio}
                />
              </div>
            </section>
          )}

          {/* CAREER MOMENTUM */}
          <section className="mt-6">
            <SidebarTitle>Career Momentum</SidebarTitle>

            <div className="mt-3 space-y-2">
              <MomentumItem
                title="Past"
                body="Relevant experience and proven direction."
                accentColor={accentColor}
              />

              <MomentumItem
                title="Present"
                body="Clear fit for the role and team context."
                accentColor={accentColor}
              />

              <MomentumItem
                title="Future"
                body="Practical impact and measurable contribution."
                accentColor={accentColor}
              />
            </div>
          </section>

          {/* STRENGTHS */}
          {featuredSkills.length > 0 && (
            <section className="mt-6">
              <SidebarTitle>Strengths</SidebarTitle>

              <div className="mt-3 space-y-2">
                {featuredSkills.map((skill, index) => (
                  <div
                    key={`${skill}-${index}`}
                    className="rounded-xl border border-white/10 bg-white/8 px-3 py-2.5"
                  >
                    <p className="text-[7.8px] font-black uppercase tracking-[0.13em] text-slate-500">
                      Step {index + 1}
                    </p>

                    <p className="mt-1 text-[10.2px] font-black leading-4 text-white">
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
              <SidebarTitle>Capabilities</SidebarTitle>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {remainingSkills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[8.5px] font-black leading-tight text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* MAIN CONTENT */}
        <main className="px-7 py-6">
          {/* TOP HEADER */}
          <header className="border-b border-slate-200 pb-4">
            <p
              className="text-[9.2px] font-black uppercase tracking-[0.2em]"
              style={{ color: accentColor }}
            >
              Cover Letter
            </p>

            {(hasValue(recipient.targetRole) || hasValue(recipient.company)) && (
              <h2 className="mt-1.5 text-[24px] font-black leading-tight tracking-[-0.035em] text-slate-950">
                {[recipient.targetRole, recipient.company]
                  .filter((value) => hasValue(value))
                  .join(' · ')}
              </h2>
            )}

            {(hasValue(recipient.name) || hasValue(recipient.title)) && (
              <p className="mt-1.5 text-[11px] font-semibold leading-4 text-slate-500">
                {[recipient.name, recipient.title]
                  .filter((value) => hasValue(value))
                  .join(' · ')}
              </p>
            )}
          </header>

          {/* DATE + RECIPIENT */}
          <section className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="grid grid-cols-[34mm_1fr] gap-5">
              <div className="border-r border-slate-200 pr-4">
                <p className="mb-1.5 text-[8.8px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Date
                </p>

                <p className="text-[11px] font-bold leading-4 text-slate-800">
                  {formattedDate}
                </p>
              </div>

              {hasRecipient && (
                <div>
                  <p
                    className="mb-1.5 text-[8.8px] font-black uppercase tracking-[0.16em]"
                    style={{ color: accentColor }}
                  >
                    Recipient
                  </p>

                  <div className="text-[10.8px] font-semibold leading-4 text-slate-700">
                    {hasValue(recipient.name) && (
                      <p className="font-black text-slate-950">
                        {recipient.name}
                      </p>
                    )}

                    {(hasValue(recipient.title) ||
                      hasValue(recipient.company)) && (
                      <p>
                        {[recipient.title, recipient.company]
                          .filter((value) => hasValue(value))
                          .join(', ')}
                      </p>
                    )}

                    {hasValue(recipient.address) && (
                      <p className="text-slate-600">{recipient.address}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* TIMELINE BODY */}
          <section className="mt-5">
            <div className="relative">
              <div className="absolute bottom-0 left-[8px] top-0 w-px bg-slate-200" />

              <TimelineLabel color={accentColor} label="Application Narrative" />

              <div className="ml-7 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.035)]">
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
                    prose-strong:text-slate-950
                    [&>*:first-child]:mt-0
                    [&>*:last-child]:mb-0
                  "
                />
              </div>
            </div>
          </section>

          {/* TIMELINE CLOSING MARKER */}
          {showSignature && (
            <section className="mt-5">
              <div className="relative">
                <div className="absolute bottom-0 left-[8px] top-0 w-px bg-slate-200" />

                <TimelineLabel color={accentColor} label="Closing" />

                <footer
                  className="
                    ml-7 rounded-2xl border border-slate-100 bg-white px-4 py-4
                    text-slate-900 shadow-[0_10px_26px_rgba(15,23,42,0.035)]
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
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

const SidebarTitle = ({ children }) => (
  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">
    {children}
  </p>
);

const Contact = ({ label, value }) =>
  value ? (
    <div>
      <p className="text-[7.8px] font-black uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>

      <p className="mt-0.5 break-words font-semibold text-slate-300">
        {value}
      </p>
    </div>
  ) : null;

const TimelineLabel = ({ color, label }) => (
  <div className="mb-3 flex items-center gap-2.5">
    <span
      className="relative z-10 h-4 w-4 rounded-full border-[3px] border-white shadow-sm"
      style={{ backgroundColor: color }}
    />

    <span className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
      {label}
    </span>
  </div>
);

const MomentumItem = ({ title, body, accentColor }) => (
  <div className="rounded-xl border border-white/10 bg-white/8 px-3 py-2.5">
    <p
      className="text-[8.8px] font-black uppercase tracking-[0.14em]"
      style={{ color: accentColor }}
    >
      {title}
    </p>

    <p className="mt-1.5 text-[9.5px] font-semibold leading-4 text-slate-300">
      {body}
    </p>
  </div>
);

export default TimelineTemplate;