import React from 'react';
import { Body, Signature } from './ProfessionalTemplateParts';

const DataScientistTemplate = ({
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

  const dataAccent = accent || design.color || '#6D28D9';
  const inkColor = '#0F172A';

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 6);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['Machine Learning', 'Predictive Modeling', 'Business Insight'];

  const remainingSkills = visibleSkills.slice(3);

  const contactItems = [
    profile.email,
    profile.phone,
    profile.address,
    profile.linkedinPortfolio,
  ].filter((value) => hasValue(value));

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
      className="mx-auto bg-[#F8FAFC] p-[4mm] shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
        color: inkColor,
        '--data-accent': dataAccent,
      }}
    >
      <div className="min-h-[289mm] overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">
        {/* HEADER */}
        <header
          className="relative overflow-hidden px-[7mm] py-[6mm] text-white"
          style={{
            background: `linear-gradient(135deg, ${dataAccent} 0%, #111827 76%)`,
          }}
        >
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10" />
          <div className="absolute bottom-0 right-12 h-14 w-32 rounded-t-[32px] bg-white/10" />

          <div className="relative z-10 grid grid-cols-[1fr_52mm] items-start gap-5">
            <div className="min-w-0">
              <div className="h-1.5 w-20 rounded-full bg-white/70" />

              <p className="mt-3 text-[9.2px] font-black uppercase tracking-[0.2em] text-white/70">
                Cover Letter
              </p>

              {hasValue(profile.fullName) && (
                <h1 className="mt-2 text-[29px] font-black leading-tight tracking-[-0.04em] text-white">
                  {profile.fullName}
                </h1>
              )}

              {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
                <p className="mt-2 max-w-[118mm] text-[11px] font-semibold leading-4 text-white/78">
                  {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
                    .filter((value) => hasValue(value))
                    .join(' · ')}
                </p>
              )}
            </div>

            {contactItems.length > 0 && (
              <div className="rounded-[14px] border border-white/15 bg-white/10 p-3 text-[9.5px] font-semibold leading-4 text-white/86 backdrop-blur-sm">
                {contactItems.map((item, index) => (
                  <p
                    key={`${item}-${index}`}
                    className="break-words [overflow-wrap:anywhere]"
                  >
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* KPI STRIP */}
        <section className="grid grid-cols-3 border-b border-slate-200">
          {featuredSkills.map((skill, index) => (
            <div
              key={`${skill}-${index}`}
              className="border-r border-slate-200 bg-slate-50 px-4 py-3 last:border-r-0"
            >
              <p
                className="text-[8px] font-black uppercase tracking-[0.14em]"
                style={{ color: dataAccent }}
              >
                Focus {index + 1}
              </p>

              <p className="mt-1.5 text-[10.5px] font-black leading-4 text-slate-800">
                {skill}
              </p>
            </div>
          ))}
        </section>

        {/* CONTENT */}
        <div className="grid grid-cols-[48mm_1fr] gap-5 px-[6mm] py-[6mm]">
          {/* LEFT SIDEBAR */}
          <aside>
            {/* DATE + RECIPIENT */}
            <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-[0_8px_22px_rgba(15,23,42,0.03)]">
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
                    style={{ color: dataAccent }}
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
                      <p className="mt-0.5 text-slate-600">{recipient.address}</p>
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* CORE SKILLS */}
            {featuredSkills.length > 0 && (
              <SidebarCard title="Modeling Strengths" className="mt-4">
                <div className="space-y-2.5">
                  {featuredSkills.map((skill, index) => (
                    <div key={`${skill}-${index}`}>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[10px] font-black leading-4 text-slate-800">
                          {skill}
                        </p>

                        <p className="text-[7.8px] font-black uppercase tracking-[0.12em] text-slate-400">
                          0{index + 1}
                        </p>
                      </div>

                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(94, 72 + index * 7)}%`,
                            backgroundColor: dataAccent,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SidebarCard>
            )}

            {/* ADDITIONAL SKILLS */}
            {remainingSkills.length > 0 && (
              <SidebarCard title="Technical Toolkit" className="mt-4">
                <div className="flex flex-wrap gap-1.5">
                  {remainingSkills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border px-2.5 py-1 text-[8.8px] font-black leading-tight"
                      style={{
                        borderColor: `${dataAccent}45`,
                        color: dataAccent,
                        backgroundColor: `${dataAccent}0D`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </SidebarCard>
            )}

            {/* ANALYTICAL FOCUS */}
            <SidebarCard title="Analytical Focus" className="mt-4">
              <div className="space-y-2">
                <InsightItem
                  title="Discover"
                  body="Find patterns, signals, and business context."
                  accentColor={dataAccent}
                />

                <InsightItem
                  title="Model"
                  body="Build practical and measurable analytical solutions."
                  accentColor={dataAccent}
                />

                <InsightItem
                  title="Communicate"
                  body="Translate findings into clear recommendations."
                  accentColor={dataAccent}
                />
              </div>
            </SidebarCard>
          </aside>

          {/* MAIN LETTER */}
          <main>
            <section className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <p
                  className="text-[9.2px] font-black uppercase tracking-[0.18em]"
                  style={{ color: dataAccent }}
                >
                  Application Narrative
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
                  backgroundColor: `${dataAccent}12`,
                  color: dataAccent,
                }}
              >
                Insight Driven
              </div>
            </section>

            {/* BODY */}
            <section className="rounded-[16px] border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.035)]">
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
                  prose-strong:text-[var(--data-accent)]
                  [&>*:first-child]:mt-0
                  [&>*:last-child]:mb-0
                "
              />
            </section>

            {/* DATA VALUE STRIP */}
            <section className="mt-4 grid grid-cols-3 gap-3">
              <ValuePillar
                title="Data"
                body="Strong foundations in quality and interpretation."
                accentColor={dataAccent}
              />

              <ValuePillar
                title="Models"
                body="Measurable, practical, and explainable solutions."
                accentColor={dataAccent}
              />

              <ValuePillar
                title="Impact"
                body="Connects analysis to decisions and outcomes."
                accentColor={dataAccent}
              />
            </section>

            {/* SIGNATURE */}
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
                  accent={dataAccent}
                />
              </footer>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const SidebarCard = ({ title, children, className = '' }) => (
  <section
    className={`rounded-xl border border-slate-200 bg-white p-3 shadow-[0_8px_22px_rgba(15,23,42,0.03)] ${className}`}
  >
    <p className="mb-2 text-[8.8px] font-black uppercase tracking-[0.16em] text-slate-500">
      {title}
    </p>

    {children}
  </section>
);

const InsightItem = ({ title, body, accentColor }) => (
  <div className="rounded-xl bg-slate-50 px-3 py-2.5">
    <p
      className="text-[8.8px] font-black uppercase tracking-[0.14em]"
      style={{ color: accentColor }}
    >
      {title}
    </p>

    <p className="mt-1.5 text-[9.5px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
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

export default DataScientistTemplate;