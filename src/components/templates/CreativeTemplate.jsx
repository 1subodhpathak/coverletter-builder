import React from 'react';
import {
  Body,
  Signature,
  getProfilePhoto,
} from './ProfessionalTemplateParts';

const CreativeTemplate = ({
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

  const accentColor = accent || design.color || '#7C3AED';
  const inkColor = '#111827';

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 8);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 4)
      : ['Creative Direction', 'Storytelling', 'Visual Thinking', 'Execution'];

  const remainingSkills = visibleSkills.slice(4);

  const hasContact =
    hasValue(profile.phone) ||
    hasValue(profile.email) ||
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
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.5, 11.0), 11.8),
    lineHeight: Math.min(Number(design.lineHeight) || 1.58, 1.44),
  };

  const contentPadding = Math.min(
    Math.max(Number(design.margins) || 1.25, 1.15),
    1.5
  );

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-[#f8fafc] text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      <div
        className="grid min-h-[297mm] bg-white"
        style={{
          gridTemplateColumns: '68mm 1fr',
          color: inkColor,
        }}
      >
        {/* LEFT CREATIVE SIDEBAR */}
        <aside
          className="relative overflow-hidden px-7 py-8 text-white"
          style={{
            background: `linear-gradient(160deg, ${accentColor} 0%, #111827 78%)`,
          }}
        >
          {/* Decorative shapes */}
          <div className="absolute -left-12 top-12 h-36 w-36 rounded-full bg-white/10" />
          <div className="absolute -right-10 top-48 h-28 w-28 rotate-12 rounded-[32px] bg-white/10" />
          <div className="absolute bottom-8 left-8 h-24 w-24 rounded-full border border-white/15" />

          <div className="relative z-10">
            {/* PHOTO */}
            <div className="relative mx-auto w-[30mm]">
              <div className="absolute -right-3 -top-3 h-[30mm] w-[30mm] rotate-6 rounded-[24px] bg-white/15" />

              <img
                src={getProfilePhoto(profile)}
                alt={`${profile.fullName || 'Profile'} profile`}
                className="relative h-[30mm] w-[30mm] rounded-[24px] border-4 border-white/25 object-cover shadow-xl"
              />
            </div>

            {/* NAME */}
            {hasValue(profile.fullName) && (
              <h1 className="mt-5 text-center text-[25px] font-black leading-tight tracking-[-0.035em] text-white">
                {profile.fullName}
              </h1>
            )}

            {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
              <p className="mx-auto mt-2 max-w-[52mm] text-center text-[9.5px] font-black uppercase leading-4 tracking-[0.14em] text-white/72">
                {[profile.currentJobTitle, featuredSkills.slice(0, 2).join(' • ')]
                  .filter((value) => hasValue(value))
                  .join(' · ')}
              </p>
            )}

            <div className="mx-auto mt-4 h-px w-16 bg-white/35" />

            {/* CONTACT */}
            {hasContact && (
            <section className="mt-6">
                <SidebarTitle>Contact</SidebarTitle>

                <div className="mt-3 space-y-2.5 text-[10px] font-semibold leading-4 text-white/82">
                  {hasValue(profile.phone) && (
                    <ContactItem label="Phone" value={profile.phone} />
                  )}

                  {hasValue(profile.email) && (
                    <ContactItem label="Email" value={profile.email} breakAll />
                  )}

                  {hasValue(profile.address) && (
                    <ContactItem label="Location" value={profile.address} />
                  )}

                  {hasValue(profile.linkedinPortfolio) && (
                    <ContactItem
                      label="Portfolio"
                      value={profile.linkedinPortfolio}
                      breakAll
                    />
                  )}
                </div>
              </section>
            )}

            {/* FEATURED SKILLS */}
            {featuredSkills.length > 0 && (
              <section className="mt-6">
                <SidebarTitle>Creative Toolkit</SidebarTitle>

                <div className="mt-3 space-y-2">
                  {featuredSkills.map((skill, index) => (
                    <div key={`${skill}-${index}`}>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[9.5px] font-bold leading-4 text-white">
                          {skill}
                        </p>

                        <p className="text-[8px] font-black uppercase tracking-[0.1em] text-white/45">
                          0{index + 1}
                        </p>
                      </div>

                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/15">
                        <div
                          className="h-full rounded-full bg-white"
                          style={{
                            width: `${Math.min(94, 68 + index * 8)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ADDITIONAL SKILLS */}
            {remainingSkills.length > 0 && (
              <section className="mt-6">
                <SidebarTitle>Capabilities</SidebarTitle>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {remainingSkills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[8.8px] font-black leading-tight text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* CREATIVE NOTE */}
            <section className="mt-6 rounded-[22px] border border-white/15 bg-white/10 px-4 py-2.5">
              <p className="text-[9.5px] font-semibold leading-4 text-white/78">
                Creative work is strongest when the idea is clear, the craft is
                intentional, and the outcome is easy to understand.
              </p>
            </section>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main
          className="relative overflow-hidden bg-white"
          style={{
            padding: `${contentPadding}rem`,
          }}
        >
          {/* Top creative accent */}
          <div
            className="absolute right-0 top-0 h-24 w-24 rounded-bl-[40px]"
            style={{ backgroundColor: `${accentColor}12` }}
          />

          <div className="relative z-10">
            {/* TOP HEADER */}
            <header className="border-b border-slate-200 pb-4">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p
                    className="text-[9.5px] font-black uppercase tracking-[0.18em]"
                    style={{ color: accentColor }}
                  >
                    Cover Letter
                  </p>

                  <h2 className="mt-1.5 text-[24px] font-black leading-tight tracking-[-0.035em] text-slate-950">
                    Application Narrative
                  </h2>

                  {(hasValue(recipient.targetRole) ||
                    hasValue(recipient.company)) && (
                    <p className="mt-1.5 text-[11px] font-semibold leading-4 text-slate-600">
                      {[recipient.targetRole, recipient.company]
                        .filter((value) => hasValue(value))
                        .join(' · ')}
                    </p>
                  )}
                </div>

                <div
                  className="rounded-full px-3 py-1.5 text-[8.8px] font-black uppercase tracking-[0.12em]"
                  style={{
                    backgroundColor: `${accentColor}12`,
                    color: accentColor,
                  }}
                >
                  Portfolio Ready
                </div>
              </div>
            </header>

            {/* COMPACT CREATIVE BRIEF */}
            <section
              className="mt-5 rounded-[24px] border px-4 py-3"
              style={{
                borderColor: `${accentColor}22`,
                backgroundColor: `${accentColor}08`,
              }}
            >
              <div className="grid grid-cols-[32mm_1fr] gap-4">
                <div className="border-r border-slate-200 pr-4">
                  <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">
                    Date
                  </p>

                  <p className="text-[11px] font-bold leading-4 text-slate-800">
                    {formattedDate}
                  </p>
                </div>

                {hasRecipient && (
                  <div>
                    <p
                    className="mb-1.5 text-[9px] font-black uppercase tracking-[0.14em]"
                      style={{ color: accentColor }}
                    >
                      Creative Brief
                    </p>

                    <div className="text-[11px] font-semibold leading-4 text-slate-700">
                      {hasValue(recipient.name) && (
                        <p className="font-black text-slate-950">
                          {recipient.name}
                        </p>
                      )}

                      {(hasValue(recipient.title) ||
                        hasValue(recipient.company)) && (
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
            <section className="mt-5 rounded-[26px] border border-slate-100 bg-white px-5 py-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              <div className="mb-3 flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />

                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Letter Body
                </p>
              </div>

              <Body
                body={body}
                design={bodyDesign}
                onUpdateBody={onUpdateBody}
                className="
                  text-left text-slate-800
                  prose-p:my-2
                  prose-p:font-medium
                  prose-p:leading-relaxed
                  prose-ul:my-2
                  prose-li:my-1
                  prose-strong:font-semibold
                  prose-strong:text-slate-950
                  [&>*:first-child]:mt-0
                  [&>*:last-child]:mb-0
                "
              />
            </section>

            {/* CREATIVE VALUE STRIP */}
            <section className="mt-5 grid grid-cols-3 gap-2">
              <ValuePillar
                title="Idea"
                body="Clear concept and purpose."
                accentColor={accentColor}
              />

              <ValuePillar
                title="Craft"
                body="Polished visual execution."
                accentColor={accentColor}
              />

              <ValuePillar
                title="Impact"
                body="Outcome-driven storytelling."
                accentColor={accentColor}
              />
            </section>

            {/* SIGNATURE - NATURAL FLOW */}
            {showSignature && (
              <footer
                className="
                  mt-5 border-t border-slate-200 pt-3
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
        </main>
      </div>
    </div>
  );
};

const SidebarTitle = ({ children }) => (
  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/55">
    {children}
  </p>
);

const ContactItem = ({ label, value, breakAll = false }) => (
  <div>
    <p className="text-[8.5px] font-black uppercase tracking-[0.16em] text-white/42">
      {label}
    </p>

    <p
      className={`mt-1 text-[11px] font-semibold leading-5 text-white/82 ${
        breakAll ? 'break-all' : 'break-words'
      }`}
    >
      {value}
    </p>
  </div>
);

const ValuePillar = ({ title, body, accentColor }) => (
  <div
    className="rounded-[18px] border px-4 py-3"
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

export default CreativeTemplate;
