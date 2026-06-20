import React from 'react';
import { Body, ContactLines, Signature } from './ProfessionalTemplateParts';

const MarketingManagerTemplate = ({
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

  const accentColor = accent || design.color || '#db2777';

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 6);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['Campaign Strategy', 'Brand Growth', 'Audience Insights'];

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
      className="mx-auto bg-[#fff7fb] p-[4mm] text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
        '--marketing-accent': accentColor,
      }}
    >
      <div className="grid min-h-[289mm] overflow-hidden rounded-[18px] border border-pink-100 bg-white shadow-sm">
        <div className="grid grid-cols-[55mm_1fr]">
          {/* LEFT BRAND BOARD */}
          <aside
            className="relative overflow-hidden px-5 py-6"
            style={{
              background: `linear-gradient(180deg, ${accentColor}14 0%, #fff 68%)`,
            }}
          >
            <div
              className="absolute -left-12 top-8 h-28 w-28 rounded-full opacity-10"
              style={{ backgroundColor: accentColor }}
            />

            <div
              className="absolute -right-10 bottom-12 h-28 w-28 rounded-full opacity-10"
              style={{ backgroundColor: accentColor }}
            />

            <div className="relative z-10">
              <div
                className="h-1.5 w-20 rounded-full"
                style={{ backgroundColor: accentColor }}
              />

              <p
                className="mt-4 text-[9px] font-black uppercase tracking-[0.2em]"
                style={{ color: accentColor }}
              >
                Marketing Profile
              </p>

              {hasValue(profile.fullName) && (
                <h1 className="mt-2 text-[26px] font-black leading-[1.02] tracking-[-0.04em] text-slate-950">
                  {profile.fullName}
                </h1>
              )}

              {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
                <p className="mt-3 text-[9.8px] font-bold uppercase leading-4 tracking-[0.1em] text-slate-500">
                  {[profile.currentJobTitle, featuredSkills.slice(0, 2).join(' • ')]
                    .filter((value) => hasValue(value))
                    .join(' · ')}
                </p>
              )}

              {hasContact && (
                <section className="mt-5 rounded-xl border border-pink-100 bg-white/90 p-3 shadow-sm">
                  <p
                    className="text-[8.8px] font-black uppercase tracking-[0.16em]"
                    style={{ color: accentColor }}
                  >
                    Contact
                  </p>

                  <div className="mt-2 text-[9.8px] font-semibold leading-4 text-slate-600 [&_p]:break-words">
                    <ContactLines profile={profile} />
                  </div>
                </section>
              )}

              {/* CAMPAIGN BOARD */}
              <section className="mt-5">
                <p
                  className="text-[8.8px] font-black uppercase tracking-[0.18em]"
                  style={{ color: accentColor }}
                >
                  Campaign Board
                </p>

                <div className="mt-3 space-y-2">
                  <BoardItem
                    number="01"
                    title="Audience"
                    body="Understand the segment, message, and motivation."
                    accentColor={accentColor}
                  />

                  <BoardItem
                    number="02"
                    title="Message"
                    body="Shape clear positioning and campaign narrative."
                    accentColor={accentColor}
                  />

                  <BoardItem
                    number="03"
                    title="Performance"
                    body="Track, optimize, and improve outcomes."
                    accentColor={accentColor}
                  />
                </div>
              </section>

              {/* SKILLS */}
              {featuredSkills.length > 0 && (
                <section className="mt-5">
                  <p
                    className="text-[8.8px] font-black uppercase tracking-[0.18em]"
                    style={{ color: accentColor }}
                  >
                    Strengths
                  </p>

                  <div className="mt-3 space-y-2">
                    {featuredSkills.map((skill, index) => (
                      <div
                        key={`${skill}-${index}`}
                        className="rounded-xl border border-pink-100 bg-white px-3 py-2.5 shadow-sm"
                      >
                        <p className="text-[7.8px] font-black uppercase tracking-[0.13em] text-pink-400">
                          Focus {index + 1}
                        </p>

                        <p className="mt-1 text-[10.2px] font-black leading-4 text-slate-800">
                          {skill}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {remainingSkills.length > 0 && (
                <section className="mt-5">
                  <p
                    className="text-[8.8px] font-black uppercase tracking-[0.18em]"
                    style={{ color: accentColor }}
                  >
                    Tools
                  </p>

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
            </div>
          </aside>

          {/* MAIN LETTER */}
          <main className="px-7 py-6">
            {/* TOP CAMPAIGN BRIEF */}
            <header className="rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="text-[9.2px] font-black uppercase tracking-[0.18em]"
                    style={{ color: accentColor }}
                  >
                    Campaign Brief
                  </p>

                  <h2 className="mt-1.5 text-[23px] font-black leading-tight tracking-[-0.035em] text-slate-950">
                    Brand, Growth, and Audience Strategy
                  </h2>

                  {(hasValue(recipient.targetRole) || hasValue(recipient.company)) && (
                    <p className="mt-1.5 text-[10.8px] font-semibold leading-4 text-slate-600">
                      {[recipient.targetRole, recipient.company]
                        .filter((value) => hasValue(value))
                        .join(' · ')}
                    </p>
                  )}
                </div>

                <div
                  className="rounded-full px-3 py-1 text-[8px] font-black uppercase tracking-[0.12em]"
                  style={{
                    backgroundColor: `${accentColor}12`,
                    color: accentColor,
                  }}
                >
                  Growth Led
                </div>
              </div>
            </header>

            {/* DATE + RECIPIENT */}
            <section className="mt-4 rounded-xl border border-pink-100 bg-pink-50/70 px-4 py-3">
              <div className="grid grid-cols-[34mm_1fr] gap-5">
                <div className="border-r border-pink-100 pr-4">
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
              </div>
            </section>

            {/* BODY */}
            <section className="mt-5 rounded-[18px] border border-slate-100 bg-white px-4 py-4 shadow-[0_10px_26px_rgba(131,24,67,0.035)]">
              <div className="mb-3 flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />

                <p
                  className="text-[8.8px] font-black uppercase tracking-[0.18em]"
                  style={{ color: accentColor }}
                >
                  Cover Letter
                </p>
              </div>

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
                  prose-strong:text-pink-700
                  [&>*:first-child]:mt-0
                  [&>*:last-child]:mb-0
                "
              />
            </section>

            {/* VALUE AREA */}
            <section className="mt-4 grid grid-cols-2 gap-3">
              <MetricCard
                label="Positioning"
                value="Brand"
                body="Clear message, consistent story, and audience relevance."
                accentColor={accentColor}
              />

              <MetricCard
                label="Growth Motion"
                value="Demand"
                body="Campaigns aligned to funnel movement and performance."
                accentColor={accentColor}
              />
            </section>

            {/* SIGNATURE */}
            {showSignature && (
              <footer
                className="
                  mt-5 border-t border-pink-100 pt-4
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

const BoardItem = ({ number, title, body, accentColor }) => (
  <div className="rounded-xl border border-pink-100 bg-white px-3 py-2.5 shadow-sm">
    <div className="flex items-center justify-between gap-2">
      <p
        className="text-[8.8px] font-black uppercase tracking-[0.14em]"
        style={{ color: accentColor }}
      >
        {title}
      </p>

      <p className="text-[8px] font-black text-pink-300">{number}</p>
    </div>

    <p className="mt-1.5 text-[9.5px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
  </div>
);

const MetricCard = ({ label, value, body, accentColor }) => (
  <div
    className="rounded-xl border px-3 py-2.5"
    style={{
      borderColor: `${accentColor}24`,
      backgroundColor: `${accentColor}08`,
    }}
  >
    <p
      className="text-[8.5px] font-black uppercase tracking-[0.15em]"
      style={{ color: accentColor }}
    >
      {label}
    </p>

    <p className="mt-1 text-[16px] font-black leading-tight text-slate-950">
      {value}
    </p>

    <p className="mt-1.5 text-[9.5px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
  </div>
);

export default MarketingManagerTemplate;