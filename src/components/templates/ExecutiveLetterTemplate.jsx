import React from 'react';
import {
  Body,
  ContactLines,
  PhotoBlock,
  Signature,
} from './ProfessionalTemplateParts';

const ExecutiveLetterTemplate = ({
  body = '',
  design = {},
  profile = {},
  signature = {},
  recipient = {},
  skills = [],
  accent,
  config = {},
  onUpdateBody,
}) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const layout = config.layout || 'executive-default';
  const isStrategy = layout === 'executive-strategy-bar';
  const isTech = layout === 'executive-tech';
  const isOps = layout === 'executive-ops';

  const accentColor = accent || design.color || '#0f172a';

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 8);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 4)
      : ['Leadership', 'Strategy', 'Execution', 'Stakeholder Management'];

  const remainingSkills = visibleSkills.slice(4);

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

  const executiveLabel = isStrategy
    ? 'Strategic Leadership'
    : isTech
      ? 'Technology Leadership'
      : isOps
        ? 'Operational Leadership'
        : 'Executive Leadership';

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-white text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        padding: '12mm 14mm',
        fontFamily: bodyDesign.fontFamily,
        '--executive-accent': accentColor,
      }}
    >
      {/* HEADER */}
      <header className="border-b-2 border-slate-900 pb-5">
        <div className="grid grid-cols-[1fr_auto] items-start gap-6">
          <div>
            <p
              className="text-[10.5px] font-black uppercase tracking-[0.22em]"
              style={{ color: accentColor }}
            >
              {executiveLabel}
            </p>

            {hasValue(profile.fullName) && (
              <h1 className="mt-3 text-[34px] font-black leading-tight tracking-[-0.04em] text-slate-950">
                {profile.fullName}
              </h1>
            )}

            {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
              <p className="mt-3 max-w-[140mm] text-[12px] font-semibold leading-5 text-slate-600">
                {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
                  .filter((value) => hasValue(value))
                  .join(' · ')}
              </p>
            )}
          </div>

          {profile.showPhoto && (
            <PhotoBlock
              profile={profile}
              accent={accentColor}
              className="h-24 w-24 rounded-full border border-slate-200 object-cover shadow-md"
            />
          )}
        </div>

        {hasContact && (
          <div className="mt-4 border-t border-slate-200 pt-3 text-[11px] font-semibold leading-5 text-slate-600">
            <ContactLines profile={profile} />
          </div>
        )}
      </header>

      {/* DATE + RECIPIENT */}
      <section className="mt-6 grid grid-cols-[40mm_1fr] gap-6 border-b border-slate-200 pb-4">
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

      {/* MAIN LETTER */}
      <main className="mt-7">
        <div className="mb-5 flex items-center justify-between gap-6">
          <p
            className="text-[10.5px] font-black uppercase tracking-[0.22em]"
            style={{ color: accentColor }}
          >
            Executive Cover Letter
          </p>

          <div
            className="h-1.5 w-24 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
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
            prose-strong:text-[var(--executive-accent)]
            [&>*:first-child]:mt-0
            [&>*:last-child]:mb-0
          "
        />
      </main>

      {/* EXECUTIVE STRENGTHS */}
      {featuredSkills.length > 0 && (
        <section className="mt-8 border-y border-slate-200 py-4">
          <p
            className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em]"
            style={{ color: accentColor }}
          >
            Executive Strengths
          </p>

          <p className="text-[12.5px] font-semibold leading-6 text-slate-700">
            {[...featuredSkills, ...remainingSkills].join(' · ')}
          </p>
        </section>
      )}

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
    </div>
  );
};

export default ExecutiveLetterTemplate;
