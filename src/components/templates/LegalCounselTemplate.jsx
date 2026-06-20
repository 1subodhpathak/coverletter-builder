import React from 'react';
import { Body, Signature } from './ProfessionalTemplateParts';

const LegalCounselTemplate = ({
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

  const accentColor = accent || design.color || '#172554';

  const contactParts = [
    profile.email,
    profile.phone,
    profile.address,
    profile.linkedinPortfolio,
  ].filter((value) => hasValue(value));

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 8);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 4)
      : [
          'Legal Research',
          'Contract Review',
          'Risk Assessment',
          'Regulatory Compliance',
        ];

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
      '"Aptos", "Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.8, 11.3), 12.2),
    lineHeight: Math.min(Number(design.lineHeight) || 1.62, 1.54),
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
      <div className="px-12 py-10">
        {/* HEADER */}
        <header
          className="border-y-4 py-7 text-center"
          style={{ borderColor: accentColor }}
        >
          <div
            className="mx-auto h-1 w-20 rounded-full"
            style={{ backgroundColor: accentColor }}
          />

          <p
            className="mt-4 text-[10.5px] font-black uppercase tracking-[0.24em]"
            style={{ color: accentColor }}
          >
            Cover Letter
          </p>

          {hasValue(profile.fullName) && (
            <h1 className="mt-3 text-[36px] font-black uppercase leading-tight tracking-[0.1em] text-slate-950">
              {profile.fullName}
            </h1>
          )}

          {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
            <p className="mx-auto mt-3 max-w-[145mm] text-[12px] font-semibold leading-5 text-slate-600">
              {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
                .filter((value) => hasValue(value))
                .join(' · ')}
            </p>
          )}

          {contactParts.length > 0 && (
            <p className="mx-auto mt-3 flex max-w-[165mm] flex-wrap justify-center gap-x-3 gap-y-1 text-[11.5px] font-semibold leading-5 text-slate-600">
              {contactParts.map((part, index) => (
                <React.Fragment key={`${part}-${index}`}>
                  {index > 0 && <span className="text-slate-300">•</span>}
                  <span className="break-words">{part}</span>
                </React.Fragment>
              ))}
            </p>
          )}
        </header>

        <div className="mt-7 grid grid-cols-[1fr_46mm] gap-8">
          {/* MAIN LETTER */}
          <main>
            {/* COMPACT DATE + RECIPIENT */}
            <section className="mb-7 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <div className="grid grid-cols-[36mm_1fr] gap-5">
                <div className="border-r border-slate-200 pr-5">
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
                  prose-strong:text-blue-950
                  [&>*:first-child]:mt-0
                  [&>*:last-child]:mb-0
                "
              />
            </section>

            {/* SIGNATURE - NATURAL FLOW */}
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

          {/* RIGHT LEGAL SIDEBAR */}
          <aside className="border-l border-slate-300 pl-7">
            <SidebarTitle accentColor={accentColor}>
              Legal Profile
            </SidebarTitle>

            <section className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <p
                className="text-[10px] font-black uppercase tracking-[0.18em]"
                style={{ color: accentColor }}
              >
                Practice Focus
              </p>

              <p className="mt-3 text-[11px] font-semibold leading-5 text-slate-600">
                Formal, precise, and risk-aware communication for legal,
                compliance, counsel, contract, and advisory roles.
              </p>
            </section>

            {/* FEATURED SKILLS */}
            {featuredSkills.length > 0 && (
              <section className="mt-7">
                <SidebarTitle accentColor={accentColor}>
                  Core Strengths
                </SidebarTitle>

                <div className="mt-4 space-y-3">
                  {featuredSkills.map((skill, index) => (
                    <div
                      key={`${skill}-${index}`}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                    >
                      <p className="text-[8.5px] font-black uppercase tracking-[0.14em] text-slate-400">
                        Matter {index + 1}
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

            {/* LEGAL VALUE POINTS */}
            <section className="mt-7 space-y-2.5">
              <LegalPoint title="Precision" accentColor={accentColor} />
              <LegalPoint title="Risk Control" accentColor={accentColor} />
              <LegalPoint title="Sound Judgment" accentColor={accentColor} />
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

const LegalPoint = ({ title, accentColor }) => (
  <div
    className="rounded-full border px-4 py-2 text-center text-[10px] font-black uppercase tracking-[0.16em]"
    style={{
      borderColor: `${accentColor}24`,
      backgroundColor: `${accentColor}08`,
      color: accentColor,
    }}
  >
    {title}
  </div>
);

export default LegalCounselTemplate;
