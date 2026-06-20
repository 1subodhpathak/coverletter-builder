import React from 'react';
import { Body, ContactLines, Signature } from './ProfessionalTemplateParts';

const SalesExecutiveTemplate = ({
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

  const accentColor = accent || design.color || '#e11d48';

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 6);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['Pipeline Growth', 'Revenue Generation', 'Deal Closing'];

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
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.1, 10.7), 11.5),
    lineHeight: Math.min(Number(design.lineHeight) || 1.48, 1.42),
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const salesFlow = [
    {
      title: 'Pipeline',
      body: 'Builds qualified opportunities and keeps momentum active.',
    },
    {
      title: 'Revenue',
      body: 'Focuses on targets and measurable outcomes.',
    },
    {
      title: 'Retention',
      body: 'Strengthens client trust through follow-through.',
    },
    {
      title: 'Growth',
      body: 'Expands accounts through relationship-led selling.',
    },
  ];

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-white text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
        '--sales-accent': accentColor,
      }}
    >
      <div className="px-6 py-5">
        {/* HEADER */}
        <header
          className="relative overflow-hidden rounded-[20px] px-4 py-3.5 text-white"
          style={{
            background: `linear-gradient(135deg, ${accentColor} 0%, #881337 78%)`,
          }}
        >
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10" />
          <div className="absolute bottom-0 right-14 h-14 w-32 rounded-t-[32px] bg-white/10" />

          <div className="relative z-10 grid grid-cols-[1fr_46mm] items-start gap-4">
            <div>
              <div className="h-1.5 w-20 rounded-full bg-white/70" />

              <p className="mt-2 text-[8.8px] font-black uppercase tracking-[0.16em] text-white/72">
                Cover Letter
              </p>

              {hasValue(profile.fullName) && (
                <h1 className="mt-2 text-[27px] font-black leading-tight tracking-[-0.04em] text-white">
                  {profile.fullName}
                </h1>
              )}

              {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
                <p className="mt-1.5 max-w-[118mm] text-[10.5px] font-semibold leading-4 text-white/82">
                  {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
                    .filter((value) => hasValue(value))
                    .join(' · ')}
                </p>
              )}
            </div>

            {hasContact && (
              <div className="rounded-xl border border-white/15 bg-white/10 p-2.5 text-[9px] font-semibold leading-4 text-white/86 backdrop-blur-sm [&_p]:break-words">
                <ContactLines profile={profile} dark />
              </div>
            )}
          </div>
        </header>

        {/* SALES FLOW */}
        <section className="my-3 grid grid-cols-4 gap-1.5">
          {salesFlow.map((item, index) => (
            <SalesStep
              key={item.title}
              index={index}
              title={item.title}
              body={item.body}
              accentColor={accentColor}
            />
          ))}
        </section>

        <div className="grid grid-cols-[1fr_42mm] gap-4">
          {/* MAIN LETTER */}
          <main>
            <section
              className="mb-3 flex items-center gap-2 border-b pb-2.5"
              style={{ borderColor: `${accentColor}22` }}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: accentColor }}
              />

              <div>
                <p
                  className="text-[9.2px] font-black uppercase tracking-[0.18em]"
                  style={{ color: accentColor }}
                >
                  Sales Narrative
                </p>

                {(hasValue(recipient.targetRole) || hasValue(recipient.company)) && (
                  <p className="mt-1 text-[11px] font-semibold leading-4 text-slate-600">
                    {[recipient.targetRole, recipient.company]
                      .filter((value) => hasValue(value))
                      .join(' · ')}
                  </p>
                )}
              </div>
            </section>

            {/* BODY */}
            <section
              className="rounded-2xl border bg-white px-4 py-3 shadow-[0_10px_26px_rgba(15,23,42,0.035)]"
              style={{ borderColor: `${accentColor}14` }}
            >
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
                  prose-strong:text-rose-700
                  [&>*:first-child]:mt-0
                  [&>*:last-child]:mb-0
                "
              />
            </section>

            {/* VALUE STRIP */}
            <section className="mt-3 grid grid-cols-3 gap-2.5">
              <ValuePillar
                title="Prospect"
                body="Identifies opportunities and opens strong conversations."
                accentColor={accentColor}
              />

              <ValuePillar
                title="Convert"
                body="Moves deals forward with confidence and clarity."
                accentColor={accentColor}
              />

              <ValuePillar
                title="Retain"
                body="Builds relationships that support repeat business."
                accentColor={accentColor}
              />
            </section>

            {/* SIGNATURE */}
            {showSignature && (
              <footer
                className="
                  mt-4 border-t border-slate-200 pt-3
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
          <aside>
            {/* DATE + RECIPIENT */}
            <section className="rounded-xl border border-rose-100 bg-rose-50/70 px-4 py-3">
              <div className="border-b border-rose-100 pb-3">
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
                    className="mb-1.5 text-[8.8px] font-black uppercase tracking-[0.16em]"
                    style={{ color: accentColor }}
                  >
                    Recipient
                  </p>

                  <div className="text-[10.5px] font-semibold leading-4 text-slate-700">
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

            {/* SALES PROFILE */}
            <section className="mt-4 rounded-xl border border-rose-100 bg-white px-3 py-3 shadow-sm">
              <p
                className="text-[8.8px] font-black uppercase tracking-[0.16em]"
                style={{ color: accentColor }}
              >
                Sales Profile
              </p>

              <p className="mt-2 text-[9.5px] font-semibold leading-4 text-slate-600">
                Revenue-focused communication built around pipeline discipline,
                client relationships, target ownership, and closing execution.
              </p>
            </section>

            {/* CORE SKILLS */}
            {featuredSkills.length > 0 && (
              <section className="mt-4">
                <SidebarTitle accentColor={accentColor}>
                  Sales Strengths
                </SidebarTitle>

                <div className="mt-3 space-y-2">
                  {featuredSkills.map((skill, index) => (
                    <div
                      key={`${skill}-${index}`}
                      className="rounded-xl border border-rose-100 bg-white px-3 py-2.5 shadow-sm"
                    >
                      <p className="text-[7.8px] font-black uppercase tracking-[0.13em] text-rose-400">
                        Driver {index + 1}
                      </p>

                      <p className="mt-1 text-[10.2px] font-black leading-4 text-slate-800">
                        {skill}
                      </p>

                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-rose-100">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(94, 72 + index * 7)}%`,
                            backgroundColor: accentColor,
                          }}
                        />
                      </div>
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
          </aside>
        </div>
      </div>
    </div>
  );
};

const SalesStep = ({ index, title, body, accentColor }) => (
  <div
    className="rounded-xl border-t-4 bg-rose-50 px-3 py-3 shadow-sm"
    style={{ borderTopColor: accentColor }}
  >
    <p className="text-[8px] font-black uppercase tracking-[0.14em] text-rose-400">
      0{index + 1}
    </p>

    <p className="mt-1.5 text-[10.5px] font-black leading-4 text-slate-800">
      {title}
    </p>

    <p className="mt-1.5 text-[9.3px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
  </div>
);

const SidebarTitle = ({ children, accentColor }) => (
  <p
    className="text-[8.8px] font-black uppercase tracking-[0.16em]"
    style={{ color: accentColor }}
  >
    {children}
  </p>
);

const ValuePillar = ({ title, body, accentColor }) => (
  <div
    className="rounded-xl border px-3 py-2.5"
    style={{
      borderColor: `${accentColor}24`,
      backgroundColor: `${accentColor}08`,
    }}
  >
    <p
      className="text-[9px] font-black uppercase tracking-[0.14em]"
      style={{ color: accentColor }}
    >
      {title}
    </p>

    <p className="mt-1.5 text-[9.5px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
  </div>
);

export default SalesExecutiveTemplate;
