import React from 'react';
import { Body, Signature, ContactLines } from './ProfessionalTemplateParts';

const ProductManagerTemplate = ({
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

  const accentColor = accent || design.color || '#0891b2';

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 6);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['Product Strategy', 'User Research', 'Roadmap Planning'];

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
    fontSize: Math.min(Math.max(Number(design.fontSize) || 10.9, 10.6), 11.3),
    lineHeight: Math.min(Number(design.lineHeight) || 1.44, 1.38),
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const productFlow = [
    {
      title: 'Problem',
      body: 'Understand customer pain and business context.',
    },
    {
      title: 'Users',
      body: 'Translate needs into product decisions.',
    },
    {
      title: 'Roadmap',
      body: 'Prioritize value, effort, and impact.',
    },
    {
      title: 'Launch',
      body: 'Align teams and deliver outcomes.',
    },
  ];

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-white p-[2mm] text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
        '--pm-accent': accentColor,
      }}
    >
      <div className="min-h-[293mm]">
        <div className="px-5 py-4">
          {/* HEADER */}
          <header
            className="relative overflow-hidden rounded-[18px] border px-4 py-4"
            style={{
              borderColor: `${accentColor}22`,
              background: `linear-gradient(135deg, ${accentColor}12 0%, #ffffff 62%)`,
            }}
          >
            <div
              className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-10"
              style={{ backgroundColor: accentColor }}
            />

            <div className="relative z-10 grid grid-cols-[1fr_46mm] items-start gap-4">
              <div>
                <div
                  className="h-1.5 w-16 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />

                <p
                  className="mt-2.5 text-[8.8px] font-black uppercase tracking-[0.18em]"
                  style={{ color: accentColor }}
                >
                  Cover Letter
                </p>

                {hasValue(profile.fullName) && (
                  <h1 className="mt-1.5 text-[26px] font-black leading-tight tracking-[-0.04em] text-slate-950">
                    {profile.fullName}
                  </h1>
                )}

                {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
                  <p className="mt-1.5 max-w-[118mm] text-[10.5px] font-semibold leading-4 text-slate-600">
                    {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
                      .filter((value) => hasValue(value))
                      .join(' · ')}
                  </p>
                )}
              </div>

              {hasContact && (
                <div className="rounded-xl border border-cyan-100 bg-white/85 p-2.5 text-[9px] font-semibold leading-4 text-slate-600 shadow-sm [&_p]:break-words">
                  <ContactLines profile={profile} />
                </div>
              )}
            </div>
          </header>

          {/* PRODUCT FLOW STRIP */}
          <section className="my-3 grid grid-cols-4 gap-1.5">
            {productFlow.map((step, index) => (
              <ProductStep
                key={step.title}
                index={index}
                title={step.title}
                body={step.body}
                accentColor={accentColor}
              />
            ))}
          </section>

          <div className="grid grid-cols-[1fr_42mm] gap-4">
            {/* MAIN LETTER */}
            <main>
              <section className="mb-3 flex items-center gap-2 border-b border-slate-200 pb-2.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />

                <div>
                  <p
                    className="text-[8.8px] font-black uppercase tracking-[0.16em]"
                    style={{ color: accentColor }}
                  >
                    Product Narrative
                  </p>

                  {(hasValue(recipient.targetRole) || hasValue(recipient.company)) && (
                    <p className="mt-0.5 text-[10.5px] font-semibold leading-4 text-slate-600">
                      {[recipient.targetRole, recipient.company]
                        .filter((value) => hasValue(value))
                        .join(' · ')}
                    </p>
                  )}
                </div>
              </section>

              {/* BODY */}
              <section className="rounded-2xl border border-slate-100 bg-white px-4 py-3.5 shadow-[0_8px_22px_rgba(15,23,42,0.03)]">
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
                    prose-strong:text-cyan-800
                    [&>*:first-child]:mt-0
                    [&>*:last-child]:mb-0
                  "
                />
              </section>

              {/* VALUE STRIP */}
              <section className="mt-3 grid grid-cols-3 gap-2.5">
                <ValuePillar
                  title="Customer"
                  body="Starts with user needs and adoption."
                  accentColor={accentColor}
                />

                <ValuePillar
                  title="Business"
                  body="Connects decisions to outcomes."
                  accentColor={accentColor}
                />

                <ValuePillar
                  title="Delivery"
                  body="Aligns teams and stakeholders."
                  accentColor={accentColor}
                />
              </section>

              {/* SIGNATURE */}
              {showSignature && (
                <footer
                  className="
                    mt-4 border-t border-slate-200 pt-3.5
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

            {/* RIGHT SIDEBAR */}
            <aside>
              {/* DATE + RECIPIENT */}
              <section className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                <div className="border-b border-slate-200 pb-2.5">
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
                        <p className="mt-0.5 text-slate-600">{recipient.address}</p>
                      )}
                    </div>
                  </div>
                )}
              </section>

              {/* PM PROFILE */}
              <section className="mt-3.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                <p
                  className="text-[8px] font-black uppercase tracking-[0.15em]"
                  style={{ color: accentColor }}
                >
                  Product Profile
                </p>

                <p className="mt-1.5 text-[9px] font-semibold leading-4 text-slate-600">
                  Product communication focused on customer problems,
                  prioritization, alignment, and launch outcomes.
                </p>
              </section>

              {/* CORE SKILLS */}
              {featuredSkills.length > 0 && (
                <section className="mt-3.5">
                  <SidebarTitle accentColor={accentColor}>Core Strengths</SidebarTitle>

                  <div className="mt-2.5 space-y-1.5">
                    {featuredSkills.map((skill, index) => (
                      <div
                        key={`${skill}-${index}`}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm"
                      >
                        <p className="text-[7.5px] font-black uppercase tracking-[0.13em] text-slate-400">
                          PM Skill {index + 1}
                        </p>

                        <p className="mt-0.5 text-[10px] font-black leading-4 text-slate-800">
                          {skill}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ADDITIONAL SKILLS */}
              {remainingSkills.length > 0 && (
                <section className="mt-3.5">
                  <SidebarTitle accentColor={accentColor}>Capabilities</SidebarTitle>

                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {remainingSkills.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-full border px-2 py-1 text-[8px] font-black leading-tight"
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
    </div>
  );
};

const ProductStep = ({ index, title, body, accentColor }) => (
  <div
    className="rounded-xl border-t-[3px] bg-slate-50 px-2.5 py-2.5 shadow-sm"
    style={{ borderTopColor: accentColor }}
  >
    <p className="text-[7.5px] font-black uppercase tracking-[0.13em] text-slate-400">
      0{index + 1}
    </p>

    <p className="mt-1 text-[10px] font-black leading-4 text-slate-800">
      {title}
    </p>

    <p className="mt-1 text-[8.8px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
  </div>
);

const SidebarTitle = ({ children, accentColor }) => (
  <p
    className="text-[8.2px] font-black uppercase tracking-[0.15em]"
    style={{ color: accentColor }}
  >
    {children}
  </p>
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

export default ProductManagerTemplate;
