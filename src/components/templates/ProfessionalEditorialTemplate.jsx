import React from 'react';
import { Body, ContactLines, Signature } from './ProfessionalTemplateParts';

const ProfessionalEditorialTemplate = ({
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

  const accentColor = accent || design.color || '#111827';

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 8);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills
      : ['Communication', 'Creative Thinking', 'Execution'];

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
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.8, 11.3), 12.2),
    lineHeight: Math.min(Number(design.lineHeight) || 1.58, 1.52),
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
        '--editorial-accent': accentColor,
      }}
    >
      <div className="grid min-h-[297mm] grid-cols-[1fr_64mm]">
        {/* MAIN CONTENT */}
        <main className="px-[13mm] py-[12mm]">
          {/* HEADER */}
          <header className="border-b border-slate-900 pb-5">
            <p
              className="text-[48px] font-black leading-none tracking-[-0.08em]"
              style={{ color: accentColor }}
            >
              CL
            </p>

            <p className="mt-5 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">
              Professional Cover Letter
            </p>

            {hasValue(profile.fullName) && (
              <h1 className="mt-3 text-[36px] font-black leading-tight tracking-[-0.045em] text-slate-950">
                {profile.fullName}
              </h1>
            )}

            {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
              <p className="mt-3 max-w-[120mm] text-[12.5px] font-semibold leading-5 text-slate-600">
                {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
                  .filter((value) => hasValue(value))
                  .join(' · ')}
              </p>
            )}

            {hasContact && (
              <div className="mt-4 text-[11.5px] font-semibold leading-5 text-slate-600">
                <ContactLines profile={profile} />
              </div>
            )}
          </header>

          {/* BODY */}
          <section className="mt-7">
            <p
              className="mb-4 text-[10.5px] font-black uppercase tracking-[0.2em]"
              style={{ color: accentColor }}
            >
              Application Letter
            </p>

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
                prose-strong:text-[var(--editorial-accent)]
                [&>*:first-child]:mt-0
                [&>*:last-child]:mb-0
              "
            />
          </section>

          {/* SIGNATURE */}
          {showSignature && (
            <footer
              className="
                mt-6 border-t border-slate-200 pt-4
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

        {/* RIGHT SIDEBAR */}
        <aside
          className="px-7 py-[12mm] text-white"
          style={{ backgroundColor: accentColor }}
        >
          <section>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/55">
              Date
            </p>

            <p className="mt-2 text-[12.5px] font-semibold leading-5 text-white/90">
              {formattedDate}
            </p>
          </section>

          {hasRecipient && (
            <section className="mt-7 border-t border-white/20 pt-5">
              <SidebarTitle>For</SidebarTitle>

              <div className="mt-4 text-[12.5px] font-semibold leading-5 text-white/88">
                {hasValue(recipient.name) && (
                  <p className="font-black text-white">{recipient.name}</p>
                )}

                {(hasValue(recipient.title) || hasValue(recipient.company)) && (
                  <p>
                    {[recipient.title, recipient.company]
                      .filter((value) => hasValue(value))
                      .join(', ')}
                  </p>
                )}

                {hasValue(recipient.address) && (
                  <p className="mt-1 text-white/70">{recipient.address}</p>
                )}
              </div>
            </section>
          )}

          {hasValue(recipient.company) && (
            <section className="mt-7 border-t border-white/20 pt-5">
              <SidebarTitle>Company</SidebarTitle>

              <p className="mt-3 text-[24px] font-black leading-tight tracking-[-0.035em] text-white">
                {recipient.company}
              </p>
            </section>
          )}

          {featuredSkills.length > 0 && (
            <section className="mt-7 border-t border-white/20 pt-5">
              <SidebarTitle>Key Strengths</SidebarTitle>

              <div className="mt-4 flex flex-wrap gap-2">
                {featuredSkills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-black leading-tight text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {hasContact && (
            <section className="mt-7 border-t border-white/20 pt-5">
              <SidebarTitle>Contact</SidebarTitle>

              <div className="mt-4 text-[11.5px] font-semibold leading-5 text-white/78 [&_p]:break-words">
                <ContactLines profile={profile} dark />
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
};

const SidebarTitle = ({ children }) => (
  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/55">
    {children}
  </p>
);

export default ProfessionalEditorialTemplate;
