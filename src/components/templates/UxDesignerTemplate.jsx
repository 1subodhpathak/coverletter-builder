import React from 'react';
import { Body, ContactLines, Signature } from './ProfessionalTemplateParts';

const UxDesignerTemplate = ({
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

  const accentColor = accent || design.color || '#7c3aed';

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 6);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['User Research', 'UI Design', 'Design Systems'];

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
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.0, 10.6), 11.4),
    lineHeight: Math.min(Number(design.lineHeight) || 1.48, 1.4),
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-slate-100 p-[2mm] text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
        '--uiux-accent': accentColor,
      }}
    >
      <div className="min-h-[293mm] overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">
        {/* TOP BAR */}
        <header className="border-b border-slate-200 px-5 py-3.5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span
                  className="ml-2 h-1.5 w-16 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
              </div>

              <p
                className="mt-2 text-[8.8px] font-black uppercase tracking-[0.16em]"
                style={{ color: accentColor }}
              >
                Cover Letter
              </p>

              {hasValue(profile.fullName) && (
                <h1 className="mt-2 text-[26px] font-black leading-tight tracking-[-0.04em] text-slate-950">
                  {profile.fullName}
                </h1>
              )}

              {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
                <p className="mt-1.5 max-w-[128mm] text-[10.2px] font-semibold leading-4 text-slate-600">
                  {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
                    .filter((value) => hasValue(value))
                    .join(' · ')}
                </p>
              )}
            </div>

            <div
              className="rounded-xl px-2.5 py-2 text-center"
              style={{
                backgroundColor: `${accentColor}10`,
                border: `1px solid ${accentColor}22`,
              }}
            >
              <p
                className="text-[8px] font-black uppercase tracking-[0.14em]"
                style={{ color: accentColor }}
              >
                Product Design
              </p>

              <p className="mt-1 text-[8.8px] font-bold text-slate-600">
                UI • UX • Systems
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-[43mm_1fr] gap-4 px-5 py-4">
          {/* LEFT DESIGN SYSTEM PANEL */}
          <aside>
            {/* CONTACT */}
            {hasContact && (
              <section className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                <SidebarTitle accentColor={accentColor}>Contact</SidebarTitle>

                <div className="mt-2.5 text-[9px] font-semibold leading-4 text-slate-600 [&_p]:break-words">
                  <ContactLines profile={profile} />
                </div>
              </section>
            )}

            {/* DATE + RECIPIENT */}
            <section className="mt-3.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm">
              <div className="border-b border-slate-200 pb-2.5">
                <p className="mb-1 text-[8px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Date
                </p>

                <p className="text-[10.2px] font-bold leading-4 text-slate-800">
                  {formattedDate}
                </p>
              </div>

              {hasRecipient && (
                <div className="pt-2.5">
                  <p
                    className="mb-1 text-[8px] font-black uppercase tracking-[0.14em]"
                    style={{ color: accentColor }}
                  >
                    Recipient
                  </p>

                  <div className="text-[9.8px] font-semibold leading-4 text-slate-700">
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
                      <p className="mt-0.5 text-slate-600">{recipient.address}</p>
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* UI/UX PROCESS */}
            <section className="mt-3.5">
              <SidebarTitle accentColor={accentColor}>Design Workflow</SidebarTitle>

              <div className="mt-2.5 space-y-1.5">
                <ProcessCard
                  number="01"
                  title="Research"
                  body="Understand users, pain points, and behavior."
                  accentColor={accentColor}
                />

                <ProcessCard
                  number="02"
                  title="Prototype"
                  body="Make ideas testable through interactive design."
                  accentColor={accentColor}
                />

                <ProcessCard
                  number="03"
                  title="Improve"
                  body="Refine through feedback and iteration."
                  accentColor={accentColor}
                />
              </div>
            </section>

            {/* SKILLS */}
            {featuredSkills.length > 0 && (
              <section className="mt-3.5">
                <SidebarTitle accentColor={accentColor}>UI/UX Strengths</SidebarTitle>

                <div className="mt-2.5 flex flex-wrap gap-1">
                  {featuredSkills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border px-2 py-1 text-[8px] font-black leading-tight"
                      style={{
                        borderColor: `${accentColor}45`,
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

            {remainingSkills.length > 0 && (
              <section className="mt-3.5">
                <SidebarTitle accentColor={accentColor}>Tools</SidebarTitle>

                <div className="mt-2.5 flex flex-wrap gap-1">
                  {remainingSkills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[8px] font-black leading-tight text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </aside>

          {/* MAIN UI/UX LETTER AREA */}
          <main>
            {/* DESIGN BRIEF */}
            <section className="mb-3 rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p
                    className="text-[8.6px] font-black uppercase tracking-[0.16em]"
                    style={{ color: accentColor }}
                  >
                    Design Brief
                  </p>

                  <h2 className="mt-1 text-[20px] font-black leading-tight tracking-[-0.035em] text-slate-950">
                    Clear, Usable, and Scalable Interfaces
                  </h2>

                  {(hasValue(recipient.targetRole) || hasValue(recipient.company)) && (
                    <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-600">
                      {[recipient.targetRole, recipient.company]
                        .filter((value) => hasValue(value))
                        .join(' · ')}
                    </p>
                  )}
                </div>

                <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-right shadow-sm">
                  <p className="text-[7.5px] font-black uppercase tracking-[0.12em] text-slate-400">
                    Focus
                  </p>

                  <p
                    className="mt-1 text-[9px] font-black"
                    style={{ color: accentColor }}
                  >
                    User First
                  </p>
                </div>
              </div>
            </section>

            {/* MINI UI CANVAS */}
            <section className="mb-3 grid grid-cols-3 gap-2">
              <MiniCanvas
                title="Research"
                lines={['Users', 'Pain Points']}
                accentColor={accentColor}
              />

              <MiniCanvas
                title="Interface"
                lines={['Layout', 'Components']}
                accentColor={accentColor}
              />

              <MiniCanvas
                title="Validation"
                lines={['Testing', 'Feedback']}
                accentColor={accentColor}
              />
            </section>

            {/* BODY */}
            <section className="rounded-[18px] border border-slate-100 bg-white px-4 py-3 shadow-[0_10px_26px_rgba(88,28,135,0.035)]">
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
                  prose-strong:text-[var(--uiux-accent)]
                  [&>*:first-child]:mt-0
                  [&>*:last-child]:mb-0
                "
              />
            </section>

            {/* DESIGN VALUE STRIP */}
            <section className="mt-4 grid grid-cols-3 gap-3">
              <ValuePillar
                title="Usability"
                body="Makes interfaces simple and intuitive."
                accentColor={accentColor}
              />

              <ValuePillar
                title="Systems"
                body="Uses patterns and components for scale."
                accentColor={accentColor}
              />

              <ValuePillar
                title="Impact"
                body="Connects design decisions to outcomes."
                accentColor={accentColor}
              />
            </section>

            {/* SIGNATURE */}
            {showSignature && (
              <footer
                className="
                  mt-4 border-t border-purple-100 pt-3
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

const ProcessCard = ({ number, title, body, accentColor }) => (
  <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
    <div className="flex items-center justify-between gap-2">
      <p
        className="text-[8.8px] font-black uppercase tracking-[0.14em]"
        style={{ color: accentColor }}
      >
        {title}
      </p>

      <p className="text-[8px] font-black text-slate-300">{number}</p>
    </div>

    <p className="mt-1.5 text-[9.3px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
  </div>
);

const MiniCanvas = ({ title, lines, accentColor }) => (
  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
    <div className="mb-2 flex items-center justify-between">
      <p
        className="text-[8.5px] font-black uppercase tracking-[0.14em]"
        style={{ color: accentColor }}
      >
        {title}
      </p>

      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: accentColor }}
      />
    </div>

    <div className="space-y-1.5">
      {lines.map((line, index) => (
        <div
          key={`${line}-${index}`}
          className="rounded-md bg-white px-2.5 py-1.5 text-[8.8px] font-bold text-slate-500"
        >
          {line}
        </div>
      ))}
    </div>
  </div>
);

const ValuePillar = ({ title, body, accentColor }) => (
  <div
    className="rounded-xl border px-3 py-2.5"
    style={{
      borderColor: `${accentColor}24`,
      backgroundColor: `${accentColor}08`,
    }}
  >
    <p
      className="text-[9px] font-black uppercase tracking-[0.14em]"
      style={{ color: accentColor }}
    >
      {title}
    </p>

    <p className="mt-1.5 text-[9.5px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
  </div>
);

export default UxDesignerTemplate;
