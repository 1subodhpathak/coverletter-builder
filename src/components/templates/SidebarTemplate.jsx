import React from 'react';
import {
  Body,
  Signature,
  getProfilePhoto,
} from './ProfessionalTemplateParts';

const SidebarTemplate = ({
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

  const accentColor = accent || design.color || '#334155';

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 8);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['Professional Communication', 'Execution Discipline', 'Stakeholder Alignment'];

  const remainingSkills = visibleSkills.slice(3);

  const hasContact =
    hasValue(profile.email) ||
    hasValue(profile.phone) ||
    hasValue(profile.address) ||
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
    fontSize: Math.min(Math.max(Number(design.fontSize) || 12, 11.5), 12.5),
    lineHeight: Number(design.lineHeight) || 1.58,
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const contentPadding = Math.min(
    Math.max(Number(design.margins) || 1.35, 1.2),
    1.65
  );

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto flex bg-white text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      {/* LEFT SIDEBAR */}
      <aside className="w-[70mm] shrink-0 border-r border-slate-200 bg-slate-50 px-8 py-10 text-right">
        <img
          src={getProfilePhoto(profile)}
          alt={`${profile.fullName || 'Profile'} profile`}
          className="ml-auto h-[30mm] w-[30mm] rounded-full border-4 border-white object-cover shadow-md"
        />

        {hasValue(profile.fullName) && (
          <h1
            className="mt-6 break-words text-[28px] font-black leading-tight tracking-[-0.03em]"
            style={{ color: accentColor }}
          >
            {profile.fullName}
          </h1>
        )}

        {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
          <p className="mt-4 text-[11px] font-black uppercase leading-5 tracking-[0.14em] text-slate-500">
            {[profile.currentJobTitle, featuredSkills.slice(0, 2).join(' • ')]
              .filter((value) => hasValue(value))
              .join(' · ')}
          </p>
        )}

        <div
          className="ml-auto mt-7 h-1.5 w-20 rounded-full"
          style={{ backgroundColor: accentColor }}
        />

        {/* CONTACT */}
        {hasContact && (
          <section className="mt-9">
            <SidebarTitle>Contact</SidebarTitle>

            <div className="mt-4 space-y-3 text-[11.5px] font-semibold leading-5 text-slate-600">
              {hasValue(profile.email) && (
                <p className="break-all">{profile.email}</p>
              )}

              {hasValue(profile.phone) && <p>{profile.phone}</p>}

              {hasValue(profile.linkedinPortfolio) && (
                <p className="break-all">{profile.linkedinPortfolio}</p>
              )}
            </div>
          </section>
        )}

        {hasValue(profile.address) && (
          <section className="mt-8">
            <SidebarTitle>Location</SidebarTitle>

            <p className="mt-4 text-[11.5px] font-semibold leading-5 text-slate-600">
              {profile.address}
            </p>
          </section>
        )}

        {/* FEATURED SKILLS */}
        {featuredSkills.length > 0 && (
          <section className="mt-9">
            <SidebarTitle>Core Strengths</SidebarTitle>

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
          <section className="mt-9">
            <SidebarTitle>Capabilities</SidebarTitle>

            <div className="mt-4 flex flex-wrap justify-end gap-2">
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
      </aside>

      {/* MAIN CONTENT */}
      <main
        className="flex-1"
        style={{
          padding: `${contentPadding}rem`,
        }}
      >
        {/* COMPACT DATE + RECIPIENT */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
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
        <section className="mt-7 rounded-2xl border border-slate-100 bg-white px-6 py-5 shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
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
  );
};

const SidebarTitle = ({ children }) => (
  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
    {children}
  </p>
);

export default SidebarTemplate;