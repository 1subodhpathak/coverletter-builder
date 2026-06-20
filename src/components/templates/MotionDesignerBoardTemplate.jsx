import React from 'react';
import { Body, Signature, getProfilePhoto } from './ProfessionalTemplateParts';

const MotionDesignerBoardTemplate = (props) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const photo = getProfilePhoto(profile);

  const accentColor = props.accent || design.color || '#0f9f5f';
  const yellowAccent = '#facc15';
  const roseAccent = '#e11d48';

  const visibleSkills = skills.filter((skill) => hasValue(skill)).slice(0, 8);

  const bodyDesign = {
    ...design,
    fontFamily:
      design.fontFamily ||
      '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.4, 11.0), 11.8),
    lineHeight: Math.min(Number(design.lineHeight) || 1.58, 1.46),
  };

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

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const contactItems = [
    profile.phone,
    profile.email,
    profile.address,
    profile.linkedinPortfolio,
  ].filter((value) => hasValue(value));

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-[#f4f2ea] p-[5mm] shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      <div className="relative min-h-[287mm] bg-[#f7f5ed]">
        {/* STORYBOARD GRID BACKGROUND */}
        <div className="pointer-events-none absolute inset-0 opacity-55 [background-image:linear-gradient(#e3dfd2_1px,transparent_1px),linear-gradient(90deg,#e3dfd2_1px,transparent_1px)] [background-size:5mm_5mm]" />

        <div className="relative z-10 px-[5mm] py-[5mm]">
          {/* HEADER */}
          <header className="grid grid-cols-[1fr_46mm] gap-5">
            <section className="rounded-[18px] border-2 border-slate-800 bg-[#fffef8]/98 p-5 shadow-[6px_6px_0_rgba(15,23,42,0.14)]">
              <div className="grid grid-cols-[32mm_1fr] gap-5">
                <div className="rounded-[16px] p-2" style={{ backgroundColor: yellowAccent }}>
                  <img
                    src={photo}
                    alt={`${profile.fullName || 'Profile'} profile`}
                    className="h-[34mm] w-full rounded-[10px] object-cover shadow-sm"
                  />
                </div>

                <div className="min-w-0">
                  {hasValue(profile.fullName) && (
                    <h1 className="text-[27px] font-black uppercase leading-tight tracking-[-0.03em] text-slate-950">
                      {profile.fullName}
                    </h1>
                  )}

                  <p
                    className="mt-2 text-[10px] font-black uppercase tracking-[0.14em]"
                    style={{ color: accentColor }}
                  >
                    Application Storyboard
                  </p>

                  {(hasValue(profile.currentJobTitle) || visibleSkills.length > 0) && (
                    <p className="mt-2 max-w-[105mm] text-[11px] font-semibold leading-4 text-slate-700">
                      {[profile.currentJobTitle, visibleSkills.slice(0, 3).join(' • ')]
                        .filter((value) => hasValue(value))
                        .join(' · ')}
                    </p>
                  )}

                  <p className="mt-2 max-w-[105mm] text-[10.5px] font-semibold leading-4 text-slate-600">
                    A polished visual cover letter built around clear storytelling,
                    focused outcomes, and memorable presentation.
                  </p>
                </div>
              </div>

              {/* CONTACT ROW */}
              {hasContact && (
                <div className="mt-4 border-t border-slate-200 pt-3">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[9.5px] font-black uppercase leading-4 text-slate-700">
                    {contactItems.map((item, index) => (
                      <span
                        key={`${item}-${index}`}
                        className={index === 1 || index === 3 ? 'break-all' : ''}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* RECIPIENT CARD */}
            <aside className="rotate-1 rounded-[18px] border border-rose-200 bg-rose-50/95 p-4 shadow-[0_12px_25px_rgba(136,19,55,0.10)]">
              <p className="text-[11px] font-black italic leading-4 text-rose-700">
                “Focused, measurable, and ready to move the work forward.”
              </p>

              <div className="mt-4 h-px w-full bg-rose-200" />

              {hasRecipient && (
                <div className="mt-4 space-y-3">
                  {hasValue(recipient.name) && (
                    <InfoRow label="To" value={recipient.name} accent={roseAccent} />
                  )}

                  {hasValue(recipient.company) && (
                    <InfoRow label="Company" value={recipient.company} accent={roseAccent} />
                  )}

                  {hasValue(recipient.title) && (
                    <InfoRow label="Role / Title" value={recipient.title} accent={roseAccent} />
                  )}

                  {hasValue(recipient.address) && (
                    <InfoRow label="Location" value={recipient.address} accent={roseAccent} />
                  )}
                </div>
              )}

              <div className="mt-4 rounded-[14px] bg-white/70 px-3 py-2 text-[9.5px] font-bold text-slate-600">
                {formattedDate}
              </div>
            </aside>
          </header>

          {/* MAIN CONTENT */}
          <main className="mt-6 grid grid-cols-[1fr_50mm] gap-6">
            {/* LETTER AREA */}
            <section>
              <BoardLabel accentColor={yellowAccent}>Cover Letter</BoardLabel>

              <div className="mt-3 rounded-[20px] border border-slate-200 bg-[#fffef8]/98 px-5 py-4 shadow-sm">
                <Body
                  body={props.body}
                  design={bodyDesign}
                  onUpdateBody={props.onUpdateBody}
                  className="
                    text-left text-slate-800
                    prose-p:my-2
                    prose-p:font-medium
                    prose-p:leading-relaxed
                    prose-ul:my-2
                    prose-li:my-1
                    prose-strong:font-semibold
                    prose-strong:text-emerald-700
                    [&>*:first-child]:mt-0
                    [&>*:last-child]:mb-0
                  "
                />
              </div>

              {/* SIGNATURE - NATURAL FLOW */}
              {showSignature && (
                <footer
                  className="
                    mt-6 border-t border-slate-200 pt-4
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
            </section>

            {/* RIGHT SIDEBAR */}
            <aside>
              {visibleSkills.length > 0 && (
                <section>
                  <BoardLabel accentColor={yellowAccent}>Focus Areas</BoardLabel>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {visibleSkills.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className={`${pillColors[index % pillColors.length]} rounded-full px-2.5 py-1 text-[9.5px] font-black uppercase leading-tight tracking-[0.04em] text-slate-900 shadow-sm`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              <section className="mt-6">
                <BoardLabel accentColor={yellowAccent}>Storyboard Notes</BoardLabel>

                <div className="mt-3 space-y-2.5 text-[10px] font-semibold leading-4 text-slate-700">
                  <NoteCard color="bg-blue-50">
                    Lead with outcomes, metrics, and the strongest reason for fit.
                  </NoteCard>

                  <NoteCard color="bg-emerald-50">
                    Keep the story visually memorable while preserving readability.
                  </NoteCard>

                  <NoteCard color="bg-amber-50">
                    Use clear scan points so the hiring team can understand value quickly.
                  </NoteCard>

                  <NoteCard color="bg-purple-50">
                    Align every detail with the role, company, and application narrative.
                  </NoteCard>
                </div>
              </section>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, accent }) => (
  <div>
    <p className="text-[8.5px] font-black uppercase tracking-[0.14em] text-slate-500">
      {label}
    </p>

    <p
      className="mt-1 break-words text-[11px] font-black uppercase leading-4"
      style={{ color: accent }}
    >
      {value}
    </p>
  </div>
);

const BoardLabel = ({ children, accentColor }) => (
  <span
    className="inline-flex px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-slate-950 shadow-[3px_3px_0_rgba(15,23,42,0.12)]"
    style={{ backgroundColor: accentColor }}
  >
    {children}
  </span>
);

const NoteCard = ({ color, children }) => (
  <p className={`rounded-[14px] p-3 ${color}`}>
    {children}
  </p>
);

const pillColors = [
  'bg-red-200',
  'bg-orange-200',
  'bg-yellow-200',
  'bg-emerald-200',
  'bg-blue-200',
  'bg-violet-200',
];

export default MotionDesignerBoardTemplate;
