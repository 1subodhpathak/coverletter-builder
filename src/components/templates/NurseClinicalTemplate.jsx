import React from 'react';
import { Body, Signature, ContactLines } from './ProfessionalTemplateParts';

const NurseClinicalTemplate = ({
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
    .slice(0, 6);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['Patient Care', 'Clinical Safety', 'Team Collaboration'];

  const remainingSkills = visibleSkills.slice(3);

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
      className="mx-auto grid bg-white text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        gridTemplateColumns: '56mm 1fr',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      {/* LEFT CLINICAL SIDEBAR */}
      <aside
        className="px-5 py-6 text-white"
        style={{ backgroundColor: accentColor }}
      >
        <div className="h-px w-14 bg-white/45" />

        <p className="mt-4 text-[9px] font-black uppercase tracking-[0.18em] text-white/65">
          Clinical Candidate
        </p>

        {hasValue(profile.fullName) && (
          <h1 className="mt-2.5 text-[24px] font-black leading-tight tracking-[-0.035em] text-white">
            {profile.fullName}
          </h1>
        )}

        {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
          <p className="mt-3 text-[9.5px] font-black uppercase leading-4 tracking-[0.12em] text-emerald-50/75">
            {[profile.currentJobTitle, featuredSkills.slice(0, 2).join(' • ')]
              .filter((value) => hasValue(value))
              .join(' · ')}
          </p>
        )}

        <div className="mt-5 rounded-full border border-white/30 bg-white/10 px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.14em]">
          Clinical Care
        </div>

        {/* CONTACT */}
        <section className="mt-6 text-emerald-50">
          <SidebarTitle>Contact</SidebarTitle>

          <div className="mt-3 text-[9.8px] font-semibold leading-4 text-white/85 [&_p]:break-words">
            <ContactLines profile={profile} dark />
          </div>
        </section>

        {/* CARE PILLARS */}
        <section className="mt-6">
          <SidebarTitle>Care Priorities</SidebarTitle>

          <div className="mt-3 space-y-2">
            <ClinicalPillar
              title="Care"
              body="Patient-centered support with empathy and consistency."
            />

            <ClinicalPillar
              title="Safety"
              body="Focused on protocols, observation, and risk reduction."
            />

            <ClinicalPillar
              title="Team"
              body="Reliable collaboration with staff and families."
            />
          </div>
        </section>

        {/* SKILLS */}
        {featuredSkills.length > 0 && (
          <section className="mt-6">
            <SidebarTitle>Clinical Strengths</SidebarTitle>

            <div className="mt-3 space-y-2">
              {featuredSkills.map((skill, index) => (
                <div
                  key={`${skill}-${index}`}
                  className="rounded-xl border border-white/15 bg-white/10 px-3 py-2.5"
                >
                  <p className="text-[7.8px] font-black uppercase tracking-[0.13em] text-white/45">
                    Strength {index + 1}
                  </p>

                  <p className="mt-1 text-[10.2px] font-black leading-4 text-white">
                    {skill}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {remainingSkills.length > 0 && (
          <section className="mt-6">
            <SidebarTitle>Capabilities</SidebarTitle>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {remainingSkills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[8.5px] font-black leading-tight text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main className="px-7 py-6">
        {/* HEADER */}
        <header className="border-b border-emerald-100 pb-4">
          <p
            className="text-[9.2px] font-black uppercase tracking-[0.2em]"
            style={{ color: accentColor }}
          >
            Cover Letter
          </p>

          <h2 className="mt-1.5 text-[24px] font-black leading-tight tracking-[-0.035em] text-slate-950">
            Patient Care, Safety, and Clinical Reliability
          </h2>

          <p className="mt-2 max-w-[120mm] text-[10.8px] font-semibold leading-4 text-slate-600">
            A clean clinical letter format designed for nursing, healthcare,
            hospital, clinic, and patient-care roles.
          </p>
        </header>

        {/* DATE + RECIPIENT */}
        <section className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3">
          <div className="grid grid-cols-[34mm_1fr] gap-5">
            <div className="border-r border-emerald-200 pr-4">
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

                <div className="text-[10.8px] font-semibold leading-4 text-slate-700">
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

        {/* CLINICAL VALUE STRIP */}
        <section className="my-5 grid grid-cols-3 gap-2.5 text-center">
          <ClinicalBadge title="Care" accentColor={accentColor} />
          <ClinicalBadge title="Safety" accentColor={accentColor} />
          <ClinicalBadge title="Team" accentColor={accentColor} />
        </section>

        {/* BODY */}
        <section className="rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.035)]">
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
              prose-strong:text-emerald-800
              [&>*:first-child]:mt-0
              [&>*:last-child]:mb-0
            "
          />
        </section>

        {/* SIGNATURE */}
        {showSignature && (
          <footer
            className="
              mt-5 border-t border-emerald-100 pt-4
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
      </main>
    </div>
  );
};

const SidebarTitle = ({ children }) => (
  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/55">
    {children}
  </p>
);

const ClinicalPillar = ({ title, body }) => (
  <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2.5">
    <p className="text-[8.8px] font-black uppercase tracking-[0.14em] text-white">
      {title}
    </p>

    <p className="mt-1.5 text-[9.5px] font-semibold leading-4 text-white/72">
      {body}
    </p>
  </div>
);

const ClinicalBadge = ({ title, accentColor }) => (
  <p
    className="rounded-xl border px-3 py-2 text-[9.5px] font-black uppercase tracking-[0.14em]"
    style={{
      borderColor: `${accentColor}22`,
      backgroundColor: `${accentColor}10`,
      color: accentColor,
    }}
  >
    {title}
  </p>
);

export default NurseClinicalTemplate;