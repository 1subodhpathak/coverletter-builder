import React from 'react';
import { Body, Signature } from './ProfessionalTemplateParts';

const ArtisticTemplate = ({
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

  const accentColor = accent || design.color || '#b45309';
  const inkColor = '#1f2937';

  const contactParts = [
    profile.phone,
    profile.address,
    profile.email,
    profile.linkedinPortfolio,
  ].filter((value) => hasValue(value));

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 7);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['Creative Thinking', 'Clear Communication', 'Purposeful Execution'];

  const remainingSkills = visibleSkills.slice(3);

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
    lineHeight: Math.min(Number(design.lineHeight) || 1.6, 1.54),
  };

  const pagePadding = Math.min(
    Math.max(Number(design.margins) || 1.35, 1.15),
    1.6
  );

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id="cover-letter-preview"
      className="relative mx-auto overflow-hidden bg-[#fdf6e3] text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
        color: inkColor,
      }}
    >
      {/* SOFT ARTISTIC BACKGROUND */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-20"
        style={{ backgroundColor: accentColor }}
      />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-amber-200/45" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(#92400e_1px,transparent_1px),linear-gradient(90deg,#92400e_1px,transparent_1px)] [background-size:14mm_14mm]" />

      <div
        className="relative z-10"
        style={{
          padding: `${pagePadding}rem`,
        }}
      >
        {/* HEADER */}
        <header className="text-center">
          <p
            className="mb-3 text-[10.5px] font-black uppercase tracking-[0.26em]"
            style={{ color: accentColor }}
          >
            Cover Letter
          </p>

          {hasValue(profile.fullName) && (
            <h1
              className="text-[42px] font-black leading-tight tracking-[-0.04em]"
              style={{ color: accentColor }}
            >
              {profile.fullName}
            </h1>
          )}

          {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
            <p className="mx-auto mt-3 max-w-[145mm] text-[12px] font-semibold leading-5 text-slate-600">
              {[profile.currentJobTitle, featuredSkills.join(' • ')]
                .filter((value) => hasValue(value))
                .join(' · ')}
            </p>
          )}

          {contactParts.length > 0 && (
            <div className="mx-auto mt-4 max-w-[165mm] border-y border-amber-900/20 py-2.5">
              <p className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[12px] font-semibold leading-5 text-slate-600">
                {contactParts.map((part, index) => (
                  <React.Fragment key={`${part}-${index}`}>
                    {index > 0 && <span className="text-amber-900/30">•</span>}
                    <span className="break-words">{part}</span>
                  </React.Fragment>
                ))}
              </p>
            </div>
          )}
        </header>

        {/* COMPACT DATE + RECIPIENT */}
        <section
          className="mt-7 rounded-[24px] border bg-white/70 px-4 py-3 shadow-[0_12px_32px_rgba(120,53,15,0.08)] backdrop-blur-sm"
          style={{ borderColor: `${accentColor}22` }}
        >
          <div className="grid grid-cols-[38mm_1fr] gap-5">
            <div className="border-r border-amber-900/15 pr-5">
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                Date
              </p>

              <p className="text-[12.5px] font-bold leading-5 text-slate-800">
                {formattedDate}
              </p>
            </div>

            {hasRecipient && (
              <div>
                <p
                  className="mb-2 text-[10px] font-black uppercase tracking-[0.18em]"
                  style={{ color: accentColor }}
                >
                  Recipient
                </p>

                <div className="text-[12.5px] font-semibold leading-5 text-slate-700">
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
                    <p className="text-slate-600">{recipient.address}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* MAIN CONTENT GRID */}
        <div className="mt-7 grid grid-cols-[1fr_46mm] gap-6">
          {/* BODY */}
          <main>
            <section className="rounded-[26px] border border-amber-900/10 bg-white/78 px-6 py-5 shadow-[0_16px_42px_rgba(120,53,15,0.08)] backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3 border-b border-amber-900/10 pb-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Letter
                </p>
              </div>

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
                  prose-strong:text-amber-800
                  [&>*:first-child]:mt-0
                  [&>*:last-child]:mb-0
                "
              />
            </section>

            {/* SIGNATURE - NATURAL FLOW */}
            {showSignature && (
              <footer
                className="
                  mt-6 border-t border-amber-900/15 pt-4
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
          <aside>
            {/* FEATURED SKILLS */}
            {featuredSkills.length > 0 && (
              <section>
                <SidebarTitle accentColor={accentColor}>
                  Creative Focus
                </SidebarTitle>

                <div className="mt-4 space-y-3">
                  {featuredSkills.map((skill, index) => (
                    <div
                      key={`${skill}-${index}`}
                      className="rounded-[20px] border border-amber-900/10 bg-white/75 px-4 py-3 shadow-sm backdrop-blur-sm"
                    >
                      <p className="text-[8.5px] font-black uppercase tracking-[0.14em] text-slate-400">
                        Note {index + 1}
                      </p>

                      <p className="mt-1 text-[11.5px] font-black leading-5 text-slate-800">
                        {skill}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ADDITIONAL SKILLS */}
            {remainingSkills.length > 0 && (
              <section className="mt-7">
                <SidebarTitle accentColor={accentColor}>
                  Capabilities
                </SidebarTitle>

                <div className="mt-4 flex flex-wrap gap-2">
                  {remainingSkills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border px-3 py-1.5 text-[10px] font-black leading-tight"
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

            {/* ARTISTIC VALUE CARD */}
            <section className="mt-7 rounded-[22px] border border-amber-900/10 bg-white/75 px-4 py-3 shadow-sm backdrop-blur-sm">
              <p
                className="text-[10px] font-black uppercase tracking-[0.18em]"
                style={{ color: accentColor }}
              >
                Approach
              </p>

              <p className="mt-3 text-[11px] font-semibold leading-5 text-slate-600">
                A warm and expressive layout that balances personality,
                clarity, and professional credibility.
              </p>
            </section>

            {/* MINI VALUE STRIP */}
            <section className="mt-6 space-y-3">
              <MiniPillar title="Clarity" />
              <MiniPillar title="Craft" />
              <MiniPillar title="Impact" />
            </section>
          </aside>
        </div>
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

const MiniPillar = ({ title }) => (
  <div className="rounded-full border border-amber-900/10 bg-white/65 px-4 py-2 text-center text-[10px] font-black uppercase tracking-[0.16em] text-slate-600">
    {title}
  </div>
);

export default ArtisticTemplate;
