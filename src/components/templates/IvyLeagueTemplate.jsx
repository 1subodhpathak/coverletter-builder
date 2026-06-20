import React from 'react';
import { Body, Signature, getProfilePhoto } from './ProfessionalTemplateParts';

const IvyLeagueTemplate = ({
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

  const accentColor = accent || design.color || '#1e293b';
  const photo = getProfilePhoto(profile);

  const contactParts = [
    profile.email,
    profile.phone,
    profile.address,
    profile.linkedinPortfolio,
  ].filter((value) => hasValue(value));

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 6);

  const hasRecipient =
    hasValue(recipient.name) ||
    hasValue(recipient.title) ||
    hasValue(recipient.company) ||
    hasValue(recipient.address);

  const showSignature =
    hasValue(signature.closing) ||
    hasValue(profile.fullName) ||
    signature.enabled;

  const pagePadding = (() => {
    const margin = Number(design.margins);
    if (!Number.isFinite(margin)) return 1.35;
    return Math.min(Math.max(margin, 1.2), 1.55);
  })();

  const bodyDesign = {
    ...design,
    fontFamily:
      design.fontFamily ||
      '"Georgia", "Times New Roman", serif',
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
        padding: `${pagePadding}rem ${pagePadding + 0.25}rem`,
        fontFamily: bodyDesign.fontFamily,
        '--ivy-accent': accentColor,
      }}
    >
      {/* CLASSIC HEADER */}
      <header className="border-b-2 border-slate-900 pb-6 text-center">
        <div className="mx-auto mb-4 flex h-[22mm] w-[22mm] items-center justify-center rounded-full border border-slate-300 bg-white p-1 shadow-sm">
          <img
            src={photo}
            alt={`${profile.fullName || 'Profile'} profile`}
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        {hasValue(profile.fullName) && (
          <h1 className="text-[31px] font-bold uppercase leading-tight tracking-[0.15em] text-slate-950">
            {profile.fullName}
          </h1>
        )}

        {(hasValue(profile.currentJobTitle) || visibleSkills.length > 0) && (
          <p className="mx-auto mt-3 max-w-[160mm] text-[12px] font-semibold leading-5 text-slate-600">
            {[profile.currentJobTitle, visibleSkills.slice(0, 3).join(' • ')]
              .filter((value) => hasValue(value))
              .join(' · ')}
          </p>
        )}

        {contactParts.length > 0 && (
          <p className="mx-auto mt-3 flex max-w-[170mm] flex-wrap justify-center gap-x-2 gap-y-1 text-[11px] font-semibold leading-5 text-slate-500">
            {contactParts.map((part, index) => (
              <React.Fragment key={`${part}-${index}`}>
                {index > 0 && <span className="text-slate-300">•</span>}
                <span className="break-words">{part}</span>
              </React.Fragment>
            ))}
          </p>
        )}
      </header>

      {/* DATE + RECIPIENT */}
      <section className="mt-7 grid grid-cols-[40mm_1fr] gap-8 border-b border-slate-200 pb-5">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Date
          </p>

          <p className="text-[12.5px] font-semibold leading-5 text-slate-800">
            {formattedDate}
          </p>
        </div>

        {hasRecipient && (
          <div>
            <p
              className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ color: accentColor }}
            >
              Recipient
            </p>

            <div className="text-[12.5px] font-semibold leading-5 text-slate-700">
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
            prose-p:font-medium
            prose-p:leading-relaxed
            prose-ul:my-2.5
            prose-li:my-1.5
            prose-strong:font-semibold
            prose-strong:text-[var(--ivy-accent)]
            [&>*:first-child]:mt-0
            [&>*:last-child]:mb-0
          "
        />
      </main>

      {/* SKILLS */}
      {visibleSkills.length > 0 && (
        <section className="mt-8 border-y border-slate-200 py-4">
          <p
            className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{ color: accentColor }}
          >
            Key Strengths
          </p>

          <p className="text-[12px] font-semibold leading-6 text-slate-700">
            {visibleSkills.join(' · ')}
          </p>
        </section>
      )}

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
    </div>
  );
};

export default IvyLeagueTemplate;