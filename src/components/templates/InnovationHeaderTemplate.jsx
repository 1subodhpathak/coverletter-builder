import React from 'react';
import {
  Body,
  ContactLines,
  Signature,
} from './ProfessionalTemplateParts';

const InnovationHeaderTemplate = (props) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const accentColor = props.accent || design.color || '#0369a1';

  const visibleSkills = skills.filter((skill) => hasValue(skill)).slice(0, 6);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['Innovation Strategy', 'Cross-functional Execution', 'Product Thinking'];

  const remainingSkills = visibleSkills.slice(3);

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
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.1, 10.7), 11.5),
    lineHeight: Math.min(Number(design.lineHeight) || 1.48, 1.42),
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-sky-50 p-[2mm] text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      <div className="min-h-[293mm] overflow-hidden bg-white shadow-sm">
        {/* HEADER */}
        <header className="relative border-b border-sky-100 px-5 py-4">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border-[22px] border-sky-100" />
          <div className="absolute right-16 top-8 h-12 w-12 rounded-full border-[10px] border-sky-50" />

          <div className="relative z-10">
            <div
              className="h-1.5 w-20 rounded-full"
              style={{ backgroundColor: accentColor }}
            />

            <p
              className="mt-2 text-[8.8px] font-black uppercase tracking-[0.16em]"
              style={{ color: accentColor }}
            >
              Cover Letter
            </p>

            {hasValue(profile.fullName) && (
              <h1 className="mt-2 max-w-[128mm] text-[27px] font-black leading-tight tracking-[-0.04em] text-slate-950">
                {profile.fullName}
              </h1>
            )}

            {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
              <p className="mt-1.5 max-w-[135mm] text-[10.5px] font-semibold leading-4 text-slate-600">
                {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
                  .filter((value) => hasValue(value))
                  .join(' · ')}
              </p>
            )}
          </div>
        </header>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-[46mm_1fr] gap-4 px-5 py-4">
          {/* LEFT SIDEBAR */}
          <aside>
            {hasContact && (
              <section>
                <SidebarTitle accentColor={accentColor}>Contact</SidebarTitle>

                <div className="mt-2.5 text-[9.5px] font-semibold leading-4 text-slate-600 [&_p]:break-words">
                  <ContactLines profile={profile} />
                </div>
              </section>
            )}

            {/* DATE + RECIPIENT */}
            <section className="mt-4 rounded-xl border border-sky-100 bg-sky-50/70 px-3.5 py-2.5">
              <div className="border-b border-sky-100 pb-2.5">
                <p className="mb-1 text-[8.4px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Date
                </p>

                <p className="text-[10.5px] font-bold leading-4 text-slate-800">
                  {formattedDate}
                </p>
              </div>

              {hasRecipient && (
                <div className="pt-2.5">
                  <p
                    className="mb-1 text-[8.4px] font-black uppercase tracking-[0.14em]"
                    style={{ color: accentColor }}
                  >
                    Recipient
                  </p>

                  <div className="text-[10px] font-semibold leading-4 text-slate-700">
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
            </section>

            {/* INNOVATION PILLARS */}
            <section className="mt-4">
              <SidebarTitle accentColor={accentColor}>
                Innovation Pillars
              </SidebarTitle>

              <div className="mt-2.5 space-y-1.5">
                <ValuePillar
                  title="Explore"
                  body="Identify opportunities, constraints, and unmet needs."
                />

                <ValuePillar
                  title="Build"
                  body="Turn ideas into practical plans, products, or processes."
                />

                <ValuePillar
                  title="Scale"
                  body="Move concepts into measurable business value."
                />
              </div>
            </section>

            {/* INNOVATION FOCUS */}
            {featuredSkills.length > 0 && (
            <section className="mt-4">
                <SidebarTitle accentColor={accentColor}>
                  Innovation Focus
                </SidebarTitle>

                <div className="mt-2.5 space-y-1.5">
                  {featuredSkills.map((skill, index) => (
                    <div
                      key={`${skill}-${index}`}
                      className="rounded-xl border border-sky-100 bg-white px-3 py-1.5 shadow-sm"
                    >
                      <p className="text-[8px] font-black uppercase tracking-[0.14em] text-slate-400">
                        Focus {index + 1}
                      </p>

                      <p className="mt-1 text-[10px] font-black leading-4 text-slate-800">
                        {skill}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ADDITIONAL SKILLS */}
            {remainingSkills.length > 0 && (
            <section className="mt-4">
                <SidebarTitle accentColor={accentColor}>
                  Capabilities
                </SidebarTitle>

                <div className="mt-2.5 flex flex-wrap gap-1">
                  {remainingSkills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border px-2 py-1 text-[8.3px] font-black leading-tight"
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
          <main>
            <section className="mb-3 border-b border-slate-200 pb-2.5">
              <p
                className="text-[9.2px] font-black uppercase tracking-[0.18em]"
                style={{ color: accentColor }}
              >
                Application Narrative
              </p>

              {(hasValue(recipient.targetRole) || hasValue(recipient.company)) && (
                <p className="mt-1 text-[10.5px] font-semibold leading-4 text-slate-600">
                  {[recipient.targetRole, recipient.company]
                    .filter((value) => hasValue(value))
                    .join(' · ')}
                </p>
              )}
            </section>

            {/* BODY */}
            <section className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-[0_10px_26px_rgba(15,23,42,0.035)]">
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
                  prose-strong:text-sky-800
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

const SidebarTitle = ({ children, accentColor }) => (
  <p
    className="text-[9px] font-black uppercase tracking-[0.18em]"
    style={{ color: accentColor }}
  >
    {children}
  </p>
);

const ValuePillar = ({ title, body }) => (
  <div className="rounded-xl border border-sky-100 bg-sky-50/60 px-3 py-2.5">
    <p className="text-[9px] font-black uppercase tracking-[0.14em] text-sky-700">
      {title}
    </p>

    <p className="mt-1.5 text-[9.5px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
  </div>
);

export default InnovationHeaderTemplate;
