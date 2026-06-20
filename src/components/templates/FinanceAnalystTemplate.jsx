import React from 'react';
import { Body, ContactLines, Signature } from './ProfessionalTemplateParts';

const FinanceAnalystTemplate = ({
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

  const accentColor = accent || design.color || '#047857';

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 8);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 4)
      : ['Revenue Analysis', 'Margin Management', 'Forecasting', 'Risk Review'];

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
      }}
    >
      <div className="px-8 py-7">
        {/* HEADER */}
        <header
          className="grid grid-cols-[1fr_48mm] gap-5 border-b-4 pb-5"
          style={{ borderColor: accentColor }}
        >
          <div>
            <div
              className="h-1.5 w-20 rounded-full"
              style={{ backgroundColor: accentColor }}
            />

            <p
              className="mt-4 text-[9.5px] font-black uppercase tracking-[0.18em]"
              style={{ color: accentColor }}
            >
              Cover Letter
            </p>

            {hasValue(profile.fullName) && (
              <h1 className="mt-2 text-[34px] font-black leading-tight tracking-[-0.04em] text-slate-950">
                {profile.fullName}
              </h1>
            )}

            {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
              <p className="mt-2 max-w-[120mm] text-[11.5px] font-semibold leading-4 text-slate-600">
                {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
                  .filter((value) => hasValue(value))
                  .join(' · ')}
              </p>
            )}
          </div>

          <div className="text-[10.5px] font-semibold leading-4 text-slate-600">
            <ContactLines profile={profile} />
          </div>
        </header>

        {/* FINANCE KPI STRIP */}
        <section className="my-6 grid grid-cols-4 overflow-hidden rounded-2xl border border-slate-200 text-center shadow-sm">
          {featuredSkills.map((skill, index) => (
            <div
              key={`${skill}-${index}`}
              className="border-r border-slate-200 bg-slate-50 px-3 py-3 last:border-r-0"
            >
              <p
                className="text-[8.5px] font-black uppercase tracking-[0.16em]"
                style={{ color: accentColor }}
              >
                Focus {index + 1}
              </p>

              <p className="mt-1.5 text-[10.5px] font-black leading-4 text-slate-700">
                {skill}
              </p>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-[44mm_1fr] gap-6">
          {/* LEFT FINANCE SIDEBAR */}
          <aside>
            {/* DATE + RECIPIENT */}
            <section className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
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

            {/* ANALYST PROFILE */}
            <section className="mt-6 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
              <p
                className="text-[10px] font-black uppercase tracking-[0.18em]"
                style={{ color: accentColor }}
              >
                Analyst Profile
              </p>

              <p className="mt-2 text-[10px] font-semibold leading-4 text-slate-600">
                Structured finance communication focused on numbers, risk,
                performance, planning, and business decision support.
              </p>
            </section>

            {/* ADDITIONAL SKILLS */}
            {remainingSkills.length > 0 && (
              <section className="mt-6">
                <SidebarTitle accentColor={accentColor}>
                  Capabilities
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

            {/* FINANCE VALUE POINTS */}
            <section className="mt-6 space-y-2">
              <FinancePoint title="Accuracy" accentColor={accentColor} />
              <FinancePoint title="Forecasting" accentColor={accentColor} />
              <FinancePoint title="Business Insight" accentColor={accentColor} />
            </section>
          </aside>

          {/* MAIN LETTER */}
          <main>
            <section className="mb-4 flex items-center gap-2.5 border-b border-slate-200 pb-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: accentColor }}
              />

              <p
                className="text-[10.5px] font-black uppercase tracking-[0.22em]"
                style={{ color: accentColor }}
              >
                Financial Narrative
              </p>
            </section>

            {/* BODY */}
            <section className="rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
              <Body
                body={body}
                design={bodyDesign}
                onUpdateBody={onUpdateBody}
                className="
                  text-left text-slate-800
                  prose-p:my-2
                  prose-p:font-medium
                  prose-p:leading-relaxed
                  prose-ul:my-2
                  prose-li:my-1
                  prose-strong:font-semibold
                  prose-strong:text-emerald-800
                  [&>*:first-child]:mt-0
                  [&>*:last-child]:mb-0
                "
              />
            </section>

            {/* VALUE STRIP */}
            <section className="mt-6 grid grid-cols-3 gap-3">
              <ValuePillar
                title="Analyze"
                body="Turns data into clear financial understanding."
                accentColor={accentColor}
              />

              <ValuePillar
                title="Forecast"
                body="Supports planning with structured assumptions."
                accentColor={accentColor}
              />

              <ValuePillar
                title="Advise"
                body="Connects financial insight to business action."
                accentColor={accentColor}
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

const FinancePoint = ({ title, accentColor }) => (
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

const ValuePillar = ({ title, body, accentColor }) => (
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

    <p className="mt-2 text-[11px] font-semibold leading-5 text-slate-600">
      {body}
    </p>
  </div>
);

export default FinanceAnalystTemplate;
