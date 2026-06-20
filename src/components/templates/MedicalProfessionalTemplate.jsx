import React from 'react';
import {
  Body,
  RecipientBlock,
  Signature,
  getProfilePhoto,
} from './ProfessionalTemplateParts';

const MedicalProfessionalTemplate = (props) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const accentColor = props.accent || design.color || '#0f766e';
  const deepInk = '#0f172a';

  const photo = getProfilePhoto(profile);

  const contactParts = [
    profile.email,
    profile.phone,
    profile.address,
    profile.linkedinPortfolio,
  ].filter((value) => hasValue(value));

  const visibleSkills = skills.filter((skill) => hasValue(skill)).slice(0, 6);

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
      className="mx-auto bg-[#eefaf8] p-[4mm] shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
        color: deepInk,
      }}
    >
      <div className="min-h-[289mm] bg-white px-8 py-7 ring-1 ring-teal-100 shadow-sm">
        {/* HEADER */}
        <header className="border-b border-teal-100 pb-4">
          <div className="grid grid-cols-[1fr_25mm] items-start gap-6">
            <div>
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

              {(hasValue(profile.currentJobTitle) || visibleSkills.length > 0) && (
                <p className="mt-2 max-w-[142mm] text-[11px] font-semibold leading-4 text-slate-600">
                  {[profile.currentJobTitle, visibleSkills.slice(0, 3).join(' • ')]
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
            </div>

            <div className="flex justify-end">
              <img
                src={photo}
                alt={`${profile.fullName || 'Profile'} profile`}
                className="h-[23mm] w-[23mm] rounded-full border border-teal-100 object-cover shadow-sm"
              />
            </div>
          </div>
        </header>

        {/* DATE + RECIPIENT */}
        {(hasRecipient || formattedDate) && (
          <section className="mt-4 rounded-2xl border border-teal-100 bg-teal-50/45 px-4 py-3">
            <div className="grid grid-cols-[34mm_1fr] gap-5">
              <div className="border-r border-teal-100 pr-4">
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

                  <div className="[&_p]:text-[11px] [&_p]:leading-4 [&_p]:text-slate-700 [&_p.font-black]:text-slate-950">
                    <RecipientBlock recipient={recipient} />
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* BODY */}
        <main className="mt-4 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.035)]">
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
              prose-strong:text-teal-800
              [&>*:first-child]:mt-0
              [&>*:last-child]:mb-0
            "
          />
        </main>

        {/* CLINICAL STRENGTHS */}
        {visibleSkills.length > 0 && (
          <section className="mt-5 border-y border-teal-100 py-3">
            <p
              className="mb-2 text-[9px] font-black uppercase tracking-[0.16em]"
              style={{ color: accentColor }}
            >
              Clinical Strengths
            </p>

            <div className="flex flex-wrap gap-1.5">
              {visibleSkills.map((skill, index) => (
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

        {/* CARE PILLARS */}
        <section className="mt-4 grid grid-cols-3 gap-3">
          <CarePillar
            title="Care"
            body="Clear communication with patients, families, and teams."
          />

          <CarePillar
            title="Judgment"
            body="Reliable decisions rooted in evidence and responsibility."
          />

          <CarePillar
            title="Trust"
            body="Professional conduct, empathy, and consistency."
          />
        </section>

        {/* SIGNATURE */}
        {showSignature && (
          <footer
            className="
              mt-5 border-t border-teal-100 pt-4
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

const CarePillar = ({ title, body }) => (
  <div className="rounded-xl border border-teal-100 bg-teal-50/60 px-3 py-2.5">
    <p className="text-[9px] font-black uppercase tracking-[0.14em] text-teal-700">
      {title}
    </p>

    <p className="mt-1.5 text-[9.5px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
  </div>
);

export default MedicalProfessionalTemplate;