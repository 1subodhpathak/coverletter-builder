import React from 'react';
import { Body, Signature } from './ProfessionalTemplateParts';

const PeopleBoardroomTemplate = (props) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const executiveAccent = props.accent || design.color || '#1F3A5F';
  const warmSurface = '#F4F1EC';
  const inkColor = '#111827';

  const featuredSkills = skills.filter((skill) => hasValue(skill)).slice(0, 5);

  const profileLabel =
    profile.currentJobTitle?.trim() ||
    recipient.targetRole?.trim() ||
    'People & Culture Executive';

  const bodyDesign = {
    ...design,
    fontFamily:
      design.fontFamily ||
      '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.4, 10.9), 11.8),
    lineHeight: Number(design.lineHeight) || 1.48,
  };

  const hasRecipient =
    hasValue(recipient.name) ||
    hasValue(recipient.title) ||
    hasValue(recipient.company) ||
    hasValue(recipient.address);

  const hasContact =
    hasValue(profile.address) ||
    hasValue(profile.phone) ||
    hasValue(profile.email) ||
    hasValue(profile.linkedinPortfolio);

  const showSignature =
    hasValue(signature.closing) ||
    hasValue(profile.fullName) ||
    signature.enabled;

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const leadershipFallback = [
    'Talent Strategy',
    'Executive Coaching',
    'Organizational Design',
  ];

  const leadershipItems =
    featuredSkills.length > 0 ? featuredSkills : leadershipFallback;

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-[#F4F1EC] p-[4mm] shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
        color: inkColor,
      }}
    >
      <div
        className="grid min-h-[289mm] bg-white shadow-sm"
        style={{ gridTemplateColumns: '48mm 1fr' }}
      >
        {/* LEFT SIDEBAR */}
        <aside
          className="px-5 py-6 text-white"
          style={{ backgroundColor: executiveAccent }}
        >
          <div className="h-px w-12 bg-white/50" />

          <p className="mt-4 text-[8.8px] font-black uppercase tracking-[0.18em] text-white/65">
            People Leadership
          </p>

          {hasValue(profile.fullName) && (
            <h1 className="mt-2.5 text-[22px] font-black leading-tight tracking-[-0.025em] text-white">
              {profile.fullName}
            </h1>
          )}

          <p className="mt-2.5 text-[9.8px] font-bold uppercase leading-4 tracking-[0.11em] text-white/75">
            {profileLabel}
          </p>

          {/* CONTACT */}
          {hasContact && (
            <SidebarPanel title="Contact">
              <div className="space-y-1.5 text-[9.8px] font-semibold leading-4 text-white/90">
                {hasValue(profile.address) && <p>{profile.address}</p>}
                {hasValue(profile.phone) && <p>{profile.phone}</p>}
                {hasValue(profile.email) && (
                  <p className="break-words">{profile.email}</p>
                )}
                {hasValue(profile.linkedinPortfolio) && (
                  <p className="break-words">{profile.linkedinPortfolio}</p>
                )}
              </div>
            </SidebarPanel>
          )}

          {/* LEADERSHIP FOCUS */}
          <SidebarPanel title="Leadership Focus">
            <div className="space-y-2">
              {leadershipItems.slice(0, 4).map((skill, index) => (
                <div
                  key={`${skill}-${index}`}
                  className="rounded-[12px] border border-white/10 bg-white/8 px-3 py-2"
                >
                  <p className="text-[7.8px] font-black uppercase tracking-[0.13em] text-white/50">
                    Priority {index + 1}
                  </p>

                  <p className="mt-0.5 text-[10px] font-bold leading-4 text-white">
                    {skill}
                  </p>
                </div>
              ))}
            </div>
          </SidebarPanel>

          {/* EXECUTIVE NOTE */}
          <div className="mt-5 rounded-[14px] border border-white/10 bg-white/8 px-3.5 py-3">
            <p className="text-[9.5px] font-semibold leading-4 text-white/80">
              Board-ready communication centered on people, culture, leadership
              alignment, and organizational performance.
            </p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="bg-white px-7 py-6">
          {/* HEADER */}
          <header>
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[9.2px] font-black uppercase tracking-[0.18em] text-slate-500">
                  Cover Letter
                </p>

                <h2 className="mt-1.5 text-[25px] font-black leading-tight tracking-[-0.03em] text-[#111827]">
                  Boardroom Introduction
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
                className="rounded-full px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.12em]"
                style={{
                  backgroundColor: `${executiveAccent}12`,
                  color: executiveAccent,
                }}
              >
                Confidential
              </div>
            </div>

            <div className="mt-4 grid grid-cols-[1fr_105px] gap-4">
              {hasRecipient && (
                <div
                  className="rounded-[14px] border px-4 py-3 text-[11px] leading-4 text-slate-700"
                  style={{
                    borderColor: '#E5E7EB',
                    backgroundColor: warmSurface,
                  }}
                >
                  <p className="mb-1.5 text-[8.8px] font-black uppercase tracking-[0.14em] text-slate-500">
                    To
                  </p>

                  {hasValue(recipient.name) && (
                    <p className="font-black text-slate-950">
                      {recipient.name}
                    </p>
                  )}

                  {hasValue(recipient.title) && (
                    <p className="font-medium">{recipient.title}</p>
                  )}

                  {hasValue(recipient.company) && (
                    <p className="font-bold text-slate-800">
                      {recipient.company}
                    </p>
                  )}

                  {hasValue(recipient.address) && (
                    <p className="break-words text-slate-600">
                      {recipient.address}
                    </p>
                  )}
                </div>
              )}

              <div className="rounded-[14px] border border-[#DCE5EE] bg-[#F8FBFD] px-3 py-3">
                <p className="text-[8.8px] font-black uppercase tracking-[0.14em] text-slate-500">
                  Date
                </p>

                <p
                  className="mt-1.5 text-[11px] font-bold leading-4"
                  style={{ color: executiveAccent }}
                >
                  {formattedDate}
                </p>
              </div>
            </div>
          </header>

          {/* DIVIDER */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <div
              className="h-1.5 w-20 rounded-full"
              style={{ backgroundColor: executiveAccent }}
            />
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* BODY */}
          <section className="rounded-[16px] border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_26px_rgba(17,24,39,0.04)]">
            <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5">
              <p
                className="text-[9px] font-black uppercase tracking-[0.16em]"
                style={{ color: executiveAccent }}
              >
                Letter Body
              </p>

              <span
                className="rounded-full px-2.5 py-0.5 text-[7.8px] font-bold uppercase tracking-[0.1em]"
                style={{
                  backgroundColor: `${executiveAccent}10`,
                  color: executiveAccent,
                }}
              >
                Executive Tone
              </span>
            </div>

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
                prose-strong:text-[#1F3A5F]
                [&>*:first-child]:mt-0
                [&>*:last-child]:mb-0
              "
            />
          </section>

          {/* SIGNATURE */}
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
              <Signature
                signature={signature}
                profile={profile}
                accent={executiveAccent}
              />
            </footer>
          )}
        </main>
      </div>
    </div>
  );
};

const SidebarPanel = ({ title, children }) => (
  <section className="mt-5 rounded-[14px] border border-white/10 bg-white/5 px-3.5 py-3">
    <p className="text-[8.5px] font-black uppercase tracking-[0.16em] text-white/60">
      {title}
    </p>

    <div className="mt-3">{children}</div>
  </section>
);

export default PeopleBoardroomTemplate;