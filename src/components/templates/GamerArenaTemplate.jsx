import React from 'react';
import { Body, Signature } from './ProfessionalTemplateParts';

const GamerArenaTemplate = (props) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const primaryAccent = props.accent || design.color || '#facc15';
  const secondaryAccent = '#34d399';
  const blueAccent = '#60a5fa';

  const visibleSkills = skills.filter((skill) => hasValue(skill)).slice(0, 10);

  const gamerDesign = {
    ...design,
    fontFamily:
      design.fontFamily ||
      '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.8, 11.3), 12.4),
    lineHeight: Number(design.lineHeight) || 1.56,
  };

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

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-[#111113] p-[5mm] text-slate-100 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: gamerDesign.fontFamily,
      }}
    >
      <div className="min-h-[283mm] border-[4px] border-yellow-400 bg-[#1b1b1d] text-slate-100 shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
        {/* HEADER */}
        <header className="relative border-b border-yellow-400/35 px-8 py-6">
          <div className="flex items-start justify-between gap-8">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-black text-slate-950 shadow-[0_0_18px_rgba(250,204,21,0.45)]"
                  style={{ backgroundColor: primaryAccent }}
                >
                  G
                </span>

                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-yellow-200">
                  Cover Letter
                </span>
              </div>

              {hasValue(profile.fullName) && (
                <h1 className="mt-4 text-[34px] font-black uppercase leading-none tracking-[0.04em] text-white drop-shadow-[4px_4px_0_rgba(15,23,42,0.75)]">
                  {profile.fullName}
                </h1>
              )}

              {(hasValue(profile.currentJobTitle) || visibleSkills.length > 0) && (
                <p className="mt-3 max-w-[130mm] text-[11.5px] font-bold uppercase leading-5 tracking-[0.12em] text-yellow-200">
                  {[profile.currentJobTitle, visibleSkills.slice(0, 3).join(' • ')]
                    .filter((value) => hasValue(value))
                    .join(' · ')}
                </p>
              )}
            </div>

            <div className="rounded-[14px] border border-yellow-400/25 bg-[#101112] px-4 py-3 text-right">
              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                Mission Status
              </p>

              <p className="mt-1 text-[12px] font-black uppercase tracking-[0.1em] text-emerald-300">
                Ready for Interview
              </p>

              <p className="mt-2 text-[10.5px] font-semibold text-slate-400">
                {formattedDate}
              </p>
            </div>
          </div>

          {hasContact && (
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold leading-5 text-slate-300">
              {hasValue(profile.address) && <span>{profile.address}</span>}
              {hasValue(profile.phone) && <span>{profile.phone}</span>}
              {hasValue(profile.email) && (
                <span className="break-all text-yellow-100">{profile.email}</span>
              )}
              {hasValue(profile.linkedinPortfolio) && (
                <span className="break-all text-blue-200">
                  {profile.linkedinPortfolio}
                </span>
              )}
            </div>
          )}
        </header>

        {/* BODY LAYOUT */}
        <div className="grid grid-cols-[1fr_54mm] gap-6 px-8 py-6">
          {/* MAIN LETTER */}
          <main>
            <div className="mb-3 flex items-center gap-3">
              <span
                className="h-7 w-1.5 rounded-full"
                style={{ backgroundColor: secondaryAccent }}
              />

              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white">
                Player Profile
              </p>
            </div>

            <section className="rounded-[18px] border border-yellow-400/25 bg-[#111113]/95 px-5 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
              <Body
                body={props.body}
                design={{
                  ...gamerDesign,
                  fontSize: Math.min(gamerDesign.fontSize, 11.8),
                  lineHeight: Math.min(Number(gamerDesign.lineHeight) || 1.56, 1.5),
                }}
                onUpdateBody={props.onUpdateBody}
                className="
                  text-left text-slate-100
                  prose-p:my-2
                  prose-p:font-medium
                  prose-p:leading-relaxed
                  prose-p:text-slate-100
                  prose-ul:my-2
                  prose-li:my-1
                  prose-li:text-slate-100
                  prose-li:marker:text-emerald-400
                  prose-strong:font-semibold
                  prose-strong:text-yellow-200
                  [&>*:first-child]:mt-0
                  [&>*:last-child]:mb-0
                "
              />
            </section>

            {/* SIGNATURE - NATURAL FLOW */}
            {showSignature && (
              <footer
                className="
                  mt-5 border-t border-yellow-400/20 pt-3
                  text-slate-100
                  [&>div]:mt-0
                  [&_img]:h-12
                  [&_p]:text-slate-100
                  [&_strong]:text-yellow-200
                "
              >
                <Signature
                  signature={signature}
                  profile={profile}
                  accent={primaryAccent}
                />
              </footer>
            )}
          </main>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-4">
            {hasRecipient && (
              <SidebarPanel title="Quest Info" accent={secondaryAccent}>
                <div className="space-y-1 text-[11.5px] font-semibold leading-5 text-slate-200">
                  {hasValue(recipient.name) && (
                    <p className="font-black text-white">{recipient.name}</p>
                  )}

                  {hasValue(recipient.title) && <p>{recipient.title}</p>}

                  {hasValue(recipient.company) && (
                    <p className="font-bold text-emerald-300">
                      {recipient.company}
                    </p>
                  )}

                  {hasValue(recipient.address) && (
                    <p className="break-words text-slate-400">
                      {recipient.address}
                    </p>
                  )}
                </div>
              </SidebarPanel>
            )}

            {visibleSkills.length > 0 && (
              <SidebarPanel title="Skill Loadout" accent={blueAccent}>
                <div className="flex flex-wrap gap-2">
                  {visibleSkills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border border-blue-400/25 bg-blue-400/10 px-2.5 py-1 text-[10px] font-black leading-4 text-blue-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </SidebarPanel>
            )}

            <SidebarPanel title="Mission Mode" accent={primaryAccent}>
              <div className="space-y-3 text-[11.5px] font-semibold leading-5 text-slate-200">
                <div className="rounded-[12px] border border-yellow-400/20 bg-yellow-400/10 px-3 py-2.5">
                  <p className="text-[9px] font-black uppercase tracking-[0.14em] text-yellow-200">
                    Objective
                  </p>
                  <p className="mt-1 text-slate-100">
                    Communicate value with clarity, confidence, and measurable impact.
                  </p>
                </div>

                <div className="rounded-[12px] border border-emerald-400/20 bg-emerald-400/10 px-3 py-2.5">
                  <p className="text-[9px] font-black uppercase tracking-[0.14em] text-emerald-300">
                    Status
                  </p>
                  <p className="mt-1 text-slate-100">
                    Interview-ready and prepared for the next challenge.
                  </p>
                </div>
              </div>
            </SidebarPanel>
          </aside>
        </div>
      </div>
    </div>
  );
};

const SidebarPanel = ({ title, accent, children }) => (
  <section className="overflow-hidden border border-white/10 bg-[#101112] shadow-[0_12px_35px_rgba(0,0,0,0.22)]">
    <div
      className="px-4 py-2.5 text-center text-[10px] font-black uppercase tracking-[0.16em] text-slate-950"
      style={{ backgroundColor: accent }}
    >
      {title}
    </div>

    <div className="p-4">{children}</div>
  </section>
);

export default GamerArenaTemplate;
