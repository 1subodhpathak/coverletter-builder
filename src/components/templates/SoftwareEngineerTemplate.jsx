import React from 'react';
import { Body, Signature } from './ProfessionalTemplateParts';

const SoftwareEngineerTemplate = (props) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const accentColor = props.accent || design.color || '#67e8f9';

  const visibleSkills = skills.filter((skill) => hasValue(skill)).slice(0, 10);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['Systems Thinking', 'Product Engineering', 'Reliable Delivery'];

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
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.6, 11.1), 11.9),
    lineHeight: Math.min(Number(design.lineHeight) || 1.58, 1.46),
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto grid bg-[#f8fafc] text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        gridTemplateColumns: '64mm 1fr',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      {/* LEFT SIDEBAR */}
      <aside className="bg-slate-950 px-6 py-7 text-slate-100">
        <div
          className="h-2 w-20 rounded-full"
          style={{ backgroundColor: accentColor }}
        />

        {hasValue(profile.fullName) && (
          <h1 className="mt-6 text-[29px] font-black leading-tight tracking-[-0.035em] text-white">
            {profile.fullName}
          </h1>
        )}

        {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
          <p className="mt-3 text-[10px] font-black uppercase leading-4 tracking-[0.14em] text-slate-400">
            {[profile.currentJobTitle, featuredSkills.slice(0, 2).join(' • ')]
              .filter((value) => hasValue(value))
              .join(' · ')}
          </p>
        )}

        {/* CONTACT */}
        {hasContact && (
          <section className="mt-6 rounded-2xl border border-cyan-300/25 bg-white/5 px-4 py-3">
            <SidebarTitle color={accentColor}>Contact</SidebarTitle>

            <div className="mt-3 space-y-1.5 text-[10.5px] font-semibold leading-4 text-slate-300">
              {hasValue(profile.email) && (
                <p className="break-all text-cyan-100">{profile.email}</p>
              )}

              {hasValue(profile.phone) && <p>{profile.phone}</p>}

              {hasValue(profile.address) && (
                <p className="break-words">{profile.address}</p>
              )}

              {hasValue(profile.linkedinPortfolio) && (
                <p className="break-all text-cyan-200">
                  {profile.linkedinPortfolio}
                </p>
              )}
            </div>
          </section>
        )}

        {/* ENGINEERING FOCUS */}
        <section className="mt-7 border-l-2 pl-3.5" style={{ borderColor: accentColor }}>
          <SidebarTitle color={accentColor}>Engineering Focus</SidebarTitle>

          <div className="mt-3 space-y-2.5">
            {featuredSkills.map((skill, index) => (
              <div key={`${skill}-${index}`}>
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-500">
                  Principle {index + 1}
                </p>

                <p className="mt-1 text-[11px] font-bold leading-4 text-slate-200">
                  {skill}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* TECH STACK */}
        {remainingSkills.length > 0 && (
          <section className="mt-7">
            <SidebarTitle color={accentColor}>Tech Stack</SidebarTitle>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {remainingSkills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-[9.5px] font-black leading-tight text-cyan-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ENGINEERING NOTE */}
        <section className="mt-7 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-[10px] font-semibold leading-4 text-slate-300">
            Focused on building reliable systems, writing maintainable code,
            and delivering software that creates measurable product value.
          </p>
        </section>
      </aside>

      {/* MAIN CONTENT */}
      <main className="px-10 py-9">
        {/* HEADER */}
        <header className="border-b border-slate-300 pb-5">
          <p
            className="text-[11px] font-black uppercase tracking-[0.22em]"
            style={{ color: '#0891b2' }}
          >
            Cover Letter
          </p>

          {(hasValue(recipient.targetRole) || hasValue(recipient.company)) && (
            <p className="mt-2 text-[11.5px] font-semibold leading-4 text-slate-600">
              {[recipient.targetRole, recipient.company]
                .filter((value) => hasValue(value))
                .join(' · ')}
            </p>
          )}
        </header>

        {/* COMPACT DATE + RECIPIENT */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <div className="grid grid-cols-[36mm_1fr] gap-5">
            <div className="border-r border-slate-200 pr-4">
              <p className="mb-1.5 text-[9.5px] font-black uppercase tracking-[0.16em] text-slate-400">
                Date
              </p>

              <p className="text-[11.5px] font-bold leading-4 text-slate-800">
                {formattedDate}
              </p>
            </div>

            {hasRecipient && (
              <div>
                <p className="mb-1.5 text-[9.5px] font-black uppercase tracking-[0.16em] text-cyan-700">
                  Recipient
                </p>

                <div className="text-[11.5px] font-semibold leading-4 text-slate-700">
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
        <main className="mt-6 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
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
              prose-strong:text-cyan-800
              [&>*:first-child]:mt-0
              [&>*:last-child]:mb-0
            "
          />
        </main>

        {/* ENGINEERING VALUE PILLARS */}
        <section className="mt-6 grid grid-cols-3 gap-3">
          <ValuePillar
            title="Build"
            body="Develops clean, maintainable, and production-ready software."
          />

          <ValuePillar
            title="Scale"
            body="Designs systems with reliability, performance, and growth in mind."
          />

          <ValuePillar
            title="Deliver"
            body="Works closely with teams to ship practical solutions on time."
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
              accent="#0891b2"
            />
          </footer>
        )}
      </main>
    </div>
  );
};

const SidebarTitle = ({ children, color }) => (
  <p
    className="text-[10.5px] font-black uppercase tracking-[0.2em]"
    style={{ color }}
  >
    {children}
  </p>
);

const ValuePillar = ({ title, body }) => (
  <div className="rounded-2xl border border-cyan-100 bg-cyan-50/60 px-4 py-3">
    <p className="text-[10.5px] font-black uppercase tracking-[0.16em] text-cyan-700">
      {title}
    </p>

    <p className="mt-2 text-[11.5px] font-semibold leading-5 text-slate-600">
      {body}
    </p>
  </div>
);

export default SoftwareEngineerTemplate;
