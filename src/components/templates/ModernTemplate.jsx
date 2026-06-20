import React from 'react';
import {
  Body,
  Signature,
  getProfilePhoto,
} from './ProfessionalTemplateParts';

const ModernTemplate = ({
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

  const photo = getProfilePhoto(profile);

  const contactParts = [
    profile.email,
    profile.phone,
    profile.address,
    profile.linkedinPortfolio,
  ].filter((value) => hasValue(value));

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 7);

  const featuredSkills = visibleSkills.slice(0, 3);

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
    return Math.min(Math.max(margin, 1.2), 1.65);
  })();

  const bodyDesign = {
    ...design,
    fontFamily:
      design.fontFamily ||
      '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 12, 11.5), 12.5),
    lineHeight: Number(design.lineHeight) || 1.58,
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
        padding: `${pagePadding}rem`,
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      {/* HEADER */}
      <header
        className="border-b-2 pb-6"
        style={{ borderColor: accentColor }}
      >
        <div className="grid grid-cols-[24mm_1fr] items-center gap-6">
          <img
            src={photo}
            alt={`${profile.fullName || 'Profile'} profile`}
            className="h-[24mm] w-[24mm] rounded-full border border-slate-200 object-cover shadow-sm"
          />

          <div className="min-w-0">
            <p
              className="mb-2 text-[10.5px] font-black uppercase tracking-[0.22em]"
              style={{ color: accentColor }}
            >
              Cover Letter
            </p>

            {hasValue(profile.fullName) && (
              <h1
                className="text-[32px] font-black uppercase leading-tight tracking-[0.08em]"
                style={{ color: accentColor }}
              >
                {profile.fullName}
              </h1>
            )}

            {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
              <p className="mt-2 text-[12px] font-semibold leading-5 text-slate-600">
                {[profile.currentJobTitle, featuredSkills.join(' • ')]
                  .filter((value) => hasValue(value))
                  .join(' · ')}
              </p>
            )}

            {contactParts.length > 0 && (
              <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[12px] font-semibold leading-5 text-slate-600">
                {contactParts.map((part, index) => (
                  <React.Fragment key={`${part}-${index}`}>
                    {index > 0 && <span className="text-slate-300">•</span>}
                    <span className="break-words">{part}</span>
                  </React.Fragment>
                ))}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* COMPACT DATE + RECIPIENT */}
      <section className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
        <div className="grid grid-cols-[40mm_1fr] gap-6">
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

      {/* BODY */}
      <main className="mt-7 rounded-2xl border border-slate-100 bg-white px-6 py-5 shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
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
      </main>

      {/* SKILLS */}
      {visibleSkills.length > 0 && (
        <section className="mt-7 border-y border-slate-200 py-4">
          <p
            className="mb-3 text-[10.5px] font-black uppercase tracking-[0.18em]"
            style={{ color: accentColor }}
          >
            Relevant Strengths
          </p>

          <div className="flex flex-wrap gap-2">
            {visibleSkills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="rounded-full border px-3 py-1.5 text-[10.5px] font-black leading-tight"
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

export default ModernTemplate;
