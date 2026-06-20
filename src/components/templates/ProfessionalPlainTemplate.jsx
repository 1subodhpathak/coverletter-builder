import React from 'react';
import { Body, ContactLines, Signature } from './ProfessionalTemplateParts';

const ProfessionalPlainTemplate = ({
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
    fontFamily: '"Arial", "Helvetica Neue", sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 12, 11.5), 12.5),
    lineHeight: Number(design.lineHeight) || 1.62,
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
        padding: '18mm 20mm',
        fontFamily: bodyDesign.fontFamily,
        '--plain-accent': accentColor,
      }}
    >
      {/* HEADER */}
      <header className="border-b border-slate-300 pb-5">
        {hasValue(profile.fullName) && (
          <h1 className="text-[30px] font-bold leading-tight text-slate-950">
            {profile.fullName}
          </h1>
        )}

        {(hasValue(profile.currentJobTitle) || visibleSkills.length > 0) && (
          <p className="mt-2 text-[12.5px] font-semibold leading-5 text-slate-600">
            {[profile.currentJobTitle, visibleSkills.slice(0, 3).join(' • ')]
              .filter((value) => hasValue(value))
              .join(' · ')}
          </p>
        )}

        {hasContact && (
          <div className="mt-3 text-[11.5px] font-medium leading-5 text-slate-600">
            <ContactLines profile={profile} />
          </div>
        )}
      </header>

      {/* DATE + RECIPIENT */}
      <section className="mt-7 grid grid-cols-[42mm_1fr] gap-8 border-b border-slate-200 pb-5">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Date
          </p>

          <p className="text-[12.5px] font-medium leading-5 text-slate-800">
            {formattedDate}
          </p>
        </div>

        {hasRecipient && (
          <div>
            <p
              className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em]"
              style={{ color: accentColor }}
            >
              Recipient
            </p>

            <div className="text-[12.5px] font-medium leading-5 text-slate-700">
              {hasValue(recipient.name) && (
                <p className="font-bold text-slate-950">{recipient.name}</p>
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

      {/* BODY */}
      <main className="mt-7">
        <Body
          body={body}
          design={bodyDesign}
          onUpdateBody={onUpdateBody}
          className="
            text-left text-slate-800
            prose-p:my-2.5
            prose-p:font-normal
            prose-p:leading-relaxed
            prose-ul:my-2.5
            prose-li:my-1.5
            prose-strong:font-bold
            prose-strong:text-[var(--plain-accent)]
            [&>*:first-child]:mt-0
            [&>*:last-child]:mb-0
          "
        />
      </main>

      {/* SKILLS */}
      {visibleSkills.length > 0 && (
        <section className="mt-8 border-y border-slate-200 py-4">
          <p
            className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em]"
            style={{ color: accentColor }}
          >
            Relevant Skills
          </p>

          <p className="text-[12.5px] font-medium leading-6 text-slate-700">
            {visibleSkills.join(' · ')}
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

export default ProfessionalPlainTemplate;