import React from 'react';
import { Body, ContactLines, Signature } from './ProfessionalTemplateParts';

const SlateLeadershipTemplate = (props) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const accentColor = props.accent || design.color || '#334155';

  const visibleSkills = skills.filter((skill) => hasValue(skill)).slice(0, 6);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['Executive Leadership', 'Strategic Planning', 'Team Alignment'];

  const remainingSkills = visibleSkills.slice(3);

  const contactParts = [
    profile.email,
    profile.phone,
    profile.address,
    profile.linkedinPortfolio,
  ].filter((value) => hasValue(value));

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
      className="mx-auto bg-slate-100 p-[4mm] text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      <div className="min-h-[289mm] bg-white px-8 py-7 shadow-sm">
        {/* HEADER */}
        <header
          className="border-l-[8px] pl-5"
          style={{ borderColor: accentColor }}
        >
          <div
            className="h-1.5 w-16 rounded-full"
            style={{ backgroundColor: accentColor }}
          />

          <p
            className="mt-3 text-[9.2px] font-black uppercase tracking-[0.2em]"
            style={{ color: accentColor }}
          >
            Cover Letter
          </p>

          {hasValue(profile.fullName) && (
            <h1 className="mt-2 text-[30px] font-black leading-tight tracking-[-0.04em] text-slate-950">
              {profile.fullName}
            </h1>
          )}

          {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
            <p className="mt-2 max-w-[145mm] text-[11px] font-semibold leading-4 text-slate-600">
              {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
                .filter((value) => hasValue(value))
                .join(' · ')}
            </p>
          )}

          {contactParts.length > 0 && (
            <p className="mt-3 flex flex-wrap gap-x-2 gap-y-0.5 text-[10.5px] font-semibold leading-4 text-slate-600">
              {contactParts.map((part, index) => (
                <React.Fragment key={`${part}-${index}`}>
                  {index > 0 && <span className="text-slate-300">•</span>}
                  <span className="break-words">{part}</span>
                </React.Fragment>
              ))}
            </p>
          )}
        </header>

        {/* MAIN LAYOUT */}
        <div className="mt-6 grid grid-cols-[1fr_50mm] gap-6">
          {/* MAIN BODY */}
          <main>
            {/* DATE + RECIPIENT */}
            <section className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="grid grid-cols-[34mm_1fr] gap-5">
                <div className="border-r border-slate-200 pr-4">
                  <p className="mb-1.5 text-[8.8px] font-black uppercase tracking-[0.16em] text-slate-400">
                    Date
                  </p>

                  <p className="text-[11px] font-bold leading-4 text-slate-800">
                    {formattedDate}
                  </p>
                </div>

                {hasRecipient && (
                  <div>
                    <p
                      className="mb-1.5 text-[8.8px] font-black uppercase tracking-[0.16em]"
                      style={{ color: accentColor }}
                    >
                      Recipient
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

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-5">
            {/* CONTACT */}
            {hasContact && (
              <section className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <SidebarTitle accentColor={accentColor}>Contact</SidebarTitle>

                <div className="mt-3 text-[10px] font-semibold leading-4 text-slate-600 [&_p]:break-words">
                  <ContactLines profile={profile} />
                </div>
              </section>
            )}

            {/* LEADERSHIP FOCUS */}
            {featuredSkills.length > 0 && (
              <section>
                <SidebarTitle accentColor={accentColor}>
                  Leadership Focus
                </SidebarTitle>

                <div className="mt-3 space-y-2">
                  {featuredSkills.map((skill, index) => (
                    <div
                      key={`${skill}-${index}`}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
                    >
                      <p className="text-[8px] font-black uppercase tracking-[0.14em] text-slate-400">
                        Focus {index + 1}
                      </p>

                      <p className="mt-1 text-[10.5px] font-black leading-4 text-slate-800">
                        {skill}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CAPABILITIES */}
            {remainingSkills.length > 0 && (
              <section>
                <SidebarTitle accentColor={accentColor}>
                  Capabilities
                </SidebarTitle>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {remainingSkills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border px-2.5 py-1 text-[8.8px] font-black leading-tight"
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

            {/* LEADERSHIP PILLARS */}
            <section>
              <SidebarTitle accentColor={accentColor}>
                Leadership Pillars
              </SidebarTitle>

              <div className="mt-3 space-y-2">
                <Pillar
                  title="Strategy"
                  body="Sets direction and aligns teams around priorities."
                />

                <Pillar
                  title="Execution"
                  body="Turns plans into action, accountability, and delivery."
                />

                <Pillar
                  title="Influence"
                  body="Builds trust and leads stakeholders with clarity."
                />
              </div>
            </section>
          </aside>
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

const Pillar = ({ title, body }) => (
  <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
    <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-700">
      {title}
    </p>

    <p className="mt-1.5 text-[9.5px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
  </div>
);

export default SlateLeadershipTemplate;