import React from 'react';
import {
  Body,
  ContactLines,
  Signature,
} from './ProfessionalTemplateParts';

const OperationsSlateTemplate = (props) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const accentColor = props.accent || design.color || '#567C8D';
  const sidebarColor = '#2F4156';

  const visibleSkills = (
    skills.length
      ? skills.filter((skill) => hasValue(skill))
      : ['Operational Planning', 'Scalable Systems', 'SLA Ownership', 'Risk Control']
  ).slice(0, 8);

  const featuredSkills = visibleSkills.slice(0, 4);
  const remainingSkills = visibleSkills.slice(4);

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
      className="mx-auto grid bg-white text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        gridTemplateColumns: '64mm 1fr',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      {/* LEFT SIDEBAR */}
      <aside
        className="px-6 py-7 text-white"
        style={{ backgroundColor: sidebarColor }}
      >
        <div className="h-px w-20 bg-white/55" />

        {hasValue(profile.fullName) && (
          <h1 className="mt-6 text-[30px] font-black leading-tight tracking-[-0.035em] text-white">
            {profile.fullName}
          </h1>
        )}

        {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
          <p className="mt-3 text-[10px] font-black uppercase leading-4 tracking-[0.14em] text-white/65">
            {[profile.currentJobTitle, featuredSkills.slice(0, 2).join(' • ')]
              .filter((value) => hasValue(value))
              .join(' · ')}
          </p>
        )}

        <div className="my-6 h-px bg-white/35" />

        {/* CONTACT */}
        {hasContact && (
          <section>
            <SidebarTitle>Contact</SidebarTitle>

            <div className="mt-3 text-white/90 [&_p]:break-words">
              <ContactLines profile={profile} dark />
            </div>
          </section>
        )}

        {/* OPERATIONS FOCUS */}
        {featuredSkills.length > 0 && (
          <section className="mt-7">
            <SidebarTitle>Operations Focus</SidebarTitle>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {featuredSkills.map((skill, index) => (
                <div
                  key={`${skill}-${index}`}
                  className="border border-white/10 bg-white/10 px-2.5 py-2.5"
                >
                  <p className="text-[8.5px] font-black uppercase tracking-[0.14em] text-white/45">
                    Area {index + 1}
                  </p>

                  <p className="mt-1 text-[10px] font-black leading-4 text-white">
                    {skill}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ADDITIONAL CAPABILITIES */}
        {remainingSkills.length > 0 && (
          <section className="mt-7">
            <SidebarTitle>Capabilities</SidebarTitle>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {remainingSkills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[9.5px] font-black leading-tight text-white/90"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* NOTE */}
        <section className="mt-7 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
          <p className="text-[10px] font-semibold leading-4 text-white/78">
            Built for operational leaders who bring structure, accountability,
            execution rhythm, and measurable process improvement.
          </p>
        </section>
      </aside>

      {/* MAIN CONTENT */}
      <main className="px-10 py-9">
        {/* HEADER */}
        <header className="border-b border-slate-200 pb-5">
          <p
            className="text-[11px] font-black uppercase tracking-[0.22em]"
            style={{ color: accentColor }}
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
                <p
                  className="mb-1.5 text-[9.5px] font-black uppercase tracking-[0.16em]"
                  style={{ color: accentColor }}
                >
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
        <section className="mt-6 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
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
              prose-strong:text-slate-950
              [&>*:first-child]:mt-0
              [&>*:last-child]:mb-0
            "
          />
        </section>

        {/* OPERATIONS VALUE PILLARS */}
        <section className="mt-6 grid grid-cols-3 gap-3">
          <ValuePillar
            title="Plan"
            body="Builds clear operating models, priorities, and measurable execution plans."
          />

          <ValuePillar
            title="Control"
            body="Improves accountability, risk visibility, SLAs, and process governance."
          />

          <ValuePillar
            title="Scale"
            body="Creates systems and workflows that support growth without losing quality."
          />
        </section>

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
      </main>
    </div>
  );
};

const SidebarTitle = ({ children }) => (
  <p className="text-[10.5px] font-black uppercase tracking-[0.2em] text-white/60">
    {children}
  </p>
);

const ValuePillar = ({ title, body }) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
    <p className="text-[10.5px] font-black uppercase tracking-[0.16em] text-slate-700">
      {title}
    </p>

    <p className="mt-2 text-[11.5px] font-semibold leading-5 text-slate-600">
      {body}
    </p>
  </div>
);

export default OperationsSlateTemplate;
