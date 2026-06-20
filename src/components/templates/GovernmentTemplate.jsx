import React from 'react';
import { Body, ContactLines, Signature } from './ProfessionalTemplateParts';

const GovernmentTemplate = ({
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

  const accentColor = accent || design.color || '#1e293b';

  const userInitial = hasValue(profile.fullName)
    ? profile.fullName.trim().charAt(0).toUpperCase()
    : 'C';

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 6);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['Public Service', 'Policy Awareness', 'Administrative Accuracy'];

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
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.1, 10.8), 11.6),
    lineHeight: Number(design.lineHeight) || 1.44,
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const serviceValues = [
    {
      title: 'Integrity',
      body: 'Clear, reliable, and accountable communication.',
    },
    {
      title: 'Service',
      body: 'Focused on citizens, teams, and outcomes.',
    },
    {
      title: 'Process',
      body: 'Careful execution and documentation.',
    },
  ];

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-[#f8f7f2] p-[4mm] text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
        '--gov-accent': accentColor,
      }}
    >
      <div className="min-h-[289mm] overflow-hidden border border-slate-300 bg-white shadow-sm">
        {/* OFFICIAL HEADER */}
        <header className="border-b-[3px] border-slate-800 px-6 py-4">
          <div className="grid grid-cols-[12mm_1fr_48mm] items-center gap-4">
            <div className="flex h-[12mm] w-[12mm] items-center justify-center rounded-full border-[3px] border-slate-800 text-[16px] font-black text-slate-800">
              {userInitial}
            </div>

            <div>
              <p
                className="text-[8.8px] font-black uppercase tracking-[0.18em]"
                style={{ color: accentColor }}
              >
                Cover Letter
              </p>

              {hasValue(profile.fullName) && (
                <h1 className="mt-1.5 text-[26px] font-black leading-tight tracking-[-0.035em] text-slate-950">
                  {profile.fullName}
                </h1>
              )}

              {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
                <p className="mt-1.5 text-[10.4px] font-semibold leading-4 text-slate-600">
                  {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
                    .filter((value) => hasValue(value))
                    .join(' · ')}
                </p>
              )}
            </div>

            {hasContact && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-[9px] font-semibold leading-4 text-slate-600 [&_p]:break-words">
                <ContactLines profile={profile} />
              </div>
            )}
          </div>
        </header>

        <div className="grid grid-cols-[48mm_1fr] gap-5 px-6 py-5">
          {/* LEFT OFFICIAL PANEL */}
          <aside>
            {/* DATE + RECIPIENT */}
            <section className="rounded-xl border border-slate-300 bg-[#f8f7f2] px-3 py-2.5">
              <div className="border-b border-slate-300 pb-2.5">
                <p className="mb-1 text-[8px] font-black uppercase tracking-[0.15em] text-slate-400">
                  Date
                </p>

                <p className="text-[10.2px] font-bold leading-4 text-slate-800">
                  {formattedDate}
                </p>
              </div>

              {hasRecipient && (
                <div className="pt-2.5">
                  <p
                    className="mb-1 text-[8px] font-black uppercase tracking-[0.15em]"
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
                      <p className="mt-0.5 text-slate-600">
                        {recipient.address}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* PUBLIC SERVICE PROFILE */}
            <section className="mt-3.5 rounded-xl border border-slate-300 bg-white px-3 py-2.5 shadow-sm">
              <p
                className="text-[8px] font-black uppercase tracking-[0.15em]"
                style={{ color: accentColor }}
              >
                Public Service Profile
              </p>

              <p className="mt-1.5 text-[9px] font-semibold leading-4 text-slate-600">
                Formal, reliable, service-oriented communication for public
                administration, policy, and civic roles.
              </p>
            </section>

            {/* SERVICE VALUES */}
            <section className="mt-3.5">
              <SidebarTitle accentColor={accentColor}>
                Service Values
              </SidebarTitle>

              <div className="mt-2.5 space-y-1.5">
                {serviceValues.map((item, index) => (
                  <ServiceValue
                    key={item.title}
                    number={index + 1}
                    title={item.title}
                    body={item.body}
                    accentColor={accentColor}
                  />
                ))}
              </div>
            </section>

            {/* SKILLS */}
            {featuredSkills.length > 0 && (
              <section className="mt-3.5">
                <SidebarTitle accentColor={accentColor}>
                  Core Strengths
                </SidebarTitle>

                <div className="mt-2.5 space-y-1.5">
                  {featuredSkills.map((skill, index) => (
                    <div
                      key={`${skill}-${index}`}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm"
                    >
                      <p className="text-[7.5px] font-black uppercase tracking-[0.13em] text-slate-400">
                        Strength {index + 1}
                      </p>

                      <p className="mt-0.5 text-[10px] font-black leading-4 text-slate-800">
                        {skill}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {remainingSkills.length > 0 && (
              <section className="mt-3.5">
                <SidebarTitle accentColor={accentColor}>
                  Capabilities
                </SidebarTitle>

                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {remainingSkills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border px-2 py-1 text-[8px] font-black leading-tight"
                      style={{
                        borderColor: `${accentColor}45`,
                        color: accentColor,
                        backgroundColor: `${accentColor}08`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </aside>

          {/* MAIN LETTER */}
          <main>
            {/* OFFICIAL BRIEF */}
            <section className="mb-3 border-b border-slate-300 pb-2.5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p
                    className="text-[8.8px] font-black uppercase tracking-[0.16em]"
                    style={{ color: accentColor }}
                  >
                    Official Application
                  </p>

                  {(hasValue(recipient.targetRole) || hasValue(recipient.company)) && (
                    <p className="mt-0.5 text-[10.5px] font-semibold leading-4 text-slate-600">
                      {[recipient.targetRole, recipient.company]
                        .filter((value) => hasValue(value))
                        .join(' · ')}
                    </p>
                  )}
                </div>

                <div className="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 text-[7.6px] font-black uppercase tracking-[0.1em] text-slate-700">
                  Formal
                </div>
              </div>
            </section>

            {/* BODY */}
            <section className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-[0_8px_22px_rgba(15,23,42,0.03)]">
              <Body
                body={body}
                design={bodyDesign}
                onUpdateBody={onUpdateBody}
                className="
                  text-left text-slate-800
                  prose-p:my-1.5
                  prose-p:font-medium
                  prose-p:leading-snug
                  prose-ul:my-1.5
                  prose-li:my-0.5
                  prose-strong:font-semibold
                  prose-strong:text-[var(--gov-accent)]
                  [&>*:first-child]:mt-0
                  [&>*:last-child]:mb-0
                "
              />
            </section>

            {/* OFFICIAL VALUE STRIP */}
            <section className="mt-3 grid grid-cols-3 gap-2.5">
              <ValuePillar
                title="Accuracy"
                body="Careful documentation and follow-through."
                accentColor={accentColor}
              />

              <ValuePillar
                title="Service"
                body="Professional support for stakeholders."
                accentColor={accentColor}
              />

              <ValuePillar
                title="Trust"
                body="Clear judgment and responsible communication."
                accentColor={accentColor}
              />
            </section>

            {/* SIGNATURE */}
            {showSignature && (
              <footer
                className="
                  mt-4 border-t border-slate-300 pt-3.5
                  text-slate-900
                  [&>div]:mt-0
                  [&_img]:h-9
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
    className="text-[8.2px] font-black uppercase tracking-[0.15em]"
    style={{ color: accentColor }}
  >
    {children}
  </p>
);

const ServiceValue = ({ number, title, body, accentColor }) => (
  <div className="rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm">
    <div className="flex items-center gap-2">
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[7.5px] font-black text-white"
        style={{ backgroundColor: accentColor }}
      >
        {number}
      </span>

      <p className="text-[10px] font-black leading-4 text-slate-800">
        {title}
      </p>
    </div>

    <p className="mt-1 text-[8.8px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
  </div>
);

const ValuePillar = ({ title, body, accentColor }) => (
  <div
    className="rounded-xl border px-2.5 py-2"
    style={{
      borderColor: `${accentColor}24`,
      backgroundColor: `${accentColor}08`,
    }}
  >
    <p
      className="text-[8.5px] font-black uppercase tracking-[0.13em]"
      style={{ color: accentColor }}
    >
      {title}
    </p>

    <p className="mt-1 text-[9px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
  </div>
);

export default GovernmentTemplate;