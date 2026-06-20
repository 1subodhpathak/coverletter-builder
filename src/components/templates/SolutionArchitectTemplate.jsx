import React from 'react';
import {
  Body,
  ContactLines,
  RecipientBlock,
  Signature,
} from './ProfessionalTemplateParts';

const SolutionArchitectTemplate = (props) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const accentColor = props.accent || design.color || '#334155';

  const visibleSkills = (
    skills.length
      ? skills.filter((skill) => hasValue(skill))
      : ['Discovery Workshops', 'System Design', 'Delivery Leadership']
  ).slice(0, 6);

  const featuredSkills = visibleSkills.slice(0, 3);
  const remainingSkills = visibleSkills.slice(3);

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
      className="mx-auto bg-[#f8fafc] p-[4mm] text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      <div className="min-h-[289mm] border border-slate-300 bg-white shadow-sm">
        {/* HEADER */}
        <header className="grid grid-cols-[1fr_58mm] border-b border-slate-300">
          <div className="px-7 py-5">
            <div
              className="h-1.5 w-20 rounded-full"
              style={{ backgroundColor: accentColor }}
            />

            {hasValue(profile.fullName) && (
              <h1 className="mt-3 text-[29px] font-black leading-tight tracking-[-0.035em] text-slate-950">
                {profile.fullName}
              </h1>
            )}

            {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
              <p className="mt-2 max-w-[112mm] text-[10.5px] font-black uppercase leading-4 tracking-[0.13em] text-slate-500">
                {[profile.currentJobTitle, featuredSkills.slice(0, 2).join(' • ')]
                  .filter((value) => hasValue(value))
                  .join(' · ')}
              </p>
            )}
          </div>

          {hasContact && (
            <div className="border-l border-slate-300 px-5 py-5">
              <p className="mb-2 text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">
                Contact
              </p>

              <div className="text-[10px] font-semibold leading-4 text-slate-600 [&_p]:break-words">
                <ContactLines profile={profile} />
              </div>
            </div>
          )}
        </header>

        <div className="grid grid-cols-[54mm_1fr]">
          {/* SIDEBAR */}
          <aside className="border-r border-slate-300 bg-slate-50 px-5 py-5">
            {/* DATE + RECIPIENT */}
            <section className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="border-b border-slate-200 pb-3">
                <p className="mb-1.5 text-[8.8px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Date
                </p>

                <p className="text-[11px] font-bold leading-4 text-slate-800">
                  {formattedDate}
                </p>
              </div>

              {hasRecipient && (
                <div className="pt-3">
                  <p
                    className="mb-2 text-[8.8px] font-black uppercase tracking-[0.16em]"
                    style={{ color: accentColor }}
                  >
                    Recipient
                  </p>

                  <div className="[&_p]:text-[10.5px] [&_p]:leading-4">
                    <RecipientBlock recipient={recipient} />
                  </div>
                </div>
              )}
            </section>

            {/* ARCHITECTURE STRENGTHS */}
            {featuredSkills.length > 0 && (
              <section className="mt-5">
                <SidebarTitle>Architecture Focus</SidebarTitle>

                <div className="mt-3 space-y-2">
                  {featuredSkills.map((skill, index) => (
                    <div
                      key={`${skill}-${index}`}
                      className="border border-slate-300 bg-white px-3 py-2 shadow-sm"
                    >
                      <p className="text-[8px] font-black uppercase tracking-[0.14em] text-slate-400">
                        Pillar {index + 1}
                      </p>

                      <p className="mt-1 text-[10.5px] font-black leading-4 text-slate-800">
                        {skill}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ADDITIONAL SKILLS */}
            {remainingSkills.length > 0 && (
              <section className="mt-5">
                <SidebarTitle>Technical Capabilities</SidebarTitle>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {remainingSkills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[8.8px] font-black leading-tight text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* ARCHITECT NOTE */}
            <section className="mt-5 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p
                className="text-[8.8px] font-black uppercase tracking-[0.16em]"
                style={{ color: accentColor }}
              >
                Approach
              </p>

              <p className="mt-2 text-[9.5px] font-semibold leading-4 text-slate-600">
                Translating business needs into scalable, practical, and
                delivery-ready technical solutions.
              </p>
            </section>
          </aside>

          {/* MAIN CONTENT */}
          <main className="px-7 py-6">
            <section className="mb-4 border-b border-slate-200 pb-3">
              <p
                className="text-[9.2px] font-black uppercase tracking-[0.18em]"
                style={{ color: accentColor }}
              >
                Cover Letter
              </p>

              {(hasValue(recipient.targetRole) || hasValue(recipient.company)) && (
                <p className="mt-1.5 text-[11px] font-semibold leading-4 text-slate-600">
                  {[recipient.targetRole, recipient.company]
                    .filter((value) => hasValue(value))
                    .join(' · ')}
                </p>
              )}
            </section>

            {/* BODY */}
            <section className="rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.035)]">
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
                  prose-strong:text-slate-950
                  [&>*:first-child]:mt-0
                  [&>*:last-child]:mb-0
                "
              />
            </section>

            {/* SOLUTION VALUE PILLARS */}
            <section className="mt-4 grid grid-cols-3 gap-3">
              <ValuePillar
                title="Discovery"
                body="Clarifies goals, constraints, users, and risks."
              />

              <ValuePillar
                title="Design"
                body="Creates scalable patterns for quality delivery."
              />

              <ValuePillar
                title="Delivery"
                body="Aligns teams, decisions, and execution plans."
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
                  accent={accentColor}
                />
              </footer>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const SidebarTitle = ({ children }) => (
  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">
    {children}
  </p>
);

const ValuePillar = ({ title, body }) => (
  <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
    <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-700">
      {title}
    </p>

    <p className="mt-1.5 text-[9.5px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
  </div>
);

export default SolutionArchitectTemplate;