import React from 'react';
import { Body, Signature } from './ProfessionalTemplateParts';

const BusinessAnalystTemplate = (props) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const accentColor = props.accent || design.color || '#2563eb';

  const visibleSkills = skills.filter((skill) => hasValue(skill)).slice(0, 6);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['Business Analysis', 'Stakeholder Alignment', 'Data Storytelling'];

  const remainingSkills = visibleSkills.slice(3);

  const contactParts = [
    profile.address,
    profile.phone,
    profile.email,
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
      className="mx-auto bg-white text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      {/* TOP ACCENT */}
      <div
        className="h-2.5"
        style={{ backgroundColor: accentColor }}
      />

      <div className="px-8 py-7">
        {/* HEADER */}
        <header className="border-b border-slate-200 pb-4">
          <p
            className="mb-2 text-[9.2px] font-black uppercase tracking-[0.2em]"
            style={{ color: accentColor }}
          >
            Cover Letter
          </p>

          {hasValue(profile.fullName) && (
            <h1 className="text-[29px] font-black leading-tight tracking-[-0.035em] text-slate-950">
              {profile.fullName}
            </h1>
          )}

          {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
            <p className="mt-2 max-w-[155mm] text-[11px] font-semibold leading-4 text-slate-600">
              {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
                .filter((value) => hasValue(value))
                .join(' · ')}
            </p>
          )}

          {contactParts.length > 0 && (
            <p className="mt-3 flex flex-wrap gap-x-2 gap-y-0.5 text-[10.5px] font-semibold leading-4 text-slate-600">
              {contactParts.map((part, index) => (
                <React.Fragment key={`${part}-${index}`}>
                  {index > 0 && <span className="text-slate-300">•</span>}
                  <span className="break-words">{part}</span>
                </React.Fragment>
              ))}
            </p>
          )}
        </header>

        {/* COMPACT DATE + RECIPIENT */}
        <section className="mt-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-slate-50 px-4 py-3">
          <div className="grid grid-cols-[34mm_1fr] gap-5">
            <div className="border-r border-blue-100 pr-4">
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

                <div className="text-[11px] font-semibold leading-4 text-slate-700">
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

        {/* CORE STRENGTHS */}
        <section className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p
                className="text-[9px] font-black uppercase tracking-[0.18em]"
                style={{ color: accentColor }}
              >
                Core Strengths
              </p>

              <p className="mt-1 text-[10.5px] font-semibold leading-4 text-slate-500">
                Business analysis, clarity, and execution.
              </p>
            </div>

            <div
              className="rounded-full px-2.5 py-1 text-[8.5px] font-black uppercase tracking-[0.1em] text-white"
              style={{ backgroundColor: accentColor }}
            >
              {featuredSkills.length} Selected
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {featuredSkills.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="rounded-xl border border-blue-100 bg-blue-50/75 px-3 py-3"
              >
                <p className="text-[8px] font-black uppercase tracking-[0.14em] text-blue-500">
                  Strength {index + 1}
                </p>

                <p className="mt-2 text-[12px] font-black leading-tight text-blue-950">
                  {item}
                </p>

                <div className="mt-3 h-1 w-10 rounded-full bg-blue-200" />
              </div>
            ))}
          </div>
        </section>

        {/* LETTER BODY */}
        <main className="mt-5 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.035)]">
          <Body
            body={props.body}
            design={bodyDesign}
            onUpdateBody={props.onUpdateBody}
            className="
              text-left text-slate-800
              prose-p:my-1.5
              prose-p:font-medium
              prose-p:leading-snug
              prose-ul:my-1.5
              prose-li:my-0.5
              prose-strong:font-semibold
              prose-strong:text-blue-800
              [&>*:first-child]:mt-0
              [&>*:last-child]:mb-0
            "
          />
        </main>

        {/* ADDITIONAL SKILLS */}
        {remainingSkills.length > 0 && (
          <section className="mt-5 border-y border-slate-200 py-3">
            <p
              className="mb-2 text-[9px] font-black uppercase tracking-[0.16em]"
              style={{ color: accentColor }}
            >
              Additional Business Capabilities
            </p>

            <div className="flex flex-wrap gap-1.5">
              {remainingSkills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-full border px-2.5 py-1 text-[9px] font-black leading-tight"
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

        {/* BA VALUE PILLARS */}
        <section className="mt-4 grid grid-cols-3 gap-3">
          <ValuePillar
            title="Discovery"
            body="Clarifies needs, pain points, and measurable outcomes."
          />

          <ValuePillar
            title="Alignment"
            body="Connects stakeholders, product teams, and priorities."
          />

          <ValuePillar
            title="Execution"
            body="Turns requirements into testable and usable solutions."
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
              accent={accentColor}
            />
          </footer>
        )}
      </div>
    </div>
  );
};

const ValuePillar = ({ title, body }) => (
  <div className="rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-2.5">
    <p className="text-[9px] font-black uppercase tracking-[0.14em] text-blue-700">
      {title}
    </p>

    <p className="mt-1.5 text-[9.5px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
  </div>
);

export default BusinessAnalystTemplate;