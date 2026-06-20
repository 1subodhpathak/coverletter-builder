import React from 'react';
import { Body, ContactLines, Signature } from './ProfessionalTemplateParts';

const HospitalityTemplate = ({
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

  const accentColor = accent || design.color || '#c2410c';

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 6);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['Guest Experience', 'Service Excellence', 'Calm Execution'];

  const remainingSkills = visibleSkills.slice(3);

  const hasRecipient =
    hasValue(recipient.name) ||
    hasValue(recipient.title) ||
    hasValue(recipient.company) ||
    hasValue(recipient.address);

  const hasContact =
    hasValue(profile.email) ||
    hasValue(profile.phone) ||
    hasValue(profile.address) ||
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
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.1, 10.7), 11.5),
    lineHeight: Math.min(Number(design.lineHeight) || 1.48, 1.42),
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const serviceFlow = [
    {
      title: 'Welcome',
      body: 'Creates a warm first impression.',
    },
    {
      title: 'Serve',
      body: 'Delivers attentive and polished service.',
    },
    {
      title: 'Resolve',
      body: 'Handles requests professionally.',
    },
    {
      title: 'Return',
      body: 'Builds loyalty through memorable service.',
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
        '--hospitality-accent': accentColor,
      }}
    >
      {/* HEADER */}
      <header
        className="relative overflow-hidden px-7 py-6 text-white"
        style={{
          background: `linear-gradient(135deg, ${accentColor} 0%, #7c2d12 78%)`,
        }}
      >
        <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10" />
        <div className="absolute bottom-0 right-14 h-14 w-32 rounded-t-[32px] bg-white/10" />

        <div className="relative z-10 grid grid-cols-[1fr_46mm] items-start gap-4">
          <div>
            <div className="h-px w-20 bg-orange-100/70" />

            <p className="mt-2 text-[8.8px] font-black uppercase tracking-[0.16em] text-white/72">
              Cover Letter
            </p>

            {hasValue(profile.fullName) && (
              <h1 className="mt-2 text-[27px] font-black leading-tight tracking-[-0.04em] text-white">
                {profile.fullName}
              </h1>
            )}

            {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
              <p className="mt-1.5 max-w-[118mm] text-[10.5px] font-semibold leading-4 text-white/80">
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

      {/* SERVICE FLOW */}
      <section className="grid grid-cols-4 border-b border-orange-100">
        {serviceFlow.map((step, index) => (
          <ServiceStep
            key={step.title}
            index={index}
            title={step.title}
            body={step.body}
            accentColor={accentColor}
          />
        ))}
      </section>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-[42mm_1fr] gap-4 px-6 py-5">
        {/* LEFT SIDEBAR */}
        <aside>
          {/* DATE + RECIPIENT */}
          <section className="rounded-xl border border-orange-100 bg-orange-50/70 px-3.5 py-2.5">
            <div className="border-b border-orange-100 pb-3">
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
                    <p className="mt-0.5 text-slate-600">{recipient.address}</p>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* HOSPITALITY PROFILE */}
          <section className="mt-3.5 rounded-xl border border-orange-100 bg-white px-3 py-2.5 shadow-sm">
            <p
              className="text-[8.8px] font-black uppercase tracking-[0.16em]"
              style={{ color: accentColor }}
            >
              Service Profile
            </p>

            <p className="mt-2 text-[9.5px] font-semibold leading-4 text-slate-600">
              Warm, guest-focused communication built around service quality,
              calm execution, attention to detail, and memorable experiences.
            </p>
          </section>

          {/* FEATURED SKILLS */}
          {featuredSkills.length > 0 && (
            <section className="mt-4">
              <SidebarTitle accentColor={accentColor}>
                Hospitality Strengths
              </SidebarTitle>

              <div className="mt-2.5 space-y-1.5">
                {featuredSkills.map((skill, index) => (
                  <div
                    key={`${skill}-${index}`}
                    className="rounded-xl border border-orange-100 bg-orange-50 px-3 py-2 shadow-sm"
                  >
                    <p className="text-[7.8px] font-black uppercase tracking-[0.13em] text-orange-400">
                      Service {index + 1}
                    </p>

                    <p className="mt-1 text-[9.8px] font-black leading-4 text-orange-950">
                      {skill}
                    </p>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-orange-100">
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
            <section className="mt-3.5">
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

        {/* MAIN LETTER */}
        <main>
          <section className="mb-4 flex items-center gap-2.5 border-b border-orange-100 pb-3">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />

            <div>
              <p
                className="text-[9.2px] font-black uppercase tracking-[0.18em]"
                style={{ color: accentColor }}
              >
                Guest Experience Narrative
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
          <section className="rounded-2xl border border-orange-100 bg-white px-4 py-3 shadow-[0_10px_26px_rgba(120,53,15,0.035)]">
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
                prose-strong:text-orange-800
                [&>*:first-child]:mt-0
                [&>*:last-child]:mb-0
              "
            />
          </section>

          {/* VALUE STRIP */}
          <section className="mt-3 grid grid-cols-3 gap-2.5">
            <ValuePillar
              title="Guest"
              body="Creates welcoming and thoughtful service moments."
              accentColor={accentColor}
            />

            <ValuePillar
              title="Service"
              body="Maintains standards, pace, and professionalism."
              accentColor={accentColor}
            />

            <ValuePillar
              title="Loyalty"
              body="Builds trust through consistency and care."
              accentColor={accentColor}
            />
          </section>

          {/* SIGNATURE */}
          {showSignature && (
            <footer
              className="
                mt-4 border-t border-orange-100 pt-3
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
  );
};

const ServiceStep = ({ index, title, body, accentColor }) => (
  <div className="border-r border-orange-100 bg-orange-50 px-3 py-3 last:border-r-0">
    <p
      className="text-[8px] font-black uppercase tracking-[0.14em]"
      style={{ color: accentColor }}
    >
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

export default HospitalityTemplate;
