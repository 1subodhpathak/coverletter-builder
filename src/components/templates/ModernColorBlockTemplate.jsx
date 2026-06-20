import React from 'react';
import { Body, Signature } from './ProfessionalTemplateParts';

const ModernColorBlockTemplate = ({
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
    .slice(0, 8);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['Strategic Communication', 'Execution', 'Stakeholder Alignment'];

  const remainingSkills = visibleSkills.slice(3);

  const contactParts = [
    profile.address,
    profile.email,
    profile.phone,
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
    fontSize: Math.min(Math.max(Number(design.fontSize) || 12, 11.5), 12.5),
    lineHeight: Number(design.lineHeight) || 1.58,
  };

  const contentPadding = Math.min(
    Math.max(Number(design.margins) || 1.35, 1.2),
    1.65
  );

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id="cover-letter-preview"
      data-template="modern-block"
      className="mx-auto bg-white text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      {/* TOP COLOR BLOCK HEADER */}
      <header
        className="px-12 py-10 text-white"
        style={{ backgroundColor: accentColor }}
      >
        <div className="grid grid-cols-[1fr_72mm] items-start gap-8">
          <div>
            <p className="mb-3 text-[10.5px] font-black uppercase tracking-[0.22em] text-white/70">
              Cover Letter
            </p>

            {hasValue(profile.fullName) && (
              <h1 className="text-[38px] font-black leading-tight tracking-[-0.04em] text-white">
                {profile.fullName}
              </h1>
            )}

            {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
              <p className="mt-3 max-w-[115mm] text-[12.5px] font-semibold leading-5 text-white/80">
                {[profile.currentJobTitle, featuredSkills.join(' • ')]
                  .filter((value) => hasValue(value))
                  .join(' · ')}
              </p>
            )}
          </div>

          {contactParts.length > 0 && (
            <div className="text-right text-[11.5px] font-semibold leading-5 text-white/85">
              {contactParts.map((part, index) => (
                <p
                  key={`${part}-${index}`}
                  className="ml-auto max-w-full break-words [overflow-wrap:anywhere]"
                >
                  {part}
                </p>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-[58mm_1fr]">
        {/* LEFT COLUMN */}
        <aside className="modern-block-sidebar border-r border-slate-100 bg-slate-50 px-8 py-9">
          {/* COMPACT DATE + RECIPIENT */}
          <section className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <div className="border-b border-slate-200 pb-4">
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                Date
              </p>

              <p className="text-[12.5px] font-bold leading-5 text-slate-800">
                {formattedDate}
              </p>
            </div>

            {hasRecipient && (
              <div className="pt-4">
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
          </section>

          {/* FEATURED SKILLS */}
          {featuredSkills.length > 0 && (
            <section className="mt-8">
              <SidebarTitle accentColor={accentColor}>Core Strengths</SidebarTitle>

              <div className="mt-4 space-y-3">
                {featuredSkills.map((skill, index) => (
                  <div
                    key={`${skill}-${index}`}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                  >
                    <p className="text-[8.5px] font-black uppercase tracking-[0.14em] text-slate-400">
                      Strength {index + 1}
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
            <section className="mt-8">
              <SidebarTitle accentColor={accentColor}>Capabilities</SidebarTitle>

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

          {/* SMALL NOTE */}
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <p className="text-[10.5px] font-semibold leading-5 text-slate-600">
              A clean, modern layout designed for strong first impressions,
              easy scanning, and professional readability.
            </p>
          </section>
        </aside>

        {/* RIGHT COLUMN */}
        <main
          style={{
            padding: `${contentPadding}rem`,
          }}
        >
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
                prose-strong:text-slate-950
                [&>*:first-child]:mt-0
                [&>*:last-child]:mb-0
              "
            />
          </section>

          {/* VALUE PILLARS */}
          <section className="mt-7 grid grid-cols-3 gap-4">
            <ValuePillar
              title="Clarity"
              body="Keeps the message focused and easy to scan."
              accentColor={accentColor}
            />

            <ValuePillar
              title="Fit"
              body="Connects strengths directly to the role."
              accentColor={accentColor}
            />

            <ValuePillar
              title="Impact"
              body="Highlights value, outcomes, and confidence."
              accentColor={accentColor}
            />
          </section>

          {/* SIGNATURE - NATURAL FLOW */}
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
    </div>
  );
};

const SidebarTitle = ({ children, accentColor }) => (
  <p
    className="text-[10.5px] font-black uppercase tracking-[0.2em]"
    style={{ color: accentColor }}
  >
    {children}
  </p>
);

const ValuePillar = ({ title, body, accentColor }) => (
  <div
    className="rounded-2xl border px-4 py-3"
    style={{
      borderColor: `${accentColor}22`,
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

export default ModernColorBlockTemplate;
