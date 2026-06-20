import React from 'react';
import { Body, ContactLines, Signature } from './ProfessionalTemplateParts';

const RelocationRemoteCandidateTemplate = ({
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

  const accentColor = accent || design.color || '#0891b2';

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 6);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills
      : ['Remote Collaboration', 'Adaptability', 'Communication', 'Availability'];

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
        padding: '8mm 10mm',
        fontFamily: bodyDesign.fontFamily,
        '--remote-accent': accentColor,
      }}
    >
      <header className="border-b-2 border-slate-900 pb-4">
        <p
          className="text-[9.2px] font-black uppercase tracking-[0.2em]"
          style={{ color: accentColor }}
        >
          Relocation / Remote Candidate Letter
        </p>

        {hasValue(profile.fullName) && (
          <h1 className="mt-2 text-[29px] font-black leading-tight tracking-[-0.04em] text-slate-950">
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

        {hasContact && (
          <div className="mt-3 text-[10.5px] font-semibold leading-4 text-slate-600 [&_p]:break-words">
            <ContactLines profile={profile} />
          </div>
        )}
      </header>

      <section className="mt-4 grid grid-cols-[34mm_1fr] gap-5 border-b border-slate-200 pb-3">
        <div className="border-r border-slate-200 pr-4">
          <p className="mb-1.5 text-[8.8px] font-bold uppercase tracking-[0.14em] text-slate-400">
            Date
          </p>

          <p className="text-[11px] font-semibold leading-4 text-slate-800">
            {formattedDate}
          </p>
        </div>

        {hasRecipient && (
          <div>
            <p
              className="mb-1.5 text-[8.8px] font-bold uppercase tracking-[0.14em]"
              style={{ color: accentColor }}
            >
              Recipient
            </p>

            <div className="text-[10.8px] font-semibold leading-4 text-slate-700">
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

      <section className="mt-5 grid grid-cols-3 gap-3">
        <RemotePillar
          title="Location"
          body="Clarifies relocation or remote work context."
          accentColor={accentColor}
        />

        <RemotePillar
          title="Availability"
          body="Shows readiness to align with team needs."
          accentColor={accentColor}
        />

        <RemotePillar
          title="Collaboration"
          body="Highlights communication across locations."
          accentColor={accentColor}
        />
      </section>

      <main className="mt-5 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.035)]">
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
            prose-strong:text-[var(--remote-accent)]
            [&>*:first-child]:mt-0
            [&>*:last-child]:mb-0
          "
        />
      </main>

      {featuredSkills.length > 0 && (
        <section className="mt-5 border-y border-slate-200 py-3">
          <p
            className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.14em]"
            style={{ color: accentColor }}
          >
            Remote / Relocation Strengths
          </p>

          <p className="text-[10.8px] font-semibold leading-4 text-slate-700">
            {featuredSkills.slice(0, 6).join(' · ')}
          </p>
        </section>
      )}

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
          <Signature signature={signature} profile={profile} accent={accentColor} />
        </footer>
      )}
    </div>
  );
};

const RemotePillar = ({ title, body, accentColor }) => (
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

export default RelocationRemoteCandidateTemplate;