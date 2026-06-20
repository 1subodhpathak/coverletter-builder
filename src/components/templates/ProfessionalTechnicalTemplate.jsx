import React from 'react';
import { Body, ContactLines, Signature } from './ProfessionalTemplateParts';

const ProfessionalTechnicalTemplate = ({
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
    .slice(0, 10);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 6)
      : [
          'System Design',
          'Cloud Platforms',
          'API Development',
          'Automation',
          'Data Engineering',
          'Problem Solving',
        ];

  const remainingSkills = visibleSkills.slice(6);

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
    fontSize: Math.min(Math.max(Number(design.fontSize) || 12, 11.5), 12.5),
    lineHeight: Number(design.lineHeight) || 1.58,
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto grid bg-white text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        gridTemplateColumns: '62mm 1fr',
        fontFamily: bodyDesign.fontFamily,
        '--technical-accent': accentColor,
      }}
    >
      {/* LEFT TECH PANEL */}
      <aside className="bg-slate-600 px-8 py-10 text-white">
        <p className="text-[10px] font-black uppercase tracking-[0.26em] text-white/45">
          Technical Candidate
        </p>

        {hasValue(profile.fullName) && (
          <h1 className="mt-4 text-[30px] font-black leading-tight tracking-[-0.04em] text-white">
            {profile.fullName}
          </h1>
        )}

        {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
          <p className="mt-4 text-[11px] font-black uppercase leading-5 tracking-[0.14em] text-white/62">
            {[profile.currentJobTitle, featuredSkills.slice(0, 2).join(' • ')]
              .filter((value) => hasValue(value))
              .join(' · ')}
          </p>
        )}

        <div
          className="mt-6 h-1.5 w-20 rounded-full"
          style={{ backgroundColor: accentColor }}
        />

        {hasContact && (
          <section className="mt-8">
            <SidebarTitle>Contact</SidebarTitle>

            <div className="mt-4 text-[11.5px] font-semibold leading-5 text-white/78 [&_p]:break-words">
              <ContactLines profile={profile} dark />
            </div>
          </section>
        )}

        {/* TECH STACK */}
        {featuredSkills.length > 0 && (
          <section className="mt-9">
            <SidebarTitle>Core Technical Skills</SidebarTitle>

            <div className="mt-4 space-y-2">
              {featuredSkills.map((skill, index) => (
                <div
                  key={`${skill}-${index}`}
                  className="rounded-xl border border-white/12 bg-white/8 px-3 py-2.5"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />

                    <p className="text-[10.8px] font-bold leading-4 text-white">
                      {skill}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {remainingSkills.length > 0 && (
          <section className="mt-9">
            <SidebarTitle>Additional Tools</SidebarTitle>

            <div className="mt-4 flex flex-wrap gap-2">
              {remainingSkills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[9.5px] font-black leading-tight text-white/90"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* TECH VALUE */}
        <section className="mt-9 rounded-2xl border border-white/12 bg-white/8 px-4 py-4">
          <SidebarTitle>Engineering Focus</SidebarTitle>

          <p className="mt-4 text-[11px] font-semibold leading-5 text-white/75">
            Building reliable systems, solving complex problems, and turning
            technical decisions into measurable business impact.
          </p>
        </section>
      </aside>

      {/* MAIN CONTENT */}
      <main className="px-[15mm] py-[14mm]">
        {/* TOP HEADER */}
        <header className="border-b border-slate-300 pb-5">
          <div className="flex items-start justify-between gap-8">
            <div>
              <p
                className="text-[10.5px] font-black uppercase tracking-[0.24em]"
                style={{ color: accentColor }}
              >
                Cover Letter
              </p>

              {(hasValue(recipient.targetRole) || hasValue(recipient.company)) && (
                <p className="mt-2 text-[12.5px] font-semibold leading-5 text-slate-600">
                  {[recipient.targetRole, recipient.company]
                    .filter((value) => hasValue(value))
                    .join(' · ')}
                </p>
              )}
            </div>

            <div className="rounded-full bg-slate-600 px-4 py-2 text-[9.5px] font-black uppercase tracking-[0.16em] text-white">
              Tech Focus
            </div>
          </div>
        </header>

        {/* DATE + RECIPIENT */}
        <section className="mt-6 grid grid-cols-[40mm_1fr] gap-8 border-b border-slate-200 pb-5">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Date
            </p>

            <p className="text-[12.5px] font-semibold leading-5 text-slate-800">
              {formattedDate}
            </p>
          </div>

          {hasRecipient && (
            <div>
              <p
                className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em]"
                style={{ color: accentColor }}
              >
                Recipient
              </p>

              <div className="text-[12.5px] font-semibold leading-5 text-slate-700">
                {hasValue(recipient.name) && (
                  <p className="font-bold text-slate-950">
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
                  <p className="text-slate-600">{recipient.address}</p>
                )}
              </div>
            </div>
          )}
        </section>

        {/* TECH IMPACT STRIP */}
        <section className="mt-6 grid grid-cols-3 gap-3">
          <TechPillar
            title="Build"
            body="Clean, scalable, production-ready systems."
            accentColor={accentColor}
          />

          <TechPillar
            title="Scale"
            body="Architecture that supports growth and reliability."
            accentColor={accentColor}
          />

          <TechPillar
            title="Improve"
            body="Better performance, automation, and delivery."
            accentColor={accentColor}
          />
        </section>

        {/* BODY */}
        <section className="mt-7">
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
              prose-strong:text-[var(--technical-accent)]
              [&>*:first-child]:mt-0
              [&>*:last-child]:mb-0
            "
          />
        </section>

        {/* SIGNATURE */}
        {showSignature && (
          <footer
            className="
              mt-8 border-t border-slate-200 pt-5
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
  );
};

const SidebarTitle = ({ children }) => (
  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/45">
    {children}
  </p>
);

const TechPillar = ({ title, body, accentColor }) => (
  <div
    className="rounded-2xl border px-4 py-3"
    style={{
      borderColor: `${accentColor}24`,
      backgroundColor: `${accentColor}08`,
    }}
  >
    <p
      className="text-[10px] font-black uppercase tracking-[0.16em]"
      style={{ color: accentColor }}
    >
      {title}
    </p>

    <p className="mt-2 text-[10.5px] font-semibold leading-5 text-slate-600">
      {body}
    </p>
  </div>
);

export default ProfessionalTechnicalTemplate;