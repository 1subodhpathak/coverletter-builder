import React from 'react';
import { Body, Signature } from './ProfessionalTemplateParts';

const hasValue = (value) => Boolean(value?.trim?.());

const SqlTerminalTemplate = (props) => {
  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const terminalAccent = props.accent || design.color || '#38bdf8';
  const terminalAmber = '#fde68a';
  const terminalGreen = '#34d399';

  const safeName = (profile.fullName || 'applicant')
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\w-]/g, '');

  const visibleSkills = skills.filter((skill) => hasValue(skill)).slice(0, 8);

  const terminalDesign = {
    ...design,
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 10.2, 9.8), 10.8),
    lineHeight: Number(design.lineHeight) || 1.42,
  };

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

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id="cover-letter-preview"
      className="relative mx-auto bg-[#0f172a] p-[4mm] text-slate-100 shadow-2xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      }}
    >
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.10),transparent_35%)]" />

      <div className="relative z-10 min-h-[289mm] rounded-[16px] border border-white/12 bg-[#111827]/96 shadow-[0_20px_55px_rgba(0,0,0,0.32)]">
        {/* TERMINAL TOP BAR */}
        <div className="flex items-center gap-3 border-b border-white/10 bg-[#020617] px-4 py-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff6b8a]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
          </div>

          <div className="ml-1 truncate text-[8.8px] font-black uppercase tracking-[0.16em] text-slate-400">
            bash — {safeName}.sh — cover-letter
          </div>
        </div>

        <div className="grid min-h-[281mm] grid-cols-[8mm_1fr]">
          {/* LINE NUMBERS */}
          <aside className="select-none border-r border-white/10 bg-[#020617]/45 px-1 py-4 text-right text-[7.8px] leading-[15px] text-slate-600">
            {Array.from({ length: 64 }, (_, index) => (
              <p key={index}>{index + 1}</p>
            ))}
          </aside>

          {/* MAIN CONTENT */}
          <main className="px-5 py-4">
            {/* IMPORT LINE */}
            <p className="text-[9.5px] font-bold leading-4 text-sky-300">
              <span className="text-fuchsia-300">import</span> Applicant{' '}
              <span className="text-fuchsia-300">from</span>{' '}
              <span className="text-amber-200">'./high-impact-talent'</span>;
            </p>

            {/* HEADER */}
            <header className="mt-2.5 border-b border-white/10 pb-3">
              <div className="grid grid-cols-[minmax(0,1fr)_56mm] items-start gap-5">
                <div className="min-w-0">
                  {hasValue(profile.fullName) && (
                    <h1 className="text-[26px] font-black leading-tight tracking-[-0.03em] text-white">
                      {profile.fullName}
                      <span style={{ color: terminalAccent }}>_</span>
                    </h1>
                  )}

                  <p className="mt-1.5 text-[8.8px] font-black uppercase leading-4 tracking-[0.15em] text-slate-500">
                    Cover Letter
                  </p>

                  {(hasValue(profile.currentJobTitle) ||
                    visibleSkills.length > 0) && (
                    <p className="mt-1.5 text-[10px] font-bold leading-4 text-slate-300">
                      <span style={{ color: terminalGreen }}>const</span>{' '}
                      profile =
                      <span style={{ color: terminalAmber }}>
                        {' '}
                        "
                        {[profile.currentJobTitle, visibleSkills.slice(0, 2).join(' • ')]
                          .filter((value) => hasValue(value))
                          .join(' · ')}
                        "
                      </span>
                    </p>
                  )}
                </div>

                {hasContact && (
                  <div className="rounded-[12px] border border-sky-300/15 bg-[#020617]/70 p-3 text-[9.5px] font-semibold leading-4 text-slate-300">
                    <p className="mb-1.5 text-[8px] font-black uppercase tracking-[0.15em] text-slate-500">
                      contact.json
                    </p>

                    {hasValue(profile.email) && (
                      <p className="break-all text-amber-100">
                        {profile.email}
                      </p>
                    )}

                    {hasValue(profile.phone) && <p>{profile.phone}</p>}

                    {hasValue(profile.address) && (
                      <p className="break-words">{profile.address}</p>
                    )}

                    {hasValue(profile.linkedinPortfolio) && (
                      <p className="break-all text-sky-200">
                        {profile.linkedinPortfolio}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </header>

            {/* META ROW */}
            <section className="mt-3 grid grid-cols-[1fr_38mm] gap-3">
              {hasRecipient && (
                <div className="rounded-[11px] border border-sky-300/15 bg-[#020617]/72 px-3 py-2.5">
                  <p className="mb-1.5 text-[8px] font-black uppercase tracking-[0.15em] text-slate-500">
                    // Hiring Manager
                  </p>

                  <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[9.5px] font-semibold leading-4 text-slate-300">
                    {hasValue(recipient.name) && (
                      <p className="truncate font-black text-white">
                        {recipient.name}
                      </p>
                    )}

                    {hasValue(recipient.title) && (
                      <p className="truncate text-sky-200">
                        {recipient.title}
                      </p>
                    )}

                    {hasValue(recipient.company) && (
                      <p className="truncate text-sky-300">
                        {recipient.company}
                      </p>
                    )}

                    {hasValue(recipient.address) && (
                      <p className="truncate text-slate-400">
                        {recipient.address}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="rounded-[11px] border border-white/10 bg-[#020617]/72 px-3 py-2.5">
                <p className="mb-1.5 text-[8px] font-black uppercase tracking-[0.15em] text-slate-500">
                  date
                </p>

                <p className="text-[9.5px] font-bold leading-4 text-slate-200">
                  {formattedDate}
                </p>
              </div>
            </section>

            {/* SKILLS */}
            {visibleSkills.length > 0 && (
              <section className="mt-3 rounded-[11px] border border-white/12 bg-[#020617]/72 px-3 py-2.5">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-400">
                    / stack
                  </p>

                  <p className="text-[8px] font-bold text-slate-500">
                    {visibleSkills.length} skills
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {visibleSkills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border border-sky-300/15 bg-slate-700/50 px-2 py-0.5 text-[8.8px] font-bold leading-4 text-slate-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* BODY */}
            <section className="mt-4 rounded-[14px] border border-white/12 bg-[#020617]/78 px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.22)]">
              <div className="mb-2.5 flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2 text-[9px]">
                  <span className="text-emerald-300">➜</span>
                  <span className="font-bold text-sky-300">
                    ~/cover-letter
                  </span>
                  <span className="text-slate-400">
                    git:<span className="text-fuchsia-300">(main)</span>
                  </span>
                </div>

                <span className="rounded-full bg-sky-400/10 px-2.5 py-0.5 text-[7.8px] font-black uppercase tracking-[0.12em] text-sky-200">
                  readable
                </span>
              </div>

              <div className="rounded-[10px] bg-[#0f172a]/95 px-3.5 py-3 text-slate-100">
                <Body
                  body={props.body}
                  design={terminalDesign}
                  onUpdateBody={props.onUpdateBody}
                  className="
                    text-left text-slate-100
                    prose-p:my-1.5
                    prose-p:font-medium
                    prose-p:leading-snug
                    prose-ul:my-1.5
                    prose-li:my-0.5
                    prose-li:marker:text-sky-300
                    prose-strong:font-semibold
                    prose-strong:text-amber-200
                    [&>*:first-child]:mt-0
                    [&>*:last-child]:mb-0
                  "
                />
              </div>
            </section>

            {/* SIGNATURE */}
            {showSignature && (
              <footer
                className="
                  mt-5 border-t border-white/10 pt-4
                  text-slate-100
                  [&>div]:mt-0
                  [&_img]:h-10
                  [&_p]:text-slate-100
                "
              >
                <Signature
                  signature={signature}
                  profile={profile}
                  accent={terminalAccent}
                />
              </footer>
            )}

            {/* STATUS BAR */}
            <footer className="mt-4 flex justify-between border-t border-white/10 pt-2 text-[7.8px] font-black uppercase tracking-[0.13em] text-slate-600">
              <span>UTF-8</span>
              <span>Line 1, Column 1</span>
              <span>React / Tailwind CSS</span>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SqlTerminalTemplate;